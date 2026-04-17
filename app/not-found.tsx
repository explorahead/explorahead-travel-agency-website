/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { Home, MapPin, Search } from "lucide-react";
import Link from "next/link";

/**
 * Global 404 Not Found Page
 * Displayed when a route doesn't match any page
 */
export default function NotFound() {
  return (
    <div className="bg-sand-50 flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Lost Traveler Icon */}
        <div className="bg-ocean/10 relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
          <MapPin className="text-ocean h-12 w-12" />
          <div className="bg-terracotta absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full">
            <span className="text-sm font-bold text-white">?</span>
          </div>
        </div>

        {/* 404 Number */}
        <div className="font-heading text-ocean/20 mb-2 text-8xl font-bold">404</div>

        {/* Message */}
        <h1 className="font-heading text-ocean mb-3 text-2xl font-bold">Page Not Found</h1>
        <p className="text-sand-600 mb-8">
          Looks like you&apos;ve ventured off the beaten path! The page you&apos;re looking for
          doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="bg-ocean hover:bg-ocean-600 focus:ring-ocean inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/en/contact"
            className="bg-sand-100 text-sand-700 hover:bg-sand-200 focus:ring-sand-400 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <Search className="h-4 w-4" />
            Contact Us
          </Link>
        </div>

        {/* Suggestions */}
        <div className="border-sand-200 mt-12 border-t pt-8">
          <p className="text-sand-500 mb-4 text-sm">You might be interested in:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/en" className="text-ocean hover:text-ocean-600 text-sm hover:underline">
              Home
            </Link>
            <span className="text-sand-300">•</span>
            <Link
              href="/en/about"
              className="text-ocean hover:text-ocean-600 text-sm hover:underline"
            >
              About Us
            </Link>
            <span className="text-sand-300">•</span>
            <Link
              href="/en/contact"
              className="text-ocean hover:text-ocean-600 text-sm hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
