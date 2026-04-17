/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

// Sentry Client-Side Initialization
// This file configures Sentry for the browser/client environment
// Loaded automatically by Next.js instrumentation

import * as Sentry from "@sentry/nextjs";

// Skip Sentry initialization in development for faster startup
if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Performance Monitoring
    // Capture 100% of transactions in development, 10% in production
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

    // Session Replay for debugging user issues
    // Capture 10% of sessions, 100% on error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Enable structured logging
    _experiments: {
      enableLogs: true,
    },

    // Debug mode in development
    debug: (process.env.NODE_ENV as string) === "development",

    // Environment tag
    environment: process.env.NODE_ENV,

    // Integrations
    integrations: [
      // Replay integration for session recording
      Sentry.replayIntegration({
        // Mask all text for privacy
        maskAllText: false,
        // Block all media for performance
        blockAllMedia: false,
      }),
      // Browser tracing for performance monitoring
      Sentry.browserTracingIntegration(),
      // Console logging integration
      Sentry.consoleLoggingIntegration({ levels: ["warn", "error"] }),
    ],

    // Filter out noisy errors
    ignoreErrors: [
      // Browser extensions
      "top.GLOBALS",
      "originalCreateNotification",
      "canvas.contentDocument",
      "MyApp_RemoveAllHighlights",
      "http://tt.teletrader.com/",
      "jigsaw is not defined",
      "ComboSearch is not defined",
      "atomicFindClose",
      // Facebook borance
      "fb_xd_fragment",
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      // Network errors users can't control
      "Network request failed",
      "Failed to fetch",
      "NetworkError",
      "Load failed",
      // Safari specific
      "AbortError: The operation was aborted",
    ],

    // Only send errors from our domain
    allowUrls: [
      /https?:\/\/((www|staging)\.)?explorahead\.com/,
      /https?:\/\/localhost/,
      /https?:\/\/.*\.vercel\.app/,
    ],

    // Callback before sending event - can modify or drop events
    beforeSend(event, hint) {
      // Don't send events in development unless explicitly enabled
      if (process.env.NODE_ENV === "development" && !process.env.SENTRY_DEBUG) {
        console.log("[Sentry] Event captured (dev mode):", event);
        return null;
      }
      return event;
    },
  });
}
// Export router transition tracking for navigation instrumentation
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
