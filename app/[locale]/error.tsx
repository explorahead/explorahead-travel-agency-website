/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import * as Sentry from "@sentry/nextjs";
import { motion } from "framer-motion";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Locale-scoped Error Boundary
 * Catches errors in locale-prefixed routes with proper i18n support
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors");
  const params = useParams();
  const locale = (params.locale as string) || "en";

  useEffect(() => {
    // Log error to Sentry with locale context
    Sentry.captureException(error, {
      tags: {
        errorBoundary: "locale",
        locale,
      },
      extra: {
        digest: error.digest,
      },
    });
  }, [error, locale]);

  return (
    <div className="bg-sand-50 flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        {/* Error Icon */}
        <div className="bg-terracotta/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <AlertCircle className="text-terracotta h-10 w-10" />
        </div>

        {/* Error Message */}
        <h1 className="font-heading text-ocean mb-3 text-2xl font-bold">{t("generic")}</h1>
        <p className="text-sand-600 mb-8">{t("serverError")}</p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-sand-100 mb-8 overflow-hidden rounded-lg p-4 text-left">
            <p className="font-mono text-sm break-all text-red-600">{error.message}</p>
            {error.digest && <p className="text-sand-500 mt-2 text-xs">Error ID: {error.digest}</p>}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="bg-ocean hover:bg-ocean-600 focus:ring-ocean inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <RefreshCw className="h-4 w-4" />
            {t("tryAgain")}
          </button>
          <Link
            href={`/${locale}`}
            className="bg-sand-100 text-sand-700 hover:bg-sand-200 focus:ring-sand-400 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <Home className="h-4 w-4" />
            {t("goHome")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
