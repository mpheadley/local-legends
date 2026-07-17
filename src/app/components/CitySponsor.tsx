import type { SLSponsor } from "@/lib/places"

export default function CitySponsor({ sponsor }: { sponsor: SLSponsor | null }) {
  if (!sponsor) return null
  return (
    <div style={{ background: "#1a1208", borderBottom: "1px solid rgba(154,108,47,0.15)", padding: "0.6rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" as const }}>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(240,237,230,0.4)", flexShrink: 0 }}>
        Sponsored by
      </p>
      {sponsor.url ? (
        <a href={sponsor.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600, color: "#9a6c2f", textDecoration: "none" }}>
          {sponsor.businessName}
        </a>
      ) : (
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600, color: "#9a6c2f" }}>
          {sponsor.businessName}
        </span>
      )}
      {sponsor.tagline && (
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(240,237,230,0.5)" }}>
          — {sponsor.tagline}
        </span>
      )}
    </div>
  )
}
