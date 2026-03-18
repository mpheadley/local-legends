import { getAllProfiles, getFeaturedProfile } from "@/lib/profiles";
import ProfileCard from "./components/ProfileCard";
import { siteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const allProfiles = getAllProfiles();
  const featured = getFeaturedProfile();

  // Exclude featured from the grid
  const gridProfiles = featured
    ? allProfiles.filter((p) => p.slug !== featured.slug)
    : allProfiles;

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
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ─── Featured Story Hero ─── */}
      <section className="relative overflow-hidden gradient-hero">
        {/* Dark scrim over text side for legibility */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent z-[1]" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-24 md:pb-16" style={{ zIndex: 2 }}>
          {featured ? (
            <Link
              href={`/profiles/${featured.slug}`}
              className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Image side */}
              <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden rounded-sm">
                {featured.frontmatter.heroImage ? (
                  <Image
                    src={featured.frontmatter.heroImage}
                    alt={featured.frontmatter.heroAlt || featured.frontmatter.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  /* No-image fallback: oversized Fraunces letter */
                  <div className="w-full h-full bg-ll-dark flex items-center justify-center">
                    <span
                      className="text-white/[0.06] select-none"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(14rem, 30vw, 28rem)",
                        fontWeight: 900,
                        lineHeight: 0.85,
                      }}
                      aria-hidden="true"
                    >
                      {featured.frontmatter.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Text side */}
              <div className="flex flex-col justify-center">
                {featured.frontmatter.titleHtml ? (
                  <h1
                    className="text-white font-bold tracking-tight leading-[0.9] hero-headline-lg uppercase"
                    style={{ fontFamily: "var(--font-heading)" }}
                    dangerouslySetInnerHTML={{ __html: featured.frontmatter.titleHtml }}
                  />
                ) : (
                  <h1
                    className="text-white font-bold tracking-tight leading-[0.9] hero-headline-lg uppercase"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {featured.frontmatter.title}
                  </h1>
                )}
                {featured.frontmatter.subtitle && (
                  <p
                    className="mt-5 text-white/70 text-sm md:text-base italic leading-relaxed max-w-md"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                  >
                    {featured.frontmatter.subtitle}
                  </p>
                )}
                <div className="mt-6 w-12 h-[2px] bg-white/30" aria-hidden="true" />
                <div className="mt-6 flex items-center gap-3 text-xs text-white/50 uppercase tracking-widest">
                  <span>{featured.frontmatter.name}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{featured.frontmatter.location}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{featured.readingTime}</span>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ll-accent group-hover:gap-3 transition-all duration-300">
                  Read the story
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </div>
            </Link>
          ) : (
            /* No stories yet — site name hero */
            <div className="text-center py-12">
              <h1
                className="text-white font-bold tracking-tight hero-headline"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {siteConfig.name}
              </h1>
              <p
                className="mt-4 text-white/50 text-lg max-w-lg mx-auto"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
              >
                {siteConfig.tagline}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Stories Grid ─── */}
      <section className="bg-ll-light">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-ll-dark tracking-tight animate-on-scroll"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {gridProfiles.length > 0 ? "More Stories" : "Stories"}
              </h2>
              <p className="mt-2 text-ll-text-light animate-on-scroll">
                Meet the people behind the businesses, shops, and traditions that
                make this region what it is.
              </p>
            </div>
            {allProfiles.length > 3 && (
              <Link
                href="/profiles"
                className="hidden sm:inline-flex text-sm font-semibold text-ll-primary hover:text-ll-primary-dark transition-colors animate-on-scroll"
              >
                View all &rarr;
              </Link>
            )}
          </div>

          {gridProfiles.length === 0 && !featured ? (
            <p className="text-ll-text-light">
              No stories yet. Check back soon.
            </p>
          ) : gridProfiles.length === 0 && featured ? (
            <p className="text-ll-text-light">
              More stories coming soon.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {gridProfiles.map((profile, i) => (
                <div
                  key={profile.slug}
                  className="animate-on-scroll"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <ProfileCard profile={profile} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
