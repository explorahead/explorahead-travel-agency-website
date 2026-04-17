/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  variant?: "default" | "elevated" | "outlined" | "glass";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const cardVariants = {
  default: "bg-white",
  elevated: "bg-white shadow-lg",
  outlined: "bg-white border border-gray-lighter",
  glass: "glass",
};

const paddingSizes = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  variant = "default",
  hover = false,
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: "var(--shadow-xl)" } : undefined}
      transition={{ duration: 0.2 }}
      className={`overflow-hidden rounded-xl ${cardVariants[variant]} ${paddingSizes[padding]} ${hover ? "cursor-pointer transition-shadow" : ""} ${className} `}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  overlay?: boolean;
  children?: ReactNode;
}

const aspectRatios = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[2/1]",
};

export function CardImage({
  src,
  alt,
  aspectRatio = "video",
  overlay = false,
  children,
}: CardImageProps) {
  return (
    <div className={`relative ${aspectRatios[aspectRatio]} overflow-hidden`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {overlay && (
        <div className="from-ocean/70 via-ocean/20 absolute inset-0 bg-gradient-to-t to-transparent" />
      )}
      {children && <div className="absolute inset-0 flex items-end p-4">{children}</div>}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  as?: "h2" | "h3" | "h4";
  className?: string;
}

export function CardTitle({ children, as: Tag = "h3", className = "" }: CardTitleProps) {
  return <Tag className={`font-heading text-ocean mb-2 ${className}`}>{children}</Tag>;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = "" }: CardDescriptionProps) {
  return <p className={`text-gray-dark text-sm leading-relaxed ${className}`}>{children}</p>;
}

export default Card;
