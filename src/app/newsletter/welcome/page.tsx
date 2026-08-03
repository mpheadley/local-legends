import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome to Southern Legends Newsletter",
  description: "You're subscribed. First issue lands in your inbox this week.",
  robots: { index: false },
};

export default function NewsletterWelcomePage() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#060d09",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 560, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>✓</div>
        <h1
          className="font-serif"
          style={{ fontSize: 32, fontWeight: 900, color: "#f0ede8", marginBottom: 16 }}
        >
          You&apos;re in.
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "rgba(240,237,232,0.7)",
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          First issue lands in your inbox this week. If you don&apos;t see it,
          check your spam folder and mark it as &ldquo;not spam.&rdquo;
        </p>
        <p
          style={{
            fontSize: 14,
            color: "rgba(240,237,232,0.45)",
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Questions? Reply to any newsletter email or reach Matt at{" "}
          <a
            href="mailto:matt@gatherstudio.app"
            style={{ color: "#CA8A04", textDecoration: "underline" }}
          >
            matt@gatherstudio.app
          </a>
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/profiles"
            style={{
              background: "#C4622D",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Read the archive
          </Link>
          <Link
            href="/"
            style={{
              background: "transparent",
              color: "rgba(240,237,232,0.7)",
              padding: "12px 24px",
              borderRadius: 8,
              fontSize: 14,
              border: "1px solid rgba(240,237,232,0.2)",
              textDecoration: "none",
            }}
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
