"use client";

import { TONES } from "@/lib/constants";
import type { Tone } from "@/lib/types";
import { Glass } from "@/components/ui/glass";
import { posthog } from "@/lib/posthog";

interface TonePickerProps {
  selected: Tone;
  onSelect: (tone: Tone) => void;
}

export function TonePicker({ selected, onSelect }: TonePickerProps) {
  return (
    <Glass depth={2} className="p-3">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Message tone">
        {TONES.map((t) => {
          const isSelected = selected === t.id;
          return (
            <button
              key={t.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${t.label} — ${t.desc}`}
              onClick={() => {
                onSelect(t.id);
                posthog.capture("tone_selected", { tone: t.id });
              }}
              className="rounded-xl border px-4 py-2 text-sm transition-all duration-200"
              style={{
                backgroundColor: isSelected ? "var(--color-accent-muted)" : "transparent",
                borderColor: isSelected ? "var(--color-accent-border)" : "var(--color-glass-border)",
                color: isSelected ? "var(--color-accent)" : "var(--color-t3)",
              }}
            >
              <span className="font-medium">{t.label}</span>
              <span className="ml-1.5 hidden text-xs opacity-60 sm:inline">{t.desc}</span>
            </button>
          );
        })}
      </div>
    </Glass>
  );
}
