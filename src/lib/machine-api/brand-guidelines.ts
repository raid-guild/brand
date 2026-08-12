import "server-only";

import { createHash } from "node:crypto";
import { BRAND_ARCHITECTURE } from "@/lib/brand-architecture";

const LIVE_BASE_URL = "https://www.brand.raidguild.org";
const RAW_BASE_URL =
  "https://raw.githubusercontent.com/raid-guild/brand/main/public";

const logoFiles = [
  "symbol-black.svg",
  "full-m800.svg",
  "full-m500.svg",
  "full-s100.svg",
  "full-m500-m800.svg",
  "full-m800-m500.svg",
  "full-m800-s100.svg",
  "full-s100-s700.svg",
  "symbol-m800.svg",
  "symbol-m500.svg",
  "symbol-s700.svg",
  "symbol-m500-m800.svg",
  "symbol-m800-m500.svg",
  "symbol-m800-s100.svg",
  "symbol-s100-s700.svg",
] as const;

const roleIcons = {
  alchemist: "DAO Consultant",
  archer: "Visual Design",
  cleric: "Account Manager",
  druid: "Data Science",
  dwarf: "Treasury",
  healer: "Internal Operations",
  hunter: "Business Development",
  monk: "Project Management",
  necromancer: "DevOps",
  paladin: "Backend Development",
  ranger: "UX Design",
  rogue: "Legal",
  scribe: "Content Creation",
  sorcerer: "Role character",
  tavernkeeper: "Community",
  warrior: "Frontend Development",
  wizard: "Smart Contracts",
} as const;

const serviceIcons = [
  "community",
  "consultation",
  "culture",
  "dao",
  "education",
  "experiment",
  "frontend",
  "fullstack",
  "learning",
  "manifesto",
  "marketing",
  "robot",
  "spear",
  "sprint",
  "swords",
] as const;

const magicIcons = [
  "candle",
  "cauldron",
  "chalice",
  "crystal",
  "feather",
  "flask",
  "hourglass",
  "lantern",
  "moon",
  "pumpkin",
  "sparkle",
  "star",
  "stars",
] as const;

const illustrationScenes = {
  "1440x1440": [
    "castle-flag",
    "castle-staff",
    "desk-work",
    "forge-anvil",
    "forge-building",
    "forge-duo",
    "forge-fire",
    "forge-work",
    "portal-arch",
    "ravens-flight",
    "stairs-spiral",
    "stone-monuments",
    "table-castle",
    "tree-mech",
    "trio-arch",
    "trio-backs",
    "trio-beast",
    "trio-mountain",
    "trio-orb",
    "trio-portal",
    "trio-portraits",
    "trio-profiles",
    "trio-warriors",
    "trio-weapons",
    "trio-wings",
    "warrior-solo",
    "warriors-armed",
    "warriors-belts",
    "warriors-casual",
    "warriors-confident",
    "warriors-forward",
    "warriors-magic",
    "warriors-masked",
    "warriors-moloch",
    "warriors-orbs",
    "warriors-ready",
    "warriors-standing",
    "warriors-triangle",
    "warriors-white",
  ],
  "1080x1440": [
    "arch-gate",
    "book-orb",
    "compass-circular",
    "raven-solo",
    "stairs-cloud",
    "stairs-curve",
    "stairs-twist",
    "stone-pedestal",
    "tower-floating",
    "tower-platform",
    "tower-tree",
    "tree-island",
  ],
  "1440x550": ["ship-front", "ship-mech"],
} as const;

const componentCatalog = [
  "accordion",
  "badge",
  "breadcrumb",
  "button",
  "calendar",
  "card",
  "carousel",
  "chart",
  "checkbox",
  "combobox",
  "command",
  "data-table",
  "date-picker",
  "dialog",
  "drawer",
  "dropdown-menu",
  "form",
  "hover-card",
  "input",
  "item",
  "kbd",
  "label",
  "menubar",
  "multiselect",
  "navigation-menu",
  "pagination",
  "popover",
  "progress",
  "radio-group",
  "scroll-area",
  "select",
  "sheet",
  "sidebar",
  "skeleton",
  "slider",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toggle",
  "tooltip",
  "wizard",
] as const;

const payload = {
  schema:
    "https://www.brand.raidguild.org/schemas/brand-guidelines-v1.json",
  schemaVersion: "1.0.0",
  contentVersion: "2026-louchi-architecture-ven-archive",
  name: "RaidGuild Brand Archive",
  description:
    "A machine-readable guide to the RaidGuild brand, design system, voice, implementation patterns, and complete public asset inventory.",
  sourceOfTruth: "https://github.com/raid-guild/brand",
  baseUrls: {
    live: LIVE_BASE_URL,
    githubRawPublic: RAW_BASE_URL,
    githubTree: "https://github.com/raid-guild/brand/tree/main/public",
  },
  guidelines: {
    architecture: BRAND_ARCHITECTURE,
    identity: {
      summary:
        "RaidGuild is a deliberately evolving, collectively produced identity. The crossed swords are the durable signal; each elected brand steward may guide a new visual world built by many contributors.",
      logoRules: [
        "Use the black crossed swords as the canonical master mark.",
        "Color variations of the crossed swords may identify different tracks or programs.",
        "Wordmarks, lockups, typography, palettes, illustration, and motion belong to a steward reign and may change.",
        "Even the crossed-sword geometry may evolve, but any alteration must preserve recognition and be documented as a new mark version.",
        "Treat the existing full Moloch and Scroll lockups as Suede-era archive assets, not timeless identity rules.",
      ],
    },
    versioning: {
      model:
        "Brand releases are named for the elected brand steward's reign to identify direction and timeframe, not sole authorship. Each era is a group effort with multiple contributors. The guide defaults to the latest available reign and preserves older reigns as selectable versions.",
      defaultReign: "louchi",
      durableIdentity: "black crossed swords",
      reigns: [
        {
          id: "louchi",
          steward: "Louchi",
          status: "latest",
          available: true,
          source:
            "https://github.com/raid-guild/website/tree/feat/venture-beyond-redesign",
          palette: {
            ink: "#102d2c",
            deepTeal: "#0a292b",
            cyan: "#b8e0df",
            parchment: "#efe9d7",
            coral: "#ee3c78",
            acidLime: "#d7e34d",
          },
          direction:
            "Moebius-influenced speculative worlds, expansive editorial typography, spatial composition, and cinematic motion.",
        },
        {
          id: "suede",
          steward: "Suede",
          status: "archived",
          available: true,
          source: "https://github.com/raid-guild/brand",
          direction:
            "Warm Moloch and Scroll palettes, Mazius and EB Garamond typography, D&D role language, and technology-forward line art.",
        },
        {
          id: "tw",
          steward: "TW",
          status: "archived",
          available: true,
          source: "https://www.raidguild.org/witch",
          palette: {
            primary: "#a8452c",
            black: "#29100a",
            secondary: "#f9f7e7",
          },
          direction:
            "Oversized Alchemion and Fratelli typography, tickers, playful motion, rust red, and parchment.",
        },
        {
          id: "ven",
          steward: "Ven",
          status: "archived",
          available: true,
          source: "Surviving RG UI overview, colour sheet, and sword-and-skull illustration",
          evidence: "partial-reconstruction",
          palette: {
            black: "#000000",
            raidPink: "#ff3864",
            white: "#ffffff",
            graphite: "#2b2c34",
            violet: "#b66ad6",
            signalYellow: "#fcfb75",
          },
          direction:
            "High-contrast design-system language using black fields, electric pink line work, ornate display typography, monospaced technical annotation, fantasy role icons, and violet-to-pink framing.",
          archiveNote:
            "The surviving one-sheet credits multiple contributors across brand stewardship, design systems, icons, and implementation. Palette values are sampled from the reference, and a 1420x1800 neon sword-and-skull PNG survives as an illustration artifact; the complete original source package has not been recovered.",
        },
      ],
      implementation: {
        selectorLocation: "top-right header",
        persistenceKey: "raidguild-brand-reign",
        source: "src/lib/brand-reigns.ts",
        cssAttribute: "data-brand-reign",
      },
    },
    colors: {
      primary: {
        background: "#f9f7e7",
        foreground: "#29100a",
        action: "#bd482d",
        warmAccent: "#534a13",
      },
      scales: {
        moloch: {
          100: "#f1efee",
          200: "#efc5bb",
          300: "#e39b8b",
          400: "#d25c41",
          500: "#bd482d",
          600: "#8b3521",
          700: "#5c2316",
          800: "#29100a",
        },
        scroll: {
          100: "#f9f7e7",
          200: "#ece5ac",
          300: "#dccd6a",
          400: "#d2c141",
          500: "#b5a22c",
          600: "#837820",
          700: "#534a13",
          800: "#211e07",
        },
        neutral: {
          100: "#f1efee",
          200: "#d5cecd",
          300: "#b9aeac",
          400: "#9e8e8a",
          500: "#806f6b",
          600: "#645754",
          700: "#433937",
          800: "#221d1c",
          white: "#fafafa",
          black: "#0d0d0d",
        },
      },
      semanticLight: {
        background: "scroll-100",
        foreground: "moloch-800",
        card: "scroll-100",
        primary: "moloch-500",
        primaryForeground: "scroll-100",
        secondary: "neutral-100",
        muted: "neutral-100",
        mutedForeground: "neutral-600",
        accent: "moloch-500",
        destructive: "moloch-300",
        border: "neutral-200",
        input: "neutral-200",
        ring: "moloch-500",
      },
      semanticDark: {
        background: "moloch-800",
        foreground: "scroll-100",
      },
      rule:
        "Use semantic color tokens instead of hardcoded hex values except when defining the brand palette itself.",
    },
    typography: {
      families: {
        display: {
          cssVariable: "--font-display",
          family: "Mazius Display",
          role: "Display, headlines, and brand graphics",
        },
        body: {
          cssVariable: "--font-body",
          family: "EB Garamond",
          role: "Body copy and supporting UI text",
        },
        mono: {
          cssVariable: "--font-mono",
          family: "Ubuntu Mono",
          role: "Code and technical content",
        },
      },
      scale: [
        {
          className: "type-display-lg",
          size: "5rem",
          sizePx: 80,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          family: "display",
          weight: 700,
        },
        {
          className: "type-display-md",
          size: "3.75rem",
          sizePx: 60,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          family: "display",
          weight: 700,
        },
        {
          className: "type-display-sm",
          size: "3rem",
          sizePx: 48,
          lineHeight: 1.2,
          letterSpacing: "0em",
          family: "display",
          weight: 450,
        },
        {
          className: "type-heading-lg",
          size: "2.25rem",
          sizePx: 36,
          lineHeight: 1.2,
          letterSpacing: "0em",
          family: "display",
          weight: 700,
        },
        {
          className: "type-heading-md",
          size: "1.75rem",
          sizePx: 28,
          lineHeight: 1.3,
          letterSpacing: "0em",
          family: "display",
          weight: 700,
        },
        {
          className: "type-heading-sm",
          size: "1.25rem",
          sizePx: 20,
          lineHeight: 1.4,
          letterSpacing: "0.01em",
          family: "display",
          weight: 700,
        },
        {
          className: "type-body-lg",
          size: "1.25rem",
          sizePx: 20,
          lineHeight: 1.4,
          letterSpacing: "0em",
          family: "body",
          weight: 400,
        },
        {
          className: "type-body-md",
          size: "1rem",
          sizePx: 16,
          lineHeight: 1.6,
          letterSpacing: "0em",
          family: "body",
          weight: 400,
        },
        {
          className: "type-body-sm",
          size: "0.75rem",
          sizePx: 12,
          lineHeight: 1.6,
          letterSpacing: "0em",
          family: "body",
          weight: 400,
        },
        {
          className: "type-label",
          size: "1.25rem",
          sizePx: 20,
          lineHeight: 1.2,
          letterSpacing: "0.04em",
          family: "body",
          weight: 700,
          transform: "uppercase",
        },
        {
          className: "type-label-md",
          size: "1rem",
          sizePx: 16,
          lineHeight: 1.5,
          letterSpacing: "0.04em",
          family: "body",
          weight: 700,
          transform: "uppercase",
        },
        {
          className: "type-label-sm",
          size: "0.75rem",
          sizePx: 12,
          lineHeight: 1.6,
          letterSpacing: "0.08em",
          family: "body",
          weight: 700,
          transform: "uppercase",
        },
        {
          className: "type-code-lg",
          size: "1.25rem",
          sizePx: 20,
          lineHeight: 1.4,
          letterSpacing: "0em",
          family: "mono",
          weight: 400,
        },
        {
          className: "type-code-md",
          size: "1rem",
          sizePx: 16,
          lineHeight: 1.5,
          letterSpacing: "0em",
          family: "mono",
          weight: 400,
        },
        {
          className: "type-code-sm",
          size: "0.75rem",
          sizePx: 12,
          lineHeight: 1.6,
          letterSpacing: "0em",
          family: "mono",
          weight: 400,
        },
      ],
      rule:
        "Use type-body-md for the 16px body-base token. Do not synthesize small caps or visually bold normal running copy.",
    },
    layout: {
      radius: {
        base: "0.625rem",
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      breakpoints: {
        mobile: "default",
        tablet: "768px",
        desktop: "1024px",
      },
      containerCustom: {
        width: "100%",
        horizontalMargin: "auto",
        horizontalPadding: "1rem",
        desktopMaxWidth: "80rem",
        desktopHorizontalPadding: "0",
      },
      gridCustom: {
        gap: "1rem",
        mobile: "repeat(4, 1fr)",
        tablet: "repeat(8, 5.75rem)",
        desktop: "repeat(12, 5.75rem)",
        columnWidth: "5.75rem",
      },
    },
    voice: {
      audience:
        "Web3 founders, DAOs, protocols, ecosystem partners, and builders seeking a capable delivery team.",
      tone: [
        "bold",
        "craft-forward",
        "web3-native",
        "collaborative",
        "proof-oriented",
        "lightly mythic",
      ],
      emphasize: [
        "Battle-tested web3 builders assembled around a client mission.",
        "Full-stack delivery across dApps, smart contracts, DAO tooling, infrastructure, design, governance, and content.",
        "Custom teams matched to scope and required expertise.",
        "Completed work, measurable outcomes, and client trust.",
        "Decentralized coordination as a delivery strength.",
      ],
      avoid: [
        "AI or web3 hype that obscures concrete delivery.",
        "Internal lore without a translation into client value.",
        "Generic claims without evidence.",
        "Fantasy language that overpowers clarity.",
        "A corporate or sanitized tone that removes RaidGuild's edge.",
      ],
      preferredLanguage: [
        "raid",
        "guild",
        "builders",
        "battle-tested",
        "full-stack",
        "web3",
        "DAO tooling",
        "public goods",
        "decentralized coordination",
        "custom-assembled team",
        "mission",
        "ship",
        "impact",
        "case study",
        "completed quest",
      ],
      callsToAction: [
        "Hire Us",
        "View Our Work",
        "Start a Raid",
        "Submit Your Request",
        "Join the Guild",
        "Apply to a Cohort",
        "Read the Case Study",
      ],
    },
    copy: {
      titleCase: "Use standard English title casing for titles and headings.",
      caps:
        "Use all caps sparingly and only for short badges or labels where the design explicitly calls for it.",
      runningCopy:
        "Do not force uppercase, pseudo-small-caps, or extra bolding in body copy and navigation.",
    },
    implementation: {
      componentImport: "@/components/ui/<component>",
      componentRule:
        "Compose the existing UI components before proposing bespoke UI.",
      components: componentCatalog,
      componentContracts: {
        button: {
          exports: ["Button", "buttonVariants"],
          variants: ["primary", "secondary", "ghost", "moloch"],
          sizes: ["default", "sm", "lg", "icon"],
          usage: "Use for every button, action trigger, and clickable action.",
        },
        form: {
          exports: [
            "Form",
            "FormField",
            "FormItem",
            "FormLabel",
            "FormControl",
            "FormDescription",
            "FormMessage",
            "RequiredFieldIndicator",
          ],
          usage:
            "Use React Hook Form composition for validated forms; every field needs FormLabel, FormControl, and FormMessage.",
        },
        card: {
          exports: [
            "Card",
            "CardHeader",
            "CardTitle",
            "CardDescription",
            "CardContent",
            "CardFooter",
          ],
          usage: "Use to group related content in a distinct region.",
        },
        structure: {
          choices: ["Card", "Tabs", "Accordion"],
          usage:
            "Use Card for grouped content, Tabs for peer panels, and Accordion for collapsible details or FAQs.",
        },
        overlays: {
          choices: [
            "Dialog",
            "Sheet",
            "Drawer",
            "Popover",
            "Tooltip",
            "HoverCard",
          ],
          usage:
            "Use Dialog for focused modal tasks, Sheet for side panels, Drawer for mobile-first panels, Popover for interactive context, Tooltip for short hints, and HoverCard for rich previews.",
        },
        selection: {
          choices: [
            "Select",
            "Combobox",
            "MultipleSelector",
            "Checkbox",
            "RadioGroup",
            "Switch",
          ],
          usage:
            "Use Select for a fixed list, Combobox for type-ahead search, MultipleSelector for multi-value search, Checkbox for independent choices, RadioGroup for one-of-many choices, and Switch for immediate boolean settings.",
        },
        data: {
          choices: ["Table", "DataTable", "Badge", "Chart"],
          usage:
            "Use Table for semantic tabular data, DataTable for sorting/filtering, Badge for compact status, and Chart for data visualization.",
        },
        navigation: {
          choices: [
            "NavigationMenu",
            "Breadcrumb",
            "Pagination",
            "DropdownMenu",
            "Command",
            "Sidebar",
          ],
          usage:
            "Choose the narrowest existing navigation primitive that matches the information architecture and preserve keyboard behavior.",
        },
      },
      patterns: [
        "Import every component from @/components/ui/<component>; do not recreate an existing primitive.",
        "Prefer composition over custom component styling.",
        "Use semantic tokens for colors and preserve focus-visible rings.",
        "Keep component state local unless it must be shared across components.",
        "Use responsive layouts and validate mobile and desktop behavior.",
      ],
      tokensSource: "src/app/globals.css",
      fontsSource: "src/lib/fonts.ts",
      themeProvider: "src/lib/theme-context.tsx",
      classMergeHelper: "src/lib/utils.ts#cn",
      setupDependencies: [
        "class-variance-authority",
        "clsx",
        "lucide-react",
        "tailwind-merge",
        "@tailwindcss/postcss (development)",
        "tw-animate-css (development)",
      ],
    },
    accessibility: [
      "Give every input a visible label and validation message.",
      "Preserve focus-visible rings and keyboard navigation.",
      "Keep Radix primitives' accessible semantics.",
      "Validate contrast within every selectable steward reign.",
      "Use responsive layouts and test both mobile and desktop.",
      "Use semantic alt text for brand icons and illustrations.",
    ],
  },
  assets: {
    logos: {
      folder: `${LIVE_BASE_URL}/assets/logos/`,
      format: "svg",
      count: logoFiles.length,
      files: logoFiles.map((file) => ({
        file,
        url: `${LIVE_BASE_URL}/assets/logos/${file}`,
      })),
    },
    icons: {
      format: "svg",
      usage:
        "Prefer these icons over emoji in documentation and interfaces. Color them with the brand palette while preserving their original geometry.",
      sets: {
        roles8bit: {
          urlTemplate: `${LIVE_BASE_URL}/assets/icon/8bit/{name}.svg`,
          items: Object.entries(roleIcons).map(([name, role]) => ({
            name,
            role,
          })),
        },
        services: {
          urlTemplate: `${LIVE_BASE_URL}/assets/icon/dd/{name}.svg`,
          items: serviceIcons,
        },
        magic: {
          urlTemplate: `${LIVE_BASE_URL}/assets/icon/magic/{name}.svg`,
          items: magicIcons,
        },
      },
    },
    illustrations: {
      format: "webp",
      totalFiles: 212,
      reignReferences: {
        louchi: {
          source:
            "https://github.com/raid-guild/website/tree/6e5f3ec8eade94ddb05a0eb63146aef4a7d80c65/public/images/neo",
          direction:
            "Moebius-influenced speculative landscapes with cyan horizons, coral structures, and atmospheric detail.",
        },
        tw: {
          source: "https://www.raidguild.org/witch/images/",
          direction:
            "Surreal witchcraft scenes, dense graphic symbols, high-energy crops, and playful motion.",
        },
        suede: {
          source: `${LIVE_BASE_URL}/assets/webp/`,
          direction:
            "Technology-forward line art blending cyberpunk aesthetics with D&D heroism.",
        },
      },
      tones: {
        c: "color",
        bw: "black and white",
      },
      variantsPerScene: 4,
      urlTemplates: {
        full: `${LIVE_BASE_URL}/assets/webp/{size}/{scene}-{tone}.webp`,
        thumbnail: `${LIVE_BASE_URL}/assets/webp/thumbnails/{size}/{scene}-{tone}.webp`,
      },
      scenesBySize: illustrationScenes,
      usage:
        "Maintain the original aspect ratio and do not request a scene from a size directory other than the one listed.",
    },
    fonts: {
      folder: `${LIVE_BASE_URL}/fonts/`,
      reignFamilies: {
        louchi: ["Mazius Display", "EB Garamond", "Ubuntu Mono"],
        suede: ["Mazius Display", "EB Garamond", "Ubuntu Mono"],
        tw: ["Alchemion", "Fratelli"],
      },
      twArchive: [
        {
          file: "Alchemion.otf",
          url: "https://www.raidguild.org/witch/fonts/Alchemion.otf",
        },
        {
          file: "Fratelli.otf",
          url: "https://www.raidguild.org/witch/fonts/Fratelli.otf",
        },
      ],
      files: [
        "MAZIUSREVIEW20.09-Regular.otf",
        "MAZIUSREVIEW20.09-Regular.woff",
        "MaziusDisplay-Bold.otf",
        "MaziusDisplay-Extraitalic.otf",
        "MaziusDisplay-ExtraItalicBold.otf",
        "EBGaramond-VariableFont_wght.ttf",
        "EBGaramond-Italic-VariableFont_wght.ttf",
      ].map((file) => ({ file, url: `${LIVE_BASE_URL}/fonts/${file}` })),
      note: "Ubuntu Mono is loaded through next/font/google and is not stored as a local asset.",
    },
    social: {
      dimensions: "400x400",
      format: "png",
      files: ["400x400_dark.png", "400x400_light.png", "400x400_red.png"].map(
        (file) => ({
          file,
          url: `${LIVE_BASE_URL}/assets/social/${file}`,
        }),
      ),
    },
    guidelinesPdf: {
      format: "pdf",
      url: `${LIVE_BASE_URL}/assets/RaidGuild_brand_guidelines.pdf`,
      rawUrl: `${RAW_BASE_URL}/assets/RaidGuild_brand_guidelines.pdf`,
    },
  },
  references: [
    {
      name: "Brand architecture",
      repoPath: "docs/brand-architecture.md",
      url: "https://github.com/raid-guild/brand/blob/main/docs/brand-architecture.md",
    },
    {
      name: "Agent handbook",
      repoPath: "AGENTS.md",
      url: "https://github.com/raid-guild/brand/blob/main/AGENTS.md",
    },
    {
      name: "Brand voice",
      repoPath: "docs/brand-voice.md",
      url: "https://github.com/raid-guild/brand/blob/main/docs/brand-voice.md",
    },
    {
      name: "UI component catalog",
      repoPath: "docs/ui-components.md",
      url: "https://github.com/raid-guild/brand/blob/main/docs/ui-components.md",
    },
    {
      name: "Design tokens",
      repoPath: "src/app/globals.css",
      url: "https://github.com/raid-guild/brand/blob/main/src/app/globals.css",
    },
  ],
} as const;

const contentHash = createHash("sha256")
  .update(JSON.stringify(payload))
  .digest("hex");

export function getBrandGuidelinesPayload() {
  return {
    ...payload,
    contentHash: `sha256:${contentHash}`,
  };
}
