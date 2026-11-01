"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { HeroActions } from "./HeroActions";
import { cn } from "@/lib/utils";

interface HeroContentProps {
  className?: string;
}

export function HeroContent({ className }: HeroContentProps) {
  const shouldReduceMotion = useReducedMotion();

  // Staggered entrance timeline container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemFadeUpVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemFadeVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex flex-col items-center justify-center space-y-3 sm:space-y-4 md:space-y-5 text-center",
        className
      )}
    >
      {/* 1. Eyebrow */}
      <motion.p
        variants={itemFadeUpVariants}
        className="font-mono text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider sm:tracking-widest uppercase text-neutral-500 select-none"
      >
        {siteConfig.eyebrow}
      </motion.p>

      {/* 2. Business Name - H1 */}
      <motion.h1
        variants={itemFadeUpVariants}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#171717] leading-[1.08] select-none"
      >
        {siteConfig.name}
      </motion.h1>

      {/* 3. Main Tagline */}
      <motion.p
        variants={itemFadeUpVariants}
        className="text-sm sm:text-base md:text-lg font-medium text-neutral-800 leading-snug max-w-lg"
      >
        {siteConfig.tagline}
      </motion.p>

      {/* 4. Supporting Description (max 2 lines on desktop) */}
      <motion.p
        variants={itemFadeVariants}
        className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed max-w-xl mx-auto px-2"
      >
        {siteConfig.description}
      </motion.p>

      {/* 5. Service Indicators */}
      <motion.div
        variants={itemFadeVariants}
        className="text-[11px] sm:text-xs md:text-sm text-neutral-500 font-medium tracking-tight sm:tracking-normal px-2"
      >
        <span>{siteConfig.services.join(" · ")}</span>
      </motion.div>

      {/* 6. CTA Buttons */}
      <HeroActions />
    </motion.div>
  );
}

export default HeroContent;
