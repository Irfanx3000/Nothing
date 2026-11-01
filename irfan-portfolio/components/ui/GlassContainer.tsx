"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface GlassContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function GlassContainer({
  children,
  className,
  ...props
}: GlassContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              y: [0, -6, 0],
            }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0.3 }
          : {
              opacity: { duration: 0.8, ease: "easeOut" },
              y: {
                duration: 6,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
            }
      }
      className={cn(
        "relative mx-auto w-[92%] max-w-[720px] sm:w-[88%] md:w-full",
        "rounded-2xl sm:rounded-3xl",
        "border border-white/60",
        "p-6 sm:p-8 md:px-10 md:py-9",
        "text-center",
        // Ambient glass shadow and subtle inner highlight for realistic glass depth
        "shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08),0_1px_1px_0_rgba(255,255,255,0.8)_inset,0_0_0_1px_rgba(255,255,255,0.2)_inset]",
        className
      )}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.16)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
      {...props}
    >
      {/* Subtle top edge gradient reflection line */}
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent"
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}

export default GlassContainer;
