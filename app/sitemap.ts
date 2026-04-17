/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { getPublishedPages } from "@/config/pages";
import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://explorahead.com";

/**
 * Dynamic sitemap generation for SEO
 * Automatically generates sitemap.xml based on published pages from config
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "pl"];
  const currentDate = new Date().toISOString();

  // Get only published pages from config
  const publishedPages = getPublishedPages();

  // Generate sitemap entries for all locales and published pages
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of publishedPages) {
    const path = page.slug === "" ? "" : `/${page.slug}`;

    for (const locale of locales) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${path}`,
            pl: `${BASE_URL}/pl${path}`,
          },
        },
      });
    }
  }

  // Add root redirect entry
  sitemapEntries.push({
    url: BASE_URL,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  return sitemapEntries;
}
