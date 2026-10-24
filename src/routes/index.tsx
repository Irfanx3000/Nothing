import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AnimationSection } from "@/components/sections/AnimationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BackgroundTransitions } from "@/components/animations/BackgroundTransitions";
import { siteConfig } from "@/config/site";

const title = `${siteConfig.name} — Websites, Apps & Custom Software`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: title },
      { property: "og:description", content: siteConfig.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: siteConfig.url ? [{ rel: "canonical", href: siteConfig.url }] : [],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: siteConfig.name,
        description: siteConfig.description,
        email: siteConfig.email,
        ...(siteConfig.url ? { url: siteConfig.url } : {}),
      }),
    }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-page-fg focus:px-4 focus:py-2 focus:text-page">Skip to content</a>
      <Navbar />
      <main id="main">
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <AnimationSection />
        <ContactSection />
      </main>
      <Footer />
      <BackgroundTransitions />
    </>
  );
}
