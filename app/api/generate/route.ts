import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";
import { isRateLimited } from "@/lib/rate-limit";
import type { Channel, Tone } from "@/lib/types";

const VALID_CHANNELS: Channel[] = ["cold_email", "linkedin", "twitter"];
const VALID_TONES: Tone[] = ["direct", "curious", "value_first"];

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limited. Try again in a minute." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { channel, prospect, valueProps, context, tone } = body as {
    channel: string;
    prospect: string;
    valueProps: string;
    context?: string;
    tone: string;
  };

  if (!channel || !prospect || !valueProps || !tone) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!VALID_CHANNELS.includes(channel as Channel)) {
    return NextResponse.json({ error: "Invalid channel" }, { status: 400 });
  }

  if (!VALID_TONES.includes(tone as Tone)) {
    return NextResponse.json({ error: "Invalid tone" }, { status: 400 });
  }

  if (
    prospect.length > 3000 ||
    valueProps.length > 2000 ||
    (context && typeof context === "string" && context.length > 1000)
  ) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  const systemPrompt = buildSystemPrompt(channel as Channel, tone as Tone);
  const userPrompt = buildUserPrompt(
    channel as Channel,
    prospect,
    valueProps,
    typeof context === "string" ? context : undefined
  );

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 1500,
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0]?.message?.content || "";
    let parsed: { messages?: unknown[] };

    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("Failed to parse Groq response:", text);
      return NextResponse.json(
        { error: "Unexpected response. Try again." },
        { status: 500 }
      );
    }

    if (!parsed.messages || !Array.isArray(parsed.messages)) {
      console.error("Invalid response structure:", parsed);
      return NextResponse.json(
        { error: "Invalid response. Try regenerating." },
        { status: 500 }
      );
    }

    return NextResponse.json({ messages: parsed.messages });
  } catch (err) {
    console.error("Groq API error:", err);
    return NextResponse.json(
      { error: "Failed to generate messages. Try again." },
      { status: 500 }
    );
  }
}
