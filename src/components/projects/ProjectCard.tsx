import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    // hscroll width is capped by viewport height so image + text fit inside the pinned screen (16:10 image)
    <article className="@container group flex w-[82vw] max-w-[44rem] shrink-0 snap-center flex-col gap-5 sm:w-[64vw] hscroll:w-[min(50vw,calc((100svh_-_17.5rem)_*_1.6))] hscroll:max-w-none hscroll:gap-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-page-line">
        <img src={project.image} alt={project.imageAlt} width={1600} height={1008} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
        <span className="absolute border border-page-line bg-page/70 left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold tabular-nums">
          {String(index + 1).padStart(2, "0")} / {project.year}
        </span>
        {/* Chips: no backdrop blur, re-blurring moving images janks the pinned scroll. Action sits on the image so the text below keeps the card's full width */}
        {project.url ? (
          <a href={project.url} target="_blank" rel="noreferrer" aria-label={`View ${project.name}`}
            className="absolute border border-page-line bg-page/70 right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-page-fg hover:text-page">
            <ArrowUpRight className="h-5 w-5" />
          </a>
        ) : (
          <span className="absolute border border-page-line bg-page/70 right-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold" title="Case study link coming soon">
            View Project · soon
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="eyebrow text-clay">{project.category}</p>
        <h3 className="mt-2 text-[clamp(1.5rem,8cqi,3.25rem)] leading-[1.02] font-semibold">{project.name}</h3>
        <p className="mt-3 max-w-md text-page-muted">{project.description}</p>
      </div>
    </article>
  );
}
