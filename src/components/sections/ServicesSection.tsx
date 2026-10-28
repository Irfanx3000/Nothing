import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { sectionThemes, servicePanelThemes } from "@/config/sections";
import { animationConfig } from "@/config/animations";
import { useGsapScope } from "@/hooks/useGsapScope";
import { fitStickyPanels, revealChildren, shrinkCoveredPanels } from "@/components/animations/gsapUtils";

/**
 * Stacked panels: each panel is CSS-sticky (all screen sizes), settling a little
 * lower than the previous one, so the next panel slides up over it. GSAP only
 * adds a slight shrink to the covered panel. `stack` screens get fixed-height side-by-side panels.
 */
export function ServicesSection() {
  const ref = useGsapScope<HTMLElement>((scope, mm, gsap) => {
    mm.add(animationConfig.motion, () => revealChildren(scope));
    const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", scope);
    mm.add("(min-width: 0px)", () => fitStickyPanels(panels));
    mm.add(animationConfig.motion, () => shrinkCoveredPanels(panels));
  });

  return (
    <section id="services" ref={ref} data-theme={sectionThemes.services} aria-labelledby="services-title" className="py-24 lg:pt-40 lg:pb-24">
      <Container>
        <SectionHeading index="02" eyebrow="What we do" id="services-title" title={<>Services,<br /><span className="italic font-light">end to end.</span></>} />
        <ol className="mt-12 flex flex-col gap-6 lg:mt-20">
          {services.map((s, i) => {
            const project = projects.find((p) => p.slug === s.project);
            return (
              <li
                key={s.id}
                data-panel={servicePanelThemes[i % servicePanelThemes.length]}
                style={{ "--i": i, "--n": services.length } as CSSProperties}
                className="origin-top rounded-[2rem] bg-page p-6 text-page-fg shadow-[0_-16px_40px_-24px_rgb(0_0_0/0.45)] sm:p-8 lg:p-10 sticky top-[calc(4.75rem_+_var(--i)_*_0.75rem)] sm:top-[calc(5.75rem_+_var(--i)_*_1rem)] stack:h-[calc(100svh_-_7.25rem_-_(var(--n)_-_1)_*_1rem)]"
              >
                <div className="grid gap-4 sm:gap-8 lg:grid-cols-12 stack:h-full">
                  <div className="flex flex-col justify-between gap-4 sm:gap-6 lg:col-span-5">
                    <span className="font-display text-[clamp(3.5rem,min(9vw,14svh),9rem)] leading-[0.85] font-semibold tabular-nums" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[clamp(1.9rem,min(3.6vw,6.5svh),4rem)] leading-[1] font-semibold">{s.title}</h3>
                      <p className="mt-3 max-w-md text-page-muted sm:mt-4 lg:text-lg">{s.description}</p>
                    </div>
                  </div>
                  {project && (
                    <div className="relative h-[28svh] min-h-0 overflow-hidden sm:h-[36svh] stack:h-auto rounded-2xl border border-page-line lg:col-span-7 stack:aspect-auto">
                      <img src={project.image} alt={project.imageAlt} width={1600} height={1008} loading="lazy" className="h-full w-full object-cover" />
                      <span className="absolute bottom-4 left-4 rounded-full border border-page-line bg-page/70 px-3 py-1.5 text-xs font-semibold">
                        Example · {project.name}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
