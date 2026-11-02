import Image from "next/image";
import type { ClientLogo } from "./config/hero";

interface LogoStripProps {
  logos: ClientLogo[];
  label: string;
}

const HEIGHT = 32;

export function LogoStrip({ logos, label }: LogoStripProps) {
  if (logos.length === 0) return null;

  return (
    <div className="flex flex-col items-start gap-3">
      <p className="font-mono text-[10px] font-semibold tracking-wider uppercase text-neutral-400 select-none">
        {label}
      </p>
      <div className="flex flex-wrap items-center justify-start gap-x-8 gap-y-3">
        {logos.map((logo) => {
          const width = Math.round(HEIGHT * logo.aspect);
          const img = (
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              width={width}
              height={HEIGHT}
              className="h-8 w-auto object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            />
          );
          return logo.href ? (
            <a key={logo.name} href={logo.href} target="_blank" rel="noreferrer" aria-label={logo.name}>
              {img}
            </a>
          ) : (
            <span key={logo.name}>{img}</span>
          );
        })}
      </div>
    </div>
  );
}

export default LogoStrip;
