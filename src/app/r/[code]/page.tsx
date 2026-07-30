import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { DESTINATIONS } from '@/lib/affiliate-catalog'

const REGISTRY_API = 'https://gather-registry.vercel.app/api/affiliate'

async function recordClick(code: string) {
  try {
    await fetch(`${REGISTRY_API}?code=${encodeURIComponent(code)}&action=click`, {
      method: 'GET',
      cache: 'no-store',
    })
  } catch {
    // non-blocking
  }
}

interface Props {
  params: Promise<{ code: string }>
  searchParams: Promise<{ dest?: string }>
}

export default async function ReferralRedirect({ params, searchParams }: Props) {
  const { code } = await params
  const { dest } = await searchParams

  if (!code || code.length < 3) notFound()

  await recordClick(code)

  const destination = DESTINATIONS[dest || 'default'] || DESTINATIONS['default']

  const url = new URL(destination)
  url.searchParams.set('ref', code)

  redirect(url.toString())
}

export async function generateMetadata() {
  return {
    title: 'Southern Legends',
    robots: { index: false, follow: false },
  }
}
