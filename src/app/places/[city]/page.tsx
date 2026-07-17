import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SL_CITIES, getPlacesByCity, cityToSlug } from "@/lib/places"
import { siteConfig } from "@/lib/site-config"

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return SL_CITIES.map(city => ({ city: cityToSlug(city) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = SL_CITIES.find(c => cityToSlug(c) === citySlug)
  if (!city) return {}
  return {
    title: `${city} Places — Southern Legends`,
    description: `Local businesses in ${city}, Alabama, curated by Southern Legends.`,
    alternates: { canonical: `/places/${citySlug}` },
  }
}

export default async function CityPlacesPage({ params }: Props) {
  const { city: citySlug } = await params
  const city = SL_CITIES.find(c => cityToSlug(c) === citySlug)
  if (!city) notFound()

  const places = getPlacesByCity(citySlug)
  if (!places.length) notFound()

  return (
    <main id="main-content" style={{ backgroundColor: "#F0EDE6", minHeight: "100vh" }}>
      <div className="mx-auto max-w-4xl px-6 pt-28 pb-20 md:pt-36">
        <Link
          href="/places"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#9a6c2f",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            marginBottom: "2rem",
          }}
        >
          ← Places
        </Link>

        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 400,
          color: "#1a1208",
          marginBottom: "0.5rem",
        }}>
          {city}
        </h1>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          color: "#6b5040",
          marginBottom: "2.5rem",
        }}>
          {places.length} place{places.length !== 1 ? 's' : ''} · {city}, Alabama
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {places.map(biz => (
            <Link
              key={biz.id}
              href={`/places/${citySlug}/${biz.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "1.25rem 1.5rem",
                border: "1px solid rgba(154,108,47,0.12)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div>
                  <h2 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.125rem",
                    fontWeight: 400,
                    color: "#1a1208",
                    marginBottom: "0.25rem",
                  }}>
                    {biz.name}
                  </h2>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "#6b5040",
                  }}>
                    {biz.category}
                    {biz.story && " · SL Story"}
                  </p>
                </div>
                <span style={{ color: "#9a6c2f", fontSize: "1.25rem" }}>→</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <Link
            href="/places/nominate"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "#9a6c2f",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Know a business in {city} that belongs here? Nominate them.
          </Link>
        </div>
      </div>
    </main>
  )
}
