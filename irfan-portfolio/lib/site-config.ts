/**
 * Central site configuration for the software engineering & digital solutions hero.
 * All verified brand inputs, copy, and CTA destinations are maintained here.
 */

export const siteConfig = {
  name: "Irfan Shaikh",
  eyebrow: "SOFTWARE ENGINEERING & DIGITAL SOLUTIONS",
  role: "Full-Stack Web Developer & Software Engineer",
  tagline: "Engineering Digital Experiences. Building What Comes Next.",
  description:
    "We design and develop scalable digital products, intelligent software solutions, and technology experiences that help businesses move forward.",
  services: [
    "Web Development",
    "Software Engineering",
    "SaaS Platforms",
    "AI & Automation",
  ] as const,
  ctas: {
    primary: {
      label: "Explore Our Work",
      href: "#work",
    },
    secondary: {
      label: "Start a Conversation",
      href: "#contact",
    },
  },
  seo: {
    title: "Irfan Shaikh | Software Engineering & Digital Solutions",
    description:
      "We design and develop scalable digital products, intelligent software solutions, and technology experiences that help businesses move forward.",
  },
};

export type SiteConfig = typeof siteConfig;
