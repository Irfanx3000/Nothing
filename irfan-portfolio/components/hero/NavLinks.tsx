"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useLenis } from "@/components/providers/LenisProvider";
import { useActiveSection } from "./useActiveSection";
import { type NavLink } from "./config/hero";
import { cn } from "@/lib/utils";

const SCROLL_OFFSET = -96;

interface NavLinksProps {
  links: NavLink[];
  /** Whether the links are currently revealed — controls tab order, SR visibility, and stagger direction. */
  isOpen: boolean;
  onNavigate?: () => void;
  className?: string;
}

const listVariants: Variants = {
  hidden: { transition: { staggerChildren: 0, duration: 0.1 } },
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -6, transition: { duration: 0.1, ease: "easeIn" } },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

const reducedVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

export function NavLinks({ links, isOpen, onNavigate, className }: NavLinksProps) {
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();
  const activeId = useActiveSection(links.map((link) => link.id));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      onNavigate?.();
      return;
    }
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: SCROLL_OFFSET });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onNavigate?.();
  };

  const variants = shouldReduceMotion ? reducedVariants : listVariants;
  const item = shouldReduceMotion ? reducedVariants : itemVariants;

  return (
    <motion.ul
      variants={variants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      className={cn("flex items-center gap-1", className)}
      aria-hidden={!isOpen}
    >
      {links.map((link) => {
        const isActive = activeId === link.id;
        return (
          <motion.li key={link.id} variants={item}>
            <a
              href={link.href}
              tabIndex={isOpen ? 0 : -1}
              aria-current={isActive ? "location" : undefined}
              onClick={(e) => handleClick(e, link.id)}
              className={cn(
                "relative inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-neutral-600 whitespace-nowrap transition-colors",
                "hover:bg-black/5 hover:text-neutral-900",
                "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none",
                isActive && "bg-black/5 font-medium text-neutral-900"
              )}
            >
              {isActive && <span className="size-1.5 rounded-full bg-neutral-900" aria-hidden="true" />}
              {link.label}
            </a>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export default NavLinks;
