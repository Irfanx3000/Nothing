import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import { sectionThemes } from "@/config/sections";
import { animationConfig } from "@/config/animations";
import { useGsapScope } from "@/hooks/useGsapScope";
import { getGsap, revealChildren } from "@/components/animations/gsapUtils";

/**
 * Motion allowed (any width, 450px+ tall): cards pin and vertical scroll drives the track's x.
 * Reduced motion / landscape phones: the track is a native, touch-friendly swipe row with snap.
 */
export function ProjectsSection() {
  const ref = useGsapScope<HTMLElement>((scope, mm, gsap) => {
    mm.add(animationConfig.motion, () => revealChildren(scope));
    mm.add({ hscroll: animationConfig.hscroll, lg: "(min-width: 1024px)" }, (ctx) => {
      const { hscroll, lg } = ctx.conditions as Record<string, boolean>;
      if (!hscroll) return;
      // Desktop pins only the cards (heading scrolls away: more height for cards on short laptops).
      // Below lg there's height to spare, so heading + cards pin together and sit right under each other.
      const pin = scope.querySelector<HTMLElement>(lg ? "[data-pin]" : "[data-pin-outer]")!;
      const track = scope.querySelector<HTMLElement>("[data-track]")!;
      const progress = scope.querySelector<HTMLElement>("[data-progress]");
      // clientWidth excludes the scrollbar; innerWidth would leave the last card clipped
      const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
      // Below lg one card fills the screen, so settle on whole cards instead of stopping between two.
      // A real swipe (>15% of a card step) goes to the next/previous card in its direction (nearest would bounce
      // short swipes back); a tiny nudge, e.g. just scrolling into the section, settles on the nearest card.
      const cards = gsap.utils.toArray<HTMLElement>("article", track);
      const snapToCard = (v: number, st?: ScrollTrigger) => {
        const d = distance() || 1;
        const pts = cards.map((c) => Math.min(1, (c.offsetLeft - cards[0]!.offsetLeft) / d));
        const nearest = gsap.utils.snap(pts, v);
        if (Math.abs(v - nearest) < 0.15 / (pts.length - 1)) return nearest;
        return getGsap().ScrollTrigger.snapDirectional(pts)(v, st?.direction ?? 1);
      };
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.5,
          snap: lg ? undefined : { snapTo: snapToCard, duration: { min: 0.2, max: 0.5 }, delay: 0.08, ease: "power1.inOut" },
          invalidateOnRefresh: true,
          onUpdate: (self) => progress && gsap.set(progress, { scaleX: self.progress }),
        },
      });
    });
  });

  return (
    <section id="work" ref={ref} data-theme={sectionThemes.projects} aria-labelledby="work-title" className="relative py-20 hscroll:pb-0">
      {/* Pinned element: [data-pin-outer] (heading + cards) below lg, [data-pin] (cards only) from lg */}
      <div data-pin-outer className="max-lg:hscroll:flex max-lg:hscroll:h-svh max-lg:hscroll:flex-col max-lg:hscroll:justify-center max-lg:hscroll:pb-6 max-lg:hscroll:overflow-hidden max-lg:hscroll:pt-[4.75rem] sm:max-lg:hscroll:pt-[5.5rem]">
        <Container className="flex items-end justify-between gap-6 pb-10 max-lg:hscroll:pb-5">
          <SectionHeading index="01" eyebrow="Selected work" id="work-title" title={<>Projects</>} />
          <p data-reveal className="hidden max-w-xs text-sm text-page-muted md:block">
            A selection of recent builds. Scroll to browse — full case studies coming soon.
          </p>
        </Container>
        <div data-pin className="flex flex-col max-lg:hscroll:min-h-0 lg:justify-center-safe lg:hscroll:h-svh lg:hscroll:overflow-hidden lg:hscroll:pt-[5.5rem]">
          <div
            data-track
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 max-lg:hscroll:min-h-0 sm:gap-6 sm:px-8 lg:gap-10 lg:px-12 hscroll:w-max hscroll:snap-none hscroll:overflow-visible hscroll:pb-4 hscroll:will-change-transform [scrollbar-width:none]"
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
      </div>
    </section>
  );
}
