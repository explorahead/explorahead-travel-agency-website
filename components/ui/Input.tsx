/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="text-ocean mb-2 block text-sm font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="text-gray pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`border-gray-lighter text-charcoal placeholder:text-gray focus:border-gold focus:ring-gold/20 disabled:bg-sand-light w-full rounded-lg border bg-white !py-3 transition-all duration-200 focus:ring-2 focus:outline-none disabled:cursor-not-allowed ${leftIcon ? "!pl-[3.25rem]" : "!pl-6"} ${rightIcon ? "!pr-[3.25rem]" : "!pr-6"} ${error ? "border-terracotta focus:border-terracotta focus:ring-terracotta/20" : ""} ${className} `}
            {...props}
          />
          {rightIcon && (
            <div className="text-gray pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-terracotta mt-1 text-sm">{error}</p>}
        {hint && !error && <p className="text-gray mt-1 text-sm">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="text-ocean mb-2 block text-sm font-medium">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`border-gray-lighter text-charcoal placeholder:text-gray focus:border-gold focus:ring-gold/20 disabled:bg-sand-light min-h-[120px] w-full resize-y rounded-lg border bg-white !px-6 !py-3 transition-all duration-200 focus:ring-2 focus:outline-none disabled:cursor-not-allowed ${error ? "border-terracotta focus:border-terracotta focus:ring-terracotta/20" : ""} ${className} `}
          {...props}
        />
        {error && <p className="text-terracotta mt-1 text-sm">{error}</p>}
        {hint && !error && <p className="text-gray mt-1 text-sm">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, className = "", id, ...props }, ref) => {
    const selectId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="text-ocean mb-2 block text-sm font-medium">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`border-gray-lighter text-charcoal focus:border-gold focus:ring-gold/20 disabled:bg-sand-light w-full cursor-pointer appearance-none rounded-lg border bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%231A365D%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.7em] bg-[right_1.25rem_center] bg-no-repeat !px-6 !py-3 transition-all duration-200 focus:ring-2 focus:outline-none disabled:cursor-not-allowed ${error ? "border-terracotta focus:border-terracotta focus:ring-terracotta/20" : ""} ${className} `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-terracotta mt-1 text-sm">{error}</p>}
        {hint && !error && <p className="text-gray mt-1 text-sm">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Input;
