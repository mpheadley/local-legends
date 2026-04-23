import { getAllProfiles, getFeaturedProfiles } from "@/lib/profiles";
import { getJournalPostBySlug } from "@/lib/journal";
import ProfileCardHero from "./components/ProfileCardHero";
import FeaturedTilt from "./components/FeaturedTilt";
import HeroCarousel from "./components/HeroCarousel";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import Image from "next/image";
import SubscribeCTA from "./components/SubscribeCTA";

export default function HomePage() {
  const allProfiles = getAllProfiles();
  const featuredProfiles = getFeaturedProfiles();
  const featuredJournal = getJournalPostBySlug("no-shade");
  const gridProfiles = [
    ...allProfiles.filter((p) => !p.frontmatter.featured),
    ...allProfiles.filter((p) => p.frontmatter.featured),
  ];

  const featuredCards = featuredProfiles.map((p) => ({
    slug: p.slug,
    name: p.frontmatter.name,
    title: p.frontmatter.title,
    titleHtml: p.frontmatter.titleHtml,
    cardTitle: p.frontmatter.cardTitle,
    cardTitleHtml: p.frontmatter.cardTitleHtml,
    cardFont: p.frontmatter.cardFont,
    cardTitleColor: p.frontmatter.cardTitleColor,
    cardFontSize: p.frontmatter.cardFontSize,
    subtitle: p.frontmatter.subtitle,
    excerpt: p.frontmatter.excerpt,
    location: p.frontmatter.location,
    category: p.frontmatter.category,
    heroImage: p.frontmatter.heroImage,
    heroAlt: p.frontmatter.heroAlt,
    heroPosition: p.frontmatter.heroPosition,
  }));

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: "https://headleyweb.com",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo.webp`,
      },
      sameAs: ["https://www.facebook.com/SouthernLegendsAL"],
    },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ─── Featured Stories: 3D tilt on desktop, carousel on mobile ─── */}
      <div className="hidden sm:block">
        <FeaturedTilt cards={featuredCards} />
      </div>
      <section className="sm:hidden relative overflow-hidden" style={{ backgroundColor: "#292524" }}>
        <HeroCarousel profiles={featuredProfiles} />
      </section>

      {/* ─── Stories Grid ─── */}
      <section className="gradient-hero no-pseudo-topo" style={{ position: "relative" }}>
        <div aria-hidden="true" className="grid-topo" />
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28" style={{ position: "relative", zIndex: 1 }}>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                More Stories
              </h2>
              <p className="mt-2 text-white/60">
                Meet the people behind the businesses, shops, and traditions that
                make this region what it is.
              </p>
            </div>
            {allProfiles.length > 3 && (
              <Link
                href="/profiles"
                className="hidden sm:inline-flex text-sm font-semibold text-ll-accent hover:opacity-80 transition-opacity"
              >
                View all &rarr;
              </Link>
            )}
          </div>

          {gridProfiles.length === 0 ? (
            <p className="text-white/60">More stories coming soon.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {gridProfiles.map((profile, i) => (
                <div
                  key={profile.slug}
                  className="animate-on-scroll"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <ProfileCardHero profile={profile} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Journal Teaser ─── */}
      {featuredJournal && (
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">

          {/* Full-width image card with text overlay */}
          <Link
            href={`/journal/${featuredJournal.slug}`}
            className="group block relative overflow-hidden rounded-sm mx-auto max-w-2xl"
            style={{ aspectRatio: "16 / 9" }}
          >
            {featuredJournal.frontmatter.cardImage && (
              <Image
                src={featuredJournal.frontmatter.cardImage}
                alt={featuredJournal.frontmatter.cardImageAlt || featuredJournal.frontmatter.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ objectPosition: "center center" }}
                sizes="(max-width: 640px) 100vw, 1152px"
              />
            )}
            {/* Gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(20,16,14,0.92) 0%, rgba(20,16,14,0.55) 40%, rgba(20,16,14,0.1) 70%, transparent 100%)" }}
            />
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 md:px-10 md:pb-10">
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "var(--color-ll-accent)", fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                From the Journal
              </p>
              <h2
                className="text-3xl md:text-5xl mb-3 leading-tight"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontStyle: "italic", color: "#FAFAF7" }}
              >
                {featuredJournal.frontmatter.title}
              </h2>
              <p
                className="text-sm md:text-base max-w-xl"
                style={{ fontFamily: "var(--font-body)", color: "rgba(250,250,247,0.75)", lineHeight: 1.65 }}
              >
                {featuredJournal.frontmatter.excerpt}
              </p>
            </div>
          </Link>

          {/* Merch card below — centered */}
          {featuredJournal.frontmatter.merchImage && featuredJournal.frontmatter.merchUrl && (
            <div className="mt-4 flex justify-center">
              <a
                href={featuredJournal.frontmatter.merchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-opacity hover:opacity-75 mx-auto"
              >
                <div className="relative shrink-0 rounded-sm overflow-hidden" style={{ width: "3rem", height: "3rem" }}>
                  <Image
                    src={featuredJournal.frontmatter.merchImage}
                    alt="I Contain Multitudes shirt"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ fontFamily: "var(--font-heading)", color: "rgba(250,250,247,0.9)" }}>I Contain Multitudes</p>
                  <p className="text-xs" style={{ fontFamily: "var(--font-heading)", color: "var(--color-ll-accent)" }}>Support this work &rarr;</p>
                </div>
              </a>
            </div>
          )}

        </section>
      )}

    </main>
  );
}
