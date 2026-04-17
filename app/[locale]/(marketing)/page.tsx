/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

import { Hero } from "@/components/marketing/Hero";
import { FeaturedDestinations } from "@/components/marketing/FeaturedDestinations";
import { ServicesPreview } from "@/components/marketing/ServicesPreview";
import { WhyChooseUs } from "@/components/marketing/WhyChooseUs";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Testimonials } from "@/components/marketing/Testimonials";
import { isFeatureEnabled } from "@/config/features";

export default function HomePage() {
  return (
    <>
      <Hero />
      {isFeatureEnabled("destinations") && <FeaturedDestinations />}
      <ServicesPreview />
      <WhyChooseUs />
      <HowItWorks />
      {isFeatureEnabled("testimonials") && <Testimonials />}
    </>
  );
}
