// ============================================================================
// TAXONOMY — multi-dimensional content classification, single source of truth.
// ----------------------------------------------------------------------------
// One piece of content is tagged across SIX independent dimensions. The
// TaxonomyBar renders the relevant chips top + bottom on profiles, essays,
// books, listicles, tag/index pages, /profiles, /essays, and 404.
//
// Portable: this file + TaxonomyBar.tsx are venture-agnostic. Copy into
// Ecclesia / The Aisle / any venture; each supplies its own VENTURE default
// and reuses the shared dimensions. See column-prep rollout report.
// ============================================================================

export type Dimension =
  | "genre"      // the form
  | "voice"      // who authored it
  | "format"     // satire sub-format (only when genre=satire)
  | "category"   // theme / ideology
  | "subject"    // concrete noun (the listicle subject)
  | "venture";   // which property it lives on

export interface TaxonValue {
  slug: string;
  label: string;
  /** where the tag/index page lives (relative) */
  href: string;
  /** optional emoji/lucide hint for the chip */
  hint?: string;
}

export interface TaxonomyDimension {
  key: Dimension;
  label: string;
  /** show this dimension's chip even when empty? */
  values: Record<string, TaxonValue>;
}

const mk = (dim: Dimension, entries: [string, string, string?][]): Record<string, TaxonValue> =>
  Object.fromEntries(
    entries.map(([slug, label, hint]) => [
      slug,
      { slug, label, href: `/${dim === "venture" ? "ventures" : dim}/${slug}`, hint },
    ])
  );

export const TAXONOMY: Record<Dimension, TaxonomyDimension> = {
  genre: {
    key: "genre",
    label: "Genre",
    values: mk("genre", [
      ["essay", "Essay", "✍️"],
      ["profile", "Profile", "👤"],
      ["listicle", "Complete List", "📋"],
      ["memoir", "Memoir", "📖"],
      ["satire", "Satire", "🎭"],
      ["devotional", "Devotional", "🕯️"],
      ["column", "Column", "🗞️"],
      ["guide", "Guide", "🧭"],
      ["book", "Book", "📚"],
      ["news", "News", "📣"],
    ]),
  },
  voice: {
    key: "voice",
    label: "Voice",
    values: mk("voice", [
      ["matt", "Matt Headley", "🖋️"],
      ["iris", "Iris (disclosed AI)", "🐈‍⬛"],
      ["contributor", "Contributor", "🤝"],
      ["community", "Community", "🫂"],
    ]),
  },
  format: {
    key: "format",
    label: "Satire format",
    values: mk("format", [
      ["news-parody", "News parody"],
      ["field-guide", "Field guide"],
      ["dark-comedy", "Dark comedy"],
      ["nonsense", "Nonsense"],
      ["southern-gothic", "Southern Gothic"],
    ]),
  },
  category: {
    key: "category",
    label: "Theme",
    values: mk("category", [
      ["faith", "Faith"],
      ["mental-health", "Mental health"],
      ["place", "Place"],
      ["food", "Food"],
      ["church", "Church"],
      ["agriculture", "Agriculture"],
      ["music", "Music"],
      ["craft", "Craft"],
      ["diaspora", "Diaspora"],
      ["technology", "Technology"],
      ["marriage", "Marriage"],
      ["business", "Business"],
    ]),
  },
  subject: {
    key: "subject",
    label: "Subject",
    values: mk("subject", [
      ["baptist-churches", "Baptist churches"],
      ["methodist-churches", "Methodist churches"],
      ["print-shops", "Print shops"],
      ["chinese-restaurants", "Chinese restaurants"],
      ["coffee", "Coffee"],
      ["bbq", "BBQ"],
      ["farms", "Farms"],
      ["trails", "Trails"],
    ]),
  },
  venture: {
    key: "venture",
    label: "On",
    values: mk("venture", [
      ["southern-legends", "Southern Legends"],
      ["ecclesia", "Ecclesia"],
      ["the-aisle", "The Aisle"],
      ["gather-studio", "Gather Studio"],
      ["tend", "Tend"],
    ]),
  },
};

// A piece's taxonomy assignment. All optional; render only what's set.
export interface Taxonomy {
  genre?: string;
  voice?: string;
  format?: string;
  category?: string | string[];
  subject?: string;
  venture?: string;
}

export interface ResolvedChip extends TaxonValue {
  dimension: Dimension;
  dimensionLabel: string;
}

/** Resolve a Taxonomy into ordered chips for the TaxonomyBar. */
export function resolveChips(t: Taxonomy, ventureDefault = "southern-legends"): ResolvedChip[] {
  const order: Dimension[] = ["genre", "voice", "format", "category", "subject", "venture"];
  const chips: ResolvedChip[] = [];
  const withVenture: Taxonomy = { venture: ventureDefault, ...t };
  for (const dim of order) {
    const raw = withVenture[dim as keyof Taxonomy];
    if (!raw) continue;
    const vals = Array.isArray(raw) ? raw : [raw];
    for (const v of vals) {
      const found = TAXONOMY[dim].values[v as string];
      if (found) chips.push({ ...found, dimension: dim, dimensionLabel: TAXONOMY[dim].label });
    }
  }
  return chips;
}
