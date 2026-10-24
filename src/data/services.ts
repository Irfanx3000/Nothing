import type { Service } from "@/types/content";

// `project` picks the example image from data/projects.ts (shown labelled as an example).
export const services: Service[] = [
  {
    id: "web",
    title: "Web Development",
    description: "Business websites, e-commerce platforms, landing pages, and modern web applications.",
    project: "springwala",
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    description: "Mobile experiences and applications designed around real user needs and business workflows.",
    project: "unstop-igniters",
  },
  {
    id: "automation",
    title: "Automation & Integrations",
    description: "Workflow automation, API integrations, messaging workflows, and repetitive-task reduction.",
    project: "vehicle-speed-detection",
  },
  {
    id: "custom",
    title: "Custom Software",
    description: "Dashboards, internal business tools, CRM-style applications, and tailored software solutions.",
    project: "crewapply",
  },
];
