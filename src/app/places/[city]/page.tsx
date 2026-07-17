import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin } from "lucide-react"
import { readFileSync } from "fs"
import { join } from "path"
import { CITIES, localBusinesses, cityToSlug as dbCityToSlug } from "@/lib/city-businesses"
import { SL_PLACES, cityToSlug as slCityToSlug } from "@/lib/places"
import { getFeaturedForCity, TAG_LABELS, TAG_COLORS } from "@/lib/featured-businesses"
import { getCityMeta } from "@/lib/city-meta"
import CityNewsletterSignup from "@/app/components/CityNewsletterSignup"

export const revalidate = 86400 // revalidate daily

type Props = { params: Promise<{ city: string }> }

type NewsStory = {
  title: string
  url: string
  source: string
  excerpt?: string
  priority?: string
}

function getNewsForCity(cityName: string): NewsStory[] {
  try {
    const p = join(process.cwd(), "../../.instar/news/news-briefing.json")
    const data = JSON.parse(readFileSync(p, "utf8"))
    const stories: NewsStory[] = data.stories ?? []
    const lo = cityName.toLowerCase()
    const local = stories.filter(
      (s) => s.title?.toLowerCase().includes(lo) || s.excerpt?.toLowerCase().includes(lo)
    )
    return local.length > 0 ? local.slice(0, 5) : stories.slice(0, 3)
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  return CITIES.map((city) => ({ city: dbCityToSlug(city) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const cityName = CITIES.find((c) => dbCityToSlug(c) === citySlug)
  if (!cityName) return {}
  return {
    title: `${cityName}, Alabama — Southern Legends`,
    description: `Local businesses, stories, and community in ${cityName}, Alabama. Curated by Southern Legends.`,
    alternates: { canonical: `/places/${citySlug}` },
    openGraph: {
      title: `${cityName}, Alabama — Southern Legends`,
      description: `The people, places, and stories of ${cityName}.`,
      url: `/places/${citySlug}`,
    },
  }
}

const LABEL: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#9a6c2f",
}

const HEADING: React.CSSProperties = {
  fontFamily: "var(--font-heading)",
  fontWeight: 400,
  color: "#1a1208",
}

const BODY: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  color: "#6b5040",
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params
  const cityName = CITIES.find((c) => dbCityToSlug(c) === citySlug)
  if (!cityName) notFound()

  const cityBizzes = localBusinesses.filter((b) =>
    dbCityToSlug(b.city) === citySlug &&
    !b.website?.includes("eventbrite.com") &&
    !b.name.match(/^\d{4}\s/) // filter year-prefixed event names
  )
  const slPlaces = SL_PLACES.filter((p) => slCityToSlug(p.city) === citySlug)
  const featuredBizzes = getFeaturedForCity(citySlug)
  const cityMeta = getCityMeta(citySlug)

  // Category counts for stats line
  const categoryCounts: Record<string, number> = {}
  for (const b of cityBizzes) {
    const cat = b.category || "Other"
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
  }
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([cat, n]) => `${n} ${cat.toLowerCase()}`)
    .join(" · ")
  const news = getNewsForCity(cityName)
  const isAnniston = citySlug === "anniston"

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Businesses in ${cityName}, Alabama`,
    url: `https://southernlegends.blog/places/${citySlug}`,
    numberOfItems: cityBizzes.length,
    itemListElement: cityBizzes.slice(0, 20).map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        name: b.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: cityName,
          addressRegion: "AL",
        },
        ...(b.website ? { url: b.website } : {}),
        ...(b.phone ? { telephone: b.phone } : {}),
      },
    })),
  }

  return (
    <main id="main-content" style={{ backgroundColor: "#F0EDE6", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* HERO */}
      <div className="mx-auto max-w-4xl px-6 pt-28 pb-8 md:pt-36">
        <Link
          href="/places"
          style={{ ...BODY, fontSize: "0.8rem", fontWeight: 600, color: "#9a6c2f", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem", marginBottom: "1.5rem" }}
        >
          ← Places
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
          <MapPin size={14} style={{ color: "#9a6c2f" }} />
          <p style={{ ...LABEL, marginBottom: 0 }}>Alabama</p>
        </div>
        <h1 style={{ ...HEADING, fontSize: "clamp(2.5rem, 7vw, 4rem)", marginBottom: "0.5rem" }}>
          {cityName}
        </h1>
        <p style={{ ...BODY, fontSize: "1rem", marginBottom: "1rem" }}>
          The people, places, and stories of {cityName}, Alabama.
          {cityMeta?.tagline && ` ${cityMeta.tagline}.`}
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          {cityMeta?.facebook && (
            <a
              href={cityMeta.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#9a6c2f", fontWeight: 600, textDecoration: "none" }}
            >
              {cityName} on Facebook ↗
            </a>
          )}
          {topCategories && (
            <p style={{ ...BODY, fontSize: "0.75rem", margin: 0 }}>{topCategories}</p>
          )}
        </div>
      </div>

      {/* DISPATCH — local news */}
      {news.length > 0 && (
        <section style={{ background: "#1a1208" }}>
          <div className="mx-auto max-w-4xl px-6 py-8">
            <p style={{ ...LABEL, color: "#9a6c2f", marginBottom: "1rem" }}>
              This week in {cityName}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {news.map((story, i) => (
                <a
                  key={i}
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", padding: "0.75rem 0", borderBottom: i < news.length - 1 ? "1px solid rgba(240,237,230,0.08)" : "none" }}
                >
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: "#F0EDE6", fontWeight: 400, lineHeight: 1.4 }}>
                    {story.title}
                  </span>
                  <span style={{ ...LABEL, color: "rgba(240,237,230,0.4)", flexShrink: 0, marginTop: "0.2rem" }}>
                    {story.source}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED — Matt's ventures + confirmed Aisle vendors + partners */}
      {featuredBizzes.length > 0 && (
        <div className="mx-auto max-w-4xl px-6 py-10">
          <p style={{ ...LABEL, marginBottom: "1rem" }}>Featured in {cityName}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "0.5rem" }}>
            {featuredBizzes.map((biz) => (
              <div key={biz.name} style={{ background: "#fff", borderRadius: "8px", padding: "1.25rem 1.5rem", border: "1px solid rgba(154,108,47,0.18)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F0EDE6", background: TAG_COLORS[biz.tag], padding: "0.2rem 0.5rem", borderRadius: "3px" }}>
                    {TAG_LABELS[biz.tag]}
                  </span>
                  <span style={{ ...BODY, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                    {biz.category}
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.0625rem", fontWeight: 400, color: "#1a1208", lineHeight: 1.2 }}>
                  {biz.storySlug ? (
                    <Link href={`/places/${citySlug}/${biz.storySlug}`} style={{ color: "#1a1208", textDecoration: "none" }}>
                      {biz.name}
                    </Link>
                  ) : biz.name}
                </p>
                <p style={{ ...BODY, fontSize: "0.8125rem", lineHeight: 1.55, flex: 1 }}>{biz.description}</p>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem", flexWrap: "wrap" }}>
                  {biz.website && (
                    <a href={biz.website} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#9a6c2f", fontWeight: 600, textDecoration: "none" }}>
                      Visit ↗
                    </a>
                  )}
                  {biz.phone && (
                    <a href={`tel:${biz.phone}`} style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#6b5040", textDecoration: "none" }}>
                      {biz.phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CIRCLE — 6,818-business directory */}
      {cityBizzes.length > 0 && (
        <div className="mx-auto max-w-4xl px-6 py-10">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
            <p style={{ ...LABEL }}>Who&apos;s building in {cityName}</p>
            <p style={{ ...BODY, fontSize: "0.75rem" }}>{cityBizzes.length} businesses</p>
          </div>
          <p style={{ ...BODY, fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            Every business in {cityName} in the Gather Circle directory. Claim yours to add hours, photos, and your story.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
            {cityBizzes.slice(0, 20).map((biz) => (
              <div
                key={biz.id}
                style={{ background: "#fff", borderRadius: "6px", padding: "0.875rem 1.25rem", border: "1px solid rgba(154,108,47,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}
              >
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.9375rem", fontWeight: 400, color: "#1a1208", marginBottom: "0.15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {biz.name}
                  </p>
                  {biz.category && (
                    <p style={{ ...BODY, fontSize: "0.75rem" }}>{biz.category}</p>
                  )}
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexShrink: 0 }}>
                  {biz.website && (
                    <a
                      href={biz.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#9a6c2f", textDecoration: "none", fontWeight: 600 }}
                    >
                      Visit ↗
                    </a>
                  )}
                  {!biz.website && (
                    <a
                      href={`https://gatherstudio.app/api/wiki-claim?id=${biz.id}&name=${encodeURIComponent(biz.name)}`}
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "#9a6c2f", textDecoration: "underline", whiteSpace: "nowrap" }}
                    >
                      Claim listing
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {cityBizzes.length > 20 && (
            <p style={{ ...BODY, fontSize: "0.8125rem", textAlign: "center" }}>
              + {cityBizzes.length - 20} more businesses in {cityName} in the full directory
            </p>
          )}
        </div>
      )}

      {/* SL PLACES — curated editorial listings */}
      {slPlaces.length > 0 && (
        <section style={{ borderTop: "1px solid rgba(154,108,47,0.12)" }}>
          <div className="mx-auto max-w-4xl px-6 py-10">
            <p style={{ ...LABEL, marginBottom: "1rem" }}>Stories from {cityName}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {slPlaces.map((place) => (
                <Link
                  key={place.id}
                  href={`/places/${citySlug}/${place.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{ background: "#fff", borderRadius: "6px", padding: "1.125rem 1.5rem", border: "1px solid rgba(154,108,47,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 400, color: "#1a1208", marginBottom: "0.2rem" }}>
                        {place.name}
                      </p>
                      <p style={{ ...BODY, fontSize: "0.8125rem" }}>
                        {place.category}
                        {place.story && " · SL Story"}
                      </p>
                    </div>
                    <span style={{ color: "#9a6c2f", fontSize: "1.125rem" }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CLAIM BAND */}
      <div style={{ background: "#1a1208" }}>
        <div className="mx-auto max-w-4xl px-6 py-10" style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
          <p style={{ ...LABEL, color: "#9a6c2f" }}>Gather Circle</p>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.25rem, 3vw, 1.75rem)", color: "#F0EDE6", fontWeight: 400, maxWidth: "36rem" }}>
            Is your business listed in {cityName}?
          </p>
          <p style={{ ...BODY, color: "rgba(240,237,230,0.65)", fontSize: "0.9375rem", maxWidth: "36rem", lineHeight: 1.65 }}>
            Claim your free listing, add your hours and story, and get found by people already looking for what you do.
          </p>
          <a
            href={`https://gatherstudio.app/api/wiki-claim?city=${citySlug}`}
            style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", background: "#9a6c2f", color: "#F0EDE6", padding: "0.625rem 1.5rem", borderRadius: "4px", textDecoration: "none" }}
          >
            Claim your free listing — $4.99
          </a>
        </div>
      </div>

      {/* FAITH — Anniston only */}
      {isAnniston && (
        <section style={{ borderTop: "1px solid rgba(154,108,47,0.12)" }}>
          <div className="mx-auto max-w-4xl px-6 py-10">
            <p style={{ ...LABEL, marginBottom: "1rem" }}>Faith in Anniston</p>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 400, color: "#1a1208", marginBottom: "0.75rem" }}>
              A weekly column in the Anniston Star.
            </p>
            <p style={{ ...BODY, fontSize: "0.9375rem", lineHeight: 1.65, marginBottom: "1.25rem", maxWidth: "36rem" }}>
              Matt Headley writes about faith, community, and what it means to build something in a small Alabama city. It runs Sundays in the Anniston Star, beginning August 3.
            </p>
            <a
              href="https://www.annistonstar.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#9a6c2f", fontWeight: 600, textDecoration: "underline" }}
            >
              Read the Anniston Star →
            </a>
          </div>
        </section>
      )}

      {/* SPONSOR SLOT — shown when city has a sponsor */}
      {/* Populated via SL_SPONSORS in places.ts — empty until first sponsor signs */}

      {/* BLUEPRINT PITCH */}
      <div style={{ background: "#f5f0e8", borderTop: "1px solid rgba(154,108,47,0.1)" }}>
        <div className="mx-auto max-w-4xl px-6 py-10">
          <p style={{ ...LABEL, marginBottom: "0.75rem" }}>Gather Studio</p>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.25rem, 3vw, 1.75rem)", color: "#1a1208", fontWeight: 400, marginBottom: "0.75rem", maxWidth: "32rem" }}>
            Does your {cityName} business have a clear message?
          </p>
          <p style={{ ...BODY, fontSize: "0.9375rem", lineHeight: 1.65, marginBottom: "1.25rem", maxWidth: "36rem" }}>
            A Blueprint Session gets you there in 90 minutes. Find out what you&apos;re actually building and why it matters.
          </p>
          <a
            href="https://gatherstudio.app/book"
            style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", background: "#1a1208", color: "#F0EDE6", padding: "0.625rem 1.5rem", borderRadius: "4px", textDecoration: "none" }}
          >
            Book a Blueprint Session
          </a>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div style={{ borderTop: "1px solid rgba(154,108,47,0.1)" }}>
        <div className="mx-auto max-w-4xl px-6 py-10">
          <CityNewsletterSignup city={cityName} />
        </div>
      </div>

      {/* NEARBY CITIES */}
      {cityMeta?.nearbySlug && cityMeta.nearbySlug.length > 0 && (
        <div className="mx-auto max-w-4xl px-6 pb-4">
          <p style={{ ...LABEL, marginBottom: "0.5rem" }}>Also in NE Alabama</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {cityMeta.nearbySlug.map((slug) => {
              const name = CITIES.find((c) => dbCityToSlug(c) === slug) || slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
              return (
                <Link
                  key={slug}
                  href={`/places/${slug}`}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#9a6c2f", fontWeight: 600, textDecoration: "none", padding: "0.3rem 0.75rem", border: "1px solid rgba(154,108,47,0.25)", borderRadius: "4px" }}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* NOMINATE */}
      <div className="mx-auto max-w-4xl px-6 py-8" style={{ textAlign: "center" }}>
        <Link
          href="/places/nominate"
          style={{ ...BODY, fontSize: "0.875rem", color: "#9a6c2f", fontWeight: 600, textDecoration: "underline" }}
        >
          Know a business in {cityName} that belongs here? Nominate them →
        </Link>
      </div>
    </main>
  )
}
