import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Print File Order — Woodstock 5K 2026',
  description: 'Print-ready designs for Woodstock 5K, Ecclesia, and Southern Legends.',
  robots: { index: false },
}

type Method = 'DTF' | 'DTG' | 'WATERPRINT' | 'SCREEN'

type Shirt = {
  id: string
  label: string
  note: string
  img: string
  bg: string
  price: string
  file: string
  backFile?: string
  dims: string        // recommended print size e.g. '10" × 10"'
  backDims?: string
  sizes: { s: number; m: number; l: number; xl: number; xxl: number }
  method: Method
  waterprint?: boolean
}

const WOODSTOCK: Shirt[] = [
  { id: 'W0',  label: 'Woodstock Avenue Oval',        note: 'Cream shirt · alternate event design',          img: '/print-files/WOODSTOCK-00-woodstock-avenue-oval-CREAM.png',  bg: '#f0ebe0', price: '$35', method: 'DTG',        dims: '10" × 10"',   file: 'WOODSTOCK-00-woodstock-avenue-oval-CREAM.png',   sizes: { s: 5, m: 8, l: 8, xl: 5, xxl: 2 } },
  { id: 'W1',  label: 'I Survived Woodstock Ave',     note: 'Black shirt · event ★',                         img: '/print-files/WOODSTOCK-01-survived-woodstock-BLACK.png',     bg: '#0c0c0c', price: '$35', method: 'DTF',        dims: '10" × 10"',   file: 'WOODSTOCK-01-survived-woodstock-BLACK.png',      sizes: { s: 2, m: 4, l: 5, xl: 2, xxl: 1 } },
  { id: 'W2',  label: 'CLT Hike + Explore',           note: 'Cream shirt',                                   img: '/print-files/WOODSTOCK-02-clt-hike-explore-CREAM.png',       bg: '#f0ebe0', price: '$35', method: 'DTG',        dims: '10" × 10"',   file: 'WOODSTOCK-02-clt-hike-explore-CREAM.png',        sizes: { s: 1, m: 3, l: 4, xl: 2, xxl: 1 } },
  { id: 'W3',  label: 'Cheaha Tower',                 note: 'Forest green shirt',                            img: '/print-files/WOODSTOCK-03-cheaha-tower-BLACK.png',           bg: '#2c4a2c', price: '$35', method: 'DTF',        dims: '10" × 10"',   file: 'WOODSTOCK-03-cheaha-tower-BLACK.png',            sizes: { s: 2, m: 3, l: 4, xl: 2, xxl: 1 } },
  { id: 'W4',  label: 'Jacksonville Gamecock',        note: 'Black shirt',                                   img: '/print-files/WOODSTOCK-04-jacksonville-gamecock-BLACK.png',  bg: '#111',    price: '$35', method: 'DTF',        dims: '10" × 10"',   file: 'WOODSTOCK-04-jacksonville-gamecock-BLACK.png',   sizes: { s: 1, m: 2, l: 3, xl: 2, xxl: 0 } },
  { id: 'W5',  label: 'Coldwater Mountain',           note: 'Forest green shirt',                            img: '/print-files/WOODSTOCK-05-coldwater-mountain-FOREST-GREEN.png', bg: '#2c4a2c', price: '$35', method: 'DTF',    dims: '10" × 8.7"',  file: 'WOODSTOCK-05-coldwater-mountain-FOREST-GREEN.png', sizes: { s: 1, m: 2, l: 3, xl: 2, xxl: 0 } },
  { id: 'W6',  label: 'Pinhoti Trail',                note: 'Black shirt',                                   img: '/print-files/WOODSTOCK-06-pinhoti-trail-BLACK.png',          bg: '#111',    price: '$35', method: 'DTF',        dims: '10" × 9.6"',  file: 'WOODSTOCK-06-pinhoti-trail-BLACK.png',           sizes: { s: 1, m: 2, l: 3, xl: 2, xxl: 0 } },
  { id: 'W7',  label: 'Lickskillet Circle',           note: 'Natural/olive shirt',                           img: '/print-files/WOODSTOCK-07-lickskillet-circle-OLIVE.png',     bg: '#565f40', price: '$35', method: 'DTF',        dims: '10" × 10"',   file: 'WOODSTOCK-07-lickskillet-circle-OLIVE.png',      sizes: { s: 1, m: 2, l: 2, xl: 1, xxl: 0 } },
  { id: 'W8',  label: 'Fort McClellan',               note: 'Black shirt',                                   img: '/print-files/WOODSTOCK-08-fort-mcclellan-BLACK.png',         bg: '#111',    price: '$35', method: 'DTF',        dims: '10" × 7.7"',  file: 'WOODSTOCK-08-fort-mcclellan-BLACK.png',          sizes: { s: 1, m: 1, l: 2, xl: 1, xxl: 0 } },
  { id: 'W9',  label: 'Blossom & Decay',              note: 'Mocha shirt',                                   img: '/print-files/WOODSTOCK-09-blossom-decay-MOCHA.png',          bg: '#140e0a', price: '$35', method: 'DTF',        dims: '10" × 10"',   file: 'WOODSTOCK-09-blossom-decay-MOCHA.png',           sizes: { s: 1, m: 1, l: 2, xl: 1, xxl: 0 } },
  { id: 'W10', label: 'PV Raiders XC',                note: 'Black shirt · 25% → Raiders program · front + back', img: '/print-files/WOODSTOCK-10-pv-raiders-xc-BLACK.png',       bg: '#9ab3d4', price: '$35', method: 'DTF', dims: '12" × 12"', backDims: '12" × 12"', file: 'WOODSTOCK-10-pv-raiders-xc-BLACK.png',       backFile: 'WOODSTOCK-10-pv-raiders-xc-BACK-BLACK.png', sizes: { s: 1, m: 2, l: 3, xl: 1, xxl: 1 } },
  { id: 'W11', label: 'Cheaha — Building the Skyway', note: 'Black shirt · Cheaha State Park',              img: '/print-files/WOODSTOCK-11-cheaha-skyway-BLACK.png',         bg: '#111',    price: '$35', method: 'DTF',        dims: '10" × 10.5"', file: 'WOODSTOCK-11-cheaha-skyway-BLACK.png',           sizes: { s: 1, m: 3, l: 4, xl: 2, xxl: 1 } },
  { id: 'W12', label: 'Blossom & Decay — Roses',      note: 'Mocha shirt · 2nd design',                     img: '/print-files/WOODSTOCK-12-blossom-decay-roses-MOCHA.png',   bg: '#140e0a', price: '$35', method: 'DTF',        dims: '10" × 10.2"', file: 'WOODSTOCK-12-blossom-decay-roses-MOCHA.png',     sizes: { s: 1, m: 2, l: 2, xl: 1, xxl: 0 } },
  { id: 'FR1', label: 'Freedom Riders — Burning Bus',  note: 'White shirt · woodcut · separate vendor',      img: '/print-files/FREEDOM-RIDERS-01-burning-bus-WHITE.png',     bg: '#f8f8f8', price: '$40', method: 'WATERPRINT', dims: '10" × 5.6"',  file: 'FREEDOM-RIDERS-01-burning-bus-WHITE.png',        sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 }, waterprint: true },
  { id: 'FR2', label: 'Freedom Riders — Dennis',       note: 'White shirt · black hedcut · separate vendor', img: '/print-files/FREEDOM-RIDERS-02-dennis-portrait-BLACK.png',  bg: '#111',    price: '$40', method: 'WATERPRINT', dims: '10" × 12"',   file: 'FREEDOM-RIDERS-02-dennis-portrait-BLACK.png',    sizes: { s: 1, m: 1, l: 2, xl: 1, xxl: 0 }, waterprint: true },
]

const ECCLESIA: Shirt[] = [
  { id: 'E1',  label: 'Ecclesia Stone — Ancient Paths',     note: 'Black shirt · 8-bit forest scene',             img: '/print-files/ECCLESIA-01-stone-ancient-paths-BLACK.png',  bg: '#0c0c0c', price: '$35', method: 'DTF', dims: '12" × 13.7"', file: 'ECCLESIA-01-stone-ancient-paths-BLACK.png',  sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'E2',  label: "Cheshire — We're All Mad Here",      note: 'Black shirt · also the early church',           img: '/print-files/ECCLESIA-02-cheshire-cat-BLACK.png',         bg: '#0c0c0c', price: '$35', method: 'DTF', dims: '12" × 19.6"', file: 'ECCLESIA-02-cheshire-cat-BLACK.png',         sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'E3',  label: 'We are all on the way. — Celtic',    note: 'Black shirt · Celtic triskelion',               img: '/print-files/ECCLESIA-03-coin-celtic-BLACK.png',          bg: '#0c0c0c', price: '$32', method: 'DTF', dims: '10" × 10"',   file: 'ECCLESIA-03-coin-celtic-BLACK.png',          sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'E4',  label: 'We are all on the way. — 8-bit',    note: 'Black shirt · pixel art triskelion · glowing',  img: '/print-files/ECCLESIA-04-coin-8bit-BLACK.png',            bg: '#0c0c0c', price: '$28', method: 'DTF', dims: '10" × 10"',   file: 'ECCLESIA-04-coin-8bit-BLACK.png',            sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'E5',  label: 'Ecclesia — Pilgrims',                note: 'Black shirt · forest scene · pilgrims',         img: '/print-files/ECCLESIA-05-pilgrims-BLACK.png',             bg: '#0c0c0c', price: '$30', method: 'DTF', dims: '10" × 10"',   file: 'ECCLESIA-05-pilgrims-BLACK.png',             sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'E6',  label: 'You were not chewed gum.',           note: 'Black shirt · Ecclesia Press · Psalm 139:14',   img: '/print-files/ECCLESIA-06-chewed-gum-BLACK.png',           bg: '#0c0c0c', price: '$28', method: 'DTF', dims: '10" × 12"',   file: 'ECCLESIA-06-chewed-gum-BLACK.png',           sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'E7',  label: 'We are all on the way. — Photoreal', note: 'Black shirt · Celtic knotwork · photoreal',    img: '/print-files/ECCLESIA-07-coin-photoreal-BLACK.png',       bg: '#0c0c0c', price: '$32', method: 'DTF', dims: '10" × 10"',   file: 'ECCLESIA-07-coin-photoreal-BLACK.png',       sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'E8',  label: 'He is not here.',                    note: 'Black shirt · 8-bit skeleton · Easter',         img: '/print-files/ECCLESIA-08-he-is-not-here-BLACK.png',       bg: '#0c0c0c', price: '$28', method: 'DTF', dims: '10" × 10"',   file: 'ECCLESIA-08-he-is-not-here-BLACK.png',       sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'E9',  label: 'The Wound Is the Way.',              note: 'Kintsugi brass bowl · Attune · Rohr · Nouwen',  img: '/print-files/ECCLESIA-09-wound-is-the-way-BLACK.png',     bg: '#111',    price: '$32', method: 'DTF', dims: '10" × 12"',   file: 'ECCLESIA-09-wound-is-the-way-BLACK.png',     sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
]

const ECCLESIA_STICKERS: Shirt[] = [
  { id: 'ES1', label: 'Ancient Paths Sticker',             note: '3" vinyl · standing stone · ECCLESIA ring',     img: '/print-files/ECCLESIA-S1-stone-sticker.png',            bg: '#0c0c0c', price: '$5',  method: 'DTF', dims: '3" × 3"',     file: 'ECCLESIA-S1-stone-sticker.png',                sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'ES2', label: 'Ecclesia Coin — 8-bit Sticker',     note: '3" vinyl · triskelion · distressed',            img: '/print-files/ECCLESIA-S2-coin-sticker-8bit.png',        bg: '#0c0c0c', price: '$5',  method: 'DTF', dims: '3" × 3"',     file: 'ECCLESIA-S2-coin-sticker-8bit.png',            sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'ES3', label: 'Ecclesia Coin — Photoreal Sticker', note: '3" vinyl · Celtic knotwork · high detail',      img: '/print-files/ECCLESIA-S3-coin-sticker-photoreal.png',   bg: '#0c0c0c', price: '$5',  method: 'DTF', dims: '3" × 3"',     file: 'ECCLESIA-S3-coin-sticker-photoreal.png',       sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'ES6', label: 'The Wound Is the Way · Sticker',   note: '3" vinyl · photoreal brass bowl · die-cut',      img: '/print-files/ECCLESIA-S6-wound-bowl-sticker.png',       bg: '#0c0c0c', price: '$5',  method: 'DTF', dims: '3" × 3"',     file: 'ECCLESIA-S6-wound-bowl-sticker.png',           sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
]

const SL: Shirt[] = [
  { id: 'S1', label: 'SL Run Alabama',                    note: 'Black shirt',                     img: '/print-files/SL-01-run-alabama-BLACK.png',            bg: '#111',    price: '$35', method: 'DTF', dims: '10" × 10"',   file: 'SL-01-run-alabama-BLACK.png',              sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S3', label: 'Anniston 45',                       note: 'Navy shirt',                      img: '/print-files/SL-03-anniston-45-NAVY.png',             bg: '#111',    price: '$35', method: 'DTF', dims: '10" × 10"',   file: 'SL-03-anniston-45-NAVY.png',               sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S4', label: 'Model City',                        note: 'Black shirt',                     img: '/print-files/SL-04-model-city-anniston-BLACK.png',    bg: '#111',    price: '$35', method: 'DTF', dims: '7" × 7.9"',   file: 'SL-04-model-city-anniston-BLACK.png',      sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S5', label: 'Piedmont — Changed Our Name Like Socks', note: 'Cream shirt · identity crisis', img: '/print-files/SL-05-piedmont-name-changes-CREAM.png', bg: '#f0ebe0', price: '$35', method: 'DTG', dims: '10" × 13.9"', file: 'SL-05-piedmont-name-changes-CREAM.png', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S6', label: 'Piedmont — CLT Mile 0',             note: 'Black shirt',                     img: '/print-files/SL-06-piedmont-clt-banner-BLACK.png',    bg: '#111',    price: '$35', method: 'DTF', dims: '10" × 10"',   file: 'SL-06-piedmont-clt-banner-BLACK.png',      sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S7', label: 'Noccalula Falls',                   note: 'Black shirt',                     img: '/print-files/SL-07-noccalula-falls-BLACK.png',        bg: '#111',    price: '$35', method: 'DTF', dims: '12" × 6.7"',  file: 'SL-07-noccalula-falls-BLACK.png',          sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S8', label: 'Where the Water Thunders',          note: 'Black shirt · Noccalula Falls woodcut', img: '/print-files/SL-08-noccalula-water-thunders-BLACK.png', bg: '#0a1c1c', price: '$35', method: 'DTF', dims: '10" × 10"', file: 'SL-08-noccalula-water-thunders-BLACK.png', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S9',  label: 'Go With the Flow',         note: 'Cream shirt · Noccalula Falls · retro sun',          img: '/print-files/SL-09-noccalula-go-with-the-flow-CREAM.png',  bg: '#f5ede0', price: '$35', method: 'DTG', dims: '10" × 14.1"', file: 'SL-09-noccalula-go-with-the-flow-CREAM.png',  sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'S10', label: 'I Did It for the Gram',    note: 'Cream shirt · Noccalula Falls statue + thumb',        img: '/print-files/SL-10-noccalula-for-the-gram-CREAM.png',     bg: '#f0ebe0', price: '$35', method: 'DTG', dims: '10" × 10.9"', file: 'SL-10-noccalula-for-the-gram-CREAM.png',     sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
]

const BD_STICKERS: Shirt[] = [
  { id: 'BD3', label: 'Blossom & Decay — Clean',           note: '3" vinyl · gothic skull + text · cream bg',       img: '/print-files/BD-S3-blossom-decay-clean.png',     bg: '#e8dfd0', price: '$5',  method: 'DTF', dims: '3" × 3"', file: 'BD-S3-blossom-decay-clean.png',     sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
  { id: 'BD4', label: 'Blossom & Decay — Sugar Skull',     note: '3" vinyl · sugar skull · no text',                img: '/print-files/BD-S4-sugar-skull.png',             bg: '#1a0a14', price: '$5',  method: 'DTF', dims: '3" × 3"', file: 'BD-S4-sugar-skull.png',             sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } },
]

const ALL_SHIRTS = [...WOODSTOCK, ...ECCLESIA, ...ECCLESIA_STICKERS, ...BD_STICKERS, ...SL]

const METHOD_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  DTF:        { bg: 'rgba(59,130,246,0.15)',  color: '#93c5fd', label: 'DTF' },
  DTG:        { bg: 'rgba(16,185,129,0.15)',  color: '#6ee7b7', label: 'DTG' },
  WATERPRINT: { bg: 'rgba(248,113,113,0.15)', color: '#fca5a5', label: 'WATERPRINT' },
  SCREEN:     { bg: 'rgba(251,191,36,0.15)',  color: '#fde68a', label: 'SCREEN' },
}

function DesignCard({ s }: { s: Shirt }) {
  const ms = METHOD_STYLES[s.method] ?? METHOD_STYLES.DTF
  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden', border: `1px solid ${s.waterprint ? 'rgba(248,113,113,0.2)' : 'rgba(240,237,232,0.08)'}` }}>
      <div style={{ background: s.bg, aspectRatio: '1', position: 'relative' }}>
        <Image src={s.img} alt={s.label} fill style={{ objectFit: 'cover' }} sizes="200px" />
      </div>
      <div style={{ padding: '0.65rem 0.75rem 0.7rem', background: 'rgba(255,255,255,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.15rem' }}>
          <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f0ede8', margin: 0 }}>{s.label}</p>
          <span style={{ flexShrink: 0, fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.06em', padding: '0.15rem 0.4rem', borderRadius: '3px', background: ms.bg, color: ms.color }}>{ms.label}</span>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'rgba(240,237,232,0.45)', lineHeight: 1.3, marginBottom: '0.25rem' }}>{s.note}</p>
        <p style={{ fontSize: '0.72rem', color: 'rgba(240,237,232,0.28)', marginBottom: '0.5rem', fontFamily: 'monospace' }}>{s.dims}</p>
        {s.file ? (
          s.backFile ? (
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <a href={`/print-files/${s.file}`} download={s.file}
                style={{ flex: 1, display: 'block', textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, padding: '0.4rem 0.25rem', borderRadius: '5px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.15)' }}>
                ↓ Front
              </a>
              <a href={`/print-files/${s.backFile}`} download={s.backFile}
                style={{ flex: 1, display: 'block', textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, padding: '0.4rem 0.25rem', borderRadius: '5px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.15)' }}>
                ↓ Back
              </a>
            </div>
          ) : (
            <a href={`/print-files/${s.file}`} download={s.file}
              style={{ display: 'block', textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, padding: '0.4rem 0', borderRadius: '5px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.15)', cursor: 'pointer' }}>
              ↓ Download
            </a>
          )
        ) : (
          <p style={{ fontSize: '0.75rem', color: 'rgba(240,237,232,0.2)', textAlign: 'center', padding: '0.4rem 0' }}>No file — vendor handles</p>
        )}
      </div>
    </div>
  )
}

function SectionHead({ label, count, accent }: { label: string; count: number; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem', marginTop: '2rem' }}>
      <div style={{ width: '3px', height: '1.1rem', background: accent, borderRadius: '2px', flexShrink: 0 }} />
      <p style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(240,237,232,0.35)' }}>
        {label} <span style={{ color: accent }}>({count})</span>
      </p>
    </div>
  )
}

function DesignGrid({ shirts }: { shirts: Shirt[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {shirts.map((s) => <DesignCard key={s.id} s={s} />)}
    </div>
  )
}

export default function WoodstockPrintPage() {
  const woodstockDTF = WOODSTOCK.filter(s => !s.waterprint)
  const totS = woodstockDTF.reduce((a, s) => a + s.sizes.s, 0)
  const totM = woodstockDTF.reduce((a, s) => a + s.sizes.m, 0)
  const totL = woodstockDTF.reduce((a, s) => a + s.sizes.l, 0)
  const totXL = woodstockDTF.reduce((a, s) => a + s.sizes.xl, 0)
  const totXXL = woodstockDTF.reduce((a, s) => a + s.sizes.xxl, 0)
  const grandTotal = totS + totM + totL + totXL + totXXL

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#f0ede8' }}>
      {/* Pinhoti hero banner */}
      <div style={{ position: 'relative', width: '100%', height: '320px', overflow: 'hidden' }}>
        <Image
          src="/print-files/WOODSTOCK-06-pinhoti-trail-BLACK.png"
          alt="Pinhoti Trail — Woodstock 5K"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          sizes="100vw"
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8102E', fontWeight: 700, marginBottom: '0.3rem' }}>Woodstock 5K · Aug 2 · Anniston, AL</p>
          <p style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 900, color: '#f0ede8', lineHeight: 1.1 }}>Merch</p>
        </div>
      </div>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Download all ZIP — top CTA */}
        <a
          href="/print-files/Woodstock-All-Prints-SL-Ecclesia.zip"
          download="Woodstock-All-Prints-SL-Ecclesia.zip"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', background: '#C8102E', color: '#fff', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.04em', padding: '0.9rem 1.5rem', borderRadius: '8px', textDecoration: 'none', marginBottom: '1.25rem' }}
        >
          ↓ Download All Print Files (ZIP · 21 designs)
        </a>

        <p style={{ color: 'rgba(240,237,232,0.5)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
          {ALL_SHIRTS.length} designs — {WOODSTOCK.filter(s=>!s.waterprint).length} Woodstock + {ECCLESIA.length} Ecclesia + {ECCLESIA_STICKERS.length} stickers + {BD_STICKERS.length} B&D + {SL.length} SL · 300 DPI
          <br /><span style={{ color: 'rgba(240,237,232,0.35)', fontSize: '0.85rem' }}>Freedom Riders = waterprint, separate vendor. File names include shirt color.</span>
        </p>

        {/* Sizes table */}
        <h2 style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', marginBottom: '0.6rem', fontWeight: 700 }}>
          Sizes &amp; Quantities
        </h2>
        <div style={{ border: '1px solid rgba(240,237,232,0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Design', 'Method', 'S', 'M', 'L', 'XL', '2XL', 'Total'].map((h) => (
                  <th key={h} style={{ padding: '0.6rem 0.65rem', textAlign: h === 'Design' || h === 'Method' ? 'left' : 'center', color: 'rgba(240,237,232,0.3)', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {woodstockDTF.map((s, i) => {
                const total = s.sizes.s + s.sizes.m + s.sizes.l + s.sizes.xl + s.sizes.xxl
                return (
                  <tr key={s.id} style={{ borderTop: '1px solid rgba(240,237,232,0.06)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                    <td style={{ padding: '0.55rem 0.65rem', fontSize: '0.88rem' }}>{s.label}</td>
                    <td style={{ padding: '0.55rem 0.65rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', padding: '0.15rem 0.4rem', borderRadius: '3px', background: (METHOD_STYLES[s.method] ?? METHOD_STYLES.DTF).bg, color: (METHOD_STYLES[s.method] ?? METHOD_STYLES.DTF).color }}>{s.method}</span>
                    </td>
                    {[s.sizes.s, s.sizes.m, s.sizes.l, s.sizes.xl, s.sizes.xxl].map((v, j) => (
                      <td key={j} style={{ padding: '0.5rem 0.6rem', textAlign: 'center', color: v > 0 ? '#CA8A04' : 'rgba(240,237,232,0.18)', fontWeight: v > 0 ? 700 : 400 }}>{v > 0 ? v : '—'}</td>
                    ))}
                    <td style={{ padding: '0.5rem 0.6rem', textAlign: 'center', fontWeight: 700, color: '#4ade80' }}>{total}</td>
                  </tr>
                )
              })}
              <tr style={{ borderTop: '2px solid rgba(240,237,232,0.12)', background: 'rgba(74,222,128,0.06)' }}>
                <td colSpan={2} style={{ padding: '0.6rem 0.6rem', fontWeight: 700 }}>TOTAL</td>
                {[totS, totM, totL, totXL, totXXL].map((v, j) => (
                  <td key={j} style={{ padding: '0.6rem 0.6rem', textAlign: 'center', fontWeight: 700, color: '#4ade80' }}>{v}</td>
                ))}
                <td style={{ padding: '0.6rem 0.6rem', textAlign: 'center', fontWeight: 800, color: '#4ade80', fontSize: '0.9rem' }}>{grandTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <SectionHead label="Woodstock 5K — Aug 2, Anniston" count={WOODSTOCK.length} accent="#C8102E" />
        <DesignGrid shirts={WOODSTOCK} />

        <SectionHead label="Ecclesia — Shirts, DTF quantities TBD" count={ECCLESIA.length} accent="#2dd4bf" />
        <DesignGrid shirts={ECCLESIA} />

        <SectionHead label="Ecclesia — Stickers, quantities TBD" count={ECCLESIA_STICKERS.length} accent="#4aba8a" />
        <DesignGrid shirts={ECCLESIA_STICKERS} />

        <SectionHead label="Southern Legends — DTF, quantities TBD" count={SL.length} accent="#CA8A04" />
        <DesignGrid shirts={SL} />

      </div>
    </main>
  )
}
