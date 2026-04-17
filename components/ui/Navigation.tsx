/**
 * Copyright (c) 2024-2026 ExplorAhead. All rights reserved.
 * This file is part of proprietary software. See LICENSE for terms.
 */

"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getNavPages } from "@/config/pages";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

export function Navigation() {
  const t = useTranslations("navigation");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Get published navigation pages from config
  const publishedNavPages = getNavPages();

  // Map page config to nav links with translations
  const navLinks = publishedNavPages.map((page) => ({
    href: page.slug === "" ? "/" : `/${page.slug}`,
    label: t(page.slug === "" ? "home" : page.slug),
  }));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes - this is an intentional response to
  // navigation events (user clicking a link), not an unnecessary effect
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: responding to route change
      setIsMobileMenuOpen(false);
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  const isHomePage = pathname === "/";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 right-0 left-0 z-[var(--z-sticky)] transition-all duration-300 ${
          isScrolled || !isHomePage ? "bg-white/95 shadow-md backdrop-blur-md" : "bg-transparent"
        } `}
      >
        <nav className="container-wide">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex min-w-0 flex-shrink-0 items-center">
              <Logo
                width={160}
                height={36}
                variant={isScrolled || !isHomePage ? "default" : "white"}
                className="h-auto w-[120px] transition-opacity group-hover:opacity-80 sm:w-[140px] md:w-[160px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-medium transition-colors ${
                    isScrolled || !isHomePage
                      ? "text-ocean hover:text-gold"
                      : "text-white/90 hover:text-white"
                  } ${pathname === link.href ? "font-semibold" : ""} `}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute right-0 -bottom-1 left-0 h-0.5 rounded-full ${isScrolled || !isHomePage ? "bg-gold" : "bg-white"} `}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="hidden items-center gap-2 md:flex">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`rounded-lg p-2 transition-colors md:hidden ${
                isScrolled || !isHomePage
                  ? "text-ocean hover:bg-sand-light"
                  : "text-white hover:bg-white/10"
              } `}
              aria-label={t("toggleMenu")}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-[var(--z-dropdown)] md:hidden"
          >
            <div className="border-gray-lighter border-t bg-white shadow-xl">
              <div className="container py-6">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-lg px-4 py-3 font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-sand text-ocean"
                          : "text-ocean hover:bg-sand-light"
                      } `}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="border-gray-lighter my-2" />
                  <div>
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
