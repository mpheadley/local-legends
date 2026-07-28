'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const SIZES = ['S', 'M', 'L', 'XL', '2XL']
const PRICE_STANDARD = 30
const PRICE_TEAM = 25

const SHIRTS = [
  {
    id: 'pv-raiders-shirt',
    name: 'PV Raiders XC — Run Like You Stole It',
    image: '/merch/pv-shirt-mockup.webp',
    bg: '#111111',
    badge: 'Aug 2 · Woodstock 5K',
    note: 'Pre-order ships within 2 weeks of the event.',
  },
  {
    id: 'pv-raiders-back',
    name: 'PV Raiders XC — 2026 Race Schedule (Back)',
    image: '/merch/pv-schedule.png',
    bg: '#C8102E',
    badge: 'Back design',
    note: '12-race 2026 schedule. Front + back on same shirt.',
  },
]

export default function PVXCMerchPage() {
  const [size, setSize] = useState('L')
  const [teamQty, setTeamQty] = useState(1)
  const [parentQty, setParentQty] = useState(0)
  const [loading, setLoading] = useState(false)

  const total = teamQty * PRICE_TEAM + parentQty * PRICE_STANDARD

  async function handleOrder() {
    setLoading(true)
    const cart = []
    if (teamQty > 0) cart.push({ id: 'pv-raiders-shirt-team', name: `PV Raiders XC Shirt (Team/Coach) — ${size}`, size, price: PRICE_TEAM, qty: teamQty })
    if (parentQty > 0) cart.push({ id: 'pv-raiders-shirt-parent', name: `PV Raiders XC Shirt — ${size}`, size, price: PRICE_STANDARD, qty: parentQty })
    if (cart.length === 0) { setLoading(false); return }
    try {
      const res = await fetch('/api/merch/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  return (
    <main id="main-content" style={{ background: '#0a0a0a', color: '#f0ede8', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '72vh', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/merch/pv-pirate-hero.png"
            alt="PV Raiders XC — Pleasant Valley High School Cross Country"
            fill
            priority
            className="object-contain"
            style={{ objectPosition: 'center center', padding: '2rem' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.97) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '52rem', margin: '0 auto', padding: '0 1.5rem 4rem', width: '100%' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8102E', marginBottom: '0.75rem', fontWeight: 700 }}>
            Southern Legends · Pleasant Valley, Alabama
          </p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.6rem, 6.5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.0, marginBottom: '1.25rem', color: '#f0ede8' }}>
            Raiders run.<br />Everyone else<br />walks the plank.
          </h1>
          <p style={{ fontSize: '1rem', lineHeight: 1.65, color: 'rgba(240,237,232,0.6)', maxWidth: '34rem', marginBottom: '2rem' }}>
            Official merch for Pleasant Valley Cross Country. 25% of every sale goes directly to the Raiders XC program.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <a href="#order" style={{ display: 'inline-block', background: '#C8102E', color: '#f0ede8', fontWeight: 700, fontSize: '0.9rem', padding: '0.75rem 1.75rem', borderRadius: '6px', textDecoration: 'none', letterSpacing: '0.04em' }}>
              Order now →
            </a>
            <span style={{ fontSize: '0.82rem', color: 'rgba(240,237,232,0.4)' }}>Available at booth · Aug 2 · Woodstock 5K</span>
          </div>
        </div>
      </section>

      {/* Design preview */}
      <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8102E', marginBottom: '0.5rem', fontWeight: 700 }}>The Design</p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 900, marginBottom: '2.5rem', color: '#f0ede8' }}>
          Front design + 2026 race schedule on the back.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {SHIRTS.map(shirt => (
            <div key={shirt.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,237,232,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: '1', background: shirt.bg }}>
                <Image src={shirt.image} alt={shirt.name} fill className="object-contain" style={{ padding: '1rem' }} sizes="320px" />
                <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', background: '#C8102E', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                  {shirt.badge}
                </span>
              </div>
              <div style={{ padding: '1rem 1.1rem 1.25rem' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.95rem', lineHeight: 1.2, color: '#f0ede8', marginBottom: '0.35rem' }}>{shirt.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(240,237,232,0.35)', lineHeight: 1.5, fontStyle: 'italic' }}>{shirt.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,16,46,0.4), transparent)' }} />
      </div>

      {/* Order form */}
      <section id="order" style={{ maxWidth: '52rem', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8102E', marginBottom: '0.5rem', fontWeight: 700 }}>Order</p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 900, marginBottom: '2.5rem', color: '#f0ede8' }}>
          Pre-order your shirt.
        </h2>

        <div style={{ background: 'rgba(200,16,46,0.06)', border: '1px solid rgba(200,16,46,0.18)', borderRadius: '10px', padding: '2rem 2.25rem', maxWidth: '30rem' }}>

          {/* Size — shared */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.4)', marginBottom: '0.75rem', fontWeight: 600 }}>Size (applies to all)</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {SIZES.map(s => (
                <button key={s} onClick={() => setSize(s)} style={{ padding: '0.45rem 1rem', borderRadius: '6px', border: size === s ? '1.5px solid #C8102E' : '1.5px solid rgba(240,237,232,0.12)', background: size === s ? 'rgba(200,16,46,0.15)' : 'transparent', color: size === s ? '#f0ede8' : 'rgba(240,237,232,0.45)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Team qty */}
          <div style={{ marginBottom: '1.1rem', padding: '0.9rem 1rem', borderRadius: '8px', background: 'rgba(200,16,46,0.08)', border: '1px solid rgba(200,16,46,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0ede8', margin: 0 }}>Team / Coach — $25</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(240,237,232,0.4)', margin: 0 }}>Raiders XC players + coaching staff</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <button onClick={() => setTeamQty(q => Math.max(0, q - 1))} style={{ width: '28px', height: '28px', borderRadius: '5px', border: '1px solid rgba(240,237,232,0.15)', background: 'transparent', color: '#f0ede8', fontSize: '1rem', cursor: 'pointer' }}>−</button>
                <span style={{ fontSize: '1rem', fontWeight: 700, minWidth: '1.5rem', textAlign: 'center' }}>{teamQty}</span>
                <button onClick={() => setTeamQty(q => q + 1)} style={{ width: '28px', height: '28px', borderRadius: '5px', border: '1px solid rgba(240,237,232,0.15)', background: 'transparent', color: '#f0ede8', fontSize: '1rem', cursor: 'pointer' }}>+</button>
              </div>
            </div>
          </div>

          {/* Parent / fan qty */}
          <div style={{ marginBottom: '1.75rem', padding: '0.9rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,237,232,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0ede8', margin: 0 }}>Parent / Fan — $30</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(240,237,232,0.4)', margin: 0 }}>25% back to the program</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <button onClick={() => setParentQty(q => Math.max(0, q - 1))} style={{ width: '28px', height: '28px', borderRadius: '5px', border: '1px solid rgba(240,237,232,0.15)', background: 'transparent', color: '#f0ede8', fontSize: '1rem', cursor: 'pointer' }}>−</button>
                <span style={{ fontSize: '1rem', fontWeight: 700, minWidth: '1.5rem', textAlign: 'center' }}>{parentQty}</span>
                <button onClick={() => setParentQty(q => q + 1)} style={{ width: '28px', height: '28px', borderRadius: '5px', border: '1px solid rgba(240,237,232,0.15)', background: 'transparent', color: '#f0ede8', fontSize: '1rem', cursor: 'pointer' }}>+</button>
              </div>
            </div>
          </div>

          <button
            onClick={handleOrder}
            disabled={loading || (teamQty === 0 && parentQty === 0)}
            style={{
              width: '100%',
              background: (loading || (teamQty === 0 && parentQty === 0)) ? 'rgba(200,16,46,0.35)' : '#C8102E',
              color: '#f0ede8', fontWeight: 700, fontSize: '0.95rem',
              padding: '0.85rem 1.5rem', borderRadius: '7px', border: 'none',
              cursor: (loading || (teamQty === 0 && parentQty === 0)) ? 'not-allowed' : 'pointer',
              letterSpacing: '0.03em',
            }}
          >
            {loading ? 'Redirecting...' : total > 0 ? `Order ${teamQty + parentQty} shirt${teamQty + parentQty !== 1 ? 's' : ''} · $${total}` : 'Add shirts above'}
          </button>

          <p style={{ fontSize: '0.75rem', color: 'rgba(240,237,232,0.3)', marginTop: '0.75rem', lineHeight: 1.5 }}>
            Pre-order. Ships within 2 weeks of Aug 2. Also available at our booth at Woodstock 5K.
          </p>
        </div>
      </section>

      {/* Fundraiser block */}
      <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <div style={{ background: 'rgba(200,16,46,0.06)', border: '1px solid rgba(200,16,46,0.18)', borderRadius: '10px', padding: '2rem 2.25rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C8102E', marginBottom: '0.5rem', fontWeight: 700 }}>Where the money goes</p>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.75rem', color: '#f0ede8' }}>
            25% of every sale → Raiders XC program
          </h3>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(240,237,232,0.5)', maxWidth: '38rem' }}>
            Noah and Soren Headley run for PV. This merch started because I wanted shirts that looked as good as the team runs. Coach Youngman approved the design. A quarter of every sale goes back to the program — gear, travel, entry fees. Buy a shirt, fund the team.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(240,237,232,0.3)', marginTop: '1rem', fontStyle: 'italic' }}>
            Integrity · Excellence · Attitude · Community
          </p>
        </div>
      </section>

      {/* Sponsor block */}
      <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 1.5rem 3rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(140,0,0,0.35)', borderRadius: '10px', padding: '2rem 2.25rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(200,16,46,0.7)', marginBottom: '0.5rem', fontWeight: 700 }}>Sponsor the Raiders</p>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.65rem', color: '#f0ede8' }}>
            Put your business on this page.
          </h3>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'rgba(240,237,232,0.45)', maxWidth: '36rem', marginBottom: '1.5rem' }}>
            Your name and logo on this page and in the Southern Legends footer. Cancel any time.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="/api/sponsorship/checkout?tier=trail&program=pvxc"
              style={{ display: 'inline-block', background: '#C8102E', color: '#f0ede8', fontWeight: 700, fontSize: '0.88rem', padding: '0.7rem 1.5rem', borderRadius: '6px', textDecoration: 'none', letterSpacing: '0.03em' }}
            >
              Trail Sponsor — $49/mo →
            </a>
            <a
              href="/api/sponsorship/checkout?tier=landmark&program=pvxc"
              style={{ display: 'inline-block', background: 'transparent', border: '1px solid rgba(200,16,46,0.5)', color: '#f0ede8', fontWeight: 600, fontSize: '0.88rem', padding: '0.7rem 1.5rem', borderRadius: '6px', textDecoration: 'none', letterSpacing: '0.03em' }}
            >
              Landmark — $99/mo →
            </a>
          </div>
        </div>
      </section>

      {/* Back nav */}
      <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/merch" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(240,237,232,0.1)', color: 'rgba(240,237,232,0.55)', fontWeight: 600, fontSize: '0.85rem', padding: '0.6rem 1.25rem', borderRadius: '6px', textDecoration: 'none' }}>
            ← All merch
          </Link>
          <Link href="/merch/freedom-riders" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(240,237,232,0.1)', color: 'rgba(240,237,232,0.55)', fontWeight: 600, fontSize: '0.85rem', padding: '0.6rem 1.25rem', borderRadius: '6px', textDecoration: 'none' }}>
            Freedom Riders merch →
          </Link>
        </div>
      </section>

    </main>
  )
}
