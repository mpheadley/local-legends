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
  // city slugs this item is relevant to; empty = SL-wide
  cities?: string[]
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
    cities: ['anniston'],
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
    cities: ['anniston'],
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
    cities: ['anniston'],
  },

  // ── CHIEF LADIGA TRAIL ─────────────────────────────────────
  {
    id: 'clt-shirt',
    name: "Ladiga's Land",
    tagline: '1832 · 2032 · Anniston to Piedmont',
    sub: '33.5 miles. Ivory, Moss, Denim.',
    price: 35,
    photo: '/merch/clt-shirt-mockup.webp',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
    cities: ['anniston', 'piedmont'],
  },
  {
    id: 'clt-tote',
    name: 'Chief Ladiga Trail Tote',
    tagline: 'Cream canvas · Trail map on back',
    sub: 'DTF print · Handmade in Alabama',
    price: 22,
    photo: '/merch/clt-tote.webp',
    badge: 'In stock',
    badgeColor: '#166534',
    category: 'tote',
    available: true,
    cities: ['anniston', 'piedmont'],
  },
  {
    id: 'model-city-tote',
    name: 'The Model City Tote',
    tagline: 'Anniston, Alabama · Cream canvas',
    sub: 'DTF print · Handmade in Alabama',
    price: 22,
    photo: '/merch/model-city-tote.webp',
    badge: 'In stock',
    badgeColor: '#166534',
    category: 'tote',
    available: true,
    cities: ['anniston'],
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
    cities: ['anniston', 'piedmont'],
  },
  {
    id: 'clt-trail-map',
    name: 'CLT Trail Map Print',
    tagline: '18×24 · Full trail · Print-ready',
    sub: 'Rolled · Ships in tube',
    price: 15,
    photo: '/merch/clt-trail-map-print.webp',
    category: 'print',
    available: true,
    cities: ['anniston', 'piedmont'],
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
    available: false,
    cities: ['anniston'],
  },
  {
    id: 'ecclesia-coin',
    name: 'Ecclesia Coin Sticker',
    tagline: 'Teal triskelion · 3" vinyl',
    price: 5,
    photo: '/merch/ecclesia-coin.png',
    category: 'sticker',
    available: false,
    cities: ['anniston'],
  },

  // ── FREEDOM RIDERS ─────────────────────────────────────────
  {
    id: 'freedom-riders-shirt',
    name: 'Freedom Riders — Anniston, 1961',
    tagline: 'May 14, 1961. Highway 202. The bus burned.',
    sub: '25% of every sale → West Anniston Foundation',
    price: 40,
    photo: '/merch/freedom-riders/shirt-mockup-dark.webp',
    badge: 'Memorial',
    badgeColor: '#1a1a2e',
    category: 'shirt',
    fundraiser: 'West Anniston Foundation',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
    cities: ['anniston'],
  },

  // ── MENTAL HEALTH LINE — Fourthwall POD only, see /support ──

  // ── DIASPORA LINE ──────────────────────────────────────────
  {
    id: 'diaspora-shirt',
    name: 'I left. I came back.',
    tagline: 'The Southern Legends thesis on a shirt.',
    sub: 'Cream on dark olive · Fraunces serif',
    price: 30,
    photo: '/merch/diaspora-shirt.webp',
    badge: 'SL Original',
    badgeColor: '#7a5c1e',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: false,
    cities: [],
  },
  {
    id: 'jacksonville-shirt',
    name: 'Jacksonville, Alabama',
    tagline: 'Est. 1881 · JSU country.',
    sub: 'Forest green · Cream · Black',
    price: 28,
    photo: '/merch/jacksonville-shirt.webp',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: false,
    cities: ['jacksonville'],
  },
  {
    id: 'coldwater-shirt',
    name: 'Coldwater Mountain',
    tagline: 'Anniston, Alabama · 1,800 ft.',
    sub: 'Navy · Slate · Cream',
    price: 30,
    photo: '/merch/coldwater-shirt.webp',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: false,
    cities: ['anniston'],
  },

  // ── ECCLESIA PHOTOREAL ─────────────────────────────────────
  {
    id: 'ecclesia-stone-shirt',
    name: 'Ancient paths.',
    tagline: 'Ecclesia · A Fresh Expression',
    sub: 'Black tee · teal pixel stone',
    price: 32,
    photo: '/merch/ecclesia-stone-shirt.webp',
    badge: 'Ecclesia',
    badgeColor: '#1a5a4a',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
  },
  {
    id: 'ecclesia-coin-photoreal',
    name: 'Ecclesia Coin — We are all on the way.',
    tagline: 'Celtic triskelion · photoreal · Fraunces type',
    sub: 'Black · Navy',
    price: 32,
    photo: '/merch/ecclesia-coin-photoreal-shirt.webp',
    badge: 'Ecclesia',
    badgeColor: '#1a5a4a',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
  },

  // ── ECCLESIA PRESS SATIRE TEES ─────────────────────────────
  {
    id: 'ep-chewed-gum',
    name: 'You were not chewed gum.',
    tagline: 'Ecclesia Press — purity culture, corrected.',
    sub: 'Black · Purple · Cream',
    price: 28,
    photo: '/merch/ep-chewed-gum.webp',
    badge: 'Ecclesia Press',
    badgeColor: '#5b21b6',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: false,
    cities: [],
  },
  {
    id: 'ep-father-runs',
    name: 'The father runs.',
    tagline: 'Luke 15. He doesn\'t walk.',
    sub: 'Black · Cream',
    price: 28,
    photo: '/merch/ep-father-runs.webp',
    badge: 'Ecclesia Press',
    badgeColor: '#5b21b6',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: false,
    cities: [],
  },
  {
    id: 'ep-here-i-stand',
    name: '"Here I stand." — Luther, probably.',
    tagline: 'Ecclesia Press — Reformation merch.',
    sub: 'Black · Cream · Red',
    price: 28,
    photo: '/merch/ep-here-i-stand.webp',
    badge: 'Ecclesia Press',
    badgeColor: '#5b21b6',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: false,
    cities: [],
  },

  // ── CHEAHA SUMMIT ──────────────────────────────────────────
  {
    id: 'cheaha-summit-shirt',
    name: 'Cheaha — Alabama\'s Summit',
    tagline: '2,413 ft · Cleburne County · Alabama\'s highest point',
    sub: 'Black shirt · Crimson mountain woodcut · Bold serif',
    price: 35,
    photo: '/merch/cheaha-summit-shirt.webp',
    badge: 'SL Woodcut',
    badgeColor: '#7f1d1d',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
    cities: ['piedmont', 'gadsden'],
  },

  // ── JACKSONVILLE ────────────────────────────────────────────
  {
    id: 'jacksonville-gamecock-shirt',
    name: 'Jacksonville — Home of JSU',
    tagline: 'Jacksonville, Alabama · Est. 1833',
    sub: 'Black shirt · Bold gamecock badge · Gold + crimson',
    price: 35,
    photo: '/merch/jacksonville-gamecock-shirt.webp',
    badge: 'SL Woodcut',
    badgeColor: '#7a3c00',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
    cities: ['jacksonville'],
  },
  {
    id: 'jacksonville-water-tower-sticker',
    name: 'Jacksonville Water Tower',
    tagline: 'Jacksonville, Alabama · Est. 1833 · 3" round',
    sub: 'Rust distressed badge · Gamecock weathervane · Crossed rifles',
    price: 5,
    photo: '/merch/jacksonville-water-tower-badge.webp',
    badge: 'SL Woodcut',
    badgeColor: '#7a3c00',
    category: 'sticker',
    available: true,
    cities: ['jacksonville'],
  },

  // ── PIEDMONT / CLT ─────────────────────────────────────────
  {
    id: 'piedmont-clt-print',
    name: 'Piedmont — Chief Ladiga Trail Mile 0',
    tagline: 'Piedmont, Alabama · Population 4,600 · Trail Town',
    sub: '11×14 · Matte cardstock · Pine forest + trail perspective woodcut',
    price: 15,
    photo: '/merch/piedmont-clt-banner-print.webp',
    badge: 'Art Print',
    badgeColor: '#166534',
    category: 'print',
    available: true,
    cities: ['piedmont'],
  },

  // ── BLOSSOM & DECAY STICKER VARIANTS ───────────────────────
  {
    id: 'skull-marigold-sticker',
    name: 'Blossom & Decay — Marigold',
    tagline: 'Sugar skull + orange marigolds · Southern Gothic',
    sub: '3" die-cut · Matte · Bright colorful variant',
    price: 5,
    photo: '/merch/skull-marigold-sticker.png',
    badge: 'SL Original',
    badgeColor: '#92400e',
    category: 'sticker',
    available: true,
    cities: [],
  },
  {
    id: 'skull-gothic-sticker',
    name: 'Blossom & Decay — Gothic',
    tagline: 'Dark skull + red rose · Southern Gothic',
    sub: '3" die-cut · Matte · Dark moody variant',
    price: 5,
    photo: '/merch/skull-gothic-sticker.png',
    badge: 'SL Original',
    badgeColor: '#7f1d1d',
    category: 'sticker',
    available: true,
    cities: [],
  },

  // ── CLT HIKE & EXPLORE ─────────────────────────────────────
  {
    id: 'clt-hike-explore-shirt',
    name: 'Hike & Explore — Chief Ladiga Trail',
    tagline: 'Chief Ladiga Trail · Alabama',
    sub: 'Teal shirt · Vintage badge · Mountains + pines + sunset',
    price: 35,
    photo: '/merch/clt-hike-explore-shirt.png',
    badge: 'SL Woodcut',
    badgeColor: '#0f4c75',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
    cities: ['anniston', 'piedmont'],
  },

  // ── BLOSSOM & DECAY ────────────────────────────────────────
  {
    id: 'blossom-decay-shirt',
    name: 'Blossom & Decay',
    tagline: 'Southern Legends · Thorns + roses + Southern Gothic',
    sub: 'Mocha / tan shirt · Skull emerging from vines',
    price: 35,
    photo: '/merch/blossom-and-decay-shirt.png',
    badge: 'SL Original',
    badgeColor: '#7f1d1d',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
    cities: [],
  },
  {
    id: 'blossom-decay-sticker',
    name: 'Blossom & Decay',
    tagline: 'Southern Legends · Sugar skull + Alabama wildflowers',
    sub: '3" die-cut · Matte · Roses + daisies + mountain laurel',
    price: 5,
    photo: '/merch/blossom-and-decay-sticker.png',
    badge: 'SL Original',
    badgeColor: '#7f1d1d',
    category: 'sticker',
    available: true,
    cities: [],
  },

  // ── GREEN THUMBS CLUB (Heather Florals) ────────────────────
  {
    id: 'green-thumbs-club-sticker',
    name: 'Green Thumbs Club',
    tagline: 'Heather Florals · Est. 2014 · Alabama',
    sub: '3" oval · Matte · Botanical illustration',
    price: 5,
    photo: '/merch/green-thumbs-club-sticker.webp',
    badge: 'Heather Florals',
    badgeColor: '#166534',
    category: 'sticker',
    available: true,
    cities: ['anniston'],
  },

  // ── CHEAHA MOUNTAIN ────────────────────────────────────────
  {
    id: 'cheaha-tower-shirt',
    name: 'Cheaha Tower',
    tagline: '2,413 ft · State of Alabama Peak · Built with Muscle & Fire',
    sub: 'Blue / gold badge · Black shirt · DTF print',
    price: 35,
    photo: '/merch/cheaha-tower-badge.png',
    badge: 'SL Woodcut',
    badgeColor: '#1e3a5f',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
    cities: ['piedmont', 'gadsden'],
  },
  {
    id: 'cheaha-tower-sticker',
    name: 'Cheaha Tower Sticker',
    tagline: '3" round · Matte · Weather-resistant',
    sub: 'Blue / gold / cream on dark',
    price: 5,
    photo: '/merch/cheaha-tower-badge.png',
    badge: 'SL Woodcut',
    badgeColor: '#1e3a5f',
    category: 'sticker',
    available: true,
    cities: ['piedmont', 'gadsden'],
  },
  {
    id: 'cheaha-sanctuary-sticker',
    name: 'To Lasting Sanctuary',
    tagline: 'Cheaha Mountain · CCC Built 1933 · From Ancient High Place',
    sub: '3" round · Rust red · Matte',
    price: 5,
    photo: '/merch/cheaha-lasting-sanctuary.png',
    badge: 'SL Woodcut',
    badgeColor: '#7f1d1d',
    category: 'sticker',
    available: true,
    cities: ['piedmont', 'gadsden'],
  },
  {
    id: 'cheaha-skyway-print',
    name: 'Building the Skyway',
    tagline: 'Cheaha State Park · Blasted Through Solid Rock',
    sub: '11×14 · Matte cardstock · Frame-ready',
    price: 15,
    photo: '/merch/cheaha-building-skyway.png',
    badge: 'Art Print',
    badgeColor: '#78350f',
    category: 'print',
    available: true,
    cities: ['piedmont', 'gadsden'],
  },

  // ── OXFORD / LICKSKILLET ────────────────────────────────────
  {
    id: 'lickskillet-premium-shirt',
    name: 'Lickskillet · Oxford, Alabama',
    tagline: 'The Frontier Original · Legendary Hospitality Since Then',
    sub: 'Black shirt · Premium circle badge · DTF print · Test print recommended',
    price: 35,
    photo: '/merch/lickskillet-premium-shirt.png',
    badge: 'SL Woodcut',
    badgeColor: '#7a3c00',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
    cities: ['oxford'],
  },
  {
    id: 'lickskillet-ox-sticker',
    name: "You'll Have to Lick the Skillet",
    tagline: 'Oxford, Alabama · Historic nickname',
    sub: '3" round · Teal / cream · Matte',
    price: 5,
    photo: '/merch/lickskillet-ox-sticker.png',
    badge: 'SL Woodcut',
    badgeColor: '#0f766e',
    category: 'sticker',
    available: true,
    cities: ['oxford'],
  },

  // ── JACKSONVILLE ────────────────────────────────────────────
  {
    id: 'jacksonville-court-square-print',
    name: 'Jacksonville — Historic Court Square',
    tagline: 'The Heart of Benton County · Est. 1834',
    sub: '11×14 · Matte cardstock · Frame-ready',
    price: 12,
    photo: '/merch/jacksonville-court-square.png',
    badge: 'Art Print',
    badgeColor: '#166534',
    category: 'print',
    available: true,
    cities: ['jacksonville'],
  },

  // ── MODEL CITY ─────────────────────────────────────────────
  {
    id: 'model-city-shirt',
    name: 'The Model City',
    tagline: 'Anniston, Alabama — Est. 1872',
    sub: 'Black · Navy · Sage · Mustard · Crimson · Ice Blue',
    price: 29,
    photo: '/merch/model-city-shirt.webp',
    category: 'shirt',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    available: true,
    cities: ['anniston'],
  },
]


export function getMerchForCity(citySlug: string, limit = 4): MerchItem[] {
  const cityAvail = MERCH.filter(m => m.available && m.cities?.includes(citySlug))
  const cityPending = MERCH.filter(m => !m.available && m.cities?.includes(citySlug))
  const wide = MERCH.filter(m => m.available && (!m.cities || m.cities.length === 0))
  // city-tagged items first (available then coming-soon placeholders), fill with SL-wide if sparse
  const result = [...cityAvail, ...cityPending]
  if (result.length < 2) result.push(...wide)
  return result.slice(0, limit)
}

export function getWideMerch(limit = 4): MerchItem[] {
  return MERCH.filter(m => m.available && (!m.cities || m.cities.length === 0)).slice(0, limit)
}

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
