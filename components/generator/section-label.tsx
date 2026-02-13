interface SectionLabelProps {
  number: string;
  title: string;
  subtitle: string;
}

export function SectionLabel({ number, title, subtitle }: SectionLabelProps) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-muted font-mono text-xs font-semibold text-accent">
        {number}
      </span>
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-medium text-t1">{title}</span>
        <span className="hidden text-xs text-t4 sm:inline">{subtitle}</span>
      </div>
    </div>
  );
}
