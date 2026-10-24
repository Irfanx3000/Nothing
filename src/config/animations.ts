export const animationConfig = {
  ease: "power3.out",
  duration: 1,
  stagger: 0.08,
  revealDistance: 40,
  // Media queries used with gsap.matchMedia
  // Must match the `hscroll` variant in styles.css (CSS and JS switch modes together)
  desktop: "(min-width: 1024px) and (min-height: 500px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
  // Service panels stack (sticky); must match the `stack` variant in styles.css
  stack: "(min-width: 1024px) and (min-height: 500px)",
  // Start/end of the band where a section becomes "active" for backgrounds
  themeStart: "top 55%",
  themeEnd: "bottom 55%",
};
