/**
 * City metadata — Facebook pages, nearby cities, region groupings.
 * Extend as cities grow.
 */

export type CityMeta = {
  slug: string
  facebook?: string        // official city/community Facebook page
  region?: string          // NE Alabama, Central Alabama, etc.
  nearbySlug?: string[]    // adjacent cities for internal SEO links
  population?: number
  tagline?: string         // one-line for meta/display
}

export const CITY_META: CityMeta[] = [
  {
    slug: "anniston",
    facebook: "https://www.facebook.com/CityofAnniston",
    region: "NE Alabama",
    nearbySlug: ["oxford", "jacksonville", "gadsden", "talladega"],
    population: 22000,
    tagline: "The Model City of the New South",
  },
  {
    slug: "oxford",
    facebook: "https://www.facebook.com/OxfordAlabama",
    region: "NE Alabama",
    nearbySlug: ["anniston", "jacksonville", "talladega"],
    population: 22000,
    tagline: "Oxford, Alabama",
  },
  {
    slug: "jacksonville",
    facebook: "https://www.facebook.com/JacksonvilleAL",
    region: "NE Alabama",
    nearbySlug: ["anniston", "oxford", "gadsden", "piedmont"],
    population: 12000,
    tagline: "Home of Jacksonville State University",
  },
  {
    slug: "gadsden",
    facebook: "https://www.facebook.com/gadsdencity",
    region: "NE Alabama",
    nearbySlug: ["anniston", "jacksonville", "attalla", "albertville"],
    population: 33000,
    tagline: "The Cultural Hub of NE Alabama",
  },
  {
    slug: "talladega",
    facebook: "https://www.facebook.com/CityofTalladega",
    region: "NE Alabama",
    nearbySlug: ["anniston", "oxford", "sylacauga"],
    population: 15000,
    tagline: "Home of Talladega Superspeedway",
  },
  {
    slug: "piedmont",
    facebook: "https://www.facebook.com/CityofPiedmontAlabama",
    region: "NE Alabama",
    nearbySlug: ["jacksonville", "anniston", "cedartown"],
    population: 5000,
  },
  {
    slug: "attalla",
    facebook: "https://www.facebook.com/CityofAttalla",
    region: "NE Alabama",
    nearbySlug: ["gadsden", "albertville"],
    population: 5500,
  },
  {
    slug: "albertville",
    facebook: "https://www.facebook.com/AlbertvilleAL",
    region: "NE Alabama",
    nearbySlug: ["gadsden", "boaz", "guntersville"],
    population: 22000,
  },
  {
    slug: "birmingham",
    facebook: "https://www.facebook.com/BirminghamAL",
    region: "Central Alabama",
    nearbySlug: ["hoover", "vestavia-hills", "trussville", "gardendale"],
    population: 212000,
    tagline: "The Magic City",
  },
  {
    slug: "huntsville",
    facebook: "https://www.facebook.com/HuntsvilleAL",
    region: "North Alabama",
    nearbySlug: ["madison", "decatur", "athens"],
    population: 200000,
    tagline: "The Rocket City",
  },
  {
    slug: "montgomery",
    facebook: "https://www.facebook.com/CityofMontgomery",
    region: "Central Alabama",
    nearbySlug: ["prattville", "millbrook", "wetumpka"],
    population: 197000,
    tagline: "The Cradle of the Confederacy and the Civil Rights Movement",
  },
  {
    slug: "tuscaloosa",
    facebook: "https://www.facebook.com/CityofTuscaloosa",
    region: "West Alabama",
    nearbySlug: ["northport", "cottondale"],
    population: 100000,
    tagline: "Home of the University of Alabama",
  },
  {
    slug: "mobile",
    facebook: "https://www.facebook.com/CityofMobile",
    region: "South Alabama",
    nearbySlug: ["prichard", "saraland", "daphne"],
    population: 187000,
    tagline: "The Port City",
  },
  {
    slug: "decatur",
    facebook: "https://www.facebook.com/CityofDecatur",
    region: "North Alabama",
    nearbySlug: ["huntsville", "hartselle", "athens"],
    population: 53000,
  },
  {
    slug: "florence",
    facebook: "https://www.facebook.com/CityofFlorenceAL",
    region: "North Alabama",
    nearbySlug: ["muscle-shoals", "sheffield", "tuscumbia"],
    population: 42000,
    tagline: "The Shoals",
  },
]

export function getCityMeta(slug: string): CityMeta | undefined {
  return CITY_META.find((c) => c.slug === slug)
}
