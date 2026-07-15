import { NextResponse } from "next/server";

export const dynamic = "force-static";

const schema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://www.brand.raidguild.org/schemas/brand-guidelines-v1.json",
  title: "RaidGuild Brand Guidelines",
  description:
    "The paid machine-readable RaidGuild brand guidelines and asset manifest.",
  type: "object",
  required: [
    "schema",
    "schemaVersion",
    "contentVersion",
    "name",
    "description",
    "sourceOfTruth",
    "baseUrls",
    "guidelines",
    "assets",
    "references",
    "contentHash",
  ],
  properties: {
    schema: { const: schemaUrl() },
    schemaVersion: { const: "1.0.0" },
    contentVersion: { type: "string", minLength: 1 },
    name: { const: "RaidGuild Brand Guidelines" },
    description: { type: "string", minLength: 1 },
    sourceOfTruth: { type: "string", format: "uri" },
    baseUrls: {
      type: "object",
      required: ["live", "githubRawPublic", "githubTree"],
    },
    guidelines: {
      type: "object",
      required: [
        "identity",
        "colors",
        "typography",
        "layout",
        "voice",
        "copy",
        "implementation",
        "accessibility",
      ],
    },
    assets: {
      type: "object",
      required: [
        "logos",
        "icons",
        "illustrations",
        "fonts",
        "social",
        "guidelinesPdf",
      ],
    },
    references: { type: "array", minItems: 1 },
    contentHash: {
      type: "string",
      pattern: "^sha256:[0-9a-f]{64}$",
    },
  },
  additionalProperties: false,
} as const;

function schemaUrl() {
  return "https://www.brand.raidguild.org/schemas/brand-guidelines-v1.json";
}

export function GET() {
  return NextResponse.json(schema, {
    headers: { "cache-control": "public, max-age=3600" },
  });
}
