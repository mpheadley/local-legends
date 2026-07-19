import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { getAllListicles } from "@/lib/listicles";
import { siteConfig } from "@/lib/site-config";
import SectionLinks from "@/app/components/SectionLinks";
import ShareRow from "@/app/components/ShareRow";

export const metadata: Metadata = {
  title: "Local Guides — Southern Legends",
  description:
    "Data-driven guides to the best of local business — with the honest method behind every list. No pay-to-play.",
  alternates: { canonical: "/listicles" },
};

export default function ListiclesIndex() {
  const all = getAllListicles();
  const byCity = all.reduce<Record<string, typeof all>>((acc, l) => {
    const c = l.city || "Elsewhere";
    (acc[c] ||= []).push(l);
    return acc;
  }, {});
  const cities = Object.keys(byCity).sort();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Local Guides",
    url: `${siteConfig.url}/listicles`,
    description: "Data-driven local business guides with a transparent method.",
  };

  return (
    <main id="main-content" style={{ backgroundColor: "#F0EDE6", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-4xl px-6 pt-28 pb-16 md:pt-36">
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600,
          letterSpacing: "0.2em", textTransform: "uppercase", color: "#9a6c2f", marginBottom: "1rem",
        }}>
          Southern Legends
        </p>
        <h1 style={{
          fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 7vw, 4rem)", fontWeight: 400,
          lineHeight: 1.1, color: "#1a1208", marginBottom: "1rem",
        }}>
          Local Guides
        </h1>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "1.125rem", color: "#4a3728",
          maxWidth: "42rem", lineHeight: 1.65, marginBottom: "2.5rem",
        }}>
          The best of local business — coffee, barbecue, barbers, boutiques — with the honest method behind
          every list. We start from real data, show our work, and never rank anyone who paid. If a spot is
          missing, tell us and we&apos;ll add it.
        </p>

        {cities.map((city) => (
          <div key={city} style={{ marginBottom: "2.5rem" }}>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a6c2f", marginBottom: "1rem",
            }}>
              {city}
            </p>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {byCity[city].map((l) => (
                <Link key={l.slug} href={`/listicles/${l.slug}`} style={{
                  display: "block", background: "#fff", border: "1px solid rgba(154,108,47,0.15)",
                  borderRadius: "6px", padding: "1rem 1.25rem", textDecoration: "none",
                }}>
                  <span style={{
                    fontFamily: "var(--font-heading)", fontSize: "1.2rem", color: "#1a1208", display: "block",
                  }}>
                    {l.title}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#6b5040",
                    lineHeight: 1.5, marginTop: "0.35rem", display: "block",
                  }}>
                    {l.excerpt}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <ShareRow url="/listicles" title="Local Guides — Southern Legends" description="Data-driven local business guides with a transparent method." />
        <SectionLinks current="/listicles" />
      </div>
    </main>
  );
}
