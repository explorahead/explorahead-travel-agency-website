/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

/**
 * Feature Flags Configuration
 *
 * Use this file to control which features are enabled/disabled in the application.
 * Simply toggle the boolean values to show or hide features without removing code.
 *
 * To enable a feature: set the value to `true`
 * To disable a feature: set the value to `false`
 */

export const featureFlags = {
  /**
   * Destinations Feature
   * Controls visibility of:
   * - Destinations page route
   * - Navigation links to destinations
   * - Footer links to destinations
   * - Featured destinations section on homepage
   * - Destination-related buttons and stats
   */
  destinations: false,

  /**
   * Testimonials Feature
   * Controls visibility of:
   * - Testimonials section on homepage
   */
  testimonials: false,

  // Add more feature flags here as needed
  // example: newFeature: true,
} as const;

/**
 * Helper function to check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof typeof featureFlags): boolean {
  return (featureFlags[feature] as boolean) === true;
}
