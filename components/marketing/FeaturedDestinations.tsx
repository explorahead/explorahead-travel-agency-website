/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { Button } from "@/components/ui/Button";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const destinations = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1935&auto=format&fit=crop",
    price: "From $2,499",
    tag: "Romantic",
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
    price: "From $1,899",
    tag: "Adventure",
  },
  {
    id: 3,
    name: "Maldives",
    country: "South Asia",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
    price: "From $3,299",
    tag: "Luxury",
  },
  {
    id: 4,
    name: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    price: "From $2,199",
    tag: "Cultural",
  },
  {
    id: 5,
    name: "Amalfi Coast",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=2070&auto=format&fit=crop",
    price: "From $2,799",
    tag: "Scenic",
  },
  {
    id: 6,
    name: "Marrakech",
    country: "Morocco",
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1974&auto=format&fit=crop",
    price: "From $1,599",
    tag: "Exotic",
  },
];

export function FeaturedDestinations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 400;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={sectionRef} className="section bg-sand-light overflow-hidden">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="section-badge">Featured Destinations</span>
            <h2 className="text-ocean mb-4">Explore Our Top Picks</h2>
            <p className="card-description max-w-xl">
              Hand-selected destinations that promise unforgettable experiences. From tropical
              paradises to cultural treasures.
            </p>
          </div>
          <div className="mt-6 flex gap-3 md:mt-0">
            <button
              onClick={() => scroll("left")}
              className="hover:bg-ocean rounded-full bg-white p-3 shadow-md transition-all hover:text-white hover:shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hover:bg-ocean rounded-full bg-white p-3 shadow-md transition-all hover:text-white hover:shadow-lg"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        {/* Destinations Carousel */}
        <div
          ref={containerRef}
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-[320px] flex-shrink-0 snap-start md:w-[380px]"
            >
              <Link href={`/destinations/${destination.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 320px, 380px"
                    loading="lazy"
                  />
                  <div className="from-ocean/80 via-ocean/20 absolute inset-0 bg-gradient-to-t to-transparent" />

                  {/* Tag */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-gold text-ocean-dark rounded-full px-6 py-2.5 text-sm font-medium">
                      {destination.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute right-2 bottom-0 left-6 pt-6 pr-6 pb-10 pl-8">
                    <p className="mb-1 text-sm text-white/70">{destination.country}</p>
                    <h3 className="font-heading mb-2 text-2xl text-white">{destination.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="bg-gold/20 text-gold rounded-full px-5 py-2.5 text-sm font-semibold">
                        {destination.price}
                      </span>
                      <span className="group-hover:bg-gold group-hover:text-ocean flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all">
                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <Link href="/destinations">
            <Button variant="outline" rightIcon={<ArrowRight size={18} />}>
              View All Destinations
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedDestinations;
