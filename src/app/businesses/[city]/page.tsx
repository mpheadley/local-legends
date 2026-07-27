import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin } from "lucide-react"
import { getBusinessesByCity, getBusinessCities, cityToSlug } from "@/lib/businesses"
import { getMerchForCity } from "@/lib/merch"

export const revalidate = 86400

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  const cities = getBusinessCities()
  return cities.map((c) => ({ city: cityToSlug(c) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const cities = getBusinessCities()
  const cityName = cities.find((c) => cityToSlug(c) === citySlug)
  if (!cityName) return {}
  return {
    title: `Businesses in ${cityName}, Alabama — Southern Legends`,
    description: `Local businesses worth knowing in ${cityName}, Alabama — faith communities, food, vendors, and more.`,
    alternates: { canonical: `/businesses/${citySlug}` },
    openGraph: {
      title: `Businesses in ${cityName} — Southern Legends`,
      description: `Local businesses in ${cityName}, Alabama.`,
      url: `/businesses/${citySlug}`,
    },
  }
}

export default async function BusinessesCityPage({ params }: Props) {
  const { city: citySlug } = await params
  const cities = getBusinessCities()
  const cityName = cities.find((c) => cityToSlug(c) === citySlug)
  if (!cityName) notFound()

  const businesses = getBusinessesByCity(citySlug)
  if (businesses.length === 0) notFound()

  const cityMerch = getMerchForCity(citySlug, 3)

  // Group by category
  const byCategory: Record<string, typeof businesses> = {}
  for (const b of businesses) {
    const cat = b.frontmatter.businessCategory || "Local Businesses"
    if (!byCategory[cat]) byCategory[cat] = []
    byCategory[cat].push(b)
  }
  const categories = Object.keys(byCategory).sort()

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
          <Link href="/" className="hover:underline">Southern Legends</Link>
          <span>/</span>
          <Link href="/businesses" className="hover:underline">Businesses</Link>
          <span>/</span>
          <span>{cityName}</span>
        </div>
        <h1 className="text-3xl font-serif font-bold mb-2">{cityName}, Alabama</h1>
        <p className="text-neutral-500 text-sm flex items-center gap-1">
          <MapPin size={14} />
          {businesses.length} businesses worth knowing
          {" · "}
          <Link href={`/places/${citySlug}`} className="underline hover:text-neutral-800">
            City profile
          </Link>
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat} className="mb-10">
          <h2 className="text-lg font-semibold mb-4 border-b border-neutral-200 pb-2">{cat}</h2>
          <div className="space-y-6">
            {byCategory[cat].map((b) => (
              <article key={b.slug} className="group">
                <h3 className="font-medium text-base mb-1">{b.frontmatter.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{b.frontmatter.excerpt}</p>
                <div className="mt-2 text-xs text-neutral-400">
                  {b.frontmatter.tags
                    .filter((t) => t !== "businesses" && t !== citySlug)
                    .map((t) => (
                      <span key={t} className="mr-2 capitalize">{t.replace(/-/g, " ")}</span>
                    ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {cityMerch.length > 0 && (
        <section style={{ background: "#1a1208", borderRadius: "8px", padding: "1.5rem", marginTop: "2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a6c2f", marginBottom: "0.4rem" }}>Wear it</p>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", color: "#F0EDE6", fontWeight: 400, marginBottom: "1rem" }}>{cityName} merch from Southern Legends</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1rem" }}>
            {cityMerch.map((item) => {
              const card = (
                <>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: "5px", overflow: "hidden", background: "#2a1e10" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.photo} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: item.available ? 1 : 0.45 }} />
                    {!item.available && (
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#F0EDE6", background: "rgba(26,18,8,0.88)", padding: "0.15rem 0.4rem", borderRadius: "3px" }}>Coming soon</span>
                      </div>
                    )}
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.8rem", color: item.available ? "#F0EDE6" : "rgba(240,237,230,0.4)", lineHeight: 1.2, marginTop: "0.35rem" }}>{item.name}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "rgba(240,237,230,0.4)", marginTop: "0.15rem" }}>{item.available ? `$${item.price}` : "Coming soon"}</p>
                </>
              )
              return item.available ? (
                <a key={item.id} href={`/merch#${item.id}`} style={{ textDecoration: "none" }}>{card}</a>
              ) : (
                <div key={item.id}>{card}</div>
              )
            })}
          </div>
          <a href="/merch" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#c4974a", fontWeight: 600, textDecoration: "none" }}>See all merch →</a>
        </section>
      )}

      <div className="mt-10 pt-6 border-t border-neutral-200 text-sm text-neutral-500 flex flex-wrap gap-4">
        <Link href={`/places/${citySlug}`} className="underline hover:text-neutral-800">
          {cityName} city profile →
        </Link>
        <Link href="/businesses" className="underline hover:text-neutral-800">
          All Alabama cities →
        </Link>
        <Link href="/nominate" className="underline hover:text-neutral-800">
          Nominate a business →
        </Link>
      </div>
    </main>
  )
}
