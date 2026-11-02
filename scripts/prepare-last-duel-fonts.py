"""Derive guide-only web fonts from Louchi's six supplied Last Duel OTF cuts.

Install scripts/requirements-fonts.txt, then run this script.

The original OTFs live under assets/fonts/last-duel, outside public assets and
the reusable brand-system package. Font output is deterministic.
"""
from pathlib import Path
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[1]
FONTS = ROOT / "public/brand-fonts/louchi"
SOURCES = ROOT / "assets/fonts/last-duel"
CUTS = (
    "Ex2",
    "BoldEx2",
    "Oblique",
    "BoldOblique",
    "Ex2Retalic",
    "BoldEx2Retalic",
)


for cut in CUTS:
    source = SOURCES / f"LastDuel-{cut}.otf"
    font = TTFont(source)
    font.recalcTimestamp = False
    font.flavor = "woff2"
    font.save(FONTS / f"LastDuel-{cut}.woff2", reorderTables=True)
    print(f"Prepared LastDuel-{cut}")
