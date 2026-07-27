/**
 * Sponsored businesses config.
 * Businesses here get a Sponsored badge and priority placement in city/category listings.
 * Keys are business slugs from content/businesses/*.mdx
 * Add via the /advertise Stripe checkout → webhook updates this list.
 */

export interface SponsoredBusiness {
  slug: string
  name: string
  city: string
  since: string // ISO date
  label?: string // optional override label, default "Sponsored"
}

// Hand-curated until Stripe webhook auto-populates
export const SPONSORED_BUSINESSES: SponsoredBusiness[] = [
  // Example (remove when real sponsors sign up):
  // { slug: "heather-florals", name: "Heather Florals", city: "Anniston", since: "2026-07-23" },
]

export function isSponsoredSlug(slug: string): boolean {
  return SPONSORED_BUSINESSES.some((b) => b.slug === slug)
}

export function getSponsoredByCity(city: string): SponsoredBusiness[] {
  return SPONSORED_BUSINESSES.filter(
    (b) => b.city.toLowerCase() === city.toLowerCase()
  )
}
