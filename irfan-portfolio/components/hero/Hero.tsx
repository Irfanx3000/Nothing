import * as React from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { HeroContent } from "./HeroContent";

export function Hero() {
  return (
    <section
      aria-label="Hero Section"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-4 py-4 sm:px-6 md:px-8 overflow-hidden select-text"
    >
      <GlassContainer>
        <HeroContent />
      </GlassContainer>
    </section>
  );
}

export default Hero;
