import { NextRequest, NextResponse } from 'next/server'

const REGISTRY_API = 'https://gather-registry.vercel.app/api/affiliate'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, notes } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email required' }, { status: 400 })
    }

    const res = await fetch(REGISTRY_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        venture_slug: 'southern-legends',
        notes: notes || '',
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json({ code: data.code })
  } catch (err) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })

  try {
    const res = await fetch(`${REGISTRY_API}?code=${encodeURIComponent(code)}`, {
      cache: 'no-store',
    })
    if (!res.ok) return NextResponse.json({ error: 'not found' }, { status: 404 })
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
