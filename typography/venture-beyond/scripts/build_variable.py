"""Build the three Venture Beyond variable fonts from pinned Archivo 2.001.

    python scripts/build_variable.py

  Upright  dist/ttf/VentureBeyond[wdth,wght].ttf          Archivo upright VF, renamed
  Italic   dist/ttf/VentureBeyond-Italic[wdth,wght].ttf   Archivo italic VF, renamed
  Retalic  dist/ttf/VentureBeyond-Retalic[wdth,wght].ttf  Archivo upright VF, sheared 10 deg left

Upright and Italic: only naming, STAT, the named-instance list, OS/2 vendor/clipping metrics and
head version change. Outlines, gvar, HVAR, avar, GSUB, GPOS and GDEF keep Archivo's data.

Retalic applies x' = x - (y - PIVOT_Y) * tan(angle) to the whole design space. The shear is linear,
so the result is a true variable font, not an approximation. It is applied to:
  - default outlines (glyf) and composite offsets,
  - every gvar delta: dx' = dx - dy * tan, solved master by master so each of the 9 masters lands
    on the exactly rounded sheared position (no accumulated rounding), then IUP-optimized again,
  - every GPOS mark anchor: default X, and its X variation deltas in the GDEF ItemVariationStore
    (solved the same way), followed by a VarStore re-optimization.
Advance widths (hmtx + HVAR), kerning, GSUB and FeatureVariations stay as they are.
"""

from __future__ import annotations

import math
import sys

from fontTools.misc.roundTools import otRound
from fontTools.otlLib.builder import buildStatTable
from fontTools.ttLib import TTFont
from fontTools.ttLib.tables import otTables as ot
from fontTools.ttLib.tables._f_v_a_r import NamedInstance
from fontTools.varLib.builder import buildVarData, buildVarDevTable
from fontTools.varLib.models import supportScalar

import vb_config as C
from build_prototype import FS_ITALIC, FS_OBLIQUE, FS_REGULAR, FS_USE_TYPO, MAC_ITALIC, assert_shear_safe, iter_anchors
from fetch_upstream import verify as verify_upstream

NO_VARIATION = 0x8000  # Device.DeltaFormat for VariationIndex tables
# 0 = keep every delta IUP can't reproduce exactly. Costs ~0.5 KB vs fontmake's 0.5 and keeps
# Retalic within 0.5 units of the exact shear everywhere tested.
IUP_TOLERANCE = 0.0


# --- master-exact delta solving -------------------------------------------------------------------
def solve_order(supports: list[dict]) -> list[int]:
    """Order tuples so every tuple active at a tuple's peak is solved before it.

    Requires every tuple scalar at every peak to be 0 or 1 (true for Archivo's full-factorial
    edge + corner regions); exits otherwise rather than silently degrading.
    """
    peaks = [{a: p for a, (_, p, _) in s.items()} for s in supports]
    order = sorted(range(len(supports)), key=lambda i: len(supports[i]))
    pos = {t: k for k, t in enumerate(order)}
    for t, peak in enumerate(peaks):
        for u, sup in enumerate(supports):
            sc = supportScalar(peak, sup)
            if sc not in (0, 1):
                sys.exit(f"region scalar {sc} at a master peak: master-exact solving not applicable")
            if sc and u != t and pos[u] > pos[t]:
                sys.exit("region dependency order not solvable")
    return order


_PLANS: dict = {}


def plan(supports) -> tuple[list[int], list[list[float]]]:
    """(solve order, scalars[t][u] = scalar of tuple u at the peak of tuple t), memoized."""
    key = tuple(tuple(sorted(s.items())) for s in supports)
    if key not in _PLANS:
        peaks = [{a: p for a, (_, p, _) in s.items()} for s in supports]
        _PLANS[key] = (solve_order(supports), [[supportScalar(pk, s) for s in supports] for pk in peaks])
    return _PLANS[key]


def solve_x_deltas(supports, x0, y0, dxs, dys, shear) -> tuple[int, list[int]]:
    """Return (new default x, new x deltas per tuple) such that at every master peak the
    reconstructed x equals round(shear(original master position))."""
    order, scalars = plan(supports)
    X0 = otRound(shear(x0, y0))
    new = [0] * len(supports)
    for t in order:
        sc = scalars[t]
        x = x0 + sum(s * d for s, d in zip(sc, dxs))
        y = y0 + sum(s * d for s, d in zip(sc, dys))
        target = otRound(shear(x, y))
        # scalars are exactly 0/1 (checked in solve_order), so this is an exact integer
        new[t] = otRound(target - X0 - sum(sc[u] * new[u] for u in range(len(supports)) if u != t))
    return X0, new


# --- Retalic transform ----------------------------------------------------------------------------
def shear_variable(font: TTFont, angle: float) -> dict:
    assert_shear_safe(font)
    t = math.tan(math.radians(angle))
    S = lambda x, y: C.shear_x(x, y, angle)      # outline points: pivot at PIVOT_Y
    S0 = lambda x, y: x - y * t                  # translations (component offsets): no pivot
    glyf, gvar, hmtx = font["glyf"], font["gvar"], font["hmtx"]
    stats = dict(glyphs=0, deltas=0, anchors=0)

    for name in font.getGlyphOrder():
        g = glyf[name]
        if g.numberOfContours == 0:
            continue
        coords, ctrl = glyf._getCoordinatesAndControls(name, hmtx.metrics)
        orig = list(coords)  # includes 4 phantom points
        variations = gvar.variations.get(name, [])
        for v in variations:
            v.calcInferredDeltas(orig, ctrl.endPts)  # make every delta explicit before transforming
        supports = [v.axes for v in variations]
        npts = len(orig) - 4
        fn = S0 if g.isComposite() else S
        new_coords = list(orig)
        new_dx = [[None] * len(orig) for _ in variations]
        new_dy = [[None] * len(orig) for _ in variations]
        for i in range(npts):
            x0, y0 = orig[i]
            dxs = [v.coordinates[i][0] for v in variations]
            dys = [v.coordinates[i][1] for v in variations]
            X0, nd = solve_x_deltas(supports, x0, y0, dxs, dys, fn)
            # y is not sheared, but IUP-inferred y deltas are fractional: solve them master-exactly
            # too, so every master's y equals Upright's rounded master y.
            _, ndy = solve_x_deltas(supports, x0, y0, dxs, dys, lambda x, y: y)
            new_coords[i] = (X0, y0)
            for k in range(len(variations)):
                new_dx[k][i], new_dy[k][i] = nd[k], ndy[k]
        # write default outline / component offsets
        if g.isComposite():
            for c, (x, _) in zip(g.components, new_coords[:npts]):
                c.x = x
        else:
            for i in range(npts):
                g.coordinates[i] = new_coords[i]
        # write deltas: x sheared, y re-solved (same values at masters); phantom points
        # (advance/origin) keep their values. gvar stores integers.
        for k, v in enumerate(variations):
            v.coordinates = [
                (new_dx[k][i], new_dy[k][i]) if i < npts
                else (otRound(v.coordinates[i][0]), otRound(v.coordinates[i][1]))
                for i in range(len(orig))
            ]
            stats["deltas"] += npts
        if variations:
            new_all = new_coords[:npts] + orig[npts:]
            for v in variations:
                v.optimize(new_all, ctrl.endPts, tolerance=IUP_TOLERANCE, isComposite=g.isComposite())
        stats["glyphs"] += 1

    for name in font.getGlyphOrder():
        g = glyf[name]
        if g.numberOfContours != 0:
            g.recalcBounds(glyf)
            hmtx[name] = (hmtx[name][0], g.xMin)

    stats["anchors"] = shear_anchors(font, S)
    font["post"].italicAngle = float(angle)
    hhea = font["hhea"]
    hhea.caretSlopeRise, hhea.caretSlopeRun, hhea.caretOffset = 1000, -otRound(1000 * t), 0
    return stats


def shear_anchors(font: TTFont, S) -> int:
    store = font["GDEF"].table.VarStore
    regions = store.VarRegionList.Region
    axis_tags = [a.axisTag for a in font["fvar"].axes]
    supports = [
        {axis_tags[i]: (ra.StartCoord, ra.PeakCoord, ra.EndCoord)
         for i, ra in enumerate(r.VarRegionAxis) if ra.PeakCoord != 0}
        for r in regions
    ]

    def deltas(dev) -> list[int]:
        out = [0] * len(regions)
        if dev is None:
            return out
        if dev.DeltaFormat != NO_VARIATION:
            sys.exit("anchor has a hinting Device table; not supported")
        vd = store.VarData[dev.StartSize]
        if dev.EndSize >= len(vd.Item):  # NO_VARIATION_INDEX
            return out
        for ri, d in zip(vd.VarRegionIndex, vd.Item[dev.EndSize]):
            out[ri] = d
        return out

    new_items, targets = [], []
    for a in iter_anchors(font):
        if a.Format == 2:
            sys.exit("contour-point anchors not supported")
        dx = deltas(getattr(a, "XDeviceTable", None))
        dy = deltas(getattr(a, "YDeviceTable", None))
        X0, ndx = solve_x_deltas(supports, a.XCoordinate, a.YCoordinate, dx, dy, S)
        a.XCoordinate = X0
        if any(ndx):
            targets.append(a)
            new_items.append(ndx)
        elif a.Format == 3:
            a.XDeviceTable = None
    if new_items:
        outer = len(store.VarData)
        store.VarData.append(buildVarData(list(range(len(regions))), new_items, optimize=False))
        store.VarDataCount = len(store.VarData)
        for inner, a in enumerate(targets):
            a.Format = 3
            a.XDeviceTable = buildVarDevTable((outer << 16) | inner)
            if not hasattr(a, "YDeviceTable"):
                a.YDeviceTable = None
        varidx_map = store.optimize()
        font["GDEF"].table.remap_device_varidxes(varidx_map)
        font["GPOS"].table.remap_device_varidxes(varidx_map)
    return len(list(iter_anchors(font)))


# --- naming / metadata ----------------------------------------------------------------------------
def set_names_and_instances(font: TTFont, style: dict) -> None:
    name = font["name"]
    name.names = []
    base = {
        0: C.COPYRIGHT,
        1: style["legacy_family"],
        2: style["legacy_subfamily"],
        3: f"{C.VERSION};{C.VENDOR_ID};{style['ps_name']}",
        4: f"{C.FAMILY} {style['typo_subfamily']}",
        5: C.version_string(C.VERSION, "variable"),
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
        25: style["ps_prefix"],
    }
    for nid, s in base.items():
        name.setName(s, nid, 3, 1, 0x409)
    fvar = font["fvar"]
    for axis in fvar.axes:
        axis.axisNameID = name.addMultilingualName({"en": {"wght": "Weight", "wdth": "Width"}[axis.axisTag]}, mac=False)
    fvar.instances = []
    for wv, wn in C.WIDTHS:
        for gv, gn in C.WEIGHTS:
            sub, ps = C.instance_name(wn, gn, style["slope"])
            inst = NamedInstance()
            inst.coordinates = {"wght": gv, "wdth": wv}
            inst.subfamilyNameID = name.addName(sub, platforms=((3, 1, 0x409),))
            inst.postscriptNameID = name.addName(ps, platforms=((3, 1, 0x409),))
            fvar.instances.append(inst)


def add_vf_stat(font: TTFont, style: dict) -> None:
    widths = [dict(value=v, name=n or "Normal", **({"flags": 0x2} if n is None else {})) for v, n in C.WIDTHS]
    weights = [
        dict(value=v, name=n, flags=0x2, linkedValue=700) if n == "Regular" else dict(value=v, name=n)
        for v, n in C.WEIGHTS
    ]
    if style["slope"] == "Italic":
        ital, slnt = [dict(value=1, name="Italic")], []
    elif style["slope"] == "Retalic":
        ital, slnt = [dict(value=0, name="Roman", flags=0x2)], [dict(value=style["retalic_angle"], name="Retalic")]
    else:
        ital, slnt = [dict(value=0, name="Roman", flags=0x2, linkedValue=1)], [dict(value=0, name="Upright", flags=0x2)]
    # 'ital' last, per the OpenType STAT recommendation (and Fontbakery's opentype/STAT/ital_axis).
    buildStatTable(font, [
        dict(tag="wdth", name="Width", values=widths),
        dict(tag="wght", name="Weight", values=weights),
        dict(tag="slnt", name="Slant", values=slnt),
        dict(tag="ital", name="Italic", values=ital),
    ], elidedFallbackName="Regular")
    # buildStatTable also writes Macintosh-platform name copies; modern apps read only Windows
    # (3/1/0x409) records, and Mac records are discouraged. Keep Windows records only.
    font["name"].removeNames(platformID=1)


def set_metadata(font: TTFont, style: dict) -> None:
    os2, head = font["OS/2"], font["head"]
    fs = os2.fsSelection & FS_USE_TYPO
    fs |= FS_ITALIC if style["slope"] == "Italic" else FS_REGULAR
    if style["slope"] == "Retalic":
        fs |= FS_OBLIQUE
    os2.fsSelection = fs
    os2.achVendID = C.VENDOR_ID
    os2.usWinAscent = max(os2.usWinAscent, C.WIN_ASCENT)
    os2.usWinDescent = max(os2.usWinDescent, C.WIN_DESCENT)
    head.macStyle = MAC_ITALIC if style["slope"] == "Italic" else 0
    head.fontRevision = float(C.VERSION)
    if "DSIG" in font:
        del font["DSIG"]


def build(style: dict, ttf_path, woff2_path=None) -> dict:
    src = C.UPRIGHT_VF if style["source"] == "upright" else C.ITALIC_VF
    font = TTFont(src)
    created, modified = font["head"].created, font["head"].modified
    stats = {}
    if style["retalic_angle"] is not None:
        stats = shear_variable(font, style["retalic_angle"])
    set_names_and_instances(font, style)
    add_vf_stat(font, style)
    set_metadata(font, style)
    font.recalcTimestamp = False
    font["head"].created, font["head"].modified = created, modified
    ttf_path.parent.mkdir(parents=True, exist_ok=True)
    font.save(ttf_path)
    if woff2_path:
        w = TTFont(ttf_path)
        w.flavor = "woff2"
        w.recalcTimestamp = False
        woff2_path.parent.mkdir(parents=True, exist_ok=True)
        w.save(woff2_path)
    return stats


def main() -> None:
    errs = verify_upstream()
    if errs:
        sys.exit("upstream verification failed:\n  " + "\n  ".join(errs))
    for key, style in C.VF_STYLES.items():
        stats = build(style, C.DIST_TTF / style["ttf"], C.DIST_WOFF2 / style["woff2"])
        print(f"wrote dist/ttf/{style['ttf']} + dist/woff2/{style['woff2']}", stats or "")


if __name__ == "__main__":
    main()
