# Venture Beyond

RaidGuild's display typeface family, derived from **[Archivo](https://github.com/Omnibus-Type/Archivo)
by Omnibus-Type** (Héctor Gatti) under the SIL Open Font License 1.1.

| Style | What it is |
|---|---|
| **Upright** | Archivo's upright design. Outlines, variations, spacing and kerning unchanged. |
| **Italic** | Archivo's native, drawn italic (10°). Outlines, variations, spacing and kerning unchanged. |
| **Retalic** | New. A reverse (left-leaning) 10° slant generated geometrically from Archivo's upright, across the whole design space. |

> **Status: v0.200 release candidate.** Accepted for release preparation on 2026-11-18. Approved:
> Upright, Italic, Retalic 10°, Archivo's weight and width ranges, and the Extended Black appearance.
> **Not committed yet, and not integrated into any product.** Existing production fonts (Last Duel,
> Mazius, Grinder) are untouched until each migration is approved. See
> [`integration/migration-plan.md`](integration/migration-plan.md).
>
> Quick links: [Install (macOS / Figma / Adobe)](INSTALL.md) ·
> [Next.js](integration/nextjs.md) · [CSS](integration/venture-beyond.css) ·
> [Tokens](integration/tokens.json) · [Specimen](specimens/venture-beyond-prototype.html)

## Files

| File | Style | Axes | Named instances |
|---|---|---|---|
| `dist/ttf/VentureBeyond[wdth,wght].ttf` | Upright | wght 100–900, wdth 62–125 | 54 |
| `dist/ttf/VentureBeyond-Italic[wdth,wght].ttf` | Italic | wght 100–900, wdth 62–125 | 54 |
| `dist/ttf/VentureBeyond-Retalic[wdth,wght].ttf` | Retalic | wght 100–900, wdth 62–125 | 54 |
| `dist/woff2/VentureBeyond-Variable.woff2` | Upright (web) | same | – |
| `dist/woff2/VentureBeyond-Italic-Variable.woff2` | Italic (web) | same | – |
| `dist/woff2/VentureBeyond-Retalic-Variable.woff2` | Retalic (web) | same | – |

- TTF names follow the Google Fonts convention. WOFF2 names have no brackets, so they're safe in
  URLs and bundler imports.
- `dist/SHA256SUMS` lists the hashes, and `dist/validation-report.txt` has the full QA report.

### Axes

| Axis | Range | Default | Named stops |
|---|---|---|---|
| `wght` | 100–900 | 600 | Thin 100, ExtraLight 200, Light 300, Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800, Black 900 |
| `wdth` | 62–125 | 100 | ExtraCondensed 62.5, Condensed 75, SemiCondensed 87.5, (Normal) 100, SemiExtended 112.5, Extended 125 |

The axis ranges, defaults and `avar` are Archivo's, unchanged. The default is 600 because that's
Archivo's default. Archivo calls width 125 "Expanded"; Venture Beyond calls it **Extended**.
ExtraCondensed sits at 62.5 (the registry value Archivo's STAT uses), while the axis itself reaches 62.

There is no `slnt` or `ital` axis. The slope is a choice of file, because Archivo's Italic is a
different drawing: 479 of its 832 glyphs aren't point-compatible with the Upright. A single slant
axis would need invented masters.

### Layout

```
typography/venture-beyond/
├── upstream/archivo/              pinned, read-only Archivo 2.001 files (SHA-256 verified)
├── dist/ttf, dist/woff2           the variable family (deliverable)
├── baseline/extended-black-0.100/ the approved v0.100 static prototype (hash-pinned reference)
├── integration/                   venture-beyond.css, tokens.json, nextjs.md, example.html, migration-plan.md
├── INSTALL.md                     desktop installation (macOS, Figma, Adobe, Windows)
├── specimens/                     venture-beyond-prototype.html (self-contained, interactive)
├── scripts/                       build + validation pipeline
├── LICENSE/                       OFL.txt (family) + Archivo's OFL / AUTHORS / CONTRIBUTORS
├── FONTLOG.txt                    modification log (OFL convention)
└── sources/                       reserved; see sources/README.md
```

## Provenance & license

| | |
|---|---|
| Upstream | `https://github.com/Omnibus-Type/Archivo` |
| Commit | `211127690e8ff106c36c935f7e5e697114cff103` (2026-09-02), Archivo **2.001** |
| Sources used | `fonts/variable/Archivo[wdth,wght].ttf`, `fonts/variable/Archivo-Italic[wdth,wght].ttf`. Omnibus' static `ArchivoExpanded-Black(Italic).ttf` serve as QA references only. |
| Verification | `scripts/fetch_upstream.py` checks the SHA-256 pins in `scripts/vb_config.py`. `--fetch` re-downloads the pinned commit (tested). |
| License | SIL OFL 1.1, © 2020 The Archivo Project Authors. **No Reserved Font Name** is declared. We renamed to Venture Beyond anyway. |

What the OFL asks of us, and how it's met:
- Derivatives stay under the OFL and ship with its text → `LICENSE/OFL.txt`, name IDs 13/14.
- The original copyright is kept → name ID 0 and `LICENSE/OFL.txt`, with RaidGuild's line added.
- Archivo's trademark statement (ID 7) and designer credit (ID 9) are kept, and `FONTLOG.txt` records the changes.
- The fonts can't be sold on their own. Embedding, web use, bundling and redistribution are all fine.

## What changed relative to Archivo

**Upright & Italic files** only get rebranded. Naming, STAT, the named-instance list (Archivo has 9;
Venture Beyond has 54, all 6 widths × 9 weights), the OS/2 vendor ID, usWinAscent/Descent and the
head version change. `glyf`, `gvar`, `hmtx`, `HVAR`, `avar`, `GSUB`, `GPOS`, `GDEF`, `cmap` and `post`
are **byte-identical in content** to Archivo's, and the validator checks this.

**Retalic file:** Archivo's upright, sheared across the whole design space by

```
x' = x − (y − 263) · tan 10°      y' = y
```

The pivot y = 263 is half the x-height. Omnibus used the same pivot to slant Archivo Italic: we
measured the 'I' stem shift of −46 units, which equals 263 × tan 10°. The shear is linear, so a
variable Retalic is exact, not approximated:

- **Outlines and gvar deltas.** dx' = dx − dy·tan 10°. The deltas are solved master by master, so
  each of the 9 masters lands on the exactly rounded sheared position. IUP-inferred deltas are
  expanded first and re-optimized afterwards, with zero tolerance.
- **Composite offsets.** They shear without the pivot term.
- **GPOS mark/mkmk anchors.** The default X and the X variation deltas in the GDEF ItemVariationStore
  are recomputed, then the store is re-optimized. Diacritics follow the slant at every weight and width.
- **Untouched:** advance widths (`hmtx` + `HVAR`), kerning (including variable kerning), `GSUB` and
  FeatureVariations (`rvrn`).

Metadata: `post.italicAngle = +10`, caret slope 1000/−176, OS/2 OBLIQUE set and ITALIC off. Retalic
has its own legacy family, so apps never link it as an italic.

**All three files:** usWinAscent/Descent go from 1100/410 to **1107/440**. At Black Expanded, Archivo
clips Ǻ and the comma-below accents (Ș Ț Ģ Ķ Ļ Ņ Ŗ) on Windows, in Omnibus' own statics too. Line
spacing is unchanged, because USE_TYPO_METRICS is set and typo/hhea are untouched.

### Slant convention

| | OpenType `post.italicAngle` | CSS |
|---|---|---|
| Italic (leans right) | −10 | `font-style: italic` on "Venture Beyond" |
| Retalic (leans left) | +10 | `font-family: "Venture Beyond Retalic"` |

## Naming

| | Upright | Italic | Retalic |
|---|---|---|---|
| Typographic family (16) | Venture Beyond | Venture Beyond | Venture Beyond |
| Default style (17) | SemiBold | SemiBold Italic | SemiBold Retalic |
| Legacy family / style (1/2) | Venture Beyond SemiBold / Regular | Venture Beyond SemiBold / Italic | Venture Beyond SemiBold Retalic / Regular |
| Variations PS prefix (25) | VentureBeyondRoman | VentureBeyondItalic | VentureBeyondRetalic |
| Example instance | Extended Black → `VentureBeyond-ExtendedBlack` | Extended Black Italic → `VentureBeyond-ExtendedBlackItalic` | Extended Black Retalic → `VentureBeyond-ExtendedBlackRetalic` |

- Instance names elide "Regular" and "Normal", e.g. "Condensed Italic", "Retalic", "Black".
- All 162 instance PostScript names are unique across the family.
- STAT axes are `wdth`, `wght`, `slnt`, `ital` in every file (`ital` last, per the spec). Retalic is `slnt = +10` "Retalic".
- Only Windows-platform (3/1/0x409) name records are written. Full names (ID 4) begin with the legacy family (ID 1).
- Upright and Italic share a legacy family, so ⌘B / ⌘I style linking works.

## Build

Requires Python 3.12 (via `uv` or `python3 -m venv`). Pinned dependencies are in `scripts/requirements.txt`.

```sh
cd typography/venture-beyond
sh scripts/build_all.sh      # ~5 minutes, mostly design-space validation
```

| Step | Script | Output |
|---|---|---|
| Verify upstream | `fetch_upstream.py` (`--fetch` to re-download) | – |
| Approved baseline | `build_prototype.py`, `validate.py` | `baseline/extended-black-0.100/` (must equal the pinned hashes) |
| Variable family | `build_variable.py` (~7 s), `validate_variable.py` (~4 min) | `dist/`, `dist/validation-report.txt` |
| Specimen | `make_specimen.py` | `specimens/venture-beyond-prototype.html` |

All outputs are byte-reproducible, and both validators rebuild and compare. The geometry and naming
parameters live in `scripts/vb_config.py`.

## Validation

**Variable family: 96 checks, 0 failed, 0 warnings.** **Approved baseline: 79 checks, 0 failed.**
That's the original 78, plus a hash pin proving the approved files are unchanged. Run on 2026-11-18
after the release-hygiene naming fixes. `dist/` still matches `dist/SHA256SUMS` afterwards.

| Area | Result |
|---|---|
| OpenType Sanitizer (the parser Chrome and Firefox use) | All 3 TTF + 3 WOFF2 pass |
| Axes / avar | Identical to Archivo in all files |
| Named instances | 54 per file, 162 unique PostScript names, all within range; "Extended Black (Italic/Retalic)" at 900/125 |
| Naming, style linking, slant metadata | IDs 1/2/6/16/17/25, fsSelection, macStyle, italicAngle, caret slope; no stale names; Archivo copyright and OFL kept |
| Upright / Italic | Archivo's glyf, gvar, hmtx, HVAR, avar, GSUB, GPOS, GDEF, cmap, post, maxp: identical |
| Retalic geometry | **Every point within 0.5 units of the exact 10° shear of Upright** (rounding only), in x and y, at 67 locations: all 54 named instances, the axis extremes and 10 random interior points. Contour structure identical. |
| Retalic metrics & shaping | Advances identical at all 67 locations. HarfBuzz-shaped text (glyphs, advances, variable kerning) identical to Upright at 21 locations. 189 variable mark attachments follow the slant (max 0.79 units off). |
| Approved appearance | Each VF at wght 900 / wdth 125 matches the approved v0.100 static: 0 glyph-shape differences, 0 advance differences, identical shaped text |
| Interpolation (`fontTools.varLib.interpolatable`) | Retalic's diagnostics match Archivo upright's exactly (4 inherited heuristic flags: `$`/`¢` heavy alternates, ∩, ×). Italic's 80 inherited flags are unchanged. The shear introduces nothing new. |
| Clipping | No glyph goes past usWin at any of 57 instances, in any style |
| Coverage | 653 code points, identical in all styles and equal to Archivo: A–Z, a–z, 0–9, Latin-1 and Latin Extended-A complete |
| WOFF2 / reproducibility | Lossless round trip; fresh rebuild is byte-identical |

### Independent checks (release readiness)

**Fontbakery 1.1.0, `check-universal`: 270 PASS, 7 FAIL, 18 WARN.** For comparison, Archivo's own
variable fonts get 8 FAIL and 14 WARN. The release-hygiene pass fixed three things: Mac name
records, the full-name/family mismatch on Retalic, and the `ital` axis order. The rest are explained below:

| Result | Check | Why it's acceptable |
|---|---|---|
| FAIL ×3 | `name/family_and_style_max_length` | Inherited (Archivo fails it identically). Long instance names such as "ExtraCondensed ExtraLight Italic" exceed the old 31-character Windows GDI limit. Modern apps aren't affected. |
| FAIL ×4 | Retalic: `italic_angle`, `STAT/ital_axis` ("no matching Roman"), `fvar/regular_coords_correct`, `varfont/bold_wght_coord` | **By design.** Fontbakery assumes only roman or italic exist. Retalic is a slanted non-italic: italicAngle +10 is correct OpenType, and its instances are named "Retalic"/"Bold Retalic". See the italic-trait note below. |
| WARN ×18 | `alt_caron`, `interpolation_issues`, `ligature_carets`, `math_signs_width`, `soft_hyphen`, `unreachable_glyphs` | All inherited from Archivo (the same warnings there). |

**macOS CoreText** loaded the files without installing them, through a Swift script:
- It sees 3 × 54 = 162 styles under one family, "Venture Beyond", with 162 unique PostScript names.
- *Extended Black*, *Extended Black Italic* and *Extended Black Retalic* are all present.
- Both axes are exposed.

**Figma**, checked by reading its local font helper's index read-only, without installing:
- Figma takes the family from name ID 16. Public Sans and Rubik, which use the same naming scheme,
  appear as "Public Sans" and "Rubik", so Venture Beyond will appear as "Venture Beyond".

**Italic trait note.** CoreText and Figma both mark Retalic as *italic*, because its `post.italicAngle`
isn't 0. The OS/2 ITALIC bit is off, but they ignore it. Figma already treats Last Duel's Retalic cuts
the same way. In practice you pick Retalic by style name. An "italic" toggle in native Mac apps could
land on either slanted style.

**Not verified here:** an actual install into Font Book, Figma and Adobe apps. That would change the
machine's font set, so it's left to whoever does the install, following [INSTALL.md](INSTALL.md).

**Specimen and integration CSS**, tested in Chrome at 1440px and 390px (phone, in an iframe, since the
window can't go narrower), in light and dark themes:
- No horizontal overflow at either width.
- Editing works live: text (lowercase, numerals and accents tested), style, weight, width, and Reset.
- All three variable files load, and every element resolves to a real face with `font-synthesis: none`.

**Not verified by automation:** Figma, Adobe apps, and the macOS/Windows font menus. Install
`dist/ttf/` and check that "Venture Beyond" lists the Upright, Italic and Retalic instances.

## Installation

**Desktop (macOS, Windows, Figma, Adobe):** install the three TTFs from `dist/ttf/`. Figma desktop and
the font helper pick them up. Look for **Venture Beyond**: the style menu lists named instances such as
*Extended Black Retalic*, and the variable-axis controls are available. **First uninstall any v0.100
prototype statics** (`VentureBeyond-ExtendedBlack*.ttf`), because their PostScript names match the new
named instances.

**Web / Next.js:** see [`integration/nextjs.md`](integration/nextjs.md). For plain CSS, use
[`integration/venture-beyond.css`](integration/venture-beyond.css). Tokens are in
[`integration/tokens.json`](integration/tokens.json) (W3C Design Tokens format). The core mapping:

```css
@font-face { font-family: "Venture Beyond";         src: url(VentureBeyond-Variable.woff2) format("woff2");         font-weight: 100 900; font-stretch: 62% 125%; font-style: normal; }
@font-face { font-family: "Venture Beyond";         src: url(VentureBeyond-Italic-Variable.woff2) format("woff2");  font-weight: 100 900; font-stretch: 62% 125%; font-style: italic; }
@font-face { font-family: "Venture Beyond Retalic"; src: url(VentureBeyond-Retalic-Variable.woff2) format("woff2"); font-weight: 100 900; font-stretch: 62% 125%; font-style: normal; }

.vb-venture { font-family: "Venture Beyond Retalic"; font-weight: 900; font-stretch: 125%; font-synthesis: none; } /* Extended Black Retalic */
.vb-beyond  { font-family: "Venture Beyond"; font-style: italic; font-weight: 900; font-stretch: 125%; font-synthesis: none; } /* Extended Black Italic */
```

Retalic gets its own family name on purpose. If it were registered as italic or oblique, browsers
would use it for `<em>`/`<i>` or substitute it. Always set `font-synthesis: none`, and never fake a
slant with `skewX` or `oblique <angle>`.

## Specimen

Open `specimens/venture-beyond-prototype.html` directly in a browser. It's self-contained, with the
fonts embedded, at about 1.6 MB. It has:
- A two-line composition editor: text, Upright/Italic/Retalic, weight and width for each line, live
  updates, saved locally, and Reset to the approved VENTURE / BEYOND.
- Before/after against the original Archivo.
- Character sets with weight and width sliders.
- A weight waterfall.
- Outline overlays at Extended Black, Regular and ExtraCondensed Thin.
- Kerning samples, file metadata and the validation report.
- A light/dark toggle and a responsive layout.

## Known limitations

- **Retalic is a geometric oblique**, not a drawn reverse italic. Round letters show the usual oblique
  stress. Correcting that optically would mean redrawing glyphs, which the brief rules out. The font
  metadata (name ID 10) says so.
- **Unhinted**, like Archivo's variable fonts. This only matters at small sizes on Windows, so it's
  irrelevant for a display face.
- **No static instances are shipped.** Apps without variable-font support, such as some older Office
  versions, would need statics. `build_prototype.py` shows how; ask if you need them.
- **Inherited from Archivo:** the 4 interpolation heuristic flags in Upright/Retalic and the 80 in
  Italic (mostly "kink" warnings in round Italic glyphs). They look the same in Archivo itself.
- The **`rvrn` feature** swaps seven currency signs (`$ ¢ ₡ ₦ ₩ ₲ ₵`) for simplified shapes from wght 500 up. That's
  Archivo's design. Shaping engines (browsers, Figma, CoreText, DirectWrite) apply it automatically.
- **Validation takes ~4 minutes.** It instances 67 locations twice and runs the interpolation checker.
- The shear code refuses to run, rather than produce wrong output, if Archivo ever gains GPOS
  Y-placement values, ligature carets, point-matched or scaled components, or non-master-aligned
  variation regions.

## Status & next steps

- **Approved (2026-11-18):** 10° Retalic; the Extended Black appearance, now frozen in `baseline/`.
- **Delivered (v0.200):** the three variable fonts, the interactive specimen, and the integration
  CSS, tokens and Next.js guide.
- **Not done, by design:**
  - Nothing is wired into the brand site, the website or Portal.
  - Last Duel is untouched. It's built in a separate private project, used by Portal, and commercial (internal use only).
  - Nothing is committed.
- **Next:** commit (on approval), a hands-on Figma and Adobe install check, then production integration
  one app at a time, in the order in [`integration/migration-plan.md`](integration/migration-plan.md):
  the website's Venture Beyond redesign line (replaces the unlicensed Grinder), then Portal's dark and light
  themes (replaces Last Duel), then the brand site, then the website (only if the redesign adopts it).
