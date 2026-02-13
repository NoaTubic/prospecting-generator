"use client";

import { BrandLogo } from "./coldiq-logo";

export function Footer() {
  return (
    <footer className="border-t border-glass-border transition-colors duration-300">
      <div
        className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-10 sm:px-6"
        style={{
          backgroundColor: "var(--theme-nav-bg)",
          backdropFilter: "blur(12px)",
        }}
      >
        <BrandLogo />
        <p className="text-center text-sm text-t3">
          AI-powered outreach messages crafted for every channel
        </p>
      </div>
    </footer>
  );
}
