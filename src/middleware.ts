import { NextRequest, NextResponse } from 'next/server'
import { verifyMemberToken, COOKIE_NAME } from '@/lib/subscribers'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/members')) {
    return NextResponse.next()
  }

  // Let login page through — it's the gate itself
  if (pathname === '/members/login') {
    return NextResponse.next()
  }

  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) {
    return NextResponse.redirect(new URL('/members/login', req.url))
  }

  const email = await verifyMemberToken(token)
  if (!email) {
    const res = NextResponse.redirect(new URL('/members/login', req.url))
    res.cookies.delete(COOKIE_NAME)
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/members/:path*'],
}
