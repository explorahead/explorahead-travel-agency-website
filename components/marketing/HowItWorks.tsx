/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { contact } from "@/config/contact";
import { Link } from "@/lib/i18n/routing";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion, useInView } from "framer-motion";
import { Luggage, Mail, Map, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export function HowItWorks() {
  const t = useTranslations("marketing.howItWorks");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const whatsappLink = getWhatsAppLink(contact.phone);

  const steps = [
    {
      icon: MessageCircle,
      stepNumber: 1,
      titleKey: "steps.connect.title",
      descriptionKey: "steps.connect.description",
      detailKey: "steps.connect.detail",
      detail2Key: "steps.connect.detail2",
    },
    {
      icon: Map,
      stepNumber: 2,
      titleKey: "steps.plan.title",
      descriptionKey: "steps.plan.description",
      detailKey: "steps.plan.detail",
      detail2Key: "steps.plan.detail2",
    },
    {
      icon: Luggage,
      stepNumber: 3,
      titleKey: "steps.travel.title",
      descriptionKey: "steps.travel.description",
      detailKey: "steps.travel.detail",
      detail2Key: "steps.travel.detail2",
    },
  ];

  return (
    <section ref={sectionRef} className="section bg-sand-light">
      <div className="container mx-auto max-w-7xl px-5 py-20">
        {/* Section Header - Explicitly centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-center justify-center"
        >
          <span className="section-badge">{t("badge")}</span>
          <h2 className="text-ocean font-heading mx-auto mb-8 text-center text-4xl whitespace-nowrap md:text-5xl">
            {t("title")}
          </h2>
          {/* Subtitle - Centered horizontally and vertically balanced with title */}
          <p className="section-subtitle px-4 text-center">{t("subtitle")}</p>
        </motion.div>

        {/* Spacer - Small gap before cards, badge extends slightly above */}
        <div className="h-4 md:h-6" />

        {/* Step Cards Container
            Mobile: Horizontal scroll-snap carousel with pt-4 for badge visibility
            Desktop: Grid layout */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pt-6 md:pb-0 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative w-[85vw] flex-shrink-0 snap-center md:w-auto md:flex-shrink"
            >
              {/* Card Container - Icon is inside, no overflow issues */}
              <div className="relative w-full rounded-2xl bg-white px-4 pt-8 pb-6 shadow-md sm:px-6 md:pt-10 md:pb-8">
                {/* Step Number Badge - Inside card, top left corner */}
                <div className="bg-gold absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-lg md:top-4 md:left-4 md:h-10 md:w-10">
                  <span className="text-sm font-bold text-white md:text-base">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Icon - Inside the card, centered */}
                <div className="mb-4 flex justify-center">
                  <div className="bg-ocean flex h-14 w-14 items-center justify-center rounded-full shadow-md md:h-16 md:w-16">
                    <step.icon className="h-6 w-6 text-white md:h-8 md:w-8" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="card-title text-center">{t(step.titleKey)}</h3>

                {/* Description */}
                <p className="card-description mx-auto mb-4 text-center">
                  {t(step.descriptionKey)}
                </p>

                {/* Detail Lines */}
                <div className="text-gold space-y-1 text-center text-sm">
                  <p className="font-medium">{t(step.detailKey)}</p>
                  <p className="font-medium">{t(step.detail2Key)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spacer - Clear separation between cards and CTA */}
        <div className="h-16 md:h-20" />

        {/* CTA Section - With clear vertical spacing and consistent padding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="from-ocean via-ocean to-ocean-dark rounded-3xl bg-gradient-to-br text-center text-white shadow-2xl"
          style={{ padding: "20px" }}
        >
          {/* Title - Centered */}
          <h3 className="font-heading mb-6 text-center text-3xl text-white md:text-4xl">
            {t("cta.title")}
          </h3>

          {/* Subtitle - Centered with respect to title */}
          <div className="mb-12 flex justify-center">
            <p className="max-w-xl text-center text-base leading-relaxed text-white/80 md:text-lg">
              {t("cta.subtitle")}
            </p>
          </div>

          {/* Buttons - Centered with spacing */}
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
              <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t("cta.chatNow")}
            </a>

            {/* Contact Us Button */}
            <Link
              href="/contact#contact-form"
              className="bg-ocean-light hover:bg-ocean-dark inline-flex w-full items-center justify-center gap-4 rounded-full border-2 border-white/30 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 sm:w-auto lg:text-xl"
              style={{ padding: "16px 48px" }}
            >
              <Mail size={40} />
              {t("cta.contactUs")}
            </Link>
          </div>

          {/* Social Proof - Equidistant from buttons and bottom border */}
          <p
            className="text-center text-sm text-white/60"
            style={{ marginTop: "20px", marginBottom: "0" }}
          >
            {t("cta.socialProof")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
