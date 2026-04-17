/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { Footer } from "@/components/ui/Footer";
import { Navigation } from "@/components/ui/Navigation";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";

// Enable Edge Runtime for faster global TTFB (sub-50ms worldwide)
// Edge runs in Vercel's global network, closer to users
export const runtime = "edge";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div className="h-20" aria-hidden="true" />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
