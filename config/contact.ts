/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

/**
 * Contact Information Configuration
 *
 * Centralized contact information for the website.
 * Update this file to change contact details across all legal documents and pages.
 *
 * Usage:
 *   import { contact } from '@/config/contact';
 *   <a href={`mailto:${contact.email}`}>{contact.email}</a>
 *   <a href={`tel:${contact.phone}`}>{contact.phone}</a>
 */

export const contact = {
  /**
   * Primary contact email address
   */
  email: "explorahead@gmail.com",

  /**
   * Primary contact phone number
   * Format: +[country code] [number with spaces]
   */
  phone: "+48 690 946 046",

  /**
   * Company name
   */
  companyName: "ExplorAhead",

  /**
   * Website URL
   */
  website: "www.explorahead.com",

  /**
   * Full website URL with protocol
   */
  websiteUrl: "https://www.explorahead.com",
} as const;

/**
 * Helper function to get mailto link
 */
export function getMailtoLink(subject?: string, body?: string): string {
  let query = "";

  if (subject || body) {
    const parts: string[] = [];
    if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
    if (body) parts.push(`body=${encodeURIComponent(body)}`);
    query = parts.join("&");
  }

  return query ? `mailto:${contact.email}?${query}` : `mailto:${contact.email}`;
}

/**
 * Helper function to get tel link
 */
export function getTelLink(): string {
  // Remove spaces and special characters for tel: links
  const phoneNumber = contact.phone.replace(/\s+/g, "");
  return `tel:${phoneNumber}`;
}
