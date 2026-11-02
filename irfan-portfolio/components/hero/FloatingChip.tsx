import * as React from "react";
import { RADIUS } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface FloatingChipProps {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  className?: string;
}

/** Shared visual style for both tech chips and the stat card accessory. */
export function FloatingChip({ icon, label, value, className }: FloatingChipProps) {
  return (
    <div
      className={cn(
        RADIUS.tile,
        "flex items-center gap-1.5 border border-black/10 bg-white px-3 py-2 text-sm shadow-[0_8px_20px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {icon}
      {value ? (
        <span className="flex flex-col leading-tight">
          <span className="font-semibold text-neutral-900">{value}</span>
          <span className="text-[11px] text-neutral-500">{label}</span>
        </span>
      ) : (
        <span className="font-medium text-neutral-700">{label}</span>
      )}
    </div>
  );
}

export default FloatingChip;
