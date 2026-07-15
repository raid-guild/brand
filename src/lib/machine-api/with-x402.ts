import "server-only";

import type {
  HTTPAdapter,
  HTTPRequestContext,
  x402HTTPResourceServer,
} from "@x402/core/server";
import { NextRequest, NextResponse } from "next/server";

class NextRequestAdapter implements HTTPAdapter {
  constructor(private readonly request: NextRequest) {}

  getAcceptHeader() {
    return this.request.headers.get("accept") ?? "";
  }

  getHeader(name: string) {
    return this.request.headers.get(name) ?? undefined;
  }

  getMethod() {
    return this.request.method;
  }

  getPath() {
    return this.request.nextUrl.pathname;
  }

  getQueryParam(name: string) {
    const values = this.request.nextUrl.searchParams.getAll(name);

    if (values.length === 0) return undefined;
    if (values.length === 1) return values[0];

    return values;
  }

  getQueryParams() {
    const params: Record<string, string | string[]> = {};

    this.request.nextUrl.searchParams.forEach((value, key) => {
      const existing = params[key];

      if (!existing) {
        params[key] = value;
      } else if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        params[key] = [existing, value];
      }
    });

    return params;
  }

  getUrl() {
    return this.request.url;
  }

  getUserAgent() {
    return this.request.headers.get("user-agent") ?? "";
  }
}

function createRequestContext(request: NextRequest): HTTPRequestContext {
  const adapter = new NextRequestAdapter(request);

  return {
    adapter,
    method: request.method,
    path: request.nextUrl.pathname,
    paymentHeader:
      adapter.getHeader("payment-signature") ??
      adapter.getHeader("x-payment"),
  };
}

function paymentErrorResponse(response: {
  body?: unknown;
  headers: Record<string, string>;
  isHtml?: boolean;
  status: number;
}) {
  const headers = new Headers(response.headers);

  headers.set("cache-control", "private, no-store, max-age=0");
  headers.set("pragma", "no-cache");

  if (response.isHtml) {
    headers.set("content-type", "text/html");
    return new NextResponse(
      typeof response.body === "string" ? response.body : "",
      { headers, status: response.status },
    );
  }

  headers.set("content-type", "application/json");
  return NextResponse.json(response.body ?? {}, {
    headers,
    status: response.status,
  });
}

type RouteHandler = (request: NextRequest) => Promise<NextResponse>;

export function withX402(
  handler: RouteHandler,
  httpServer: x402HTTPResourceServer,
) {
  let initialization: Promise<void> | null = null;
  let initialized = false;

  async function initialize() {
    if (initialized) return;

    initialization ??= httpServer.initialize();

    try {
      await initialization;
      initialized = true;
    } catch (error) {
      initialization = null;
      throw error;
    }
  }

  return async function paidHandler(request: NextRequest) {
    await initialize();

    const context = createRequestContext(request);
    const paymentResult = await httpServer.processHTTPRequest(context);

    if (paymentResult.type === "payment-error") {
      return paymentErrorResponse(paymentResult.response);
    }

    if (paymentResult.type === "no-payment-required") {
      return handler(request);
    }

    let response: NextResponse;

    try {
      response = await handler(request);
    } catch (error) {
      await paymentResult.cancellationDispatcher.cancel({
        error,
        reason: "handler_threw",
      });
      throw error;
    }

    if (response.status >= 400) {
      await paymentResult.cancellationDispatcher.cancel({
        reason: "handler_failed",
        responseStatus: response.status,
      });
      return response;
    }

    const responseBody = Buffer.from(await response.clone().arrayBuffer());
    const responseHeaders: Record<string, string> = {};

    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    const settlement = await httpServer.processSettlement(
      paymentResult.paymentPayload,
      paymentResult.paymentRequirements,
      paymentResult.declaredExtensions,
      { request: context, responseBody, responseHeaders },
    );

    if (!settlement.success) {
      return paymentErrorResponse(settlement.response);
    }

    Object.entries(settlement.headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  };
}
