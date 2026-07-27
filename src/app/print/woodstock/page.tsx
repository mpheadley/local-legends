import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Woodstock 5K 2026 — Print Files',
  description: 'All print-ready designs for Woodstock 5K merch. Aug 2, Anniston.',
  robots: { index: false },
}

const SHIRTS = [
  { id: '01', label: 'Cheaha Tower', note: 'Cream on black', img: '/merch/woodstock/cheaha-tower-mockup.png', bg: '#111' },
  { id: '02', label: 'Jacksonville Gamecock', note: 'Black on cream', img: '/merch/woodstock/jacksonville-gamecock-mockup.png', bg: '#f0ebe0' },
  { id: '03', label: 'CLT Hike + Explore', note: 'Badge on cream', img: '/merch/woodstock/clt-hike-explore-mockup.png', bg: '#f0ebe0' },
  { id: '04', label: 'Blossom & Decay', note: 'Mocha on black', img: '/merch/woodstock/blossom-decay-mockup.png', bg: '#140e0a' },
  { id: '05', label: 'Lickskillet Circle', note: 'Natural', img: '/merch/woodstock/lickskillet-circle-mockup.png', bg: '#565f40' },
  { id: '06', label: 'Pinhoti Trail', note: 'Cream on black', img: '/merch/woodstock/pinhoti-trail-mockup.png', bg: '#f0ebe0' },
  { id: '07', label: 'Coldwater Mountain', note: 'Forest green', img: '/merch/woodstock/coldwater-mountain-mockup.png', bg: '#2c4a2c' },
  { id: '08', label: 'Fort McClellan', note: 'Cream on black', img: '/merch/woodstock/fort-mcclellan-mockup.png', bg: '#f0ebe0' },
  { id: '09', label: 'PV Raiders XC', note: 'Pirate · black shirt · 25% → Raiders program', img: '/merch/woodstock/pv-raiders-xc-mockup.png', bg: '#0c0c0c' },
  { id: '10', label: 'Survived Woodstock', note: 'Event-specific design', img: '/merch/woodstock/survived-woodstock-mockup.png', bg: '#0c0c0c' },
]

const STICKERS = [
  'Lickskillet Ox', 'Coldwater Badge', 'Fort McClellan', 'CLT Trail', 'Pinhoti Badge', 'Blossom & Decay',
]

export default function WoodstockPrintPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#f0ede8' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 1.25rem 5rem' }}>

        {/* Header */}
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C8102E', fontWeight: 700, marginBottom: '0.5rem' }}>
          Woodstock 5K · Aug 2, 2026 · Anniston, AL
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.35rem', lineHeight: 1.1 }}>
          Print File Order
        </h1>
        <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
          {SHIRTS.length} shirt designs · 6 sticker designs · all files in the zip below.
          Print-ready transparent PNGs + PDF. DTF unless noted.
        </p>

        {/* Download button — TOP */}
        <div style={{ marginBottom: '2.5rem', background: 'rgba(200,16,46,0.08)', border: '1px solid rgba(200,16,46,0.3)', borderRadius: '10px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>Download All Print Files</p>
            <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '0.8rem' }}>
              ZIP · all designs · transparent PNG + PDF · high-res DTF-ready<br />
              <span style={{ color: '#fbbf24' }}>⚠ Files are large — request the WeTransfer link below if needed.</span>
            </p>
          </div>
          <a
            href="mailto:matt@gatherstudio.app?subject=Woodstock%20Print%20Files%20ZIP&body=Hi%20Matt%2C%20please%20send%20the%20Woodstock%20print%20files%20ZIP."
            style={{ background: '#C8102E', color: '#fff', fontWeight: 700, fontSize: '0.9rem', padding: '0.75rem 1.5rem', borderRadius: '7px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Request Files →
          </a>
        </div>

        {/* Shirt grid */}
        <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.3)', marginBottom: '1rem', fontWeight: 700 }}>
          Shirt Designs ({SHIRTS.length})
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {SHIRTS.map((s) => (
            <div key={s.id} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(240,237,232,0.08)' }}>
              <div style={{ background: s.bg, aspectRatio: '1', position: 'relative' }}>
                <Image src={s.img} alt={s.label} fill style={{ objectFit: 'cover' }} sizes="220px" />
              </div>
              <div style={{ padding: '0.6rem 0.75rem', background: 'rgba(255,255,255,0.03)' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.15rem' }}>{s.label}</p>
                <p style={{ fontSize: '0.7rem', color: 'rgba(240,237,232,0.35)' }}>{s.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stickers */}
        <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.3)', marginBottom: '0.75rem', fontWeight: 700 }}>
          Sticker Designs (6) — Die-cut, transparent PNG
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
          {STICKERS.map((s) => (
            <span key={s} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(240,237,232,0.1)', borderRadius: '5px', padding: '0.35rem 0.75rem', fontSize: '0.8rem', color: 'rgba(240,237,232,0.7)' }}>
              {s}
            </span>
          ))}
        </div>

        {/* Sizes + quantities table */}
        <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.3)', marginBottom: '0.75rem', fontWeight: 700 }}>
          Sizes &amp; Quantities — DTF Order
        </h2>
        <div style={{ border: '1px solid rgba(240,237,232,0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '2.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Design', 'S', 'M', 'L', 'XL', '2XL', 'Total', 'Price'].map((h) => (
                  <th key={h} style={{ padding: '0.65rem 0.75rem', textAlign: h === 'Design' ? 'left' : 'center', color: 'rgba(240,237,232,0.35)', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SHIRTS.map((s, i) => (
                <tr key={s.id} style={{ borderTop: '1px solid rgba(240,237,232,0.06)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                  <td style={{ padding: '0.6rem 0.75rem' }}>
                    <span style={{ color: 'rgba(240,237,232,0.35)', fontSize: '0.7rem', marginRight: '0.4rem' }}>{s.id}.</span>
                    {s.label}
                  </td>
                  {['—', '—', '—', '—', '—'].map((v, j) => (
                    <td key={j} style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: 'rgba(240,237,232,0.25)' }}>{v}</td>
                  ))}
                  <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#CA8A04' }}>10</td>
                  <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: 'rgba(240,237,232,0.55)' }}>
                    {s.id === '09' ? '$35*' : '$35'}
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: '2px solid rgba(240,237,232,0.12)', background: 'rgba(202,138,4,0.06)' }}>
                <td style={{ padding: '0.65rem 0.75rem', fontWeight: 700 }}>TOTAL</td>
                {['—', '—', '—', '—', '—'].map((v, j) => (
                  <td key={j} style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: 'rgba(240,237,232,0.25)' }}>{v}</td>
                ))}
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#CA8A04' }}>~{SHIRTS.length * 10}</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: 'rgba(240,237,232,0.4)', fontSize: '0.72rem' }}>est.</td>
              </tr>
            </tbody>
          </table>
          <p style={{ padding: '0.65rem 0.75rem', fontSize: '0.72rem', color: 'rgba(240,237,232,0.25)', borderTop: '1px solid rgba(240,237,232,0.06)' }}>
            * Size breakdown from pre-orders — will update before print date. *09 PV Raiders XC: 25% ($8.75) goes back to the Raiders XC program.
          </p>
        </div>

        {/* Sticker quantities */}
        <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.3)', marginBottom: '0.75rem', fontWeight: 700 }}>
          Sticker Quantities
        </h2>
        <div style={{ border: '1px solid rgba(240,237,232,0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '2.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Design', 'Qty', 'Price ea.', 'Type'].map((h) => (
                  <th key={h} style={{ padding: '0.65rem 0.75rem', textAlign: h === 'Design' ? 'left' : 'center', color: 'rgba(240,237,232,0.35)', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STICKERS.map((s, i) => (
                <tr key={s} style={{ borderTop: '1px solid rgba(240,237,232,0.06)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                  <td style={{ padding: '0.6rem 0.75rem' }}>{s}</td>
                  <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: 'rgba(240,237,232,0.4)' }}>20</td>
                  <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: 'rgba(240,237,232,0.55)' }}>$5</td>
                  <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: 'rgba(240,237,232,0.35)', fontSize: '0.72rem' }}>Die-cut</td>
                </tr>
              ))}
              <tr style={{ borderTop: '2px solid rgba(240,237,232,0.12)', background: 'rgba(202,138,4,0.06)' }}>
                <td style={{ padding: '0.65rem 0.75rem', fontWeight: 700 }}>TOTAL</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center', fontWeight: 700, color: '#CA8A04' }}>120</td>
                <td colSpan={2} style={{ padding: '0.65rem 0.75rem', textAlign: 'center', color: 'rgba(240,237,232,0.35)', fontSize: '0.72rem' }}>bundle 2 for $8</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ color: 'rgba(240,237,232,0.2)', fontSize: '0.78rem', textAlign: 'center' }}>
          Questions · Matt Headley · (256) 644-7334 · matt@gatherstudio.app
        </p>
      </div>
    </main>
  )
}
