import { z } from "zod";

const hexColorSchema = z.string().regex(/^#[0-9a-f]{6}([0-9a-f]{2})?$/i);
const cssTokenMapSchema = z.record(z.string(), z.string().min(1));

export const brandColorSchema = z.object({
  name: z.string().min(1),
  value: hexColorSchema,
  role: z.string().min(1),
});

export const brandReignSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  steward: z.string().min(1),
  label: z.string().min(1),
  status: z.enum(["latest", "archived", "reconstructed", "unavailable"]),
  available: z.boolean(),
  summary: z.string().min(1),
  direction: z.string().min(1),
  sourceLabel: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  contributionNote: z.string().min(1),
  evidenceNote: z.string().min(1).optional(),
  palette: z.array(brandColorSchema).min(1),
  tokens: cssTokenMapSchema,
  darkTokens: cssTokenMapSchema.optional(),
  typography: z.object({
    display: z.string().min(1),
    body: z.string().min(1),
    mono: z.string().min(1).optional(),
  }),
  dataVersion: z.string().min(1),
});

export const practiceSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  name: z.string().min(1),
  relationship: z.literal("A RaidGuild practice"),
  operatingDisclosure: z.literal("Operating through RaidGuild LLC"),
  currentReign: z.string().optional(),
  owner: z.string().min(1),
  source: z.string().min(1),
  tokens: cssTokenMapSchema.optional(),
});

export const componentMetadataSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  sourcePath: z.string().min(1),
  stability: z.enum(["stable", "experimental", "deprecated", "reign-specific"]),
  dependencies: z.array(z.string()),
  providers: z.array(z.string()),
  storyIds: z.array(z.string()),
  accessibilityExpected: z.boolean(),
  interactionTestExpected: z.boolean(),
});

export const brandSystemSchema = z.object({
  release: z.object({
    schemaVersion: z.string().min(1),
    brandVersion: z.string().min(1),
    generatedAt: z.string().datetime(),
    sourceRevision: z.string().min(1),
    compatibility: z.object({
      minimumSchemaVersion: z.string().min(1),
      deprecatedBefore: z.string().nullable(),
    }),
  }),
  durableCore: z.object({
    canonicalMarkId: z.string().min(1),
    markVersion: z.string().min(1),
    canonicalBlackSvg: z.string().min(1),
    recognitionRule: z.string().min(1),
    alterationRule: z.string().min(1),
    provenanceRequirements: z.array(z.string()).min(1),
    relationshipPhrases: z.array(z.string()).min(1),
  }),
  defaultReign: z.string().min(1),
  reignStorageKey: z.string().min(1),
  baseTokens: cssTokenMapSchema,
  reigns: z.array(brandReignSchema).min(1),
  practices: z.array(practiceSchema),
  typography: z.object({
    families: z.array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        cssVariable: z.string().startsWith("--"),
        sourceVariable: z.string().startsWith("--"),
        role: z.string().min(1),
      }),
    ),
    scale: z.array(
      z.object({
        token: z.string().min(1),
        className: z.string().min(1),
        sizePx: z.number().positive(),
        lineHeight: z.number().positive(),
        letterSpacing: z.string().min(1),
      }),
    ),
  }),
  components: z.array(componentMetadataSchema),
  assets: z.object({
    logos: z.array(
      z.object({
        id: z.string().min(1),
        file: z.string().endsWith(".svg"),
        type: z.enum(["logomark", "logotype"]),
        description: z.string().min(1),
        ownership: z.enum(["durable-core", "suede"]),
      }),
    ),
    roleIcons: z.record(z.string(), z.string()),
    serviceIcons: z.array(z.string()),
    magicIcons: z.array(z.string()),
    fonts: z.array(
      z.object({
        file: z.string().min(1),
        family: z.string().min(1),
        weight: z.string().min(1),
      }),
    ),
    social: z.array(
      z.object({
        file: z.string().endsWith(".png"),
        description: z.string().min(1),
      }),
    ),
    guidelinesPdf: z.object({
      file: z.string().endsWith(".pdf"),
      description: z.string().min(1),
    }),
    illustrations: z.object({
      palettes: z.array(z.string()).min(1),
      tones: z.record(z.string(), z.string()),
      scenesBySize: z.record(
        z.string(),
        z.object({
          aspect: z.string(),
          scenes: z.array(z.string()).min(1),
        }),
      ),
      reignReferences: z.record(z.string(), z.string()),
      referenceCollections: z.record(
        z.string(),
        z.object({
          direction: z.string().min(1),
          hero: z.object({
            title: z.string().min(1),
            src: z.string().url(),
            alt: z.string().min(1),
            aspect: z.string().min(1),
          }).optional(),
          items: z.array(
            z.object({
              title: z.string().min(1),
              src: z.string().url(),
              alt: z.string().min(1),
              aspect: z.string().min(1),
            }),
          ).min(1),
        }),
      ),
    }),
  }),
}).superRefine((system, context) => {
  const reignIds = new Set(system.reigns.map((reign) => reign.id));
  const componentIds = new Set(system.components.map((component) => component.id));
  const logoIds = new Set(system.assets.logos.map((logo) => logo.id));

  if (reignIds.size !== system.reigns.length) {
    context.addIssue({ code: "custom", path: ["reigns"], message: "Reign IDs must be unique." });
  }

  if (componentIds.size !== system.components.length) {
    context.addIssue({ code: "custom", path: ["components"], message: "Component IDs must be unique." });
  }

  if (!system.reigns.some((reign) => reign.id === system.defaultReign && reign.available)) {
    context.addIssue({
      code: "custom",
      path: ["defaultReign"],
      message: "The default reign must reference an available reign.",
    });
  }

  if (system.reigns.filter((reign) => reign.status === "latest").length !== 1) {
    context.addIssue({ code: "custom", path: ["reigns"], message: "Exactly one reign must be latest." });
  }

  if (!logoIds.has(system.durableCore.canonicalMarkId)) {
    context.addIssue({
      code: "custom",
      path: ["durableCore", "canonicalMarkId"],
      message: "The canonical mark ID must reference a declared logo asset.",
    });
  }

  for (const [index, practice] of system.practices.entries()) {
    if (practice.currentReign && !reignIds.has(practice.currentReign)) {
      context.addIssue({
        code: "custom",
        path: ["practices", index, "currentReign"],
        message: "A practice can only reference a declared reign.",
      });
    }
  }
});

export type BrandSystem = z.infer<typeof brandSystemSchema>;
export type BrandReign = z.infer<typeof brandReignSchema>;
export type BrandReignId = BrandSystem["reigns"][number]["id"];

export const publicBrandManifestSchema = z.object({
  $schema: z.string().url(),
  name: z.literal("RaidGuild Brand Assets Manifest"),
  version: z.string().min(1),
  schemaVersion: z.string().min(1),
  generatedAt: z.string().datetime(),
  sourceRevision: z.string().min(1),
  guidelines: z.object({
    identity: z.object({
      markId: z.string().min(1),
      markVersion: z.string().min(1),
      masterAsset: z.string().url(),
    }).passthrough(),
    versioning: z.object({
      default: z.string().min(1),
      storageKey: z.string().min(1),
      reigns: z.array(
        z.object({
          id: z.string().min(1),
          status: z.enum(["latest", "archived", "reconstructed", "unavailable"]),
          available: z.boolean(),
          dataVersion: z.string().min(1),
        }).passthrough(),
      ),
      practices: z.array(z.unknown()),
    }),
  }).passthrough(),
  components: z.array(componentMetadataSchema),
  assets: z.object({
    logos: z.object({ items: z.array(z.object({ id: z.string(), url: z.string().url() }).passthrough()) }).passthrough(),
    illustrations: z.object({
      totalFiles: z.number().positive(),
      urlTemplates: z.object({
        full: z.string().includes("{palette}"),
        thumbnail: z.string().includes("{palette}"),
      }),
    }).passthrough(),
    fonts: z.object({ items: z.array(z.object({ file: z.string(), url: z.string().url() }).passthrough()) }).passthrough(),
    social: z.object({ items: z.array(z.object({ file: z.string(), url: z.string().url() }).passthrough()) }).passthrough(),
    guidelinesPdf: z.object({ url: z.string().url(), rawUrl: z.string().url() }).passthrough(),
  }).passthrough(),
}).passthrough();

export const machineBrandPayloadSchema = z.object({
  schema: z.string().url(),
  schemaVersion: z.literal("1.0.0"),
  contentVersion: z.string().min(1),
  name: z.literal("RaidGuild Brand Archive"),
  sourceOfTruth: z.string().url(),
  guidelines: z.object({
    versioning: z.object({
      defaultReign: z.string().min(1),
      reigns: z.array(
        z.object({
          id: z.string().min(1),
          status: z.enum(["latest", "archived", "reconstructed", "unavailable"]),
          available: z.boolean(),
          dataVersion: z.string().min(1),
        }).passthrough(),
      ),
    }).passthrough(),
    colors: z.object({
      scales: z.object({
        moloch: z.record(z.string(), hexColorSchema),
        scroll: z.record(z.string(), hexColorSchema),
        neutral: z.record(z.string(), hexColorSchema),
      }),
    }).passthrough(),
  }).passthrough(),
  assets: z.object({
    illustrations: z.object({
      totalFiles: z.number().positive(),
      variantsPerScene: z.number().positive(),
      urlTemplates: z.object({
        full: z.string().includes("{palette}"),
        thumbnail: z.string().includes("{palette}"),
      }),
    }).passthrough(),
  }).passthrough(),
  references: z.array(z.object({ name: z.string(), repoPath: z.string(), url: z.string().url() })).min(1),
  contentHash: z.string().regex(/^sha256:[0-9a-f]{64}$/),
}).passthrough();
