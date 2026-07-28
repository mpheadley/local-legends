import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MERCH } from '@/lib/merch'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Freedom Riders Merch — Southern Legends',
  description: 'On May 14, 1961, a mob firebombed a bus of Freedom Riders outside Anniston, Alabama. These shirts carry that history. 25% of every sale goes to the West Anniston Foundation.',
  alternates: { canonical: '/merch/freedom-riders' },
  openGraph: {
    title: 'Freedom Riders — Anniston, 1961',
    description: 'Wear the history. 25% of every sale → West Anniston Foundation.',
    url: `${siteConfig.url}/merch/freedom-riders`,
    images: [{ url: '/merch/freedom-riders/shirt-mockup-dark.webp', width: 1200, height: 800, alt: 'Freedom Riders shirt — Southern Legends' }],
  },
}

const FR_ITEMS = MERCH.filter(m => m.id.startsWith('freedom-riders') || m.id === 'david-dennis-shirt')

export default function FreedomRidersMerchPage() {
  return (
    <main id="main-content" style={{ background: '#0d0b09', color: '#f0ede8', minHeight: '100vh' }}>

      {/* ─── Print Package Download ─── */}
      <div style={{ background: '#1a0f08', borderBottom: '1px solid rgba(154,52,18,0.25)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: 'rgba(240,237,232,0.45)', letterSpacing: '0.05em' }}>PRINT FILES · Freedom Riders Collection</span>
        <a
          href="/merch/freedom-riders/freedom-riders-print-package.zip"
          download
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#9A3412', color: '#f0ede8', fontWeight: 700, fontSize: '0.8rem', padding: '0.5rem 1.25rem', borderRadius: '6px', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          ↓ Download Print Package
        </a>
      </div>

      {/* ─── Hero ─── */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/merch/freedom-riders/shirt-mockup-dark.webp"
            alt="Freedom Riders shirt — Anniston, Alabama 1961"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center top' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,11,9,0.35) 0%, rgba(13,11,9,0.6) 40%, rgba(13,11,9,0.96) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '52rem', margin: '0 auto', padding: '0 1.5rem 4rem', width: '100%' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(154,52,18,0.8)', marginBottom: '0.75rem', fontWeight: 700 }}>
            Southern Legends · Anniston, Alabama
          </p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.0, marginBottom: '1.25rem', color: '#f0ede8' }}>
            May 14, 1961.<br />Highway 202.<br />The bus burned.
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(240,237,232,0.6)', maxWidth: '36rem', marginBottom: '2rem' }}>
            A mob of fifty men firebombed a Greyhound carrying Freedom Riders six miles outside Anniston. The local police had been warned hours earlier. They were nowhere to be found.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <a href="#shirts" style={{ display: 'inline-block', background: '#9A3412', color: '#f0ede8', fontWeight: 700, fontSize: '0.9rem', padding: '0.75rem 1.75rem', borderRadius: '6px', textDecoration: 'none', letterSpacing: '0.04em' }}>
              Get the shirt →
            </a>
            <Link href="/profiles/freedom-riders-national-monument" style={{ fontSize: '0.85rem', color: 'rgba(240,237,232,0.45)', textDecoration: 'none', borderBottom: '1px solid rgba(240,237,232,0.2)', paddingBottom: '1px' }}>
              Read the full story
            </Link>
          </div>
        </div>
      </section>

      {/* ─── History block ─── */}
      <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(154,52,18,0.7)', marginBottom: '0.5rem', fontWeight: 700 }}>What happened</p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(240,237,232,0.55)' }}>
              The Freedom Riders were an interracial group organized by CORE to test the Supreme Court's ban on segregated interstate travel. On Mother's Day 1961, their Greyhound bus was met by a Klan mob in Anniston, attacked with pipes and chains, and firebombed six miles outside of town. Riders were beaten as they escaped the burning bus.
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(154,52,18,0.7)', marginBottom: '0.5rem', fontWeight: 700 }}>Why it matters now</p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(240,237,232,0.55)' }}>
              The National Park Service now manages two sites in Anniston where the attacks happened. The Freedom Riders National Monument forces a city to reckon with the hardest chapter in its history — and to hold it in public view. These shirts are part of that reckoning.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Rule ─── */}
      <div style={{ maxWidth: '52rem', margin: '0 auto 0', padding: '0 1.5rem' }}>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(154,52,18,0.4), transparent)' }} />
      </div>

      {/* ─── Shirts ─── */}
      <section id="shirts" style={{ maxWidth: '52rem', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(154,52,18,0.7)', marginBottom: '0.5rem', fontWeight: 700 }}>The Collection</p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, marginBottom: '2.5rem', color: '#f0ede8' }}>
          Wear the history.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>

          {/* Black shirt — live */}
          <ShirtCard
            href="/buy/freedom-riders-shirt"
            image="/merch/freedom-riders/shirt-mockup-dark.webp"
            bg="#111"
            label="Bus Woodcut — Black"
            sub="White on black · Front print · S–2XL"
            price={40}
            badge="In stock"
            badgeColor="#4ade80"
            note="Woodcut illustration of the burning Greyhound, May 14, 1961"
          />

          {/* Cream shirt — coming soon */}
          <ShirtCard
            href="/merch"
            image="/merch/freedom-riders/bus-woodcut.png"
            bg="#f5f2ec"
            imgBg="#f5f2ec"
            label="Bus Woodcut — Cream"
            sub="Black on cream · Front print · S–2XL"
            price={40}
            badge="Coming soon"
            badgeColor="#E8722A"
            note="Same illustration, cream blank — available after Woodstock 5K (Aug 2)"
          />

          {/* David Dennis */}
          <ShirtCard
            href="/merch"
            image="/merch/freedom-riders/dennis-shirt-mockup.webp"
            bg="#0d0b09"
            label="David Dennis — Freedom Rider"
            sub="Portrait shirt · Hedcut illustration"
            price={40}
            badge="Coming soon"
            badgeColor="#E8722A"
            note='"I was trying to get a date with a woman." — David Dennis, 1961 · Jackson, MS arrest photo'
          />

        </div>
      </section>

      {/* ─── David Dennis quote block ─── */}
      <section style={{ background: '#120e0a', borderTop: '1px solid rgba(154,52,18,0.15)', borderBottom: '1px solid rgba(154,52,18,0.15)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '4rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', aspectRatio: '3/4', maxWidth: '240px', borderRadius: '4px', overflow: 'hidden', background: '#1a1410' }}>
            <Image
              src="/merch/freedom-riders/dennis-hedcut-canonical.png"
              alt="David Dennis — Freedom Rider, 1961"
              fill
              className="object-contain"
              style={{ padding: '16px' }}
            />
          </div>
          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(154,52,18,0.65)', marginBottom: '1rem', fontWeight: 700 }}>David Dennis · Freedom Rider, 1961</p>
            <blockquote style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', fontWeight: 700, lineHeight: 1.3, color: '#f0ede8', margin: '0 0 1.25rem', borderLeft: '3px solid rgba(154,52,18,0.5)', paddingLeft: '1.25rem' }}>
              "I was trying to get a date with a woman. That's how I became a Freedom Rider."
            </blockquote>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(240,237,232,0.45)' }}>
              Dennis boarded the bus in Washington, D.C. on May 4, 1961. He was arrested in Jackson, Mississippi — his booking photo became one of the most recognizable images of the movement. The hedcut portrait on this shirt is drawn from that photograph.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Fundraiser ─── */}
      <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ background: 'rgba(154,52,18,0.08)', border: '1px solid rgba(154,52,18,0.2)', borderRadius: '10px', padding: '2rem 2.25rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(154,52,18,0.7)', marginBottom: '0.5rem', fontWeight: 700 }}>Where the money goes</p>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.75rem', color: '#f0ede8' }}>
            25% of every sale → West Anniston Foundation
          </h3>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(240,237,232,0.5)', maxWidth: '38rem' }}>
            The Freedom Riders bus was firebombed in West Anniston. The West Anniston Foundation works in the same community decades later. A quarter of every shirt sale goes directly to their work. This isn't charity — it's accountability.
          </p>
        </div>
      </section>

      {/* ─── All merch link ─── */}
      <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/merch" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(240,237,232,0.1)', color: 'rgba(240,237,232,0.55)', fontWeight: 600, fontSize: '0.85rem', padding: '0.6rem 1.25rem', borderRadius: '6px', textDecoration: 'none' }}>
            ← All merch
          </Link>
          <Link href="/profiles/freedom-riders-national-monument" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(240,237,232,0.1)', color: 'rgba(240,237,232,0.55)', fontWeight: 600, fontSize: '0.85rem', padding: '0.6rem 1.25rem', borderRadius: '6px', textDecoration: 'none' }}>
            Read the full profile →
          </Link>
        </div>
      </section>

    </main>
  )
}

function ShirtCard({ href, image, bg, imgBg, label, sub, price, badge, badgeColor, note }: {
  href: string
  image: string
  bg: string
  imgBg?: string
  label: string
  sub: string
  price: number
  badge: string
  badgeColor: string
  note: string
}) {
  return (
    <Link href={href} style={{ display: 'block', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,237,232,0.07)', borderRadius: '10px', overflow: 'hidden', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.15s' }}>
      <div style={{ position: 'relative', aspectRatio: '1', background: imgBg ?? bg }}>
        <Image src={image} alt={label} fill className="object-contain" style={{ padding: '1.25rem', background: imgBg ?? bg }} sizes="(max-width: 640px) 100vw, 320px" />
        <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', background: badgeColor, color: badgeColor === '#4ade80' ? '#052e16' : '#fff', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
          {badge}
        </span>
      </div>
      <div style={{ padding: '1rem 1.1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem', gap: '0.5rem' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1rem', lineHeight: 1.2, color: '#f0ede8', margin: 0 }}>{label}</p>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#E8722A', flexShrink: 0 }}>${price}</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'rgba(240,237,232,0.38)', marginBottom: '0.5rem' }}>{sub}</p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(240,237,232,0.28)', lineHeight: 1.5, fontStyle: 'italic' }}>{note}</p>
      </div>
    </Link>
  )
}
