"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/lib/theme";
import { initPostHog } from "@/lib/posthog";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <ThemeProvider>
      {children}
      <Analytics />
    </ThemeProvider>
  );
}
