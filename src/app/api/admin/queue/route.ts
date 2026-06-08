import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const pin = req.headers.get("x-admin-pin");
  if (pin !== process.env.ADMIN_PIN) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const dir = path.join(process.cwd(), "content/profiles");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx")).sort().reverse();

  const profiles = files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const slug = file.replace(/\.mdx$/, "");
    const get = (key: string) => { const m = raw.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?`, "m")); return m?.[1]?.trim() ?? ""; };
    return {
      slug,
      title: get("title"),
      date: get("date"),
      published: get("published") !== "false",
    };
  });

  return NextResponse.json({ ok: true, profiles });
}
