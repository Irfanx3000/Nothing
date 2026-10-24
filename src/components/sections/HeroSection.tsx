import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ActionButton";
import { sectionThemes } from "@/config/sections";
import { animationConfig } from "@/config/animations";
import { useGsapScope } from "@/hooks/useGsapScope";
import { revealLines } from "@/components/animations/gsapUtils";
import { projects } from "@/data/projects";

const featured = projects[0]!;
const lines = ["We build", "digital products", "that do the work."];
/** Statement beside the hero image. `accent` reveals in moss; `breakAfter` breaks the line from lg up. */
const statement = [
  { text: "Anyone can make.", breakAfter: true },
  { text: "Creating experiences that resonate with culture and business is" },
  { text: "the hard part.", accent: true, breakAfter: true },
  { text: "It takes design, technology and human judgment." },
];

export function HeroSection() {
  const ref = useGsapScope<HTMLElement>((scope, mm, gsap) => {
    mm.add(animationConfig.motion, () => {
      revealLines(scope, { delay: 0.15 });
      gsap.from(scope.querySelectorAll("[data-hero-fade]"), { autoAlpha: 0, y: 20, duration: 1, delay: 0.7, stagger: 0.1, ease: "power3.out" });
      // Restrained parallax as hero exits
      gsap.to(scope.querySelector("[data-hero-visual]"), {
        yPercent: -12, ease: "none",
        scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
      });
      // Statement: one scrubbed tween, words go faint → full with scroll (and back)
      const statementEl = scope.querySelector("[data-statement]");
      gsap.fromTo(scope.querySelectorAll("[data-word]"), { opacity: 0.18 }, {
        opacity: 1, ease: "none", stagger: 0.1,
        scrollTrigger: { trigger: statementEl, start: "top 85%", end: "bottom 50%", scrub: 0.4 },
      });
    });
  });

  return (
    <section id="home" ref={ref} data-theme={sectionThemes.hero} aria-labelledby="hero-title" className="relative pb-20 lg:pb-28">
      <Container>
        {/* Desktop: headline owns the first screen; intro + image follow below the fold */}
        <div className="flex flex-col pt-[clamp(6.5rem,18svh,10rem)] lg:min-h-svh lg:justify-center lg:pb-[6svh]">
          <p data-hero-fade className="eyebrow mb-8 text-page-muted">Independent IT solutions studio</p>
          <h1 id="hero-title" className="text-mega font-semibold">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <span data-line className={`block ${i === 1 ? "italic font-light text-moss" : ""}`}>{l}</span>
              </span>
            ))}
          </h1>
        </div>
        <div className="mt-12 grid gap-10 lg:mt-0 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <span className="sr-only">{statement.map((s) => s.text).join(" ")}</span>
            <p data-statement aria-hidden className="mb-10 font-display text-[clamp(1.5rem,2.4vw,2.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
              {statement.map((s, i) => (
                <span key={i}>
                  {s.text.split(" ").map((w, j) => (
                    <span key={j} data-word className={s.accent ? "text-moss" : undefined}>{w} </span>
                  ))}
                  {s.breakAfter && <br className="hidden lg:inline" />}
                </span>
              ))}
            </p>
            <p data-hero-fade className="max-w-md text-lg leading-relaxed text-page-muted">
              Websites, mobile apps, automations and custom software for businesses that want technology to feel effortless.
            </p>
            <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#contact" size="lg">
                Start a Project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </ButtonLink>
              <ButtonLink href="#work" variant="outline" size="lg">
                Explore Our Work <ArrowDown className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
          <div data-hero-visual className="lg:col-span-7">
            <div data-hero-fade className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-sand">
              <img src={featured.image} alt={featured.imageAlt} width={1600} height={1008} className="h-full w-full object-cover" fetchPriority="high" />
              <span className="glass absolute bottom-4 left-4 rounded-full px-4 py-2 text-xs font-semibold">Selected work · 2024—2025</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
