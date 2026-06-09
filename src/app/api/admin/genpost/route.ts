import { NextRequest, NextResponse } from "next/server";
import { spawnSync } from "child_process";

function checkPin(req: NextRequest) {
  return req.headers.get("x-admin-pin") === process.env.ADMIN_PIN;
}

const CLAUDE_BIN = process.env.CLAUDE_BIN ?? "/Users/matthewheadley1/.local/bin/claude";

const SYSTEM = `Write a Facebook post for Southern Legends — a storytelling publication about real people from the American South.

Voice rules:
- Warm, specific, earned. Scene over summary. One telling detail does the work of a paragraph.
- Never use: elevate, seamless, journey, experience (as generic noun), passionate, dedicated, stunning, unforgettable, curated, bespoke, transformative.
- Short sentences. Vary the rhythm. Don't announce the point — let the detail carry it.
- 2-3 sentences max. End with the article link on its own line.

Write a Facebook post promoting the article. Output ONLY the post text, no labels, no quotes.`;

export async function POST(req: NextRequest) {
  if (!checkPin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { message, link } = await req.json();
  if (!message && !link) return NextResponse.json({ error: "message or link required" }, { status: 400 });

  const prompt = `${SYSTEM}\n\nArticle context: ${message || ""}\nLink: ${link || ""}`;

  const result = spawnSync(CLAUDE_BIN, ["-p", prompt], { timeout: 30000, encoding: "utf-8" });
  if (result.error) return NextResponse.json({ error: "claude CLI not available: " + result.error.message }, { status: 500 });
  if (result.status !== 0) return NextResponse.json({ error: result.stderr || "Generation failed" }, { status: 500 });

  const post = result.stdout.trim();
  return NextResponse.json({ ok: true, post });
}
