"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

const LenisContext = createContext<{ current: Lenis | null }>({ current: null });

/**
 * Returns the live Lenis instance (read at call time, e.g. inside a click
 * handler) — null under reduced motion or before mount. A ref, not state,
 * since nothing needs to re-render when the instance appears.
 */
export function useLenis() {
  return useContext(LenisContext).current;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ autoRaf: true });
    lenisRef.current = instance;
    return () => {
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}

export default LenisProvider;
