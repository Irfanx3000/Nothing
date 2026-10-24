import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animationConfig } from "@/config/animations";

let registered = false;
/** Register plugins once, client-side only. */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Fade/slide-in for every [data-reveal] inside scope. */
export function revealChildren(scope: Element) {
  const els = scope.querySelectorAll<HTMLElement>("[data-reveal]");
  els.forEach((el) => {
    gsap.from(el, {
      y: animationConfig.revealDistance,
      autoAlpha: 0,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

/** Staggered line reveal for [data-line] spans (wrapped in overflow-hidden). */
export function revealLines(scope: Element, opts: { delay?: number; scroll?: boolean } = {}) {
  const lines = scope.querySelectorAll<HTMLElement>("[data-line]");
  if (!lines.length) return;
  gsap.from(lines, {
    yPercent: 110,
    duration: 1.1,
    ease: "power4.out",
    stagger: animationConfig.stagger * 1.5,
    delay: opts.delay ?? 0,
    ...(opts.scroll ? { scrollTrigger: { trigger: scope, start: "top 80%", once: true } } : {}),
  });
}

/** Image entrance: clip + slight scale. */
export function revealImages(scope: Element) {
  scope.querySelectorAll<HTMLElement>("[data-image-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(12% 8% 12% 8% round 24px)", scale: 1.06 },
      {
        clipPath: "inset(0% 0% 0% 0% round 24px)",
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
  });
}
