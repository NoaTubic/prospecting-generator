import { Zap } from "lucide-react";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-label="PitchForge">
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent-muted">
        <Zap size={14} className="text-accent" />
      </div>
      <span className="text-sm font-bold tracking-tight text-t0">
        Pitch<span className="text-accent">Forge</span>
      </span>
    </div>
  );
}
