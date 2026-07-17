import type { SLEvent } from "@/lib/places"

const SOURCE_LABELS: Record<string, string> = {
  "the-aisle": "The Aisle",
  "marketday": "MarketDay",
  "gather-ground": "Gather Ground",
  "local-govt": "City",
  "other": "Local",
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso + "T00:00:00")
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  } catch {
    return iso
  }
}

export default function CityEvents({ events, city }: { events: SLEvent[]; city: string }) {
  if (!events.length) return null
  return (
    <section style={{ borderTop: "1px solid rgba(154,108,47,0.12)" }}>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#9a6c2f", marginBottom: "1.25rem" }}>
          Coming up in {city}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {events.map((event, i) => (
            <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", padding: "0.875rem 0", borderBottom: i < events.length - 1 ? "1px solid rgba(154,108,47,0.1)" : "none" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, color: "#9a6c2f", flexShrink: 0, minWidth: "60px", marginTop: "0.15rem" }}>
                {formatDate(event.date)}
              </p>
              <div style={{ flex: 1 }}>
                {event.url ? (
                  <a href={event.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-heading)", fontSize: "0.9375rem", fontWeight: 400, color: "#1a1208", textDecoration: "none", display: "block", marginBottom: "0.2rem" }}>
                    {event.title}
                  </a>
                ) : (
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.9375rem", fontWeight: 400, color: "#1a1208", marginBottom: "0.2rem" }}>
                    {event.title}
                  </p>
                )}
                {event.venue && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#6b5040" }}>
                    {event.venue}{event.time ? ` · ${event.time}` : ""}
                  </p>
                )}
              </div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(107,80,64,0.4)", flexShrink: 0, marginTop: "0.2rem" }}>
                {SOURCE_LABELS[event.source] ?? "Local"}
              </span>
            </div>
          ))}
        </div>
        <a href="/places/submit-event" style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "#9a6c2f", fontWeight: 600, textDecoration: "underline" }}>
          Submit an event in {city} →
        </a>
      </div>
    </section>
  )
}
