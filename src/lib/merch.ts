export type MerchItem = {
  id: string
  name: string
  tagline: string
  sub?: string
  price: number
  photo: string
  badge?: string
  badgeColor?: string
  category: 'shirt' | 'sticker' | 'tote' | 'print'
  fundraiser?: string
  sizes?: string[]
  available: boolean
}

export const MERCH: MerchItem[] = [
  // ── WOODSTOCK 5K ───────────────────────────────────────────
  {
    id: 'woodstock-shirt',
    name: 'I Survived Woodstock Avenue',
    tagline: 'Anniston, AL · Aug 2, 2026',
    sub: 'Woodstock 5K · RRCA Alabama State Championship',
    price: 30,
    photo: '/merch/woodstock-shirt-v2.png',
    badge: 'Event',
    badgeColor: '#166534',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
  },
  {
    id: 'woodstock-sticker',
    name: 'Woodstock 5K Sticker',
    tagline: 'Anniston, Alabama · 3" vinyl',
    price: 5,
    photo: '/merch/woodstock-badge.png',
    badge: 'At booth',
    badgeColor: '#166534',
    category: 'sticker',
    available: true,
  },

  // ── PV RAIDERS XC ──────────────────────────────────────────
  {
    id: 'pv-raiders-shirt',
    name: 'PV Raiders XC',
    tagline: 'Run Like You Stole It.',
    sub: '25% of every sale → Raiders XC program',
    price: 30,
    photo: '/merch/pv-raiders-xc.webp',
    badge: 'Fundraiser',
    badgeColor: '#9A3412',
    category: 'shirt',
    fundraiser: 'Raiders XC',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
  },

  // ── CHIEF LADIGA TRAIL ─────────────────────────────────────
  {
    id: 'clt-shirt',
    name: "Ladiga's Land",
    tagline: '1832 · 2032 · Anniston to Piedmont',
    sub: '33.5 miles. Ivory, Moss, Denim.',
    price: 35,
    photo: '/merch/clt-shirt-print.png',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
  },
  {
    id: 'clt-tote',
    name: 'Chief Ladiga Trail Tote',
    tagline: 'Cream canvas · Trail map on back',
    sub: 'DTF print · Handmade in Alabama',
    price: 22,
    photo: '/merch/clt-tote-print.png',
    badge: 'In stock',
    badgeColor: '#166534',
    category: 'tote',
    available: true,
  },
  {
    id: 'clt-sticker',
    name: 'Chief Ladiga Trail Sticker',
    tagline: '3" round · Matte · Weather-resistant',
    price: 5,
    photo: '/merch/clt-sticker-print.png',
    badge: 'In stock',
    badgeColor: '#166534',
    category: 'sticker',
    available: true,
  },
  {
    id: 'clt-trail-map',
    name: 'CLT Trail Map Print',
    tagline: '18×24 · Full trail · Print-ready',
    sub: 'Rolled · Ships in tube',
    price: 15,
    photo: '/merch/clt-trail-map.png',
    category: 'print',
    available: true,
  },

  // ── ECCLESIA ────────────────────────────────────────────────
  {
    id: 'ecclesia-pilgrims',
    name: 'Ecclesia — Pilgrims',
    tagline: 'We are all on the way.',
    sub: 'Forest scene · Forest green on cream',
    price: 30,
    photo: '/merch/ecclesia-pilgrims.png',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
  },
  {
    id: 'ecclesia-coin',
    name: 'Ecclesia Coin Sticker',
    tagline: 'Teal triskelion · 3" vinyl',
    price: 5,
    photo: '/merch/ecclesia-coin.png',
    category: 'sticker',
    available: true,
  },

  // ── FREEDOM RIDERS ─────────────────────────────────────────
  {
    id: 'freedom-riders-shirt',
    name: 'Freedom Riders — Anniston, 1961',
    tagline: 'May 14, 1961. Highway 202. The bus burned.',
    sub: '25% of every sale → West Anniston Foundation',
    price: 40,
    photo: '/merch/freedom-riders/v2-ink-on-cream.png',
    badge: 'Memorial',
    badgeColor: '#1a1a2e',
    category: 'shirt',
    fundraiser: 'West Anniston Foundation',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
  },

  // ── MODEL CITY ─────────────────────────────────────────────
  {
    id: 'model-city-shirt',
    name: 'The Model City',
    tagline: 'Anniston, Alabama — Est. 1872',
    sub: 'Black · Navy · Sage · Mustard · Crimson · Ice Blue',
    price: 29,
    photo: '/merch/model-city-print.png',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
  },
]

export function getMerchItem(id: string): MerchItem | undefined {
  return MERCH.find(m => m.id === id)
}

export function getMerchByCategory(cat: MerchItem['category']): MerchItem[] {
  return MERCH.filter(m => m.category === cat && m.available)
}

// Legacy Fourthwall product lookups — keep for profile/essay crosslinks
const FW = 'https://matt-headley-shop.fourthwall.com/products'
export const FW_PRODUCTS = {
  ICM: { url: `${FW}/i-contain-multitudes`, name: 'I Contain Multitudes', image: '/merch/i-contain-multitudes.webp' },
  SH:  { url: `${FW}/still-here`, name: 'Still Here', image: '/merch/still-here.webp' },
  BP:  { url: `${FW}/bipolar-proud`, name: 'Bipolar & Proud', image: '/merch/bipolar-proud.webp' },
  CLT: { url: `${FW}/chief-ladiga-trail`, name: "Ladiga's Land", image: '/merch/clt-trail.webp' },
  MC:  { url: `${FW}/the-model-city-anniston-alabama`, name: 'The Model City', image: '/merch/model-city-shirt.webp' },
  DD:  { url: `${FW}/dave-dennis-freedom-rider-1961`, name: 'Dave Dennis — Freedom Rider, 1961', image: '/merch/freedom-riders/v2-ink-on-cream.png' },
} as const

type FWProduct = (typeof FW_PRODUCTS)[keyof typeof FW_PRODUCTS]
const PROFILE_MERCH: Record<string, [FWProduct, FWProduct, FWProduct?]> = {
  'chief-ladiga-trail': [FW_PRODUCTS.CLT, FW_PRODUCTS.ICM],
  'noccalula-falls': [FW_PRODUCTS.CLT, FW_PRODUCTS.MC],
  'anniston-museums-gardens': [FW_PRODUCTS.MC, FW_PRODUCTS.ICM],
  'aquality-farms': [FW_PRODUCTS.MC, FW_PRODUCTS.ICM],
  'freedom-riders-national-monument': [FW_PRODUCTS.DD, FW_PRODUCTS.MC, FW_PRODUCTS.ICM],
  'interfaith-ministries-calhoun-county': [FW_PRODUCTS.DD, FW_PRODUCTS.MC, FW_PRODUCTS.ICM],
  'lewis-downing': [FW_PRODUCTS.MC, FW_PRODUCTS.ICM],
  'mom-to-go': [FW_PRODUCTS.MC, FW_PRODUCTS.ICM],
  'shannon-jenkins': [FW_PRODUCTS.MC, FW_PRODUCTS.ICM],
}
const ESSAY_MERCH: Record<string, FWProduct> = {
  'the-hospital': FW_PRODUCTS.SH,
  'hope-in-the-wilderness': FW_PRODUCTS.SH,
  'im-not-going-to-disappear': FW_PRODUCTS.SH,
  'the-same-domain': FW_PRODUCTS.BP,
  'chief-ladiga-trail': FW_PRODUCTS.CLT,
  'attempt-73': FW_PRODUCTS.ICM,
  'a-letter-never-sent': FW_PRODUCTS.ICM,
  'my-writing-has-a-new-home': FW_PRODUCTS.ICM,
  'no-shade': FW_PRODUCTS.ICM,
}
export function getProfileMerch(slug: string) {
  const [primary, secondary, tertiary] = PROFILE_MERCH[slug] ?? [FW_PRODUCTS.MC, FW_PRODUCTS.ICM]
  return { primary, secondary, tertiary }
}
export function getEssayMerch(slug: string) {
  const primary = ESSAY_MERCH[slug] ?? FW_PRODUCTS.ICM
  return { primary, secondary: primary === FW_PRODUCTS.ICM ? FW_PRODUCTS.SH : FW_PRODUCTS.ICM }
}
