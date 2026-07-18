import { NextRequest, NextResponse } from "next/server";

import { getBrandGuidelinesPayload } from "@/lib/machine-api/brand-guidelines";
import { withX402 } from "@/lib/machine-api/with-x402";
import { createBrandX402Server } from "@/lib/machine-api/x402";

const responseHeaders = {
  "cache-control": "private, no-store, max-age=0",
  pragma: "no-cache",
};

async function guidelinesHandler() {
  return NextResponse.json(getBrandGuidelinesPayload(), {
    headers: responseHeaders,
  });
}

let paidHandler: ReturnType<typeof withX402> | null = null;

function getPaidHandler() {
  if (!paidHandler) {
    const { httpServer } = createBrandX402Server();
    paidHandler = withX402(guidelinesHandler, httpServer);
  }

  return paidHandler;
}

export async function GET(request: NextRequest) {
  try {
    return await getPaidHandler()(request);
  } catch (error) {
    console.error("Brand guidelines machine API failed", error);

    return NextResponse.json(
      { error: "Brand guidelines machine API is unavailable." },
      { headers: responseHeaders, status: 500 },
    );
  }
}
