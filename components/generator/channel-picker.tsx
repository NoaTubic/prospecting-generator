"use client";

import { Mail, Linkedin, Twitter } from "lucide-react";
import { CHANNELS } from "@/lib/constants";
import type { Channel, ChannelIconName } from "@/lib/types";
import { posthog } from "@/lib/posthog";

const iconMap: Record<ChannelIconName, React.ComponentType<{ size?: number; className?: string }>> = {
  mail: Mail,
  linkedin: Linkedin,
  twitter: Twitter,
};

interface ChannelPickerProps {
  selected: Channel;
  onSelect: (channel: Channel) => void;
}

export function ChannelPicker({ selected, onSelect }: ChannelPickerProps) {
  return (
    <div role="radiogroup" aria-label="Message channel" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {CHANNELS.map((ch) => {
        const isSelected = selected === ch.id;
        const Icon = iconMap[ch.iconName];
        return (
          <button
            key={ch.id}
            role="radio"
            aria-checked={isSelected}
            onClick={() => {
              onSelect(ch.id);
              posthog.capture("channel_selected", { channel: ch.id });
            }}
            className="group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: isSelected ? ch.glow : "transparent",
              borderColor: isSelected ? ch.border : "var(--color-glass-border)",
            }}
          >
            {/* Top highlight */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, var(--color-glass-border-hover), transparent)",
              }}
            />
            <div
              className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300"
              style={{
                backgroundColor: isSelected ? `${ch.color}20` : "var(--color-glass-highlight)",
                color: isSelected ? ch.color : "var(--color-t3)",
              }}
            >
              <Icon size={18} />
            </div>
            <div className="text-sm font-medium text-t1">{ch.label}</div>
            <div className="mt-0.5 text-xs text-t3">{ch.desc}</div>
            {isSelected && (
              <div
                className="absolute right-3 top-3 h-2 w-2 rounded-full"
                style={{
                  backgroundColor: ch.color,
                  boxShadow: `0 0 8px ${ch.color}60`,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
