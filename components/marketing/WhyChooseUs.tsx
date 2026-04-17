/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { motion, useInView } from "framer-motion";
import { Compass, HeartHandshake, Shield, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export function WhyChooseUs() {
  const t = useTranslations("marketing.whyChooseUs");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: Shield,
      titleKey: "items.zeroStress.title",
      descriptionKey: "items.zeroStress.description",
      color: "bg-ocean",
    },
    {
      icon: Compass,
      titleKey: "items.authenticity.title",
      descriptionKey: "items.authenticity.description",
      color: "bg-gold",
    },
    {
      icon: HeartHandshake,
      titleKey: "items.supportReturn.title",
      descriptionKey: "items.supportReturn.description",
      color: "bg-forest",
    },
    {
      icon: User,
      titleKey: "items.personalized.title",
      descriptionKey: "items.personalized.description",
      color: "bg-terracotta",
    },
  ];

  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header text-center"
        >
          <h2 className="text-ocean font-heading mb-6 text-4xl md:text-5xl">{t("title")}</h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.titleKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col items-center gap-4 text-center"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`h-14 w-14 rounded-xl ${benefit.color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <benefit.icon size={28} className="text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center">
                  <h3 className="card-title group-hover:text-gold text-center transition-colors">
                    {t(benefit.titleKey)}
                  </h3>
                  <p className="card-description mx-auto text-center">
                    {t(benefit.descriptionKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
