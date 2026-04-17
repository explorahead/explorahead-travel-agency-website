/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import type { HeroSlide } from "@/config/media";

const WHATSAPP_MESSAGE =
  "Hi! I'm interested in your travel services and would like to discuss my travel plans and how you can help me create an unforgettable experience.";

const WHATSAPP_JOURNEY_COMPLETE_MESSAGE =
  "I explored all your destinations—I'm ready to start planning my dream trip!";

export function getWhatsAppLink(phoneNumber: string): string {
  const whatsappNumber = phoneNumber.replace(/[\s+]/g, "");
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

export function getWhatsAppLinkWithMessage(phoneNumber: string, message: string): string {
  const whatsappNumber = phoneNumber.replace(/[\s+]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Get WhatsApp link with destination-specific pre-filled message
 */
export function getWhatsAppLinkForDestination(phoneNumber: string, slide: HeroSlide): string {
  return getWhatsAppLinkWithMessage(phoneNumber, slide.whatsappMessage);
}

/**
 * Get WhatsApp link for journey completion celebration
 */
export function getWhatsAppLinkJourneyComplete(phoneNumber: string): string {
  return getWhatsAppLinkWithMessage(phoneNumber, WHATSAPP_JOURNEY_COMPLETE_MESSAGE);
}
