/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

export const defaultLocale = "en" as const;
export const locales = ["en", "pl"] as const;

export type Locale = (typeof locales)[number];

export const localePrefix = "as-needed" as const;

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;
