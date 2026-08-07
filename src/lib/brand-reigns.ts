export const BRAND_REIGN_STORAGE_KEY = "raidguild-brand-reign";

export type BrandReignId = "louchi" | "suede" | "tw" | "ven";

export type BrandColor = {
  name: string;
  value: `#${string}`;
  role: string;
};

export type BrandReign = {
  id: BrandReignId;
  steward: string;
  label: string;
  status: "latest" | "archived" | "pending";
  available: boolean;
  summary: string;
  sourceLabel: string;
  sourceUrl?: string;
  palette: readonly BrandColor[];
};

export const BRAND_REIGNS: readonly BrandReign[] = [
  {
    id: "louchi",
    steward: "Louchi",
    label: "Louchi — Latest",
    status: "latest",
    available: true,
    summary:
      "A Moebius-influenced system of deep teal, cyan, parchment, coral, and acid lime, built around expansive editorial type and speculative-world imagery.",
    sourceLabel: "Venture Beyond redesign",
    sourceUrl:
      "https://github.com/raid-guild/website/tree/feat/venture-beyond-redesign",
    palette: [
      { name: "Ink", value: "#102D2C", role: "Canonical dark ink" },
      { name: "Deep Teal", value: "#0A292B", role: "Immersive surface" },
      { name: "Cyan", value: "#B8E0DF", role: "Open field" },
      { name: "Parchment", value: "#EFE9D7", role: "Primary canvas" },
      { name: "Coral", value: "#EE3C78", role: "Signal and action" },
      { name: "Acid Lime", value: "#D7E34D", role: "Highlight and status" },
    ],
  },
  {
    id: "suede",
    steward: "Suede",
    label: "Suede",
    status: "archived",
    available: true,
    summary:
      "The warm Moloch and Scroll system: calligraphic editorial typography, D&D role language, and a red, parchment, and earthen-gold palette.",
    sourceLabel: "Brand repository",
    sourceUrl: "https://github.com/raid-guild/brand",
    palette: [
      { name: "Moloch 800", value: "#29100A", role: "Primary dark" },
      { name: "Moloch 500", value: "#BD482D", role: "Primary action" },
      { name: "Scroll 100", value: "#F9F7E7", role: "Primary canvas" },
      { name: "Scroll 700", value: "#534A13", role: "Warm accent" },
      { name: "Neutral Black", value: "#0D0D0D", role: "Canonical mark" },
    ],
  },
  {
    id: "tw",
    steward: "TW",
    label: "TW",
    status: "archived",
    available: true,
    summary:
      "A high-energy Webflow era using rust red, parchment, oversized custom type, tickers, and playful motion.",
    sourceLabel: "Witch archive",
    sourceUrl: "https://www.raidguild.org/witch",
    palette: [
      { name: "Primary", value: "#A8452C", role: "Primary field" },
      { name: "Black", value: "#29100A", role: "Type and mark" },
      { name: "Secondary", value: "#F9F7E7", role: "Canvas and contrast" },
    ],
  },
  {
    id: "ven",
    steward: "Ven",
    label: "Ven — Reference pending",
    status: "pending",
    available: false,
    summary:
      "An earlier RaidGuild reign reserved in the archive. Its source files and visual rules still need to be recovered.",
    sourceLabel: "Reference files pending",
    palette: [],
  },
] as const;

export const DEFAULT_BRAND_REIGN: BrandReignId = "louchi";

export function isBrandReignId(value: string | null): value is BrandReignId {
  return BRAND_REIGNS.some((reign) => reign.id === value && reign.available);
}

export function getBrandReign(id: BrandReignId): BrandReign {
  return BRAND_REIGNS.find((reign) => reign.id === id) ?? BRAND_REIGNS[0];
}
