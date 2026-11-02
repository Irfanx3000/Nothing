"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLenis } from "@/components/providers/LenisProvider";
import { heroConfig, NAV_LINKS } from "./config/hero";
import { cn } from "@/lib/utils";

const SCROLL_OFFSET = -96;

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    setOpen(false);
    if (!target) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: SCROLL_OFFSET });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full text-neutral-700",
            "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none"
          )}
        >
          <Menu className="size-4" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="font-serif text-base font-semibold">{heroConfig.name}</SheetTitle>
        <nav aria-label="Primary" className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleClick(e, link.id)}
              className="flex min-h-12 items-center rounded-lg px-2 text-base font-medium text-neutral-700 hover:bg-black/5 hover:text-neutral-900"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button
          asChild
          className="mt-auto h-12 rounded-full bg-neutral-900 text-base text-white hover:bg-black"
          onClick={() => setOpen(false)}
        >
          <a href={heroConfig.navCta.href}>{heroConfig.navCta.label}</a>
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
