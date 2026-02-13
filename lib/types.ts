export type Channel = "cold_email" | "linkedin" | "twitter";

export type Tone = "direct" | "curious" | "value_first";

export type ChannelIconName = "mail" | "linkedin" | "twitter";

export interface ChannelConfig {
  id: Channel;
  label: string;
  iconName: ChannelIconName;
  desc: string;
  color: string;
  glow: string;
  border: string;
}

export interface ToneConfig {
  id: Tone;
  label: string;
  desc: string;
}

export interface GeneratedMessage {
  angle: string;
  strategy: string;
  subject?: string;
  body: string;
  reasoning: string;
}

export interface GenerateRequest {
  channel: Channel;
  prospect: string;
  valueProps: string;
  context?: string;
  tone: Tone;
}

export interface GenerateResponse {
  messages: GeneratedMessage[];
}

export interface GenerateError {
  error: string;
}

export interface GlassProps {
  children: React.ReactNode;
  depth?: 1 | 2 | 3;
  glow?: boolean;
  className?: string;
}
