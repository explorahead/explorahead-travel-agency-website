/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { CookieConsent } from "@/components/ui/CookieConsent";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("CookieConsent Component", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("shows consent banner after delay when no consent exists", async () => {
    render(<CookieConsent />);

    // Banner should not be visible immediately
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Wait for banner to appear (component has 1.5s delay)
    await waitFor(
      () => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("does not show banner when consent already exists", async () => {
    localStorageMock.setItem("cookie-consent", "accepted");
    render(<CookieConsent />);

    // Wait a bit to ensure banner doesn't appear
    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("saves consent when Accept All is clicked", async () => {
    render(<CookieConsent />);

    // Wait for banner to appear
    await waitFor(
      () => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // The mock returns just the translation key without namespace
    const acceptButton = screen.getByText("acceptAll");
    fireEvent.click(acceptButton);

    expect(localStorageMock.getItem("cookie-consent")).toBe("accepted");
  });

  it("saves preferences when Decline All is clicked", async () => {
    render(<CookieConsent />);

    // Wait for banner to appear
    await waitFor(
      () => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // The mock returns just the translation key without namespace
    const declineButton = screen.getByText("declineAll");
    fireEvent.click(declineButton);

    expect(localStorageMock.getItem("cookie-consent")).toBe("declined");
  });

  it("shows preferences panel when Customize is clicked", async () => {
    render(<CookieConsent />);

    // Wait for banner to appear
    await waitFor(
      () => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // The mock returns just the translation key without namespace
    const customizeButton = screen.getByText("customize");
    fireEvent.click(customizeButton);

    // Should show preferences panel - the mock returns the key path like "preferences.title"
    await waitFor(() => {
      expect(screen.getByText("preferences.title")).toBeInTheDocument();
    });
  });

  it("has proper accessibility attributes", async () => {
    render(<CookieConsent />);

    // Wait for banner to appear
    await waitFor(
      () => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", "cookie-consent-title");
    expect(dialog).toHaveAttribute("aria-describedby", "cookie-consent-description");
  });
});
