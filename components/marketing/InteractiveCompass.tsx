/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import type { HeroSlide } from "@/config/media";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type InteractiveCompassProps = {
  currentSlide: HeroSlide;
  onInteraction?: () => void;
  showTestimonial?: boolean;
  /** Translated destination name */
  destinationName?: string;
};

/**
 * Interactive Compass Icon
 *
 * A symbolic compass that represents discovery and exploration.
 * - Morphs color based on current banner theme
 * - Reveals destination tooltip and hidden testimonial on hover/tap
 * - Triggers WhatsApp CTA visibility on interaction
 */
export function InteractiveCompass({
  currentSlide,
  onInteraction,
  showTestimonial = true,
  destinationName,
}: InteractiveCompassProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = () => {
    setHasInteracted(true);
    onInteraction?.();
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Tooltip - Destination Name + Testimonial */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-20 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap"
          >
            <div className="rounded-xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm">
              <p className="font-heading text-ocean text-center text-sm font-semibold">
                {destinationName || currentSlide.destination}
              </p>
              {showTestimonial && currentSlide.testimonialSnippet && (
                <p className="text-ocean/70 mt-1 max-w-[200px] text-center text-xs italic">
                  {currentSlide.testimonialSnippet}
                </p>
              )}
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-white/95" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compass Button */}
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
        aria-label={`Discover ${destinationName || currentSlide.destination}. ${currentSlide.testimonialSnippet || ""}`}
      >
        {/* Outer Ring - Animated */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 opacity-50"
          style={{ borderColor: currentSlide.iconColor }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Compass SVG */}
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Circle */}
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity={0.6}
          />

          {/* Cardinal Directions */}
          <g className="fill-white/80 text-[10px] font-bold">
            <text x="24" y="10" textAnchor="middle" fontSize="6" fill="white" opacity={0.8}>
              N
            </text>
            <text x="24" y="42" textAnchor="middle" fontSize="6" fill="white" opacity={0.6}>
              S
            </text>
            <text x="6" y="26" textAnchor="middle" fontSize="6" fill="white" opacity={0.6}>
              W
            </text>
            <text x="42" y="26" textAnchor="middle" fontSize="6" fill="white" opacity={0.6}>
              E
            </text>
          </g>

          {/* Compass Needle - North (colored based on slide) */}
          <motion.path
            d="M24 8 L28 24 L24 20 L20 24 Z"
            initial={{ fill: "#d4a574" }}
            animate={{ fill: currentSlide.iconColor }}
            transition={{ duration: 0.5 }}
            className="animate-needle-pulse"
          />

          {/* Compass Needle - South (white) */}
          <path d="M24 40 L28 24 L24 28 L20 24 Z" fill="white" opacity={0.8} />

          {/* Center Circle */}
          <motion.circle
            cx="24"
            cy="24"
            r="3"
            initial={{ fill: "#d4a574" }}
            animate={{ fill: currentSlide.iconColor }}
            transition={{ duration: 0.5 }}
          />
        </svg>

        {/* Interaction Indicator (first-time hint) */}
        {!hasInteracted && (
          <motion.div
            className="bg-gold absolute -top-1 -right-1 h-3 w-3 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}
      </motion.button>
    </div>
  );
}

export default InteractiveCompass;
