/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./__tests__/setup.tsx"],
    include: ["__tests__/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["__tests__/e2e/**/*", "node_modules"],
    testTimeout: 10000, // 10 seconds for tests with real timers
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "__tests__/", "*.config.*", ".next/"],
    },
    // Mock CSS modules and static assets
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
