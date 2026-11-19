"""Validate the approved v0.100 Extended Black baseline. Exit 1 on any failure.

    python scripts/validate.py        # -> baseline/extended-black-0.100/validation-report.txt

Checks: upstream pin, OpenType Sanitizer (the parser Chrome and Firefox use), naming and style
linking, slant metadata, faithfulness of Upright/Italic to Omnibus' own static TTFs, exactness of
the Retalic shear (outlines and anchors), HarfBuzz shaping parity (kerning, mark placement),
coverage, clipping/overhang, WOFF2 round-trip and byte-reproducible rebuild.
"""

from __future__ import annotations

import contextlib
import hashlib
import io
import math
import re
import shutil
import sys
import tempfile
from pathlib import Path

import ots
import uharfbuzz as hb
from fontTools.pens.areaPen import AreaPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.ttLib import TTFont

import vb_config as C
from build_prototype import build_style
from fetch_upstream import verify as verify_upstream

results: list[tuple[str, str, str]] = []  # (status, check, detail)


def record(ok: bool, check: str, detail: str = "", warn: bool = False) -> None:
    results.append(("PASS" if ok else ("WARN" if warn else "FAIL"), check, detail))


def ttf(style_key: str) -> Path:
    return C.BASELINE_TTF / f"{C.PROTOTYPE_STYLES[style_key]['ps_name']}.ttf"


def woff2(style_key: str) -> Path:
    return C.BASELINE_WOFF2 / f"{C.PROTOTYPE_STYLES[style_key]['ps_name']}.woff2"


def check_approved_pin():
    bad = [rel for rel, want in C.APPROVED_BASELINE.items()
           if hashlib.sha256((C.BASELINE_DIR / rel).read_bytes()).hexdigest() != want]
    record(not bad, "baseline is byte-identical to the approved v0.100 files", f"changed: {bad}" if bad else f"{len(C.APPROVED_BASELINE)} files")


# --- shaping helpers ------------------------------------------------------------------------------
SAMPLE = (
    "VENTURE BEYOND AVATAR LTA TYPOGRAPHY WAVE Yo To Te Va AV 'quoted' \"double\" "
    "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 "
    "!?.,;:-–—()[]{}/\\@#$%&*+=<>|~^_ ¿¡«»‹›“”‘’ "
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ "
    "ĀāĂăĄąĆćČčĎďĐđĒēĘęĚěĞğĢģĪīĮįİıĶķĹĺĻļĽľŁłŃńŅņŇňŌōŐőŒœŔŕŘřŚśŞşŠšŢţŤťŪūŮůŰűŲųŸŹźŻżŽž"
)
# Sequences with no precomposed glyph force GPOS mark attachment.
COMBINING = "x́ q̈ Q́ Ḥ W̃ ẕ k̂ X̀́ j̨ R̆́"


def shape(path: Path, text: str, features=None):
    blob = hb.Blob.from_file_path(str(path))
    font = hb.Font(hb.Face(blob))
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, features or {})
    return [(i.codepoint, i.cluster) for i in buf.glyph_infos], [
        (p.x_advance, p.y_advance, p.x_offset, p.y_offset) for p in buf.glyph_positions
    ]


# --- checks ---------------------------------------------------------------------------------------
def check_upstream():
    errs = verify_upstream()
    record(not errs, "upstream pin", "; ".join(errs) or f"Omnibus-Type/Archivo@{C.UPSTREAM_COMMIT[:7]}, {len(C.UPSTREAM_FILES)} files")


def check_ots():
    paths = [ttf(k) for k in C.PROTOTYPE_STYLES] + [woff2(k) for k in C.PROTOTYPE_STYLES]
    for p in paths:
        r = ots.sanitize(str(p), capture_output=True, text=True)
        record(r.returncode == 0, f"OTS sanitize {p.name}", (r.stderr or r.stdout).strip()[:300])


def check_naming():
    fonts = {k: TTFont(ttf(k)) for k in C.PROTOTYPE_STYLES}
    ps_names = set()
    for key, f in fonts.items():
        st = C.PROTOTYPE_STYLES[key]
        n = f["name"]
        want = {1: st["legacy_family"], 2: st["legacy_subfamily"], 4: st["full_name"], 6: st["ps_name"], 16: C.FAMILY, 17: st["typo_subfamily"]}
        bad = {i: (n.getName(i, 3, 1, 0x409) and n.getName(i, 3, 1, 0x409).toUnicode(), w) for i, w in want.items()
               if not n.getName(i, 3, 1, 0x409) or n.getName(i, 3, 1, 0x409).toUnicode() != w}
        record(not bad, f"{key}: name IDs 1/2/4/6/16/17", str(bad) if bad else f"{st['full_name']} / {st['ps_name']}")
        ps = st["ps_name"]
        record(bool(re.fullmatch(r"[A-Za-z0-9]+-[A-Za-z0-9]+", ps)) and len(ps) <= 63, f"{key}: PostScript name syntax", ps)
        record(len(st["legacy_family"]) <= 31, f"{key}: legacy family <= 31 chars", f"{len(st['legacy_family'])}")
        ps_names.add(ps)
        copyright_ = n.getDebugName(0)
        record("The Archivo Project Authors" in copyright_, f"{key}: Archivo copyright retained", copyright_)
        record("Open Font License" in n.getDebugName(13) and n.getDebugName(14) == C.LICENSE_URL, f"{key}: OFL name records", "")
        stat = f["STAT"].table
        stat_ids = {a.AxisNameID for a in stat.DesignAxisRecord.Axis} | {v.ValueNameID for v in (stat.AxisValueArray.AxisValue if stat.AxisValueArray else [])} | {stat.ElidedFallbackNameID}
        stale = sorted({r.nameID for r in n.names if r.nameID == 25 or (r.nameID >= 256 and r.nameID not in stat_ids)})
        record(not stale, f"{key}: no stale VF name records (ID 25 / unreferenced IDs >= 256)", str(stale) if stale else "")
        record("Archivo" not in (n.getDebugName(1) + n.getDebugName(4) + n.getDebugName(6) + n.getDebugName(16)),
               f"{key}: family is renamed (no 'Archivo' in names 1/4/6/16)", "")
        for tag in ("fvar", "gvar", "HVAR", "avar", "DSIG"):
            if tag in f:
                record(False, f"{key}: unexpected table {tag}")
        record("STAT" in f, f"{key}: STAT present", "")
    record(len(ps_names) == 3, "unique PostScript names", ", ".join(sorted(ps_names)))
    # Style linking: Upright + Italic share legacy family (RIBBI pair); Retalic must not link as italic.
    up, it, re_ = fonts["upright"], fonts["italic"], fonts["retalic"]
    record(up["name"].getDebugName(1) == it["name"].getDebugName(1), "Upright/Italic style-linked (same ID 1)", up["name"].getDebugName(1))
    record(re_["name"].getDebugName(1) != up["name"].getDebugName(1), "Retalic in its own legacy family", re_["name"].getDebugName(1))
    exp_bits = {"upright": (0x40, 0), "italic": (0x01, 2), "retalic": (0x40 | 0x200, 0)}
    for key, f in fonts.items():
        fs = f["OS/2"].fsSelection & ~0x80  # ignore USE_TYPO_METRICS
        bits, mac = exp_bits[key]
        record(fs == bits and f["head"].macStyle == mac, f"{key}: fsSelection/macStyle",
               f"fsSelection={fs:#06x} (want {bits:#06x}) macStyle={f['head'].macStyle} (want {mac})")
        record(f["OS/2"].usWeightClass == 900 and f["OS/2"].usWidthClass == 7, f"{key}: usWeightClass 900 / usWidthClass 7", "")


def check_slant_metadata():
    exp = {"upright": 0.0, "italic": -C.ARCHIVO_ITALIC_ANGLE, "retalic": C.RETALIC_ANGLE}
    for key, want in exp.items():
        f = TTFont(ttf(key))
        ang = f["post"].italicAngle
        h = f["hhea"]
        caret = math.degrees(math.atan2(-h.caretSlopeRun, h.caretSlopeRise))
        record(abs(ang - want) < 0.01 and abs(caret - want) < 0.1, f"{key}: post.italicAngle & hhea caret",
               f"italicAngle={ang:+.1f} (OpenType, + = left lean), caret={caret:+.2f} deg, CSS lean={-ang:+.1f}")


def shape_signatures(font: TTFont) -> dict:
    """glyph -> (bounds, filled area). Independent of contour order/start points."""
    gs = font.getGlyphSet()
    out = {}
    for g in font.getGlyphOrder():
        bp, ap = BoundsPen(gs), AreaPen(gs)
        gs[g].draw(bp)
        gs[g].draw(ap)
        out[g] = (bp.bounds, ap.value)
    return out


def same_sig(a, b) -> bool:
    (b1, a1), (b2, a2) = a, b
    if (b1 is None) != (b2 is None):
        return False
    return (b1 is None or max(abs(u - v) for u, v in zip(b1, b2)) <= 1) and abs(a1 - a2) <= max(0.002 * abs(a2), 100)


def same_glyph_data(a: TTFont, b: TTFont, label: str):
    record(a.getGlyphOrder() == b.getGlyphOrder(), f"{label}: glyph order identical", f"{len(a.getGlyphOrder())} glyphs")
    record(a.getBestCmap() == b.getBestCmap(), f"{label}: cmap identical", f"{len(a.getBestCmap())} code points")
    adv = [g for g in a.getGlyphOrder() if g in b["hmtx"].metrics and a["hmtx"][g][0] != b["hmtx"][g][0]]
    record(not adv, f"{label}: advance widths identical", f"{len(adv)} differ {adv[:8]}")


def check_faithful_to_omnibus():
    """Upright/Italic must reproduce Omnibus' own static Expanded Black TTFs (modulo hinting)."""
    for key, ref_path in (("upright", C.UPRIGHT_STATIC_REF), ("italic", C.ITALIC_STATIC_REF)):
        ours, ref = TTFont(ttf(key)), TTFont(ref_path)
        same_glyph_data(ours, ref, f"{key} vs Omnibus {ref_path.name}")
        sig1, sig2 = shape_signatures(ours), shape_signatures(ref)
        worst_b, worst_a, wb, wa = 0, 0.0, None, None
        # *.BRACKET.* alternates are only reachable through rvrn; fontmake swaps them with the base
        # glyph in statics while we copy, so compare what renders (base glyphs + shaping test below).
        for g in (g for g in ours.getGlyphOrder() if ".BRACKET." not in g):
            (b1, a1), (b2, a2) = sig1[g], sig2[g]
            db = max((abs(u - v) for u, v in zip(b1, b2)), default=0) if b1 and b2 else (0 if b1 == b2 else math.inf)
            # relative tolerance with an absolute floor (100 sq units = 10x10 at 1000 UPM) for tiny glyphs
            da = abs(a1 - a2) / max(abs(a2) * 0.002, 100) * 0.002
            if db > worst_b:
                worst_b, wb = db, g
            if da > worst_a:
                worst_a, wa = da, g
        record(worst_b <= 1 and worst_a <= 0.002, f"{key}: every glyph's filled shape matches Omnibus static",
               f"max bbox deviation {worst_b:.2f} units ({wb}); worst area deviation {worst_a / 0.002:.0%} of tolerance ({wa}: {abs(sig1[wa][1] - sig2[wa][1]):.0f} sq units); rvrn alternates excluded")
        bad = 0
        for text in (SAMPLE, COMBINING):
            i1, p1 = shape(ttf(key), text)
            i2, p2 = shape(ref_path, text)
            s1 = [sig1[ours.getGlyphName(g)] for g, _ in i1]
            s2 = [sig2[ref.getGlyphName(g)] for g, _ in i2]
            bad += sum(1 for a, b, c, d in zip(s1, s2, p1, p2) if not same_sig(a, b) or c != d) + abs(len(s1) - len(s2))
        record(bad == 0, f"{key}: shaped text (glyph shapes, kerning, marks) identical to Omnibus static",
               f"{bad} differences across {len(SAMPLE) + len(COMBINING)} characters")


def check_retalic_shear():
    up, rt = TTFont(ttf("upright")), TTFont(ttf("retalic"))
    same_glyph_data(rt, up, "retalic vs upright")
    t = math.tan(math.radians(C.RETALIC_ANGLE))
    gu, gr = up.getGlyphSet(), rt.getGlyphSet()
    maxdx, maxdy, worst, structural = 0.0, 0, None, []
    for g in up.getGlyphOrder():
        pu, pr = DecomposingRecordingPen(gu), DecomposingRecordingPen(gr)
        gu[g].draw(pu)
        gr[g].draw(pr)
        if [op for op, _ in pu.value] != [op for op, _ in pr.value]:
            structural.append(g)
            continue
        for (_, au), (_, ar) in zip(pu.value, pr.value):
            for pu_pt, pr_pt in zip(au, ar):
                if pu_pt is None or pr_pt is None:
                    if (pu_pt is None) != (pr_pt is None):
                        structural.append(g)
                    continue
                (xu, yu), (xr, yr) = pu_pt, pr_pt
                dx = abs(xr - C.shear_x(xu, yu, C.RETALIC_ANGLE))
                if dx > maxdx:
                    maxdx, worst = dx, g
                maxdy = max(maxdy, abs(yr - yu))
    record(not structural, "retalic: contour structure identical to upright", f"{len(structural)} differ {structural[:8]}")
    # each point rounds once (<=0.5); composites add one more rounding of the offset (<=0.5)
    record(maxdx <= 1.0 and maxdy == 0, "retalic: every point = exact shear of upright",
           f"max |dx| {maxdx:.3f} units ({worst}), max |dy| {maxdy}; x' = x - (y - {C.PIVOT_Y})*tan({C.RETALIC_ANGLE:g} deg)")
    # GSUB untouched, kerning untouched
    record(up["GSUB"].compile(up) == rt["GSUB"].compile(rt), "retalic: GSUB byte-identical to upright", "")
    # Shaping parity: same glyphs, same advances (=kerning), marks moved along the slant.
    worst_mark, n_marks, bad = 0.0, 0, 0
    for text in (SAMPLE, COMBINING):
        iu, pu_ = shape(ttf("upright"), text)
        ir, pr_ = shape(ttf("retalic"), text)
        if [g for g, _ in iu] != [g for g, _ in ir]:
            bad += 1
            continue
        for (xa, ya, xo, yo), (xa2, ya2, xo2, yo2) in zip(pu_, pr_):
            if (xa, ya, yo) != (xa2, ya2, yo2):
                bad += 1
            if xo or yo:
                n_marks += 1
                worst_mark = max(worst_mark, abs(xo2 - (xo - yo * t)))
    record(bad == 0, "retalic: shaping glyphs, advances & kerning identical to upright", f"{bad} differences")
    record(worst_mark <= 1.5, "retalic: GPOS mark offsets follow the slant",
           f"{n_marks} positioned marks, max deviation from sheared offset {worst_mark:.2f} units")


def check_coverage():
    cmaps = {k: TTFont(ttf(k)).getBestCmap() for k in C.PROTOTYPE_STYLES}
    groups = {
        "A-Z": range(0x41, 0x5B), "a-z": range(0x61, 0x7B), "0-9": range(0x30, 0x3A),
        "ASCII punctuation": [c for c in range(0x20, 0x7F) if not chr(c).isalnum()],
        "Latin-1 letters": [c for c in range(0xC0, 0x100) if c not in (0xD7, 0xF7)],
        "Latin Extended-A": range(0x100, 0x180),
    }
    for key, cm in cmaps.items():
        parts, missing_ascii = [], []
        for name, rng in groups.items():
            rng = list(rng)
            have = sum(1 for c in rng if c in cm)
            parts.append(f"{name} {have}/{len(rng)}")
            if name in ("A-Z", "a-z", "0-9", "ASCII punctuation"):
                missing_ascii += [chr(c) for c in rng if c not in cm]
        record(not missing_ascii, f"{key}: coverage", ", ".join(parts) + f"; total {len(cm)} code points")
    record(set(cmaps["upright"]) == set(cmaps["italic"]) == set(cmaps["retalic"]), "all styles: identical character set", "")


def check_extents():
    for key in C.PROTOTYPE_STYLES:
        f = TTFont(ttf(key))
        os2, glyf, hmtx = f["OS/2"], f["glyf"], f["hmtx"]
        left = right = 0
        lw = rw = None
        ymax = ymin = 0
        cmap_glyphs = set(f.getBestCmap().values())
        for g in cmap_glyphs:
            gl = glyf[g]
            if gl.numberOfContours == 0:
                continue
            adv = hmtx[g][0]
            if -gl.xMin > left:
                left, lw = -gl.xMin, g
            if gl.xMax - adv > right:
                right, rw = gl.xMax - adv, g
            ymax, ymin = max(ymax, gl.yMax), min(ymin, gl.yMin)
        clip_ok = ymax <= os2.usWinAscent and -ymin <= os2.usWinDescent
        record(clip_ok, f"{key}: no vertical clipping (usWin {os2.usWinAscent}/{os2.usWinDescent}; Archivo ships 1100/410)",
               f"glyph yMax {ymax}, yMin {ymin}")
        typo = (os2.sTypoAscender, os2.sTypoDescender, os2.sTypoLineGap, f["hhea"].ascent, f["hhea"].descent, f["hhea"].lineGap)
        ref = TTFont(C.UPRIGHT_VF)
        rtypo = (ref["OS/2"].sTypoAscender, ref["OS/2"].sTypoDescender, ref["OS/2"].sTypoLineGap, ref["hhea"].ascent, ref["hhea"].descent, ref["hhea"].lineGap)
        record(typo == rtypo and bool(os2.fsSelection & 0x80), f"{key}: line-spacing metrics unchanged from Archivo (typo/hhea, USE_TYPO_METRICS)", str(typo))
        record(True, f"{key}: max horizontal overhang beyond advance box",
               f"left {left} ({lw}), right {right} ({rw}) units")


def check_woff2():
    for key in C.PROTOTYPE_STYLES:
        a, b = TTFont(ttf(key)), TTFont(woff2(key))
        diff = [t for t in ("cmap", "GSUB", "GPOS", "GDEF", "name", "OS/2", "post", "hhea") if a[t].compile(a) != b[t].compile(b)]
        ga, gb = a.getGlyphSet(), b.getGlyphSet()
        gdiff = 0
        for g in a.getGlyphOrder():
            p1, p2 = DecomposingRecordingPen(ga), DecomposingRecordingPen(gb)
            ga[g].draw(p1)
            gb[g].draw(p2)
            gdiff += p1.value != p2.value
        record(not diff and not gdiff, f"{key}: WOFF2 round-trip lossless", f"tables {diff}, glyphs {gdiff}")


def check_reproducible():
    # build_style prints ROOT-relative paths, so rebuild into a scratch dir inside ROOT.
    tmpdir = Path(tempfile.mkdtemp(prefix=".rebuild-check-", dir=C.ROOT))
    try:
        diffs = []
        for key, st in C.PROTOTYPE_STYLES.items():
            out = tmpdir / f"{key}.ttf"
            with contextlib.redirect_stdout(io.StringIO()):
                build_style(st, out)
            if hashlib.sha256(out.read_bytes()).digest() != hashlib.sha256(ttf(key).read_bytes()).digest():
                diffs.append(key)
        record(not diffs, "byte-reproducible rebuild", f"differs: {diffs}" if diffs else "fresh build == baseline")
    finally:
        shutil.rmtree(tmpdir)


def main() -> None:
    for fn in (check_upstream, check_approved_pin, check_ots, check_naming, check_slant_metadata, check_faithful_to_omnibus,
               check_retalic_shear, check_coverage, check_extents, check_woff2, check_reproducible):
        try:
            fn()
        except Exception as e:  # a crashing check is a failing check
            record(False, fn.__name__, f"{type(e).__name__}: {e}")
    lines = [f"Venture Beyond prototype validation (Extended Black; Retalic {C.RETALIC_ANGLE:g} deg)", ""]
    for status, check, detail in results:
        lines.append(f"[{status}] {check}" + (f": {detail}" if detail else ""))
    fails = sum(s == "FAIL" for s, _, _ in results)
    warns = sum(s == "WARN" for s, _, _ in results)
    lines += ["", f"{len(results)} checks, {fails} failed, {warns} warnings"]
    report = "\n".join(lines) + "\n"
    (C.BASELINE_DIR / "validation-report.txt").write_text(report)
    print(report)
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
