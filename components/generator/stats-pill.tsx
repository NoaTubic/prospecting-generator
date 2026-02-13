interface StatsPillProps {
  label: string;
  color?: string;
  borderColor?: string;
}

export function StatsPill({ label, color, borderColor }: StatsPillProps) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider"
      style={{
        color: color || "var(--color-t3)",
        backgroundColor: color ? `${color}10` : "var(--color-glass-highlight)",
        border: `1px solid ${borderColor || "var(--color-glass-border)"}`,
      }}
    >
      {label}
    </span>
  );
}
