import * as React from "react";
import { Bot } from "lucide-react";

function NextjsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.25" fill="#000" />
      <path d="M8.3 8.3v8.1h1.35v-6.2l6.1 7.6c.4-.1.78-.25 1.14-.44L9.1 7.1a1 1 0 0 0-.8-.4c-.6 0-1 .4-1 1v.6Z" fill="#fff" />
      <path d="M14.75 8.3v6.9h1.3V8.3h-1.3Z" fill="#fff" />
    </svg>
  );
}

function TypescriptIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="1" y="1" width="22" height="22" rx="3" fill="#3178C6" />
      <path
        d="M6.3 12.1h3.1v1.3H8.1v5.3H6.6v-5.3H5.3v-1.3h1Zm6.9.2c.6 0 1.1.1 1.5.3v1.4a2 2 0 0 0-1.4-.5c-.4 0-.7.2-.7.5 0 .3.3.5 1 .8 1 .4 1.5.9 1.5 1.8 0 1.1-.9 1.8-2.1 1.8-.7 0-1.3-.2-1.7-.4v-1.5c.4.3 1 .6 1.6.6.5 0 .8-.2.8-.5 0-.3-.2-.5-.9-.8-1.1-.4-1.6-.9-1.6-1.8 0-1 .8-1.7 2-1.7Z"
        fill="#fff"
      />
    </svg>
  );
}

export const TECH_ICONS = {
  nextjs: NextjsIcon,
  typescript: TypescriptIcon,
  ai: Bot,
} as const;

export type TechIconKey = keyof typeof TECH_ICONS;
