/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import * as Sentry from "@sentry/nextjs";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

/**
 * Global Error Boundary - Catches errors in the root layout and app
 * This is a special Next.js error boundary that wraps the entire app
 * It has its own html/body tags since the root layout might have crashed
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        errorBoundary: "global",
      },
      extra: {
        digest: error.digest,
      },
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-sand-50 flex min-h-screen items-center justify-center p-4 antialiased">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          {/* Error Icon */}
          <div className="bg-terracotta/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <AlertTriangle className="text-terracotta h-10 w-10" />
          </div>

          {/* Error Message */}
          <h1 className="font-heading text-ocean mb-3 text-2xl font-bold">Something went wrong</h1>
          <p className="text-sand-600 mb-8">
            We apologize for the inconvenience. An unexpected error occurred. Our team has been
            notified and is working on a fix.
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="bg-sand-100 mb-8 rounded-lg p-4 text-left">
              <p className="font-mono text-sm break-all text-red-600">{error.message}</p>
              {error.digest && (
                <p className="text-sand-500 mt-2 text-xs">Error ID: {error.digest}</p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={reset}
              className="bg-ocean hover:bg-ocean-600 focus:ring-ocean inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="bg-sand-100 text-sand-700 hover:bg-sand-200 focus:ring-sand-400 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </div>
        </motion.div>
      </body>
    </html>
  );
}
