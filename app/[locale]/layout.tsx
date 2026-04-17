/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { GoogleAnalytics } from "@/components/analytics";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { routing } from "@/lib/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title.default"),
      template: t("title.template"),
    },
    description: t("description"),
    keywords: [
      "travel agency",
      "luxury travel",
      "personalized trips",
      "travel planning",
      "vacation packages",
      "honeymoon",
      "adventure travel",
    ],
    authors: [{ name: "ExplorAhead" }],
    openGraph: {
      type: "website",
      locale: locale === "pl" ? "pl_PL" : "en_US",
      siteName: "ExplorAhead",
      title: t("title.default"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title.default"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        pl: "/pl",
        "x-default": "/en",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Load messages for this locale
  const messages = await getMessages();

  // JSON-LD Structured Data for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "ExplorAhead",
    description:
      "Experience personalized luxury travel planning with our AI-powered travel specialist.",
    url: `https://explorahead.com/${locale}`,
    logo: "https://explorahead.com/images/logo.png",
    sameAs: [
      "https://instagram.com/explorahead",
      "https://facebook.com/explorahead",
      "https://twitter.com/explorahead",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wroclaw",
      addressCountry: "PL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+48-503-801-994",
      contactType: "customer service",
      email: "explorahead@gmail.com",
      availableLanguage: ["English", "Polish"],
    },
    priceRange: "$$",
  };

  return (
    <html lang={locale} className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="focus:bg-ocean sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>
          {children}
          <CookieConsent />
          <GoogleAnalytics />
          <Analytics />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: "var(--font-body)",
                background: "var(--color-ocean)",
                color: "var(--color-white)",
                borderRadius: "var(--radius-md)",
              },
              success: {
                iconTheme: {
                  primary: "var(--color-gold)",
                  secondary: "var(--color-ocean)",
                },
              },
              error: {
                iconTheme: {
                  primary: "var(--color-terracotta)",
                  secondary: "var(--color-white)",
                },
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
