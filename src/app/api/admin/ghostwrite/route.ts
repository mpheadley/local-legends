import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const pin = req.headers.get("x-admin-pin");
  if (pin !== process.env.ADMIN_PIN) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { angle } = await req.json();
  if (!angle?.trim()) return NextResponse.json({ ok: false, error: "Angle required" }, { status: 400 });

  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    system: `You write Facebook captions for Southern Legends, a profile-based editorial site about the people, places, and small businesses of the American South — specifically Northeast Alabama and surroundings.

Voice: Warm, specific, narrative. Southern without being corny. You write about real people respectfully and with genuine admiration. Short sentences. Concrete details. No adjective pileups. No AI slop words.

Write a Facebook caption: 2-3 sentences max. End with a gentle invitation to read or share. No hashtags.`,
    messages: [{ role: "user", content: `Write a Facebook caption for this angle: ${angle}` }],
  });

  const post = (msg.content[0] as { text: string }).text.trim();
  return NextResponse.json({ ok: true, post });
}
