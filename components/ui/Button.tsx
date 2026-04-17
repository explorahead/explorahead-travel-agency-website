/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef, ReactNode, useMemo } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-ocean text-white
    hover:bg-ocean-light
    active:bg-ocean-dark
    shadow-md hover:shadow-lg
  `,
  secondary: `
    bg-sand text-ocean
    hover:bg-sand-dark
    active:bg-sand
  `,
  outline: `
    bg-transparent text-ocean
    border-2 border-ocean
    hover:bg-ocean hover:text-white
  `,
  ghost: `
    bg-transparent text-ocean
    hover:bg-sand-light
  `,
  gold: `
    bg-gold text-ocean-dark
    hover:bg-gold-dark
    active:bg-gold
    shadow-md hover:shadow-gold
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm h-[40px]",
  md: "px-6 py-3 text-base h-[48px]",
  lg: "px-8 py-4 text-lg h-[40px] w-[250px]",
};

// Helper function to extract text content from ReactNode
function getTextContent(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (node && typeof node === "object") {
    const nodeObj = node as { props?: { children?: ReactNode } };
    if (nodeObj.props?.children) {
      return getTextContent(nodeObj.props.children);
    }
  }
  return "";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Calculate text length and padding percentage
    const textContent = useMemo(() => {
      if (isLoading) return "Loading...";
      return getTextContent(children);
    }, [children, isLoading]);

    const textLength = textContent.length;

    // Calculate padding as percentage of text length
    // Base padding + (textLength * percentage multiplier)
    // Using 8% of text length for horizontal padding
    const paddingPercentage = Math.max(0.08, Math.min(0.15, textLength * 0.008)); // 8-15% range
    const horizontalPadding = Math.round(textLength * paddingPercentage);
    const verticalPadding = Math.round(horizontalPadding * 0.4); // Vertical is 40% of horizontal

    // Calculate padding values based on text length percentage
    const dynamicPadding = useMemo(() => {
      // Horizontal padding: 10% of text length (minimum 12px, maximum 40px)
      const pxValue = Math.max(12, Math.min(40, Math.round(textLength * 0.1)));
      // Vertical padding: 40% of horizontal padding (minimum 6px, maximum 16px)
      const pyValue = Math.max(6, Math.min(16, Math.round(pxValue * 0.4)));

      return { pxValue, pyValue };
    }, [textLength]);

    const baseStyles = `
      flex items-center justify-center gap-2
      font-medium rounded-[20px]
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      whitespace-nowrap
      box-border
      ${fullWidth ? "w-full" : ""}
    `;

    // Get base size classes without padding
    const sizeClasses = sizes[size].replace(/px-[\d\[\]]+|py-[\d\[\].]+/g, "").trim();

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizeClasses} ${className}`}
        style={{
          paddingLeft: `${dynamicPadding.pxValue}px`,
          paddingRight: `${dynamicPadding.pxValue}px`,
          paddingTop: `${dynamicPadding.pyValue}px`,
          paddingBottom: `${dynamicPadding.pyValue}px`,
        }}
        disabled={disabled || isLoading}
        {...(props as HTMLMotionProps<"button">)}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

function LoadingSpinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default Button;
