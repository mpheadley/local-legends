"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SAMPLE_ISSUES = [
  {
    title: "The woman who kept the courthouse records for 34 years",
    preview: "She knew every deed, every name, every boundary dispute in Calhoun County. When she retired, nobody thought to write it down.",
    date: "August 2026",
  },
  {
    title: "Chief Ladiga Trail: what the volunteers don't tell you",
    preview: "The trail exists because of 11 people who met in a church fellowship hall in 1998. Most of them are still maintaining it.",
    date: "August 2026",
  },
  {
    title: "The church on Quintard that feeds 200 families",
    preview: "No press release. No social media. Just a pastor and a parking lot and a Tuesday morning.",
    date: "July 2026",
  },
];

const WHAT_YOU_GET = [
  "One or two stories per week — people, places, and events in NE Alabama that aren't in any newspaper",
  "Early access to new Southern Legends profiles and essays before they're published",
  "The Anniston Star faith column ($25/wk column — in your inbox before it's archived)",
  "Occasional field reports: what Matt found on a walk, a call, a county records search",
  "No ads. No sponsors. Just the stories.",
];

export default function NewsletterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong. Try again.");
        setLoading(false);
      }
    } catch {
      setError("Connection error. Try again.");
      setLoading(false);
    }
  }

  return (
    <main id="main-content" className="min-h-screen" style={{ background: "#060d09", color: "#f0ede8" }}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "72vh",
          background: "linear-gradient(155deg, #060d09 0%, #0d1a0d 60%, #060d09 100%)",
        }}
      >
        {/* Topo texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/images/topo-7.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          className="relative z-10 mx-auto flex flex-col justify-center"
          style={{ maxWidth: 720, minHeight: "72vh", padding: "7rem 24px 4rem" }}
        >
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              color: "#CA8A04",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 24, height: 1, background: "#CA8A04", display: "inline-block" }} />
            Southern Legends Newsletter
          </div>

          <h1
            className="font-serif"
            style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}
          >
            The stories that don&apos;t make the paper.
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(240,237,232,0.75)", marginBottom: 32, maxWidth: 580 }}>
            A weekly dispatch from Northeast Alabama — the people, places, and events
            that the internet doesn&apos;t know about yet. Written by Matt Headley,
            founding editor of Southern Legends.
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-4" style={{ maxWidth: 400 }}>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              style={{
                background: "#C4622D",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "16px 32px",
                fontSize: 16,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                letterSpacing: "0.02em",
                transition: "opacity .15s",
              }}
            >
              {loading ? "Redirecting..." : "Subscribe — $7/month"}
            </button>

            {error && (
              <p style={{ color: "#ef4444", fontSize: 13 }}>{error}</p>
            )}

            <p style={{ fontSize: 12, color: "rgba(240,237,232,0.4)", lineHeight: 1.5 }}>
              Cancel anytime. No lock-in. Billed monthly via Stripe.{" "}
              <Link href="/support" style={{ color: "#CA8A04", textDecoration: "underline" }}>
                Free patron tiers also available.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section style={{ background: "#0a140a", borderTop: "1px solid #1a2a1a", padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2
            className="font-serif"
            style={{ fontSize: 26, fontWeight: 700, marginBottom: 32, color: "#CA8A04" }}
          >
            What&apos;s in the newsletter
          </h2>
          <ul style={{ display: "grid", gap: 16 }}>
            {WHAT_YOU_GET.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  gap: 14,
                  fontSize: 15,
                  color: "rgba(240,237,232,0.85)",
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    color: "#C4622D",
                    fontSize: 18,
                    lineHeight: 1.4,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  &#x2713;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Sample issues ── */}
      <section style={{ background: "#060d09", padding: "64px 24px", borderTop: "1px solid #161616" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2
            className="font-serif"
            style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, color: "#f0ede8" }}
          >
            Recent issues
          </h2>
          <p style={{ fontSize: 14, color: "rgba(240,237,232,0.45)", marginBottom: 32 }}>
            A taste of what paid subscribers receive each week.
          </p>

          <div style={{ display: "grid", gap: 16 }}>
            {SAMPLE_ISSUES.map((issue) => (
              <div
                key={issue.title}
                style={{
                  background: "#0d1a0d",
                  border: "1px solid #1a2a1a",
                  borderRadius: 10,
                  padding: "20px 24px",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#CA8A04",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {issue.date}
                </div>
                <h3
                  className="font-serif"
                  style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#f0ede8" }}
                >
                  {issue.title}
                </h3>
                <p style={{ fontSize: 14, color: "rgba(240,237,232,0.6)", lineHeight: 1.6 }}>
                  {issue.preview}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who writes this ── */}
      <section
        style={{
          background: "#0a140a",
          borderTop: "1px solid #1a2a1a",
          padding: "64px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              border: "2px solid #C4622D",
            }}
          >
            <Image
              src="/images/matt-headshot-pro.webp"
              alt="Matt Headley"
              width={80}
              height={80}
              className="object-cover"
              style={{ objectPosition: "top" }}
            />
          </div>
          <div>
            <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Matt Headley
            </h3>
            <p style={{ fontSize: 14, color: "rgba(240,237,232,0.65)", lineHeight: 1.7 }}>
              Pastor, flower farmer, and classically trained singer in Northeast Alabama.
              I&apos;ve lived in this region for 26 years. I write a weekly faith column
              for the Anniston Star. I built Southern Legends because I kept finding
              people worth writing about that no one else was writing about.
            </p>
            <p
              style={{
                fontSize: 13,
                color: "rgba(240,237,232,0.4)",
                marginTop: 12,
                fontStyle: "italic",
              }}
            >
              Founding Editor, Southern Legends
            </p>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        style={{
          background: "#C4622D",
          padding: "48px 24px",
          textAlign: "center",
        }}
      >
        <h2
          className="font-serif"
          style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 12 }}
        >
          $7 a month. Cancel anytime.
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 28 }}>
          That&apos;s less than a cup of coffee at Called Coffee.
        </p>
        <button
          onClick={handleSubscribe}
          disabled={loading}
          style={{
            background: "#fff",
            color: "#C4622D",
            border: "none",
            borderRadius: 8,
            padding: "14px 36px",
            fontSize: 15,
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "opacity .15s",
          }}
        >
          {loading ? "Redirecting..." : "Subscribe — $7/month"}
        </button>
      </section>

    </main>
  );
}
