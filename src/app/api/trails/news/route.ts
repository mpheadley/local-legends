import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const NEWS_FILE = "/Volumes/Samsung_T5/webdev/logs/trail-news.json"

type NewsItem = {
  title: string
  url: string
  source: string
  date?: string
  trail_slug?: string
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")

  try {
    if (!fs.existsSync(NEWS_FILE)) {
      return NextResponse.json({ items: [] })
    }

    const raw = JSON.parse(fs.readFileSync(NEWS_FILE, "utf-8"))
    const items: NewsItem[] = raw.items ?? []

    const filtered = slug
      ? items.filter(i => !i.trail_slug || i.trail_slug === slug)
      : items

    return NextResponse.json({
      items: filtered.slice(0, 10),
      generated: raw.generated,
    })
  } catch {
    return NextResponse.json({ items: [] })
  }
}
