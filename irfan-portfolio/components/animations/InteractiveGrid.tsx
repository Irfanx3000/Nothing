"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Deterministic pseudo-random number generator (Mulberry32).
 * Ensures identical results on server and client to prevent hydration mismatches.
 */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getCellConfig(index: number) {
  const rng = mulberry32(index * 1664525 + 1013904223);
  const r1 = rng();
  const r2 = rng();
  const r3 = rng();

  // A sparse, slow pulse — most cells stay completely static.
  const isAnimated = r1 < 0.12;
  const duration = (4 + r2 * 3).toFixed(2);
  const delay = (0.2 + r3 * 6).toFixed(2);

  return { isAnimated, duration, delay };
}

const DEFAULT_COLS = 32;
const DEFAULT_ROWS = 20;

// Trailing cursor glow: fast + tight, lagging + soft, slowest + widest.
const TRAIL_DOTS = [
  { duration: 0.25, size: 160, opacity: 0.09, blur: 24 },
  { duration: 0.5, size: 260, opacity: 0.06, blur: 36 },
  { duration: 0.85, size: 380, opacity: 0.04, blur: 52 },
];

export function InteractiveGrid() {
  const [dimensions, setDimensions] = useState({ cols: DEFAULT_COLS, rows: DEFAULT_ROWS });
  const [isVisible, setIsVisible] = useState(true);
  const isTouch = useMediaQuery("(pointer: coarse)");
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateDimensions = () => {
      const mobile = window.innerWidth <= 768;
      const cellSize = mobile ? 40 : 60;
      const cols = Math.min(Math.ceil(window.innerWidth / cellSize), 80);
      const rows = Math.min(Math.ceil(window.innerHeight / cellSize), 50);
      setDimensions({ cols, rows });
    };

    updateDimensions();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensions, 150);
    };
    const handleVisibilityChange = () => setIsVisible(document.visibilityState === "visible");

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimer);
    };
  }, []);

  useGSAP(
    () => {
      if (shouldReduceMotion || isTouch) return;

      const setters = TRAIL_DOTS.map((dot, i) => {
        const el = dotRefs.current[i];
        if (!el) return null;
        gsap.set(el, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });
        return {
          x: gsap.quickTo(el, "x", { duration: dot.duration, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: dot.duration, ease: "power3" }),
        };
      });

      const onMove = (e: PointerEvent) => {
        setters.forEach((setter) => {
          setter?.x(e.clientX);
          setter?.y(e.clientY);
        });
      };

      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: containerRef, dependencies: [shouldReduceMotion, isTouch] }
  );

  const totalCells = dimensions.cols * dimensions.rows;
  const cellConfigs = useMemo(() => {
    const list = new Array(totalCells);
    for (let i = 0; i < totalCells; i++) list[i] = getCellConfig(i);
    return list;
  }, [totalCells]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
      data-visible={isVisible}
    >
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${dimensions.cols}, var(--grid-cell-size))`,
          gridTemplateRows: `repeat(${dimensions.rows}, var(--grid-cell-size))`,
        }}
      >
        {cellConfigs.map((config, index) => (
          <div key={index} className="grid-cell">
            {config.isAnimated && (
              <div
                className="grid-cell-illuminate absolute inset-0 bg-[var(--cell-active-bg)]"
                style={
                  {
                    "--cell-duration": `${config.duration}s`,
                    "--cell-delay": `${config.delay}s`,
                  } as React.CSSProperties
                }
              />
            )}
          </div>
        ))}
      </div>

      {!shouldReduceMotion &&
        !isTouch &&
        TRAIL_DOTS.map((dot, i) => (
          <div
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            className="absolute top-0 left-0 rounded-full"
            style={{
              width: dot.size,
              height: dot.size,
              filter: `blur(${dot.blur}px)`,
              background: `radial-gradient(circle, rgba(0,0,0,${dot.opacity}), transparent 70%)`,
              willChange: "transform",
            }}
          />
        ))}
    </div>
  );
}

export default InteractiveGrid;
