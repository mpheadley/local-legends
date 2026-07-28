export type SponsorTier = 'trail' | 'landmark'

export interface Sponsor {
  id: string
  name: string
  url?: string
  logo?: string
  tier: SponsorTier
  programs?: string[]  // program slugs this sponsor is attached to
}

export const SPONSOR_TIERS = {
  trail: {
    name: 'Trail Sponsor',
    price: 49,
    priceId: null, // inline price_data
    description: 'Logo + link in the SL footer rotation and on your sponsored program pages.',
    perks: ['Logo on southernlegends.org', 'Featured on sponsored program page', 'Monthly social card mention'],
  },
  landmark: {
    name: 'Landmark Sponsor',
    price: 99,
    priceId: null,
    description: 'Logo on all relevant city + event pages, plus a dedicated sponsor spotlight post each month.',
    perks: ['Everything in Trail', 'Logo on city pages', 'Monthly sponsor spotlight card', 'Priority placement'],
  },
} satisfies Record<SponsorTier, { name: string; price: number; priceId: null; description: string; perks: string[] }>

// Seed sponsors — update as they sign up
export const SPONSORS: Sponsor[] = []
