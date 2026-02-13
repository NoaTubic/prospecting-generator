import type { GlassProps } from "@/lib/types";

const depthConfig = {
  1: { cssVar: "var(--theme-glass-1)", blur: "16px", shadow: "0 4px 24px rgba(0,0,0,0.08)" },
  2: { cssVar: "var(--theme-glass-2)", blur: "12px", shadow: "0 2px 16px rgba(0,0,0,0.06)" },
  3: { cssVar: "var(--theme-glass-3)", blur: "20px", shadow: "0 8px 32px rgba(0,0,0,0.1)" },
} as const;

export function Glass({ children, depth = 1, glow = false, className = "" }: GlassProps) {
  const d = depthConfig[depth];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-glass-border transition-colors duration-300 ${className}`}
      style={{
        backgroundColor: d.cssVar,
        backdropFilter: `blur(${d.blur})`,
        WebkitBackdropFilter: `blur(${d.blur})`,
        boxShadow: glow
          ? `${d.shadow}, inset 0 1px 0 0 var(--theme-glass-highlight)`
          : d.shadow,
      }}
    >
      {/* Top highlight line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--theme-highlight-line)" }}
      />
      {children}
    </div>
  );
}
