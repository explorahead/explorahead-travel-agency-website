/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

// Next.js Instrumentation file
// This file is used to initialize monitoring and tracing services
// Runs once when the Next.js server starts

export async function register() {
  // Skip Sentry in development for faster startup
  if (process.env.NODE_ENV === "development") {
    return;
  }

  // Initialize Sentry based on runtime environment
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side Sentry initialization
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime Sentry initialization
    await import("./sentry.edge.config");
  }
}

// Capture unhandled errors and send to Sentry
export const onRequestError = async (
  error: Error,
  request: Request,
  context: { routerKind: string; routePath: string; routeType: string; renderSource: string }
) => {
  const Sentry = await import("@sentry/nextjs");

  Sentry.captureException(error, {
    tags: {
      routerKind: context.routerKind,
      routePath: context.routePath,
      routeType: context.routeType,
      renderSource: context.renderSource,
    },
    extra: {
      url: request.url,
      method: request.method,
    },
  });
};
