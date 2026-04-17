/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { getEnabledSocialMedia } from "@/config/social";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

// Custom icon components for platforms not in lucide-react
const TikTokIcon = ({ size = 20 }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const PinterestIcon = ({ size = 20 }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

// Map social platform IDs to their icons
const socialIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: TikTokIcon,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  pinterest: PinterestIcon,
};

export type SocialIconsVariant = "footer" | "contact" | "minimal";

interface SocialIconsProps {
  /** Visual variant */
  variant?: SocialIconsVariant;
  /** Icon size in pixels */
  iconSize?: number;
  /** Additional CSS classes for container */
  className?: string;
}

/**
 * Reusable Social Media Icons Component
 * Automatically displays enabled social platforms from config/social.ts
 */
export function SocialIcons({
  variant = "footer",
  iconSize = 20,
  className = "",
}: SocialIconsProps) {
  const enabledSocialMedia = getEnabledSocialMedia();

  // Variant-specific styles
  const variantStyles: Record<
    SocialIconsVariant,
    {
      container: string;
      link: string;
      icon: string;
    }
  > = {
    footer: {
      container: "flex flex-wrap gap-4",
      link: "group flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 hover:bg-gold hover:text-ocean transition-all duration-300 hover:scale-110 shadow-lg",
      icon: "text-white group-hover:text-ocean",
    },
    contact: {
      container: "flex gap-4",
      link: "bg-ocean hover:bg-gold group flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
      icon: "text-white group-hover:text-ocean",
    },
    minimal: {
      container: "flex gap-3",
      link: "text-sand-600 hover:text-ocean transition-colors",
      icon: "",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`${styles.container} ${className}`}>
      {enabledSocialMedia.map((social) => {
        const IconComponent = socialIcons[social.id];
        if (!IconComponent) return null;

        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label={social.name}
          >
            <IconComponent size={iconSize} className={styles.icon} />
          </a>
        );
      })}
    </div>
  );
}

export default SocialIcons;
