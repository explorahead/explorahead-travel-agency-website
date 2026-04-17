/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { AnimatePresence, motion, useInView, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

// Swipe threshold for navigation (in pixels)
const SWIPE_THRESHOLD = 50;

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Honeymoon Trip",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Our honeymoon to the Maldives was absolutely perfect. Every detail was taken care of, from the private sunset dinner on the beach to the spa treatments. ExplorAhead made our dream come true!",
    destination: "Maldives",
  },
  {
    id: 2,
    name: "James & Emily Cooper",
    role: "Family Vacation",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Traveling with three kids seemed daunting, but the team made it seamless. The itinerary was perfectly balanced between adventure and relaxation. Can't wait to book our next trip!",
    destination: "Costa Rica",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Solo Adventure",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    text: "As a solo traveler, safety and unique experiences were my priorities. The AI assistant helped me discover hidden gems in Japan that I would have never found on my own. Truly exceptional service!",
    destination: "Japan",
  },
  {
    id: 4,
    name: "Alexandra Petrova",
    role: "Luxury Getaway",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    text: "The attention to detail was impeccable. From the private villa in Santorini to the yacht excursion, every moment felt like a scene from a movie. Worth every penny!",
    destination: "Greece",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Swipe gesture handler
  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info;

      // Check if swipe exceeds threshold or has enough velocity
      if (offset.x < -SWIPE_THRESHOLD || velocity.x < -500) {
        next();
      } else if (offset.x > SWIPE_THRESHOLD || velocity.x > 500) {
        prev();
      }
    },
    [next, prev]
  );

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="section bg-ocean overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="section-badge">Testimonials</span>
          <h2 className="mb-4 text-white">Stories From Our Travelers</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 -left-4 opacity-20 md:-left-8">
              <Quote size={80} className="text-gold" />
            </div>

            {/* Testimonial Content with Swipe Support */}
            <motion.div
              className="touch-pan-y"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="bg-ocean-light/50 rounded-3xl p-8 backdrop-blur-sm md:p-12"
                >
                  {/* Rating */}
                  <div className="mb-6 flex gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-gold fill-gold" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="mb-8 text-lg leading-relaxed font-light text-white/90 italic md:text-xl">
                    &ldquo;{currentTestimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16">
                      <Image
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                        fill
                        className="border-gold rounded-full border-2 object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-white/60">
                        {currentTestimonial.role} • {currentTestimonial.destination}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Swipe Hint (mobile only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 flex justify-center md:hidden"
            >
              <p className="flex items-center gap-2 text-xs text-white/40">
                <ChevronLeft size={12} />
                Swipe to navigate
                <ChevronRight size={12} />
              </p>
            </motion.div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="hover:bg-gold hover:text-ocean rounded-full bg-white/10 p-3 text-white transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-gold w-8" : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="hover:bg-gold hover:text-ocean rounded-full bg-white/10 p-3 text-white transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
