/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

/**
 * Loading skeleton for marketing pages
 * Displays while page content is being loaded
 * Uses shimmer animation from design tokens
 */
export default function MarketingLoading() {
  return (
    <div className="bg-sand-50 min-h-screen">
      {/* Hero Skeleton */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        {/* Background shimmer */}
        <div className="from-ocean/5 to-sand-100 absolute inset-0 animate-pulse bg-gradient-to-br" />

        <div className="relative z-10 container px-4 py-20">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            {/* Badge skeleton */}
            <div className="inline-block">
              <div className="bg-sand-200 animate-shimmer h-8 w-48 rounded-full" />
            </div>

            {/* Title skeleton */}
            <div className="space-y-4">
              <div className="bg-sand-200 animate-shimmer mx-auto h-12 w-3/4 rounded-lg md:h-16" />
              <div className="bg-sand-200 animate-shimmer mx-auto h-12 w-1/2 rounded-lg md:h-16" />
            </div>

            {/* Subtitle skeleton */}
            <div className="mx-auto max-w-2xl space-y-2">
              <div className="bg-sand-200 animate-shimmer h-6 w-full rounded" />
              <div className="bg-sand-200 animate-shimmer mx-auto h-6 w-2/3 rounded" />
            </div>

            {/* CTA buttons skeleton */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="bg-sand-200 animate-shimmer h-14 w-40 rounded-xl" />
              <div className="bg-sand-200 animate-shimmer h-14 w-48 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="bg-white py-20">
        <div className="container px-4">
          {/* Section header */}
          <div className="mb-16 space-y-4 text-center">
            <div className="bg-sand-200 animate-shimmer mx-auto h-10 w-64 rounded-lg" />
            <div className="bg-sand-200 animate-shimmer mx-auto h-6 w-96 rounded" />
          </div>

          {/* Feature cards grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-sand-50 space-y-4 rounded-2xl p-6">
                {/* Icon placeholder */}
                <div className="bg-sand-200 animate-shimmer h-14 w-14 rounded-xl" />
                {/* Title */}
                <div className="bg-sand-200 animate-shimmer h-6 w-3/4 rounded" />
                {/* Description */}
                <div className="space-y-2">
                  <div className="bg-sand-200 animate-shimmer h-4 w-full rounded" />
                  <div className="bg-sand-200 animate-shimmer h-4 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section Skeleton */}
      <section className="bg-sand-50 py-20">
        <div className="container px-4">
          {/* Section header */}
          <div className="mb-16 space-y-4 text-center">
            <div className="bg-sand-200 animate-shimmer mx-auto h-10 w-72 rounded-lg" />
            <div className="bg-sand-200 animate-shimmer mx-auto h-6 w-80 rounded" />
          </div>

          {/* Testimonial cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
                {/* Avatar and name */}
                <div className="flex items-center gap-4">
                  <div className="bg-sand-200 animate-shimmer h-14 w-14 rounded-full" />
                  <div className="space-y-2">
                    <div className="bg-sand-200 animate-shimmer h-5 w-32 rounded" />
                    <div className="bg-sand-200 animate-shimmer h-4 w-24 rounded" />
                  </div>
                </div>
                {/* Quote */}
                <div className="space-y-2">
                  <div className="bg-sand-200 animate-shimmer h-4 w-full rounded" />
                  <div className="bg-sand-200 animate-shimmer h-4 w-full rounded" />
                  <div className="bg-sand-200 animate-shimmer h-4 w-3/4 rounded" />
                </div>
                {/* Stars */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="bg-sand-200 animate-shimmer h-5 w-5 rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="bg-ocean py-20">
        <div className="container space-y-6 px-4 text-center">
          <div className="animate-shimmer mx-auto h-10 w-64 rounded-lg bg-white/20" />
          <div className="animate-shimmer mx-auto h-6 w-96 rounded bg-white/20" />
          <div className="animate-shimmer mx-auto h-14 w-48 rounded-xl bg-white/20" />
        </div>
      </section>
    </div>
  );
}
