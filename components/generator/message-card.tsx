"use client";

import { useState } from "react";
import { Copy, Check, ChevronRight, Lightbulb } from "lucide-react";
import { Glass } from "@/components/ui/glass";
import type { GeneratedMessage } from "@/lib/types";
import { posthog } from "@/lib/posthog";

interface MessageCardProps {
  message: GeneratedMessage;
  index: number;
  isEmail: boolean;
  accentColor: string;
  accentGlow: string;
  accentBorder: string;
}

export function MessageCard({
  message,
  index,
  isEmail,
  accentColor,
  accentGlow,
  accentBorder,
}: MessageCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function handleCopy() {
    const text = isEmail && message.subject
      ? `Subject: ${message.subject}\n\n${message.body}`
      : message.body;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      posthog.capture("message_copied", { index, angle: message.angle });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }

  function toggleExpanded() {
    setExpanded((prev) => !prev);
    if (!expanded) {
      posthog.capture("reasoning_expanded", { index });
    }
  }

  return (
    <div
      className="fade-up"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      <Glass depth={2} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-glass-border px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-lg font-mono text-xs font-bold"
              style={{
                backgroundColor: accentGlow,
                color: accentColor,
                border: `1px solid ${accentBorder}`,
              }}
            >
              {index + 1}
            </span>
            <span className="text-sm font-medium text-t1">{message.angle}</span>
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
              style={{
                color: accentColor,
                backgroundColor: accentGlow,
                border: `1px solid ${accentBorder}`,
              }}
            >
              {message.strategy}
            </span>
          </div>
          <button
            onClick={handleCopy}
            aria-live="polite"
            className="flex items-center gap-1.5 rounded-lg border border-glass-border px-3 py-1.5 text-xs transition-all duration-200 hover:border-glass-border-hover"
            style={
              copied
                ? {
                    backgroundColor: "rgba(34,197,94,0.12)",
                    borderColor: "rgba(34,197,94,0.2)",
                    color: "#22C55E",
                  }
                : { color: "var(--color-t3)" }
            }
          >
            {copied ? (
              <>
                <Check size={13} />
                Copied
              </>
            ) : (
              <>
                <Copy size={13} />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5">
          {isEmail && message.subject && (
            <div className="mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-t4">
                Subject
              </span>
              <p className="mt-0.5 text-sm font-semibold text-t0">
                {message.subject}
              </p>
            </div>
          )}
          <div className="rounded-xl border border-glass-border p-4" style={{ backgroundColor: "var(--theme-body-bg)" }}>
            <p className="whitespace-pre-wrap text-sm leading-[1.7] text-t2">
              {message.body}
            </p>
          </div>
        </div>

        {/* Footer — Reasoning */}
        <div className="border-t border-glass-border">
          <button
            onClick={toggleExpanded}
            aria-expanded={expanded}
            className="flex w-full items-center gap-2 px-4 py-3 text-xs text-t4 transition-colors hover:text-t3 sm:px-5"
          >
            <ChevronRight
              size={14}
              className="transition-transform duration-200"
              style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
            />
            <Lightbulb size={13} />
            Why this works
          </button>
          {expanded && (
            <div className="fade-up px-4 pb-4 sm:px-5">
              <p className="text-[13px] leading-relaxed text-t3">
                {message.reasoning}
              </p>
            </div>
          )}
        </div>
      </Glass>
    </div>
  );
}
