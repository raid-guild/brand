# Louchi display font provenance

The historical Grinder Refined Regular, Italic and Retalic WOFF2 files were copied
unchanged from `raid-guild/website` revision `a6418ea` on
`review/venture-beyond-redesign`. That revision contains the September 30 font
update at commit `877ba222aa060cce370668c8c05e64d74187a620`:

| Cut | SHA-256 |
| --- | --- |
| `Grinder-Refined-Regular.woff2` | `f0a18f1898aa4f5feda44c223d4ad4fa0ef2944a36d4b1eecd72d552eabb5172` |
| `Grinder-Refined-Italic.woff2` | `11168b3ba10ed4a8ee8de1bc8db4c8d1ee301e9cd5b491de5e710044bf30eef1` |
| `Grinder-Refined-Retalic.woff2` | `0beeaeca1d03fef9ea54813ffb0fb7566c3315a042af5784b06d40150cb81a99` |

The original `Grinder-Regular`, `Grinder-Italic` and `Grinder-Retalic` files are
retained from the earlier website `a00dd80` workshop copy. Louchi supplied the
font package; the project owner reports rights were obtained. This records that
report, not an independent legal verification or a licence grant.

These files support the brand guide and Storybook preview. They are deliberately
outside public/fonts, which the reusable package build copies. Do not add these
files to the package or offer a font download without confirming redistribution
terms. Afacad Flux remains the openly licensed package fallback.


## November 2026 Last Duel update

Louchi supplied six Last Duel OTF cuts: Ex2, BoldEx2, Oblique, BoldOblique, Ex2Retalic, and BoldEx2Retalic. The originals are retained outside the deployed public tree in `assets/fonts/last-duel/`. `scripts/prepare-last-duel-fonts.py` derives only the WOFF2 web cuts in this directory. To rerun it, install the pinned dependencies with `python -m pip install -r scripts/requirements-fonts.txt`, then run `python scripts/prepare-last-duel-fonts.py` from the repository root. The current paired-heading treatment uses native Bold Extended 2 Retalic (700) on top and CSS italic synthesis of Bold Extended 2 (700) on the lower line, matching website `review/venture-beyond-redesign` at `7d0e878`. The other cuts retain native weights and styles. These webfont assets are guide-only and remain outside the reusable package. The earlier Grinder files are retained as historical assets with no active CSS references.
