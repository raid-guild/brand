# Audit record: Last Duel / Eurostile retirement

**Decision (November 2026):** Last Duel and Eurostile are retired entirely from the RaidGuild
brand system. Venture Beyond replaces them. It's RaidGuild's open-source variable display family
(SIL OFL 1.1, derived from Archivo 2.001; see `typography/venture-beyond/`).

This file is an audit record, kept outside the active brand system. It isn't usage guidance.
Don't reintroduce Last Duel or Eurostile as primary or fallback faces.

## What the files said about their licence

Every Last Duel cut carried the same embedded licence notice (OpenType name ID 13):

> PRIVATE / INTERNAL USE ONLY. Modified version of licensed Eurostile LT Std font software
> (Adobe Systems Incorporated; Eurostile is a trademark of Linotype GmbH). Use is governed solely
> by the license under which the original fonts were obtained. No redistribution, sublicensing,
> web hosting or open-source licensing is granted. Renaming does not change the license status.

Other details from the files:
- Copyright (name ID 0): © Adobe Systems Incorporated.
- Version (name ID 5): "private build, renamed from EurostileLTStd-… 2.035".
- Licence URL (name ID 14): `http://www.adobe.com/type/legal.html`.
- Embedding permission (`OS/2.fsType`): `0x0004`, preview & print.

No licence document for these files was ever committed to this repository. Whether
the hosting was covered by the licence that was actually held is for the maintainers to review.
This record makes no finding either way.

## Files removed from the current tree

They were added in `994edc0` (2026-11-02) and are present through `main` @ `152b567`. They stay
in Git history. History hasn't been rewritten, and doing so would need separate authorization.

| Path | Bytes | SHA-256 |
|---|---|---|
| `assets/fonts/last-duel/LastDuel-BoldEx2.otf` | 24652 | `c8ec0fcdf584bb1c1903eba7ed432d3b382f1dd146de684ceb9febc8d932ba70` |
| `assets/fonts/last-duel/LastDuel-BoldEx2Retalic.otf` | 28816 | `06c694f754983a49951d342f0d387039c0da341c6cff1085d477f8a2c4579b58` |
| `assets/fonts/last-duel/LastDuel-BoldOblique.otf` | 25428 | `521457c9320244ac92354a563638abd8ce18597fd39a87d4984c41a02ac51fe6` |
| `assets/fonts/last-duel/LastDuel-Ex2.otf` | 23812 | `8cde147b01fbc5377d96cc3d3138bf959ad84ca093e80a491b35999a6accdc4a` |
| `assets/fonts/last-duel/LastDuel-Ex2Retalic.otf` | 28812 | `5721249a825b820992e14545260d3bd9bc684172eb9046837c4ec9f26733d2d1` |
| `assets/fonts/last-duel/LastDuel-Oblique.otf` | 24496 | `197881fea5f2715948f9f3eba115a4ef4c4db1a5ac260c2c949f1b1313830b41` |
| `public/brand-fonts/louchi/LastDuel-BoldEx2.woff2` | 16588 | `076237f54bf073c687ba6384a7264a86ce26fa38c2391a98aa1be6c1d975c91a` |
| `public/brand-fonts/louchi/LastDuel-BoldEx2Retalic.woff2` | 14072 | `8a8fc472161804caf5d29f0818a861ceba8300aa911e4df39f699cd76f3bb9db` |
| `public/brand-fonts/louchi/LastDuel-BoldOblique.woff2` | 17432 | `317d7bf939b170a029e88ccc33def53adff6e20834a28965c032a978437a5d08` |
| `public/brand-fonts/louchi/LastDuel-Ex2.woff2` | 16224 | `9850106345cdbe26708d583634c61d7eac9be185750b80cafb3b43b74c1a25c5` |
| `public/brand-fonts/louchi/LastDuel-Ex2Retalic.woff2` | 14172 | `b1d90f4cd7c0171c04aabdb2c463dfa71020419b5ab171171d84a70e81d0152b` |
| `public/brand-fonts/louchi/LastDuel-Oblique.woff2` | 16964 | `b0c96669bbe7e1c782ce4b49c9f560b2e9cac7d1b46c7d114230fc05c7412bd3` |
| `scripts/prepare-last-duel-fonts.py` (WOFF2 conversion) | 845 | `4b77a8ccc9bbc17638b0d19ed5bd05aee9be277392d3d6ce69f7be451267395f` |
| `scripts/requirements-fonts.txt` (pinned only for that script) | 32 | `9310db97ecebf214649ce86812bc1820ae2b8d05d2ee2bdfcb895861551aef2f` |

The six WOFF2 files were publicly served by the brand site under `/brand-fonts/louchi/`. They
stay reachable there until a deployment that includes this removal.

## Replacement

| Retired | Replacement |
|---|---|
| Last Duel Extended 2 Regular / Bold | Venture Beyond, Extended width (wdth 125), 400 / 700 |
| Last Duel Oblique / Bold Oblique | Venture Beyond Italic (native), Extended |
| Last Duel Retalic Extended 2 Regular / Bold | Venture Beyond Retalic (10° reverse slant), Extended |
| "Last Duel Extended" (CSS faux-italic alias) | Venture Beyond Italic Bold Extended, with no synthesis |
| `--font-last-duel`, `--font-last-duel-retalic`, `--font-last-duel-extended` | `--font-venture-beyond`, `--font-venture-beyond-retalic` |

## Still distributed outside this repository (not changed here)

The maintainers need to clean these up separately:
- **`raid-guild/portal`:** `public/brand-fonts/louchi/LastDuel-*.woff2` (6), served publicly, plus its
  `theme.css` `@font-face` rules, theme tokens, docs and E2E references.
- **`raid-guild/handbook`** (public): `static/brand-fonts/louchi/LastDuel-*.woff2` (6), served publicly,
  and the Last Duel `@font-face` rules in `src/css/custom.css`.
- **`raid-guild/website`:** Last Duel builds on review branches (for example `review/venture-beyond-redesign`),
  and any preview deployments made from them.
- **Git history** of all of the above, including this repository.
