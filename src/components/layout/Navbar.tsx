import { useEffect, useState, type CSSProperties } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/ActionButton";

/** Per-character roll on hover/focus (styles: .roll in styles.css). Screen readers get the plain label. */
export function RollLabel({ text }: { text: string }) {
  const row = (
    <span>
      {[...text].map((c, i) => (
        <span key={i} className="roll-c" style={{ "--i": i } as CSSProperties}>{c === " " ? " " : c}</span>
      ))}
    </span>
  );
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="roll" aria-hidden>{row}{row}</span>
    </>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
      <nav aria-label="Primary" className="glass mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-full pl-5 pr-2 sm:h-16 sm:pl-7">
        <a href="#home" className="font-display text-lg font-semibold tracking-tight">
          {siteConfig.shortName}<span className="text-clay">.</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block rounded-full px-4 py-2 text-sm font-medium text-page-muted transition-colors hover:text-page-fg focus-visible:text-page-fg">
                <RollLabel text={l.label} />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ButtonLink href="#contact" size="sm" className="hidden sm:inline-flex">
            Start a Project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-page-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="glass mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-[1240px] overflow-y-auto rounded-3xl p-4 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-display text-2xl font-medium">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href="#contact" onClick={() => setOpen(false)} className="mt-3 w-full">
            Start a Project
          </ButtonLink>
        </div>
      )}
    </header>
  );
}
