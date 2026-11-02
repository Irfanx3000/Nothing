"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";
import { heroConfig, NAV_LINKS } from "./config/hero";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

const COLLAPSED_WIDTH = 176;
const OPEN_DELAY = 80;
const CLOSE_DELAY = 300;
const INTRO_OPEN_AT = 700; // roughly when the entrance drop-in settles
const INTRO_DURATION = 2500;
const CTA_DELAY = 0.15 + NAV_LINKS.length * 0.04;

export function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const isTouch = useMediaQuery("(hover: none)");

  const [hoverOpen, setHoverOpen] = React.useState(false);
  const [focusWithin, setFocusWithin] = React.useState(false);
  const [introOpen, setIntroOpen] = React.useState(false);
  const [expandedWidth, setExpandedWidth] = React.useState(640);

  const openTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isPointerOverRef = React.useRef(false);

  const contentRef = React.useRef<HTMLDivElement>(null);
  const brandRef = React.useRef<HTMLAnchorElement>(null);

  const isOpen = !isTouch && (hoverOpen || focusWithin || introOpen);

  // Brief intro hint, once, so first-time visitors learn the pill expands.
  React.useEffect(() => {
    if (shouldReduceMotion || isTouch) return;
    const openTimer = setTimeout(() => setIntroOpen(true), INTRO_OPEN_AT);
    const closeTimer = setTimeout(() => setIntroOpen(false), INTRO_OPEN_AT + INTRO_DURATION);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, [shouldReduceMotion, isTouch]);

  // Measured-width approach (see deliverables notes for why, vs the grid 0fr→1fr trick).
  React.useEffect(() => {
    const measure = () => {
      if (contentRef.current) setExpandedWidth(contentRef.current.scrollWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (isTouch) return;
    isPointerOverRef.current = true;
    clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => setHoverOpen(true), OPEN_DELAY);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    isPointerOverRef.current = false;
    clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => setHoverOpen(false), CLOSE_DELAY);
  };

  const handleFocus = () => setFocusWithin(true);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setFocusWithin(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setHoverOpen(false);
      setFocusWithin(false);
      setIntroOpen(false);
      brandRef.current?.focus();
    }
  };

  // Collapse after a link click, unless the pointer is still hovering the pill.
  const handleNavigate = () => {
    if (!isPointerOverRef.current) {
      setHoverOpen(false);
      setFocusWithin(false);
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, ease: "easeOut", delay: 0.1 }}
        className="pointer-events-auto relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {/* Hit area slightly larger than the visible pill so edges don't flicker. */}
        <div className="absolute -inset-3" aria-hidden="true" />

        <motion.nav
          aria-label="Primary"
          animate={{ width: isTouch ? "auto" : isOpen ? expandedWidth : COLLAPSED_WIDTH }}
          transition={shouldReduceMotion ? { duration: 0.15 } : { type: "spring", stiffness: 260, damping: 28 }}
          className={cn(
            "navbar-glass relative flex h-12 items-center overflow-hidden rounded-full",
            "border border-white/60 ring-1 ring-black/5 backdrop-blur-xl backdrop-saturate-150",
            "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.7)]",
            isOpen && "navbar-glass-open"
          )}
        >
          <div ref={contentRef} className="flex min-w-max items-center gap-1 px-2 whitespace-nowrap">
            <Link
              ref={brandRef}
              href="/"
              aria-expanded={isTouch ? undefined : isOpen}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-serif text-sm font-semibold text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none"
            >
              {heroConfig.name}
              {!isTouch && (
                <ChevronDown
                  className={cn("size-3 text-neutral-400 transition-transform duration-300", isOpen && "rotate-180")}
                  aria-hidden="true"
                />
              )}
            </Link>

            {isTouch ? (
              <MobileNav />
            ) : (
              <div className="flex items-center gap-1 pl-1">
                <NavLinks links={NAV_LINKS} isOpen={isOpen} onNavigate={handleNavigate} />
                <motion.a
                  href={heroConfig.navCta.href}
                  tabIndex={isOpen ? 0 : -1}
                  aria-hidden={!isOpen}
                  onClick={handleNavigate}
                  initial={false}
                  animate={
                    shouldReduceMotion
                      ? { opacity: isOpen ? 1 : 0 }
                      : { opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -6 }
                  }
                  transition={
                    isOpen
                      ? { duration: 0.2, delay: shouldReduceMotion ? 0 : CTA_DELAY, ease: "easeOut" }
                      : { duration: 0.1, ease: "easeIn" }
                  }
                  className="group ml-1 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-1.5 text-sm text-white transition-colors hover:bg-black focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none"
                >
                  {heroConfig.navCta.label}
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </motion.a>
              </div>
            )}
          </div>
        </motion.nav>
      </motion.div>
    </header>
  );
}

export default Navbar;
