import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import { sectionThemes } from "@/config/sections";
import { animationConfig } from "@/config/animations";
import { useGsapScope } from "@/hooks/useGsapScope";
import { revealChildren } from "@/components/animations/gsapUtils";

/**
 * Desktop + motion: section pins and vertical scroll drives the track's x.
 * Otherwise the track is a native, touch-friendly horizontal scroller with snap.
 */
export function ProjectsSection() {
  const ref = useGsapScope<HTMLElement>((scope, mm, gsap) => {
    mm.add(animationConfig.motion, () => revealChildren(scope));
    mm.add(animationConfig.desktop, () => {
      const pin = scope.querySelector<HTMLElement>("[data-pin]")!;
      const track = scope.querySelector<HTMLElement>("[data-track]")!;
      const progress = scope.querySelector<HTMLElement>("[data-progress]");
      // clientWidth excludes the scrollbar; innerWidth would leave the last card clipped
      const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => progress && gsap.set(progress, { scaleX: self.progress }),
        },
      });
    });
  });

  return (
    <section id="work" ref={ref} data-theme={sectionThemes.projects} aria-labelledby="work-title" className="relative py-20 hscroll:pb-0">
      <Container className="flex items-end justify-between gap-6 pb-10">
        <SectionHeading index="01" eyebrow="Selected work" id="work-title" title={<>Projects</>} />
        <p data-reveal className="hidden max-w-xs text-sm text-page-muted md:block">
          A selection of recent builds. Scroll to browse — full case studies coming soon.
        </p>
      </Container>
      {/* Only the cards pin (heading scrolls away first), so cards get the full screen height minus the navbar */}
      <div data-pin className="flex flex-col justify-center-safe hscroll:h-svh hscroll:overflow-hidden hscroll:pt-[5.5rem]">
        <div
          data-track
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:px-8 lg:px-12 hscroll:w-max hscroll:snap-none hscroll:gap-10 hscroll:overflow-visible hscroll:pb-4 hscroll:will-change-transform [scrollbar-width:none]"
          tabIndex={0}
          aria-label="Project list"
        >
          {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </div>
        <Container className="hidden hscroll:block">
          <div className="h-px w-full bg-page-line">
            <div data-progress className="h-px origin-left scale-x-0 bg-page-fg" />
          </div>
        </Container>
      </div>
    </section>
  );
}
