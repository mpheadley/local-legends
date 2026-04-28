import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { existsSync } from "fs";
import { join } from "path";
import {
  getProfileBySlug,
  getPublishedSlugs,
  getAdjacentProfiles,
  getAllProfiles,
} from "@/lib/profiles";
import { siteConfig } from "@/lib/site-config";
import { notFound } from "next/navigation";
import ArticleImage from "@/app/components/ArticleImage";
import InlineImage from "@/app/components/InlineImage";
import PhotoCarouselLoader from "@/app/components/PhotoCarouselLoader";
import PullQuote from "@/app/components/PullQuote";
import VideoLoop from "@/app/components/VideoLoop";
import ShareButtons from "@/app/components/ShareButtons";
import ScrollytellingProfile from "@/app/components/ScrollytellingProfile";
import ParallaxHero from "@/app/components/ParallaxHero";
import SubscribeCTA from "@/app/components/SubscribeCTA";
import Comments from "@/app/components/Comments";
import ReadingProgressBar from "@/app/components/ReadingProgressBar";
import ProfileCardHero from "@/app/components/ProfileCardHero";
import { scrollytellingConfigs } from "@/lib/scrollytelling-configs";

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => {
    const id =
      typeof props.children === "string"
        ? props.children
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
        : undefined;
    return (
      <h2
        id={id}
        className="text-2xl md:text-3xl font-bold mt-12 mb-4 scroll-mt-24"
        style={{ fontFamily: "var(--font-heading)" }}
        {...props}
      />
    );
  },
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="text-xl md:text-2xl font-bold mt-10 mb-3"
      style={{ fontFamily: "var(--font-heading)" }}
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-ll-text leading-relaxed mb-6" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="text-ll-primary font-medium underline underline-offset-3 hover:text-ll-primary-dark transition-colors"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className="list-disc list-inside space-y-2 mb-6 text-ll-text"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="list-decimal list-inside space-y-2 mb-6 text-ll-text"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-ll-accent pl-6 py-2 my-8 bg-ll-warm rounded-r-lg italic text-ll-text"
      {...props}
    />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-bold text-ll-dark" {...props} />
  ),
  hr: () => <hr className="my-10 border-t border-ll-border" />,
  ArticleImage,
  InlineImage,
  PhotoCarousel: PhotoCarouselLoader,
  PullQuote,
  VideoLoop,
};

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) return {};
  // AI-written drafts are not publishable — return empty metadata so nothing leaks.
  if (profile.frontmatter.aiWritten) return {};

  const { title, excerpt, metaDescription, name, location, tags } =
    profile.frontmatter;

  const seoDescription = metaDescription ?? excerpt;

  return {
    title: `${name} — ${location}`,
    description: seoDescription,
    alternates: {
      canonical: `/profiles/${slug}`,
    },
    keywords: tags,
    openGraph: {
      url: `/profiles/${slug}`,
      title,
      description: seoDescription,
      type: "article",
      publishedTime: profile.frontmatter.date,
      ...(profile.frontmatter.lastModified && {
        modifiedTime: profile.frontmatter.lastModified,
      }),
      tags,
      ...(existsSync(join(process.cwd(), `public/images/social/${slug}-og.png`)) && {
        images: [`/images/social/${slug}-og.png`],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seoDescription,
      ...(existsSync(join(process.cwd(), `public/images/social/${slug}-og.png`)) && {
        images: [`/images/social/${slug}-og.png`],
      }),
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ProfilePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) notFound();
  // published: false profiles intentionally render at their direct URL — this is the preview
  // workflow for sharing a draft with a profile subject before it appears in any listings.
  // They are excluded from the grid, RSS, sitemap, and search. Only someone with the exact
  // slug can reach them. Do NOT add a notFound() check here for published: false.
  // AI-written drafts are not publishable — 404 at runtime even on direct URL visits.
  if (profile.frontmatter.aiWritten) notFound();

  const { frontmatter, content, readingTime } = profile;
  const { prev, next } = getAdjacentProfiles(slug);
  const scrollyConfig = scrollytellingConfigs[slug];

  const profileTags = frontmatter.tags ?? [];
  const others = getAllProfiles().filter((p) => p.slug !== slug);
  const tagMatched = others
    .map((p) => ({ profile: p, shared: (p.frontmatter.tags ?? []).filter((t) => profileTags.includes(t)).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .map(({ profile }) => profile);
  const tagMatchedSlugs = new Set(tagMatched.map((p) => p.slug));
  const rest = others.filter((p) => !tagMatchedSlugs.has(p.slug));
  const related = [...tagMatched, ...rest].slice(0, 3);

  // If a scrollytelling config exists, render the immersive layout
  if (scrollyConfig) {
    return (
      <main id="main-content">
        <ScrollytellingProfile config={scrollyConfig} />
      </main>
    );
  }

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
      {
        "@type": "ListItem",
        position: 3,
        name: frontmatter.name,
        item: `${siteConfig.url}/profiles/${slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    datePublished: frontmatter.date,
    ...(frontmatter.lastModified && {
      dateModified: frontmatter.lastModified,
    }),
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
    },
    mainEntityOfPage: `${siteConfig.url}/profiles/${slug}`,
    ...(frontmatter.heroImage && {
      image: frontmatter.heroImage,
    }),
    ...(frontmatter.subtitle && {
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ".subtitle",
      },
    }),
    about: {
      "@type": "Person",
      name: frontmatter.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: frontmatter.location.split(",")[0]?.trim(),
        addressRegion: "AL",
      },
    },
  };

  return (
    <main id="main-content">
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, articleSchema]),
        }}
      />

      {/* Hero — parallax by default, opt out with parallaxHero: false */}
      {frontmatter.parallaxHero !== false && frontmatter.heroImage ? (
        <ParallaxHero
          title={frontmatter.title}
          titleHtml={frontmatter.titleHtml}
          subtitle={frontmatter.subtitle}
          eyebrow={`${frontmatter.name} — ${frontmatter.location}`}
          heroImage={frontmatter.heroImage}
          heroAlt={frontmatter.heroAlt || frontmatter.name}
          heroPosition={frontmatter.heroPosition}
          heroTextBottom={frontmatter.heroTextBottom}
          heroFontSize={frontmatter.heroFontSize}
          displayTitle={frontmatter.displayTitle}
          cardFont={frontmatter.cardFont}
          slug={slug}
        />
      ) : (
        <section
          className={`relative text-white overflow-hidden ${frontmatter.heroImage ? "" : "gradient-hero"}`}
          style={{ ...(frontmatter.heroImage ? { background: "var(--color-ll-dark)" } : {}), viewTransitionName: `profile-hero-${slug}` } as React.CSSProperties}
        >
          {frontmatter.heroImage ? (
            <>
              <Image
                src={frontmatter.heroImage}
                alt={frontmatter.heroAlt || frontmatter.name}
                fill
                priority
                className="object-cover"
                sizes="100vw"
                style={frontmatter.heroPosition ? { objectPosition: frontmatter.heroPosition } : undefined}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ll-dark/95 via-ll-dark/60 to-ll-dark/25"
                style={{ zIndex: 1 }}
              />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-black/50 z-[1]" aria-hidden="true" />
              <span className="ghost-initial" aria-hidden="true">
                {frontmatter.name.charAt(0)}
              </span>
            </>
          )}

          <div className="relative max-w-3xl mx-auto px-6 pt-28 pb-14 md:pt-32 md:pb-18"
            style={{ zIndex: 2 }}
          >
            <Link
              href="/profiles"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ll-accent hover:text-ll-accent-dark transition-colors mb-8"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              All Stories
            </Link>

            {frontmatter.titleHtml ? (
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white${frontmatter.displayTitle ? " profile-title-display" : ""}`}
                style={{ fontFamily: "var(--font-heading)" }}
                dangerouslySetInnerHTML={{ __html: frontmatter.titleHtml }}
              />
            ) : (
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white${frontmatter.displayTitle ? " profile-title-display" : ""}`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {frontmatter.title}
              </h1>
            )}

            {frontmatter.name && frontmatter.name !== frontmatter.title && (
              <p className="mt-4 text-sm md:text-base font-medium tracking-wide text-ll-accent uppercase"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
              >
                {frontmatter.name}
              </p>
            )}

            {frontmatter.subtitle && (
              <p
                className="mt-4 text-base md:text-lg leading-relaxed text-white/75 max-w-2xl"
                data-speakable="true"
              >
                {frontmatter.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-white/60">
              <span>By {siteConfig.author}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{frontmatter.location}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{formatDate(frontmatter.date)}</span>
              {frontmatter.lastModified &&
                frontmatter.lastModified !== frontmatter.date && (
                  <>
                    <span aria-hidden="true">&middot;</span>
                    <span>Updated {formatDate(frontmatter.lastModified)}</span>
                  </>
                )}
            </div>

          </div>
        </section>
      )}

      {/* Mobile deck — subtitle below hero, visible on mobile only */}
      {frontmatter.parallaxHero !== false && frontmatter.heroImage && frontmatter.subtitle && (
        <div className="sm:hidden bg-ll-light px-6 pt-6 pb-2">
          <p
            className="max-w-3xl mx-auto text-base italic leading-relaxed"
            style={{ color: "var(--color-ll-text)", fontFamily: "var(--font-heading)", fontWeight: 300 }}
          >
            {frontmatter.subtitle}
          </p>
        </div>
      )}

      {/* Hero Caption */}
      {(frontmatter.heroCaption || frontmatter.heroCaptionHtml) && (
        <div className="bg-ll-light border-b border-ll-border">
          {frontmatter.heroCaptionHtml ? (
            <p className="max-w-3xl mx-auto px-6 py-3 text-xs text-ll-text-light italic text-right"
              dangerouslySetInnerHTML={{ __html: frontmatter.heroCaptionHtml }}
            />
          ) : (
            <p className="max-w-3xl mx-auto px-6 py-3 text-xs text-ll-text-light italic text-right">
              {frontmatter.heroCaption}
            </p>
          )}
        </div>
      )}

      {/* Article Content */}
      <article className="bg-ll-light">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16 prose-profile">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </article>

      <Comments slug={slug} />

      {/* Closing — author credit, share, tags on dark topo/gradient */}
      <section className="profile-closing">
        {/* Author credit */}
        <div className="profile-closing-author">
          <Image
            src="/images/about/headshot-hedcut-matt-headley.webp"
            alt="Matt Headley"
            width={128}
            height={128}
            className="rounded-full shrink-0"
            style={{ width: "128px", height: "128px" }}
          />
          <div>
            <p className="profile-closing-bio">
              <Link href="/about" className="profile-closing-name">
                Matt Headley
              </Link>{" "}
              is a former pastor, flower farmer, and classically trained singer from Northeast Alabama. His work has appeared in the{" "}
              <Link href="/essays/hope-in-the-wilderness" className="profile-closing-link">
                Anniston Star
              </Link>
              . He writes personal essays on mental health, faith, and farming. He builds websites for small businesses at{" "}
              <a href="https://headleyweb.com" target="_blank" rel="noopener noreferrer" className="profile-closing-link">
                headleyweb.com
              </a>
              .
            </p>
            <div className="mt-3">
              <Link
                href="/essays"
                className="btn-journal inline-block px-5 py-2 border-2 border-ll-accent font-bold text-sm rounded-md hover:bg-ll-accent transition-colors"
              >
                Matt also writes about his own story →
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="profile-closing-divider" />

        {/* Share + Support */}
        <div className="profile-closing-share">
          <ShareButtons
            url={`/profiles/${slug}`}
            title={frontmatter.title}
            description={frontmatter.excerpt}
          />

          {/* Merch */}
          {(() => {
            const ICM_URL = "https://matt-headley-shop.fourthwall.com/products/i-contain-multitudes";
            const ICM_IMAGE = "https://imgproxy.fourthwall.dev/IMNy3eu4RC0MEIbGmpUUg-5yMjSRyFtKLGn1Mjh5S84/w:1920/sm:1/enc/ZedkaYftBaqinaIZ/Jr40_xy3Eb4tySwk/rScelYdmKxyZS6jZ/NJHeSvZlktqX-xYh/WSHRJ-RhgMHeSlMQ/27Iq7L_pckKRXOOp/v5oIB6B1Vnyt8g_D/jmvq7ZBuLrTpLBdn/gKhmeo_IvtrJEkf4/Yfl8j3qjiOOsC3F3/Z2VGxXEwJGMrAnzQ/2Xzk5fe0iRKeZTw2/UCV0r3RWKam0aN3r/8xpuJ8LPfqX3Axj4/fUq1cLuAVw8.jpg";
            const SH_URL = "https://matt-headley-shop.fourthwall.com/products/still-here";
            const SH_IMAGE = "https://imgproxy.fourthwall.com/FyWryySt9e8_rzT3yE6eItoqF6GstCkbBJSuL62LpoY/w:1920/sm:1/enc/kZytLUESOJY7WIq3/mQmU8CAxU0TQJrD2/LFh8Y-uqr4QKxZUr/-r3HZV9rDnJj-a9U/SY5J9AEtq4g5o7L3/JwKTj1OyPau1R0tC/tTw60OgXWBZkD6Hu/wWE8ibGTgAZsKMsY/WTotCATD8-xnovcw/FEwNfv2JgknjHnf0/ug0yHPZ7pcf3JZ2i/bZ0phQZB_NTgL9ld/E3bYmALpumGY4hCG/Su9KSvpN3h6FOoRK/dNXM-cTSQcw";
            const SHIRT_NAMES: Record<string, string> = {
              [ICM_URL]: "I Contain Multitudes",
              [SH_URL]: "Still Here",
              "https://matt-headley-shop.fourthwall.com/products/bipolar-proud": "Bipolar & Proud",
              "https://matt-headley-shop.fourthwall.com/products/chief-ladiga-trail": "Ladiga's Land",
            };
            const primaryUrl = (frontmatter as Record<string, string>).merchUrl ?? ICM_URL;
            const primaryImage = (frontmatter as Record<string, string>).merchImage ?? ICM_IMAGE;
            const isICMPrimary = primaryUrl === ICM_URL;
            const secondUrl = isICMPrimary ? SH_URL : ICM_URL;
            const secondImage = isICMPrimary ? SH_IMAGE : ICM_IMAGE;
            const primaryName = SHIRT_NAMES[primaryUrl] ?? "";
            const secondName = SHIRT_NAMES[secondUrl] ?? "";
            return (
              <div className="flex gap-8 justify-center items-start mt-8">
                <div className="flex flex-col items-center gap-3">
                  <a href={primaryUrl} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={primaryImage}
                      alt={primaryName || "Merch"}
                      width={140}
                      height={140}
                      className="rounded hover:opacity-90 transition-opacity"
                    />
                  </a>
                  {primaryName && (
                    <span className="text-xs text-ll-text-light">{primaryName}</span>
                  )}
                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium border border-ll-border px-4 py-2 hover:bg-ll-warm transition-colors"
                  >
                    Get the shirt →
                  </a>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <a href={secondUrl} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={secondImage}
                      alt={secondName}
                      width={140}
                      height={140}
                      className="rounded hover:opacity-90 transition-opacity"
                    />
                  </a>
                  {secondName && (
                    <span className="text-xs text-ll-text-light">{secondName}</span>
                  )}
                  <a
                    href={secondUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium border border-ll-border px-4 py-2 hover:bg-ll-warm transition-colors"
                  >
                    Get the shirt →
                  </a>
                </div>
              </div>
            );
          })()}

          <Link
            href="/support"
            className="btn-support inline-block mt-4 px-7 py-3 bg-ll-primary font-bold text-sm rounded-md hover:bg-ll-primary-dark transition-colors"
          >
            Support this work →
          </Link>
        </div>

      </section>

      {/* Related Stories by tag */}
      {related.length > 0 && (
        <section className="bg-ll-warm border-t border-ll-border py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2
              className="text-sm font-semibold uppercase tracking-[0.15em] text-ll-text-light mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              More Stories
            </h2>
            <div className={`grid gap-8 ${related.length === 1 ? "max-w-sm" : related.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {related.map((p) => (
                <ProfileCardHero key={p.slug} profile={p} />
              ))}
            </div>
            {/* Journal aside */}
            <div className="mt-10 pt-6 border-t border-ll-border text-center">
              <Link
                href="/essays/no-shade"
                className="text-sm hover:text-ll-primary transition-colors"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-ll-text-light)" }}
              >
                Meanwhile in the journal: <em>No Shade</em> →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Subscribe */}
      <SubscribeCTA />

    </main>
  );
}
