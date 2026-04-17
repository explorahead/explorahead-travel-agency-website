/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/en",
  useParams: () => ({ locale: "en" }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
  useMessages: () => ({}),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <span {...props}>{children}</span>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...props}>{children}</button>
    ),
    a: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <a {...props}>{children}</a>
    ),
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
    nav: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <nav {...props}>{children}</nav>
    ),
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <p {...props}>{children}</p>
    ),
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h1 {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h2 {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h3 {...props}>{children}</h3>
    ),
    ul: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <ul {...props}>{children}</ul>
    ),
    li: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <li {...props}>{children}</li>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({
    start: vi.fn(),
    set: vi.fn(),
  }),
}));

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Suppress console errors during tests (optional)
// vi.spyOn(console, "error").mockImplementation(() => {});
