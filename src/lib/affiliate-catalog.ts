export type AffiliateProduct = {
  key: string
  label: string
  venture: string
  price: string
  commission: string
  commissionNote: string
  dest: string
  description: string
  category: 'merch' | 'service' | 'product' | 'event' | 'shop'
}

export const AFFILIATE_CATALOG: AffiliateProduct[] = [
  // ── MERCH ──────────────────────────────────────────────────────────────────
  {
    key: 'merch',
    label: 'Southern Legends Merch',
    venture: 'Southern Legends',
    price: '$18–$35',
    commission: '10–15%',
    commissionNote: '$2–5 per sale',
    dest: 'https://southernlegends.blog/merch',
    description: 'Shirts, stickers, prints. Freedom Riders, Pinhoti Trail, Anniston 45.',
    category: 'merch',
  },
  {
    key: 'headley-bros',
    label: 'Headley Bros 3D Prints',
    venture: 'Headley Bros',
    price: '$8–$45',
    commission: '12%',
    commissionNote: '$1–5 per sale',
    dest: 'https://headleybros.com',
    description: "Noah and Soren's 3D printing business. Custom prints, keychains, figurines.",
    category: 'merch',
  },

  // ── HEATHER FLORALS ────────────────────────────────────────────────────────
  {
    key: 'heather-florals',
    label: 'Heather Florals — Custom Arrangements',
    venture: 'Heather Florals',
    price: '$75–$500+',
    commission: '5%',
    commissionNote: '$4–25 per booking',
    dest: 'https://heatherflorals.com',
    description: 'Custom floral design for weddings, events, and gifts in NE Alabama.',
    category: 'service',
  },
  {
    key: 'bloom-bar',
    label: 'Bloom Bar — Floral Workshop',
    venture: 'Bloom Bar',
    price: '$45–$85/seat',
    commission: '10%',
    commissionNote: '$4–8 per seat',
    dest: 'https://heatherflorals.com/bloom-bar',
    description: 'DIY floral design workshop. Great gift. NE Alabama.',
    category: 'event',
  },

  // ── SILVER RUN CHAPEL ──────────────────────────────────────────────────────
  {
    key: 'silver-run',
    label: 'Silver Run Chapel — Wedding Venue',
    venture: 'Silver Run Chapel',
    price: 'Contact for pricing',
    commission: '2%',
    commissionNote: '~$30–60 per booked event',
    dest: 'https://silverrunchapel.com',
    description: 'Historic chapel near Anniston, AL. Intimate weddings, small events.',
    category: 'event',
  },

  // ── THE AISLE ─────────────────────────────────────────────────────────────
  {
    key: 'aisle-tickets',
    label: 'The Aisle — Bridal Show Tickets',
    venture: 'The Aisle',
    price: 'GA $25 · VIP $75',
    commission: '10%',
    commissionNote: '$2.50–$7.50 per ticket',
    dest: 'https://theaisle.app',
    description: 'Oct 18 NE Alabama bridal show. Couples + vendors. Anniston.',
    category: 'event',
  },

  // ── ECCLESIA SHOP ─────────────────────────────────────────────────────────
  {
    key: 'advent-kit',
    label: 'Ecclesia — Advent 2026 Kit',
    venture: 'Ecclesia Studio',
    price: '$49',
    commission: '20%',
    commissionNote: '$9.80 per sale',
    dest: 'https://ecclesiacommunity.org/shop',
    description: '"In the Meantime" — Advent sermon series kit for small churches. Ships Nov 1.',
    category: 'shop',
  },
  {
    key: 'ecclesia-marketing',
    label: 'Ecclesia Marketing — Church Comms',
    venture: 'Ecclesia Studio',
    price: '$49–$149/mo',
    commission: '15%',
    commissionNote: '$7–22/mo per client',
    dest: 'https://ecclesiacommunity.org/marketing',
    description: 'Done-for-you social, newsletters, and announcements for churches.',
    category: 'service',
  },

  // ── GATHER STUDIO SERVICES ────────────────────────────────────────────────
  {
    key: 'blueprint-session',
    label: 'Blueprint Session — Messaging Strategy',
    venture: 'Gather Studio',
    price: '$300 founding rate',
    commission: '10%',
    commissionNote: '$30 per booked session',
    dest: 'https://gatherstudio.app/book',
    description: '90-min messaging strategy session. Clear positioning for small businesses.',
    category: 'service',
  },
  {
    key: 'gather-os',
    label: 'Gather Studio OS — Full Business Blueprint',
    venture: 'Gather Studio',
    price: '$1,500–$2,500',
    commission: '5%',
    commissionNote: '$75–125 per closed client',
    dest: 'https://gatherstudio.app',
    description: 'Full 8-document Plainspoken Blueprint OS for small businesses and nonprofits.',
    category: 'service',
  },
  {
    key: 'cadence',
    label: 'Cadence — Content Engine',
    venture: 'Gather Studio',
    price: '$69–$99/mo',
    commission: '10%',
    commissionNote: '$7–10 first month',
    dest: 'https://gatherstudio.app/cadence',
    description: 'Social, blogs, email, and reels — all drafted for you. Keep your voice in rhythm.',
    category: 'service',
  },

  // ── BOOKS + WRITING ───────────────────────────────────────────────────────
  {
    key: 'tend-presell',
    label: 'Tend: Before the Wedding — Presell',
    venture: 'Tend',
    price: '$12–$25',
    commission: '15%',
    commissionNote: '$1.80–$3.75 per copy',
    dest: 'https://tendmarriage.com',
    description: 'Pre-order the marriage prep workbook. Ships Aug 15.',
    category: 'product',
  },
  {
    key: 'sl-books',
    label: 'Southern Legends Books',
    venture: 'Southern Legends',
    price: '$8–$20',
    commission: '10%',
    commissionNote: 'via Bookshop.org',
    dest: 'https://southernlegends.blog/books',
    description: "Books about the South — essays, profiles, and Matt's forthcoming titles.",
    category: 'product',
  },

  // ── SERMONCOACH ───────────────────────────────────────────────────────────
  {
    key: 'sermoncoach',
    label: 'SermonCoach — AI Sermon Prep',
    venture: 'SermonCoach',
    price: '$29/mo',
    commission: '10%',
    commissionNote: '$2.90 first month',
    dest: 'https://sermoncoach.app',
    description: 'AI-assisted sermon prep tool for pastors. Outline, structure, illustrations.',
    category: 'service',
  },
]

export const DESTINATIONS: Record<string, string> = Object.fromEntries(
  AFFILIATE_CATALOG.map(p => [p.key, p.dest])
)

// Add legacy keys
DESTINATIONS['default'] = 'https://southernlegends.blog/merch'
DESTINATIONS['merch'] = 'https://southernlegends.blog/merch'
DESTINATIONS['shop'] = 'https://ecclesiacommunity.org/shop'
DESTINATIONS['books'] = 'https://southernlegends.blog/books'

export const CATEGORY_LABELS: Record<AffiliateProduct['category'], string> = {
  merch: 'Merch',
  service: 'Services',
  product: 'Books & Products',
  event: 'Events & Venues',
  shop: 'Shop',
}
