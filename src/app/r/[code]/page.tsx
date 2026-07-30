import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

const REGISTRY_API = 'https://gather-registry.vercel.app/api/affiliate'

// Destination map — where each affiliate link leads by venture
const DESTINATIONS: Record<string, string> = {
  default: 'https://southernlegends.blog/merch',
  merch: 'https://southernlegends.blog/merch',
  shop: 'https://ecclesiacommunity.org/shop',
  books: 'https://southernlegends.blog/books',
}

async function recordClick(code: string): Promise<string | null> {
  try {
    const res = await fetch(`${REGISTRY_API}?code=${encodeURIComponent(code)}&action=click`, {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) return null
    const data = await res.json()
    // Registry returns the affiliate venture/tags so we can route properly
    return data.venture || 'southern-legends'
  } catch {
    return null
  }
}

interface Props {
  params: { code: string }
  searchParams: { dest?: string }
}

export default async function ReferralRedirect({ params, searchParams }: Props) {
  const code = params.code
  if (!code || code.length < 3) notFound()

  // Record the click (fire-and-forget on server; we await but ignore failure)
  await recordClick(code)

  // Route to correct destination
  const destKey = searchParams.dest || 'default'
  const destination = DESTINATIONS[destKey] || DESTINATIONS.default

  // Append affiliate code as query param for downstream tracking
  const url = new URL(destination)
  url.searchParams.set('ref', code)

  redirect(url.toString())
}

export async function generateMetadata({ params }: Props) {
  return {
    title: 'Southern Legends',
    robots: { index: false, follow: false },
  }
}
