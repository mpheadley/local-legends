import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";

function verifyToken(commentId: string, token: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(commentId).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

function html(title: string, body: string): NextResponse {
  return new NextResponse(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>body{font-family:Georgia,serif;max-width:480px;margin:80px auto;padding:0 1.5rem;color:#292524}h1{font-size:1.5rem;margin-bottom:.5rem}p{color:#57534e}</style></head><body>${body}</body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const secret = process.env.COMMENT_APPROVE_SECRET?.trim();

  if (!id || !token || !secret) {
    return html("Invalid link", "<h1>Invalid link</h1><p>This approval link is missing required parameters.</p>");
  }

  if (!verifyToken(id, token, secret)) {
    return html("Invalid token", "<h1>Invalid token</h1><p>This link is invalid or has been tampered with.</p>");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !supabaseKey) {
    return html("Server error", "<h1>Server error</h1><p>Database not configured.</p>");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase
    .from("comments")
    .update({ approved: true })
    .eq("id", id);

  if (error) {
    console.error("Approve error:", error);
    return html("Error", "<h1>Something went wrong</h1><p>Could not approve the comment. Try approving in the Supabase dashboard.</p>");
  }

  return html(
    "Comment approved",
    "<h1>Comment approved.</h1><p>It&rsquo;s now live on the site.</p>"
  );
}
