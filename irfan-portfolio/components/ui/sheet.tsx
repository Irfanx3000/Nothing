"use client";

import * as React from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetTitle = Dialog.Title;

function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Content>) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        )}
      />
      <Dialog.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-6 border-l border-black/5 bg-white p-6 shadow-xl",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-300",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:duration-200",
          className
        )}
        {...props}
      >
        {children}
        <Dialog.Close
          className="absolute top-5 right-5 rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none"
          aria-label="Close menu"
        >
          <X className="size-4" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export { Sheet, SheetTrigger, SheetContent, SheetTitle };
