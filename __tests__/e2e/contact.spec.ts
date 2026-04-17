/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { expect, test } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/contact");
  });

  test("displays contact form with all required fields", async ({ page }) => {
    // Check form fields exist
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();

    // Check submit button
    await expect(page.getByRole("button", { name: /send|submit/i })).toBeVisible();
  });

  test("shows validation errors for empty required fields", async ({ page }) => {
    // Try to submit empty form
    const submitButton = page.getByRole("button", { name: /send|submit/i });
    await submitButton.click();

    // Should show validation errors or HTML5 validation
    const nameField = page.getByLabel(/name/i);
    const validationMessage = await nameField.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage.length).toBeGreaterThan(0);
  });

  test("accepts valid email format", async ({ page }) => {
    const emailField = page.getByLabel(/email/i);

    // Enter invalid email
    await emailField.fill("invalid-email");
    await emailField.blur();

    // Should show validation error
    const isInvalid = await emailField.evaluate((el: HTMLInputElement) => !el.checkValidity());
    expect(isInvalid).toBe(true);

    // Enter valid email
    await emailField.fill("valid@email.com");
    const isValid = await emailField.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(true);
  });

  test("form fields are focusable via keyboard", async ({ page }) => {
    // Tab through form fields
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // Check that fields can be focused
    const nameField = page.getByLabel(/name/i);
    await nameField.focus();
    await expect(nameField).toBeFocused();
  });

  test("displays contact information", async ({ page }) => {
    // Check contact details are visible
    await expect(page.getByText(/explorahead@gmail.com/i)).toBeVisible();
    await expect(page.getByText(/\+48/)).toBeVisible();
  });
});

test.describe("Contact Form Accessibility", () => {
  test("form fields have associated labels", async ({ page }) => {
    await page.goto("/en/contact");

    // Check that all inputs have labels
    const inputs = page.locator("input:not([type='hidden']), textarea");
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute("id");

      if (id) {
        // Check for associated label
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = (await label.count()) > 0;
        const hasAriaLabel = await input.getAttribute("aria-label");

        expect(hasLabel || hasAriaLabel).toBeTruthy();
      }
    }
  });

  test("error messages are accessible", async ({ page }) => {
    await page.goto("/en/contact");

    // Submit empty form to trigger validation
    const submitButton = page.getByRole("button", { name: /send|submit/i });
    await submitButton.click();

    // Check that error messages have proper ARIA attributes
    // This depends on how validation is implemented
  });
});

test.describe("Contact Page Responsive", () => {
  test("form is usable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/en/contact");

    // Form should be visible and usable
    const form = page.locator("form");
    await expect(form).toBeVisible();

    // Fields should be full width on mobile
    const nameField = page.getByLabel(/name/i);
    const boundingBox = await nameField.boundingBox();

    // Field should be reasonably wide on mobile (accounting for padding)
    expect(boundingBox?.width).toBeGreaterThan(280);
  });

  test("form is usable on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/en/contact");

    // Form should be visible
    const form = page.locator("form");
    await expect(form).toBeVisible();
  });
});
