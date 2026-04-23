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
        <section className="gradient-hero no-pseudo-topo" style={{ position: "relative" }}>
          <div aria-hidden="true" className="grid-topo" />
          <div className="mx-auto max-w-3xl px-6 py-10 md:py-12" style={{ position: "relative", zIndex: 1 }}>

            {/* Horizontal strip glass card */}
            <div
              className="rounded-xl flex items-center gap-0 overflow-hidden"
              style={{
                background: "rgba(250,250,247,0.12)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(250,250,247,0.2)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
              }}
            >
              {/* Left — journal photo */}
              {featuredJournal.frontmatter.cardImage && (
                <Link
                  href={`/journal/${featuredJournal.slug}`}
                  className="group relative shrink-0 self-stretch overflow-hidden"
                  style={{ width: "9rem" }}
                >
                  <Image
                    src={featuredJournal.frontmatter.cardImage}
                    alt={featuredJournal.frontmatter.cardImageAlt || featuredJournal.frontmatter.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ objectPosition: "center 25%" }}
                    sizes="144px"
                  />
                </Link>
              )}

              {/* Middle — text */}
              <Link href={`/journal/${featuredJournal.slug}`} className="flex-1 min-w-0 px-5 py-4 hover:opacity-80 transition-opacity">
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: "rgba(250,220,150,0.9)", fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  From the Journal
                </p>
                <h2
                  className="text-lg md:text-xl leading-snug mb-1"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 400, fontStyle: "italic", color: "#FAFAF7" }}
                >
                  {featuredJournal.frontmatter.title}
                </h2>
                <p
                  className="text-xs md:text-sm line-clamp-2"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(250,250,247,0.65)", lineHeight: 1.55 }}
                >
                  {featuredJournal.frontmatter.excerpt}
                </p>
              </Link>

              {/* Right — shirt full height */}
              {featuredJournal.frontmatter.merchImage && featuredJournal.frontmatter.merchUrl && (
                <a
                  href={featuredJournal.frontmatter.merchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative shrink-0 self-stretch overflow-hidden transition-opacity hover:opacity-80"
                  style={{ width: "9rem" }}
                >
                  <Image
                    src={featuredJournal.frontmatter.merchImage}
                    alt="I Contain Multitudes shirt"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center center" }}
                    sizes="144px"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(20,16,14,0.75) 0%, transparent 50%)" }}
                  />
                  <p
                    className="absolute bottom-0 left-0 right-0 text-center text-xs pb-3 px-2"
                    style={{ fontFamily: "var(--font-heading)", color: "rgba(250,220,150,0.9)" }}
                  >
                    Support this work &rarr;
                  </p>
                </a>
              )}
            </div>

          </div>
        </section>
      )}

    </main>
  );
}
