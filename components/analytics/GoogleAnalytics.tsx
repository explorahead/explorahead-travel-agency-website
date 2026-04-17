/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "consent",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Check if user has consented to analytics cookies
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie-consent") === "accepted";
}

/**
 * Google Analytics component with GDPR-compliant consent handling
 * Only loads and initializes GA4 after user consent
 */
export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(() => {
    // Initialize with consent check (only runs once on mount)
    if (typeof window !== "undefined") {
      return hasAnalyticsConsent();
    }
    return false;
  });

  useEffect(() => {
    // Listen for consent changes
    const handleConsentChange = () => {
      setHasConsent(hasAnalyticsConsent());
    };

    window.addEventListener("cookie-consent-change", handleConsentChange);
    return () => {
      window.removeEventListener("cookie-consent-change", handleConsentChange);
    };
  }, []);

  // Don't render anything if no measurement ID or no consent
  if (!GA_MEASUREMENT_ID || !hasConsent) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Configure with privacy-focused settings
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
          });
        `}
      </Script>
    </>
  );
}

/**
 * Track page views - call on route changes
 */
export function trackPageView(url: string) {
  if (!hasAnalyticsConsent() || !GA_MEASUREMENT_ID) return;

  window.gtag?.("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/**
 * Track custom events
 * @param action - Event action name
 * @param category - Event category
 * @param label - Optional event label
 * @param value - Optional numeric value
 */
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (!hasAnalyticsConsent() || !GA_MEASUREMENT_ID) return;

  window.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

/**
 * Pre-defined event trackers for common actions
 */
export const analytics = {
  // Contact form events
  contactFormStart: () => trackEvent("form_start", "contact", "contact_form"),
  contactFormSubmit: () => trackEvent("form_submit", "contact", "contact_form"),
  contactFormError: (error: string) => trackEvent("form_error", "contact", error),

  // CTA events
  ctaClick: (ctaName: string) => trackEvent("cta_click", "engagement", ctaName),

  // Navigation events
  navClick: (item: string) => trackEvent("navigation_click", "navigation", item),

  // Destination events
  destinationView: (destination: string) => trackEvent("view_item", "destination", destination),
  destinationClick: (destination: string) => trackEvent("select_item", "destination", destination),

  // Language events
  languageChange: (from: string, to: string) =>
    trackEvent("language_change", "localization", `${from}_to_${to}`),

  // Scroll depth tracking
  scrollDepth: (percentage: number) =>
    trackEvent("scroll", "engagement", `${percentage}%`, percentage),
};
