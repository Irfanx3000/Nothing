"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "motion/react";

export type CarouselDirection = 1 | -1;

interface UseCarouselOptions {
  count: number;
  autoplayMs: number;
}

interface UseCarouselReturn {
  index: number;
  direction: CarouselDirection;
  /** Manual play/pause toggle state — drives the pause/play button icon. */
  isPlaying: boolean;
  /** Effective pause (manual OR hover OR focus OR tab-hidden OR out-of-view) — drives the progress bar and aria-live. */
  isPaused: boolean;
  next: () => void;
  prev: () => void;
  goTo: (i: number) => void;
  togglePlay: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  regionProps: {
    onPointerEnter: () => void;
    onPointerLeave: () => void;
    onFocus: () => void;
    onBlur: (e: React.FocusEvent<HTMLDivElement>) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
}

export function useCarousel({ count, autoplayMs }: UseCarouselOptions): UseCarouselReturn {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<CarouselDirection>(1);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [tabHidden, setTabHidden] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);

  React.useEffect(() => {
    const onVisibilityChange = () => setTabHidden(document.visibilityState !== "visible");
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const autoplayEnabled = !shouldReduceMotion && isPlaying && count > 1;
  const isPaused = !autoplayEnabled || hovered || focused || tabHidden || !isInView;

  const goTo = React.useCallback(
    (i: number) => {
      setIndex((prev) => {
        const normalized = ((i % count) + count) % count;
        setDirection(normalized === prev ? 1 : normalized > prev ? 1 : -1);
        return normalized;
      });
      setResetKey((k) => k + 1);
    },
    [count]
  );

  const next = React.useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = React.useCallback(() => goTo(index - 1), [goTo, index]);
  const togglePlay = React.useCallback(() => setIsPlaying((p) => !p), []);

  // Autoplay always advances forward; manual reset via resetKey on any interaction.
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % count);
    }, autoplayMs);
    return () => clearTimeout(timer);
  }, [index, isPaused, autoplayMs, count, resetKey]);

  const regionProps = React.useMemo(
    () => ({
      onPointerEnter: () => setHovered(true),
      onPointerLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        }
      },
    }),
    [next, prev]
  );

  return { index, direction, isPlaying, isPaused, next, prev, goTo, togglePlay, containerRef, regionProps };
}

export default useCarousel;
