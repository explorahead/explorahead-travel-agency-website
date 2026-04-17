/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { Home, MapPin, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Locale-scoped 404 Not Found Page
 * Displayed when a locale-prefixed route doesn't match any page
 */
export default function LocaleNotFound() {
  const t = useTranslations("errors");
  const tNav = useTranslations("navigation");
  const locale = useLocale();

  return (
    <div className="bg-sand-50 flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Lost Traveler Icon */}
        <div className="bg-ocean/10 relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
          <MapPin className="text-ocean h-12 w-12" />
          <div className="bg-terracotta absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full">
            <span className="text-sm font-bold text-white">?</span>
          </div>
        </div>

        {/* 404 Number */}
        <div className="font-heading text-ocean/20 mb-2 text-8xl font-bold">404</div>

        {/* Message */}
        <h1 className="font-heading text-ocean mb-3 text-2xl font-bold">{t("notFound")}</h1>
        <p className="text-sand-600 mb-8">
          {locale === "pl"
            ? "Wygląda na to, że zbłądziłeś! Strona, której szukasz, nie istnieje lub została przeniesiona."
            : "Looks like you've ventured off the beaten path! The page you're looking for doesn't exist or has been moved."}
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/${locale}`}
            className="bg-ocean hover:bg-ocean-600 focus:ring-ocean inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <Home className="h-4 w-4" />
            {t("goHome")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="bg-sand-100 text-sand-700 hover:bg-sand-200 focus:ring-sand-400 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <Search className="h-4 w-4" />
            {tNav("contact")}
          </Link>
        </div>

        {/* Suggestions */}
        <div className="border-sand-200 mt-12 border-t pt-8">
          <p className="text-sand-500 mb-4 text-sm">
            {locale === "pl" ? "Może Cię zainteresować:" : "You might be interested in:"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href={`/${locale}`}
              className="text-ocean hover:text-ocean-600 text-sm hover:underline"
            >
              {tNav("home")}
            </Link>
            <span className="text-sand-300">•</span>
            <Link
              href={`/${locale}/about`}
              className="text-ocean hover:text-ocean-600 text-sm hover:underline"
            >
              {tNav("about")}
            </Link>
            <span className="text-sand-300">•</span>
            <Link
              href={`/${locale}/contact`}
              className="text-ocean hover:text-ocean-600 text-sm hover:underline"
            >
              {tNav("contact")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
