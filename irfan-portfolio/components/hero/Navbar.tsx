"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { heroConfig, NAV_LINKS } from "./config/hero";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 md:px-8">
        <a href="#" className="text-base font-semibold tracking-tight text-neutral-900">
          {heroConfig.name}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" className="rounded-full bg-[#171717] px-4 text-white hover:bg-black">
            <a href={heroConfig.navCta.href}>{heroConfig.navCta.label}</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className={cn(
                "flex size-9 items-center justify-center rounded-full border border-black/5 text-neutral-700 md:hidden",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              )}
            >
              <Menu className="size-4" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="text-base font-semibold">{heroConfig.name}</SheetTitle>
            <nav aria-label="Mobile" className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-neutral-700 hover:text-neutral-900"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <Button
              asChild
              className="mt-auto rounded-full bg-[#171717] text-white hover:bg-black"
              onClick={() => setOpen(false)}
            >
              <a href={heroConfig.navCta.href}>{heroConfig.navCta.label}</a>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
