// Central background map. Each section sets data-theme={sectionThemes.x};
// BackgroundTransitions reads these and swaps <html data-theme>.
export type SectionTheme = "cream" | "charcoal" | "moss" | "sand" | "clay";

export const sectionThemes = {
  hero: "cream",
  projects: "charcoal",
  services: "sand",
  about: "moss",
  contact: "cream",
  footer: "charcoal",
} satisfies Record<string, SectionTheme>;

// Service panel colors, cycled by index (scoped via [data-panel] in styles.css).
export const servicePanelThemes: SectionTheme[] = ["cream", "moss", "charcoal", "clay"];
