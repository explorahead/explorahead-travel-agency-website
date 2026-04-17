/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

/**
 * Social Media Configuration
 * Toggle social media links on/off to control visibility across the site
 */

export interface SocialMediaConfig {
  /** Unique identifier for the social platform */
  id: string;
  /** Platform display name */
  name: string;
  /** Profile URL */
  url: string;
  /** Handle/username to display */
  handle: string;
  /** Whether this social link is enabled */
  enabled: boolean;
  /** Display order (lower = first) */
  order: number;
}

/**
 * Social Media Links Configuration
 * Edit this object to control social media visibility
 */
export const socialMediaConfig: Record<string, SocialMediaConfig> = {
  instagram: {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/explorahead?igsh=MWJ0c3Z3OWsxODJyaQ%3D%3D&utm_source=qr",
    handle: "@explorahead",
    enabled: true,
    order: 1,
  },
  facebook: {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/share/16ZTZYYuyR/?mibextid=wwXIfr",
    handle: "ExplorAhead",
    enabled: true,
    order: 2,
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    url: "https://www.tiktok.com/@explorahead",
    handle: "@explorahead",
    enabled: false,
    order: 3,
  },
  twitter: {
    id: "twitter",
    name: "Twitter/X",
    url: "https://twitter.com/explorahead",
    handle: "@explorahead",
    enabled: false, // Set to true when you have a Twitter account
    order: 4,
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@explorahead",
    handle: "ExplorAhead",
    enabled: false, // Set to true when you have a YouTube channel
    order: 5,
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/company/explorahead",
    handle: "ExplorAhead",
    enabled: false, // Set to true when you have a LinkedIn page
    order: 6,
  },
  pinterest: {
    id: "pinterest",
    name: "Pinterest",
    url: "https://pinterest.com/explorahead",
    handle: "@explorahead",
    enabled: false, // Set to true when you have a Pinterest account
    order: 7,
  },
};

/**
 * Helper functions for social media management
 */

/** Get all enabled social media links */
export function getEnabledSocialMedia(): SocialMediaConfig[] {
  return Object.values(socialMediaConfig)
    .filter((social) => social.enabled)
    .sort((a, b) => a.order - b.order);
}

/** Check if a social platform is enabled */
export function isSocialEnabled(id: string): boolean {
  return socialMediaConfig[id]?.enabled ?? false;
}

/** Get social media config by id */
export function getSocialConfig(id: string): SocialMediaConfig | undefined {
  return socialMediaConfig[id];
}
