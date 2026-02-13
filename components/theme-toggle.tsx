"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-glass-border text-t3 transition-all duration-200 hover:border-glass-border-hover hover:text-t1"
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
