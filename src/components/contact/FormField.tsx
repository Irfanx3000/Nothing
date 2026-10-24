import type { ReactNode } from "react";

export const fieldClass =
  "w-full rounded-2xl border border-page-line bg-transparent px-4 py-3.5 text-base text-page-fg placeholder:text-page-muted/70 transition-colors focus:border-page-fg focus:outline-none aria-[invalid=true]:border-destructive";

export function FormField({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string | undefined; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label} {optional && <span className="font-normal text-page-muted">(optional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
