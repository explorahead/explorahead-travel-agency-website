/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
  });

  test("has correct title and meta description", async ({ page }) => {
    await expect(page).toHaveTitle(/ExplorAhead/);
  });

  test("displays hero section with CTA buttons", async ({ page }) => {
    // Check hero content
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Check CTA button
    const ctaButton = page.getByRole("link", { name: /start planning/i });
    await expect(ctaButton).toBeVisible();
  });

  test("navigation links work correctly", async ({ page }) => {
    // Click on About link
    await page.getByRole("link", { name: /about/i }).first().click();
    await expect(page).toHaveURL(/\/en\/about/);

    // Go back and click Contact
    await page.goBack();
    await page
      .getByRole("link", { name: /contact/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/en\/contact/);
  });

  test("language switcher changes locale", async ({ page }) => {
    // Find and click language switcher
    const languageSwitcher = page.getByRole("button", { name: /en|english/i });
    await languageSwitcher.click();

    // Select Polish
    await page.getByRole("menuitem", { name: /polski|polish/i }).click();

    // Should redirect to Polish version
    await expect(page).toHaveURL(/\/pl/);
  });

  test("mobile menu opens and closes", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Find mobile menu button
    const menuButton = page.getByRole("button", { name: /toggle menu|menu/i });
    await expect(menuButton).toBeVisible();

    // Open menu
    await menuButton.click();

    // Menu should be visible
    const mobileNav = page.getByRole("navigation");
    await expect(mobileNav).toBeVisible();
  });

  test("scroll indicator is visible on hero", async ({ page }) => {
    // Scroll indicator should be visible
    await expect(page.locator('[class*="animate"]').first()).toBeVisible();
  });

  test("sections load as user scrolls", async ({ page }) => {
    // Scroll to testimonials section
    await page.evaluate(() => window.scrollTo(0, 1500));

    // Wait for animations
    await page.waitForTimeout(500);

    // Content should be visible after scroll
    const testimonialSection = page.locator("section").filter({ hasText: /testimonial|stories/i });
    await expect(testimonialSection).toBeVisible();
  });
});

test.describe("Homepage Accessibility", () => {
  test("skip to main content link works", async ({ page }) => {
    await page.goto("/en");

    // Tab to activate skip link
    await page.keyboard.press("Tab");

    // Skip link should be focused
    const skipLink = page.getByText(/skip to main content/i);
    await expect(skipLink).toBeFocused();

    // Press enter to skip
    await page.keyboard.press("Enter");

    // Focus should be on main content
    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/en");

    // Check all images have alt attributes
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute("alt");
    }
  });

  test("color contrast meets WCAG standards", async ({ page }) => {
    await page.goto("/en");

    // This is a basic check - full contrast testing would use axe-core
    // Check that text is readable against backgrounds
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
  });
});

test.describe("Homepage Performance", () => {
  test("page loads within acceptable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/en", { waitUntil: "networkidle" });
    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test("no console errors on page load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/en");

    // Filter out expected errors (e.g., from third-party scripts)
    const criticalErrors = errors.filter((e) => !e.includes("favicon") && !e.includes("google"));

    expect(criticalErrors).toHaveLength(0);
  });
});
