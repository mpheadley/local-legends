import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Merch',
  description: 'Local shirts, stickers, and trail gear for NE Alabama schools, races, and trails. Woodstock 5K pre-order open — ships after the race.',
  alternates: {
    canonical: '/merch',
  },
  openGraph: {
    url: '/merch',
  },
}

export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return children
}
