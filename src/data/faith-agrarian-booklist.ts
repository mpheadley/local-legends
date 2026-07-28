// Canonical faith-&-agrarian booklist — single source of truth.
// Consumed by: SL /books (Agrarian Shelf), Ecclesia (reading list), Attune (formation shelf).
// Reviews live as MDX at content/reviews/<slug>.mdx and link back here via `reviewSlug`.
// "Say it once" — every surface imports THIS; never re-list books inline.

export type ShelfCategory =
  | "faith-and-land"      // theology of creation, land, sabbath
  | "agrarian-method"     // how the ground actually works
  | "permaculture"        // designed/edible landscapes
  | "flower-farming"      // the Headley farm's own dream
  | "agrarian-fiction";   // the imagination of place

export interface Book {
  slug: string;
  title: string;
  author: string;
  category: ShelfCategory;
  blurb: string;
  alabama?: boolean;          // NE Alabama / AL author — surfaces first (SL diaspora rule)
  mattNote?: string;          // first-person tie — the "I read this" confession register
  bookshopUrl?: string;       // embed / buy link (Bookshop.org preferred over Amazon)
  publisherUrl?: string;
  relatedProfile?: string;    // /journal/<slug>-profile if the author is a profiled hero
  reviewSlug?: string;        // content/reviews/<slug>.mdx when a full review exists
}

export const FAITH_AGRARIAN_BOOKLIST: Book[] = [
  // ---------- FAITH & LAND ----------
  {
    slug: "born-again-dirt",
    title: "Born-Again Dirt: Farming to the Glory of God",
    author: "Noah Sanders",
    category: "faith-and-land",
    alabama: true,
    blurb:
      "The book that named a movement of faith-driven growers. Faith, family, and vocation stop being three things you balance and become one thing you do. Foreword by Joel Salatin.",
    mattNote:
      "I drove down from Weaver to Noah's Redeeming the Dirt conference at a camp in Coosa County, October 2018 — still a pastor, years from my own dirt, looking for permission. This is where the whole shelf starts for me.",
    bookshopUrl: "https://bookshop.org/search?keywords=born-again+dirt+noah+sanders",
    publisherUrl: "https://redeemingthedirt.com",
    relatedProfile: "/profiles/noah-sanders",
  },
  {
    slug: "the-unsettling-of-america",
    title: "The Unsettling of America: Culture & Agriculture",
    author: "Wendell Berry",
    category: "faith-and-land",
    blurb:
      "Berry's foundational argument on the cost of leaving the land. \"The impeded stream is the one that sings\" — the line that runs through my whole body of work.",
    mattNote: "The century. Place as fidelity — you belong to a piece of ground the way you belong to a marriage.",
    bookshopUrl: "https://bookshop.org/search?keywords=unsettling+of+america+wendell+berry",
    relatedProfile: "/journal/wendell-berry-profile",
  },
  {
    slug: "the-art-of-the-commonplace",
    title: "The Art of the Commonplace: The Agrarian Essays",
    author: "Wendell Berry",
    category: "faith-and-land",
    blurb:
      "The gathered agrarian essays — membership, the body and the earth, the gift of good land. Berry's theology of place in one volume.",
    bookshopUrl: "https://bookshop.org/search?keywords=art+of+the+commonplace+berry",
    relatedProfile: "/journal/wendell-berry-profile",
  },
  {
    slug: "the-marvelous-pigness-of-pigs",
    title: "The Marvelous Pigness of Pigs: Respecting & Caring for All God's Creation",
    author: "Joel Salatin",
    category: "faith-and-land",
    blurb:
      "Salatin's most overtly theological book — the argument that honoring the design of a pig is a way of honoring the Designer. The stand, with the reason named.",
    mattNote: "The megaphone. Where Salatin says out loud that this is about the Creator, not just carbon.",
    bookshopUrl: "https://bookshop.org/search?keywords=marvelous+pigness+of+pigs",
    relatedProfile: "/journal/joel-salatin-profile",
  },
  {
    slug: "the-land-brueggemann",
    title: "The Land: Place as Gift, Promise, and Challenge in Biblical Faith",
    author: "Walter Brueggemann",
    category: "faith-and-land",
    blurb:
      "Land theology from the Old Testament — Jubilee, the anti-accumulation statutes, the promise and the danger of place. The scholarly floor under the whole agrarian-faith argument.",
    bookshopUrl: "https://bookshop.org/search?keywords=the+land+brueggemann",
  },

  // ---------- AGRARIAN METHOD ----------
  {
    slug: "you-can-farm",
    title: "You Can Farm",
    author: "Joel Salatin",
    category: "agrarian-method",
    blurb: "Polyface Farm's prophet on building a real farm economy from nothing. The nuts-and-bolts companion to the swagger.",
    bookshopUrl: "https://bookshop.org/search?keywords=you+can+farm+salatin",
    relatedProfile: "/journal/joel-salatin-profile",
  },
  {
    slug: "the-market-gardener",
    title: "The Market Gardener: A Successful Grower's Handbook",
    author: "Jean-Martin Fortier",
    category: "agrarian-method",
    blurb:
      "The small-plot, high-yield method — the wheel-hoe, the permanent beds, the human-scale market garden. (That's a wheel-hoe in Noah Sanders's field.)",
    bookshopUrl: "https://bookshop.org/search?keywords=market+gardener+fortier",
  },
  {
    slug: "the-new-organic-grower",
    title: "The New Organic Grower",
    author: "Eliot Coleman",
    category: "agrarian-method",
    blurb: "The craft bible of tools-and-beds market gardening. Coleman is the reason the method is a discipline and not a guess.",
    bookshopUrl: "https://bookshop.org/search?keywords=new+organic+grower+coleman",
  },
  {
    slug: "dirt-to-soil",
    title: "Dirt to Soil: One Family's Journey into Regenerative Agriculture",
    author: "Gabe Brown",
    category: "agrarian-method",
    blurb: "The soil-regeneration story — cover crops, no-till, the five principles. How dead ground comes back to life.",
    bookshopUrl: "https://bookshop.org/search?keywords=dirt+to+soil+gabe+brown",
  },

  // ---------- PERMACULTURE (designed / edible landscapes) ----------
  {
    slug: "permaculture-chickens",
    title: "Permaculture Chickens & the Great American Farm Tour",
    author: "Justin Rhodes",
    category: "permaculture",
    blurb:
      "The Abundant Permaculture homesteader — chicken-centered permaculture design, told plainly. Proof the agrarian story travels when you tell it honestly.",
    mattNote: "The homecoming. Going back to the grandfather's land, broke and sick, and filming it anyway.",
    bookshopUrl: "https://bookshop.org/search?keywords=permaculture+chickens+justin+rhodes",
    publisherUrl: "https://abundantpermaculture.com",
    relatedProfile: "/journal/justin-rhodes-profile",
  },
  {
    slug: "gaias-garden",
    title: "Gaia's Garden: A Guide to Home-Scale Permaculture",
    author: "Toby Hemenway",
    category: "permaculture",
    blurb:
      "The best on-ramp to edible permaculture landscapes — guilds, food forests, turning a yard into a living system. Where the backyard grower starts.",
    bookshopUrl: "https://bookshop.org/search?keywords=gaias+garden+hemenway",
  },
  {
    slug: "edible-forest-gardens",
    title: "Edible Forest Gardens (Vols. 1–2)",
    author: "Dave Jacke & Eric Toensmeier",
    category: "permaculture",
    blurb:
      "The deep manual on edible permaculture landscapes — designing a forest garden as a layered, self-renewing ecology. The reference the serious designers keep on the shelf.",
    bookshopUrl: "https://bookshop.org/search?keywords=edible+forest+gardens+jacke",
  },
  {
    slug: "restoration-agriculture",
    title: "Restoration Agriculture: Real-World Permaculture for Farmers",
    author: "Mark Shepard",
    category: "permaculture",
    blurb:
      "Permaculture scaled to a working farm — perennial polyculture, tree crops, an agriculture built to outlast the farmer. The commercial edge of the edible-landscape idea.",
    bookshopUrl: "https://bookshop.org/search?keywords=restoration+agriculture+shepard",
  },
  {
    slug: "one-straw-revolution",
    title: "The One-Straw Revolution",
    author: "Masanobu Fukuoka",
    category: "permaculture",
    blurb:
      "Natural farming as a spiritual discipline — do-nothing farming, the emptying-out that is also a kind of prayer. Faith-adjacent, and the quietest book on the shelf.",
    bookshopUrl: "https://bookshop.org/search?keywords=one-straw+revolution+fukuoka",
  },
  {
    slug: "living-soil-handbook",
    title: "The Living Soil Handbook: The No-Till Grower's Guide to Ecological Market Gardening",
    author: "Jesse Frost",
    category: "permaculture",
    blurb:
      "The no-till market-garden bible from Jesse Frost of No-Till Growers and Rough Draft Farmstead in Kentucky. Feed the soil biology, disturb it as little as possible, let the ground do the work.",
    mattNote:
      "I was a No-Till Growers Patreon member and learned a ton from Jesse. This is the method book behind a lot of how I thought about my own ground.",
    bookshopUrl: "https://bookshop.org/search?keywords=living+soil+handbook+jesse+frost",
    publisherUrl: "https://notillgrowers.com",
  },
  {
    slug: "suburban-micro-farm",
    title: "The Suburban Micro-Farm: Modern Solutions for Busy People",
    author: "Amy Stross",
    category: "permaculture",
    blurb:
      "Permaculture scaled to a suburban lot — how a quarter-acre yard becomes a real food-producing micro-farm. The most practical on-ramp for people without acreage.",
    bookshopUrl: "https://bookshop.org/search?keywords=suburban+micro-farm+amy+stross",
  },
  {
    slug: "edible-landscaping",
    title: "Edible Landscaping",
    author: "Rosalind Creasy",
    category: "permaculture",
    blurb:
      "The founding text of edible landscapes — designing a yard that is beautiful and feeds you at the same time. Where the ornamental and the productive stop being separate ideas.",
    bookshopUrl: "https://bookshop.org/search?keywords=edible+landscaping+rosalind+creasy",
  },

  // ---------- FLOWER FARMING (the Headley farm's own dream) ----------
  {
    slug: "cut-flower-garden",
    title: "Floret Farm's Cut Flower Garden",
    author: "Erin Benzakein",
    category: "flower-farming",
    blurb:
      "The north star of specialty cut-flower farming — Floret is the standard the whole field measures against.",
    mattNote:
      "The farm Heather and I actually built and lost was a flower farm. Floret was the dream we were reaching for. This one is not just admiration.",
    bookshopUrl: "https://bookshop.org/search?keywords=floret+cut+flower+garden",
    publisherUrl: "https://www.floretflowers.com",
  },

  // ---------- AGRARIAN FICTION ----------
  {
    slug: "jayber-crow",
    title: "Jayber Crow",
    author: "Wendell Berry",
    category: "agrarian-fiction",
    blurb:
      "The Port William novel — a bachelor barber's life measured against a river town and its membership. Berry's fidelity-to-place argument, felt instead of argued.",
    bookshopUrl: "https://bookshop.org/search?keywords=jayber+crow+berry",
    relatedProfile: "/journal/wendell-berry-profile",
  },
];

export const SHELF_LABELS: Record<ShelfCategory, string> = {
  "faith-and-land": "Faith & the Land",
  "agrarian-method": "How the Ground Works",
  "permaculture": "Edible & Permaculture Landscapes",
  "flower-farming": "Flower Farming",
  "agrarian-fiction": "The Imagination of Place",
};

export const SHELF_ORDER: ShelfCategory[] = [
  "faith-and-land",
  "agrarian-method",
  "permaculture",
  "flower-farming",
  "agrarian-fiction",
];

/** Alabama titles first within each shelf (SL diaspora / E-E-A-T rule). */
export function booksByCategory(cat: ShelfCategory): Book[] {
  return FAITH_AGRARIAN_BOOKLIST
    .filter((b) => b.category === cat)
    .sort((a, b) => Number(Boolean(b.alabama)) - Number(Boolean(a.alabama)));
}
