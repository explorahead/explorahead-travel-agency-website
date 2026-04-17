/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { contact } from "@/config/contact";
import { isFeatureEnabled } from "@/config/features";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion, useInView } from "framer-motion";
import { Heart, Mail, RefreshCw, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";

export default function AboutPage() {
  const t = useTranslations("about");
  const storyRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  const whatsappLink = getWhatsAppLink(contact.phone);

  const values = [
    {
      icon: Heart,
      titleKey: "values.items.passion.title",
      descriptionKey: "values.items.passion.description",
    },
    {
      icon: Users,
      titleKey: "values.items.personal.title",
      descriptionKey: "values.items.personal.description",
    },
    {
      icon: RefreshCw,
      titleKey: "values.items.flexibility.title",
      descriptionKey: "values.items.flexibility.description",
    },
  ];

  const getStats = () => {
    const baseStats = [
      { value: "100+", labelKey: "stats.happyTravelers" },
      { value: "96%", labelKey: "stats.satisfactionRate" },
      { value: "5+", labelKey: "stats.yearsOfExperience" },
    ];

    if (isFeatureEnabled("destinations")) {
      baseStats.splice(2, 0, { value: "100+", labelKey: "stats.destinations" });
    }

    return baseStats;
  };

  const stats = getStats();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
            alt="Road trip through mountains"
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
            className="mx-auto max-w-2xl text-lg text-white/80 md:text-xl"
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="section">
        <div className="container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-tiny text-gold mb-2 block font-semibold">
                {t("story.badge")}
              </span>
              <h2 className="text-ocean mb-6">
                {t("story.titleLine1")}
                <br />
                {t("story.titleLine2")}
              </h2>
              <div className="text-gray-dark space-y-4 leading-relaxed">
                <p>{t("story.paragraph1")}</p>
                <p>{t("story.paragraph2")}</p>
                <p>{t("story.paragraph3")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/images/about/story/spider-web-palawan-el-nido-philipines.webp"
                  alt="Spider web bridge adventure in Bohol, Philippines"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              {/* Stats Overlay */}
              <div className="absolute right-8 -bottom-8 -left-8 rounded-xl bg-white p-6 shadow-xl">
                <div className={`grid gap-4 ${stats.length === 4 ? "grid-cols-2" : "grid-cols-3"}`}>
                  {stats.map((stat) => (
                    <div key={stat.labelKey} className="text-center">
                      <div className="font-heading text-gold text-2xl md:text-3xl">
                        {stat.value}
                      </div>
                      <div className="text-gray text-sm">{t(stat.labelKey)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="section bg-sand-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <span className="text-tiny text-gold mb-2 block font-semibold">
              {t("values.badge")}
            </span>
            <h2 className="text-ocean mb-4">{t("values.title")}</h2>
            <p className="text-gray-dark mx-auto px-4 text-base md:text-lg">
              {t("values.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.titleKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
                style={{ padding: "20px" }}
              >
                <div className="bg-ocean mb-6 flex h-14 w-14 items-center justify-center rounded-xl">
                  <value.icon size={28} className="text-gold" />
                </div>
                <h3 className="font-heading text-ocean mb-3 text-xl">{t(value.titleKey)}</h3>
                <p className="text-gray-dark">{t(value.descriptionKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - styled like HowItWorks but within constrained width */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="from-ocean via-ocean to-ocean-dark rounded-3xl bg-gradient-to-br text-center text-white shadow-2xl"
            style={{ padding: "20px" }}
          >
            <h3
              className="font-heading text-center text-3xl md:text-4xl"
              style={{ marginBottom: "0.3em", color: "#d4a574" }}
            >
              {t("cta.title")}
            </h3>

            <div className="flex justify-center" style={{ marginBottom: "1rem" }}>
              <div className="max-w-xl text-center text-lg text-white/80">
                <p style={{ margin: 0, padding: 0, lineHeight: "1.2" }}>{t("cta.subtitle")}</p>
                <p style={{ margin: 0, padding: 0, lineHeight: "1.2", marginTop: "1px" }}>
                  {t("cta.subtitleLine2")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-4 rounded-full text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 sm:w-auto lg:text-xl"
                style={{ backgroundColor: "#25D366", color: "white", padding: "16px 48px" }}
              >
                <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("cta.startPlanning")}
              </a>

              <Link
                href="/contact"
                className="bg-ocean-light hover:bg-ocean-dark inline-flex w-full items-center justify-center gap-4 rounded-full border-2 border-white/30 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 sm:w-auto lg:text-xl"
                style={{ padding: "16px 48px" }}
              >
                <Mail size={40} />
                {t("cta.contactUs")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
