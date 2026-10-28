export const animationConfig = {
  ease: "power3.out",
  duration: 1,
  stagger: 0.08,
  revealDistance: 40,
  // Media queries used with gsap.matchMedia
  // Must match the `hscroll` variant in styles.css (CSS and JS switch modes together)
  // Below 450px tall (landscape phones) a card + navbar cannot fit, so the track stays a swipe row
  hscroll: "(min-height: 450px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
  // Start/end of the band where a section becomes "active" for backgrounds
  themeStart: "top 55%",
  themeEnd: "bottom 55%",
};
