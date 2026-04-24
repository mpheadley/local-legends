import type { Metadata } from "next";
import Link from "next/link";
import { getAllJournalPosts } from "@/lib/journal";
import { siteConfig } from "@/lib/site-config";
import SubscribeCTA from "@/app/components/SubscribeCTA";

export const metadata: Metadata = {
  title: "Journal",
  description: `Matt Headley writes about what's behind the profiles — and what's behind him.`,
  alternates: { canonical: "/journal" },
  openGraph: { url: "/journal" },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function JournalPage() {
  const posts = getAllJournalPosts();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${siteConfig.url}/journal` },
    ],
  };

  return (
    <main id="main-content" style={{ backgroundColor: "#F0EDE6" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <div className="mx-auto max-w-2xl px-6 pt-28 pb-6 md:pt-36 md:pb-8">
        <p style={{
          fontFamily: "var(--font-source-sans)",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-ll-accent)",
          marginBottom: "1rem",
        }}>
          Personal writing
        </p>
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
          fontWeight: 400,
          lineHeight: 1.0,
          color: "var(--color-ll-dark)",
          fontVariationSettings: '"opsz" 72',
        }}>
          Journal
        </h1>
        <p style={{
          marginTop: "1.25rem",
          fontFamily: "var(--font-body)",
          fontSize: "1.0625rem",
          lineHeight: 1.65,
          color: "#5C534A",
          maxWidth: "32rem",
        }}>
          I write about what&apos;s behind the profiles. And what&apos;s behind me.
        </p>
      </div>

      {/* Ruled divider */}
      <div className="mx-auto max-w-2xl px-6">
        <div style={{ height: "1px", backgroundColor: "var(--color-ll-border)" }} />
      </div>

      {/* Post list */}
      <div className="mx-auto max-w-2xl px-6 py-12 md:py-16">
        {posts.length === 0 ? (
          <p style={{ color: "#9C8E84", fontSize: "0.875rem" }}>Coming soon.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {posts.map((post, i) => (
              <li
                key={post.slug}
                style={{
                  borderBottom: i < posts.length - 1 ? "1px solid var(--color-ll-border)" : "none",
                  paddingBottom: i < posts.length - 1 ? "2.5rem" : 0,
                  marginBottom: i < posts.length - 1 ? "2.5rem" : 0,
                }}
              >
                <Link href={`/journal/${post.slug}`} className="group block">
                  <p style={{
                    fontFamily: "var(--font-source-sans)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#9C8E84",
                    marginBottom: "0.6rem",
                  }}>
                    {formatDate(post.frontmatter.date)}
                    {" "}&middot;{" "}{post.readingTime}
                    {post.frontmatter.originalPublication && (
                      <> &middot; {post.frontmatter.originalPublication.name}</>
                    )}
                  </p>
                  <h2 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    color: "var(--color-ll-dark)",
                    marginBottom: "0.75rem",
                    fontVariationSettings: '"opsz" 36',
                    transition: "color 0.15s",
                  }}
                  className="group-hover:text-ll-primary"
                  >
                    {post.frontmatter.title}
                  </h2>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.65,
                    color: "#5C534A",
                  }}>
                    {post.frontmatter.excerpt}
                  </p>
                  <span style={{
                    display: "inline-block",
                    marginTop: "1rem",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--color-ll-primary)",
                    fontFamily: "var(--font-source-sans)",
                  }}
                  className="group-hover:underline"
                  >
                    Read →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <SubscribeCTA />
    </main>
  );
}
