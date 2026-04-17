/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal, ModalBody } from "@/components/ui/Modal";
import { isFeatureEnabled } from "@/config/features";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, DollarSign, MapPin, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const regions = ["All", "Europe", "Asia", "Americas", "Africa", "Oceania"];
const travelStyles = ["All", "Adventure", "Romantic", "Cultural", "Luxury", "Beach", "Wildlife"];
const priceRanges = ["All", "Budget", "Mid-Range", "Luxury", "Ultra-Luxury"];

const destinations = [
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1935&auto=format&fit=crop",
    price: "$2,499",
    priceCategory: "Mid-Range",
    duration: "7 days",
    style: ["Romantic", "Beach", "Cultural"],
    description:
      "Iconic white-washed buildings cascading down volcanic cliffs, spectacular sunsets, and crystal-clear waters.",
    highlights: ["Sunset in Oia", "Wine tasting", "Volcano tour", "Beach hopping"],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
    price: "$1,899",
    priceCategory: "Mid-Range",
    duration: "10 days",
    style: ["Adventure", "Cultural", "Beach"],
    description:
      "Lush rice terraces, ancient temples, vibrant culture, and world-class surfing await in this tropical paradise.",
    highlights: ["Ubud temples", "Rice terraces", "Surfing lessons", "Spa retreats"],
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "South Asia",
    region: "Asia",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
    price: "$3,299",
    priceCategory: "Luxury",
    duration: "7 days",
    style: ["Luxury", "Romantic", "Beach"],
    description:
      "Overwater bungalows, pristine beaches, and underwater wonderlands in the ultimate tropical escape.",
    highlights: ["Overwater villa", "Snorkeling", "Private dining", "Sunset cruise"],
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    price: "$2,199",
    priceCategory: "Mid-Range",
    duration: "8 days",
    style: ["Cultural", "Adventure"],
    description:
      "Ancient temples, traditional tea houses, stunning gardens, and the essence of Japanese culture.",
    highlights: ["Fushimi Inari", "Geisha district", "Tea ceremony", "Bamboo grove"],
  },
  {
    id: "amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=2070&auto=format&fit=crop",
    price: "$2,799",
    priceCategory: "Luxury",
    duration: "7 days",
    style: ["Romantic", "Cultural", "Beach"],
    description:
      "Dramatic cliffs, colorful villages, and la dolce vita along Italy's most stunning coastline.",
    highlights: ["Positano", "Limoncello tasting", "Boat tours", "Italian cuisine"],
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1974&auto=format&fit=crop",
    price: "$1,599",
    priceCategory: "Budget",
    duration: "5 days",
    style: ["Cultural", "Adventure"],
    description:
      "Vibrant souks, stunning riads, and the magic of the medina await in this enchanting city.",
    highlights: ["Jemaa el-Fnaa", "Riads", "Souks shopping", "Desert excursion"],
  },
  {
    id: "patagonia",
    name: "Patagonia",
    country: "Argentina/Chile",
    region: "Americas",
    image:
      "https://images.unsplash.com/photo-1531761535209-180857e963b9?q=80&w=1974&auto=format&fit=crop",
    price: "$3,999",
    priceCategory: "Luxury",
    duration: "12 days",
    style: ["Adventure", "Wildlife"],
    description:
      "Dramatic glaciers, towering peaks, and pristine wilderness at the end of the world.",
    highlights: ["Torres del Paine", "Perito Moreno", "Hiking", "Wildlife spotting"],
  },
  {
    id: "safari",
    name: "Serengeti",
    country: "Tanzania",
    region: "Africa",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2070&auto=format&fit=crop",
    price: "$4,499",
    priceCategory: "Ultra-Luxury",
    duration: "10 days",
    style: ["Wildlife", "Adventure", "Luxury"],
    description:
      "Witness the great migration and encounter Africa's most iconic wildlife on an unforgettable safari.",
    highlights: ["Big Five", "Great Migration", "Luxury camps", "Hot air balloon"],
  },
  {
    id: "newzealand",
    name: "New Zealand",
    country: "New Zealand",
    region: "Oceania",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?q=80&w=2076&auto=format&fit=crop",
    price: "$3,299",
    priceCategory: "Luxury",
    duration: "14 days",
    style: ["Adventure", "Wildlife"],
    description:
      "From fjords to volcanoes, experience Middle-earth's breathtaking landscapes and adventure sports.",
    highlights: ["Milford Sound", "Hobbiton", "Bungee jumping", "Glowworm caves"],
  },
];

type Destination = (typeof destinations)[0];

export default function DestinationsPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isFeatureEnabled("destinations")) {
      router.replace("/");
    }
  }, [router]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Don't render if feature is disabled
  if (!isFeatureEnabled("destinations")) {
    return null;
  }

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "All" || dest.region === selectedRegion;
    const matchesStyle = selectedStyle === "All" || dest.style.includes(selectedStyle);
    const matchesPrice = selectedPrice === "All" || dest.priceCategory === selectedPrice;

    return matchesSearch && matchesRegion && matchesStyle && matchesPrice;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedRegion("All");
    setSelectedStyle("All");
    setSelectedPrice("All");
  };

  const hasActiveFilters =
    searchQuery || selectedRegion !== "All" || selectedStyle !== "All" || selectedPrice !== "All";

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2031&auto=format&fit=crop"
            alt="World map"
            className="h-full w-full object-cover"
          />
          <div className="bg-ocean/80 absolute inset-0" />
        </div>

        <div className="relative z-10 container text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gold/20 border-gold/30 text-gold mb-6 inline-block rounded-full border px-6 py-2.5 text-sm font-medium tracking-wider uppercase backdrop-blur-sm"
          >
            Explore the World
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading mb-6 text-4xl md:text-5xl lg:text-6xl"
            style={{ color: "#d4a574" }}
          >
            Our Destinations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-white/80 md:text-xl"
          >
            From sun-kissed beaches to snow-capped mountains, discover handpicked destinations that
            promise unforgettable experiences.
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-gray-lighter sticky top-20 z-30 border-b bg-white shadow-sm">
        <div className="container py-4">
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="w-full lg:w-64">
              <Input
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={18} />}
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-1 flex-wrap gap-2">
              {/* Region Filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray text-sm font-medium">Region:</span>
                <div className="flex flex-wrap gap-1">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`h-[30px] rounded-[20px] px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-out ${
                        selectedRegion === region
                          ? "bg-ocean text-white"
                          : "bg-sand-light text-ocean hover:bg-sand"
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-terracotta hover:text-terracotta-light flex items-center gap-1 text-sm transition-colors"
              >
                <X size={16} />
                Clear filters
              </button>
            )}
          </div>

          {/* Additional Filters Row */}
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray text-sm font-medium">Style:</span>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="bg-sand-light text-ocean focus:ring-gold rounded-lg border-none px-3 py-1.5 text-sm focus:ring-2"
              >
                {travelStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray text-sm font-medium">Budget:</span>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="bg-sand-light text-ocean focus:ring-gold rounded-lg border-none px-3 py-1.5 text-sm focus:ring-2"
              >
                {priceRanges.map((price) => (
                  <option key={price} value={price}>
                    {price}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section bg-sand-light">
        <div className="container">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-dark">
              Showing{" "}
              <span className="text-ocean font-semibold">{filteredDestinations.length}</span>{" "}
              destinations
            </p>
          </div>

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedDestination(destination)}
                >
                  <div className="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="from-ocean/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

                      {/* Tags */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {destination.style.slice(0, 2).map((style) => (
                          <span
                            key={style}
                            className="text-ocean rounded-full bg-white/90 px-5 py-2.5 text-xs font-medium"
                          >
                            {style}
                          </span>
                        ))}
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-gold text-ocean-dark rounded-full px-6 py-2.5 text-sm font-semibold">
                          {destination.price}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="font-heading text-ocean text-xl">{destination.name}</h3>
                          <p className="text-gray flex items-center gap-1">
                            <MapPin size={14} />
                            {destination.country}
                          </p>
                        </div>
                        <div className="text-gray text-right text-sm">
                          <Calendar size={14} className="mr-1 inline" />
                          {destination.duration}
                        </div>
                      </div>

                      <p className="text-gray-dark mb-4 line-clamp-2 text-sm">
                        {destination.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-gray text-sm">{destination.priceCategory}</span>
                        <span className="text-gold group-hover:text-ocean flex items-center gap-1 font-medium transition-colors">
                          View Details
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results */}
          {filteredDestinations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <p className="text-gray-dark mb-4 text-xl">No destinations found</p>
              <p className="text-gray mb-6">Try adjusting your filters or search query</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-ocean">
        <div className="container text-center">
          <h2 className="mb-4 text-white">Can&apos;t Find What You&apos;re Looking For?</h2>
          <p className="mx-auto mb-8 max-w-xl text-white/80">
            Our AI Travel Specialist can help you discover hidden gems and create a custom itinerary
            just for you.
          </p>
          <Link href="/chat">
            <Button variant="gold" size="lg" rightIcon={<ArrowRight size={20} />}>
              Chat With Our AI
            </Button>
          </Link>
        </div>
      </section>

      {/* Destination Modal */}
      <Modal
        isOpen={!!selectedDestination}
        onClose={() => setSelectedDestination(null)}
        title={selectedDestination?.name}
        size="lg"
      >
        {selectedDestination && (
          <ModalBody className="p-0">
            <img
              src={selectedDestination.image}
              alt={selectedDestination.name}
              className="h-64 w-full object-cover"
            />
            <div className="p-6">
              <div className="text-gray mb-4 flex items-center gap-2">
                <MapPin size={16} />
                <span>{selectedDestination.country}</span>
                <span className="mx-2">•</span>
                <Calendar size={16} />
                <span>{selectedDestination.duration}</span>
                <span className="mx-2">•</span>
                <DollarSign size={16} />
                <span>{selectedDestination.price}</span>
              </div>

              <p className="text-gray-dark mb-6">{selectedDestination.description}</p>

              <h4 className="font-heading text-ocean mb-3">Highlights</h4>
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedDestination.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="bg-sand-light text-ocean rounded-full px-5 py-2 text-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <Link href="/chat" className="flex-1">
                  <Button variant="gold" fullWidth>
                    Plan This Trip
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button variant="outline" fullWidth>
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>
          </ModalBody>
        )}
      </Modal>
    </>
  );
}
