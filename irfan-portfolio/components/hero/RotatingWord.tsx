"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface RotatingWordProps {
  words: string[];
  interval?: number;
  className?: string;
  /**
   * Appended inside each word's own span, not after the grid container.
   * Grid items size to the widest word's track but don't stretch to fill
   * it, so trailing punctuation placed outside the component would sit
   * after an invisible gap for every shorter word. Baking it into the
   * span keeps it flush against the visible glyphs.
   */
  suffix?: string;
}

/**
 * All words are grid-stacked in the same cell, so the container's
 * intrinsic width is the widest word and swapping the active one never
 * reflows surrounding text. Purely decorative (aria-hidden) — the caller
 * is expected to render a static sr-only sentence alongside it.
 */
export function RotatingWord({ words, interval = 2500, className, suffix = "" }: RotatingWordProps) {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (shouldReduceMotion || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, shouldReduceMotion]);

  return (
    <span className="relative inline-grid align-baseline text-left" aria-live="off" aria-hidden="true">
      {words.map((word, i) => (
        <motion.span
          key={word}
          className={cn("[grid-area:1/1] justify-self-start whitespace-nowrap", className)}
          initial={false}
          animate={
            shouldReduceMotion
              ? { opacity: i === 0 ? 1 : 0 }
              : { opacity: i === index ? 1 : 0, y: i === index ? 0 : i < index ? -12 : 12 }
          }
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {word}
          {suffix}
        </motion.span>
      ))}
    </span>
  );
}

export default RotatingWord;
