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
  contributionNote: string;
  evidenceNote?: string;
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
    contributionNote:
      "Stewarded by Louchi and made real through the work, critique, and adoption of many Guild contributors.",
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
    contributionNote:
      "Stewarded by Suede with design, development, content, and system contributions from across the Guild.",
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
    contributionNote:
      "Stewarded by TW as a collective production involving many contributors across identity, illustration, motion, copy, and implementation.",
    palette: [
      { name: "Primary", value: "#A8452C", role: "Primary field" },
      { name: "Black", value: "#29100A", role: "Type and mark" },
      { name: "Secondary", value: "#F9F7E7", role: "Canvas and contrast" },
    ],
  },
  {
    id: "ven",
    steward: "Ven",
    label: "Ven",
    status: "archived",
    available: true,
    summary:
      "A high-contrast early design-system era built from black fields, electric pink, white, graphite, violet, and signal yellow. Surviving sheets show ornate display type, monospaced technical annotation, fantasy line icons, and a UI-library workflow.",
    sourceLabel: "Surviving RG UI one-sheet",
    contributionNote:
      "The surviving one-sheet explicitly credits multiple contributors across brand stewardship, design systems, icons, and implementation.",
    evidenceNote:
      "Reconstructed from a surviving overview and colour sheet. Palette values are sampled from the reference; a complete original source package has not yet been recovered.",
    palette: [
      { name: "Black", value: "#000000", role: "Primary field" },
      { name: "Raid Pink", value: "#FF3864", role: "Primary signal" },
      { name: "White", value: "#FFFFFF", role: "High-contrast type and canvas" },
      { name: "Graphite", value: "#2B2C34", role: "Secondary surface" },
      { name: "Violet", value: "#B66AD6", role: "Secondary accent" },
      { name: "Signal Yellow", value: "#FCFB75", role: "Secondary highlight" },
    ],
  },
] as const;

export const DEFAULT_BRAND_REIGN: BrandReignId = "louchi";

export function isBrandReignId(value: string | null): value is BrandReignId {
  return BRAND_REIGNS.some((reign) => reign.id === value && reign.available);
}

export function getBrandReign(id: BrandReignId): BrandReign {
  return BRAND_REIGNS.find((reign) => reign.id === id) ?? BRAND_REIGNS[0];
}
