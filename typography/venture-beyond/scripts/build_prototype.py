"""Build the approved v0.100 Extended Black baseline (Upright, Italic, Retalic) from pinned Archivo.

    python scripts/build_prototype.py

Pipeline per style:
  1. Instance the upstream Archivo variable font at wght=900, wdth=125 (fontTools instancer),
     removing overlaps the same way Omnibus' own static TTFs do.
  2. Retalic only: shear every outline point, component offset and GPOS mark anchor
     left by RETALIC_ANGLE about y = PIVOT_Y. Advance widths, kerning, features: untouched.
  3. Rename to Venture Beyond, set style linking / slant metadata, add STAT.
  4. Write baseline/extended-black-0.100/{ttf,woff2} (byte-reproducible: fixed timestamps).

The output is pinned in vb_config.APPROVED_BASELINE; validate.py fails if it ever changes.

Reads upstream/ only; refuses to run if the upstream hashes don't match the pin.
"""

from __future__ import annotations

import copy
import math
import sys

from fontTools.misc.roundTools import otRound
from fontTools.otlLib.builder import buildStatTable
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

import vb_config as C
from fetch_upstream import verify as verify_upstream

FS_ITALIC, FS_BOLD, FS_REGULAR, FS_USE_TYPO, FS_OBLIQUE = 1 << 0, 1 << 5, 1 << 6, 1 << 7, 1 << 9
MAC_ITALIC = 1 << 1


def instance(src_path) -> TTFont:
    vf = TTFont(src_path)
    font = instancer.instantiateVariableFont(
        vf, C.PROTOTYPE_LOCATION, overlap=instancer.OverlapMode.REMOVE, updateFontNames=False
    )
    bake_rvrn(font)
    return font


def bake_rvrn(font: TTFont) -> None:
    """Copy rvrn alternates (e.g. dollar -> dollar.BRACKET.110 at heavy weights) into the base glyph.

    The instancer leaves the swap to the 'rvrn' feature, so environments that don't shape would show
    the light-weight design. Omnibus' static builds (fontmake) bake the alternate into the base glyph
    instead; do the same. The rvrn lookup stays and now maps between identical glyphs.
    """
    gsub = font["GSUB"].table
    lookups = {i for fr in gsub.FeatureList.FeatureRecord if fr.FeatureTag == "rvrn" for i in fr.Feature.LookupListIndex}
    glyf, hmtx = font["glyf"], font["hmtx"]
    for i in sorted(lookups):
        lk = gsub.LookupList.Lookup[i]
        if lk.LookupType != 1:
            sys.exit(f"rvrn lookup {i} is type {lk.LookupType}; only single substitution is handled")
        for st in lk.SubTable:
            for base, alt in st.mapping.items():
                glyf[base] = copy.deepcopy(glyf[alt])
                hmtx[base] = hmtx[alt]


def iter_gpos_subtables(font: TTFont):
    for lookup in font["GPOS"].table.LookupList.Lookup:
        for st in lookup.SubTable:
            ltype = lookup.LookupType
            if ltype == 9:
                ltype, st = st.ExtensionLookupType, st.ExtSubTable
            yield ltype, st


def iter_anchors(font: TTFont):
    """Yield every Anchor object reachable from mark/cursive GPOS lookups (deduplicated)."""
    seen = set()

    def emit(a):
        if a is not None and id(a) not in seen:
            seen.add(id(a))
            return [a]
        return []

    for ltype, st in iter_gpos_subtables(font):
        out = []
        if ltype == 3:
            for r in st.EntryExitRecord:
                out += emit(r.EntryAnchor) + emit(r.ExitAnchor)
        elif ltype == 4:
            for r in st.MarkArray.MarkRecord:
                out += emit(r.MarkAnchor)
            for r in st.BaseArray.BaseRecord:
                for a in r.BaseAnchor:
                    out += emit(a)
        elif ltype == 5:
            for r in st.MarkArray.MarkRecord:
                out += emit(r.MarkAnchor)
            for la in st.LigatureArray.LigatureAttach:
                for cr in la.ComponentRecord:
                    for a in cr.LigatureAnchor:
                        out += emit(a)
        elif ltype == 6:
            for r in st.Mark1Array.MarkRecord:
                out += emit(r.MarkAnchor)
            for r in st.Mark2Array.Mark2Record:
                for a in r.Mark2Anchor:
                    out += emit(a)
        yield from out


def assert_shear_safe(font: TTFont) -> None:
    """Fail loudly on structures the shear below doesn't handle, instead of producing wrong output."""
    for ltype, st in iter_gpos_subtables(font):
        if ltype in (1, 2):
            records = []
            if ltype == 1:
                records = [st.Value] if st.Format == 1 else list(st.Value)
            elif st.Format == 1:
                for ps in st.PairSet:
                    for r in ps.PairValueRecord:
                        records += [r.Value1, r.Value2]
            else:
                for c1 in st.Class1Record:
                    for c2 in c1.Class2Record:
                        records += [c2.Value1, c2.Value2]
            for v in records:
                if v is not None and (getattr(v, "YPlacement", 0) or getattr(v, "YAdvance", 0)):
                    sys.exit("GPOS has Y placement/advance values: shear would need X compensation")
    gdef = font["GDEF"].table
    if getattr(gdef, "LigCaretList", None):
        sys.exit("GDEF ligature carets present: shear doesn't handle them yet")
    for name in font.getGlyphOrder():
        g = font["glyf"][name]
        if g.isComposite():
            for c in g.components:
                if hasattr(c, "transform") or hasattr(c, "firstPt"):
                    sys.exit(f"composite {name} uses a scaled/point-matched component")


def shear_font(font: TTFont, angle: float) -> None:
    assert_shear_safe(font)
    t = math.tan(math.radians(angle))
    glyf, hmtx = font["glyf"], font["hmtx"]
    order = font.getGlyphOrder()
    for name in order:
        g = glyf[name]
        if g.isComposite():
            # S(p + o) = S(p) + (ox - oy*t, oy): offsets shear with no pivot term
            for c in g.components:
                c.x = otRound(c.x - c.y * t)
        elif g.numberOfContours > 0:
            coords = g.coordinates
            for i, (x, y) in enumerate(coords):
                coords[i] = (otRound(C.shear_x(x, y, angle)), y)
    for name in order:
        g = glyf[name]
        if g.numberOfContours != 0:
            g.recalcBounds(glyf)
            adv, _ = hmtx[name]
            hmtx[name] = (adv, g.xMin)
    for a in iter_anchors(font):
        a.XCoordinate = otRound(C.shear_x(a.XCoordinate, a.YCoordinate, angle))
    font["post"].italicAngle = float(angle)  # OpenType: positive = counter-clockwise = left lean
    hhea = font["hhea"]
    hhea.caretSlopeRise = 1000
    hhea.caretSlopeRun = -otRound(1000 * t)
    hhea.caretOffset = 0


def set_names(font: TTFont, style: dict) -> None:
    name = font["name"]
    name.names = []
    records = {
        0: C.COPYRIGHT,
        1: style["legacy_family"],
        2: style["legacy_subfamily"],
        3: f"{C.PROTOTYPE_VERSION};{C.VENDOR_ID};{style['ps_name']}",
        4: style["full_name"],
        5: C.version_string(),
        6: style["ps_name"],
        7: "Archivo is a trademark of Omnibus-Type.",
        8: C.MANUFACTURER,
        9: C.DESIGNER,
        10: style["description"],
        11: C.VENDOR_URL,
        12: C.DESIGNER_URL,
        13: C.LICENSE_DESC,
        14: C.LICENSE_URL,
        16: C.FAMILY,
        17: style["typo_subfamily"],
    }
    for nid, s in records.items():
        name.setName(s, nid, 3, 1, 0x409)


def set_style_bits(font: TTFont, style: dict) -> None:
    os2, head = font["OS/2"], font["head"]
    is_italic = style["legacy_subfamily"] == "Italic"
    is_retalic = style["retalic_angle"] is not None
    fs = os2.fsSelection & FS_USE_TYPO
    fs |= FS_ITALIC if is_italic else FS_REGULAR
    if is_retalic:
        fs |= FS_OBLIQUE  # honest: geometric oblique, and NOT linked as an italic
    os2.fsSelection = fs
    os2.usWeightClass = C.PROTOTYPE_LOCATION["wght"]
    os2.usWidthClass = 7  # 125% = Expanded
    os2.achVendID = C.VENDOR_ID
    os2.usWinAscent = max(os2.usWinAscent, C.WIN_ASCENT)
    os2.usWinDescent = max(os2.usWinDescent, C.WIN_DESCENT)
    head.macStyle = MAC_ITALIC if is_italic else 0
    head.fontRevision = float(C.PROTOTYPE_VERSION)


def add_stat(font: TTFont, style: dict) -> None:
    ROMAN = dict(value=0, name="Roman", flags=0x2, linkedValue=1)
    if style["retalic_angle"] is not None:
        ital, slnt = [], [dict(value=style["retalic_angle"], name="Retalic")]
    elif style["legacy_subfamily"] == "Italic":
        ital, slnt = [dict(value=1, name="Italic")], []
    else:
        ital, slnt = [ROMAN], [dict(value=0, name="Upright", flags=0x2)]
    axes = [
        dict(tag="wdth", name="Width", values=[dict(value=125, name="Extended")]),
        dict(tag="wght", name="Weight", values=[dict(value=900, name="Black")]),
        dict(tag="ital", name="Italic", values=ital),
        dict(tag="slnt", name="Slant", values=slnt),
    ]
    buildStatTable(font, axes, elidedFallbackName="Regular")


def build_style(style: dict, ttf_path, woff2_path=None) -> None:
    src = C.UPRIGHT_VF if style["source"] == "upright" else C.ITALIC_VF
    font = instance(src)
    upstream_head = TTFont(src)["head"]
    if style["retalic_angle"] is not None:
        shear_font(font, style["retalic_angle"])
    set_names(font, style)
    set_style_bits(font, style)
    add_stat(font, style)
    for tag in ("DSIG",):
        if tag in font:
            del font[tag]
    # Byte-reproducible output: pin timestamps to the upstream build's.
    font.recalcTimestamp = False
    font["head"].created = upstream_head.created
    font["head"].modified = upstream_head.modified
    ttf_path.parent.mkdir(parents=True, exist_ok=True)
    font.save(ttf_path)
    print("wrote", ttf_path.relative_to(C.ROOT))
    if woff2_path:
        w = TTFont(ttf_path)
        w.flavor = "woff2"
        w.recalcTimestamp = False
        woff2_path.parent.mkdir(parents=True, exist_ok=True)
        w.save(woff2_path)
        print("wrote", woff2_path.relative_to(C.ROOT))


def main() -> None:
    errs = verify_upstream()
    if errs:
        sys.exit("upstream verification failed:\n  " + "\n  ".join(errs))
    for style in C.PROTOTYPE_STYLES.values():
        ps = style["ps_name"]
        build_style(style, C.BASELINE_TTF / f"{ps}.ttf", C.BASELINE_WOFF2 / f"{ps}.woff2")


if __name__ == "__main__":
    main()
