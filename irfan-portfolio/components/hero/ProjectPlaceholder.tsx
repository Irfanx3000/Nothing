interface ProjectPlaceholderProps {
  name: string;
  domain: string;
}

/** Shown while a project has no screenshot yet. No fake browser chrome — the real top bar already provides that. */
export function ProjectPlaceholder({ name, domain }: ProjectPlaceholderProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-neutral-50 px-6 text-center">
      <p className="font-serif text-xl font-semibold text-neutral-800">{name}</p>
      <p className="font-mono text-xs text-neutral-500">{domain}</p>
      <p className="mt-2 text-[11px] text-neutral-400">Screenshot coming soon</p>
    </div>
  );
}

export default ProjectPlaceholder;
