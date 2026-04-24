import { getAllProfiles, getAllTags } from "@/lib/profiles";
import ProfileCardHero from "../components/ProfileCardHero";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Stories",
  description:
    "Browse all Southern Legends profiles — craftspeople, musicians, business owners, and community figures.",
  alternates: {
    canonical: "/profiles",
    types: {
      "application/rss+xml": "/profiles/feed.xml",
    },
  },
  openGraph: {
    url: "/profiles",
  },
};

type SearchParams = Promise<{ tag?: string }>;

export default async function ProfilesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { tag } = await searchParams;
  const allProfiles = getAllProfiles();
  const allTags = getAllTags();

  const profiles = tag
    ? allProfiles.filter((p) => p.frontmatter.tags?.includes(tag))
    : allProfiles;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Stories",
        item: `${siteConfig.url}/profiles`,
      },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="gradient-hero no-pseudo-topo" style={{ position: "relative" }}>
        <div aria-hidden="true" className="grid-topo" />

        {/* Header */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-10 md:pt-36 md:pb-12">
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 400,
              lineHeight: 1.0,
              color: "#FAFAF7",
              fontVariationSettings: '"opsz" 72',
            }}
          >
            {tag ? `Stories tagged "${tag}"` : "All Stories"}
          </h1>
          {!tag && (
            <p className="mt-5 text-base md:text-lg max-w-xl leading-relaxed" style={{ color: "rgba(250,250,247,0.65)" }}>
              I sit down with people in Northeast Alabama. Business owners, mostly. I ask how they got here and write it with enough room to actually tell the story.
            </p>
          )}
          <p className="mt-3 text-sm" style={{ color: "rgba(250,250,247,0.4)" }}>
            {profiles.length} {profiles.length === 1 ? "story" : "stories"}
            {tag ? ` tagged "${tag}"` : ""} and counting.
          </p>
        </div>

        {/* Grid */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
          {profiles.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {profiles.map((profile, i) => (
                <div
                  key={profile.slug}
                  className="animate-on-scroll"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <ProfileCardHero profile={profile} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/60 py-12">
              No stories found{tag ? ` for "${tag}"` : ""}. Check back soon.
            </p>
          )}

          {/* Tag filters */}
          {allTags.length > 1 && (
            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 mb-4">
                Filter by tag
              </p>
              <div className="flex flex-wrap gap-2">
                {tag && (
                  <Link
                    href="/profiles"
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-ll-dark text-white hover:bg-ll-text transition-colors"
                  >
                    Clear filter
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Link>
                )}
                {allTags.map((t) => (
                  <Link
                    key={t}
                    href={`/profiles?tag=${encodeURIComponent(t)}`}
                    className={`category-tag transition-opacity ${
                      tag === t ? "opacity-100 ring-2 ring-ll-accent" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Nominate */}
      <section className="bg-ll-light border-t border-ll-border py-12 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2
            className="text-xl font-bold text-ll-dark mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Know Someone Worth Writing About?
          </h2>
          <p className="text-sm text-ll-text mb-6 max-w-sm mx-auto">
            If you know a person or a place whose story deserves to be told, I&apos;d like to hear about it.
          </p>
          <Link
            href="/nominate"
            className="btn-primary inline-block px-7 py-3 bg-ll-primary text-white font-bold text-sm rounded-md hover:bg-ll-primary-dark"
          >
            Nominate a Story →
          </Link>
        </div>
      </section>

    </main>
  );
}
