"use client"

import { useState } from "react"

export default function CityNewsletterSignup({ city }: { city: string }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("/api/city-newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city }),
      })
      setStatus(res.ok ? "done" : "error")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div style={{ background: "#1a1208", borderRadius: "8px", padding: "2rem", margin: "2rem 0" }}>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#9a6c2f", marginBottom: "0.75rem" }}>
        Southern Legends
      </p>
      <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", color: "#F0EDE6", fontWeight: 400, marginBottom: "0.5rem" }}>
        The {city} Letter
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(240,237,230,0.65)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
        Weekly digest of what&apos;s happening in {city}. One story. One dispatch. When there&apos;s something worth sending.
      </p>
      {status === "done" ? (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#9a6c2f", fontWeight: 600 }}>
          You&apos;re in. First issue coming soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" as const }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{ flex: 1, minWidth: "200px", padding: "0.625rem 1rem", borderRadius: "4px", border: "1px solid rgba(154,108,47,0.3)", background: "rgba(240,237,230,0.06)", color: "#F0EDE6", fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none" }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{ padding: "0.625rem 1.25rem", background: "#9a6c2f", color: "#F0EDE6", border: "none", borderRadius: "4px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}
          >
            {status === "loading" ? "…" : "Subscribe"}
          </button>
          {status === "error" && (
            <p style={{ width: "100%", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#ef4444", marginTop: "0.25rem" }}>
              Something went wrong. Try again.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
