import { useEffect } from "react";
import { getGsap } from "./gsapUtils";
import { animationConfig } from "@/config/animations";

/**
 * Single owner of the page background. Watches every [data-theme] section
 * and sets <html data-theme>; CSS transitions handle the color blend.
 * Using one trigger per section with toggle callbacks avoids competing tweens.
 */
export function BackgroundTransitions() {
  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-theme], footer[data-theme]"));
    const set = (t?: string) => t && root.dataset["theme"] !== t && (root.dataset["theme"] = t);
    const triggers = sections.map((s) =>
      ScrollTrigger.create({
        trigger: s,
        start: animationConfig.themeStart,
        end: animationConfig.themeEnd,
        onToggle: (self) => self.isActive && set(s.dataset["theme"]),
      }),
    );
    set(sections.find((s) => ScrollTrigger.isInViewport(s, 0.45))?.dataset["theme"] ?? "cream");
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    // Web fonts change headline heights, which shifts every trigger below them
    document.fonts?.ready.then(refresh);
    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener("load", refresh);
      delete root.dataset["theme"];
    };
  }, []);
  return null;
}
