import { Code2, Layers, Sparkles, Terminal } from "lucide-react";
import type { TechIconKey } from "@/components/icons/tech-icons";

export interface ClientLogo {
  name: string;
  src: string;
  href?: string;
  /** width / height of the source asset, used to size it without distortion. */
  aspect: number;
}

// Only real, verified logos belong here — this feeds the "trusted by" strip,
// so anything shown here reads as an endorsement. The maritime illustration
// is project artwork, not a client, and must never be added to this list.
export const clients: ClientLogo[] = [
  { name: "Unstop Igniters Club", src: "/logos/unstop-igniters.svg", aspect: 585 / 426 },
  { name: "Springwala", src: "/logos/springwala.svg", aspect: 282 / 78 },
];

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// TODO: replace with real profile URLs before shipping.
export const SOCIAL_LINKS = {
  github: "#",
  linkedin: "#",
  email: "#",
};

export const heroConfig = {
  name: "Irfan Shaikh",
  availability: "Available for new projects",
  eyebrow: "SOFTWARE ENGINEERING & DIGITAL SOLUTIONS",
  tagline: {
    prefix: "Engineering",
    words: ["Digital Experiences", "SaaS Platforms", "AI Products", "Scalable Systems"],
    suffix: "Building what comes next.",
  },
  description:
    "I design and develop scalable digital products, intelligent software solutions, and technology experiences that help businesses move forward.",
  chips: [
    { label: "Web Development", icon: Code2 },
    { label: "Software Engineering", icon: Terminal },
    { label: "SaaS Platforms", icon: Layers },
    { label: "AI & Automation", icon: Sparkles },
  ],
  // Placeholder stats — edit with real numbers.
  stats: [
    { value: "20+", label: "Projects delivered" },
    { value: "3+", label: "Years building" },
    { value: "10+", label: "Happy clients" },
  ],
  ctas: {
    primary: { label: "Explore My Work", href: "#work" },
    secondary: { label: "Start a Conversation", href: "#contact" },
  },
  navCta: { label: "Let's talk", href: "#contact" },
  trustedByLabel: "Trusted by",
  // Placeholders — see deliverables notes for what to replace before shipping.
  showcase: {
    image: "/projects/featured-placeholder.svg",
    imageAlt: "Placeholder preview — replace with a real screenshot of the featured project",
    domain: "springwala.com",
    href: undefined as string | undefined,
    chips: [
      { label: "Next.js", icon: "nextjs" as TechIconKey },
      { label: "TypeScript", icon: "typescript" as TechIconKey },
      { label: "AI agents", icon: "ai" as TechIconKey },
    ],
    stat: { value: "98", label: "Lighthouse score" },
  },
};

export type HeroConfig = typeof heroConfig;
