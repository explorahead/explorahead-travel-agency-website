/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { motion, useInView } from "framer-motion";
import { Calendar, Heart, Home, Mail, Plane } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

// WhatsApp Icon Component
const WhatsAppIcon = ({
  size = 32,
  className = "",
  strokeWidth = 2,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface ServiceItem {
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  titleKey: string;
  descriptionKey: string;
  color: string;
  descriptionLine2Key?: string;
  descriptionLine3Key?: string;
}

export function ServicesPreview() {
  const t = useTranslations("marketing.servicesPreview");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services: ServiceItem[] = [
    {
      icon: Calendar,
      titleKey: "items.dailyPlanning.title",
      descriptionKey: "items.dailyPlanning.description",
      color: "bg-forest",
    },
    {
      icon: Plane,
      titleKey: "items.transport.title",
      descriptionKey: "items.transport.description",
      color: "bg-ocean",
    },
    {
      icon: Home,
      titleKey: "items.accommodation.title",
      descriptionKey: "items.accommodation.description",
      color: "bg-gold",
    },
    {
      icon: Heart,
      titleKey: "items.experiences.title",
      descriptionKey: "items.experiences.description",
      color: "bg-terracotta",
    },
    {
      icon: Mail,
      titleKey: "items.emailSupport.title",
      descriptionKey: "items.emailSupport.description",
      color: "bg-ocean-light",
    },
    {
      icon: WhatsAppIcon,
      titleKey: "items.whatsappSupport.title",
      descriptionKey: "items.whatsappSupport.description",
      descriptionLine3Key: "items.whatsappSupport.descriptionLine3",
      color: "bg-forest",
    },
  ];

  return (
    <section ref={sectionRef} className="section to-sand-light/30 bg-gradient-to-b from-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="text-ocean font-heading mb-6 text-4xl md:text-5xl">{t("title")}</h2>
          <p className="section-subtitle text-center">{t("subtitle")}</p>
        </motion.div>

        {/* Services Grid */}
        <div className="mx-auto max-w-6xl">
          {/* First Row - 3 items */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className="border-sand-dark/10 hover:border-ocean/20 h-full rounded-2xl border bg-white p-8 transition-all duration-300 hover:shadow-2xl"
                  style={{ padding: "20px" }}
                >
                  {/* Icon */}
                  <div
                    className={`h-16 w-16 rounded-2xl ${service.color} mb-6 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105`}
                  >
                    <service.icon size={32} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3 className="service-card-title group-hover:text-gold transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <p className="service-card-description">{t(service.descriptionKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second Row - 2 items centered */}
          <div className="flex flex-col items-stretch justify-center gap-6 md:flex-row lg:flex-row">
            {services.slice(3).map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                className="group w-full md:max-w-[calc(50%-0.75rem)] lg:max-w-[calc(33.333%-1rem)]"
              >
                <div
                  className="border-sand-dark/10 hover:border-ocean/20 h-full rounded-2xl border bg-white p-8 transition-all duration-300 hover:shadow-2xl"
                  style={{ padding: "20px" }}
                >
                  {/* Icon */}
                  <div
                    className={`h-16 w-16 rounded-2xl ${service.color} mb-6 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105`}
                  >
                    <service.icon size={32} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3 className="service-card-title group-hover:text-gold transition-colors">
                    {t(service.titleKey)}
                  </h3>
                  <div className="service-card-description">
                    <p className="!mb-1">{t(service.descriptionKey)}</p>
                    {service.descriptionLine2Key && (
                      <p className="mt-2 !mb-1">{t(service.descriptionLine2Key)}</p>
                    )}
                    {service.descriptionLine3Key && (
                      <p className="text-gold mt-1 !mb-0 font-medium">
                        {t(service.descriptionLine3Key)}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
