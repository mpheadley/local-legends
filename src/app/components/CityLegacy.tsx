import Link from "next/link"
import type { SLLegacyPerson } from "@/lib/places"

export default function CityLegacy({ legacy, city }: { legacy: SLLegacyPerson[]; city: string }) {
  if (!legacy.length) return null
  return (
    <section style={{ borderTop: "1px solid rgba(154,108,47,0.12)" }}>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#9a6c2f", marginBottom: "0.5rem" }}>
          Gather Legacy
        </p>
        <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.875rem", color: "#6b5040", marginBottom: "1.5rem" }}>
          People who built something in {city}.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {legacy.map((person, i) => (
            <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(107,80,64,0.5)", flexShrink: 0, marginTop: "0.2rem", minWidth: "80px" }}>
                {person.years}
              </p>
              <div>
                {person.slug ? (
                  <Link href={`/profiles/${person.slug}`} style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 400, color: "#1a1208", textDecoration: "none" }}>
                    {person.name}
                  </Link>
                ) : (
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 400, color: "#1a1208" }}>
                    {person.name}
                  </p>
                )}
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "#9a6c2f", marginBottom: "0.2rem" }}>
                  {person.what}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#6b5040", lineHeight: 1.6 }}>
                  {person.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Link href="/places/nominate" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "#9a6c2f", fontWeight: 600, textDecoration: "underline" }}>
            Know someone whose legacy belongs here? →
          </Link>
        </div>
      </div>
    </section>
  )
}
