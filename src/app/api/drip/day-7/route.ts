import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// POST /api/drip/day-7 { email, firstName? }
// Called 7 days after subscribe — $4.99 Reader pitch
export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey || !resend) {
    return NextResponse.json({ error: 'Email not configured' }, { status: 500 })
  }

  let body: { email: string; firstName?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const email = body.email?.trim()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const greeting = body.firstName ? `${body.firstName},` : 'Hey,'

  const html = `
    <p>${greeting}</p>
    <p>Southern Legends is free to read. It's always going to be free to read.</p>
    <p>But if you've found something here worth keeping — a profile, a place essay, a story you passed along —
    there's a Reader tier for $4.99/month that helps me keep doing this.</p>
    <p>What it is: you help cover the time it takes to write this. That's the whole pitch.</p>
    <p>What you get: early access to pieces before they publish publicly, and occasional notes from me
    about what I'm working on.</p>
    <p><a href="https://southernlegends.blog/subscribe">Become a Reader ($4.99/mo) →</a></p>
    <p>If not, no change. The free feed keeps going. I'm glad you're here either way.</p>
    <p>Matt</p>
  `

  const text = `${greeting}

Southern Legends is free to read. It's always going to be free to read.

But if you've found something here worth keeping — a profile, a place essay, a story you passed along — there's a Reader tier for $4.99/month that helps me keep doing this.

What it is: you help cover the time it takes to write this. That's the whole pitch.

What you get: early access to pieces before they publish publicly, and occasional notes from me about what I'm working on.

Become a Reader ($4.99/mo): https://southernlegends.blog/subscribe

If not, no change. The free feed keeps going. I'm glad you're here either way.

Matt`

  const { error } = await resend.emails.send({
    from: 'Matt Headley <noreply@gatherstudio.app>',
    to: email,
    subject: 'If you want to help keep this going',
    html,
    text,
  })

  if (error) {
    console.error('[drip/day-7] Resend error:', error)
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
