/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { usePathname } from "@/lib/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

type Locale = "en" | "pl";

// Flag component using SVG files for consistent cross-platform rendering
const FlagIcon = ({ countryCode, className = "" }: { countryCode: string; className?: string }) => {
  const flagMap: Record<string, string> = {
    en: "/images/flags/gb.svg",
    pl: "/images/flags/pl.svg",
  };

  const flagSrc = flagMap[countryCode];

  if (!flagSrc) return null;

  return (
    <Image
      src={flagSrc}
      alt={`${countryCode} flag`}
      width={20}
      height={15}
      className={`rounded-sm ${className}`}
    />
  );
};

const languages = [
  { code: "en" as Locale, name: "English" },
  { code: "pl" as Locale, name: "Polski" },
];

export function LanguageSwitcher() {
  const t = useTranslations("languages");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  useEffect(() => {
    if (pendingLocale) {
      // Get basePath from environment or detect from current URL
      // In production (GitHub Pages), the basePath is /explorahead-travel-agency-website
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
      const basePath = currentPath.startsWith("/explorahead-travel-agency-website")
        ? "/explorahead-travel-agency-website"
        : "";

      // With localePrefix: 'always', both locales have prefixes: /en and /pl
      // pathname from usePathname() returns the path WITHOUT locale prefix
      // We need to construct: {basePath}/{newLocale}{pathname}
      const targetPath = `${basePath}/${pendingLocale}${pathname === "/" ? "" : pathname}`;
      window.location.href = targetPath;
    }
  }, [pendingLocale, pathname]);

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    setPendingLocale(newLocale);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-sand-light flex items-center gap-2.5 rounded-full py-2.5 pr-5 pl-4 transition-colors"
        aria-label="Change language"
      >
        <Globe size={18} className="text-gray flex-shrink-0" />
        <span className="text-ocean hidden text-sm font-medium whitespace-nowrap sm:inline">
          {currentLanguage.name}
        </span>
        <FlagIcon countryCode={currentLanguage.code} className="flex-shrink-0" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="border-gray-lighter absolute top-12 right-0 z-50 w-52 rounded-xl border bg-white shadow-xl"
              style={{ padding: "8px" }}
            >
              <div>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => switchLanguage(language.code)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      locale === language.code
                        ? "bg-sand text-ocean font-medium"
                        : "text-gray-dark hover:bg-sand-light"
                    } `}
                  >
                    <div className="flex items-center gap-3">
                      <span>{t(language.code)}</span>
                      <FlagIcon countryCode={language.code} />
                    </div>
                    {locale === language.code && <Check size={16} className="text-gold" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSwitcher;
