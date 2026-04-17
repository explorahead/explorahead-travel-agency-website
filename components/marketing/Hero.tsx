/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { WhatsAppHeroCTA, useWhatsAppVisibility } from "@/components/marketing/WhatsAppHeroCTA";
import { Button } from "@/components/ui/Button";
import { isFeatureEnabled } from "@/config/features";
import { heroSlides } from "@/config/media";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

// Pre-defined particle positions for deterministic rendering
const particlePositions = [
  { left: 12, top: 23, duration: 3.5, delay: 0.2 },
  { left: 45, top: 67, duration: 4.2, delay: 1.1 },
  { left: 78, top: 34, duration: 3.8, delay: 0.5 },
  { left: 23, top: 89, duration: 4.5, delay: 1.8 },
  { left: 56, top: 12, duration: 3.2, delay: 0.8 },
  { left: 89, top: 56, duration: 4.0, delay: 1.5 },
  { left: 34, top: 45, duration: 3.6, delay: 0.3 },
  { left: 67, top: 78, duration: 4.3, delay: 1.2 },
  { left: 8, top: 54, duration: 3.9, delay: 0.7 },
  { left: 91, top: 21, duration: 4.1, delay: 1.9 },
  { left: 43, top: 32, duration: 3.4, delay: 0.4 },
  { left: 76, top: 65, duration: 4.4, delay: 1.4 },
  { left: 19, top: 87, duration: 3.7, delay: 0.9 },
  { left: 52, top: 43, duration: 4.6, delay: 1.6 },
  { left: 85, top: 8, duration: 3.3, delay: 0.1 },
  { left: 28, top: 76, duration: 4.7, delay: 1.7 },
  { left: 61, top: 29, duration: 3.1, delay: 0.6 },
  { left: 94, top: 62, duration: 4.8, delay: 1.3 },
  { left: 37, top: 91, duration: 3.0, delay: 1.0 },
  { left: 70, top: 15, duration: 4.9, delay: 0.0 },
];

// Swipe threshold for navigation (in pixels)
const SWIPE_THRESHOLD = 50;

export function Hero() {
  const t = useTranslations("hero");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  // WhatsApp visibility hook
  const { isVisible, visitedSlides, journeyComplete, triggerVisibility } =
    useWhatsAppVisibility(currentSlide);

  // Get current slide data
  const currentSlideData = heroSlides[currentSlide];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    triggerVisibility();
  }, [triggerVisibility]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    triggerVisibility();
  }, [triggerVisibility]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
      setIsAutoPlaying(false);
      triggerVisibility();
    },
    [currentSlide, triggerVisibility]
  );

  // Swipe gesture handler
  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info;

      // Check if swipe exceeds threshold or has enough velocity
      if (offset.x < -SWIPE_THRESHOLD || velocity.x < -500) {
        nextSlide();
      } else if (offset.x > SWIPE_THRESHOLD || velocity.x > 500) {
        prevSlide();
      }
    },
    [nextSlide, prevSlide]
  );

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Banner Carousel with Swipe Support */}
      <motion.div
        className="absolute inset-0 z-0 touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={currentSlideData.image}
              alt={currentSlideData.alt}
              fill
              priority={currentSlide < 2}
              className="object-cover"
              style={{ objectPosition: currentSlideData.focalPoint || "center center" }}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBgcTMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQADAQEBAAAAAAAAAAAAAAABAgMAETH/2gAMAwEAAhEDEQA/AM2x"
            />
          </motion.div>
        </AnimatePresence>
        <div className="gradient-hero-overlay absolute inset-0" />
      </motion.div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-30 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 z-30 flex -translate-x-1/2 items-center">
        {/* Dot Indicators */}
        <div className="flex gap-3">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-colors duration-300 ${
                currentSlide === index
                  ? "bg-gold"
                  : visitedSlides.has(index)
                    ? "bg-gold/50 hover:bg-gold/75"
                    : "bg-white/40 hover:bg-white/60"
              }`}
              animate={{
                width: currentSlide === index ? 32 : 10,
                height: 10,
                scale: currentSlide === index ? 1 : 0.9,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              aria-label={`Go to slide ${index + 1}: ${heroSlides[index].destination}`}
              aria-current={currentSlide === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      {/* Animated Particles/Dots */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              backgroundColor: `${currentSlideData.iconColor}50`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="mb-6 inline-block rounded-full bg-white/20 px-6 py-2.5 text-sm font-medium tracking-wider uppercase backdrop-blur-sm">
            {t("badge")}
          </span>
        </motion.div>

        {/* Dynamic Message - Synced with Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
            role="region"
            aria-live="polite"
            aria-atomic="true"
          >
            <h1 className="text-display mx-auto max-w-4xl text-center">
              <span className="text-white italic drop-shadow-lg">
                {t(`slides.${currentSlideData.id}.message`)}
              </span>
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Destination Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`dest-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: currentSlideData.iconColor }}
              />
              {t(`slides.${currentSlideData.id}.destination`)}
            </span>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {isFeatureEnabled("destinations") && (
            <Link href="/destinations">
              <Button
                variant="outline"
                size="lg"
                className="hover:text-ocean border-white bg-white/10 text-white shadow-lg backdrop-blur-sm hover:bg-white hover:bg-white/20"
              >
                {t("ctaSecondary")}
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4"
        >
          {[
            ...(isFeatureEnabled("destinations")
              ? [{ value: "50+", label: t("stats.destinations") }]
              : []),
            { value: "5+", label: t("stats.experience") },
            // { value: "24/7", label: t("stats.support") }, ---Activate once the Travel Agent feature is added---
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-heading text-gold mb-1 text-3xl md:text-4xl">{stat.value}</div>
              <div className="text-sm tracking-wider text-white/60 uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-gold h-1.5 w-1.5 rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* WhatsApp Floating CTA */}
      <WhatsAppHeroCTA
        currentSlide={currentSlideData}
        currentSlideIndex={currentSlide}
        totalSlides={heroSlides.length}
        visitedSlides={visitedSlides}
        isVisible={isVisible}
        journeyComplete={journeyComplete}
        whatsappMessage={t(`slides.${currentSlideData.id}.whatsappMessage`)}
        journeyCompleteMessage={t("journeyComplete")}
        destinationName={t(`slides.${currentSlideData.id}.destination`)}
      />

      {/* Swipe Hint (mobile only, first-time) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-40 left-1/2 z-20 -translate-x-1/2 md:hidden"
      >
        <motion.p
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: 3 }}
          className="flex items-center gap-2 text-xs text-white/50"
        >
          <ChevronLeft size={14} />
          Swipe to explore
          <ChevronRight size={14} />
        </motion.p>
      </motion.div>
    </section>
  );
}

export default Hero;
