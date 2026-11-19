"""Generate specimens/venture-beyond-prototype.html: the self-contained Venture Beyond specimen.

    python scripts/make_specimen.py

Fonts are the generated variable WOFF2 files from dist/woff2, embedded as data URIs so the page opens
straight from disk (browsers block file:// font loads). They're registered exactly like
integration/venture-beyond.css ("Venture Beyond" normal/italic + "Venture Beyond Retalic"), with
font-synthesis disabled, so every preview is a real font instance. Outline overlays are drawn from
instances of the built binaries, not from CSS.
"""

from __future__ import annotations

import base64
import contextlib
import html
import io
import json
from pathlib import Path
from string import Template

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

import vb_config as C

OUT = C.SPECIMENS / "venture-beyond-prototype.html"
STYLES = ("upright", "italic", "retalic")


def data_uri(path: Path) -> str:
    if path.suffix == ".woff2":
        data = path.read_bytes()
    else:
        f = TTFont(path)
        f.flavor = "woff2"
        buf = io.BytesIO()
        f.save(buf)
        data = buf.getvalue()
    return "data:font/woff2;base64," + base64.b64encode(data).decode("ascii")


def vf(key: str) -> Path:
    return C.DIST_TTF / C.VF_STYLES[key]["ttf"]


def vf_woff2(key: str) -> Path:
    return C.DIST_WOFF2 / C.VF_STYLES[key]["woff2"]


# --- outline overlays at selectable design-space locations -----------------------------------------
OVERLAY_GLYPHS = list("VENTURBYOD") + list("aegonsy") + list("08&?") + ["Á", "Ç", "Ș"]
OVERLAY_LOCATIONS = [
    ("eb", "Extended Black", {"wght": 900, "wdth": 125}),
    ("rg", "Regular", {"wght": 400, "wdth": 100}),
    ("ct", "ExtraCondensed Thin", {"wght": 100, "wdth": 62.5}),
]


def overlay_set(loc_key: str, loc: dict) -> str:
    fonts = {}
    for k in STYLES:
        with contextlib.redirect_stderr(io.StringIO()):
            fonts[k] = instancer.instantiateVariableFont(TTFont(vf(k)), loc, overlap=instancer.OverlapMode.REMOVE)
    sets = {k: f.getGlyphSet() for k, f in fonts.items()}
    cmap = fonts["upright"].getBestCmap()
    os2 = fonts["upright"]["OS/2"]
    xh, cap, desc, top = os2.sxHeight, os2.sCapHeight, -300, 1000
    hmtx = fonts["upright"]["hmtx"]
    cell = max(hmtx[cmap[ord(ch)]][0] for ch in OVERLAY_GLYPHS) + 2 * 260
    out = []
    for ch in OVERLAY_GLYPHS:
        g = cmap[ord(ch)]
        paths, advs = {}, {}
        for k in STYLES:
            pen = SVGPathPen(sets[k])
            sets[k][g].draw(pen)
            paths[k] = pen.getCommands()
            advs[k] = fonts[k]["hmtx"][g][0]
        adv = advs["upright"]
        pad = (cell - adv) / 2
        h = top - desc
        guides = "".join(f'<line class="guide" x1="{-pad}" x2="{adv + pad}" y1="{y}" y2="{y}"/>' for y in (0, xh, cap))
        guides += f'<line class="guide pivot" x1="{-pad}" x2="{adv + pad}" y1="{C.PIVOT_Y}" y2="{C.PIVOT_Y}"/>'
        box = f'<rect class="advance" x="0" y="{desc}" width="{adv}" height="{h}"/>'
        if advs["italic"] != adv:
            box += f'<rect class="advance it" x="0" y="{desc}" width="{advs["italic"]}" height="{h}"/>'
        out.append(
            f'<figure class="ov"><svg viewBox="{-pad} {-top} {cell} {h}" role="img" aria-label="Outline overlay of {html.escape(ch)}">'
            f'<g transform="scale(1,-1)">{guides}{box}<path class="o-up" d="{paths["upright"]}"/>'
            f'<path class="o-it" d="{paths["italic"]}"/><path class="o-re" d="{paths["retalic"]}"/></g></svg>'
            f'<figcaption><span>{html.escape(g)} · advance {adv}</span></figcaption></figure>'
        )
    hidden = "" if loc_key == "eb" else " hidden"
    return f'<div class="ovs" data-ovset="{loc_key}"{hidden}>' + "\n".join(out) + "</div>"


# --- metadata / validation -------------------------------------------------------------------------
def metadata_rows() -> str:
    rows = []
    for k in STYLES:
        p, w = vf(k), vf_woff2(k)
        f = TTFont(p)
        n = f["name"]
        axes = ", ".join(f"{a.axisTag} {a.minValue:g}–{a.maxValue:g}" for a in f["fvar"].axes)
        cells = [
            p.name, w.name,
            f"{n.getDebugName(16)} / {n.getDebugName(17)} (default)",
            f"{n.getDebugName(1)} / {n.getDebugName(2)}",
            n.getDebugName(25),
            axes,
            str(len(f["fvar"].instances)),
            f"{f['post'].italicAngle:+g}° (CSS {-f['post'].italicAngle:+g}°)",
            f"{f['OS/2'].fsSelection:#06x}",
            f"{p.stat().st_size / 1024:.0f} KB / {w.stat().st_size / 1024:.0f} KB",
        ]
        rows.append("<tr>" + "".join(f"<td>{html.escape(c)}</td>" for c in cells) + "</tr>")
    return "\n".join(rows)


def report(path: Path) -> tuple[str, str]:
    if not path.exists():
        return "not run", ""
    text = path.read_text()
    return [l for l in text.splitlines() if l.strip()][-1], text


UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
LOWER = "abcdefghijklmnopqrstuvwxyz"
NUMS = "0123456789 ½ ¼ ¾ € $ £ ¥ % ‰ + − × ÷ = ≠ ≈ ±"
PUNCT = "! ? ¿ ¡ . , : ; … – — ( ) [ ] { } / \\ | @ # & * § ¶ † ‡ « » ‹ › “ ” ‘ ’ \" ' ®©™"
DIACRITICS = "ÀÁÂÃÄÅĀĂĄǺ ÇĆČ ĎĐ ÈÉÊËĒĘĚ ĞĢ ÌÍÎÏĪĮİ Ķ ĹĻĽŁ ÑŃŅŇ ÒÓÔÕÖØŌŐŒ ŔŘ ŚŞŠȘ ŢŤȚ ÙÚÛÜŪŮŰŲ ÝŸ ŹŻŽ àáâãäåāăą çćč ďđ èéêëēęě ğģ ìíîïīįı ķ ĺļľł ñńņň òóôõöøōőœ ŕř śşšș ţťț ùúûüūůűų ýÿ źżž ß"
STYLE_LABELS = {"upright": "Upright", "italic": "Italic", "retalic": "Retalic"}


def line_controls(n: int, text: str, style: str) -> str:
    seg = "".join(
        f'<button type="button" data-line="{n}" data-style="{k}" aria-pressed="{str(k == style).lower()}">{v}</button>'
        for k, v in STYLE_LABELS.items()
    )
    return f"""
    <fieldset class="line-ctl" data-line="{n}">
      <legend>Line {n}</legend>
      <label class="txt"><span>Text</span><input type="text" id="t{n}" value="{html.escape(text)}" autocomplete="off" spellcheck="false"></label>
      <div class="row"><span class="lbl">Style</span><div class="seg" role="group" aria-label="Line {n} style">{seg}</div></div>
      <label class="rng"><span class="lbl">Weight</span><input type="range" id="w{n}" min="100" max="900" step="1" value="900"><output for="w{n}" id="w{n}o">900</output></label>
      <label class="rng"><span class="lbl">Width</span><input type="range" id="d{n}" min="62" max="125" step="0.5" value="125"><output for="d{n}" id="d{n}o">125</output></label>
    </fieldset>"""


def main() -> None:
    css_faces = "\n".join([
        f'@font-face {{ font-family: "Venture Beyond"; src: url({data_uri(vf_woff2("upright"))}) format("woff2"); '
        "font-weight: 100 900; font-stretch: 62% 125%; font-style: normal; font-display: block; }",
        f'@font-face {{ font-family: "Venture Beyond"; src: url({data_uri(vf_woff2("italic"))}) format("woff2"); '
        "font-weight: 100 900; font-stretch: 62% 125%; font-style: italic; font-display: block; }",
        f'@font-face {{ font-family: "Venture Beyond Retalic"; src: url({data_uri(vf_woff2("retalic"))}) format("woff2"); '
        "font-weight: 100 900; font-stretch: 62% 125%; font-style: normal; font-display: block; }",
        f'@font-face {{ font-family: "Archivo Original"; src: url({data_uri(C.UPRIGHT_VF)}) format("woff2"); '
        "font-weight: 100 900; font-stretch: 62% 125%; font-style: normal; font-display: block; }",
        f'@font-face {{ font-family: "Archivo Original"; src: url({data_uri(C.ITALIC_VF)}) format("woff2"); '
        "font-weight: 100 900; font-stretch: 62% 125%; font-style: italic; font-display: block; }",
    ])
    vf_summary, vf_report = report(C.ROOT / "dist" / "validation-report.txt")
    base_summary, _ = report(C.BASELINE_DIR / "validation-report.txt")
    sets = [("Uppercase", UPPER), ("Lowercase", LOWER), ("Numerals & symbols", NUMS), ("Punctuation", PUNCT), ("Diacritics", DIACRITICS)]
    labels = {"upright": "Upright", "italic": "Italic · native Archivo italic, 10°", "retalic": f"Retalic · {C.RETALIC_ANGLE:g}° geometric"}
    charsets = "\n".join(
        f'<section class="style-block"><h3>{labels[k]}</h3>'
        + "".join(f'<div class="set"><span class="set-label">{n}</span><p class="chars vbs-{k}" contenteditable spellcheck="false">{html.escape(t)}</p></div>' for n, t in sets)
        + "</section>"
        for k in STYLES
    )
    ov_seg = "".join(
        f'<button type="button" data-ov="{k}" aria-pressed="{str(k == "eb").lower()}">{label}</button>' for k, label, _ in OVERLAY_LOCATIONS
    )
    overlays = "\n".join(overlay_set(k, loc) for k, _, loc in OVERLAY_LOCATIONS)
    names = {
        "weights": {str(v): n for v, n in C.WEIGHTS},
        "widths": {f"{v:g}": n for v, n in C.WIDTHS},
    }
    page = Template(TEMPLATE).substitute(
        css_faces=css_faces,
        version=C.VERSION,
        commit=C.UPSTREAM_COMMIT[:7],
        upstream_version=C.UPSTREAM_VERSION,
        angle=f"{C.RETALIC_ANGLE:g}",
        pivot=C.PIVOT_Y,
        line1=line_controls(1, "VENTURE", "retalic"),
        line2=line_controls(2, "BEYOND", "italic"),
        ov_seg=ov_seg,
        overlays=overlays,
        meta_rows=metadata_rows(),
        vf_summary=html.escape(vf_summary),
        base_summary=html.escape(base_summary),
        report=html.escape(vf_report),
        charsets=charsets,
        names_json=json.dumps(names),
    )
    OUT.write_text(page)
    print("wrote", OUT.relative_to(C.ROOT), f"({OUT.stat().st_size / 1024:.0f} KB)")


# string.Template: placeholders are $name. The CSS/JS below deliberately contains no other "$".
TEMPLATE = r"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Venture Beyond Specimen</title>
<style>
$css_faces
:root {
  --bg: #f9f7e7; --fg: #29100a; --muted: #645754; --line: #d5cecd; --card: #fdfcf3;
  --moloch: #bd482d; --scroll: #837820; --up: #b9aeac;
  --ui: "Venture Beyond", system-ui, sans-serif; --mono: ui-monospace, "SF Mono", Menlo, monospace;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { --bg: #29100a; --fg: #f9f7e7; --muted: #b9aeac; --line: #5c2316; --card: #331710; --moloch: #e39b8b; --scroll: #dccd6a; --up: #806f6b; }
}
:root[data-theme="dark"] { --bg: #29100a; --fg: #f9f7e7; --muted: #b9aeac; --line: #5c2316; --card: #331710; --moloch: #e39b8b; --scroll: #dccd6a; --up: #806f6b; }
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: var(--ui); font-weight: 400; font-stretch: 100%; line-height: 1.45; font-synthesis: none; }
/* Real faces only, everywhere: never let the browser fake bold or slant. */
h1, h2, h3, strong, b, legend, th { font-synthesis: none; }
.vbs-upright { font-family: "Venture Beyond"; font-style: normal; }
.vbs-italic  { font-family: "Venture Beyond"; font-style: italic; }
.vbs-retalic { font-family: "Venture Beyond Retalic"; font-style: normal; }
.wrap { max-width: 1280px; margin: 0 auto; padding: 0 16px; }
@media (min-width: 768px) { .wrap { padding: 0 32px; } }
header.top { border-bottom: 1px solid var(--line); padding: 20px 0; }
header.top .wrap { display: flex; flex-wrap: wrap; gap: 12px 24px; align-items: baseline; justify-content: space-between; }
.brand { font-weight: 900; font-stretch: 125%; font-size: 18px; }
.meta { font-family: var(--mono); font-size: 12px; color: var(--muted); }
.chip { display: inline-block; font-family: var(--mono); font-size: 11px; padding: 2px 8px; border: 1px solid var(--moloch); color: var(--moloch); border-radius: 999px; }
h2 { font-weight: 900; font-stretch: 125%; font-size: clamp(22px, 3.2vw, 34px); margin: 0 0 8px; line-height: 1.05; }
h3 { font-weight: 700; font-size: 15px; margin: 0 0 12px; }
section.band { padding: 48px 0; border-bottom: 1px solid var(--line); }
p.lede { color: var(--muted); max-width: 72ch; margin: 0 0 24px; }
.controls { display: flex; flex-wrap: wrap; gap: 10px 20px; align-items: center; margin: 0 0 24px; font-size: 14px; }
.seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; flex-wrap: wrap; }
.seg button { font: inherit; font-size: 13px; padding: 6px 12px; border: 0; background: transparent; color: var(--fg); cursor: pointer; min-height: 32px; }
.seg button[aria-pressed="true"] { background: var(--fg); color: var(--bg); }
button.plain { font: inherit; font-size: 13px; padding: 6px 14px; border: 1px solid var(--fg); border-radius: 8px; background: transparent; color: var(--fg); cursor: pointer; min-height: 32px; }
button:focus-visible, input:focus-visible, [contenteditable]:focus-visible { outline: 2px solid var(--moloch); outline-offset: 2px; }
label.rng { display: inline-flex; gap: 8px; align-items: center; }
label.rng output { font-family: var(--mono); font-size: 12px; min-width: 3.2em; }
input[type=range] { accent-color: var(--moloch); width: 160px; max-width: 46vw; }
/* Composition editor */
.hero { padding: 32px 0 48px; }
.editor { display: grid; gap: 16px; grid-template-columns: 1fr; margin: 16px 0 28px; }
@media (min-width: 900px) { .editor { grid-template-columns: 1fr 1fr auto; align-items: start; } }
fieldset.line-ctl { margin: 0; border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px 14px; display: grid; gap: 10px; min-width: 0; background: var(--card); }
fieldset.line-ctl legend { font-weight: 700; font-size: 13px; padding: 0 6px; }
.line-ctl .row, .line-ctl label.rng { display: grid; grid-template-columns: 64px 1fr auto; gap: 10px; align-items: center; }
.line-ctl label.rng input { width: 100%; max-width: none; }
.line-ctl .lbl, .line-ctl .txt span { font-size: 13px; color: var(--muted); }
.line-ctl .row .seg { justify-self: start; }
.line-ctl .txt { display: grid; grid-template-columns: 64px 1fr; gap: 10px; align-items: center; }
.line-ctl input[type=text] { font: inherit; font-size: 16px; padding: 7px 10px; border: 1px solid var(--line); border-radius: 8px; background: var(--bg); color: var(--fg); min-width: 0; width: 100%; }
.editor-actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.comp { margin: 0; line-height: .88; letter-spacing: -.005em; font-size: 160px; }
.comp span { display: block; white-space: pre; width: max-content; max-width: none; }
.stage { overflow: hidden; padding: 6px 0; }
.caption { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-top: 16px; }
.status { font-family: var(--mono); font-size: 11px; color: var(--muted); }
/* Before / after */
.grid3 { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 1000px) { .grid3 { grid-template-columns: 1fr 1fr 1fr; } }
.card { background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 20px; overflow: hidden; }
.card .k { font-family: var(--mono); font-size: 11px; color: var(--muted); margin: 0 0 12px; }
.card .comp { font-size: clamp(30px, 8vw, 64px); }
@media (min-width: 1000px) { .card .comp { font-size: clamp(28px, 3.1vw, 46px); } }
.arch { font-family: "Archivo Original"; font-weight: 900; font-stretch: 125%; }
.skew { display: inline-block; transform: skewX(10deg); transform-origin: 0 72%; }
.eb { font-weight: 900; font-stretch: 125%; }
/* Character sets */
.styles { display: grid; gap: 32px; }
.set { display: grid; grid-template-columns: 1fr; gap: 4px; padding: 10px 0; border-top: 1px solid var(--line); }
@media (min-width: 768px) { .set { grid-template-columns: 170px 1fr; gap: 16px; } }
.set-label { font-family: var(--mono); font-size: 12px; color: var(--muted); padding-top: .5em; }
.chars { margin: 0; font-size: var(--cs, 40px); font-weight: var(--cw, 900); font-stretch: var(--cd, 125%); line-height: 1.25; overflow-wrap: anywhere; outline: none; }
/* Overlays */
.legend { display: flex; flex-wrap: wrap; gap: 8px 20px; font-size: 13px; margin-bottom: 16px; }
.legend label { display: inline-flex; gap: 6px; align-items: center; cursor: pointer; }
.sw { width: 18px; height: 10px; border-radius: 2px; display: inline-block; }
.ovs { display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
.ovs[hidden] { display: none; }
@media (min-width: 900px) { .ovs { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); } }
figure.ov { margin: 0; background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 8px; }
figure.ov svg { width: 100%; height: auto; display: block; }
figure.ov figcaption { padding: 4px 4px 0; font-family: var(--mono); font-size: 11px; color: var(--muted); }
.guide { stroke: var(--line); stroke-width: 3; }
.guide.pivot { stroke: var(--moloch); stroke-dasharray: 14 10; stroke-width: 3; opacity: .6; }
.advance { fill: none; stroke: var(--muted); stroke-width: 3; stroke-dasharray: 10 8; }
.advance.it { stroke: var(--scroll); }
.o-up { fill: var(--up); opacity: .55; }
.o-it { fill: none; stroke: var(--scroll); stroke-width: 12; }
.o-re { fill: none; stroke: var(--moloch); stroke-width: 12; }
body.hide-up .o-up, body.hide-it .o-it, body.hide-re .o-re { display: none; }
/* Waterfall */
.wf { display: grid; gap: 0; }
.wf-row { display: grid; grid-template-columns: 1fr; gap: 2px; padding: 8px 0; border-top: 1px solid var(--line); }
@media (min-width: 768px) { .wf-row { grid-template-columns: 150px 1fr; gap: 16px; align-items: baseline; } }
.wf-row .set-label { padding: 0; }
.wf-row p { margin: 0; font-size: clamp(24px, 4.4vw, 52px); line-height: 1.1; white-space: nowrap; overflow: hidden; text-overflow: clip; }
.kern { font-size: clamp(26px, 5vw, 56px); line-height: 1.2; margin: 0 0 8px; overflow-wrap: anywhere; }
body.nokern .kern { font-kerning: none; font-feature-settings: "kern" 0; }
.tbl { overflow-x: auto; }
table { border-collapse: collapse; font-size: 13px; min-width: 980px; width: 100%; }
th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--line); vertical-align: top; }
th { font-weight: 700; }
td { font-family: var(--mono); font-size: 12px; }
details summary { cursor: pointer; font-size: 14px; }
pre { font-family: var(--mono); font-size: 11.5px; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 12px; }
ul.notes { max-width: 80ch; padding-left: 1.2em; }
ul.notes li { margin: 6px 0; }
code { font-family: var(--mono); font-size: .9em; }
footer { padding: 32px 0 64px; color: var(--muted); font-size: 13px; }
</style>
</head>
<body>
<header class="top"><div class="wrap">
  <div class="brand">Venture Beyond</div>
  <div class="meta">v$version · variable · Upright / Italic / Retalic · from Archivo $upstream_version @$commit</div>
  <div class="seg" role="group" aria-label="Theme">
    <button type="button" data-theme-set="light" aria-pressed="false">Light</button><button type="button" data-theme-set="dark" aria-pressed="false">Dark</button>
  </div>
</div></header>

<main>
<section class="hero"><div class="wrap">
  <p><span class="chip">Final review: not yet in production</span></p>
  <h2>Composition</h2>
  <p class="lede">Edit each line on its own: text, style, weight and width. Every preview is an instance of the generated variable fonts. The browser can't fake bold or slant here (font-synthesis is off).</p>
  <div class="editor">
    $line1
    $line2
    <div class="editor-actions">
      <button type="button" class="plain" id="reset">Reset to VENTURE / BEYOND</button>
    </div>
  </div>
  <div class="stage" id="stage"><h1 class="comp" id="hero"><span id="l1">VENTURE</span><span id="l2">BEYOND</span></h1></div>
  <p class="caption" id="hero-cap"></p>
  <p class="status" id="font-status">Loading fonts…</p>
</div></section>

<section class="band"><div class="wrap">
  <h2>Before / after</h2>
  <p class="lede">Archivo has no reverse slant. Venture Beyond's Upright and Italic are Archivo's outlines, unchanged. The CSS-skew card shows what Retalic replaces: it looks the same, but it's a transform, not a font. It doesn't work in Figma, and it breaks selection, carets and layout boxes.</p>
  <div class="grid3">
    <div class="card"><p class="k">Before · Archivo Expanded Black, upright + italic (original VF)</p>
      <p class="comp"><span class="arch">VENTURE</span><span class="arch" style="font-style:italic">BEYOND</span></p></div>
    <div class="card"><p class="k">After · Venture Beyond Extended Black Retalic $angle° + Italic</p>
      <p class="comp"><span class="vbs-retalic eb">VENTURE</span><span class="vbs-italic eb">BEYOND</span></p></div>
    <div class="card"><p class="k">Reference · Archivo upright + CSS skewX($angle deg): a transform, not a font</p>
      <p class="comp"><span><span class="arch skew">VENTURE</span></span><span class="arch" style="font-style:italic">BEYOND</span></p></div>
  </div>
</div></section>

<section class="band"><div class="wrap">
  <h2>Upright · Italic · Retalic</h2>
  <p class="lede">All three variable fonts at any point in the design space. Every line is editable. Retalic has the same character set and spacing as Upright.</p>
  <div class="controls">
    <label class="rng">Size <input type="range" id="cs" min="18" max="120" value="40"><output id="cs-o">40px</output></label>
    <label class="rng">Weight <input type="range" id="cw" min="100" max="900" value="900"><output id="cw-o">900</output></label>
    <label class="rng">Width <input type="range" id="cd" min="62" max="125" step="0.5" value="125"><output id="cd-o">125</output></label>
  </div>
  <div class="styles">$charsets</div>
</div></section>

<section class="band"><div class="wrap">
  <h2>Weights</h2>
  <p class="lede">All nine named weights of the selected style and width, taken from the variable fonts.</p>
  <div class="controls">
    <div class="seg" role="group" aria-label="Waterfall style">
      <button type="button" data-wf="upright" aria-pressed="false">Upright</button><button type="button" data-wf="italic" aria-pressed="false">Italic</button><button type="button" data-wf="retalic" aria-pressed="true">Retalic</button>
    </div>
    <label class="rng">Width <input type="range" id="wfd" min="62" max="125" step="0.5" value="125"><output id="wfd-o">125</output></label>
  </div>
  <div class="wf" id="wf"></div>
</div></section>

<section class="band"><div class="wrap">
  <h2>Outline overlays</h2>
  <p class="lede">Drawn from instances of the variable fonts. Dashed box = advance width, the same in all three styles. Red dashed line = shear pivot (y = $pivot, half the x-height), the same pivot Omnibus used for Archivo Italic. Retalic is an exact geometric shear of Upright at every location. Italic is a drawn design (see a, e, g, o, s).</p>
  <div class="controls"><div class="seg" role="group" aria-label="Overlay location">$ov_seg</div></div>
  <div class="legend">
    <label><input type="checkbox" data-hide="hide-up" checked><span class="sw" style="background:var(--up)"></span>Upright (fill)</label>
    <label><input type="checkbox" data-hide="hide-it" checked><span class="sw" style="background:var(--scroll)"></span>Italic (outline)</label>
    <label><input type="checkbox" data-hide="hide-re" checked><span class="sw" style="background:var(--moloch)"></span>Retalic $angle° (outline)</label>
  </div>
  $overlays
</div></section>

<section class="band"><div class="wrap">
  <h2>Kerning &amp; spacing</h2>
  <p class="lede">Advance widths and kerning are the same as Upright everywhere in the design space. The shear keeps horizontal gaps at every height, so pairs that don't collide in Upright can't collide in Retalic.</p>
  <div class="controls"><label><input type="checkbox" id="kern" checked> Kerning on</label></div>
  <p class="kern vbs-upright eb">AVATAR LTA WAVE “TYPO” Yo Te</p>
  <p class="kern vbs-italic eb">AVATAR LTA WAVE “TYPO” Yo Te</p>
  <p class="kern vbs-retalic eb">AVATAR LTA WAVE “TYPO” Yo Te</p>
</div></section>

<section class="band"><div class="wrap">
  <h2>Font files</h2>
  <div class="tbl"><table>
    <thead><tr><th>TTF</th><th>WOFF2</th><th>Family / default style (16/17)</th><th>Legacy (1/2)</th><th>PS prefix (25)</th><th>Axes</th><th>Named instances</th><th>italicAngle</th><th>fsSelection</th><th>TTF / WOFF2</th></tr></thead>
    <tbody>$meta_rows</tbody>
  </table></div>
</div></section>

<section class="band"><div class="wrap">
  <h2>Validation</h2>
  <p class="lede"><code>scripts/validate_variable.py</code>: $vf_summary<br><code>scripts/validate.py</code> (approved Extended Black baseline): $base_summary</p>
  <details><summary>Full variable-font report</summary><pre>$report</pre></details>
  <h3 style="margin-top:24px">Known limitations</h3>
  <ul class="notes">
    <li>Retalic is a geometric oblique, not a drawn reverse italic. Round letters (o, e, s, C, O) show the usual oblique stress. Correcting that optically would mean redrawing glyphs, which is out of scope.</li>
    <li>The fonts are unhinted, like Archivo's variable fonts. This matters only at small sizes on Windows.</li>
    <li>usWinAscent/Descent are 1107/440, so Ǻ and comma-below accents don't clip on Windows. Archivo's own values clip them at Black Expanded. Line spacing is unchanged.</li>
  </ul>
</div></section>
</main>
<footer><div class="wrap">Venture Beyond is derived from Archivo by Omnibus-Type (Héctor Gatti), © 2020 The Archivo Project Authors, under the SIL Open Font License 1.1.</div></footer>

<script>
(function () {
  "use strict";
  var NAMES = $names_json;
  var DEFAULTS = [{ text: "VENTURE", style: "retalic", w: 900, d: 125 }, { text: "BEYOND", style: "italic", w: 900, d: 125 }];
  var STORE = "vb-composition-v1";
  var root = document.documentElement, body = document.body;
  function q(id) { return document.getElementById(id); }
  function press(group, btn) { group.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); }); }
  function load(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* Theme */
  function setTheme(t) { root.setAttribute("data-theme", t); document.querySelectorAll("[data-theme-set]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.themeSet === t)); }); save("vb-theme", t); }
  setTheme(load("vb-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  document.querySelectorAll("[data-theme-set]").forEach(function (b) { b.addEventListener("click", function () { setTheme(b.dataset.themeSet); }); });

  /* Style application: real families only */
  var FAMILY = { upright: ["Venture Beyond", "normal"], italic: ["Venture Beyond", "italic"], retalic: ["Venture Beyond Retalic", "normal"] };
  function applyStyle(el, style, w, d) {
    el.style.fontFamily = '"' + FAMILY[style][0] + '"';
    el.style.fontStyle = FAMILY[style][1];
    el.style.fontWeight = String(w);
    el.style.fontStretch = d + "%";
  }
  function instanceName(style, w, d) {
    var wn = NAMES.weights[String(w)], dn = NAMES.widths[String(d)];
    var slope = style === "italic" ? "Italic" : style === "retalic" ? "Retalic" : "";
    if (wn !== undefined && (dn !== undefined || String(d) === "100")) {
      var parts = [dn || "", wn === "Regular" ? "" : wn, slope].filter(Boolean);
      return parts.join(" ") || "Regular";
    }
    return (slope || "Upright") + " · wght " + w + " · wdth " + d;
  }

  /* Composition editor */
  var state = load(STORE) || JSON.parse(JSON.stringify(DEFAULTS));
  function syncControls() {
    [1, 2].forEach(function (n) {
      var s = state[n - 1];
      q("t" + n).value = s.text; q("w" + n).value = s.w; q("d" + n).value = s.d;
      q("w" + n + "o").textContent = s.w; q("d" + n + "o").textContent = s.d;
      document.querySelectorAll('button[data-line="' + n + '"]').forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.style === s.style)); });
    });
  }
  function fit() {
    var hero = q("hero"), stage = q("stage");
    hero.style.fontSize = "200px";
    var widest = Math.max(q("l1").scrollWidth, q("l2").scrollWidth, 1);
    var avail = stage.clientWidth - 4;
    var size = Math.min(200 * avail / widest, 176);
    hero.style.fontSize = Math.max(size, 12) + "px";
  }
  function render() {
    [1, 2].forEach(function (n) {
      var s = state[n - 1], el = q("l" + n);
      el.textContent = s.text.length ? s.text : " ";
      applyStyle(el, s.style, s.w, s.d);
    });
    q("hero-cap").textContent = "Line 1: " + instanceName(state[0].style, state[0].w, state[0].d) + "  ·  Line 2: " + instanceName(state[1].style, state[1].w, state[1].d);
    fit();
    save(STORE, state);
  }
  [1, 2].forEach(function (n) {
    q("t" + n).addEventListener("input", function (e) { state[n - 1].text = e.target.value; render(); });
    q("w" + n).addEventListener("input", function (e) { state[n - 1].w = Number(e.target.value); q("w" + n + "o").textContent = e.target.value; render(); });
    q("d" + n).addEventListener("input", function (e) { state[n - 1].d = Number(e.target.value); q("d" + n + "o").textContent = e.target.value; render(); });
  });
  document.querySelectorAll("button[data-line]").forEach(function (b) {
    b.addEventListener("click", function () { state[Number(b.dataset.line) - 1].style = b.dataset.style; press(b.parentNode, b); render(); });
  });
  q("reset").addEventListener("click", function () { state = JSON.parse(JSON.stringify(DEFAULTS)); syncControls(); render(); });
  window.addEventListener("resize", fit);
  syncControls(); render();

  /* Font status: confirm the three generated files are the faces in use */
  var faces = [['900 expanded 20px "Venture Beyond"', "Upright"], ['italic 900 expanded 20px "Venture Beyond"', "Italic"], ['900 expanded 20px "Venture Beyond Retalic"', "Retalic"]];
  Promise.all(faces.map(function (f) { return document.fonts.load(f[0], "VB").then(function (r) { return r.length ? f[1] : null; }, function () { return null; }); })).then(function (ok) {
    var got = ok.filter(Boolean);
    q("font-status").textContent = got.length === 3 ? "Fonts: 3/3 Venture Beyond variable files loaded (Upright, Italic, Retalic). Synthesis off." : "Fonts: only " + got.join(", ") + " loaded";
    fit();
  });
  document.fonts.ready.then(fit);

  /* Character sets */
  function bindRange(id, prop, unit) {
    var el = q(id), out = q(id + "-o");
    el.addEventListener("input", function () { root.style.setProperty(prop, el.value + unit); out.textContent = el.value + (id === "cs" ? "px" : ""); });
  }
  bindRange("cs", "--cs", "px"); bindRange("cw", "--cw", ""); bindRange("cd", "--cd", "%");

  /* Waterfall */
  var wfStyle = "retalic", wfd = q("wfd");
  function renderWf() {
    var host = q("wf"); host.textContent = "";
    Object.keys(NAMES.weights).forEach(function (w) {
      var row = document.createElement("div"); row.className = "wf-row";
      var lab = document.createElement("span"); lab.className = "set-label"; lab.textContent = NAMES.weights[w] + " " + w;
      var p = document.createElement("p"); p.textContent = "Venture Beyond 2026";
      applyStyle(p, wfStyle, Number(w), Number(wfd.value));
      row.appendChild(lab); row.appendChild(p); host.appendChild(row);
    });
    q("wfd-o").textContent = wfd.value;
  }
  wfd.addEventListener("input", renderWf);
  document.querySelectorAll("[data-wf]").forEach(function (b) { b.addEventListener("click", function () { wfStyle = b.dataset.wf; press(b.parentNode, b); renderWf(); }); });
  renderWf();

  /* Overlays */
  document.querySelectorAll("[data-ov]").forEach(function (b) { b.addEventListener("click", function () {
    press(b.parentNode, b);
    document.querySelectorAll("[data-ovset]").forEach(function (s) { s.hidden = s.dataset.ovset !== b.dataset.ov; });
  }); });
  document.querySelectorAll("[data-hide]").forEach(function (c) { c.addEventListener("change", function () { body.classList.toggle(c.dataset.hide, !c.checked); }); });
  q("kern").addEventListener("change", function (e) { body.classList.toggle("nokern", !e.target.checked); });
})();
</script>
</body>
</html>
"""

if __name__ == "__main__":
    main()
