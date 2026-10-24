import { Container } from "@/components/ui/Container";
import { sectionThemes } from "@/config/sections";
import { animationConfig } from "@/config/animations";
import { useGsapScope } from "@/hooks/useGsapScope";
import { revealChildren } from "@/components/animations/gsapUtils";

/**
 * Self-contained interlude (doubles as the About anchor). Rows of type drift
 * in opposite directions; geometric marks rotate with scroll. Swap freely.
 */
const rows = ["Design · Code · Automate ·", "Think clearly · Ship carefully ·", "Small studio · Serious craft ·"];

export function AnimationSection() {
  const ref = useGsapScope<HTMLElement>((scope, mm, gsap) => {
    mm.add(animationConfig.motion, () => {
      revealChildren(scope);
      const trig = { trigger: scope, start: "top bottom", end: "bottom top", scrub: 0.6 };
      scope.querySelectorAll<HTMLElement>("[data-row]").forEach((row, i) => {
        gsap.fromTo(row, { xPercent: i % 2 ? -25 : 0 }, { xPercent: i % 2 ? 0 : -25, ease: "none", scrollTrigger: trig });
      });
      gsap.to(scope.querySelectorAll("[data-shape]"), { rotate: (i) => (i % 2 ? -180 : 180), ease: "none", scrollTrigger: trig });
    });
  });

  return (
    <section id="about" ref={ref} data-theme={sectionThemes.about} aria-labelledby="about-title" className="relative overflow-hidden py-24 lg:py-40">
      <div className="flex flex-col gap-2 select-none" aria-hidden>
        {rows.map((r, i) => (
          <div key={r} data-row className={`whitespace-nowrap text-huge font-display font-semibold ${i === 1 ? "outline-text" : ""}`}>
            {r} {r}
          </div>
        ))}
      </div>
      <Container className="relative mt-20 grid gap-12 lg:mt-32 lg:grid-cols-12 lg:items-center">
        <div className="relative mx-auto aspect-square w-56 sm:w-72 lg:col-span-5 lg:w-80" aria-hidden>
          <div data-shape className="absolute inset-0 rounded-full border border-page-line" />
          <div data-shape className="absolute inset-8 rounded-[2rem] border border-page-fg/40" />
          <div data-shape className="absolute inset-16 rounded-full bg-clay" />
          <div data-shape className="absolute inset-[38%] rounded-md bg-page-fg" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p data-reveal className="eyebrow text-page-muted">03 — About the studio</p>
          <h2 id="about-title" data-reveal className="mt-6 text-big font-semibold">
            An independent studio that treats your business like it&apos;s our own product.
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-page-muted">
            We keep teams small and communication direct. You work with the people who design and build your project — no hand-offs, no hidden layers.
          </p>
        </div>
      </Container>
    </section>
  );
}
