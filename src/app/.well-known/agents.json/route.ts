import { NextResponse } from "next/server";

import {
  getPublicBrandX402Config,
  GUIDELINES_PATH,
} from "@/lib/machine-api/x402";

type BrandCapability = {
  auth: {
    payment: {
      facilitatorUrl: string;
      maxTimeoutSeconds: number;
      network: string;
      payTo: `0x${string}`;
      price: string;
      protocol: "x402";
      scheme: "exact";
    };
  };
  description: string;
  endpoint: string;
  id: string;
  methods: ["GET"];
  provenance: string[];
  response: {
    contentType: "application/json";
    schema: string;
    schemaVersion: "1.0.0";
  };
  visibility: string;
};

export function GET() {
  let capabilities: BrandCapability[] = [];

  try {
    const x402 = getPublicBrandX402Config();

    capabilities = [
      {
        auth: {
          payment: {
            facilitatorUrl: x402.facilitatorUrl,
            maxTimeoutSeconds: x402.maxTimeoutSeconds,
            network: x402.network,
            payTo: x402.payTo,
            price: x402.price,
            protocol: "x402",
            scheme: "exact",
          },
        },
        description: x402.description,
        endpoint: GUIDELINES_PATH,
        id: "raidguild.brand.guidelines",
        methods: ["GET"],
        provenance: [
          "AGENTS.md",
          "docs/brand-voice.md",
          "docs/ui-components.md",
          "src/brand/system.ts",
          "src/generated/brand-tokens.css",
          "public/assets",
        ],
        response: {
          contentType: "application/json",
          schema:
            "https://www.brand.raidguild.org/schemas/brand-guidelines-v1.json",
          schemaVersion: "1.0.0",
        },
        visibility:
          "Public RaidGuild brand guidance and asset references available after payment",
      },
    ];
  } catch (error) {
    console.error("Failed to build agents.json capabilities", error);
    capabilities = [];
  }

  return NextResponse.json({
    capabilities,
    demo: true,
    name: "RaidGuild Brand",
    schema:
      "https://www.brand.raidguild.org/schemas/agents-discovery-demo-v1.json",
  });
}
