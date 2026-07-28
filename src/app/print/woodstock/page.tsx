import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Print File Order — Madi Lou',
  description: 'All print-ready designs for Woodstock 5K, Ecclesia, and Southern Legends.',
  robots: { index: false },
}

type Shirt = {
  id: string
  label: string
  note: string
  img: string
  bg: string
  price: string
  sizes: { s: number; m: number; l: number; xl: number; xxl: number }
  screenPrint?: boolean
}

const WOODSTOCK: Shirt[] = [
  { id: 'W1', label: 'I Survived Woodstock Ave', note: 'Black shirt · event ★', img: '/merch/woodstock/survived-woodstock-mockup.png', bg: '#0c0c0c', price: '$35', sizes: { s: 3, m: 6, l: 7, xl: 3, xxl: 1 } },
  { id: 'W2', label: 'CLT Hike + Explore', note: 'Cream shirt', img: '/merch/woodstock/clt-hike-explore-mockup.png', bg: '#f0ebe0', price: '$35', sizes: { s: 2, m: 4, l: 5, xl: 3, xxl: 1 } },
  { id: 'W3', label: 'Cheaha Tower', note: 'Black shirt', img: '/merch/woodstock/cheaha-tower-mockup.png', bg: '#111', price: '$35', sizes: { s: 2, m: 4, l: 5, xl: 3, xxl: 1 } },
  { id: 'W4', label: 'Jacksonville Gamecock', note: 'Black shirt', img: '/merch/woodstock/jacksonville-gamecock-mockup.png', bg: '#111', price: '$35', sizes: { s: 2, m: 3, l: 4, xl: 2, xxl: 1 } },
  { id: 'W5', label: 'Coldwater Mountain', note: 'Forest green shirt', img: '/merch/woodstock/coldwater-mountain-mockup.png', bg: '#2c4a2c', price: '$35', sizes: { s: 2, m: 3, l: 3, xl: 2, xxl: 0 } },
  { id: 'W6', label: 'Pinhoti Trail', note: 'Black shirt', img: '/merch/woodstock/pinhoti-trail-mockup.png', bg: '#111', price: '$35', sizes: { s: 2, m: 3, l: 3, xl: 2, xxl: 0 } },
  { id: 'W7', label: 'Lickskillet Circle', note: 'Natural/olive shirt', img: '/merch/woodstock/lickskillet-circle-mockup.png', bg: '#565f40', price: '$35', sizes: { s: 1, m: 2, l: 3, xl: 1, xxl: 1 } },
  { id: 'W8', label: 'Fort McClellan', note: 'Black shirt', img: '/merch/woodstock/fort-mcclellan-mockup.png', bg: '#111', price: '$35', sizes: { s: 1, m: 1, l: 2, xl: 1, xxl: 0 } },
  { id: 'W9', label: 'Blossom & Decay', note: 'Mocha shirt', img: '/merch/woodstock/blossom-decay-mockup.png', bg: '#140e0a', price: '$35', sizes: { s: 1, m: 1, l: 2, xl: 1, xxl: 0 } },
  { id: 'W10', label: 'PV Raiders XC', note: 'Black shirt · 25% → Raiders program', img: '/merch/woodstock/pv-raiders-xc-mockup.png', bg: '#0c0c0c', price: '$35', sizes: { s: 1, m: 2, l: 4, xl: 2, xxl: 1 } },
  { id: 'W11', label: 'Freedom Riders — 1961', note: 'Black shirt · SCREEN PRINT · separate vendor', img: '/merch/woodstock/freedom-riders-mockup.png', bg: '#0a0a0a', price: '$40', sizes: { s: 1, m: 1, l: 2, xl: 1, xxl: 0 }, screenPrint: true },
]

const ECCLESIA: Shirt[] = [
  { id: 'E1', label: 'Ecclesia Pilgrims', note: 'Forest green shirt · "We are all on the way."', img: '/merch/woodstock/ecclesia-pilgrims-mockup.png', bg: '#2c4a2c', price: '$35', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'E2', label: 'Ecclesia Stone', note: 'Black shirt · triskelion pixel art', img: '/merch/woodstock/ecclesia-stone-mockup.png', bg: '#0c0c0c', price: '$35', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
]

const SL: Shirt[] = [
  { id: 'S1', label: 'SL Run Alabama', note: 'Black shirt', img: '/merch/woodstock/sl-run-alabama-mockup.png', bg: '#111', price: '$35', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S2', label: 'Raider Road Runners', note: 'Cream shirt · kids 5K design', img: '/merch/woodstock/raider-road-runners-mockup.png', bg: '#f0ebe0', price: '$35', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S3', label: 'Anniston 45', note: 'Navy shirt · 45 years of running', img: '/merch/woodstock/anniston-45-mockup.png', bg: '#1a2a4a', price: '$35', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S4', label: 'Model City', note: 'Black shirt · Anniston', img: '/merch/woodstock/model-city-anniston-mockup.png', bg: '#111', price: '$35', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S5', label: 'Piedmont Name Changes', note: 'Cream shirt', img: '/merch/woodstock/piedmont-name-changes-mockup.png', bg: '#f0ebe0', price: '$35', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S6', label: 'Diaspora', note: 'Black shirt · "I left. I came back."', img: '/merch/woodstock/diaspora-mockup.png', bg: '#111', price: '$35', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S7', label: 'Noccalula Falls', note: 'Black shirt', img: '/merch/woodstock/noccalula-falls-mockup.png', bg: '#111', price: '$35', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
]

const ALL_SHIRTS = [...WOODSTOCK, ...ECCLESIA, ...SL]

function DesignGrid({ shirts, accent }: { shirts: Shirt[]; accent: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {shirts.map((s) => (
        <div key={s.id} style={{ borderRadius: '8px', overflow: 'hidden', border: `1px solid ${s.screenPrint ? 'rgba(248,113,113,0.2)' : 'rgba(240,237,232,0.08)'}` }}>
          <div style={{ background: s.bg, aspectRatio: '1', position: 'relative' }}>
            <Image src={s.img} alt={s.label} fill style={{ objectFit: 'cover' }} sizes="200px" />
          </div>
          <div style={{ padding: '0.5rem 0.65rem', background: 'rgba(255,255,255,0.03)' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.1rem', color: '#f0ede8' }}>{s.label}</p>
            <p style={{ fontSize: '0.65rem', color: 'rgba(240,237,232,0.35)', lineHeight: 1.3 }}>{s.note}</p>
            {s.screenPrint && <p style={{ fontSize: '0.6rem', color: '#f87171', marginTop: '0.2rem', fontWeight: 700 }}>SCREEN PRINT</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

function SectionHead({ label, count, accent }: { label: string; count: number; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem', marginTop: '2rem' }}>
      <div style={{ width: '3px', height: '1.1rem', background: accent, borderRadius: '2px', flexShrink: 0 }} />
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(240,237,232,0.35)' }}>
        {label} <span style={{ color: accent }}>({count})</span>
      </p>
    </div>
  )
}

export default function WoodstockPrintPage() {
  const woodstockDTF = WOODSTOCK.filter(s => !s.screenPrint)
  const totS = woodstockDTF.reduce((a, s) => a + s.sizes.s, 0)
  const totM = woodstockDTF.reduce((a, s) => a + s.sizes.m, 0)
  const totL = woodstockDTF.reduce((a, s) => a + s.sizes.l, 0)
  const totXL = woodstockDTF.reduce((a, s) => a + s.sizes.xl, 0)
  const totXXL = woodstockDTF.reduce((a, s) => a + s.sizes.xxl, 0)
  const grandTotal = totS + totM + totL + totXL + totXXL

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#f0ede8' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.25rem 5rem' }}>

        {/* Header */}
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C8102E', fontWeight: 700, marginBottom: '0.5rem' }}>
          DTF Print Order · Madi Lou
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 900, marginBottom: '0.35rem', lineHeight: 1.1 }}>
          Print File Order
        </h1>
        <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
          {ALL_SHIRTS.length} designs total — {WOODSTOCK.filter(s=>!s.screenPrint).length} Woodstock DTF + {ECCLESIA.length} Ecclesia + {SL.length} SL · all transparent PNG 300 DPI
          <br /><span style={{ color: 'rgba(240,237,232,0.25)', fontSize: '0.78rem' }}>File names include shirt color. Freedom Riders = screen print, order separately.</span>
        </p>

        {/* Download */}
        <div style={{ marginBottom: '2.5rem', background: 'rgba(200,16,46,0.08)', border: '1px solid rgba(200,16,46,0.3)', borderRadius: '10px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>MADILOU-ALL-PRINTS.zip</p>
            <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '0.8rem' }}>
              {ALL_SHIRTS.filter(s=>!s.screenPrint).length} designs · transparent PNG · 300 DPI · ~127 MB<br />
              <span style={{ color: '#fbbf24' }}>⚠ Upload to WeTransfer — too large to email.</span>
            </p>
          </div>
          <a
            href="mailto:matt@gatherstudio.app?subject=WeTransfer%20Link%20for%20Print%20Files&body=Hi%20Matt%2C%20please%20share%20the%20WeTransfer%20link."
            style={{ background: '#C8102E', color: '#fff', fontWeight: 700, fontSize: '0.9rem', padding: '0.75rem 1.5rem', borderRadius: '7px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Request Files →
          </a>
        </div>

        {/* Woodstock section */}
        <SectionHead label="Woodstock 5K — Aug 2, Anniston" count={WOODSTOCK.length} accent="#C8102E" />
        <DesignGrid shirts={WOODSTOCK} accent="#C8102E" />

        {/* Woodstock sizes table */}
        <h2 style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.25)', marginBottom: '0.6rem', marginTop: '1rem', fontWeight: 700 }}>
          Woodstock DTF Sizes &amp; Quantities
        </h2>
        <div style={{ border: '1px solid rgba(240,237,232,0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.75rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Design', 'Color', 'S', 'M', 'L', 'XL', '2XL', 'Total'].map((h) => (
                  <th key={h} style={{ padding: '0.55rem 0.6rem', textAlign: h === 'Design' || h === 'Color' ? 'left' : 'center', color: 'rgba(240,237,232,0.3)', fontWeight: 600, fontSize: '0.68rem', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {woodstockDTF.map((s, i) => {
                const total = s.sizes.s + s.sizes.m + s.sizes.l + s.sizes.xl + s.sizes.xxl
                return (
                  <tr key={s.id} style={{ borderTop: '1px solid rgba(240,237,232,0.06)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                    <td style={{ padding: '0.5rem 0.6rem', fontSize: '0.78rem' }}>{s.label}</td>
                    <td style={{ padding: '0.5rem 0.6rem', fontSize: '0.7rem', color: 'rgba(240,237,232,0.4)' }}>{s.note.split('·')[0].trim()}</td>
                    {[s.sizes.s, s.sizes.m, s.sizes.l, s.sizes.xl, s.sizes.xxl].map((v, j) => (
                      <td key={j} style={{ padding: '0.5rem 0.6rem', textAlign: 'center', color: v > 0 ? '#CA8A04' : 'rgba(240,237,232,0.18)', fontWeight: v > 0 ? 700 : 400, fontSize: '0.78rem' }}>{v > 0 ? v : '—'}</td>
                    ))}
                    <td style={{ padding: '0.5rem 0.6rem', textAlign: 'center', fontWeight: 700, color: '#4ade80', fontSize: '0.78rem' }}>{total}</td>
                  </tr>
                )
              })}
              <tr style={{ borderTop: '2px solid rgba(240,237,232,0.12)', background: 'rgba(74,222,128,0.06)' }}>
                <td colSpan={2} style={{ padding: '0.6rem 0.6rem', fontWeight: 700, fontSize: '0.78rem' }}>TOTAL</td>
                {[totS, totM, totL, totXL, totXXL].map((v, j) => (
                  <td key={j} style={{ padding: '0.6rem 0.6rem', textAlign: 'center', fontWeight: 700, color: '#4ade80', fontSize: '0.78rem' }}>{v}</td>
                ))}
                <td style={{ padding: '0.6rem 0.6rem', textAlign: 'center', fontWeight: 800, color: '#4ade80', fontSize: '0.9rem' }}>{grandTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)', borderRadius: '8px', padding: '0.6rem 0.85rem', marginBottom: '2rem', fontSize: '0.75rem', color: 'rgba(240,237,232,0.45)' }}>
          <strong style={{ color: '#f87171' }}>Freedom Riders (W11):</strong> Screen print — separate vendor, order independently. PV Raiders XC (W10): 25% ($8.75/shirt) → Raiders XC program.
        </div>

        {/* Ecclesia section */}
        <SectionHead label="Ecclesia — DTF, quantities TBD" count={ECCLESIA.length} accent="#2dd4bf" />
        <DesignGrid shirts={ECCLESIA} accent="#2dd4bf" />

        {/* SL section */}
        <SectionHead label="Southern Legends — DTF, quantities TBD" count={SL.length} accent="#CA8A04" />
        <DesignGrid shirts={SL} accent="#CA8A04" />

        {/* Stickers */}
        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(240,237,232,0.08)', paddingTop: '2rem' }}>
          <SectionHead label="Stickers — Valerie (gosocialmarketing.org)" count={6} accent="#a78bfa" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {['Lickskillet Ox', 'Coldwater Badge', 'Fort McClellan', 'CLT Trail', 'Pinhoti Badge', 'Blossom & Decay'].map((s) => (
              <span key={s} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(240,237,232,0.1)', borderRadius: '5px', padding: '0.35rem 0.75rem', fontSize: '0.78rem', color: 'rgba(240,237,232,0.6)' }}>{s}</span>
            ))}
          </div>
          <p style={{ fontSize: '0.72rem', color: 'rgba(240,237,232,0.25)' }}>20 each · 120 total · die-cut · $5 ea / 2 for $8</p>
        </div>

        <p style={{ color: 'rgba(240,237,232,0.2)', fontSize: '0.75rem', textAlign: 'center', marginTop: '3rem' }}>
          Questions · Matt Headley · (256) 644-7334 · matt@gatherstudio.app
        </p>
      </div>
    </main>
  )
}
