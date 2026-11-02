import { Code2, Layers, Sparkles, Terminal } from "lucide-react";

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

export interface NavLink {
  label: string;
  href: string;
  id: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Services", href: "#services", id: "services" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

// TODO: replace with real profile URLs before shipping.
export const SOCIAL_LINKS = {
  github: "#",
  linkedin: "#",
  email: "#",
};

export type TechId =
  | "react"
  | "nodejs"
  | "express"
  | "mongodb"
  | "supabase"
  | "html"
  | "css"
  | "javascript";

export interface ShowcaseTech {
  id: TechId;
  label: string;
}

export interface ShowcaseProject {
  id: string;
  name: string;
  domain: string; // text shown in the URL pill
  href?: string; // live site; verify before shipping
  image?: string; // e.g. "/projects/crewapply.webp"; leave undefined until added
  imageAlt: string;
  tech: ShowcaseTech[]; // exactly 4 items
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "crewapply",
    name: "Crewapply",
    domain: "crewapply.com",
    href: "https://crewapply.com",
    imageAlt: "Crewapply product screenshot",
    tech: [
      { id: "react", label: "React Native" },
      { id: "nodejs", label: "Node.js" },
      { id: "express", label: "Express" },
      { id: "mongodb", label: "MongoDB" },
    ],
  },
  {
    id: "springwala-web",
    name: "Springwala",
    domain: "springwala.in",
    href: "https://springwala.in",
    imageAlt: "Springwala product screenshot",
    tech: [
      { id: "html", label: "HTML" },
      { id: "css", label: "CSS" },
      { id: "javascript", label: "JavaScript" },
      { id: "mongodb", label: "MongoDB" },
    ],
  },
  {
    id: "unstop-web",
    name: "Unstop Web",
    domain: "igniters.aiktc.ac.in",
    href: "https://igniters.aiktc.ac.in",
    imageAlt: "Unstop Web product screenshot",
    tech: [
      { id: "react", label: "React" },
      { id: "nodejs", label: "Node.js" },
      { id: "express", label: "Express" },
      { id: "supabase", label: "Supabase" },
    ],
  },
];

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
  showcase: {
    autoplayMs: 5000,
    projects: SHOWCASE_PROJECTS,
  },
};

export type HeroConfig = typeof heroConfig;
