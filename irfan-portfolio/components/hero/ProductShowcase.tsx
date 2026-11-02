"use client";

import * as React from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type PanInfo,
  type Variants,
} from "motion/react";
import { Code2 } from "lucide-react";
import { heroConfig, type ShowcaseTech } from "./config/hero";
import { techIcons } from "@/components/icons/tech";
import { FloatingChip } from "./FloatingChip";
import { ProjectPlaceholder } from "./ProjectPlaceholder";
import { ShowcaseControls } from "./ShowcaseControls";
import { useCarousel } from "./useCarousel";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

const { projects, autoplayMs } = heroConfig.showcase;

const DRAG_THRESHOLD_PX = 60;
const DRAG_VELOCITY = 400;
const CLICK_SUPPRESS_PX = 8;

interface AccessoryProps {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  /** px amplitude of cursor parallax for this slot (14–20). */
  depth: number;
  floatDelay: number;
  entranceDelay: number;
  className: string;
  children: React.ReactNode;
}

/**
 * Persistent per-slot wrapper: owns the float + parallax motion so it never
 * resets when the chip inside it swaps between slides. Its own useTransform
 * call (not inside a .map callback) keeps hook usage valid.
 */
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

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, transition: { duration: 0.12, ease: "easeIn" } },
  visible: (slotDelay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 22, delay: slotDelay },
  }),
};

const reducedChipVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  visible: { opacity: 1, transition: { duration: 0.1 } },
};

/** Content that swaps inside a persistent Accessory slot on slide change. */
function SlotChip({ tech, slotIndex }: { tech: ShowcaseTech; slotIndex: number }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = techIcons[tech.id] ?? Code2;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={tech.id + tech.label}
        custom={slotIndex * 0.06}
        variants={shouldReduceMotion ? reducedChipVariants : chipVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <FloatingChip icon={<Icon className="size-4" />} label={tech.label} />
      </motion.div>
    </AnimatePresence>
  );
}

export function ProductShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTouch = useMediaQuery("(pointer: coarse)");
  const canParallax = !shouldReduceMotion && !isTouch;
  const canAutoplay = !shouldReduceMotion && projects.length > 1;

  const { index, isPlaying, isPaused, next, prev, goTo, togglePlay, containerRef, regionProps } = useCarousel({
    count: projects.length,
    autoplayMs,
  });

  const activeProject = projects[index];
  const dragDistanceRef = React.useRef(0);

  // Cursor parallax
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

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    dragDistanceRef.current = Math.abs(info.offset.x);
    if (info.offset.x <= -DRAG_THRESHOLD_PX || info.velocity.x <= -DRAG_VELOCITY) {
      next();
    } else if (info.offset.x >= DRAG_THRESHOLD_PX || info.velocity.x >= DRAG_VELOCITY) {
      prev();
    }
  };

  const handleWindowClick = (e: React.MouseEvent) => {
    if (dragDistanceRef.current > CLICK_SUPPRESS_PX) {
      e.preventDefault();
    }
    dragDistanceRef.current = 0;
  };

  const windowShell = (
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
      className="relative block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_rgba(0,0,0,0.10)] will-change-transform"
    >
      {/* Exactly one top bar: 3 dots + URL pill. */}
      <div className="flex h-10 items-center gap-1.5 border-b border-black/5 px-4">
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="size-2.5 rounded-full bg-neutral-300" />
        <span className="ml-3 min-w-[9rem] overflow-hidden rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={activeProject.domain}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.12 }}
              className="block truncate"
            >
              {activeProject.domain}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      {/* Screenshot area — no chrome of its own, stacked slides, no mount/unmount flash. */}
      <motion.div
        drag={isTouch ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ touchAction: "pan-y" }}
        className="relative aspect-[16/10] w-full overflow-hidden"
      >
        {projects.map((project, i) => {
          const isActive = i === index;
          const count = projects.length;
          let diff = i - index;
          if (diff > count / 2) diff -= count;
          else if (diff < -count / 2) diff += count;
          const sign = diff === 0 ? 0 : diff > 0 ? 1 : -1;

          return (
            <motion.div
              key={project.id}
              className="absolute inset-0"
              initial={false}
              animate={
                shouldReduceMotion
                  ? { opacity: isActive ? 1 : 0 }
                  : { opacity: isActive ? 1 : 0, x: sign * 24, scale: isActive ? 1 : 1.02 }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${project.name}`}
              aria-hidden={!isActive}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-top"
                />
              ) : (
                <ProjectPlaceholder name={project.name} domain={project.domain} />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={-1}
      className="relative mx-auto w-full max-w-[560px] lg:mx-0"
      {...regionProps}
    >
      {/* Cursor parallax layer */}
      <motion.div style={{ x: windowX, y: windowY }}>
        {/* Idle float layer */}
        <motion.div
          animate={shouldReduceMotion ? { y: 0 } : { y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {activeProject.href ? (
            <a
              href={activeProject.href}
              target="_blank"
              rel="noopener noreferrer"
              onClickCapture={handleWindowClick}
              aria-label={`Open ${activeProject.name} (opens in a new tab)`}
            >
              {windowShell}
            </a>
          ) : (
            windowShell
          )}
        </motion.div>
      </motion.div>

      {/* Announces slide changes only when autoplay isn't actively running. */}
      <div aria-live={isPaused ? "polite" : "off"} className="sr-only">
        {`Showing ${index + 1} of ${projects.length}: ${activeProject.name}`}
      </div>

      {/* Slot 0 — top-left, visible at every size */}
      <Accessory springX={springX} springY={springY} depth={16} floatDelay={0.2} entranceDelay={0.55} className="-top-5 -left-6">
        {activeProject.tech[0] && <SlotChip tech={activeProject.tech[0]} slotIndex={0} />}
      </Accessory>

      {/* Slot 1 — right-middle, from lg up */}
      <Accessory
        springX={springX}
        springY={springY}
        depth={20}
        floatDelay={0.6}
        entranceDelay={0.7}
        className="top-1/3 -right-8 hidden lg:block"
      >
        {activeProject.tech[1] && <SlotChip tech={activeProject.tech[1]} slotIndex={1} />}
      </Accessory>

      {/* Slot 2 — bottom-left, from xl up */}
      <Accessory
        springX={springX}
        springY={springY}
        depth={14}
        floatDelay={1}
        entranceDelay={0.85}
        className="bottom-8 -left-8 hidden xl:block"
      >
        {activeProject.tech[2] && <SlotChip tech={activeProject.tech[2]} slotIndex={2} />}
      </Accessory>

      {/* Slot 3 — bottom-right, from xl up */}
      <Accessory
        springX={springX}
        springY={springY}
        depth={18}
        floatDelay={0.4}
        entranceDelay={1}
        className="-bottom-4 right-3 hidden xl:block"
      >
        {activeProject.tech[3] && <SlotChip tech={activeProject.tech[3]} slotIndex={3} />}
      </Accessory>

      <ShowcaseControls
        projects={projects}
        index={index}
        isPlaying={isPlaying}
        isPaused={isPaused}
        autoplayMs={autoplayMs}
        onGoTo={goTo}
        onTogglePlay={togglePlay}
        canAutoplay={canAutoplay}
      />
    </div>
  );
}

export default ProductShowcase;
