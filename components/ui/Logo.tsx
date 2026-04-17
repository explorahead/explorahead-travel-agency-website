/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: "default" | "white";
}

export function Logo({ className = "", width = 280, height = 80, variant = "default" }: LogoProps) {
  const textColor = variant === "white" ? "#FFFFFF" : "#1B3B5F";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 380 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} h-auto max-w-full`}
      aria-label="ExplorAhead Logo"
      style={{ display: "block", minWidth: 0 }}
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" stopOpacity="1" />
          <stop offset="100%" stopColor="#D4A574" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="arrowGradientWhite" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#E0E0E0" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* "Explor" text - tight spacing for single word "ExplorAhead" */}
      <text
        x="0"
        y="72"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="60"
        fontWeight="700"
        fill={textColor}
        letterSpacing="-0.5"
        textAnchor="start"
      >
        Explor
      </text>

      {/* Compass needle arrow (replacing "A" in "ExplorAhead") - tightly positioned */}
      <g transform="translate(168, 8)">
        {/* Right half - solid gold fill */}
        <path
          d="M 28 0 L 56 78 L 28 65 Z"
          fill="rgba(212, 165, 116, 1)"
          stroke="rgba(212, 165, 116, 1)"
          strokeWidth="2"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
        {/* Left half - empty/hollow (stroke only, no fill) */}
        <path
          d="M 28 0 L 0 78 L 28 65 Z"
          fill="none"
          stroke="rgba(212, 165, 116, 1)"
          strokeWidth="2.5"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
      </g>

      {/* "head" text - positioned immediately after needle for continuous word */}
      <text
        x="222"
        y="72"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="60"
        fontWeight="700"
        fill={textColor}
        letterSpacing="-2"
        textAnchor="start"
      >
        head
      </text>
    </svg>
  );
}
