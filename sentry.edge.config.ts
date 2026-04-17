/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

// Sentry Edge Runtime Initialization
// This file configures Sentry for Edge Runtime (Vercel Edge Functions, middleware)
// Runs in a lightweight V8 isolate environment

import * as Sentry from "@sentry/nextjs";

// Skip Sentry initialization in development for faster startup
if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // Performance Monitoring
    // Lower sample rate for edge to reduce costs
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.05 : 1.0,

    // Enable structured logging
    _experiments: {
      enableLogs: true,
    },

    // Debug mode in development
    debug: (process.env.NODE_ENV as string) === "development",

    // Environment tag
    environment: process.env.NODE_ENV,

    // Edge-specific settings
    // Note: Some integrations are not available in Edge runtime
  });
}
