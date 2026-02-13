"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  UserPlus,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Glass } from "@/components/ui/glass";
import { ChannelPicker } from "@/components/generator/channel-picker";
import { TonePicker } from "@/components/generator/tone-picker";
import { ProspectForm } from "@/components/generator/prospect-form";
import { MessageCard } from "@/components/generator/message-card";
import { LoadingSkeleton } from "@/components/generator/loading-skeleton";
import { SectionLabel } from "@/components/generator/section-label";
import { StatsPill } from "@/components/generator/stats-pill";
import { CHANNELS } from "@/lib/constants";
import { posthog } from "@/lib/posthog";
import type { Channel, Tone, GeneratedMessage } from "@/lib/types";

const MESSAGE_COLORS = [
  { color: "#4B6BFB", glow: "rgba(75,107,251,0.15)", border: "rgba(75,107,251,0.2)" },
  { color: "#22C55E", glow: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.2)" },
  { color: "#F97316", glow: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.2)" },
];

export default function Home() {
  const [channel, setChannel] = useState<Channel>("cold_email");
  const [tone, setTone] = useState<Tone>("direct");
  const [prospect, setProspect] = useState("");
  const [valueProps, setValueProps] = useState("");
  const [context, setContext] = useState("");

  const [messages, setMessages] = useState<GeneratedMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    posthog.capture("generator_loaded");
  }, []);

  const channelConfig = CHANNELS.find((c) => c.id === channel);
  const isValid = prospect.trim().length >= 20 && valueProps.trim().length >= 10;

  const generate = useCallback(async () => {
    if (!isValid || loading) return;

    setLoading(true);
    setError(null);
    setMessages([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          prospect: prospect.trim(),
          valueProps: valueProps.trim(),
          context: context.trim() || undefined,
          tone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate messages. Try again.");
        return;
      }

      if (!data.messages || !Array.isArray(data.messages)) {
        setError("Invalid response. Try regenerating.");
        return;
      }

      setMessages(data.messages);
      posthog.capture("messages_generated", { channel, tone });
    } catch {
      setError("Connection failed. Check your internet and try again.");
    } finally {
      setLoading(false);
    }
  }, [channel, prospect, valueProps, context, tone, isValid, loading]);

  function handleReset() {
    setProspect("");
    setValueProps("");
    setContext("");
    setMessages([]);
    setError(null);
  }

  function handleRegenerate() {
    posthog.capture("regenerate_clicked");
    generate();
  }

  return (
    <div className="relative min-h-screen transition-colors duration-300">
      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-500"
        style={{ background: "var(--theme-glow)" }}
      />

      <Navbar />

      <main className="relative mx-auto max-w-[780px] px-4 pb-20 pt-12 sm:px-6">
        {/* Hero */}
        <div className="fade-up mb-14 text-center" style={{ opacity: 0 }}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-highlight px-3 py-1">
            <span className="pulse-glow h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-t3">
              AI-Powered
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-t0 sm:text-4xl">
            Prospecting Message{" "}
            <span className="text-accent">Generator</span>
          </h1>
          <p className="text-sm text-t3 sm:text-base">
            Generate personalized outreach messages for any channel in seconds
          </p>
        </div>

        {/* Section 01 — Channel */}
        <section
          className="fade-up mb-10"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          <SectionLabel
            number="01"
            title="Choose Channel"
            subtitle="Select your outreach platform"
          />
          <ChannelPicker selected={channel} onSelect={setChannel} />
        </section>

        {/* Section 02 — Form */}
        <section
          className="fade-up mb-10"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <SectionLabel
            number="02"
            title="Prospect & Value Prop"
            subtitle="The more detail, the better the message"
          />
          <ProspectForm
            prospect={prospect}
            valueProps={valueProps}
            context={context}
            onProspectChange={setProspect}
            onValuePropsChange={setValueProps}
            onContextChange={setContext}
            onSubmit={generate}
          />
        </section>

        {/* Section 03 — Tone */}
        <section
          className="fade-up mb-8"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          <SectionLabel
            number="03"
            title="Pick a Tone"
            subtitle="How should the message feel?"
          />
          <TonePicker selected={tone} onSelect={setTone} />
        </section>

        {/* Generate Button */}
        <button
          onClick={generate}
          disabled={!isValid || loading}
          className="fade-up group mb-12 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed"
          style={{
            animationDelay: "0.4s",
            opacity: 0,
            ...(isValid && !loading
              ? {
                  backgroundColor: "var(--color-accent)",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 16px rgba(75,107,251,0.3)",
                }
              : {
                  backgroundColor: "transparent",
                  border: "1px solid var(--color-glass-border)",
                  color: "var(--color-t4)",
                }),
          }}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="spinner" />
              Generating 3 messages...
            </span>
          ) : (
            <>
              <Sparkles size={16} className="transition-transform duration-300 group-hover:scale-110" />
              Generate {channelConfig?.label} Messages
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="scale-in mb-8">
            <div
              className="relative overflow-hidden rounded-2xl border p-4"
              style={{
                backgroundColor: "rgba(239,68,68,0.06)",
                borderColor: "rgba(239,68,68,0.2)",
              }}
            >
              <p className="text-sm text-red">{error}</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mb-8">
            <LoadingSkeleton />
          </div>
        )}

        {/* Results */}
        {messages.length > 0 && !loading && (
          <section className="fade-up">
            <div className="mb-5 flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-glow text-green">
                <CheckCircle2 size={16} />
              </span>
              <div>
                <span className="text-sm font-medium text-t1">
                  Your Messages
                </span>
                <p className="text-xs text-t4">
                  3 variations for {channelConfig?.label}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-5 flex gap-2">
              <StatsPill
                label={channelConfig?.label || ""}
                color={channelConfig?.color}
                borderColor={channelConfig?.border}
              />
              <StatsPill label={tone.replace("_", " ")} />
            </div>

            {/* Message Cards */}
            <div className="stagger space-y-4">
              {messages.map((msg, i) => (
                <MessageCard
                  key={`${msg.angle}-${i}`}
                  message={msg}
                  index={i}
                  isEmail={channel === "cold_email"}
                  accentColor={MESSAGE_COLORS[i % 3].color}
                  accentGlow={MESSAGE_COLORS[i % 3].glow}
                  accentBorder={MESSAGE_COLORS[i % 3].border}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleRegenerate}
                className="flex items-center gap-2 rounded-xl border border-accent-border px-5 py-2.5 text-sm font-medium text-accent transition-all duration-200 hover:bg-accent-muted active:scale-[0.98]"
              >
                <RefreshCw size={14} />
                Regenerate
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 rounded-xl border border-glass-border px-5 py-2.5 text-sm font-medium text-t3 transition-all duration-200 hover:border-glass-border-hover hover:text-t2 active:scale-[0.98]"
              >
                <UserPlus size={14} />
                New prospect
              </button>
            </div>

            {/* CTA Card */}
            <div className="fade-up mt-10" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <Glass depth={3} glow className="p-6 text-center sm:p-8">
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(75,107,251,0.08), transparent 60%)",
                  }}
                />
                <p className="relative mb-2 text-sm font-medium text-t2">
                  Want to see how the pros do outbound?
                </p>
                <a
                  href="https://coldiq.com/get-in-touch"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    posthog.capture("cta_clicked", { target: "learn_more" })
                  }
                  className="group relative inline-flex items-center gap-1.5 text-lg font-semibold text-accent transition-opacity hover:opacity-80"
                >
                  Learn more
                  <ExternalLink size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </Glass>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
