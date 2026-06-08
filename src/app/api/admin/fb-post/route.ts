import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const pin = req.headers.get("x-admin-pin");
  if (pin !== process.env.ADMIN_PIN) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const { message, link } = await req.json();
  if (!message?.trim()) return NextResponse.json({ ok: false, error: "Message required" }, { status: 400 });

  const token = process.env.FB_SL_PAGE_TOKEN;
  const pageId = process.env.FB_SL_PAGE_ID;
  if (!token || !pageId) return NextResponse.json({ ok: false, error: "FB credentials not configured" }, { status: 500 });

  const body: Record<string, string> = { message, access_token: token };
  if (link?.trim()) body.link = link.trim();

  const res = await fetch(`https://graph.facebook.com/v19.0/${pageId}/feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (data.id) {
    return NextResponse.json({ ok: true, post_url: `https://www.facebook.com/${data.id}` });
  }
  return NextResponse.json({ ok: false, error: data.error?.message ?? "Unknown error" });
}
