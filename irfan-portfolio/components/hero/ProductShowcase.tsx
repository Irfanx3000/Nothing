"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { heroConfig } from "./config/hero";
import { TECH_ICONS } from "@/components/icons/tech-icons";
import { FloatingChip } from "./FloatingChip";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

const { showcase } = heroConfig;

interface AccessoryProps {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  /** px amplitude of cursor parallax for this accessory (14–20). */
  depth: number;
  floatDelay: number;
  entranceDelay: number;
  className: string;
  children: React.ReactNode;
}

/** Its own useTransform call per instance — keeps hook usage valid outside .map(). */
function Accessory({ springX, springY, depth, floatDelay, entranceDelay, className, children }: AccessoryProps) {
  const shouldReduceMotion = useReducedMotion();
  const x = useTransform(springX, (v) => v * depth);
  const y = useTransform(springY, (v) => v * depth);

  return (
    <motion.div
      className={cn("absolute", className)}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: entranceDelay, ease: "easeOut" }}
      aria-hidden="true"
    >
      <motion.div
        animate={shouldReduceMotion ? { y: 0 } : { y: [0, -6, 0] }}
        transition={{ duration: 5 + floatDelay, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function ProductShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTouch = useMediaQuery("(pointer: coarse)");
  const canParallax = !shouldReduceMotion && !isTouch;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });

  React.useEffect(() => {
    if (!canParallax) return;
    const handlePointerMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [canParallax, mx, my]);

  const windowX = useTransform(springX, (v) => v * 8);
  const windowY = useTransform(springY, (v) => v * 8);

  const [chip1, chip2, chip3] = showcase.chips;
  const statIcon = TECH_ICONS.ai;

  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
      {/* Cursor parallax layer */}
      <motion.div style={{ x: windowX, y: windowY }}>
        {/* Idle float layer */}
        <motion.div
          animate={shouldReduceMotion ? { y: 0 } : { y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Tilt + hover-straighten layer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: isDesktop && !shouldReduceMotion ? 2 : 0,
            }}
            whileHover={isDesktop ? { rotate: 0 } : undefined}
            transition={{
              opacity: { duration: 0.6, delay: 0.3, ease: "easeOut" },
              scale: { duration: 0.6, delay: 0.3, ease: "easeOut" },
              rotate: { type: "spring", stiffness: 220, damping: 22 },
            }}
            className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_rgba(0,0,0,0.10)]"
          >
            <div className="flex h-10 items-center gap-1.5 border-b border-black/5 px-4">
              <span className="size-2.5 rounded-full bg-neutral-300" />
              <span className="size-2.5 rounded-full bg-neutral-300" />
              <span className="size-2.5 rounded-full bg-neutral-300" />
              <span className="ml-3 truncate rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
                {showcase.domain}
              </span>
            </div>

            {showcase.href ? (
              <a
                href={showcase.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[16/10] w-full"
              >
                <Image
                  src={showcase.image}
                  alt={showcase.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-top"
                />
              </a>
            ) : (
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={showcase.image}
                  alt={showcase.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Tech chips: collide at smaller widths, so they only show from xl up. */}
      {chip1 && (
        <Accessory
          springX={springX}
          springY={springY}
          depth={16}
          floatDelay={0.2}
          entranceDelay={0.55}
          className="-top-5 -left-6 hidden xl:block"
        >
          <FloatingChip icon={React.createElement(TECH_ICONS[chip1.icon], { className: "size-4" })} label={chip1.label} />
        </Accessory>
      )}
      {chip2 && (
        <Accessory
          springX={springX}
          springY={springY}
          depth={20}
          floatDelay={0.6}
          entranceDelay={0.7}
          className="top-1/3 -right-8 hidden xl:block"
        >
          <FloatingChip icon={React.createElement(TECH_ICONS[chip2.icon], { className: "size-4" })} label={chip2.label} />
        </Accessory>
      )}
      {chip3 && (
        <Accessory
          springX={springX}
          springY={springY}
          depth={14}
          floatDelay={1}
          entranceDelay={0.85}
          className="bottom-10 -left-8 hidden xl:block"
        >
          <FloatingChip icon={React.createElement(TECH_ICONS[chip3.icon], { className: "size-4" })} label={chip3.label} />
        </Accessory>
      )}

      {/* Stat card: the one accessory kept visible below lg, per spec. */}
      <Accessory
        springX={springX}
        springY={springY}
        depth={18}
        floatDelay={0.4}
        entranceDelay={1}
        className="-bottom-4 right-3 lg:-bottom-6 lg:right-6"
      >
        <FloatingChip
          icon={React.createElement(statIcon, { className: "size-4 text-neutral-400" })}
          value={showcase.stat.value}
          label={showcase.stat.label}
        />
      </Accessory>
    </div>
  );
}

export default ProductShowcase;
