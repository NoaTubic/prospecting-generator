import type { Channel, Tone } from "./types";

const channelGuide: Record<Channel, string> = {
  cold_email:
    "Cold email. Include a subject line. Body under 120 words. No HTML. Write like a human. One clear CTA.",
  linkedin:
    "LinkedIn DM or InMail. Under 80 words. Conversational. Reference something specific. One question.",
  twitter:
    "Twitter/X DM. Under 50 words. Ultra-casual. No pitching. Start a conversation, not a sales cycle.",
};

const toneGuide: Record<Tone, string> = {
  direct: "Direct and confident. State value clearly. No fluff. Respect their time.",
  curious: "Lead with genuine curiosity. Ask a smart question that shows research.",
  value_first:
    "Give something useful upfront — an insight, stat, observation. Then connect to offering.",
};

export function buildSystemPrompt(channel: Channel, tone: Tone): string {
  return `You are a world-class B2B outbound copywriter. You write messages that get replies because they feel human, specific, and valuable.

RULES:
- Never use "I hope this finds you well", "I came across your profile", "I'd love to pick your brain", or any generic opener
- Never use exclamation marks in the first sentence
- Never lead with your company name or what you do
- Personalization must reference SPECIFIC details from the prospect info
- Every message must have exactly ONE clear call-to-action
- No buzzwords: "synergy", "leverage", "innovative", "cutting-edge", "game-changer"
- Subject lines (email only): max 5 words, lowercase, feel like an internal email
- Write at 8th grade reading level. Short sentences. Clear words.

CHANNEL: ${channelGuide[channel]}
TONE: ${toneGuide[tone]}

RESPOND ONLY WITH VALID JSON. No markdown. No backticks. No preamble.`;
}

export function buildUserPrompt(
  channel: Channel,
  prospect: string,
  valueProps: string,
  context?: string
): string {
  const subjectField =
    channel === "cold_email"
      ? '"subject": "subject line (max 5 words, lowercase)",'
      : "";

  return `Generate 3 outreach messages for this prospect. Each must use a DIFFERENT strategic angle.

PROSPECT INFO:
${prospect}

VALUE PROPOSITION:
${valueProps}

${context ? `ADDITIONAL CONTEXT:\n${context}` : ""}

Return this exact JSON structure:
{
  "messages": [
    {
      "angle": "Name of angle (2-4 words)",
      "strategy": "One-word label (Pain, Social Proof, Trigger Event, Mutual Connection, Insight, Challenge)",
      ${subjectField}
      "body": "The message text",
      "reasoning": "1-2 sentences on why this works for this prospect"
    }
  ]
}`;
}
