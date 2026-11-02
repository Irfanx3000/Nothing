"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import type { ShowcaseProject } from "./config/hero";
import { cn } from "@/lib/utils";

interface ShowcaseControlsProps {
  projects: ShowcaseProject[];
  index: number;
  isPlaying: boolean;
  isPaused: boolean;
  autoplayMs: number;
  onGoTo: (i: number) => void;
  onTogglePlay: () => void;
  canAutoplay: boolean;
  className?: string;
}

export function ShowcaseControls({
  projects,
  index,
  isPlaying,
  isPaused,
  autoplayMs,
  onGoTo,
  onTogglePlay,
  canAutoplay,
  className,
}: ShowcaseControlsProps) {
  const shouldReduceMotion = useReducedMotion();
  const active = projects[index];

  return (
    <div className={cn("mt-4 flex items-center justify-between gap-4", className)}>
      <div className="flex items-baseline gap-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={active.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.12 }}
            className="font-serif text-sm font-semibold text-neutral-900"
          >
            {active.name}
          </motion.span>
        </AnimatePresence>
        <span className="font-mono text-xs text-neutral-400">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {canAutoplay && (
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause projects" : "Play projects"}
            className="flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none"
          >
            {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>
        )}

        <div className="flex items-center gap-0.5">
          {projects.map((project, i) => {
            const isActive = i === index;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => onGoTo(i)}
                aria-label={`Show ${project.name}`}
                aria-current={isActive ? "true" : undefined}
                className="flex h-8 min-w-8 items-center justify-center rounded-full px-1 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "relative overflow-hidden rounded-full bg-neutral-900/15 transition-[width] duration-300",
                    isActive ? "h-1.5 w-6" : "h-1.5 w-1.5"
                  )}
                >
                  {isActive &&
                    (canAutoplay && !shouldReduceMotion ? (
                      <span
                        className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-neutral-900"
                        style={{
                          animationName: "carousel-progress",
                          animationDuration: `${autoplayMs}ms`,
                          animationTimingFunction: "linear",
                          animationFillMode: "forwards",
                          animationPlayState: isPaused ? "paused" : "running",
                        }}
                      />
                    ) : (
                      <span className="absolute inset-0 rounded-full bg-neutral-900" />
                    ))}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShowcaseControls;
