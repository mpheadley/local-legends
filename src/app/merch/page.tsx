'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MERCH, type MerchItem } from '@/lib/merch'
import ShirtMockup from '@/components/ShirtMockup'

const SHIRTS    = MERCH.filter(m => m.category === 'shirt' && m.available)
const TOTES     = MERCH.filter(m => m.category === 'tote' && m.available)
const STICKERS  = MERCH.filter(m => m.category === 'sticker' && m.available)
const PRINTS    = MERCH.filter(m => m.category === 'print' && m.available)
const MAGAZINES = MERCH.filter(m => m.category === 'magazine' && m.available)

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

      <div ref={heroRef} className="gradient-hero no-pseudo-topo relative overflow-hidden" style={{ minHeight: '72vh' }}>
        <div aria-hidden="true" className="grid-topo" />
        <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(155deg, rgba(6,13,9,0.96) 0%, rgba(154,52,18,0.08) 50%, rgba(6,13,9,0.55) 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-40 z-[1]" style={{ background: 'linear-gradient(to bottom, transparent, var(--color-ll-dark))' }} />

        {/* ── Right-side shirt collage (desktop only) ── */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 z-[2]" style={{ width: '44%', overflow: 'hidden' }}>
          {/* gradient edge fade left */}
          <div className="absolute inset-y-0 left-0 w-24 z-10" style={{ background: 'linear-gradient(to right, var(--color-ll-dark), transparent)' }} />
          <div className="grid h-full" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 4 }}>
            <img src="/merch/clt-hike-explore-mockup.webp" alt="CLT Hike & Explore tee" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
            <img src="/merch/model-city-mockup-cream.webp" alt="Model City Anniston tee" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
            <img src="/merch/freedom-riders/shirt-mockup-dark.webp" alt="Freedom Riders tee" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
            <img src="/merch/clt-shirt-front-mockup.jpg" alt="CLT Trail shirt" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-20 pointer-events-auto" style={{ maxWidth: 'min(960px, 56vw)' }}>
          {success && (
            <div className="mb-8 px-5 py-4 rounded-xl text-sm" style={{ background: 'rgba(34,85,34,0.3)', border: '1px solid rgba(100,200,100,0.25)', color: '#6dcf6d' }}>
              Order received — check your email for confirmation.
            </div>
          )}
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(202,138,4,0.7)' }}>Southern Legends · NE Alabama</p>
          <h1 className="font-black leading-[0.92] mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3.4rem, 8vw, 6rem)', color: 'var(--color-ll-warm)', textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}>
            Wear<br />the Story.
          </h1>
          <p className="text-base max-w-lg leading-relaxed mb-8" style={{ color: 'rgba(240,237,230,0.6)' }}>
            Shirts, totes, stickers, and prints from NE Alabama — schools, trails, races, and the stories behind them.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { t: 'Secure checkout via Stripe', c: 'rgba(240,237,230,0.4)' },
              { t: '25% → Raiders XC', c: '#4ade80' },
              { t: 'Cash · Square at booth Aug 2', c: 'rgba(240,237,230,0.3)' },
            ].map(p => (
              <span key={p.t} className="text-xs px-3 py-1.5 rounded-full" style={{ border: `1px solid ${p.c}`, color: p.c, letterSpacing: '0.06em' }}>{p.t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-2">

        <p className="text-xs mb-8 leading-relaxed" style={{ color: 'rgba(240,237,230,0.3)', letterSpacing: '0.03em' }}>
          Images are design mockups. Actual print colors, placement, and fabric may vary slightly. All items are made to order — no two prints are identical.
        </p>

        {/* Featured — CLT hero banner */}
        <Link href="/merch/chief-ladiga" style={{ display: 'block', borderRadius: '14px', overflow: 'hidden', textDecoration: 'none', position: 'relative', minHeight: '200px', background: '#0d1a0e', marginBottom: '1rem' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(6,13,9,0.95) 0%, rgba(45,90,48,0.35) 60%, rgba(6,13,9,0.7) 100%)' }} />
          <div style={{ position: 'relative', padding: '2rem', maxWidth: '520px' }}>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A227', fontWeight: 700 }}>Aug 2 · Woodstock 5K · LIMITED RUN</span>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, color: '#f0ede8', margin: '0.5rem 0 0.4rem', lineHeight: 1.1 }}>Chief Ladiga Trail Shirt</p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(240,237,230,0.55)', marginBottom: '1.1rem' }}>Natural triblend sublimation · Front badge + back trail map · 55 made</p>
            <span style={{ display: 'inline-block', background: '#E8722A', color: '#fff', fontWeight: 900, fontSize: '0.85rem', padding: '0.55rem 1.25rem', borderRadius: '8px', letterSpacing: '0.04em' }}>Get yours — $40 →</span>
          </div>
        </Link>

        {/* Featured collections */}
        <div className="grid gap-4 mb-10" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          <Link href="/merch/pvxc" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', textDecoration: 'none', position: 'relative', minHeight: '160px', background: '#111' }}>
            <Image src="/merch/pv-shirt-mockup.webp" alt="PV Raiders XC" fill className="object-cover" style={{ objectPosition: 'center 20%', opacity: 0.55 }} sizes="320px" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)' }} />
            <div style={{ position: 'relative', padding: '1.5rem' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C8102E', fontWeight: 700 }}>Aug 2 · Woodstock 5K</span>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, color: '#f0ede8', margin: '0.35rem 0 0.25rem', lineHeight: 1.1 }}>PV Raiders XC</p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(240,237,232,0.5)', marginBottom: '0.75rem' }}>25% → Raiders XC program</p>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#C8102E', letterSpacing: '0.04em' }}>Shop the collection →</span>
            </div>
          </Link>
          <Link href="/merch/freedom-riders" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', textDecoration: 'none', position: 'relative', minHeight: '160px', background: '#111' }}>
            <Image src="/merch/freedom-riders/shirt-mockup-dark.webp" alt="Freedom Riders" fill className="object-cover" style={{ objectPosition: 'center 30%', opacity: 0.55 }} sizes="320px" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)' }} />
            <div style={{ position: 'relative', padding: '1.5rem' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9A3412', fontWeight: 700 }}>Anniston, Alabama · 1961</span>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, color: '#f0ede8', margin: '0.35rem 0 0.25rem', lineHeight: 1.1 }}>Freedom Riders</p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(240,237,232,0.5)', marginBottom: '0.75rem' }}>25% → West Anniston Foundation</p>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#9A3412', letterSpacing: '0.04em' }}>Shop the collection →</span>
            </div>
          </Link>
          <Link href="/merch#magazines" style={{ display: 'block', borderRadius: '12px', overflow: 'hidden', textDecoration: 'none', position: 'relative', minHeight: '160px', background: '#1a1410', border: '1px solid rgba(202,138,4,0.2)' }}>
            <div style={{ position: 'relative', padding: '1.5rem' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A227', fontWeight: 700 }}>Digital · $9.95 — Print · $20</span>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, color: '#f0ede8', margin: '0.35rem 0 0.25rem', lineHeight: 1.1 }}>SL Magazine</p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(240,237,232,0.5)', marginBottom: '0.75rem' }}>Stories, profiles, and places from NE Alabama</p>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#C9A227', letterSpacing: '0.04em' }}>Read now →</span>
            </div>
          </Link>
        </div>

        <SectionHead label="Shirts" sub="Order online · Ships after Aug 2 · Sizes S–2XL" first />
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}>
          {SHIRTS.map(item => <ProductCard key={item.id} item={item} />)}
        </div>

        <SectionHead label="Totes" sub="In stock · Cream canvas · DTF print" />
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}>
          {TOTES.map(item => <ProductCard key={item.id} item={item} />)}
        </div>

        <div id="stickers">
          <SectionHead label="Stickers" sub="3″ vinyl · Matte · Weather-resistant · $5 each" />
          {/* Sticker pack visual strip */}
          <div className="flex gap-4 overflow-x-auto pb-3 mb-6" style={{ scrollbarWidth: 'none' }}>
            {STICKERS.slice(0,8).map((s, i) => (
              <a key={s.id} href={`/buy/${s.id}`}
                style={{
                  flexShrink: 0,
                  transform: `rotate(${[-4,3,-6,5,-3,7,-5,2][i % 8]}deg)`,
                  filter: 'drop-shadow(0 3px 8px rgba(0,0,0,.5))',
                  transition: 'transform .15s ease',
                  display: 'block',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = `rotate(0deg) scale(1.1)` }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = `rotate(${[-4,3,-6,5,-3,7,-5,2][i % 8]}deg)` }}
              >
                <img src={s.photo} alt={s.name} width={90} height={90}
                  style={{ width: '90px', height: '90px', objectFit: 'contain' }} />
              </a>
            ))}
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            {STICKERS.map(item => <ProductCard key={item.id} item={item} small />)}
          </div>
        </div>

        {MAGAZINES.length > 0 && (
          <div id="magazines">
            <SectionHead label="Magazines" sub="Digital PDF download · $9.95 — Full-color print edition · $20" />
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}>
              {MAGAZINES.map(item => <ProductCard key={item.id} item={item} />)}
            </div>
          </div>
        )}

        {PRINTS.length > 0 && (
          <>
            <SectionHead label="Prints" sub="Rolled · Ships in tube" />
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}>
              {PRINTS.map(item => <ProductCard key={item.id} item={item} />)}
            </div>
          </>
        )}

        <Rule />

        <div className="rounded-2xl p-6 mb-10" style={{ background: 'rgba(154,52,18,0.1)', border: '1px solid rgba(154,52,18,0.2)' }}>
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--color-ll-primary-light)' }}>Woodstock 5K · Aug 2</p>
          <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Find us at the booth</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(240,237,230,0.5)' }}>
            Woodstock Avenue, Anniston. Cash, Venmo, or Square. Scan any QR code at the booth to pay by card.
            Pre-orders ship 2–3 weeks after the race. 25% of PV Raiders tee sales go to the XC program.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { l: 'At the booth', v: 'Cash · Venmo · Square · QR' },
              { l: 'Team pricing', v: 'Ask a volunteer' },
              { l: 'Custom orders', v: 'matt@southernlegends.blog' },
            ].map(({ l, v }) => (
              <div key={l}>
                <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(240,237,230,0.25)' }}>{l}</p>
                <p className="text-sm" style={{ color: 'rgba(240,237,230,0.55)' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6 mb-10" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,237,230,0.06)' }}>
          <h2 className="text-lg font-black mb-1" style={{ fontFamily: 'var(--font-heading)' }}>New drops — get notified</h2>
          <p className="text-sm mb-4" style={{ color: 'rgba(240,237,230,0.4)' }}>Cheaha Mountain, I Live Here On Purpose, and more in progress.</p>
          <form onSubmit={submitNotify} className="flex gap-3 max-w-md">
            <input type="email" required placeholder="Your email" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,237,230,0.12)', color: 'var(--color-ll-warm)', outline: 'none' }} />
            <button type="submit" disabled={notifySent} className="px-5 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: 'var(--color-ll-accent)', color: '#1C1917', cursor: notifySent ? 'default' : 'pointer', opacity: notifySent ? 0.7 : 1 }}>
              {notifySent ? '✓ Got it' : 'Notify me'}
            </button>
          </form>
        </div>

        {/* Ecclesia Resource Shop cross-link */}
        <div className="rounded-2xl p-6 mb-4" style={{ background: 'rgba(13,26,15,0.6)', border: '1px solid rgba(45,212,191,0.12)' }}>
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(45,212,191,0.5)' }}>Ecclesia Resource Shop</p>
          <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#f0ede8' }}>&ldquo;In the Meantime&rdquo; — Advent 2026 Kit</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(240,237,230,0.4)' }}>
            Sermon series art, slides, liturgy, kids curriculum. Made by a pastor for the next church that can&apos;t afford to make their own. $49.
          </p>
          <a href="https://ecclesiacommunity.org/shop" className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90"
            style={{ background: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.25)', textDecoration: 'none' }}>
            Pre-order — $49 →
          </a>
        </div>

        {/* Affiliate cross-link */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(154,52,18,0.08)', border: '1px solid rgba(154,52,18,0.18)' }}>
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(202,138,4,0.5)' }}>Partner Program</p>
          <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Earn when you share.</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(240,237,230,0.5)' }}>Share any product — shirts, the Ecclesia shop, Blueprint Sessions, Heather Florals — and earn 10–20% on every sale. One link, everything in the catalog.</p>
          <Link href="/affiliate" className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90"
            style={{ background: '#9A3412', color: '#FAFAF7' }}>
            Get your affiliate link →
          </Link>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(240,237,230,0.05)' }}>
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(202,138,4,0.5)' }}>Southern Legends</p>
          <h2 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Support the publication</h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(240,237,230,0.4)' }}>Every story is free. A monthly contribution keeps the archives growing.</p>
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

function ProductCard({ item, small }: { item: MerchItem; small?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const isShirt = item.category === 'shirt' || item.category === 'hoodie'

  return (
    <Link href={`/buy/${item.id}`}
      className="rounded-2xl overflow-hidden block transition-all duration-200 group"
      style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(240,237,230,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.3)', textDecoration: 'none', color: 'inherit' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Shirt items: blank shirt mockup; hover shows shirt color */}
      {isShirt ? (
        <div className="relative flex items-center justify-center overflow-hidden"
          style={{ aspectRatio: small ? '1' : '4/5', background: 'rgba(255,255,255,0.015)', padding: small ? 8 : 16 }}>
          <ShirtMockup
            src={item.photo}
            alt={item.name}
            shirtColor={hovered ? (item.bg ?? '#f5f0e8') : undefined}
            size={small ? 160 : 260}
          />
          {item.badge && (
            <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full z-10"
              style={{ background: item.badgeColor ?? '#9A3412', color: '#fff', letterSpacing: '0.06em' }}>
              {item.badge}
            </span>
          )}
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }}>
            <span className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg"
              style={{ background: 'var(--color-ll-primary)', color: 'var(--color-ll-warm)' }}>
              Buy now →
            </span>
          </div>
        </div>
      ) : (
        /* Non-shirt items (stickers, totes, prints): plain image */
        <div className="relative overflow-hidden"
          style={{ aspectRatio: small ? '1' : '4/5', background: item.bg ?? 'transparent' }}>
          <Image src={item.photo} alt={item.name} fill
            className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            sizes={small ? '220px' : '(max-width: 640px) 100vw, 320px'} style={{ padding: 16 }} />
          {item.badge && (
            <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: item.badgeColor ?? '#9A3412', color: '#fff', letterSpacing: '0.06em' }}>
              {item.badge}
            </span>
          )}
          <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}>
            <span className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg"
              style={{ background: 'var(--color-ll-primary)', color: 'var(--color-ll-warm)' }}>
              Buy now →
            </span>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h2 className="font-black text-sm leading-tight flex-1 mr-2" style={{ fontFamily: 'var(--font-heading)' }}>{item.name}</h2>
          <span className="font-black text-sm flex-shrink-0" style={{ color: 'var(--color-ll-primary-light)' }}>${item.price}</span>
        </div>
        <p className="text-xs mb-0.5" style={{ color: 'rgba(240,237,230,0.4)' }}>{item.tagline}</p>
        {item.sub && <p className="text-xs" style={{ color: 'rgba(202,138,4,0.6)' }}>{item.sub}</p>}
        {item.fundraiser && <p className="text-xs mt-1" style={{ color: '#4ade80' }}>25% → {item.fundraiser}</p>}
      </div>
    </Link>
  )
}

function SectionHead({ label, sub, first }: { label: string; sub: string; first?: boolean }) {
  return (
    <div className={`${first ? 'mt-4' : 'mt-14'} mb-6`}>
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
