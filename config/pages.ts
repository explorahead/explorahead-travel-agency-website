/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

/**
 * Page Publishing Configuration
 * Toggle pages on/off to control visibility across the site
 *
 * When a page is set to `published: false`:
 * - It won't appear in the navigation
 * - It won't be included in the sitemap
 * - Direct access will redirect to 404
 */

export interface PageConfig {
  /** Unique identifier for the page */
  slug: string;
  /** Whether the page is published and accessible */
  published: boolean;
  /** Navigation order (lower = first) */
  order: number;
  /** Show in main navigation */
  showInNav: boolean;
  /** Show in footer navigation */
  showInFooter: boolean;
  /** SEO priority for sitemap (0.0 - 1.0) */
  priority: number;
  /** How often the page changes (for sitemap) */
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

/**
 * Marketing Pages Configuration
 * Edit this object to control page visibility
 */
export const pagesConfig: Record<string, PageConfig> = {
  home: {
    slug: "",
    published: true,
    order: 1,
    showInNav: true,
    showInFooter: true,
    priority: 1.0,
    changeFrequency: "weekly",
  },
  about: {
    slug: "about",
    published: true, // Set to true when ready to publish
    order: 2,
    showInNav: true,
    showInFooter: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  destinations: {
    slug: "destinations",
    published: false, // Set to true when ready to publish
    order: 3,
    showInNav: true,
    showInFooter: true,
    priority: 0.9,
    changeFrequency: "weekly",
  },
  pricing: {
    slug: "pricing",
    published: true,
    order: 4,
    showInNav: true,
    showInFooter: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  contact: {
    slug: "contact",
    published: true,
    order: 5,
    showInNav: true,
    showInFooter: true,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  privacy: {
    slug: "privacy",
    published: true,
    order: 10,
    showInNav: false,
    showInFooter: true,
    priority: 0.3,
    changeFrequency: "yearly",
  },
  terms: {
    slug: "terms",
    published: true,
    order: 11,
    showInNav: false,
    showInFooter: true,
    priority: 0.3,
    changeFrequency: "yearly",
  },
  cookies: {
    slug: "cookies",
    published: true,
    order: 12,
    showInNav: false,
    showInFooter: true,
    priority: 0.3,
    changeFrequency: "yearly",
  },
};

/**
 * Helper functions for page management
 */

/** Get all published pages */
export function getPublishedPages(): PageConfig[] {
  return Object.values(pagesConfig)
    .filter((page) => page.published)
    .sort((a, b) => a.order - b.order);
}

/** Get pages for main navigation */
export function getNavPages(): PageConfig[] {
  return Object.values(pagesConfig)
    .filter((page) => page.published && page.showInNav)
    .sort((a, b) => a.order - b.order);
}

/** Get pages for footer navigation */
export function getFooterPages(): PageConfig[] {
  return Object.values(pagesConfig)
    .filter((page) => page.published && page.showInFooter)
    .sort((a, b) => a.order - b.order);
}

/** Check if a page slug is published */
export function isPagePublished(slug: string): boolean {
  // Home page has empty slug
  const normalizedSlug = slug === "" ? "" : slug;
  const page = Object.values(pagesConfig).find((p) => p.slug === normalizedSlug);
  return page?.published ?? false;
}

/** Get page config by slug */
export function getPageConfig(slug: string): PageConfig | undefined {
  return Object.values(pagesConfig).find((p) => p.slug === slug);
}

/** Get all page slugs that are unpublished (for middleware blocking) */
export function getUnpublishedSlugs(): string[] {
  return Object.values(pagesConfig)
    .filter((page) => !page.published && page.slug !== "")
    .map((page) => page.slug);
}
