import "server-only";

import {
  HTTPFacilitatorClient,
  x402HTTPResourceServer,
  x402ResourceServer,
} from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";
import { getAddress, isAddress } from "viem";

const GUIDELINES_PATH = "/api/machine/brand-guidelines";
const DEFAULT_DESCRIPTION =
  "Access the complete RaidGuild brand guidelines, design tokens, implementation guidance, and machine-readable asset manifest.";

type BrandX402Server = ReturnType<typeof buildBrandX402Server>;

let cachedServer: BrandX402Server | null = null;

export function getBrandX402Config() {
  const payTo = process.env.X402_BRAND_PAY_TO_ADDRESS;

  if (!payTo || !isAddress(payTo)) {
    throw new Error("X402_BRAND_PAY_TO_ADDRESS must be a valid EVM address");
  }

  const chainId = Number(process.env.X402_BRAND_CHAIN_ID ?? "84532");

  if (!Number.isInteger(chainId) || chainId <= 0) {
    throw new Error("X402_BRAND_CHAIN_ID must be a positive integer");
  }

  const maxTimeoutSeconds = Number(
    process.env.X402_BRAND_MAX_TIMEOUT_SECONDS ?? "60",
  );

  if (!Number.isInteger(maxTimeoutSeconds) || maxTimeoutSeconds <= 0) {
    throw new Error(
      "X402_BRAND_MAX_TIMEOUT_SECONDS must be a positive integer",
    );
  }

  const price = process.env.X402_BRAND_GUIDELINES_PRICE ?? "0.01";

  if (!/^\$?\d+(?:\.\d+)?$/.test(price)) {
    throw new Error(
      "X402_BRAND_GUIDELINES_PRICE must be a non-negative decimal price",
    );
  }

  return {
    chainId,
    description: process.env.X402_BRAND_DESCRIPTION ?? DEFAULT_DESCRIPTION,
    facilitatorUrl:
      process.env.X402_FACILITATOR_URL ?? "https://x402.org/facilitator",
    maxTimeoutSeconds,
    network: `eip155:${chainId}` as const,
    payTo: getAddress(payTo),
    price,
  };
}

export function getPublicBrandX402Config() {
  const config = getBrandX402Config();

  return {
    description: config.description,
    facilitatorUrl: config.facilitatorUrl,
    maxTimeoutSeconds: config.maxTimeoutSeconds,
    network: config.network,
    payTo: config.payTo,
    price: config.price,
  };
}

function buildBrandX402Server() {
  const config = getBrandX402Config();
  const facilitatorClient = new HTTPFacilitatorClient({
    url: config.facilitatorUrl,
  });
  const resourceServer = new x402ResourceServer(facilitatorClient);

  registerExactEvmScheme(resourceServer, { networks: [config.network] });

  const httpServer = new x402HTTPResourceServer(resourceServer, {
    [`GET ${GUIDELINES_PATH}`]: {
      accepts: {
        maxTimeoutSeconds: config.maxTimeoutSeconds,
        network: config.network,
        payTo: config.payTo,
        price: config.price,
        scheme: "exact",
      },
      description: config.description,
      mimeType: "application/json",
      serviceName: "RaidGuild Brand Guidelines",
      tags: ["brand", "design-system", "raidguild"],
      unpaidResponseBody: () => ({
        body: {
          error: "Payment required to access the RaidGuild brand guidelines.",
        },
        contentType: "application/json",
      }),
    },
  });

  return { config, httpServer };
}

export function createBrandX402Server() {
  cachedServer ??= buildBrandX402Server();

  return cachedServer;
}

export { DEFAULT_DESCRIPTION, GUIDELINES_PATH };
