/**
 * Shared radius + surface classes so the rounding system stays consistent
 * across the hero card, buttons, and logo tiles instead of each component
 * picking its own values.
 */

export const RADIUS = {
  card: "rounded-3xl",
  tile: "rounded-2xl",
  image: "rounded-xl",
  pill: "rounded-full",
} as const;

export const CARD_SURFACE =
  "border border-black/5 bg-white/80 backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]";
