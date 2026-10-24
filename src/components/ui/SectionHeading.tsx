import type { ReactNode } from "react";

export function SectionHeading({ index, eyebrow, title, id }: { index: string; eyebrow: string; title: ReactNode; id?: string }) {
  return (
    <div className="flex flex-col gap-6">
      <p data-reveal className="eyebrow flex items-center gap-3 text-page-muted">
        <span className="tabular-nums">{index}</span>
        <span className="h-px w-10 bg-page-line" aria-hidden />
        {eyebrow}
      </p>
      <h2 id={id} className="text-huge font-semibold">{title}</h2>
    </div>
  );
}
