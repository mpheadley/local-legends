export const revalidate = 300

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import StripePricingTable from "@/app/components/StripePricingTable";
import SubscribeCTA from "@/app/components/SubscribeCTA";
import { MERCH } from "@/lib/merch";

export const metadata: Metadata = {
  title: "Support",
  description: `Support Southern Legends — free stories from Northeast Alabama, written by Matt Headley.`,
  alternates: { canonical: "/support" },
  openGraph: { url: "/support" },
};

const available = MERCH.filter((m) => m.available);

export default function SupportPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Support", item: `${siteConfig.url}/support` },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative text-white overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-black/50 z-[1]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-10 md:pt-32 md:pb-14">
          <h1
            className="text-3xl md:text-4xl font-bold uppercase tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Support This Work
          </h1>
          <p className="mt-3 text-white/70 text-lg">
            Southern Legends is free. If you want to help it keep going — here&apos;s how.
          </p>
        </div>
      </section>

      {/* Merch */}
      <section className="bg-ll-light py-14 px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-ll-text-light font-semibold mb-2">Buy something</p>
          <h2 className="text-2xl font-bold text-ll-dark mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Southern Legends Shop
          </h2>
          <p className="text-sm text-ll-text mb-8 max-w-xl">
            Race tees, trail gear, NE Alabama history prints, and more. Every purchase supports the reporting.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {available.map((item) => (
              <Link key={item.id} href={`/merch#${item.id}`} style={{ textDecoration: "none" }}>
                <div style={{ position: "relative", width: "100%", paddingBottom: "100%", borderRadius: "8px", overflow: "hidden", background: "#1a1208" }}>
                  <Image
                    src={item.photo}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 45vw, 180px"
                  />
                  {item.badge && (
                    <span style={{
                      position: "absolute", top: "0.4rem", left: "0.4rem",
                      background: item.badgeColor ?? "#9a6c2f", color: "#fff",
                      fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em",
                      textTransform: "uppercase", padding: "0.15rem 0.4rem", borderRadius: "3px",
                    }}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#1a1208", marginTop: "0.4rem", fontWeight: 600 }}>{item.name}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "#9a6c2f" }}>${item.price}</p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/merch"
              className="inline-block text-sm font-semibold text-ll-primary border border-ll-primary px-5 py-2.5 hover:bg-ll-primary hover:text-white transition-colors rounded"
            >
              Full catalog →
            </Link>
          </div>
        </div>
      </section>

      {/* Give directly */}
      <section className="bg-white py-14 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-ll-text-light font-semibold mb-2">Give directly</p>
          <h2 className="text-2xl font-bold text-ll-dark mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Monthly support
          </h2>
          <p className="text-sm text-ll-text mb-8 max-w-xl">
            A monthly contribution keeps the work going. Cancel any time.
          </p>

          <StripePricingTable />

          {process.env.NEXT_PUBLIC_STRIPE_SUPPORT_URL && (
            <div className="mt-8">
              <p className="text-sm text-ll-text-light mb-3">Or a one-time gift — no account needed.</p>
              <a
                href={process.env.NEXT_PUBLIC_STRIPE_SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-support inline-block px-7 py-3 bg-ll-primary font-bold text-sm rounded-md hover:bg-ll-primary-dark"
              >
                Give a one-time gift →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Listen free */}
      <section className="bg-ll-light py-14 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-ll-text-light font-semibold mb-2">Free</p>
          <h2 className="text-2xl font-bold text-ll-dark mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Listen for free
          </h2>
          <p className="text-sm text-ll-text mb-6">
            The podcast is always free. Some profiles are available as audio essays.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={siteConfig.podcast.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-ll-border text-sm font-medium text-ll-text hover:text-ll-dark hover:border-ll-dark transition-colors"
            >
              Spotify
            </a>
            <a
              href={siteConfig.podcast.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-ll-border text-sm font-medium text-ll-text hover:text-ll-dark hover:border-ll-dark transition-colors"
            >
              Apple Podcasts
            </a>
            <a
              href={siteConfig.podcast.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-ll-border text-sm font-medium text-ll-text hover:text-ll-dark hover:border-ll-dark transition-colors"
            >
              YouTube
            </a>
            <Link
              href="/podcast"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-ll-border text-sm font-medium text-ll-text hover:text-ll-dark hover:border-ll-dark transition-colors"
            >
              All episodes →
            </Link>
          </div>
        </div>
      </section>

      <hr className="border-ll-dark/10" />

      <div className="bg-ll-light py-8 px-6 text-center">
        <p className="text-sm text-ll-text-light">
          Questions?{" "}
          <a
            href="mailto:matt@southernlegends.blog"
            className="text-ll-primary underline underline-offset-3 hover:text-ll-primary-dark transition-colors"
          >
            matt@southernlegends.blog
          </a>
        </p>
      </div>

      <SubscribeCTA variant="section" />
    </main>
  );
}
