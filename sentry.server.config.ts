/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

// Sentry Server-Side Initialization
// This file configures Sentry for Node.js server environment
// Used for API routes, getServerSideProps, middleware, etc.

import * as Sentry from "@sentry/nextjs";

// Skip Sentry initialization in development for faster startup
if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // Performance Monitoring
    // Capture 100% of transactions in development, 10% in production
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

    // Enable structured logging
    _experiments: {
      enableLogs: true,
    },

    // Debug mode in development
    debug: (process.env.NODE_ENV as string) === "development",

    // Environment tag
    environment: process.env.NODE_ENV,

    // Spotlight for local development
    // spotlight: process.env.NODE_ENV === "development",

    // Filter sensitive data
    beforeSend(event) {
      // Remove sensitive headers
      if (event.request?.headers) {
        delete event.request.headers["authorization"];
        delete event.request.headers["cookie"];
        delete event.request.headers["x-api-key"];
      }
      return event;
    },

    // Integrations for server-side
    integrations: [
      // HTTP integration for tracing requests
      Sentry.httpIntegration(),
    ],
  });
}
