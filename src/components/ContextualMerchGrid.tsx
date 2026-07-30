'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getMerchForContext, type MerchContext, type MerchItem } from '@/lib/merch'

type Props = {
  ctx: MerchContext
  /** Override heading. Default: "From the SL Shop" */
  heading?: string
  /** Show in compact row vs 2-col grid. Default: grid */
  layout?: 'row' | 'grid'
}

/** Shirt-on-background card with raw-graphic-on-hover */
function MerchCard({ item, compact }: { item: MerchItem; compact?: boolean }) {
  const [hovered, setHovered] = useState(false)
  // Default: graphic on shirt bg color; hover: raw graphic on plain bg
  const src   = hovered && item.rawGraphic ? item.rawGraphic : item.photo
  const imgBg = hovered ? 'transparent' : (item.bg ?? 'transparent')

  return (
    <Link
      href={`/buy/${item.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        borderRadius: 12, overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(240,237,230,0.08)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.28)',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
    >
      <div style={{
        position: 'relative', aspectRatio: compact ? '1' : '4/5',
        background: imgBg, transition: 'background 0.25s',
      }}>
        <Image
          src={src} alt={item.name} fill
          style={{ objectFit: 'contain', padding: 12, transition: 'transform 0.4s' }}
          sizes="(max-width: 640px) 50vw, 280px"
        />
        {item.badge && (
          <span style={{
            position: 'absolute', top: 10, left: 10, fontSize: 10, fontWeight: 700,
            padding: '3px 8px', borderRadius: 99,
            background: item.badgeColor ?? '#9A3412', color: '#fff', letterSpacing: '0.06em',
          }}>{item.badge}</span>
        )}
      </div>
      <div style={{ padding: compact ? '8px 10px' : '12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 2 }}>
          <p style={{ fontFamily: 'var(--font-heading, Georgia)', fontWeight: 900, fontSize: compact ? '0.78rem' : '0.88rem', lineHeight: 1.2, flex: 1 }}>
            {item.name}
          </p>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-ll-primary-light, #f97316)', flexShrink: 0 }}>
            ${item.price}
          </span>
        </div>
        {!compact && (
          <p style={{ fontSize: '0.72rem', color: 'rgba(240,237,230,0.4)', lineHeight: 1.4 }}>{item.tagline}</p>
        )}
        {item.fundraiser && (
          <p style={{ fontSize: '0.68rem', color: '#4ade80', marginTop: 3 }}>25% → {item.fundraiser}</p>
        )}
      </div>
    </Link>
  )
}

/** Drop-in contextual merch block — put below any profile, essay, or city section */
export default function ContextualMerchGrid({ ctx, heading, layout = 'grid' }: Props) {
  const items = getMerchForContext(ctx)
  if (!items.length) return null

  const cols = layout === 'row'
    ? `repeat(${Math.min(items.length, 4)}, 1fr)`
    : 'repeat(auto-fill, minmax(220px, 1fr))'

  return (
    <section style={{ marginTop: 40, marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{ height: 1, flex: 1, background: 'linear-gradient(to right, rgba(154,52,18,0.5), transparent)' }} />
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(202,138,4,0.65)', whiteSpace: 'nowrap' }}>
          {heading ?? 'From the SL Shop'}
        </p>
        <div style={{ height: 1, flex: 1, background: 'linear-gradient(to left, rgba(154,52,18,0.5), transparent)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: layout === 'row' ? 10 : 14 }}>
        {items.map(item => (
          <MerchCard key={item.id} item={item} compact={layout === 'row'} />
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: 12 }}>
        <Link href="/merch" style={{ fontSize: '0.72rem', color: 'rgba(202,138,4,0.6)', letterSpacing: '0.08em', textDecoration: 'none' }}>
          Full shop →
        </Link>
      </p>
    </section>
  )
}
