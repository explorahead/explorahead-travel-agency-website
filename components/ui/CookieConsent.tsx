/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Cookie, Settings, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type ConsentStatus = "pending" | "accepted" | "declined" | "customized";

interface CookiePreferences {
  necessary: boolean; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

/**
 * GDPR-compliant Cookie Consent Banner
 * Handles user consent for different cookie categories
 */
export function CookieConsent() {
  const t = useTranslations("cookies.consent");
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    if (typeof window !== "undefined") {
      const savedPreferences = localStorage.getItem("cookie-preferences");
      if (savedPreferences) {
        try {
          return JSON.parse(savedPreferences);
        } catch {
          return defaultPreferences;
        }
      }
    }
    return defaultPreferences;
  });

  // Check for existing consent on mount
  useEffect(() => {
    const consentStatus = localStorage.getItem("cookie-consent");
    if (!consentStatus) {
      // Small delay for better UX - don't show immediately on page load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (status: ConsentStatus, prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", status);
    localStorage.setItem("cookie-preferences", JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);

    // Dispatch event for analytics components to react
    window.dispatchEvent(new CustomEvent("cookie-consent-change"));
  };

  const handleAcceptAll = () => {
    saveConsent("accepted", {
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleDeclineAll = () => {
    saveConsent("declined", {
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const handleSavePreferences = () => {
    saveConsent("customized", preferences);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed right-0 bottom-0 left-0 z-50 p-4 md:p-6"
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="border-sand-200 overflow-hidden rounded-2xl border bg-white shadow-2xl">
            {/* Main Banner */}
            {!showPreferences && (
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-ocean/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                    <Cookie className="text-ocean h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h2
                      id="cookie-consent-title"
                      className="font-heading text-ocean mb-2 text-lg font-semibold"
                    >
                      {t("title")}
                    </h2>
                    <p
                      id="cookie-consent-description"
                      className="text-sand-700 mb-4 text-sm md:text-base"
                    >
                      {t("description")}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleAcceptAll}
                        className="bg-ocean hover:bg-ocean-600 focus:ring-ocean rounded-lg px-6 py-2.5 font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                      >
                        {t("acceptAll")}
                      </button>
                      <button
                        onClick={handleDeclineAll}
                        className="bg-sand-100 text-sand-700 hover:bg-sand-200 focus:ring-sand-400 rounded-lg px-6 py-2.5 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                      >
                        {t("declineAll")}
                      </button>
                      <button
                        onClick={() => setShowPreferences(true)}
                        className="text-ocean hover:text-ocean-600 focus:ring-ocean flex items-center gap-2 rounded-lg px-6 py-2.5 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                      >
                        <Settings className="h-4 w-4" />
                        {t("customize")}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleDeclineAll}
                    className="text-sand-400 hover:text-sand-600 focus:ring-sand-400 flex-shrink-0 rounded-lg p-2 transition-colors focus:ring-2 focus:outline-none"
                    aria-label={t("close")}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Preferences Panel */}
            {showPreferences && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-6 md:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-heading text-ocean text-lg font-semibold">
                    {t("preferences.title")}
                  </h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="text-sand-400 hover:text-sand-600 rounded-lg p-2 transition-colors"
                    aria-label={t("back")}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-6 space-y-4">
                  {/* Necessary Cookies - Always enabled */}
                  <CookieToggle
                    id="necessary"
                    title={t("preferences.necessary.title")}
                    description={t("preferences.necessary.description")}
                    enabled={true}
                    disabled={true}
                    onChange={() => {}}
                  />

                  {/* Analytics Cookies */}
                  <CookieToggle
                    id="analytics"
                    title={t("preferences.analytics.title")}
                    description={t("preferences.analytics.description")}
                    enabled={preferences.analytics}
                    onChange={(enabled) =>
                      setPreferences((prev) => ({ ...prev, analytics: enabled }))
                    }
                  />

                  {/* Marketing Cookies */}
                  <CookieToggle
                    id="marketing"
                    title={t("preferences.marketing.title")}
                    description={t("preferences.marketing.description")}
                    enabled={preferences.marketing}
                    onChange={(enabled) =>
                      setPreferences((prev) => ({ ...prev, marketing: enabled }))
                    }
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSavePreferences}
                    className="bg-ocean hover:bg-ocean-600 focus:ring-ocean flex items-center gap-2 rounded-lg px-6 py-2.5 font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  >
                    <Check className="h-4 w-4" />
                    {t("savePreferences")}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="bg-sand-100 text-sand-700 hover:bg-sand-200 focus:ring-sand-400 rounded-lg px-6 py-2.5 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  >
                    {t("acceptAll")}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

interface CookieToggleProps {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
  onChange: (enabled: boolean) => void;
}

function CookieToggle({
  id,
  title,
  description,
  enabled,
  disabled = false,
  onChange,
}: CookieToggleProps) {
  return (
    <div className="bg-sand-50 flex items-start gap-4 rounded-xl p-4">
      <div className="flex-1">
        <label htmlFor={`cookie-${id}`} className="text-ocean cursor-pointer font-medium">
          {title}
        </label>
        <p className="text-sand-600 mt-1 text-sm">{description}</p>
      </div>
      <button
        id={`cookie-${id}`}
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() => !disabled && onChange(!enabled)}
        className={`focus:ring-ocean relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:outline-none ${enabled ? "bg-ocean" : "bg-sand-300"} ${disabled ? "cursor-not-allowed opacity-70" : ""} `}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? "translate-x-5" : "translate-x-0"} `}
        />
      </button>
    </div>
  );
}

/**
 * Hook to manage cookie consent
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("cookie-consent") as ConsentStatus) || "pending";
    }
    return "pending";
  });
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    if (typeof window !== "undefined") {
      const savedPrefs = localStorage.getItem("cookie-preferences");
      if (savedPrefs) {
        try {
          return JSON.parse(savedPrefs);
        } catch {
          return defaultPreferences;
        }
      }
    }
    return defaultPreferences;
  });

  useEffect(() => {
    const handleChange = () => {
      const newStatus = localStorage.getItem("cookie-consent") as ConsentStatus | null;
      const newPrefs = localStorage.getItem("cookie-preferences");

      if (newStatus) setConsent(newStatus);
      if (newPrefs) {
        try {
          setPreferences(JSON.parse(newPrefs));
        } catch {
          // Invalid JSON
        }
      }
    };

    window.addEventListener("cookie-consent-change", handleChange);
    return () => window.removeEventListener("cookie-consent-change", handleChange);
  }, []);

  return { consent, preferences };
}
