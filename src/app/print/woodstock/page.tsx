import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Print File Order — Woodstock 5K 2026',
  description: 'Print-ready designs for Woodstock 5K, Ecclesia, and Southern Legends.',
  robots: { index: false },
}

type Method = 'DTF' | 'DTG' | 'WATERPRINT' | 'SCREEN'

type YouthShirt = {
  id: string
  label: string
  color: string
  img: string
  bg: string
  file: string
  method: Method
  sizes: { ys: number; ym: number; yl: number }
}

type Shirt = {
  id: string
  label: string
  note: string
  color: string       // human-readable shirt/substrate color
  img: string
  bg: string          // hex used for image background in thumbnail
  price: string
  file: string
  backFile?: string
  dims: string
  backDims?: string
  sizes: { s: number; m: number; l: number; xl: number; xxl: number }
  method: Method
  sticker?: boolean
  qty?: number        // total qty for stickers (no size breakdown)
}

const WOODSTOCK: Shirt[] = [
  { id: 'W0',  label: 'Woodstock Avenue Oval',             color: 'Cream',        note: 'Event ★ hero design',              img: '/print-files/WOODSTOCK-00-woodstock-avenue-oval-CREAM.png',     bg: '#f0ebe0', price: '$35', method: 'DTG',        dims: '10" × 10"',   file: 'WOODSTOCK-00-woodstock-avenue-oval-CREAM.png',     sizes: { s: 6, m: 10, l: 10, xl: 6, xxl: 3 } },
  { id: 'W1',  label: 'I Survived Woodstock Ave',          color: 'Black',        note: 'Event ★ hero design',              img: '/print-files/WOODSTOCK-01-survived-woodstock-BLACK.png',        bg: '#1a1a1a', price: '$35', method: 'DTF',        dims: '10" × 10"',   file: 'WOODSTOCK-01-survived-woodstock-BLACK.png',        sizes: { s: 3, m: 7, l: 8, xl: 3, xxl: 2 } },
  { id: 'W11', label: 'Cheaha — Building the Skyway',      color: 'Black',        note: 'Cheaha State Park',                 img: '/print-files/WOODSTOCK-11-cheaha-skyway-BLACK.png',             bg: '#1a1a1a', price: '$35', method: 'DTF',        dims: '10" × 10.5"', file: 'WOODSTOCK-11-cheaha-skyway-BLACK.png',             sizes: { s: 1, m: 3, l: 5, xl: 2, xxl: 1 } },
  { id: 'W2',  label: 'CLT Hike + Explore',                color: 'Cream',        note: '',                                  img: '/print-files/WOODSTOCK-02-clt-hike-explore-CREAM.png',          bg: '#f0ebe0', price: '$35', method: 'DTG',        dims: '10" × 10"',   file: 'WOODSTOCK-02-clt-hike-explore-CREAM.png',          sizes: { s: 1, m: 3, l: 4, xl: 2, xxl: 1 } },
  { id: 'W3',  label: 'Cheaha Tower',                      color: 'Forest Green', note: '',                                  img: '/print-files/WOODSTOCK-03-cheaha-tower-BLACK.png',              bg: '#2c4a2c', price: '$35', method: 'DTF',        dims: '10" × 10"',   file: 'WOODSTOCK-03-cheaha-tower-BLACK.png',              sizes: { s: 2, m: 3, l: 4, xl: 2, xxl: 1 } },
  { id: 'W5',  label: 'Coldwater Mountain',                color: 'Forest Green', note: '',                                  img: '/print-files/WOODSTOCK-05-coldwater-mountain-FOREST-GREEN.png', bg: '#2c4a2c', price: '$35', method: 'DTF',        dims: '10" × 8.7"',  file: 'WOODSTOCK-05-coldwater-mountain-FOREST-GREEN.png', sizes: { s: 0, m: 1, l: 2, xl: 1, xxl: 0 } },
  { id: 'W6',  label: 'Pinhoti Trail',                     color: 'Black',        note: '',                                  img: '/print-files/WOODSTOCK-06-pinhoti-trail-BLACK.png',             bg: '#1a1a1a', price: '$35', method: 'DTF',        dims: '10" × 9.6"',  file: 'WOODSTOCK-06-pinhoti-trail-BLACK.png',             sizes: { s: 0, m: 1, l: 2, xl: 1, xxl: 0 } },
  { id: 'W7',  label: 'Lickskillet Circle',                color: 'Olive',        note: '',                                  img: '/print-files/WOODSTOCK-07-lickskillet-circle-OLIVE.png',        bg: '#565f40', price: '$35', method: 'DTF',        dims: '10" × 10"',   file: 'WOODSTOCK-07-lickskillet-circle-OLIVE.png',        sizes: { s: 0, m: 1, l: 1, xl: 0, xxl: 0 } },
  { id: 'W9',  label: 'Blossom & Decay',                   color: 'Mocha',        note: 'Art crowd · conversation piece',   img: '/print-files/WOODSTOCK-09-blossom-decay-trans.png',             bg: '#6b4c35', price: '$35', method: 'DTF',        dims: '10" × 10"',   file: 'WOODSTOCK-09-blossom-decay-MOCHA.png',             sizes: { s: 0, m: 1, l: 1, xl: 1, xxl: 0 } },
  { id: 'W12', label: 'Blossom & Decay — Roses',           color: 'Mocha',        note: 'Sugar skull roses · full color',   img: '/print-files/WOODSTOCK-12-blossom-decay-roses-trans.png',       bg: '#1a1a1a', price: '$35', method: 'DTF',        dims: '10" × 10"',   file: 'WOODSTOCK-12-blossom-decay-roses-MOCHA.png',       sizes: { s: 0, m: 1, l: 1, xl: 1, xxl: 0 } },
  { id: 'W10', label: 'PV Raiders XC',                     color: 'Black',        note: '25% → Raiders program · front + back', img: '/print-files/WOODSTOCK-10-pv-raiders-xc-BLACK.png',       bg: '#1a1a1a', price: '$35', method: 'DTF',        dims: '12" × 12"',   backDims: '12" × 12"', file: 'WOODSTOCK-10-pv-raiders-xc-BLACK.png', backFile: 'WOODSTOCK-10-pv-raiders-xc-BACK-BLACK.png', sizes: { s: 1, m: 1, l: 2, xl: 1, xxl: 0 } },
  { id: 'FR1', label: 'Freedom Riders — Burning Bus',      color: 'White',        note: 'Woodcut · 1-color black · 100% → West Anniston Foundation', img: '/print-files/FREEDOM-RIDERS-01-burning-bus-WHITE.png',         bg: '#f8f8f8', price: '$40', method: 'WATERPRINT', dims: '10" × 5.6"',  file: 'FREEDOM-RIDERS-01-burning-bus-WHITE.png',          sizes: { s: 1, m: 2, l: 3, xl: 1, xxl: 1 } },
  { id: 'FR2', label: 'Freedom Riders — David Dennis',     color: 'White',        note: 'Hedcut portrait · 100% → West Anniston Foundation',          img: '/print-files/FREEDOM-RIDERS-02-dennis-portrait-BLACK.png',     bg: '#f8f8f8', price: '$40', method: 'WATERPRINT', dims: '10" × 12"',   file: 'FREEDOM-RIDERS-02-dennis-portrait-BLACK.png',      sizes: { s: 1, m: 2, l: 3, xl: 1, xxl: 1 } },
]

const ECCLESIA: Shirt[] = [
  { id: 'E2', label: "Cheshire — We're All Mad Here",      color: 'Black',        note: 'Also the early church · best for this crowd', img: '/print-files/ECCLESIA-02-cheshire-cat-BLACK.png',  bg: '#1a1a1a', price: '$35', method: 'DTF', dims: '12" × 19.6"', file: 'ECCLESIA-02-cheshire-cat-BLACK.png',         sizes: { s: 2, m: 4, l: 4, xl: 2, xxl: 1 } },
  { id: 'E1', label: 'Ecclesia Stone — Ancient Paths',     color: 'Black',        note: '8-bit forest scene · display only',           img: '/print-files/ECCLESIA-01-stone-ancient-paths-BLACK.png', bg: '#1a1a1a', price: '$35', method: 'DTF', dims: '12" × 13.7"', file: 'ECCLESIA-01-stone-ancient-paths-BLACK.png',  sizes: { s: 0, m: 0, l: 1, xl: 0, xxl: 0 } },
  { id: 'E5', label: 'Ecclesia — Pilgrims',               color: 'Black',        note: 'Forest scene · display only',                 img: '/print-files/ECCLESIA-05-pilgrims-BLACK.png',           bg: '#1a1a1a', price: '$30', method: 'DTF', dims: '10" × 10"',   file: 'ECCLESIA-05-pilgrims-BLACK.png',             sizes: { s: 0, m: 0, l: 1, xl: 0, xxl: 0 } },
]

const ECCLESIA_STICKERS: Shirt[] = [
  { id: 'ES1', label: 'Ancient Paths Sticker',             color: 'Vinyl',        note: 'Standing stone · ECCLESIA ring',   img: '/print-files/ECCLESIA-S1-stone-sticker.png',                   bg: '#1a1a1a', price: '$5',  method: 'DTF', dims: '3" × 3"', file: 'ECCLESIA-S1-stone-sticker.png',             sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 }, sticker: true, qty: 25 },
  { id: 'ES2', label: 'Ecclesia Coin — 8-bit Sticker',     color: 'Vinyl',        note: 'Triskelion · distressed',          img: '/print-files/ECCLESIA-S2-coin-sticker-8bit.png',               bg: '#1a1a1a', price: '$5',  method: 'DTF', dims: '3" × 3"', file: 'ECCLESIA-S2-coin-sticker-8bit.png',         sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 }, sticker: true, qty: 25 },
  { id: 'ES3', label: 'Ecclesia Coin — Photoreal Sticker', color: 'Vinyl',        note: 'Celtic knotwork · high detail',    img: '/print-files/ECCLESIA-S3-coin-sticker-photoreal.png',          bg: '#1a1a1a', price: '$5',  method: 'DTF', dims: '3" × 3"', file: 'ECCLESIA-S3-coin-sticker-photoreal.png',    sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 }, sticker: true, qty: 25 },
  { id: 'ES6', label: 'The Wound Is the Way · Sticker',    color: 'Vinyl',        note: 'Photoreal brass bowl · die-cut',   img: '/print-files/ECCLESIA-S6-wound-bowl-sticker.png',              bg: '#1a1a1a', price: '$5',  method: 'DTF', dims: '3" × 3"', file: 'ECCLESIA-S6-wound-bowl-sticker.png',        sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 }, sticker: true, qty: 25 },
]

const FR_STICKERS: Shirt[] = [
  { id: 'FRS1', label: 'Freedom Riders — Burning Bus Sticker', color: 'Vinyl',   note: 'Horizontal die-cut · 100% → West Anniston Foundation', img: '/print-files/FREEDOM-RIDERS-S1-burning-bus-sticker.png', bg: '#f8f8f8', price: '$5', method: 'DTF', dims: '4" × 3"', file: 'FREEDOM-RIDERS-S1-burning-bus-sticker.png', sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 }, sticker: true, qty: 50 },
  { id: 'FRS2', label: 'Freedom Riders — David Dennis Sticker', color: 'Vinyl',  note: 'Square · dark bg · 100% → West Anniston Foundation',   img: '/print-files/FREEDOM-RIDERS-S2-dennis-sticker.png',      bg: '#1a1a1a', price: '$5', method: 'DTF', dims: '3" × 3"', file: 'FREEDOM-RIDERS-S2-dennis-sticker.png',      sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 }, sticker: true, qty: 50 },
]

const BD_STICKERS: Shirt[] = [
  { id: 'BD3', label: 'Blossom & Decay — Clean',           color: 'Vinyl',        note: 'Gothic skull + text · cream bg',   img: '/print-files/BD-S3-blossom-decay-clean.png',                   bg: '#e8dfd0', price: '$5',  method: 'DTF', dims: '3" × 3"', file: 'BD-S3-blossom-decay-clean.png',             sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 }, sticker: true, qty: 25 },
  { id: 'BD4', label: 'Blossom & Decay — Sugar Skull',     color: 'Vinyl',        note: 'Sugar skull · curved text',        img: '/print-files/BD-S4-sugar-skull.png',                           bg: '#1a0a14', price: '$5',  method: 'DTF', dims: '3" × 3"', file: 'BD-S4-sugar-skull.png',                     sizes: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 }, sticker: true, qty: 25 },
]

const SL: Shirt[] = [
  { id: 'S3',  label: 'Anniston 45',                       color: 'Navy',         note: 'Local pride · strong seller',       img: '/print-files/SL-03-anniston-45-NAVY.png',                      bg: '#1a2744', price: '$35', method: 'DTF', dims: '10" × 10"',   file: 'SL-03-anniston-45-NAVY.png',                sizes: { s: 2, m: 4, l: 6, xl: 2, xxl: 1 } },
  { id: 'S4',  label: 'Model City',                        color: 'Black',        note: 'Local pride · strong seller',       img: '/print-files/SL-04-model-city-anniston-BLACK.png',             bg: '#1a1a1a', price: '$35', method: 'DTF', dims: '7" × 7.9"',   file: 'SL-04-model-city-anniston-BLACK.png',       sizes: { s: 1, m: 3, l: 3, xl: 2, xxl: 0 } },
  { id: 'S7',  label: 'Noccalula Falls',                   color: 'Black',        note: 'Gadsden crowd',                     img: '/print-files/SL-07-noccalula-falls-BLACK.png',                 bg: '#1a1a1a', price: '$35', method: 'DTF', dims: '12" × 6.7"',  file: 'SL-07-noccalula-falls-BLACK.png',           sizes: { s: 1, m: 2, l: 2, xl: 1, xxl: 0 } },
  { id: 'S8',  label: 'Where the Water Thunders',          color: 'Black',        note: 'Noccalula woodcut · shallow stock', img: '/print-files/SL-08-noccalula-water-thunders-BLACK.png',        bg: '#0a1c1c', price: '$35', method: 'DTF', dims: '10" × 10"',   file: 'SL-08-noccalula-water-thunders-BLACK.png',  sizes: { s: 0, m: 1, l: 1, xl: 1, xxl: 0 } },
]

const NEUROSPICY: Shirt[] = [
  { id: 'NS1',  label: 'Neuro-Spicy — Nutrition Label',    color: 'Cream',        note: 'DTG · nutrition label parody',      img: '/print-files/NEUROSPICY-01-nutrition-label-CREAM.png',         bg: '#f0ebe0', price: '$35', method: 'DTG', dims: '10" × 10"',   file: 'NEUROSPICY-01-nutrition-label-CREAM.png',           sizes: { s: 2, m: 4, l: 4, xl: 2, xxl: 1 } },
  { id: 'MH1',  label: 'I Contain Multitudes',             color: 'Cream',        note: 'Walt Whitman · mental health series', img: '/print-files/MENTAL-HEALTH-01-i-contain-multitudes-CREAM.png', bg: '#f0ebe0', price: '$30', method: 'DTG', dims: '12" × 16"',   file: 'MENTAL-HEALTH-01-i-contain-multitudes-CREAM.png',   sizes: { s: 1, m: 3, l: 3, xl: 2, xxl: 1 } },
]

const YOUTH: YouthShirt[] = [
  { id: 'W0Y',  label: 'Woodstock Oval — Youth',       color: 'Cream', img: '/print-files/WOODSTOCK-00-woodstock-avenue-oval-CREAM.png', bg: '#f0ebe0', file: 'WOODSTOCK-00-woodstock-avenue-oval-CREAM.png', method: 'DTG', sizes: { ys: 3, ym: 4, yl: 3 } },
  { id: 'W1Y',  label: 'I Survived Woodstock — Youth', color: 'Black', img: '/print-files/WOODSTOCK-01-survived-woodstock-BLACK.png',    bg: '#1a1a1a', file: 'WOODSTOCK-01-survived-woodstock-BLACK.png',    method: 'DTF', sizes: { ys: 3, ym: 4, yl: 3 } },
  { id: 'W10Y', label: 'PV Raiders XC — Youth',        color: 'Black', img: '/print-files/WOODSTOCK-10-pv-raiders-xc-BLACK.png',         bg: '#1a1a1a', file: 'WOODSTOCK-10-pv-raiders-xc-BLACK.png',         method: 'DTF', sizes: { ys: 3, ym: 4, yl: 3 } },
]

// ── BOOTH PRINT PACKAGE (non-shirt items) ──────────────────────────────────
type PrintStatus = 'ready' | 'needs-design' | 'optional'
type PrintCategory = 'signage' | 'program' | 'hangtag' | 'flyer' | 'pdf'

type PrintItem = {
  id: string
  label: string
  category: PrintCategory
  spec: string
  qty: number
  status: PrintStatus
  file?: string
  notes?: string
}

const PRINT_PACKAGE: PrintItem[] = [
  { id: 'BANNER',     label: 'Booth Banner',                    category: 'signage',  spec: "8′ × 3′ vinyl",                    qty: 1,   status: 'ready',        file: '/print-files/SL-BOOTH-BANNER-evergreen.png', notes: 'SL evergreen design — order at Vistaprint or local sign shop · allow 2–3 days' },
  { id: 'PRICE-SIGN', label: 'Shirt Price Sign',                category: 'signage',  spec: '11″ × 17″ laminated',                qty: 2,   status: 'needs-design', notes: 'Adult $30–$40 · Youth $20 · Stickers $5' },
  { id: 'PV-SIGN',    label: 'PV Raiders Fundraiser Sign',      category: 'signage',  spec: '8.5″ × 11″ laminated',               qty: 1,   status: 'needs-design', notes: '"25% of every PV Raiders shirt supports Raiders XC"' },
  { id: 'QR-SIGN',    label: 'QR Code — Order More Online',     category: 'signage',  spec: '5″ × 7″ card or laminated',          qty: 2,   status: 'needs-design', notes: 'QR → southernlegends.org/merch · "More designs · all sizes"' },
  { id: 'FR-FLYER',  label: 'Freedom Riders Proceeds Flyer',   category: 'flyer',    spec: '8.5″ × 11″ card stock',              qty: 25,  status: 'ready',        file: '/print-files/freedom-riders-proceeds-flyer.html', notes: 'Open HTML in browser → Print → Save as PDF · card stock recommended' },
  { id: 'PVXC-PDF',  label: 'PV Raiders XC — Full Print Layout', category: 'pdf',    spec: 'PDF · all sizes reference',           qty: 1,   status: 'ready',        file: '/merch/pvxc/pv-raiders-xc-ALL-PRINT.pdf',         notes: 'Full print spec including back design · share with printer' },
  { id: 'PROGRAM',   label: 'Event Program / SL Insert',        category: 'program',  spec: '8.5″ × 11″ half-sheet or trifold',   qty: 100, status: 'needs-design', notes: 'Race bag insert · SL intro · Woodstock story · QR to merch page' },
  { id: 'HANG-TAG',  label: 'Shirt Hang Tags',                  category: 'hangtag', spec: '3.5″ × 2″ card stock · hole punch',  qty: 75,  status: 'needs-design', notes: 'Design · size · $$ · southernlegends.org · QR code' },
]

const CATEGORY_LABELS: Record<PrintCategory, string> = {
  signage: 'Signage',
  program: 'Program / Insert',
  hangtag: 'Hang Tags',
  flyer: 'Flyer',
  pdf: 'PDF Layout',
}

const ALL_SHIRTS = [...WOODSTOCK, ...NEUROSPICY, ...ECCLESIA, ...ECCLESIA_STICKERS, ...FR_STICKERS, ...BD_STICKERS, ...SL]
const ALL_TSHIRTS = ALL_SHIRTS.filter(s => !s.sticker)
const ALL_STICKERS = ALL_SHIRTS.filter(s => s.sticker)

const METHOD_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  DTF:        { bg: 'rgba(59,130,246,0.15)',  color: '#93c5fd', label: 'DTF' },
  DTG:        { bg: 'rgba(16,185,129,0.15)',  color: '#6ee7b7', label: 'DTG' },
  WATERPRINT: { bg: 'rgba(248,113,113,0.15)', color: '#fca5a5', label: 'WATERPRINT' },
  SCREEN:     { bg: 'rgba(251,191,36,0.15)',  color: '#fde68a', label: 'SCREEN' },
}

function ColorSwatch({ bg, label }: { bg: string; label: string }) {
  const border = bg === '#f8f8f8' || bg === '#f0ebe0' || bg === '#f5ede0' || bg === '#e8dfd0'
    ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(240,237,232,0.08)'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
      <span style={{ width: '0.7rem', height: '0.7rem', borderRadius: '2px', background: bg, border, flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontSize: '0.75rem', color: 'rgba(240,237,232,0.55)' }}>{label}</span>
    </span>
  )
}

function DesignCard({ s }: { s: Shirt }) {
  const ms = METHOD_STYLES[s.method] ?? METHOD_STYLES.DTF
  const sizeEntries: [string, number][] = [['S', s.sizes.s], ['M', s.sizes.m], ['L', s.sizes.l], ['XL', s.sizes.xl], ['2XL', s.sizes.xxl]]

  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(240,237,232,0.08)' }}>
      <div style={{ background: s.bg, aspectRatio: '1', position: 'relative' }}>
        <Image src={s.img} alt={s.label} fill style={{ objectFit: 'cover' }} sizes="200px" />
      </div>
      <div style={{ padding: '0.65rem 0.75rem 0.7rem', background: 'rgba(255,255,255,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.25rem' }}>
          <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f0ede8', margin: 0 }}>{s.label}</p>
          <span style={{ flexShrink: 0, fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.06em', padding: '0.15rem 0.4rem', borderRadius: '3px', background: ms.bg, color: ms.color }}>{ms.label}</span>
        </div>

        {/* Color swatch + note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
          <ColorSwatch bg={s.bg} label={s.color} />
          {s.note && <span style={{ fontSize: '0.72rem', color: 'rgba(240,237,232,0.3)' }}>· {s.note}</span>}
        </div>

        <p style={{ fontSize: '0.7rem', color: 'rgba(240,237,232,0.25)', marginBottom: '0.45rem', fontFamily: 'monospace' }}>{s.dims}</p>

        {/* Sizes row for shirts */}
        {!s.sticker && (
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            {sizeEntries.map(([sz, v]) => (
              <span key={sz} style={{
                fontSize: '0.66rem', fontWeight: v > 0 ? 700 : 400,
                padding: '0.15rem 0.3rem', borderRadius: '3px',
                background: v > 0 ? 'rgba(202,138,4,0.15)' : 'rgba(255,255,255,0.04)',
                color: v > 0 ? '#CA8A04' : 'rgba(240,237,232,0.2)',
                border: `1px solid ${v > 0 ? 'rgba(202,138,4,0.3)' : 'rgba(240,237,232,0.06)'}`,
              }}>
                {sz}{v > 0 && <span style={{ marginLeft: '0.18rem', color: '#f0ede8' }}>×{v}</span>}
              </span>
            ))}
          </div>
        )}

        {/* QTY row for stickers */}
        {s.sticker && (
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.66rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '3px', background: 'rgba(255,255,255,0.05)', color: 'rgba(240,237,232,0.3)', border: '1px solid rgba(240,237,232,0.07)' }}>
              QTY: {s.qty && s.qty > 0 ? s.qty : '—'}
            </span>
          </div>
        )}

        {/* Download buttons */}
        {s.file ? (
          s.backFile ? (
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <a href={`/print-files/${s.file}`} download={s.file}
                style={{ flex: 1, display: 'block', textAlign: 'center', fontSize: '0.73rem', fontWeight: 700, padding: '0.38rem 0.2rem', borderRadius: '5px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.14)' }}>
                ↓ Front
              </a>
              <a href={`/print-files/${s.backFile}`} download={s.backFile}
                style={{ flex: 1, display: 'block', textAlign: 'center', fontSize: '0.73rem', fontWeight: 700, padding: '0.38rem 0.2rem', borderRadius: '5px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.14)' }}>
                ↓ Back
              </a>
            </div>
          ) : (
            <a href={`/print-files/${s.file}`} download={s.file}
              style={{ display: 'block', textAlign: 'center', fontSize: '0.76rem', fontWeight: 700, padding: '0.38rem 0', borderRadius: '5px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.14)' }}>
              ↓ Download
            </a>
          )
        ) : (
          <p style={{ fontSize: '0.73rem', color: 'rgba(240,237,232,0.2)', textAlign: 'center', padding: '0.38rem 0' }}>No file</p>
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
  // Shirt totals (all non-sticker items)
  const totS   = ALL_TSHIRTS.reduce((a, s) => a + s.sizes.s, 0)
  const totM   = ALL_TSHIRTS.reduce((a, s) => a + s.sizes.m, 0)
  const totL   = ALL_TSHIRTS.reduce((a, s) => a + s.sizes.l, 0)
  const totXL  = ALL_TSHIRTS.reduce((a, s) => a + s.sizes.xl, 0)
  const totXXL = ALL_TSHIRTS.reduce((a, s) => a + s.sizes.xxl, 0)
  const grandTotal = totS + totM + totL + totXL + totXXL
  // Youth totals
  const yTotYS = YOUTH.reduce((a, s) => a + s.sizes.ys, 0)
  const yTotYM = YOUTH.reduce((a, s) => a + s.sizes.ym, 0)
  const yTotYL = YOUTH.reduce((a, s) => a + s.sizes.yl, 0)
  const yGrandTotal = yTotYS + yTotYM + yTotYL

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#f0ede8' }}>
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
        <Image src="/print-files/WOODSTOCK-06-pinhoti-trail-BLACK.png" alt="Woodstock 5K" fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="100vw" priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C8102E', fontWeight: 700, marginBottom: '0.3rem' }}>Woodstock 5K · Aug 2 · Anniston, AL</p>
          <p style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 900, color: '#f0ede8', lineHeight: 1.1 }}>Merch — All Vendors</p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Download ZIP */}
        <a href="/print-files/Woodstock-All-Prints-SL-Ecclesia.zip" download="Woodstock-All-Prints-SL-Ecclesia.zip"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', background: '#C8102E', color: '#fff', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.04em', padding: '0.9rem 1.5rem', borderRadius: '8px', textDecoration: 'none', marginBottom: '1rem' }}>
          ↓ Download All Print Files (ZIP · {ALL_SHIRTS.length} designs)
        </a>
        <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '0.82rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          {ALL_TSHIRTS.length} shirts + {ALL_STICKERS.length} stickers · 300 DPI · file names include shirt color
        </p>
        <div style={{ background: 'rgba(202,138,4,0.1)', border: '1px solid rgba(202,138,4,0.25)', borderRadius: '8px', padding: '0.75rem 1.25rem', marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#CA8A04', fontSize: '0.85rem', fontWeight: 700 }}>
            All colors, sizes, and varieties available online →{' '}
            <span style={{ color: '#f0ede8', fontFamily: 'monospace', fontSize: '0.8rem' }}>southernlegends.org/print/woodstock</span>
          </p>
          <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
            Booth quantities are limited · scan for the full catalog · order any design in any size
          </p>
        </div>

        {/* ── SHIRT SIZES TABLE ── */}
        <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', marginBottom: '0.6rem', fontWeight: 700 }}>
          Shirt Sizes &amp; Quantities — All Designs
        </h2>
        <div style={{ border: '1px solid rgba(240,237,232,0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '2rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', minWidth: '560px' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['ID', 'Design', 'Color', 'Method', 'S', 'M', 'L', 'XL', '2XL', 'Total', '↓'].map((h) => (
                  <th key={h} style={{ padding: '0.55rem 0.6rem', textAlign: ['ID','Design','Color','Method'].includes(h) ? 'left' : 'center', color: 'rgba(240,237,232,0.3)', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_TSHIRTS.map((s, i) => {
                const total = s.sizes.s + s.sizes.m + s.sizes.l + s.sizes.xl + s.sizes.xxl
                const ms = METHOD_STYLES[s.method] ?? METHOD_STYLES.DTF
                return (
                  <tr key={s.id} style={{ borderTop: '1px solid rgba(240,237,232,0.06)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.012)' }}>
                    <td style={{ padding: '0.45rem 0.6rem', fontSize: '0.7rem', color: 'rgba(240,237,232,0.3)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{s.id}</td>
                    <td style={{ padding: '0.45rem 0.6rem', fontSize: '0.82rem' }}>{s.label}</td>
                    <td style={{ padding: '0.45rem 0.6rem', whiteSpace: 'nowrap' }}>
                      <ColorSwatch bg={s.bg} label={s.color} />
                    </td>
                    <td style={{ padding: '0.45rem 0.6rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.04em', padding: '0.12rem 0.35rem', borderRadius: '3px', background: ms.bg, color: ms.color, whiteSpace: 'nowrap' }}>{s.method}</span>
                    </td>
                    {[s.sizes.s, s.sizes.m, s.sizes.l, s.sizes.xl, s.sizes.xxl].map((v, j) => (
                      <td key={j} style={{ padding: '0.45rem 0.55rem', textAlign: 'center', color: v > 0 ? '#CA8A04' : 'rgba(240,237,232,0.15)', fontWeight: v > 0 ? 700 : 400 }}>{v > 0 ? v : '—'}</td>
                    ))}
                    <td style={{ padding: '0.45rem 0.55rem', textAlign: 'center', fontWeight: 700, color: total > 0 ? '#4ade80' : 'rgba(240,237,232,0.2)' }}>{total > 0 ? total : '—'}</td>
                    <td style={{ padding: '0.35rem 0.4rem', textAlign: 'center' }}>
                      {s.backFile ? (
                        <span style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
                          <a href={`/print-files/${s.file}`} download={s.file} title="Download front" style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.4rem', borderRadius: '4px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.12)', whiteSpace: 'nowrap' }}>↓ F</a>
                          <a href={`/print-files/${s.backFile}`} download={s.backFile} title="Download back" style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.4rem', borderRadius: '4px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.12)', whiteSpace: 'nowrap' }}>↓ B</a>
                        </span>
                      ) : s.file ? (
                        <a href={`/print-files/${s.file}`} download={s.file} style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.12)' }}>↓</a>
                      ) : <span style={{ color: 'rgba(240,237,232,0.15)', fontSize: '0.65rem' }}>—</span>}
                    </td>
                  </tr>
                )
              })}
              <tr style={{ borderTop: '2px solid rgba(240,237,232,0.12)', background: 'rgba(74,222,128,0.06)' }}>
                <td colSpan={4} style={{ padding: '0.6rem 0.6rem', fontWeight: 700, fontSize: '0.82rem' }}>TOTAL</td>
                {[totS, totM, totL, totXL, totXXL].map((v, j) => (
                  <td key={j} style={{ padding: '0.6rem 0.55rem', textAlign: 'center', fontWeight: 700, color: '#4ade80' }}>{v}</td>
                ))}
                <td style={{ padding: '0.6rem 0.55rem', textAlign: 'center', fontWeight: 800, color: '#4ade80', fontSize: '0.9rem' }}>{grandTotal}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── YOUTH SIZES TABLE ── */}
        <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', marginBottom: '0.6rem', fontWeight: 700 }}>
          Youth Sizes &amp; Quantities — Kids Fun Run
        </h2>
        <p style={{ color: 'rgba(240,237,232,0.35)', fontSize: '0.78rem', marginBottom: '0.75rem' }}>
          Same print files as adult · scale print to 8″ × 8″ on youth blanks · price $20
        </p>
        <div style={{ border: '1px solid rgba(240,237,232,0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '2rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', minWidth: '480px' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['ID', 'Design', 'Color', 'Method', 'YS', 'YM', 'YL', 'Total', '↓'].map((h) => (
                  <th key={h} style={{ padding: '0.55rem 0.6rem', textAlign: ['ID','Design','Color','Method'].includes(h) ? 'left' : 'center', color: 'rgba(240,237,232,0.3)', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {YOUTH.map((s, i) => {
                const total = s.sizes.ys + s.sizes.ym + s.sizes.yl
                const ms = METHOD_STYLES[s.method] ?? METHOD_STYLES.DTF
                return (
                  <tr key={s.id} style={{ borderTop: '1px solid rgba(240,237,232,0.06)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.012)' }}>
                    <td style={{ padding: '0.45rem 0.6rem', fontSize: '0.7rem', color: 'rgba(240,237,232,0.3)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{s.id}</td>
                    <td style={{ padding: '0.45rem 0.6rem', fontSize: '0.82rem' }}>{s.label}</td>
                    <td style={{ padding: '0.45rem 0.6rem', whiteSpace: 'nowrap' }}>
                      <ColorSwatch bg={s.bg} label={s.color} />
                    </td>
                    <td style={{ padding: '0.45rem 0.6rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.04em', padding: '0.12rem 0.35rem', borderRadius: '3px', background: ms.bg, color: ms.color, whiteSpace: 'nowrap' }}>{s.method}</span>
                    </td>
                    {[s.sizes.ys, s.sizes.ym, s.sizes.yl].map((v, j) => (
                      <td key={j} style={{ padding: '0.45rem 0.55rem', textAlign: 'center', color: v > 0 ? '#CA8A04' : 'rgba(240,237,232,0.15)', fontWeight: v > 0 ? 700 : 400 }}>{v > 0 ? v : '—'}</td>
                    ))}
                    <td style={{ padding: '0.45rem 0.55rem', textAlign: 'center', fontWeight: 700, color: '#4ade80' }}>{total}</td>
                    <td style={{ padding: '0.35rem 0.4rem', textAlign: 'center' }}>
                      {s.file ? (
                        <a href={`/print-files/${s.file}`} download={s.file} style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.12)' }}>↓</a>
                      ) : <span style={{ color: 'rgba(240,237,232,0.15)', fontSize: '0.65rem' }}>—</span>}
                    </td>
                  </tr>
                )
              })}
              <tr style={{ borderTop: '2px solid rgba(240,237,232,0.12)', background: 'rgba(74,222,128,0.06)' }}>
                <td colSpan={4} style={{ padding: '0.6rem 0.6rem', fontWeight: 700, fontSize: '0.82rem' }}>TOTAL YOUTH</td>
                {[yTotYS, yTotYM, yTotYL].map((v, j) => (
                  <td key={j} style={{ padding: '0.6rem 0.55rem', textAlign: 'center', fontWeight: 700, color: '#4ade80' }}>{v}</td>
                ))}
                <td style={{ padding: '0.6rem 0.55rem', textAlign: 'center', fontWeight: 800, color: '#4ade80', fontSize: '0.9rem' }}>{yGrandTotal}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── STICKER QTY TABLE ── */}
        <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', marginBottom: '0.6rem', fontWeight: 700 }}>
          Sticker Quantities — All Designs
        </h2>
        <div style={{ border: '1px solid rgba(240,237,232,0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '2.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['ID', 'Design', 'Size', 'QTY', '↓'].map((h) => (
                  <th key={h} style={{ padding: '0.55rem 0.6rem', textAlign: ['QTY','↓'].includes(h) ? 'center' : 'left', color: 'rgba(240,237,232,0.3)', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_STICKERS.map((s, i) => (
                <tr key={s.id} style={{ borderTop: '1px solid rgba(240,237,232,0.06)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.012)' }}>
                  <td style={{ padding: '0.45rem 0.6rem', fontSize: '0.7rem', color: 'rgba(240,237,232,0.3)', fontFamily: 'monospace' }}>{s.id}</td>
                  <td style={{ padding: '0.45rem 0.6rem', fontSize: '0.82rem' }}>{s.label}</td>
                  <td style={{ padding: '0.45rem 0.6rem', fontSize: '0.78rem', color: 'rgba(240,237,232,0.4)', fontFamily: 'monospace' }}>{s.dims}</td>
                  <td style={{ padding: '0.45rem 0.6rem', textAlign: 'center', fontWeight: 700, color: s.qty && s.qty > 0 ? '#CA8A04' : 'rgba(240,237,232,0.2)' }}>
                    {s.qty && s.qty > 0 ? s.qty : '—'}
                  </td>
                  <td style={{ padding: '0.35rem 0.4rem', textAlign: 'center' }}>
                    {s.file ? (
                      <a href={`/print-files/${s.file}`} download={s.file} style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.12)' }}>↓</a>
                    ) : <span style={{ color: 'rgba(240,237,232,0.15)', fontSize: '0.65rem' }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── BOOTH PRINT PACKAGE ── */}
        <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', marginBottom: '0.6rem', fontWeight: 700, marginTop: '2.5rem' }}>
          Booth Print Package — Signage &amp; Materials
        </h2>
        <p style={{ color: 'rgba(240,237,232,0.35)', fontSize: '0.78rem', marginBottom: '1rem' }}>
          Everything beyond shirts that needs to be printed before Aug 2.{' '}
          <span style={{ color: '#4ade80', fontWeight: 700 }}>Green = file ready</span>{' · '}
          <span style={{ color: '#f59e0b', fontWeight: 700 }}>Amber = needs design</span>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.65rem', marginBottom: '2.5rem' }}>
          {PRINT_PACKAGE.map((item) => {
            const isReady = item.status === 'ready'
            const accentColor = isReady ? '#4ade80' : '#f59e0b'
            const accentBg = isReady ? 'rgba(74,222,128,0.08)' : 'rgba(245,158,11,0.08)'
            const accentBorder = isReady ? 'rgba(74,222,128,0.2)' : 'rgba(245,158,11,0.2)'
            return (
              <div key={item.id} style={{ borderRadius: '8px', border: `1px solid ${accentBorder}`, background: accentBg, padding: '0.85rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f0ede8', margin: 0, lineHeight: 1.3 }}>{item.label}</p>
                  <span style={{ flexShrink: 0, fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.06em', padding: '0.12rem 0.4rem', borderRadius: '3px', background: isReady ? 'rgba(74,222,128,0.15)' : 'rgba(245,158,11,0.15)', color: accentColor, border: `1px solid ${accentBorder}` }}>
                    {isReady ? '✓ READY' : 'NEEDS DESIGN'}
                  </span>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'rgba(240,237,232,0.3)', fontFamily: 'monospace', marginBottom: '0.25rem' }}>{item.spec}</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(240,237,232,0.35)', marginBottom: '0.5rem' }}>
                  <span style={{ color: accentColor, fontWeight: 700 }}>QTY {item.qty}</span>{' · '}
                  <span style={{ color: 'rgba(240,237,232,0.3)' }}>{CATEGORY_LABELS[item.category]}</span>
                </p>
                {item.notes && (
                  <p style={{ fontSize: '0.71rem', color: 'rgba(240,237,232,0.28)', lineHeight: 1.5, marginBottom: item.file ? '0.5rem' : 0 }}>{item.notes}</p>
                )}
                {item.file && (
                  <a href={item.file} download target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', textAlign: 'center', fontSize: '0.73rem', fontWeight: 700, padding: '0.35rem 0', borderRadius: '5px', background: 'rgba(74,222,128,0.1)', color: '#4ade80', textDecoration: 'none', border: '1px solid rgba(74,222,128,0.25)', marginTop: '0.25rem' }}>
                    ↓ Download / Open File
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {/* ── DESIGN GRIDS ── */}
        <SectionHead label="Youth Shirts — Kids Fun Run" count={YOUTH.length} accent="#f59e0b" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {YOUTH.map((s) => {
            const ms = METHOD_STYLES[s.method] ?? METHOD_STYLES.DTF
            const sizeEntries: [string, number][] = [['YS', s.sizes.ys], ['YM', s.sizes.ym], ['YL', s.sizes.yl]]
            return (
              <div key={s.id} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(245,158,11,0.25)' }}>
                <div style={{ background: s.bg, aspectRatio: '1', position: 'relative' }}>
                  <Image src={s.img} alt={s.label} fill style={{ objectFit: 'cover' }} sizes="200px" />
                </div>
                <div style={{ padding: '0.65rem 0.75rem 0.7rem', background: 'rgba(245,158,11,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f0ede8', margin: 0 }}>{s.label}</p>
                    <span style={{ flexShrink: 0, fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.06em', padding: '0.15rem 0.4rem', borderRadius: '3px', background: ms.bg, color: ms.color }}>{ms.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                    <ColorSwatch bg={s.bg} label={s.color} />
                    <span style={{ fontSize: '0.7rem', color: 'rgba(240,237,232,0.35)' }}>· $20 · same file</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem' }}>
                    {sizeEntries.map(([sz, v]) => (
                      <span key={sz} style={{ fontSize: '0.66rem', fontWeight: v > 0 ? 700 : 400, padding: '0.15rem 0.3rem', borderRadius: '3px', background: v > 0 ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)', color: v > 0 ? '#f59e0b' : 'rgba(240,237,232,0.2)', border: `1px solid ${v > 0 ? 'rgba(245,158,11,0.3)' : 'rgba(240,237,232,0.06)'}` }}>
                        {sz}{v > 0 && <span style={{ marginLeft: '0.18rem', color: '#f0ede8' }}>×{v}</span>}
                      </span>
                    ))}
                  </div>
                  <a href={`/print-files/${s.file}`} download={s.file} style={{ display: 'block', textAlign: 'center', fontSize: '0.76rem', fontWeight: 700, padding: '0.38rem 0', borderRadius: '5px', background: 'rgba(240,237,232,0.08)', color: '#f0ede8', textDecoration: 'none', border: '1px solid rgba(240,237,232,0.14)' }}>
                    ↓ Download
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <SectionHead label="Mental Health Series (Neuro-Spicy + I Contain Multitudes)" count={NEUROSPICY.length} accent="#7c3aed" />
        <DesignGrid shirts={NEUROSPICY} />

        <SectionHead label="Woodstock 5K — Aug 2, Anniston" count={WOODSTOCK.length} accent="#C8102E" />
        <DesignGrid shirts={WOODSTOCK} />

        <SectionHead label="Ecclesia — Shirts" count={ECCLESIA.length} accent="#2dd4bf" />
        <DesignGrid shirts={ECCLESIA} />

        <SectionHead label="Ecclesia — Stickers" count={ECCLESIA_STICKERS.length} accent="#4aba8a" />
        <DesignGrid shirts={ECCLESIA_STICKERS} />

        <SectionHead label="Freedom Riders — Stickers · 100% → West Anniston Foundation" count={FR_STICKERS.length} accent="#8b0000" />
        <DesignGrid shirts={FR_STICKERS} />

        <SectionHead label="Blossom & Decay — Stickers" count={BD_STICKERS.length} accent="#9b7cb6" />
        <DesignGrid shirts={BD_STICKERS} />

        <SectionHead label="Southern Legends" count={SL.length} accent="#CA8A04" />
        <DesignGrid shirts={SL} />

      </div>
    </main>
  )
}
