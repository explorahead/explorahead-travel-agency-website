/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { Button } from "@/components/ui/Button";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";

export function CTASection() {
  const t = useTranslations("marketing.cta");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
          alt="Mountain lake landscape"
          className="h-full w-full object-cover"
        />
        <div className="from-ocean/90 via-ocean/80 to-ocean/70 absolute inset-0 bg-gradient-to-r" />
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="border-gold/10 absolute -top-1/4 -right-1/4 h-1/2 w-1/2 rounded-full border"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
          className="border-gold/10 absolute -bottom-1/4 -left-1/4 h-3/4 w-3/4 rounded-full border"
        />
      </div>

      <div className="relative z-20 container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gold/20 border-gold/30 mb-8 inline-flex items-center gap-2 rounded-full border px-6 py-2.5"
          >
            <Sparkles size={18} className="text-gold" />
            <span className="text-gold text-sm font-medium">{t("badge")}</span>
          </motion.div>

          <h2 className="font-heading mb-6 text-4xl text-white md:text-5xl lg:text-6xl">
            {t("title")} <span className="text-gold">{t("titleHighlight")}</span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {t("subtitle")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/contact">
              <Button
                variant="gold"
                size="lg"
                leftIcon={<Sparkles size={20} />}
                rightIcon={<ArrowRight size={20} />}
              >
                {t("requestAccess")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="hover:text-ocean border-white bg-white/10 text-white shadow-lg backdrop-blur-sm hover:bg-white hover:bg-white/20"
              >
                {t("talkToExpert")}
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 border-t border-white/10 pt-12"
          >
            <p className="mb-4 text-sm text-white/50">{t("trustIndicator")}</p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {["TripAdvisor", "Trustpilot", "Google", "Forbes Travel"].map((brand) => (
                <span key={brand} className="text-lg font-medium tracking-wide text-white/40">
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
