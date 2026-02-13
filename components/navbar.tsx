"use client";

import { BrandLogo } from "./coldiq-logo";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-glass-border transition-colors duration-300"
      style={{
        backgroundColor: "var(--theme-nav-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <BrandLogo />
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-glass-border bg-glass-highlight px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-t3">
            Free Tool
          </span>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
