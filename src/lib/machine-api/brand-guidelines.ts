import { createHash } from "node:crypto";
import { BRAND_SYSTEM } from "@/generated/brand-data";
import { BRAND_ARCHITECTURE } from "@/lib/brand-architecture";

const LIVE_BASE_URL = "https://www.brand.raidguild.org";
const RAW_BASE_URL =
  "https://raw.githubusercontent.com/raid-guild/brand/main/public";

const logoFiles = BRAND_SYSTEM.assets.logos.map((logo) => logo.file);
const roleIcons = BRAND_SYSTEM.assets.roleIcons;
const serviceIcons = BRAND_SYSTEM.assets.serviceIcons;
const magicIcons = BRAND_SYSTEM.assets.magicIcons;
const illustrationScenes = Object.fromEntries(
  Object.entries(BRAND_SYSTEM.assets.illustrations.scenesBySize).map(
    ([size, collection]) => [size, collection.scenes],
  ),
);
const componentCatalog = BRAND_SYSTEM.components.map((component) => component.id);
const toCamelCase = (value: string) =>
  value.toLowerCase().replace(/[- ]+(.)/g, (_, character: string) => character.toUpperCase());
const getTokenScale = (prefix: "moloch" | "scroll" | "neutral") =>
  Object.fromEntries(
    Object.entries(BRAND_SYSTEM.baseTokens)
      .filter(([token]) => token.startsWith(`--${prefix}-`))
      .map(([token, value]) => [token.replace(`--${prefix}-`, ""), value]),
  );

const payload = {
  schema:
    "https://www.brand.raidguild.org/schemas/brand-guidelines-v1.json",
  schemaVersion: BRAND_SYSTEM.release.schemaVersion,
  contentVersion: BRAND_SYSTEM.release.brandVersion,
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
      defaultReign: BRAND_SYSTEM.defaultReign,
      durableIdentity: "black crossed swords",
      reigns: BRAND_SYSTEM.reigns.map((reign) => ({
        id: reign.id,
        steward: reign.steward,
        status: reign.status,
        available: reign.available,
        source: reign.sourceUrl ?? reign.sourceLabel,
        palette: Object.fromEntries(
          reign.palette.map((color) => [toCamelCase(color.name), color.value]),
        ),
        direction: reign.direction,
        dataVersion: reign.dataVersion,
        ...(reign.evidenceNote
          ? { evidence: "partial-reconstruction", archiveNote: reign.evidenceNote }
          : {}),
      })),
      implementation: {
        selectorLocation: "top-right header",
        persistenceKey: BRAND_SYSTEM.reignStorageKey,
        source: "src/brand/system.ts",
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
        moloch: getTokenScale("moloch"),
        scroll: getTokenScale("scroll"),
        neutral: getTokenScale("neutral"),
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
            "Use Table for semantic tabular data, DataTable for column-driven sorting, Badge for compact status, and Chart for data visualization.",
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
      totalFiles:
        Object.values(BRAND_SYSTEM.assets.illustrations.scenesBySize).reduce(
          (total, collection) => total + collection.scenes.length,
          0,
        ) *
        BRAND_SYSTEM.assets.illustrations.palettes.length *
        Object.keys(BRAND_SYSTEM.assets.illustrations.tones).length *
        2,
      reignReferences: {
        louchi: {
          source:
            "https://github.com/raid-guild/website/tree/6e5f3ec8eade94ddb05a0eb63146aef4a7d80c65/public/images/neo",
          characterStyleGuide: `${LIVE_BASE_URL}/images/reigns/louchi/character-style-guide.png`,
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
      palettes: BRAND_SYSTEM.assets.illustrations.palettes,
      variantsPerScene:
        BRAND_SYSTEM.assets.illustrations.palettes.length *
        Object.keys(BRAND_SYSTEM.assets.illustrations.tones).length *
        2,
      urlTemplates: {
        full: `${LIVE_BASE_URL}/assets/webp/{palette}/{size}/{scene}-{tone}.webp`,
        thumbnail: `${LIVE_BASE_URL}/assets/webp/{palette}/thumbnails/{size}/{scene}-{tone}.webp`,
      },
      scenesBySize: illustrationScenes,
      usage:
        "Maintain the original aspect ratio and do not request a scene from a size directory other than the one listed.",
    },
    fonts: {
      folder: `${LIVE_BASE_URL}/fonts/`,
      reignFamilies: Object.fromEntries(
        BRAND_SYSTEM.reigns.map((reign) => [
          reign.id,
          [
            reign.typography.display,
            reign.typography.body,
            "mono" in reign.typography ? reign.typography.mono : null,
          ]
            .filter(Boolean),
        ]),
      ),
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
      files: BRAND_SYSTEM.assets.fonts.map(({ file }) => ({
        file,
        url: `${LIVE_BASE_URL}/fonts/${file}`,
      })),
      note: "Ubuntu Mono is loaded through next/font/google and is not stored as a local asset.",
    },
    social: {
      dimensions: "400x400",
      format: "png",
      files: BRAND_SYSTEM.assets.social.map(({ file }) => ({
          file,
          url: `${LIVE_BASE_URL}/assets/social/${file}`,
        })),
    },
    guidelinesPdf: {
      format: "pdf",
      url: `${LIVE_BASE_URL}/assets/${BRAND_SYSTEM.assets.guidelinesPdf.file}`,
      rawUrl: `${RAW_BASE_URL}/assets/${BRAND_SYSTEM.assets.guidelinesPdf.file}`,
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
      repoPath: "src/generated/brand-tokens.css",
      url: "https://github.com/raid-guild/brand/blob/main/src/generated/brand-tokens.css",
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
