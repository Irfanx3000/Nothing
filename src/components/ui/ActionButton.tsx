import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: "bg-page-fg text-page hover:bg-clay hover:text-charcoal",
        outline: "border border-page-line text-page-fg hover:border-page-fg",
        accent: "bg-clay text-charcoal hover:bg-page-fg hover:text-page",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonStyles>;

export function ButtonLink({
  className, variant, size, children, ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & Variants & { children: ReactNode }) {
  return <a className={cn(buttonStyles({ variant, size }), className)} {...props}>{children}</a>;
}

export function Button({
  className, variant, size, ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
