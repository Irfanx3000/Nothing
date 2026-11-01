"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface HeroActionsProps {
  className?: string;
}

export function HeroActions({ className }: HeroActionsProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      className={cn(
        "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2",
        className
      )}
    >
      <Button
        asChild
        size="lg"
        className={cn(
          "h-10 sm:h-11 px-5 sm:px-6 rounded-xl font-medium text-xs sm:text-sm text-white",
          "bg-[#171717] hover:bg-black hover:shadow-md",
          "transition-all duration-200 active:scale-[0.98]",
          "focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
          "group w-full sm:w-auto"
        )}
      >
        <a
          href={siteConfig.ctas.primary.href}
          aria-label={siteConfig.ctas.primary.label}
        >
          <span>{siteConfig.ctas.primary.label}</span>
          <ArrowRight className="size-3.5 sm:size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </Button>

      <Button
        asChild
        variant="outline"
        size="lg"
        className={cn(
          "h-10 sm:h-11 px-5 sm:px-6 rounded-xl font-medium text-xs sm:text-sm text-[#171717]",
          "border border-neutral-300/80 bg-white/30 hover:bg-white/60 hover:border-neutral-400",
          "backdrop-blur-sm transition-all duration-200 active:scale-[0.98]",
          "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
          "w-full sm:w-auto"
        )}
      >
        <a
          href={siteConfig.ctas.secondary.href}
          aria-label={siteConfig.ctas.secondary.label}
        >
          <span>{siteConfig.ctas.secondary.label}</span>
        </a>
      </Button>
    </motion.div>
  );
}

export default HeroActions;
