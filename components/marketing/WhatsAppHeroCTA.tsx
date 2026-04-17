/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { contact } from "@/config/contact";
import { heroSlides, type HeroSlide } from "@/config/media";
import { getWhatsAppLinkWithMessage } from "@/lib/whatsapp";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

// Official WhatsApp icon SVG
function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type WhatsAppHeroCTAProps = {
  currentSlide: HeroSlide;
  currentSlideIndex: number;
  totalSlides: number;
  visitedSlides: Set<number>;
  isVisible: boolean;
  journeyComplete: boolean;
  /** Translated WhatsApp message for current slide */
  whatsappMessage: string;
  /** Translated journey complete message */
  journeyCompleteMessage: string;
  /** Translated destination name */
  destinationName: string;
};

/**
 * Smart WhatsApp Floating CTA
 *
 * - Appears after emotional trigger (dwell time, interaction, or scroll pause)
 * - Animates with heartbeat-pulse effect
 * - Dynamic pre-filled message based on current banner
 * - Special celebration state when journey is complete
 */
export function WhatsAppHeroCTA({
  currentSlide,
  currentSlideIndex,
  totalSlides,
  visitedSlides,
  isVisible,
  journeyComplete,
  whatsappMessage,
  journeyCompleteMessage,
  destinationName,
}: WhatsAppHeroCTAProps) {
  // Determine the WhatsApp link based on journey state
  const whatsappLink = journeyComplete
    ? getWhatsAppLinkWithMessage(contact.phone, journeyCompleteMessage)
    : getWhatsAppLinkWithMessage(contact.phone, whatsappMessage);

  // Pulse animation controlled by slide changes
  // Using a key-based approach to avoid direct setState in effect
  const pulseKey = `pulse-${currentSlideIndex}`;

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="fixed right-6 bottom-24 z-50 md:bottom-8"
      >
        {/* WhatsApp Button - Simple circular icon */}
        <motion.a
          key={pulseKey}
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all ${
            journeyComplete
              ? "bg-gradient-to-r from-[#25D366] to-[#128C7E]"
              : "bg-[#25D366] hover:bg-[#22c55e]"
          } animate-heartbeat`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={
            journeyComplete
              ? "Chat on WhatsApp - You've explored all destinations!"
              : `Chat on WhatsApp about ${destinationName}`
          }
        >
          <WhatsAppIcon size={28} />
        </motion.a>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Hook to manage WhatsApp CTA visibility based on user engagement
 */
export function useWhatsAppVisibility(currentSlideIndex: number) {
  const [isVisible, setIsVisible] = useState(false);
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(() => new Set([0]));
  const [hasInteracted, setHasInteracted] = useState(false);

  // Track visited slides using callback to avoid synchronous setState
  const addVisitedSlide = useCallback((slideIndex: number) => {
    setVisitedSlides((prev) => {
      if (prev.has(slideIndex)) return prev;
      return new Set([...Array.from(prev), slideIndex]);
    });
  }, []);

  // Track current slide when it changes
  useEffect(() => {
    // Use requestAnimationFrame to defer the update
    const frameId = requestAnimationFrame(() => {
      addVisitedSlide(currentSlideIndex);
    });
    return () => cancelAnimationFrame(frameId);
  }, [currentSlideIndex, addVisitedSlide]);

  // Show CTA after dwell time (3 seconds)
  useEffect(() => {
    const dwellTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(dwellTimer);
  }, []);

  // Compute derived state for showing visibility
  const shouldShow = hasInteracted || visitedSlides.size > 1;

  // Update visibility when conditions are met (non-blocking)
  useEffect(() => {
    if (shouldShow && !isVisible) {
      const frameId = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [shouldShow, isVisible]);

  const triggerVisibility = useCallback(() => {
    setHasInteracted(true);
    setIsVisible(true);
  }, []);

  const journeyComplete = visitedSlides.size === heroSlides.length;

  return {
    isVisible,
    visitedSlides,
    journeyComplete,
    triggerVisibility,
  };
}

export default WhatsAppHeroCTA;
