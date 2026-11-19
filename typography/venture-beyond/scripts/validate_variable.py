"""Validate the three Venture Beyond variable fonts. Exit 1 on any failure.

    python scripts/validate_variable.py     # -> dist/validation-report.txt

Covers: OTS, axes/avar, named instances, naming & style linking, STAT, preservation of Archivo's
data in Upright/Italic, Retalic = exact shear of Upright sampled across the design space (outlines,
advances, HarfBuzz shaping incl. variable kerning and mark anchors), the approved v0.100 Extended
Black appearance, interpolation diagnostics, clipping, coverage, WOFF2 and reproducibility.
"""

from __future__ import annotations

import contextlib
import hashlib
import io
import json
import math
import random
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import ots
import uharfbuzz as hb
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

import vb_config as C
from build_prototype import bake_rvrn
from build_variable import build
from fetch_upstream import verify as verify_upstream
from validate import COMBINING, SAMPLE, same_sig, shape_signatures

results: list[tuple[str, str, str]] = []


def record(ok: bool, check: str, detail: str = "", warn: bool = False) -> None:
    results.append(("PASS" if ok else ("WARN" if warn else "FAIL"), check, detail))


def vf(key: str) -> Path:
    return C.DIST_TTF / C.VF_STYLES[key]["ttf"]


def vf_woff2(key: str) -> Path:
    return C.DIST_WOFF2 / C.VF_STYLES[key]["woff2"]


FONTS: dict[str, TTFont] = {}


def font(key: str) -> TTFont:
    if key not in FONTS:
        FONTS[key] = TTFont(vf(key))
    return FONTS[key]


# Design-space sample: every named instance + axis extremes + seeded random interior points.
GRID = [{"wght": g, "wdth": w} for w, _ in C.WIDTHS for g, _ in C.WEIGHTS]
EXTRA = [{"wght": 100, "wdth": 62}, {"wght": 900, "wdth": 62}, {"wght": 600, "wdth": 62}]
rng = random.Random(2026)
RANDOM = [{"wght": round(rng.uniform(100, 900), 1), "wdth": round(rng.uniform(62, 125), 1)} for _ in range(10)]
MASTERS = [{"wght": g, "wdth": w} for g in (100, 600, 900) for w in (62, 100, 125)]


# --- checks ---------------------------------------------------------------------------------------
def check_upstream():
    errs = verify_upstream()
    record(not errs, "upstream pin", "; ".join(errs) or f"Omnibus-Type/Archivo@{C.UPSTREAM_COMMIT[:7]}")


def check_ots():
    for key in C.VF_STYLES:
        for p in (vf(key), vf_woff2(key)):
            r = ots.sanitize(str(p), capture_output=True, text=True)
            record(r.returncode == 0, f"OTS sanitize {p.name}", (r.stderr or r.stdout).strip()[:300])


def check_axes():
    ref = TTFont(C.UPRIGHT_VF)
    want = [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in ref["fvar"].axes]
    for key in C.VF_STYLES:
        f = font(key)
        got = [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in f["fvar"].axes]
        record(got == want, f"{key}: fvar axes = Archivo", ", ".join(f"{t} {lo:g}-{hi:g} (default {d:g})" for t, lo, d, hi in got))
        record(f["avar"].compile(f) == ref["avar"].compile(ref), f"{key}: avar identical to Archivo", "")


def check_instances():
    all_ps = {}
    for key, st in C.VF_STYLES.items():
        f = font(key)
        n = f["name"]
        axes = {a.axisTag: (a.minValue, a.maxValue) for a in f["fvar"].axes}
        subs, bad = [], []
        for inst in f["fvar"].instances:
            sub = n.getDebugName(inst.subfamilyNameID)
            ps = n.getDebugName(inst.postscriptNameID)
            subs.append(sub)
            if not re.fullmatch(r"[A-Za-z0-9]+-[A-Za-z0-9]+", ps) or len(ps) > 63:
                bad.append(ps)
            if ps in all_ps:
                bad.append(f"{ps} duplicates {all_ps[ps]}")
            all_ps[ps] = key
            if any(not (axes[t][0] <= v <= axes[t][1]) for t, v in inst.coordinates.items()):
                bad.append(f"{sub} out of range")
        record(len(f["fvar"].instances) == len(C.WIDTHS) * len(C.WEIGHTS) and len(set(subs)) == len(subs) and not bad,
               f"{key}: {len(subs)} named instances, unique, valid PostScript names", "; ".join(bad[:5]))
        expect = {"upright": "Extended Black", "italic": "Extended Black Italic", "retalic": "Extended Black Retalic"}[key]
        hit = [i for i in f["fvar"].instances if n.getDebugName(i.subfamilyNameID) == expect]
        record(bool(hit) and hit[0].coordinates == {"wght": 900, "wdth": 125}, f"{key}: named instance '{expect}' at wght 900 / wdth 125",
               n.getDebugName(hit[0].postscriptNameID) if hit else "missing")
    record(len(all_ps) == 3 * len(C.WIDTHS) * len(C.WEIGHTS), "instance PostScript names unique across the family", f"{len(all_ps)} names")


def check_naming():
    prefixes, ps_names = set(), set()
    for key, st in C.VF_STYLES.items():
        f = font(key)
        n = f["name"]
        want = {1: st["legacy_family"], 2: st["legacy_subfamily"], 6: st["ps_name"], 16: C.FAMILY, 17: st["typo_subfamily"], 25: st["ps_prefix"]}
        bad = {i: n.getDebugName(i) for i, w in want.items() if n.getDebugName(i) != w}
        record(not bad, f"{key}: name IDs 1/2/6/16/17/25", str(bad) if bad else f"{st['legacy_family']} / {st['legacy_subfamily']}; prefix {st['ps_prefix']}")
        record(len(st["legacy_family"]) <= 31, f"{key}: legacy family <= 31 chars", str(len(st["legacy_family"])))
        record("The Archivo Project Authors" in n.getDebugName(0), f"{key}: Archivo copyright retained", "")
        record("Open Font License" in n.getDebugName(13) and n.getDebugName(14) == C.LICENSE_URL, f"{key}: OFL name records", "")
        record("Archivo" not in "".join(n.getDebugName(i) or "" for i in (1, 4, 6, 16, 25)), f"{key}: renamed (no 'Archivo' in 1/4/6/16/25)", "")
        used = {a.axisNameID for a in f["fvar"].axes} | {i.subfamilyNameID for i in f["fvar"].instances} | {i.postscriptNameID for i in f["fvar"].instances}
        stat = f["STAT"].table
        used |= {a.AxisNameID for a in stat.DesignAxisRecord.Axis} | {v.ValueNameID for v in stat.AxisValueArray.AxisValue} | {stat.ElidedFallbackNameID}
        stray = sorted({r.nameID for r in n.names if r.nameID >= 256 and r.nameID not in used})
        record(not stray, f"{key}: no unreferenced name records", str(stray) if stray else "")
        mac = sorted({r.nameID for r in n.names if r.platformID != 3})
        record(not mac, f"{key}: Windows-platform name records only", str(mac[:10]) if mac else "")
        record(n.getDebugName(4).startswith(n.getDebugName(1)), f"{key}: full name (4) begins with legacy family (1)", n.getDebugName(4))
        record("DSIG" not in f, f"{key}: no DSIG", "")
        prefixes.add(st["ps_prefix"])
        ps_names.add(st["ps_name"])
    record(len(prefixes) == 3 and len(ps_names) == 3, "distinct variations PostScript prefixes (ID 25) and default PS names", ", ".join(sorted(prefixes)))
    up, it, re_ = (font(k) for k in ("upright", "italic", "retalic"))
    record(up["name"].getDebugName(1) == it["name"].getDebugName(1), "Upright/Italic style-linked (same ID 1)", up["name"].getDebugName(1))
    record(re_["name"].getDebugName(1) != up["name"].getDebugName(1), "Retalic in its own legacy family", re_["name"].getDebugName(1))
    exp = {"upright": (0x40, 0, 0.0), "italic": (0x01, 2, -C.ARCHIVO_ITALIC_ANGLE), "retalic": (0x240, 0, C.RETALIC_ANGLE)}
    for key, (bits, mac, ang) in exp.items():
        f = font(key)
        fs = f["OS/2"].fsSelection & ~0x80
        h = f["hhea"]
        caret = math.degrees(math.atan2(-h.caretSlopeRun, h.caretSlopeRise))
        record(fs == bits and f["head"].macStyle == mac and bool(f["OS/2"].fsSelection & 0x80),
               f"{key}: fsSelection/macStyle (+USE_TYPO_METRICS)", f"{fs:#06x} / {f['head'].macStyle}")
        record(abs(f["post"].italicAngle - ang) < 0.01 and abs(caret - ang) < 0.1, f"{key}: italicAngle & caret slope",
               f"{f['post'].italicAngle:+g} (CSS {-f['post'].italicAngle:+g}deg), caret {caret:+.2f}")


def check_stat():
    orders = set()
    for key in C.VF_STYLES:
        st = font(key)["STAT"].table
        n = font(key)["name"]
        tags = tuple(a.AxisTag for a in st.DesignAxisRecord.Axis)
        orders.add(tags)
        names = sorted({n.getDebugName(v.ValueNameID) for v in st.AxisValueArray.AxisValue})
        record("Extended" in names and "Black" in names and "Expanded" not in names, f"{key}: STAT axis values", f"axes {tags}; {len(names)} names")
        record(tags[-1] == "ital", f"{key}: STAT 'ital' axis last", str(tags))
    record(len(orders) == 1, "STAT design axes consistent across files", str(orders.pop()))


PRESERVED = ["glyf", "gvar", "hmtx", "HVAR", "avar", "GSUB", "GPOS", "GDEF", "cmap", "post", "maxp", "gasp", "prep", "loca"]


def check_preserved():
    for key, src in (("upright", C.UPRIGHT_VF), ("italic", C.ITALIC_VF)):
        ours, ref = font(key), TTFont(src)
        diff = [t for t in PRESERVED if t in ref and ours[t].compile(ours) != ref[t].compile(ref)]
        record(not diff, f"{key}: Archivo data preserved ({', '.join(PRESERVED)})", f"differ: {diff}" if diff else "identical")
        h1, h2 = ours["hhea"], ref["hhea"]
        o1, o2 = ours["OS/2"], ref["OS/2"]
        same = (h1.ascent, h1.descent, h1.lineGap, o1.sTypoAscender, o1.sTypoDescender, o1.sTypoLineGap) == \
               (h2.ascent, h2.descent, h2.lineGap, o2.sTypoAscender, o2.sTypoDescender, o2.sTypoLineGap)
        record(same, f"{key}: line-spacing metrics = Archivo", f"typo/hhea {o1.sTypoAscender}/{o1.sTypoDescender}/{o1.sTypoLineGap}")


def check_retalic_static_tables():
    up, re_ = font("upright"), font("retalic")
    record(up.getGlyphOrder() == re_.getGlyphOrder() and up.getBestCmap() == re_.getBestCmap(), "retalic: glyph order & cmap = upright", "")
    for t in ("GSUB", "HVAR", "avar", "cmap"):
        record(up[t].compile(up) == re_[t].compile(re_), f"retalic: {t} byte-identical to upright", "")
    adv = [g for g in up.getGlyphOrder() if up["hmtx"][g][0] != re_["hmtx"][g][0]]
    record(not adv, "retalic: default advance widths = upright", f"{len(adv)} differ")


def instance(f: TTFont, loc: dict) -> TTFont:
    with contextlib.redirect_stderr(io.StringIO()):
        return instancer.instantiateVariableFont(f, loc)


def compare_shear(a: TTFont, b: TTFont) -> tuple[float, float, int, str]:
    ga, gb = a.getGlyphSet(), b.getGlyphSet()
    mx = my = 0.0
    worst, structural = "", 0
    for g in a.getGlyphOrder():
        p, q = DecomposingRecordingPen(ga), DecomposingRecordingPen(gb)
        ga[g].draw(p)
        gb[g].draw(q)
        if [o for o, _ in p.value] != [o for o, _ in q.value]:
            structural += 1
            continue
        for (_, aa), (_, bb) in zip(p.value, q.value):
            for u, v in zip(aa, bb):
                if u is None or v is None:
                    continue
                dx = abs(v[0] - C.shear_x(u[0], u[1], C.RETALIC_ANGLE))
                if dx > mx:
                    mx, worst = dx, g
                my = max(my, abs(v[1] - u[1]))
    return mx, my, structural, worst


def check_design_space():
    up, re_ = font("upright"), font("retalic")
    locs = GRID + EXTRA + RANDOM
    worst = dict(dx=0.0, dy=0.0, struct=0, adv=0, where="", glyph="")
    master_dx = 0.0
    for loc in locs:
        a, b = instance(up, loc), instance(re_, loc)
        dx, dy, st, g = compare_shear(a, b)
        adv = sum(a["hmtx"][n][0] != b["hmtx"][n][0] for n in a.getGlyphOrder())
        if dx > worst["dx"]:
            worst.update(dx=dx, where=str(loc), glyph=g)
        worst["dy"] = max(worst["dy"], dy)
        worst["struct"] += st
        worst["adv"] += adv
        if loc in MASTERS:
            master_dx = max(master_dx, dx)
    n = len(locs)
    record(worst["struct"] == 0, f"retalic: contour structure = upright at {n} sampled locations", "")
    record(worst["adv"] == 0, f"retalic: advance widths = upright at {n} locations (HVAR)", f"{worst['adv']} differ")
    record(worst["dx"] <= 1.0 and worst["dy"] <= 1.0, f"retalic: every point = exact 10 deg shear of upright at {n} locations",
           f"max |dx| {worst['dx']:.3f} ({worst['glyph']} @ {worst['where']}), max |dy| {worst['dy']:.3f} units")
    record(master_dx <= 0.5, "retalic: master locations exact within rounding", f"max |dx| {master_dx:.3f} at the 9 masters")


def shape_v(path: Path, text: str, loc: dict):
    face = hb.Face(hb.Blob.from_file_path(str(path)))
    f = hb.Font(face)
    f.set_variations(loc)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(f, buf, {})
    return [i.codepoint for i in buf.glyph_infos], [(p.x_advance, p.y_advance, p.x_offset, p.y_offset) for p in buf.glyph_positions]


def check_shaping():
    t = math.tan(math.radians(C.RETALIC_ANGLE))
    bad = marks = 0
    worst_mark = 0.0
    locs = GRID[::4] + EXTRA + RANDOM[:4]
    for loc in locs:
        for text in (SAMPLE, COMBINING):
            gu, pu = shape_v(vf("upright"), text, loc)
            gr, pr = shape_v(vf("retalic"), text, loc)
            if gu != gr:
                bad += 1
                continue
            for (xa, ya, xo, yo), (xa2, ya2, xo2, yo2) in zip(pu, pr):
                if xa != xa2 or ya != ya2 or abs(yo - yo2) > 1:
                    bad += 1
                if xo or yo:
                    marks += 1
                    worst_mark = max(worst_mark, abs(xo2 - (xo - yo * t)))
    record(bad == 0, f"retalic: shaped glyphs, advances & variable kerning = upright at {len(locs)} locations", f"{bad} differences")
    record(worst_mark <= 1.5, "retalic: variable mark anchors follow the slant",
           f"{marks} positioned marks, max deviation {worst_mark:.2f} units")


def approved_instance(key: str) -> TTFont:
    with contextlib.redirect_stderr(io.StringIO()):
        f = instancer.instantiateVariableFont(TTFont(vf(key)), C.PROTOTYPE_LOCATION, overlap=instancer.OverlapMode.REMOVE)
    bake_rvrn(f)
    return f


def check_approved_appearance():
    """Each VF at wght 900 / wdth 125 must reproduce the visually approved v0.100 baseline."""
    for key in C.VF_STYLES:
        base_path = C.BASELINE_TTF / f"{C.PROTOTYPE_STYLES[key]['ps_name']}.ttf"
        ours, base = approved_instance(key), TTFont(base_path)
        s1, s2 = shape_signatures(ours), shape_signatures(base)
        diff = [g for g in ours.getGlyphOrder() if not same_sig(s1[g], s2[g])]
        worst = max(((max(abs(u - v) for u, v in zip(s1[g][0], s2[g][0])) if s1[g][0] else 0), g) for g in ours.getGlyphOrder())
        adv = sum(ours["hmtx"][g][0] != base["hmtx"][g][0] for g in ours.getGlyphOrder())
        record(not diff and adv == 0, f"{key}: Extended Black instance matches approved v0.100 baseline",
               f"{len(diff)} glyph shapes differ {diff[:5]}; max bbox deviation {worst[0]:.2f} units ({worst[1]}); advances {adv} differ")
        bad = 0
        loc = C.PROTOTYPE_LOCATION
        for text in (SAMPLE, COMBINING):
            g1, p1 = shape_v(vf(key), text, loc)
            buf_g, buf_p = shape_v(base_path, text, {})
            n1 = [ours.getGlyphName(g) for g in g1]
            n2 = [base.getGlyphName(g) for g in buf_g]
            for a, b, c, d in zip(n1, n2, p1, buf_p):
                same_glyph = a == b or (".BRACKET." in a or ".BRACKET." in b)
                if not same_glyph or c[:2] != d[:2] or abs(c[2] - d[2]) > 1 or abs(c[3] - d[3]) > 1:
                    bad += 1
        record(bad == 0, f"{key}: shaped text at Extended Black = approved baseline", f"{bad} differences")


def check_interpolatable():
    issues = {}
    for key in C.VF_STYLES:
        r = subprocess.run([sys.executable, "-m", "fontTools.varLib.interpolatable", "--json", str(vf(key))],
                           capture_output=True, text=True)
        try:
            data = json.loads(r.stdout or "{}")
        except json.JSONDecodeError:
            record(False, f"{key}: interpolatable ran", r.stderr[-300:])
            continue
        issues[key] = {(g, p["type"]) for g, ps in data.items() for p in ps}
    up_ref = {(g, p["type"]) for g, ps in json.loads(subprocess.run(
        [sys.executable, "-m", "fontTools.varLib.interpolatable", "--json", str(C.UPRIGHT_VF)], capture_output=True, text=True).stdout or "{}").items() for p in ps}
    it_ref = {(g, p["type"]) for g, ps in json.loads(subprocess.run(
        [sys.executable, "-m", "fontTools.varLib.interpolatable", "--json", str(C.ITALIC_VF)], capture_output=True, text=True).stdout or "{}").items() for p in ps}
    summ = lambda s: f"{len({g for g, _ in s})} glyphs ({', '.join(sorted({g for g, _ in s})[:6])}{'…' if len({g for g, _ in s}) > 6 else ''})"
    record(issues.get("upright") == up_ref, "upright: interpolation diagnostics = Archivo's (inherited)", summ(up_ref))
    record(issues.get("italic") == it_ref, "italic: interpolation diagnostics = Archivo's (inherited)", summ(it_ref))
    record(issues.get("retalic", set()) <= up_ref, "retalic: shear introduces no new interpolation issues",
           f"{summ(issues.get('retalic', set()))}, all also flagged in Archivo upright")


def check_clipping_coverage():
    cmaps = {}
    for key in C.VF_STYLES:
        f = font(key)
        os2 = f["OS/2"]
        ymax, ymin = 0, 0
        for loc in GRID + EXTRA:
            g = instance(f, loc)["glyf"]
            for n in g.keys():
                gl = g[n]
                if gl.numberOfContours:
                    ymax, ymin = max(ymax, gl.yMax), min(ymin, gl.yMin)
        record(ymax <= os2.usWinAscent and -ymin <= os2.usWinDescent,
               f"{key}: no vertical clipping across {len(GRID + EXTRA)} instances", f"glyph y {ymin}..{ymax}, usWin {os2.usWinAscent}/{os2.usWinDescent}")
        cmaps[key] = set(f.getBestCmap())
    groups = {"A-Z": range(0x41, 0x5B), "a-z": range(0x61, 0x7B), "0-9": range(0x30, 0x3A),
              "Latin-1": [c for c in range(0xC0, 0x100) if c not in (0xD7, 0xF7)], "Latin Ext-A": range(0x100, 0x180)}
    cov = ", ".join(f"{k} {sum(c in cmaps['upright'] for c in r)}/{len(list(r))}" for k, r in groups.items())
    record(cmaps["upright"] == cmaps["italic"] == cmaps["retalic"] == set(TTFont(C.UPRIGHT_VF).getBestCmap()),
           "coverage identical in all styles and = Archivo", f"{len(cmaps['upright'])} code points; {cov}")


def check_woff2():
    for key in C.VF_STYLES:
        a, b = TTFont(vf(key)), TTFont(vf_woff2(key))
        diff = [t for t in sorted(a.keys()) if t not in ("GlyphOrder", "head", "loca") and a[t].compile(a) != b[t].compile(b)]
        record(not diff, f"{key}: WOFF2 round-trip lossless", f"tables differ: {diff}" if diff else "")


def check_reproducible():
    tmp = Path(tempfile.mkdtemp(prefix=".vf-rebuild-", dir=C.ROOT))
    try:
        diffs = []
        for key, st in C.VF_STYLES.items():
            out = tmp / st["ttf"]
            build(st, out)
            if hashlib.sha256(out.read_bytes()).digest() != hashlib.sha256(vf(key).read_bytes()).digest():
                diffs.append(key)
        record(not diffs, "byte-reproducible rebuild", f"differs: {diffs}" if diffs else "fresh build == dist/ttf")
    finally:
        shutil.rmtree(tmp)


def main() -> None:
    for fn in (check_upstream, check_ots, check_axes, check_instances, check_naming, check_stat, check_preserved,
               check_retalic_static_tables, check_design_space, check_shaping, check_approved_appearance,
               check_interpolatable, check_clipping_coverage, check_woff2, check_reproducible):
        try:
            fn()
        except Exception as e:
            record(False, fn.__name__, f"{type(e).__name__}: {e}")
    lines = ["Venture Beyond variable family validation", f"Version {C.VERSION}; Retalic {C.RETALIC_ANGLE:g} deg; from Archivo {C.UPSTREAM_VERSION} @{C.UPSTREAM_COMMIT[:7]}", ""]
    lines += [f"[{s}] {c}" + (f": {d}" if d else "") for s, c, d in results]
    fails = sum(s == "FAIL" for s, _, _ in results)
    warns = sum(s == "WARN" for s, _, _ in results)
    base = C.BASELINE_DIR / "validation-report.txt"
    if base.exists():
        lines += ["", f"Approved v0.100 baseline ({base.relative_to(C.ROOT)}): {base.read_text().strip().splitlines()[-1]}"]
    lines += ["", f"{len(results)} variable-font checks, {fails} failed, {warns} warnings"]
    report = "\n".join(lines) + "\n"
    (C.ROOT / "dist" / "validation-report.txt").write_text(report)
    print(report)
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
