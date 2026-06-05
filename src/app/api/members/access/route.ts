import { NextRequest, NextResponse } from 'next/server'
import { hasActiveSubscription, mintMemberToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/subscribers'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  const isActive = await hasActiveSubscription(email)

  if (!isActive) {
    // Don't reveal whether email exists — just say not found
    return NextResponse.json(
      { error: 'No active membership found for that email. Check your spelling or subscribe below.' },
      { status: 403 }
    )
  }

  const token = await mintMemberToken(email)

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
  return res
}
