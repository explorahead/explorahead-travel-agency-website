/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { contact } from "@/config/contact";
import { getWhatsAppLink, getWhatsAppLinkWithMessage } from "@/lib/whatsapp";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  HeadphonesIcon,
  Hotel,
  Mail,
  MapPin,
  MessageCircle,
  Plane,
  RefreshCw,
  Zap,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useState } from "react";

export default function PricingPage() {
  const t = useTranslations("pricing");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const pricingRef = useRef<HTMLElement>(null);
  const isPricingInView = useInView(pricingRef, { once: true, margin: "-100px" });
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const whatsappLink = getWhatsAppLink(contact.phone);

  // WhatsApp messages based on locale
  const whatsappMessages = {
    dreamFinder:
      locale === "pl"
        ? "Cześć! Jestem zainteresowany pakietem Poszukiwacz Marzeń (149 PLN). Proszę o więcej informacji o tym, jak kontynuować. Dziękuję!"
        : "Hi! I'm interested in the Dream Finder package (149 PLN). Please provide more information about how to proceed. Thank you!",
    tripSupport:
      locale === "pl"
        ? "Cześć! Jestem zainteresowany pakietem Wsparcie w Podróży (199 PLN) dla wsparcia w czasie rzeczywistym podczas podróży. Proszę o więcej informacji o tym, jak kontynuować. Dziękuję!"
        : "Hi! I'm interested in the Trip Support package (199 PLN) for real-time travel support. Please provide more information about how to proceed. Thank you!",
    dreamPlan:
      locale === "pl"
        ? "Cześć! Jestem zainteresowany pakietem Plan Marzeń. Proszę o więcej informacji o tym, jak kontynuować. Dziękuję!"
        : "Hi! I'm interested in the Dream Plan package. Please provide more information about how to proceed. Thank you!",
    express:
      locale === "pl"
        ? "Cześć! Potrzebuję PILNEJ pomocy z planami podróży! Jestem zainteresowany pakietem Usługa Ekspresowa (299 PLN) dla szybkiej pomocy 24-48h. Proszę odpowiedzieć jak najszybciej. Dziękuję!"
        : "Hi! I need URGENT help with my travel plans! I'm interested in the Express Service package (299 PLN) for quick 24-48h assistance. Please respond as soon as possible. Thank you!",
    premium:
      locale === "pl"
        ? "Cześć! Jestem zainteresowany Pakietem Premium (Plan Marzeń + Wsparcie w Podróży) dla kompleksowej obsługi. Proszę o więcej informacji. Dziękuję!"
        : "Hi! I'm interested in the Premium Package (Dream Plan + Trip Support) for complete service. Please provide more information. Thank you!",
  };

  const dreamFinderFeatures = [
    "dreamFinder.features.consultation",
    "dreamFinder.features.conversation",
    "dreamFinder.features.recommendations",
  ];

  const premiumFeatures = [
    "premiumPackage.features.dreamPlan",
    "premiumPackage.features.companion",
  ];

  const dreamPlanFeatures = [
    { icon: FileText, key: "dreamPlan.features.itinerary" },
    { icon: Plane, key: "dreamPlan.features.flights" },
    { icon: Hotel, key: "dreamPlan.features.hotels" },
    { icon: RefreshCw, key: "dreamPlan.features.revisions" },
    { icon: Mail, key: "dreamPlan.features.emailSupport" },
  ];

  const tripSupportFeatures = [
    { icon: HeadphonesIcon, key: "tripSupport.features.whatsapp" },
    { icon: RefreshCw, key: "tripSupport.features.changes" },
    { icon: MapPin, key: "tripSupport.features.recommendations" },
    { icon: FileText, key: "tripSupport.features.basicPlan" },
  ];

  const expressFeatures = [
    { icon: Zap, key: "express.features.quickPlan" },
    { icon: Hotel, key: "express.features.recommendations" },
    { icon: MessageCircle, key: "express.features.support" },
  ];

  const pricingTiers = [
    { duration: "1-4", label: "dreamPlan.tiers.short", price: "249" },
    { duration: "5-10", label: "dreamPlan.tiers.standard", price: "399" },
    { duration: "11-14", label: "dreamPlan.tiers.long", price: "549" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop"
            alt="Travel planning and destinations"
            className="h-full w-full object-cover"
          />
          <div className="bg-ocean/80 absolute inset-0" />
        </div>

        <div className="relative z-10 container text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gold/20 border-gold/30 text-gold mb-6 inline-block rounded-full border px-6 py-2.5 text-sm font-medium tracking-wider uppercase backdrop-blur-sm"
          >
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading mb-6 text-4xl md:text-5xl lg:text-6xl"
            style={{ color: "#d4a574" }}
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-8 max-w-2xl text-lg whitespace-pre-line text-white/90 md:text-xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 text-white"
          >
            <div className="flex items-center gap-2">
              <Plane className="text-gold h-6 w-6" />
              <span>{t("hero.icons.flights")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-gold h-6 w-6" />
              <span>{t("hero.icons.hotels")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-gold h-6 w-6" />
              <span>{t("hero.icons.attractions")}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section-sm bg-sand-light">
        <div className="container flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-center"
          >
            <h2 className="font-heading text-ocean mb-6 text-3xl md:text-4xl">
              {t("valueProposition.title")}
            </h2>
            <p className="text-gray-dark text-lg leading-relaxed">
              {t("valueProposition.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section ref={pricingRef} className="section-sm bg-cream">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-header"
          >
            <span className="bg-gold/10 text-gold mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
              {t("packages.badge")}
            </span>
            <h2 className="font-heading text-ocean text-3xl md:text-4xl">{t("packages.title")}</h2>
          </motion.div>

          <div className="pricing-grid">
            {/* Dream Finder Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05 }}
              className={`pricing-card group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ${
                hoveredPlan === "finder" ? "scale-105 shadow-2xl" : "hover:shadow-xl"
              }`}
              onMouseEnter={() => setHoveredPlan("finder")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge Container */}
              <div className="pricing-badge-container from-ocean via-ocean-dark to-ocean bg-gradient-to-br">
                <span className="pricing-badge bg-gradient-to-r from-lime-400 to-green-400 text-slate-800">
                  NEW
                </span>
              </div>

              {/* Header */}
              <div className="pricing-header from-ocean via-ocean-dark to-ocean bg-gradient-to-br">
                <h3 className="font-heading text-gold mb-2 text-2xl">{t("dreamFinder.title")}</h3>
                <p className="text-sm text-white">{t("dreamFinder.subtitle")}</p>
              </div>

              {/* Features */}
              <div className="pricing-features flex flex-1 flex-col">
                <ul className="mb-auto flex-1 space-y-3">
                  {dreamFinderFeatures.map((key, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-gold mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-dark text-sm">{t(key)}</span>
                    </li>
                  ))}
                </ul>

                {/* Price - Fixed Height Section */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="mb-4 text-center">
                    <p className="text-gold text-4xl font-bold">149 PLN</p>
                  </div>
                  <div className="pricing-info-box border-gold/30 bg-gold/10 border">
                    <p className="text-gold-dark mb-1 font-semibold">💡 Bonus</p>
                    <p className="text-gray-dark">{t("dreamFinder.bonusText")}</p>
                  </div>
                  <a
                    href={getWhatsAppLinkWithMessage(contact.phone, whatsappMessages.dreamFinder)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pricing-book-btn bg-ocean text-gold hover:bg-ocean-dark"
                  >
                    {tCommon("bookNow")}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Journey Concierge Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`pricing-card group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ${
                hoveredPlan === "companion" ? "scale-105 shadow-2xl" : "hover:shadow-xl"
              }`}
              onMouseEnter={() => setHoveredPlan("companion")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge Container */}
              <div className="pricing-badge-container from-ocean via-ocean-dark to-ocean bg-gradient-to-br">
                <span className="pricing-badge bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-800">
                  POPULAR
                </span>
              </div>

              {/* Header */}
              <div className="pricing-header from-ocean via-ocean-dark to-ocean bg-gradient-to-br">
                <h3 className="font-heading text-gold mb-2 text-2xl">{t("tripSupport.title")}</h3>
                <p className="text-sm text-white">{t("tripSupport.subtitle")}</p>
                <p className="text-gold mt-2 text-xs">{t("tripSupport.requirement")}</p>
              </div>

              {/* Features */}
              <div className="pricing-features flex flex-1 flex-col">
                <ul className="mb-auto flex-1 space-y-3">
                  {tripSupportFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-gold mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-dark text-sm">{t(feature.key)}</span>
                    </li>
                  ))}
                </ul>

                {/* Price - Fixed Height Section */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="mb-4 text-center">
                    <p className="text-gold text-4xl font-bold">199 PLN</p>
                  </div>
                  <p className="pricing-legend">{t("tripSupport.duration")}</p>
                  <div className="pricing-info-box border-gold/30 bg-gold/10 border">
                    <p className="text-gold-dark font-medium">⭐ {t("tripSupport.payOnce")}</p>
                  </div>
                  <a
                    href={getWhatsAppLinkWithMessage(contact.phone, whatsappMessages.tripSupport)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pricing-book-btn bg-ocean text-gold hover:bg-ocean-dark"
                  >
                    {tCommon("bookNow")}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Dream Plan Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`pricing-card group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ${
                hoveredPlan === "dream" ? "scale-105 shadow-2xl" : "hover:shadow-xl"
              }`}
              onMouseEnter={() => setHoveredPlan("dream")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge Container - invisible placeholder for consistent spacing */}
              <div className="pricing-badge-container from-ocean via-ocean-dark to-ocean bg-gradient-to-br">
                <span className="pricing-badge opacity-0">PLACEHOLDER</span>
              </div>

              {/* Header */}
              <div className="pricing-header from-ocean via-ocean-dark to-ocean bg-gradient-to-br">
                <h3 className="font-heading text-gold mb-2 text-2xl">{t("dreamPlan.title")}</h3>
                <p className="text-sm text-white">{t("dreamPlan.subtitle")}</p>
              </div>

              {/* Features */}
              <div className="pricing-features flex flex-1 flex-col">
                <ul className="mb-auto flex-1 space-y-3">
                  {dreamPlanFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-gold mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-dark text-sm">{t(feature.key)}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing Tiers - Fixed Height Section */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="mb-4">
                    <p className="text-gray-dark mb-3 text-center text-sm font-medium">
                      {t("dreamPlan.priceLabel")}
                    </p>
                    <div className="space-y-1.5">
                      {pricingTiers.map((tier, index) => (
                        <div
                          key={index}
                          className="bg-sand-light flex items-center justify-between rounded-lg px-3 py-1.5"
                        >
                          <span className="text-gray-dark text-xs">
                            {tier.duration} {t("common.days")}:
                          </span>
                          <span className="text-gold text-lg font-bold">{tier.price} PLN</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pricing-info-box border-gold/30 bg-gold/10 border">
                    <p className="text-gold-dark font-medium">{t("dreamPlan.longerTrips")}</p>
                    <p className="text-gold-dark mt-2 font-medium">{t("dreamPlan.emailHours")}</p>
                  </div>
                  <a
                    href={getWhatsAppLinkWithMessage(contact.phone, whatsappMessages.dreamPlan)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pricing-book-btn bg-ocean text-gold hover:bg-ocean-dark"
                  >
                    {tCommon("bookNow")}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Express Service Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`pricing-card group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ${
                hoveredPlan === "express" ? "scale-105 shadow-2xl" : "hover:shadow-xl"
              }`}
              onMouseEnter={() => setHoveredPlan("express")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge Container */}
              <div className="pricing-badge-container from-ocean via-ocean-dark to-ocean bg-gradient-to-br">
                <span className="pricing-badge bg-gradient-to-r from-red-500 to-orange-500 text-white">
                  URGENT
                </span>
              </div>

              {/* Header */}
              <div className="pricing-header from-ocean via-ocean-dark to-ocean bg-gradient-to-br">
                <h3 className="font-heading text-gold">{t("express.title")}</h3>
                <p className="text-sm text-white">{t("express.subtitle")}</p>
                <p className="text-sm leading-tight text-white">{t("express.subtitle2")}</p>
              </div>

              {/* Features */}
              <div className="pricing-features flex flex-1 flex-col">
                <ul className="mb-auto flex-1 space-y-3">
                  {expressFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-gold mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-dark text-sm">{t(feature.key)}</span>
                    </li>
                  ))}
                </ul>

                {/* Price - Fixed Height Section */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="mb-4 text-center">
                    <p className="text-gold text-4xl font-bold">299 PLN</p>
                  </div>
                  <p className="pricing-legend"></p>
                  <a
                    href={getWhatsAppLinkWithMessage(contact.phone, whatsappMessages.express)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pricing-book-btn bg-ocean text-gold hover:bg-ocean-dark"
                  >
                    {tCommon("bookNow")}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Premium Package Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`pricing-card group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ${
                hoveredPlan === "premium" ? "scale-105 shadow-2xl" : "hover:shadow-xl"
              }`}
              onMouseEnter={() => setHoveredPlan("premium")}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge Container */}
              <div className="pricing-badge-container from-gold via-gold-dark to-terracotta bg-gradient-to-br">
                <span className="pricing-badge bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  BEST VALUE
                </span>
              </div>

              {/* Header */}
              <div className="pricing-header from-gold via-gold-dark to-terracotta bg-gradient-to-br">
                <p className="text-ocean mb-1 text-xs font-semibold">
                  {t("premiumPackage.combination")}
                </p>
                <h3 className="font-heading text-ocean mb-2 text-2xl">
                  {t("premiumPackage.title")}
                </h3>
                <p className="text-sm text-white/90">{t("premiumPackage.subtitle")}</p>
              </div>

              {/* Features */}
              <div className="pricing-features flex flex-1 flex-col">
                <ul className="mb-auto flex-1 space-y-3">
                  {premiumFeatures.map((key, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-gold mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-dark text-sm">{t(key)}</span>
                    </li>
                  ))}
                </ul>

                {/* Price - Fixed Height Section */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="mb-2 text-center">
                    <p className="text-sm text-slate-400 line-through">598 PLN</p>
                    <p className="text-gold text-4xl font-bold">499 PLN</p>
                  </div>
                  <p className="pricing-legend">{t("premiumPackage.packagePrice")}</p>
                  <div className="pricing-info-box border-gold/30 bg-gold/10 border">
                    <p className="text-gold-dark font-semibold">🎉 {t("premiumPackage.savings")}</p>
                  </div>
                  <a
                    href={getWhatsAppLinkWithMessage(contact.phone, whatsappMessages.premium)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pricing-book-btn bg-gold hover:bg-gold-dark text-white"
                  >
                    {tCommon("bookNow")}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile scroll indicator */}
          <div className="pricing-scroll-indicator">
            <ChevronLeft className="h-4 w-4" />
            <span>{t("packages.swipeHint")}</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-sm bg-sand-light">
        <div className="container mx-auto max-w-7xl px-5 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="from-ocean via-ocean to-ocean-dark rounded-3xl bg-gradient-to-br text-center text-white shadow-2xl"
            style={{ padding: "20px" }}
          >
            {/* Title */}
            <h2 className="font-heading mb-6 text-center text-3xl text-white md:text-4xl lg:text-5xl">
              {t("cta.title")}
            </h2>

            {/* Subtitle */}
            <div className="mb-12 flex justify-center">
              <p className="max-w-xl text-center text-lg whitespace-nowrap text-white/80">
                {t("cta.subtitle")}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
              {/* WhatsApp Button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-4 rounded-full text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 sm:w-auto lg:text-xl"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  padding: "16px 48px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#20BA5A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#25D366";
                }}
              >
                <svg
                  className="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("cta.whatsapp")}
              </a>

              {/* Contact Button */}
              <Link
                href="/contact"
                className="bg-ocean-light hover:bg-ocean-dark inline-flex w-full items-center justify-center gap-4 rounded-full border-2 border-white/30 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 sm:w-auto lg:text-xl"
                style={{ padding: "16px 48px" }}
              >
                <Mail className="h-10 w-10" />
                {t("cta.contact")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
