"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, ChevronDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductShowcase } from "./ProductShowcase";
import { LogoStrip } from "./LogoStrip";
import { RotatingWord } from "./RotatingWord";
import { heroConfig, clients, SOCIAL_LINKS } from "./config/hero";
import { RADIUS } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

function GithubGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.4 7.86 10.94.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.75.39-1.25.71-1.54-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.18-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.44-2.71 5.42-5.28 5.7.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const scrollCueRef = React.useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (shouldReduceMotion || !scrollCueRef.current) return;
      const tween = gsap.to(scrollCueRef.current, {
        y: 6,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      return () => tween.kill();
    },
    { dependencies: [shouldReduceMotion] }
  );

  return (
    <section
      aria-label="Hero Section"
      className="relative flex w-full flex-col justify-center overflow-hidden px-4 py-16 sm:px-6 md:px-8 lg:min-h-[calc(100svh-4rem)]"
    >
      {/* Soft contrast fade behind the text column only — not a card. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[65%] bg-[radial-gradient(ellipse_80%_70%_at_30%_40%,rgba(255,255,255,0.8),transparent_70%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[55%_45%]">
        {/* Left column — copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start space-y-3 text-left sm:space-y-4 md:space-y-5"
        >
          <motion.div
            variants={itemUp}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-neutral-600"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {heroConfig.availability}
          </motion.div>

          <motion.p
            variants={itemUp}
            className="font-mono text-[10px] font-semibold tracking-wider text-neutral-500 uppercase select-none sm:text-xs md:text-sm sm:tracking-widest"
          >
            {heroConfig.eyebrow}
          </motion.p>

          <motion.h1
            variants={itemUp}
            className="font-serif text-5xl font-semibold tracking-tight text-[#171717] leading-[1.05] select-none md:text-6xl xl:text-7xl"
          >
            {heroConfig.name}
          </motion.h1>

          <motion.p
            variants={itemUp}
            className="max-w-lg text-base font-medium text-neutral-800 leading-snug sm:text-lg md:text-xl"
          >
            {heroConfig.tagline.prefix}{" "}
            <RotatingWord words={heroConfig.tagline.words} suffix="." className="font-semibold text-[#171717]" />
            <br className="hidden sm:inline" /> {heroConfig.tagline.suffix}
            <span className="sr-only">
              {" "}
              {heroConfig.tagline.prefix} {heroConfig.tagline.words[0]}. {heroConfig.tagline.suffix}
            </span>
          </motion.p>

          <motion.p variants={itemUp} className="max-w-xl text-[17px] text-neutral-600 leading-relaxed md:text-lg">
            {heroConfig.description}
          </motion.p>

          <motion.div variants={itemUp} className="flex flex-wrap items-center gap-2">
            {heroConfig.chips.map((chip) => {
              const Icon = chip.icon;
              return (
                <span
                  key={chip.label}
                  className={cn(
                    RADIUS.pill,
                    "inline-flex items-center gap-1.5 border border-black/5 bg-white/60 px-3 py-1.5 text-sm font-medium text-neutral-700"
                  )}
                >
                  <Icon className="size-3.5 text-neutral-500" />
                  {chip.label}
                </span>
              );
            })}
          </motion.div>

          <motion.div variants={itemUp} className="flex items-center gap-6 pt-1 sm:gap-10">
            {heroConfig.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-start">
                <span className="text-xl font-semibold tracking-tight text-[#171717] sm:text-2xl">
                  {stat.value}
                </span>
                <span className="text-xs text-neutral-500">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemUp} className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:gap-4">
            <Button
              asChild
              size="lg"
              className={cn(
                RADIUS.pill,
                "group h-11 w-full px-6 text-sm font-medium text-white bg-[#171717] sm:w-auto",
                "transition-all duration-200 hover:bg-black hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.18)]",
                "active:translate-y-0"
              )}
            >
              <a href={heroConfig.ctas.primary.href}>
                <span>{heroConfig.ctas.primary.label}</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                RADIUS.pill,
                "h-11 w-full border border-neutral-300/80 bg-white/30 px-6 text-sm font-medium text-[#171717] sm:w-auto",
                "transition-all duration-200 hover:border-neutral-500 hover:bg-white/70"
              )}
            >
              <a href={heroConfig.ctas.secondary.href}>{heroConfig.ctas.secondary.label}</a>
            </Button>
          </motion.div>

          <motion.div variants={itemUp} className="pt-6">
            <LogoStrip logos={clients} label={heroConfig.trustedByLabel} />
          </motion.div>

          <motion.div variants={itemUp} className="flex items-center gap-3 pt-2">
            <a
              href={SOCIAL_LINKS.github}
              aria-label="GitHub"
              className="flex size-9 items-center justify-center rounded-full border border-black/5 text-neutral-500 transition-colors hover:bg-white/60 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none"
            >
              <GithubGlyph className="size-4" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border border-black/5 text-neutral-500 transition-colors hover:bg-white/60 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none"
            >
              <LinkedinGlyph className="size-4" />
            </a>
            <a
              href={SOCIAL_LINKS.email}
              aria-label="Email"
              className="flex size-9 items-center justify-center rounded-full border border-black/5 text-neutral-500 transition-colors hover:bg-white/60 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none"
            >
              <Mail className="size-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — product prop */}
        <div className="flex justify-center lg:justify-end">
          <ProductShowcase />
        </div>
      </div>

      <button
        ref={scrollCueRef}
        type="button"
        aria-label="Scroll down"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full p-1 text-neutral-400 transition-colors hover:text-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none lg:block"
      >
        <ChevronDown className="size-5" />
      </button>
    </section>
  );
}

export default Hero;
