import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Nominate a Place — Southern Legends",
  description: "Know a local business worth featuring in SL Places? Nominate them. We read every submission.",
  alternates: { canonical: "/places/nominate" },
}

export default function NominatePlacePage() {
  return (
    <main id="main-content" style={{ backgroundColor: "#F0EDE6", minHeight: "100vh" }}>
      <div className="mx-auto max-w-2xl px-6 pt-28 pb-20 md:pt-36">
        <Link
          href="/places"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#9a6c2f",
            textDecoration: "none",
            marginBottom: "2rem",
            display: "inline-block",
          }}
        >
          ← Places
        </Link>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#9a6c2f",
          marginBottom: "0.75rem",
          marginTop: "1rem",
        }}>
          SL Places
        </p>

        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          fontWeight: 400,
          color: "#1a1208",
          marginBottom: "1rem",
          lineHeight: 1.15,
        }}>
          Nominate a business
        </h1>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "1.0625rem",
          color: "#4a3728",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
        }}>
          SL Places lists businesses with a story behind them — not the ones who paid to be here. If you know a local business in Northeast Alabama worth knowing, tell us about it. We read every submission and reach out to the ones that fit.
        </p>

        <form
          action="/api/places/nominate"
          method="POST"
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {[
            { name: "business_name", label: "Business name", type: "text", required: true },
            { name: "city", label: "City", type: "text", required: true },
            { name: "website", label: "Website or social link", type: "url", required: false },
            { name: "your_name", label: "Your name", type: "text", required: true },
            { name: "your_email", label: "Your email", type: "email", required: true },
          ].map(field => (
            <div key={field.name}>
              <label style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1a1208",
                marginBottom: "0.4rem",
              }}>
                {field.label}{field.required && " *"}
              </label>
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  border: "1px solid rgba(154,108,47,0.3)",
                  borderRadius: "4px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  background: "#fff",
                  color: "#1a1208",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}

          <div>
            <label style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#1a1208",
              marginBottom: "0.4rem",
            }}>
              Why do they belong here? *
            </label>
            <textarea
              name="reason"
              required
              rows={4}
              style={{
                width: "100%",
                padding: "0.625rem 0.875rem",
                border: "1px solid rgba(154,108,47,0.3)",
                borderRadius: "4px",
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                background: "#fff",
                color: "#1a1208",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
              }}
              placeholder="Tell us what makes this business worth knowing..."
            />
          </div>

          <button
            type="submit"
            style={{
              background: "#9a6c2f",
              color: "#F0EDE6",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            Submit nomination
          </button>
        </form>
      </div>
    </main>
  )
}
