'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FW = 'https://matt-headley-shop.fourthwall.com'

// ─── Full catalog — all products link directly to Fourthwall ───────────────

const SHIRTS = [
  {
    id: 'pv-raiders-xc',
    name: 'PV Raiders XC',
    tagline: 'Run Like You Stole It.',
    sub: '25% of every sale → Raiders XC program.',
    price: '$30',
    photo: '/merch/pv-shirt-mockup.webp',
    url: `${FW}/products/pv-raiders-xc-pirate-tee`,
    badge: 'Fundraiser',
    badgeColor: '#9A3412',
  },
  {
    id: 'freedom-riders',
    name: 'Freedom Riders — Anniston, 1961',
    tagline: 'May 14, 1961. Highway 202. The bus burned.',
    sub: '25% of every sale → West Anniston Foundation.',
    price: '$40',
    photo: '/merch/freedom-riders/v2-ink-on-cream.png',
    url: `${FW}/products/freedomriders-anniston-1961`,
    badge: 'Memorial',
    badgeColor: '#1a1a2e',
  },
  {
    id: 'model-city-light',
    name: 'The Model City (Light)',
    tagline: 'Anniston, Alabama — Est. 1872',
    sub: 'Light colorways — Mustard, Ice Blue, Crimson, Green.',
    price: '$29',
    photo: '/merch/model-city-clt-overview.webp',
    url: `${FW}/products/the-model-city-anniston-alabama-light-version`,
  },
  {
    id: 'model-city',
    name: 'The Model City',
    tagline: 'Anniston, Alabama — Est. 1872',
    sub: 'Dark colorways — Black, Navy, Sage, Midnight.',
    price: '$29',
    photo: '/merch/model-city-shirt.webp',
    url: `${FW}/products/the-model-city-anniston-alabama`,
  },
  {
    id: 'clt',
    name: 'Chief Ladiga Trail',
    tagline: '1832 · 2032',
    sub: 'Anniston to Piedmont · 33.5 miles. Ivory, Moss, Denim.',
    price: '$35',
    photo: '/merch/clt-trail.webp',
    url: `${FW}/products/chief-ladiga-trail-1832-2032`,
  },
  {
    id: 'bloom-bar',
    name: 'The Bloom Bar Tee',
    tagline: 'by Heather Florals',
    sub: 'Illustrated flower cart. Light pink.',
    price: '$29',
    photo: '/merch/bloom-bar-tee.webp',
    url: `${FW}/products/the-bloom-bar-tee`,
  },
  {
    id: 'aisle',
    name: 'The Aisle — Oct 18, 2026',
    tagline: "Anniston's first curated bridal show.",
    sub: 'Founding vendors on the back. Pink.',
    price: '$29',
    photo: '/merch/aisle-bloom-bar-shirt.webp',
    url: `${FW}/products/the-aisle-tee`,
    badge: 'Event',
    badgeColor: '#7c3d5e',
  },
  {
    id: 'multitudes',
    name: 'I Contain Multitudes',
    tagline: 'Ivory · Moss · Denim · Brick.',
    sub: 'For the complicated ones.',
    price: '$29',
    photo: 'https://imgproxy.fourthwall.dev/IMNy3eu4RC0MEIbGmpUUg-5yMjSRyFtKLGn1Mjh5S84/w:800/sm:1/enc/ZedkaYftBaqinaIZ/Jr40_xy3Eb4tySwk/rScelYdmKxyZS6jZ/NJHeSvZlktqX-xYh/WSHRJ-RhgMHeSlMQ/27Iq7L_pckKRXOOp/v5oIB6B1Vnyt8g_D/jmvq7ZBuLrTpLBdn/gKhmeo_IvtrJEkf4/Yfl8j3qjiOOsC3F3/Z2VGxXEwJGMrAnzQ/2Xzk5fe0iRKeZTw2/UCV0r3RWKam0aN3r/8xpuJ8LPfqX3Axj4/fUq1cLuAVw8.jpg',
    url: `${FW}/products/i-contain-multitudes`,
  },
  {
    id: 'still-here',
    name: 'Still Here',
    tagline: 'Brick · Black · Navy · Pepper.',
    sub: 'For everyone who stayed.',
    price: '$29',
    photo: 'https://imgproxy.fourthwall.com/FyWryySt9e8_rzT3yE6eItoqF6GstCkbBJSuL62LpoY/w:800/sm:1/enc/kZytLUESOJY7WIq3/mQmU8CAxU0TQJrD2/LFh8Y-uqr4QKxZUr/-r3HZV9rDnJj-a9U/SY5J9AEtq4g5o7L3/JwKTj1OyPau1R0tC/tTw60OgXWBZkD6Hu/wWE8ibGTgAZsKMsY/WTotCATD8-xnovcw/FEwNfv2JgknjHnf0/ug0yHPZ7pcf3JZ2i/bZ0phQZB_NTgL9ld/E3bYmALpumGY4hCG/Su9KSvpN3h6FOoRK/dNXM-cTSQcw',
    url: `${FW}/products/still-here`,
  },
  {
    id: 'bipolar',
    name: 'Bipolar & Proud',
    tagline: 'Denim · Black · Navy · Pepper.',
    sub: 'Mental health pride. No shame.',
    price: '$29',
    photo: 'https://imgproxy.fourthwall.com/h_96A1MIPtOTIaIiYVWIX71opxpo5aTClEo1w5juBqs/w:800/sm:1/enc/6cyztRuBMcyK5yJ6/qW27rarZs034xiqO/uIEdXZ3wyNpBYfZu/bLqZxDSki3uIG-wV/r6rKWmuVX7Ij7c2u/T76KUWv84U9RwuRI/LB9zHEDBJydUE_RF/J14NCV4M8fBZ1kaa/FXRwj95Ef9XIM9Bo/lZsxWinD2qG6FKf5/Zwg8Tzn0duzfC-NX/OETz1p97N3Efixji/_IxGEL89KxkwdZis/XH8gGKHP_ZwkNzcR/-b99RXRadmU',
    url: `${FW}/products/bipolar-and-proud`,
  },
]

const TOTES = [
  {
    id: 'model-city-tote',
    name: 'The Model City Tote',
    tagline: 'Anniston, Alabama',
    sub: 'Cream canvas. DTF print. Handmade in Alabama.',
    price: '$22',
    photo: '/merch/model-city-tote.webp',
    url: `${FW}/products/model-city-tote`,
    badge: 'In stock',
    badgeColor: '#166534',
  },
  {
    id: 'clt-tote',
    name: 'Chief Ladiga Trail Tote',
    tagline: '1832 · 2032 · Southern Legends',
    sub: 'Cream canvas. Trail map on back. DTF print.',
    price: '$22',
    photo: '/merch/clt-tote.webp',
    url: `${FW}/products/chief-ladiga-trail-tote`,
    badge: 'In stock',
    badgeColor: '#166534',
  },
]

const STICKERS = [
  {
    id: 'clt-sticker-round',
    name: 'Chief Ladiga Trail',
    tagline: '3" round · Matte. southernlegends.blog',
    price: '$4',
    photo: '/merch/clt-sticker-stack.webp',
    url: `${FW}/products/chief-ladiga-trail-sticker`,
    badge: 'In stock',
  },
  {
    id: 'sl-sticker',
    name: 'Southern Legends',
    tagline: 'NE Alabama pride.',
    price: '$4',
    photo: '/merch/sl-sticker.webp',
    url: `${FW}/products/southern-legends-sticker`,
  },
  {
    id: 'raiders-sticker',
    name: 'PV Raiders XC',
    tagline: 'Run Like You Stole It.',
    price: '$4',
    photo: '/merch/raiders-sticker.webp',
    url: `${FW}/products/pv-raiders-xc-sticker`,
  },
  {
    id: 'woodstock-sticker',
    name: 'Woodstock 5K',
    tagline: 'Anniston, AL · Aug 2.',
    price: '$4',
    photo: '/merch/woodstock-sticker.webp',
    url: `${FW}/products/woodstock-5k-sticker`,
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────

export default function MerchPage() {
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifySent, setNotifySent] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const onScroll = () => { hero.style.backgroundPositionY = `${window.scrollY * 0.35}px` }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const success = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('success') === '1'

  async function submitNotify(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: notifyEmail, tag: 'merch-notify' }),
    })
    setNotifySent(true)
  }

  return (
    <main id="main-content" className="min-h-screen relative" style={{ background: 'var(--color-ll-dark)', color: 'var(--color-ll-warm)' }}>

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="gradient-hero no-pseudo-topo relative overflow-hidden"
        style={{ minHeight: '60vh' }}
      >
        <div aria-hidden="true" className="grid-topo" />
        <div className="absolute inset-0 z-[1]" style={{
          background: 'linear-gradient(155deg, rgba(28,25,23,0.88) 0%, rgba(154,52,18,0.12) 55%, rgba(28,25,23,0.95) 100%)',
        }} />
        <div className="absolute inset-x-0 bottom-0 h-40 z-[1]" style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-ll-dark))',
        }} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-20 pointer-events-auto">
          {success && (
            <div className="mb-8 px-5 py-4 rounded-xl text-sm" style={{ background: 'rgba(34,85,34,0.3)', border: '1px solid rgba(100,200,100,0.25)', color: '#6dcf6d' }}>
              Order received — check your email for confirmation.
            </div>
          )}

          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(202,138,4,0.7)' }}>
            Southern Legends · NE Alabama
          </p>
          <h1
            className="font-black leading-none mb-5"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3.2rem, 8vw, 5.5rem)',
              color: 'var(--color-ll-warm)',
              textShadow: '0 2px 24px rgba(0,0,0,0.5)',
            }}
          >
            Local Merch.
          </h1>
          <p className="text-base max-w-xl leading-relaxed mb-8" style={{ color: 'rgba(240,237,230,0.5)' }}>
            Shirts, totes, and stickers rooted in NE Alabama — schools, trails, races, and the stories behind them.
            Order online or find us at the Woodstock 5K booth, Aug 2.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { t: 'Ships from Fourthwall', c: 'rgba(240,237,230,0.4)' },
              { t: '25% → Raiders XC', c: '#4ade80' },
              { t: 'Cash · Venmo · Square at booth', c: 'rgba(240,237,230,0.3)' },
            ].map(p => (
              <span key={p.t} className="text-xs px-3 py-1.5 rounded-full" style={{ border: `1px solid ${p.c}`, color: p.c, letterSpacing: '0.06em' }}>{p.t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-24">

        {/* ── SHIRTS ── */}
        <SectionHead label="Shirts" sub="All orders through Fourthwall · Ships to your door" />
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}>
          {SHIRTS.map(d => (
            <ProductCard key={d.id} item={d} />
          ))}
        </div>

        {/* ── TOTES ── */}
        <SectionHead label="Totes" sub="Physical inventory · Cream canvas · DTF print · Ships fast" />
        <div className="grid gap-5 mb-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}>
          {TOTES.map(d => (
            <ProductCard key={d.id} item={d} />
          ))}
        </div>
        <div className="mb-4 px-5 py-4 rounded-xl text-sm" style={{ background: 'rgba(22,101,52,0.12)', border: '1px solid rgba(22,101,52,0.3)' }}>
          <span style={{ color: '#4ade80', fontWeight: 700 }}>In stock now</span>
          <span style={{ color: 'rgba(240,237,230,0.5)' }}> — Model City and CLT totes available immediately. Order online or grab one at the Woodstock booth Aug 2.</span>
        </div>

        {/* ── STICKERS ── */}
        <SectionHead label="Stickers" sub="3&quot; vinyl · Matte · Weather-resistant · $4 each" />
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {STICKERS.map(d => (
            <ProductCard key={d.id} item={d} small />
          ))}
        </div>

        {/* ── BROWSE ALL ── */}
        <div className="mt-12 text-center">
          <a
            href={`${FW}/collections/all`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-85"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(240,237,230,0.15)', color: 'var(--color-ll-warm)', letterSpacing: '0.06em' }}
          >
            Browse full shop on Fourthwall →
          </a>
        </div>

        <Rule />

        {/* ── WOODSTOCK BOOTH ── */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'rgba(154,52,18,0.1)', border: '1px solid rgba(154,52,18,0.2)', backdropFilter: 'blur(8px)' }}>
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--color-ll-primary-light)' }}>Woodstock 5K · Aug 2</p>
          <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Find us at the booth</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(240,237,230,0.5)' }}>
            Woodstock Avenue, Anniston. Cash, Venmo, or Square.
            Pre-orders through Fourthwall ship 2–3 weeks after the race.
            25% of PV Raiders tee sales go to the XC program.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { l: 'At the booth', v: 'Cash · Venmo · Square' },
              { l: 'Athletes & coaches', v: 'Ask about team pricing' },
              { l: 'Custom orders', v: 'matt@southernlegends.blog' },
            ].map(({ l, v }) => (
              <div key={l}>
                <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(240,237,230,0.25)' }}>{l}</p>
                <p className="text-sm" style={{ color: 'rgba(240,237,230,0.55)' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── NOTIFY ── */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,237,230,0.06)' }}>
          <h2 className="text-lg font-black mb-1" style={{ fontFamily: 'var(--font-heading)' }}>New drops — get notified</h2>
          <p className="text-sm mb-4" style={{ color: 'rgba(240,237,230,0.4)' }}>Freedom Riders, Aisle, Cheaha Mountain, and more in progress.</p>
          <form onSubmit={submitNotify} className="flex gap-3 max-w-md">
            <input
              type="email" required placeholder="Your email"
              value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,237,230,0.12)', color: 'var(--color-ll-warm)', outline: 'none' }}
            />
            <button type="submit" disabled={notifySent}
              className="px-5 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: 'var(--color-ll-accent)', color: '#1C1917', cursor: notifySent ? 'default' : 'pointer', opacity: notifySent ? 0.7 : 1 }}
            >{notifySent ? '✓ Got it' : 'Notify me'}</button>
          </form>
        </div>

        {/* ── SUPPORT ── */}
        <div id="support" className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(240,237,230,0.05)' }}>
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(202,138,4,0.5)' }}>Southern Legends</p>
          <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Support the publication</h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(240,237,230,0.4)' }}>
            Every story is free. A monthly contribution keeps the archives growing.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/newsletter" className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90"
              style={{ background: 'var(--color-ll-primary)', color: 'var(--color-ll-warm)' }}>
              Subscribe free →
            </Link>
            <a href="mailto:matt@southernlegends.blog" className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-ll-warm)', border: '1px solid rgba(240,237,230,0.1)' }}>
              Founding Patron inquiry
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}

// ─── Components ────────────────────────────────────────────────────────────

type ProductItem = {
  id: string; name: string; tagline: string; sub?: string; price: string;
  photo: string; url: string; badge?: string; badgeColor?: string;
}

function ProductCard({ item, small }: { item: ProductItem; small?: boolean }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-2xl overflow-hidden block transition-all duration-200 group"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(240,237,230,0.08)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: small ? '1' : '4/5' }}>
        <Image
          src={item.photo}
          alt={item.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          sizes={small ? '220px' : '(max-width: 640px) 100vw, 320px'}
        />
        {item.badge && (
          <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: item.badgeColor ?? '#9A3412', color: '#fff', letterSpacing: '0.06em' }}>
            {item.badge}
          </span>
        )}
        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}>
          <span className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg"
            style={{ background: 'var(--color-ll-primary)', color: 'var(--color-ll-warm)' }}>
            Buy on Fourthwall →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h2 className="font-black text-sm leading-tight flex-1 mr-2" style={{ fontFamily: 'var(--font-heading)' }}>{item.name}</h2>
          <span className="font-black text-sm flex-shrink-0" style={{ color: 'var(--color-ll-primary-light)' }}>{item.price}</span>
        </div>
        <p className="text-xs mb-0.5" style={{ color: 'rgba(240,237,230,0.4)' }}>{item.tagline}</p>
        {item.sub && <p className="text-xs" style={{ color: 'rgba(202,138,4,0.6)' }}>{item.sub}</p>}
      </div>
    </a>
  )
}

function SectionHead({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="mt-14 mb-6">
      <div className="flex items-center gap-4 mb-1">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(154,52,18,0.6), transparent)' }} />
        <p className="text-xs tracking-[0.35em] uppercase font-bold" style={{ color: 'var(--color-ll-primary-light)' }}>{label}</p>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(154,52,18,0.6), transparent)' }} />
      </div>
      <p className="text-xs text-center" style={{ color: 'rgba(240,237,230,0.28)', letterSpacing: '0.06em' }}>{sub}</p>
    </div>
  )
}

function Rule() {
  return <div className="my-12 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(202,138,4,0.25), transparent)' }} />
}
