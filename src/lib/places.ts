// SL Places — curated local business directory for Southern Legends.
// Data: static curated list (featured businesses + story-linked).
// Grows as SL essays name real businesses — wire story slug to unlock listing.

export type PlaceBusiness = {
  id: number
  name: string
  slug: string
  city: string
  state: string
  category: string
  phone?: string
  website?: string
  address?: string
  description: string       // one-sentence editorial description
  story?: string            // SL essay/profile slug — presence = featured in SL
  curatedNote?: string      // pull-quote or editorial note shown on card
  featured: boolean
}

// Curated seed list — businesses mentioned or profiled in SL.
// Add entries here as essays go live. story slug = /profiles/[slug] or /essays/[slug].
export const SL_PLACES: PlaceBusiness[] = [
  {
    id: 0,
    name: "Heather Florals",
    slug: "heather-florals",
    city: "Anniston",
    state: "AL",
    category: "Florist",
    website: "https://heatherflorals.com",
    description: "Custom floral design for weddings and events in Calhoun County.",
    featured: true,
  },
  {
    id: 1,
    name: "Studio 104",
    slug: "studio-104",
    city: "Anniston",
    state: "AL",
    category: "Music Studio",
    website: "https://studio104.gatherstudio.app",
    description: "Recording studio built for artists who know what they're making.",
    featured: true,
  },
  {
    id: 2,
    name: "Piedmont Community Theatre",
    slug: "piedmont-community-theatre",
    city: "Piedmont",
    state: "AL",
    category: "Theater",
    website: "https://jason-wright.gatherstudio.app",
    description: "Community theater in Piedmont, Alabama. Jason Wright, director.",
    featured: true,
  },
]

export const SL_CITIES = [...new Set(SL_PLACES.map(b => b.city))].sort()

export function cityToSlug(city: string) {
  return city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function bizToSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function getPlacesByCity(citySlug: string) {
  return SL_PLACES.filter(b => cityToSlug(b.city) === citySlug)
}

export function getPlace(citySlug: string, bizSlug: string) {
  return SL_PLACES.find(
    b => cityToSlug(b.city) === citySlug && (b.slug === bizSlug || bizToSlug(b.name) === bizSlug)
  ) ?? null
}

export function getFeatured() {
  return SL_PLACES.filter(b => b.featured || b.story)
}

export function isBridalCategory(category: string): boolean {
  return ["Wedding Venue", "Wedding", "Florist", "Bridal", "Photographer", "Caterer", "Cake"].includes(category)
}

// City page sponsorships
export type SLSponsor = {
  city: string
  businessName: string
  tagline: string
  url?: string
  tier: "city" | "regional"
  monthlyRate: number
  startDate: string
  endDate?: string
}

// Gather Legacy — people who built something in this town
export type SLLegacyPerson = {
  name: string
  city: string
  years: string
  what: string
  description: string
  slug?: string
}

// City events — pulled from The Aisle, MarketDay, local govt
export type SLEvent = {
  city: string
  title: string
  date: string
  time?: string
  venue?: string
  url?: string
  source: "the-aisle" | "marketday" | "gather-ground" | "local-govt" | "other"
}

export const SL_SPONSORS: SLSponsor[] = []
export const SL_LEGACY: SLLegacyPerson[] = []
export const SL_EVENTS: SLEvent[] = []

export function getCitySponsor(citySlug: string): SLSponsor | null {
  const today = new Date().toISOString().split("T")[0]
  const city = SL_SPONSORS.find(
    (s) => cityToSlug(s.city) === citySlug && s.tier === "city" && (!s.endDate || s.endDate >= today)
  )
  const regional = SL_SPONSORS.find(
    (s) => s.tier === "regional" && (!s.endDate || s.endDate >= today)
  )
  return city ?? regional ?? null
}

export function getCityEvents(citySlug: string): SLEvent[] {
  const today = new Date().toISOString().split("T")[0]
  return SL_EVENTS
    .filter((e) => cityToSlug(e.city) === citySlug && e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5)
}

export function getCityLegacy(citySlug: string): SLLegacyPerson[] {
  return SL_LEGACY.filter((p) => cityToSlug(p.city) === citySlug)
}
