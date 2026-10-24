import { useLayoutEffect, useEffect, useRef } from "react";
import type { gsap as GsapType } from "gsap";
import { getGsap } from "@/components/animations/gsapUtils";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs setup inside a scoped gsap.matchMedia so every tween/ScrollTrigger
 * created is reverted on unmount (safe under StrictMode double-mount).
 * Setup receives the matchMedia instance to add per-breakpoint logic.
 */
export function useGsapScope<T extends HTMLElement>(
  setup: (scope: T, mm: gsap.MatchMedia, g: typeof GsapType) => void,
) {
  const ref = useRef<T>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia(el);
    setup(el, mm, gsap);
    return () => mm.revert();
    // setup intentionally runs once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}
