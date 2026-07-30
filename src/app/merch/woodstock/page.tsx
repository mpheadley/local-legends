'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MERCH, type MerchItem } from '@/lib/merch'
import ShirtMockup from '@/components/ShirtMockup'

const WOODSTOCK_IDS = [
  'woodstock-oval-shirt',
  'woodstock-shirt',
  'woodstock-sticker',
  'pv-raiders-shirt',
  'anniston-45-shirt',
  'sl-run-shirt',
  'raider-road-runners-shirt',
]

const ITEMS = MERCH.filter(m => WOODSTOCK_IDS.includes(m.id) && m.available)

const SIZES = ['S', 'M', 'L', 'XL', '2XL']

type CartEntry = { item: MerchItem; size: string; qty: number }

function DesignCard({ item }: { item: MerchItem }) {
  const [hovered, setHovered] = useState(false)
  const [size, setSize] = useState('')

  const isShirt = item.category === 'shirt' || item.category === 'hoodie'
  const hasSizes = !!item.sizes?.length

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(240,237,232,0.08)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Photo */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isShirt ? 'rgba(255,255,255,0.015)' : 'transparent',
          padding: isShirt ? 8 : 20,
          minHeight: 280,
          cursor: 'default',
        }}
      >
        {isShirt ? (
          <ShirtMockup
            src={item.photo}
            alt={item.name}
            shirtColor={hovered ? (item.bg ?? '#f5f0e8') : undefined}
            size={240}
          />
        ) : (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1' }}>
            <Image src={item.photo} alt={item.name} fill style={{ objectFit: 'contain', padding: 12 }} sizes="320px" />
          </div>
        )}
        {item.badge && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
            padding: '4px 10px', borderRadius: 99,
            background: item.badgeColor ?? '#9A3412', color: '#fff',
            zIndex: 1,
          }}>{item.badge}</span>
        )}
        {isShirt && (
          <p style={{
            position: 'absolute', bottom: 10, left: 0, right: 0,
            textAlign: 'center', fontSize: 10, letterSpacing: '0.18em',
            color: 'rgba(240,237,232,0.3)', textTransform: 'uppercase',
          }}>
            {hovered ? 'Shirt color preview' : 'Hover to see on shirt'}
          </p>
        )}
      </div>

      {/* Info + buy */}
      <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-heading, Georgia)', fontWeight: 900, fontSize: '0.92rem', lineHeight: 1.2, marginBottom: 3 }}>
              {item.name}
            </p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(240,237,232,0.38)', lineHeight: 1.4 }}>{item.tagline}</p>
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#f97316', flexShrink: 0, marginLeft: 8 }}>
            ${item.price}
          </span>
        </div>

        {item.fundraiser && (
          <p style={{ fontSize: '0.68rem', color: '#4ade80' }}>25% of this sale → {item.fundraiser}</p>
        )}

        {item.sub && (
          <p style={{ fontSize: '0.68rem', color: 'rgba(240,237,232,0.25)' }}>{item.sub}</p>
        )}

        {/* Size picker */}
        {hasSizes && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {SIZES.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  padding: '4px 10px', borderRadius: 7, fontSize: '0.72rem', fontWeight: 700,
                  border: `1px solid ${size === s ? '#ca8a04' : 'rgba(240,237,232,0.15)'}`,
                  background: size === s ? 'rgba(202,138,4,0.12)' : 'transparent',
                  color: size === s ? '#ca8a04' : 'rgba(240,237,232,0.45)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >{s}</button>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/buy/${item.id}${size ? `?size=${size}` : ''}`}
          style={{
            display: 'block', textAlign: 'center',
            padding: '10px 16px', borderRadius: 10, marginTop: 'auto',
            background: hasSizes && !size ? 'rgba(255,255,255,0.05)' : '#9A3412',
            color: hasSizes && !size ? 'rgba(240,237,232,0.3)' : '#f0ede8',
            fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.07em',
            textDecoration: 'none', textTransform: 'uppercase',
            pointerEvents: hasSizes && !size ? 'none' : 'auto',
            transition: 'background 0.15s',
          }}
        >
          {hasSizes && !size ? 'Pick a size' : 'Pre-order →'}
        </Link>
      </div>
    </div>
  )
}

export default function WoodstockMerchPage() {
  return (
    <main style={{ background: 'var(--color-ll-dark, #0f0d0b)', color: 'var(--color-ll-warm, #f0ede8)', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        position: 'relative', overflow: 'hidden', minHeight: '52vh',
        display: 'flex', alignItems: 'flex-end',
        background: 'linear-gradient(160deg, #0f0d0b 0%, #1c1207 50%, #0f0d0b 100%)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/topo-7.png)', backgroundSize: 320,
          opacity: 0.07,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '96px 24px 48px', width: '100%' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(202,138,4,0.65)', marginBottom: 14 }}>
            Southern Legends · NE Alabama
          </p>
          <h1 style={{
            fontFamily: 'var(--font-heading, Georgia)', fontWeight: 900,
            fontSize: 'clamp(3rem,8vw,5.5rem)', lineHeight: 0.92,
            marginBottom: 16,
          }}>
            Woodstock 5K<br />Merch.
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'rgba(240,237,232,0.45)', maxWidth: 520, lineHeight: 1.65, marginBottom: 24 }}>
            RRCA Alabama State Championship · Aug 2, 2026 · Woodstock Avenue, Anniston.
            Pre-order by July 31 to guarantee your size. Pick up at the booth race day.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[
              { label: 'Shirts from $30', color: '#166534' },
              { label: 'Stickers $5', color: 'rgba(240,237,232,0.15)' },
              { label: 'Ships to booth Aug 2', color: 'rgba(202,138,4,0.25)' },
              { label: 'Secure checkout via Stripe', color: 'rgba(240,237,232,0.08)' },
            ].map(c => (
              <span key={c.label} style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em',
                padding: '5px 12px', borderRadius: 99,
                background: c.color, color: 'rgba(240,237,232,0.85)',
              }}>{c.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Design grid */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Hover hint */}
        <p style={{
          fontSize: '0.68rem', color: 'rgba(240,237,232,0.25)', letterSpacing: '0.1em',
          textAlign: 'center', marginBottom: 28, textTransform: 'uppercase',
        }}>
          Designs shown on blank background — hover to preview on shirt
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 18,
        }}>
          {ITEMS.map(item => (
            <DesignCard key={item.id} item={item} />
          ))}
        </div>

        {/* PV Raiders fundraiser callout */}
        <div style={{
          marginTop: 48, padding: '24px 28px', borderRadius: 16,
          background: 'rgba(154,52,18,0.1)', border: '1px solid rgba(154,52,18,0.25)',
        }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(202,138,4,0.65)', marginBottom: 8 }}>
            Fundraiser
          </p>
          <p style={{ fontFamily: 'var(--font-heading, Georgia)', fontWeight: 900, fontSize: '1.2rem', marginBottom: 6 }}>
            25% of PV Raiders XC sales → Raiders XC program
          </p>
          <p style={{ fontSize: '0.82rem', color: 'rgba(240,237,232,0.45)', lineHeight: 1.6 }}>
            Every PV Raiders XC shirt sold puts money directly back into the cross country program.
            No middleman. We report back what we collect.
          </p>
        </div>

        {/* Pre-order deadline */}
        <div style={{
          marginTop: 24, padding: '20px 28px', borderRadius: 16,
          background: 'rgba(22,101,52,0.1)', border: '1px solid rgba(22,101,52,0.2)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <p style={{ fontWeight: 700, marginBottom: 4 }}>Pre-order deadline: July 31, 2026</p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(240,237,232,0.45)' }}>
              Orders after July 31 ship to you (add 5–7 days). Race-day booth pickup guaranteed for pre-orders.
            </p>
          </div>
          <Link href="/merch" style={{
            padding: '8px 18px', borderRadius: 10, background: 'rgba(22,101,52,0.3)',
            color: '#4ade80', fontWeight: 700, fontSize: '0.78rem', textDecoration: 'none',
            border: '1px solid rgba(74,222,128,0.2)',
          }}>
            All SL Merch →
          </Link>
        </div>
      </div>
    </main>
  )
}
