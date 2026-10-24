import type { Project } from "@/types/content";
import springwala from "@/assets/project-springwala.jpg";
import crewapply from "@/assets/project-crewapply.jpg";
import speed from "@/assets/project-speed.jpg";
import igniters from "@/assets/project-igniters.jpg";

// Placeholder entries — swap images, copy and links once approved.
export const projects: Project[] = [
  {
    slug: "springwala",
    name: "Springwala",
    category: "E-commerce Platform",
    description: "Storefront, catalogue and checkout flow for a direct-to-consumer brand.",
    year: "2025",
    image: springwala,
    imageAlt: "Springwala storefront shown on a laptop and phone",
  },
  {
    slug: "crewapply",
    name: "CrewApply",
    category: "Recruitment Platform",
    description: "Candidate pipeline and application tracking for hiring teams.",
    year: "2025",
    image: crewapply,
    imageAlt: "CrewApply candidate dashboard on a desktop monitor",
  },
  {
    slug: "vehicle-speed-detection",
    name: "Vehicle Speed Detection",
    category: "Computer Vision",
    description: "Detection and speed estimation of vehicles from roadside video.",
    year: "2024",
    image: speed,
    imageAlt: "Highway footage with vehicle bounding boxes and speed labels",
  },
  {
    slug: "unstop-igniters",
    name: "Unstop Igniters Club",
    category: "Events Platform",
    description: "Event discovery and registration hub for a student community.",
    year: "2024",
    image: igniters,
    imageAlt: "Events platform interface on a tablet next to event tickets",
  },
];
