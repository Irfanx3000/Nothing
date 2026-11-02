import * as React from "react";
import { Code2 } from "lucide-react";
import type { TechId } from "@/components/hero/config/hero";

type IconProps = React.SVGProps<SVGSVGElement>;

function ReactIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth="1.3">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

function NodejsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 1.5 21 6.75v10.5L12 22.5 3 17.25V6.75Z" fill="#339933" />
      <path
        d="M9.1 9.3v6.6h1.15v-2.55l3.05 2.55c.32-.04.63-.13.9-.26L9.7 9.5a.8.8 0 0 0-.6-.2Z"
        fill="#fff"
        opacity=".92"
      />
    </svg>
  );
}

function JavascriptIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <text x="12" y="16.3" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="sans-serif">
        JS
      </text>
    </svg>
  );
}

/** Honest fallback for logos not confidently reproducible from memory: a colored badge with the short label. */
function createBadgeIcon({
  bg,
  fg = "#fff",
  label,
  fontSize,
}: {
  bg: string;
  fg?: string;
  label: string;
  fontSize?: number;
}): React.ComponentType<IconProps> {
  function BadgeIcon(props: IconProps) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <rect width="24" height="24" rx="6" fill={bg} />
        <text
          x="12"
          y="15.5"
          textAnchor="middle"
          fontSize={fontSize ?? (label.length > 2 ? 7 : 9)}
          fontWeight="700"
          fontFamily="sans-serif"
          fill={fg}
        >
          {label}
        </text>
      </svg>
    );
  }
  BadgeIcon.displayName = `BadgeIcon(${label})`;
  return BadgeIcon;
}

const ExpressIcon = createBadgeIcon({ bg: "#000000", label: "Ex" });
const MongodbIcon = createBadgeIcon({ bg: "#47A248", label: "Mo" });
const SupabaseIcon = createBadgeIcon({ bg: "#3ECF8E", fg: "#064E3B", label: "Su" });
const HtmlIcon = createBadgeIcon({ bg: "#E34F26", label: "HTML" });
const CssIcon = createBadgeIcon({ bg: "#1572B6", label: "CSS" });

export const techIcons: Record<TechId, React.ComponentType<IconProps>> = {
  react: ReactIcon,
  nodejs: NodejsIcon,
  express: ExpressIcon,
  mongodb: MongodbIcon,
  supabase: SupabaseIcon,
  html: HtmlIcon,
  css: CssIcon,
  javascript: JavascriptIcon,
};

export function getTechIcon(id: string): React.ComponentType<IconProps> {
  return (techIcons as Record<string, React.ComponentType<IconProps>>)[id] ?? Code2;
}
