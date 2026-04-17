/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { useTranslations as useTranslationsBase } from "next-intl";

// Type-safe translation hooks
export function useTranslations<T extends keyof IntlMessages>(namespace?: T) {
  return useTranslationsBase(namespace);
}
