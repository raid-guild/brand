import { NextResponse } from "next/server";

export const dynamic = "force-static";

const schema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://www.brand.raidguild.org/schemas/agents-discovery-demo-v1.json",
  title: "RaidGuild Agent Capability Discovery",
  description: "Public discovery metadata for RaidGuild machine capabilities.",
  type: "object",
  required: ["capabilities", "demo", "name", "schema"],
  properties: {
    capabilities: {
      type: "array",
      items: {
        type: "object",
        required: [
          "auth",
          "description",
          "endpoint",
          "id",
          "methods",
          "provenance",
          "response",
          "visibility",
        ],
        properties: {
          auth: {
            type: "object",
            required: ["payment"],
            properties: {
              payment: {
                type: "object",
                required: [
                  "facilitatorUrl",
                  "maxTimeoutSeconds",
                  "network",
                  "payTo",
                  "price",
                  "protocol",
                  "scheme",
                ],
              },
            },
          },
          description: { type: "string" },
          endpoint: { type: "string", pattern: "^/" },
          id: { type: "string" },
          methods: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
          },
          provenance: { type: "array", items: { type: "string" } },
          response: { type: "object" },
          visibility: { type: "string" },
        },
      },
    },
    demo: { type: "boolean" },
    name: { type: "string" },
    schema: { const: schemaUrl() },
  },
  additionalProperties: false,
} as const;

function schemaUrl() {
  return "https://www.brand.raidguild.org/schemas/agents-discovery-demo-v1.json";
}

export function GET() {
  return NextResponse.json(schema, {
    headers: { "cache-control": "public, max-age=3600" },
  });
}
