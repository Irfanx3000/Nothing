import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    // Phones: screen width minus track padding (1.25rem), gap (1rem) and a ~2.25rem peek of the next card.
    // Below lg the card is a tall panel like the service cards (number on top, text, image at the bottom),
    // centred with the heading. When pinned on desktop, width is also capped by viewport height (16:10 image).
    <article className="@container group flex w-[calc(100vw_-_4.5rem)] max-w-[44rem] shrink-0 snap-center flex-col gap-5 sm:w-[64vw] lg:w-[50vw] hscroll:max-w-[calc((100svh_-_17.5rem)_*_1.6)] hscroll:gap-4 max-lg:rounded-[2rem] max-lg:border max-lg:border-page-line max-lg:bg-[color-mix(in_oklab,var(--page-fg)_7%,var(--page-bg))] max-lg:p-5">
      <div className="flex items-start justify-between lg:hidden">
        <span className="font-display text-[clamp(3rem,16cqi,4.5rem)] leading-[0.85] font-semibold tabular-nums" aria-hidden>{number}</span>
        <span className="text-xs font-semibold tabular-nums text-page-muted">{project.year}</span>
      </div>
      {/* Image is last on phones at ~5:4 (mockups only lightly cropped); it shrinks on short phones so the panel fits */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-page-line max-lg:order-last max-lg:rounded-2xl max-lg:hscroll:aspect-auto max-lg:hscroll:h-[80cqi] max-lg:hscroll:min-h-[7rem]">
        <img src={project.image} alt={project.imageAlt} width={1600} height={1008} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
        <span className="absolute border border-page-line bg-page/70 left-3 top-3 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold tabular-nums max-lg:hidden @sm:left-4 @sm:top-4 @sm:px-3 @sm:py-1.5 @sm:text-xs">
          {number} / {project.year}
        </span>
        {/* Chips: no backdrop blur, re-blurring moving images janks the pinned scroll. Action sits on the image so the text below keeps the card's full width */}
        {project.url ? (
          <a href={project.url} target="_blank" rel="noreferrer" aria-label={`View ${project.name}`}
            className="absolute border border-page-line bg-page/70 right-3 top-3 flex h-9 w-9 items-center @sm:right-4 @sm:top-4 @sm:h-11 @sm:w-11 justify-center rounded-full transition-colors hover:bg-page-fg hover:text-page">
            <ArrowUpRight className="h-5 w-5" />
          </a>
        ) : (
          <span className="absolute border border-page-line bg-page/70 right-3 top-3 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold @sm:right-4 @sm:top-4 @sm:px-3 @sm:py-1.5 @sm:text-xs" title="Case study link coming soon">
            View Project · soon
          </span>
        )}
      </div>
      <div className="min-w-0 max-lg:mt-auto">
        <p className="eyebrow text-clay">{project.category}</p>
        <h3 className="mt-2 text-[clamp(1.5rem,8cqi,3.25rem)] leading-[1.02] font-semibold">{project.name}</h3>
        <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-page-muted @sm:mt-3 @sm:text-base">{project.description}</p>
      </div>
    </article>
  );
}
