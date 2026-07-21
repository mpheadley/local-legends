import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Back Forty — Southern Legends",
  description:
    "Southern Gothic agrarian satire from a flower farmer in Northeast Alabama. Joel Salatin is not my guru. Neither is Wendell Berry. But I read them both.",
  alternates: { canonical: "/back-forty" },
  openGraph: { url: "/back-forty" },
};

export default function BackFortyPage() {
  return (
    <main style={{ backgroundColor: "var(--color-ll-warm)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "42rem", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-ll-accent)",
            marginBottom: "0.75rem",
            fontFamily: "var(--font-body)",
          }}
        >
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Southern Legends
          </Link>
          {" / "} The Back Forty
        </p>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            fontWeight: 700,
            color: "var(--color-ll-dark)",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}
        >
          The Back Forty
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.05rem",
            color: "var(--color-ll-text)",
            lineHeight: 1.75,
            marginBottom: "1rem",
          }}
        >
          Southern Gothic agrarian satire. Written by a flower farmer who used to be a pastor
          and still isn't sure which job was harder on the knees.
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.05rem",
            color: "var(--color-ll-text)",
            lineHeight: 1.75,
            marginBottom: "2.5rem",
          }}
        >
          Joel Salatin is not my guru. Neither is Wendell Berry. But I read them both, and I
          grow flowers in clay soil in Anniston, Alabama, and occasionally that combination
          produces something worth writing down.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Link
            href="/back-forty/resources"
            style={{
              display: "block",
              padding: "1.25rem 1.5rem",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--color-ll-border)",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--color-ll-dark)",
                marginBottom: "0.25rem",
              }}
            >
              Resources →
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.88rem",
                color: "var(--color-ll-text-light)",
              }}
            >
              Books, tools, and gear I actually use. Affiliate links included, honestly labeled.
            </p>
          </Link>
        </div>

        <p
          style={{
            marginTop: "3rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "var(--color-ll-text-light)",
          }}
        >
          — Matt Headley, Northeast Alabama
        </p>
      </div>
    </main>
  );
}
