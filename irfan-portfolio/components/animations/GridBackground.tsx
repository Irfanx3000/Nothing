"use client";

import React, { useEffect, useMemo, useState } from "react";

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

/**
 * Generate stable cell configuration (whether it animates, duration, delay)
 * derived purely from the cell's unique index.
 */
function getCellConfig(index: number) {
  const rng = mulberry32(index * 1664525 + 1013904223);
  const r1 = rng();
  const r2 = rng();
  const r3 = rng();

  // ~35% of cells illuminate; the remaining ~65% remain completely static
  const isAnimated = r1 < 0.35;

  // Animation duration between 2.0s and 4.0s (smooth breathing pace)
  const duration = (2.0 + r2 * 2.0).toFixed(2);

  // Staggered delay up to 5s for organic, continuous breathing
  const delay = (0.1 + r3 * 4.9).toFixed(2);

  return { isAnimated, duration, delay };
}

// Default columns and rows for SSR and initial hydration
const DEFAULT_COLS = 32;
const DEFAULT_ROWS = 20;

export function GridBackground() {
  const [dimensions, setDimensions] = useState({
    cols: DEFAULT_COLS,
    rows: DEFAULT_ROWS,
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth <= 768;
      const cellSize = isMobile ? 40 : 60;
      // Cap at 80 cols and 50 rows for safety on extreme resolution displays
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

    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimer);
    };
  }, []);

  const totalCells = dimensions.cols * dimensions.rows;

  const cellConfigs = useMemo(() => {
    const list = new Array(totalCells);
    for (let i = 0; i < totalCells; i++) {
      list[i] = getCellConfig(i);
    }
    return list;
  }, [totalCells]);

  return (
    <div
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
    </div>
  );
}

export default GridBackground;
