import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { text } = await req.json()
  if (!text) return NextResponse.json({ error: 'text required' }, { status: 400 })

  const key = process.env.DEEPGRAM_API_KEY
  if (!key) return NextResponse.json({ error: 'DEEPGRAM_API_KEY not set' }, { status: 500 })

  const res = await fetch('https://api.deepgram.com/v1/speak?model=aura-asteria-en', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text.slice(0, 3000) }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: res.status })
  }

  const audio = await res.arrayBuffer()
  return new NextResponse(audio, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
