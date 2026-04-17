/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  // Vercel deployment - no static export needed
  // Enables full SSR, ISR, and Edge Runtime capabilities

  // Image optimization settings - fully enabled on Vercel
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Environment variables available at build time
  env: {
    NEXT_PUBLIC_APP_NAME: "ExplorAhead",
  },

  // Strict mode for better development
  reactStrictMode: true,

  // Turbopack configuration (Next.js 16 uses Turbopack by default)
  turbopack: {},
};

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // Organization and project from environment variables
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only upload source maps in production
  silent: process.env.NODE_ENV !== "production",

  // Upload source maps for better error tracking
  widenClientFileUpload: true,

  // Hide source maps from browser devtools in production
  hideSourceMaps: true,

  // Telemetry (set to false to disable sending data to Sentry)
  telemetry: true,
};

// Wrap config with next-intl and Sentry
export default withSentryConfig(withNextIntl(nextConfig), sentryWebpackPluginOptions);
