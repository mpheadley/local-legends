import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 3600 // 1-hour edge cache

interface VideoStats {
  videoId: string
  title: string
  viewCount: string
  likeCount: string
  publishedAt: string
}

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get('videoId')
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return NextResponse.json({ error: 'Invalid videoId' }, { status: 400 })
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'YOUTUBE_API_KEY not set' }, { status: 500 })
  }

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
  const res = await fetch(url, { next: { revalidate: 3600 } })

  if (!res.ok) {
    return NextResponse.json({ error: 'YouTube API error' }, { status: 502 })
  }

  const data = await res.json() as {
    items?: Array<{
      id: string
      snippet: { title: string; publishedAt: string }
      statistics: { viewCount?: string; likeCount?: string }
    }>
  }

  const item = data.items?.[0]
  if (!item) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  const stats: VideoStats = {
    videoId: item.id,
    title: item.snippet.title,
    viewCount: item.statistics.viewCount ?? '0',
    likeCount: item.statistics.likeCount ?? '0',
    publishedAt: item.snippet.publishedAt,
  }

  return NextResponse.json(stats)
}
