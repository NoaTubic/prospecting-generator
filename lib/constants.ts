import type { ChannelConfig, ToneConfig } from "./types";

export const CHANNELS: ChannelConfig[] = [
  {
    id: "cold_email",
    label: "Cold Email",
    iconName: "mail",
    desc: "Direct inbox outreach",
    color: "#4B6BFB",
    glow: "rgba(75,107,251,0.15)",
    border: "rgba(75,107,251,0.2)",
  },
  {
    id: "linkedin",
    label: "LinkedIn DM",
    iconName: "linkedin",
    desc: "Connection message",
    color: "#A855F7",
    glow: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.2)",
  },
  {
    id: "twitter",
    label: "Twitter / X DM",
    iconName: "twitter",
    desc: "Short & direct",
    color: "#F97316",
    glow: "rgba(249,115,22,0.1)",
    border: "rgba(249,115,22,0.2)",
  },
];

export const TONES: ToneConfig[] = [
  { id: "direct", label: "Direct", desc: "Straight to the point" },
  { id: "curious", label: "Curious", desc: "Lead with a question" },
  { id: "value_first", label: "Value-First", desc: "Give before you ask" },
];

export const MESSAGE_COLORS = [
  { color: "#4B6BFB", glow: "rgba(75,107,251,0.15)", border: "rgba(75,107,251,0.2)" },
  { color: "#22C55E", glow: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.2)" },
  { color: "#F97316", glow: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.2)" },
];
