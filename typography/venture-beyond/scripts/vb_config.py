"""Shared configuration for the Venture Beyond build pipeline.

Everything that defines the family (upstream pin, slant geometry, naming) lives here so the
build, validator and specimen generator can't drift apart.
"""

from __future__ import annotations

import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UPSTREAM_DIR = ROOT / "upstream" / "archivo"
DIST_TTF = ROOT / "dist" / "ttf"
DIST_WOFF2 = ROOT / "dist" / "woff2"
SPECIMENS = ROOT / "specimens"
INTEGRATION = ROOT / "integration"
# The visually approved v0.100 Extended Black prototype. Rebuilt by build_prototype.py and pinned
# by hash below: it is the reference the variable fonts must match at wght 900 / wdth 125.
BASELINE_DIR = ROOT / "baseline" / "extended-black-0.100"
BASELINE_TTF = BASELINE_DIR / "ttf"
BASELINE_WOFF2 = BASELINE_DIR / "woff2"
APPROVED_BASELINE = {  # approved 2026-11-18 (10 deg Retalic)
    "ttf/VentureBeyond-ExtendedBlack.ttf": "df2e305806ecca12fbd64b278a7fdcfd0fe8b21edca17d2992bdd139e8b8d9ad",
    "ttf/VentureBeyond-ExtendedBlackItalic.ttf": "5f724d1db6f1aea9c6709e01b16ad3be9aa531ba45b2dd91abd885c0d6591a70",
    "ttf/VentureBeyond-ExtendedBlackRetalic.ttf": "aa0da33ec6a05e7c86dfb0c191100f8060842f696acae873b9208c901de95395",
    "woff2/VentureBeyond-ExtendedBlack.woff2": "4f3fc3be88ad67fd53935e3ec8cbbd352c04e475b000c0320f7fbb49c76c8de2",
    "woff2/VentureBeyond-ExtendedBlackItalic.woff2": "576892b4a329e63826e591497481d0cf6307234d3d8461c114bd97a3ad18f9b4",
    "woff2/VentureBeyond-ExtendedBlackRetalic.woff2": "945ec11b920e5f5e580d6beae810fb1a3fdcf717c8e75e7bed678220c1842636",
}

# --- Upstream pin -------------------------------------------------------------------------------
UPSTREAM_REPO = "https://github.com/Omnibus-Type/Archivo.git"
UPSTREAM_COMMIT = "211127690e8ff106c36c935f7e5e697114cff103"  # 2026-09-02, "Update OFL.txt"
UPSTREAM_VERSION = "2.001"
# path inside the upstream repo -> sha256 of the vendored copy
UPSTREAM_FILES = {
    "fonts/variable/Archivo[wdth,wght].ttf": "664bbeb10522dac35c174a3860aaecad7b1ad3a0fc8b0d26888e26c824ec556d",
    "fonts/variable/Archivo-Italic[wdth,wght].ttf": "99e6e9a40bc1af881cfce9229e3285e6b35fbeabb7bfb3b42f8899f8d9aba12b",
    "fonts/ttf/ArchivoExpanded-Black.ttf": "9aa0ae6fa9d7d70357437c760d0e61924547abdcc14de31ef4961c2cf40111a0",
    "fonts/ttf/ArchivoExpanded-BlackItalic.ttf": "f71a468f9fd77c9e2a8f1a0dd898131fa3b69d6049a4ca8ca7184a1a629cd489",
    "OFL.txt": "108b4e57c9c796d3d38d0428ca7ee39de47ad93187302718d9b2d8864b9b716b",
    "AUTHORS.txt": "c05b551f655af415eec9ba361f42302c9e7646925b2320a805c07a87a7eab7f8",
    "CONTRIBUTORS.txt": "58254ef449f24e1a26e80aefcf69f4d86cce649fa288de269c5170eae6f5e214",
    "README.md": "aa4726435f0e3274d744e3918f90aeb4dd0bddc983666812ae6303f01afd5db9",
}
UPRIGHT_VF = UPSTREAM_DIR / "Archivo[wdth,wght].ttf"
ITALIC_VF = UPSTREAM_DIR / "Archivo-Italic[wdth,wght].ttf"
UPRIGHT_STATIC_REF = UPSTREAM_DIR / "ArchivoExpanded-Black.ttf"
ITALIC_STATIC_REF = UPSTREAM_DIR / "ArchivoExpanded-BlackItalic.ttf"

# --- Slant geometry -----------------------------------------------------------------------------
# Archivo Italic was made (before optical corrections) by shearing 10 degrees right about
# y = x-height / 2 = 263, keeping advance widths. Measured from the upstream binaries: the 'I' stem
# moves -46 units at the baseline (263 * tan 10deg = 46.4). Retalic mirrors that: same pivot, same
# advances, opposite direction.
PIVOT_Y = 263  # OS/2.sxHeight 526 / 2; sxHeight is constant across the design space (no MVAR)
ARCHIVO_ITALIC_ANGLE = 10.0  # CSS degrees, right-leaning (OpenType post.italicAngle = -10)

# Retalic angle in CSS degrees of lean to the LEFT (CSS: font-style: oblique -N deg;
# OpenType: post.italicAngle = +N, slnt = +N).
RETALIC_ANGLE = 10.0  # approved 2026-11-18: mirrors Archivo Italic's 10 deg (12 deg rejected)


def shear_x(x: float, y: float, angle_deg: float) -> float:
    """Retalic shear: lean left by angle_deg about y = PIVOT_Y."""
    return x - (y - PIVOT_Y) * math.tan(math.radians(angle_deg))


# --- Prototype instance -------------------------------------------------------------------------
PROTOTYPE_LOCATION = {"wght": 900, "wdth": 125}

# --- Clipping metrics ---------------------------------------------------------------------------
# Archivo ships usWinAscent/Descent 1100/410 (from its default instance), but at Black Expanded
# Aringacute reaches y=1107 and comma-below accents (Gcommaaccent, Scommaaccent, ...) reach -440,
# so Windows GDI clips them, in Omnibus' own static TTFs too. These are the family-wide extremes
# (Upright + Italic, wght 100-900 x wdth 62-125; shear doesn't change y). USE_TYPO_METRICS is set,
# so line spacing (typo/hhea, untouched) does not change.
WIN_ASCENT = 1107
WIN_DESCENT = 440

# --- Naming -------------------------------------------------------------------------------------
FAMILY = "Venture Beyond"
PS_FAMILY = "VentureBeyond"
PROTOTYPE_VERSION = "0.100"
VERSION = "0.200"  # variable family
VENDOR_ID = "NONE"  # no registered vendor ID; don't borrow Omnibus' OMNI
COPYRIGHT = (
    "Copyright 2020 The Archivo Project Authors (https://github.com/Omnibus-Type/Archivo). "
    "Venture Beyond modifications copyright 2026 RaidGuild."
)
MANUFACTURER = "RaidGuild; based on Archivo by Omnibus-Type"
DESIGNER = "Hector Gatti, Omnibus-Type (Archivo); RaidGuild (Venture Beyond)"
VENDOR_URL = "https://www.brand.raidguild.org/"
DESIGNER_URL = "http://www.omnibus-type.com"
LICENSE_DESC = (
    "This Font Software is licensed under the SIL Open Font License, Version 1.1. "
    "This license is available with a FAQ at: https://openfontlicense.org"
)
LICENSE_URL = "https://openfontlicense.org"


def version_string(version: str = PROTOTYPE_VERSION, note: str = "prototype") -> str:
    return (
        f"Version {version}; {note}; derived from Archivo {UPSTREAM_VERSION} "
        f"(Omnibus-Type/Archivo@{UPSTREAM_COMMIT[:7]})"
    )


# style key -> naming/metadata for the Extended Black prototype
PROTOTYPE_STYLES = {
    "upright": dict(
        source="upright",
        retalic_angle=None,
        typo_subfamily="Extended Black",
        legacy_family="Venture Beyond Extended Black",
        legacy_subfamily="Regular",
        full_name="Venture Beyond Extended Black",
        ps_name="VentureBeyond-ExtendedBlack",
        description="Venture Beyond Upright: Archivo's upright design, unchanged outlines.",
    ),
    "italic": dict(
        source="italic",
        retalic_angle=None,
        typo_subfamily="Extended Black Italic",
        legacy_family="Venture Beyond Extended Black",
        legacy_subfamily="Italic",
        full_name="Venture Beyond Extended Black Italic",
        ps_name="VentureBeyond-ExtendedBlackItalic",
        description="Venture Beyond Italic: Archivo's native italic design, unchanged outlines.",
    ),
    "retalic": dict(
        source="upright",
        retalic_angle=RETALIC_ANGLE,
        typo_subfamily="Extended Black Retalic",
        # Legacy (ID 1) names should stay <= 31 chars for old Windows apps.
        legacy_family="Venture Beyond ExtBlack Retalic",
        legacy_subfamily="Regular",
        full_name="Venture Beyond Extended Black Retalic",
        ps_name="VentureBeyond-ExtendedBlackRetalic",
        description=(
            "Venture Beyond Retalic: reverse-slanted outlines generated geometrically from "
            "Archivo's upright (10 degree left shear about half x-height, advances kept). "
            "Not a drawn italic."
        ),
    ),
}


# --- Variable family ----------------------------------------------------------------------------
AXES = {"wght": (100, 600, 900), "wdth": (62, 100, 125)}  # min, default, max (= Archivo)
# Named-instance grid. Width stops follow Archivo's STAT (ExtraCondensed is 62.5 per the axis
# registry; the axis itself still reaches 62). Archivo says "Expanded"; Venture Beyond says "Extended".
WIDTHS = [(62.5, "ExtraCondensed"), (75, "Condensed"), (87.5, "SemiCondensed"), (100, None),
          (112.5, "SemiExtended"), (125, "Extended")]
WEIGHTS = [(100, "Thin"), (200, "ExtraLight"), (300, "Light"), (400, "Regular"), (500, "Medium"),
           (600, "SemiBold"), (700, "Bold"), (800, "ExtraBold"), (900, "Black")]

VF_STYLES = {
    "upright": dict(
        source="upright", retalic_angle=None, slope=None,
        ttf="VentureBeyond[wdth,wght].ttf", woff2="VentureBeyond-Variable.woff2",
        legacy_family="Venture Beyond SemiBold", legacy_subfamily="Regular",
        typo_subfamily="SemiBold", ps_name="VentureBeyond-SemiBold", ps_prefix="VentureBeyondRoman",
        description="Venture Beyond Upright: Archivo's upright design, unchanged outlines.",
    ),
    "italic": dict(
        source="italic", retalic_angle=None, slope="Italic",
        ttf="VentureBeyond-Italic[wdth,wght].ttf", woff2="VentureBeyond-Italic-Variable.woff2",
        legacy_family="Venture Beyond SemiBold", legacy_subfamily="Italic",
        typo_subfamily="SemiBold Italic", ps_name="VentureBeyond-SemiBoldItalic", ps_prefix="VentureBeyondItalic",
        description="Venture Beyond Italic: Archivo's native italic design, unchanged outlines.",
    ),
    "retalic": dict(
        source="upright", retalic_angle=RETALIC_ANGLE, slope="Retalic",
        ttf="VentureBeyond-Retalic[wdth,wght].ttf", woff2="VentureBeyond-Retalic-Variable.woff2",
        legacy_family="Venture Beyond SemiBold Retalic", legacy_subfamily="Regular",
        typo_subfamily="SemiBold Retalic", ps_name="VentureBeyond-SemiBoldRetalic", ps_prefix="VentureBeyondRetalic",
        description=(
            "Venture Beyond Retalic: reverse-slanted outlines generated geometrically from "
            "Archivo's upright (10 degree left shear about half x-height, advances kept) across "
            "the full weight and width range. Not a drawn italic."
        ),
    ),
}


def instance_name(width: str | None, weight: str, slope: str | None) -> tuple[str, str]:
    """(subfamily, PostScript name) for a named instance, e.g. ('Extended Black Retalic',
    'VentureBeyond-ExtendedBlackRetalic'). 'Regular' is elided unless it would be alone."""
    parts = [p for p in (width, None if weight == "Regular" else weight, slope) if p]
    sub = " ".join(parts) or "Regular"
    return sub, f"{PS_FAMILY}-{sub.replace(' ', '')}"
