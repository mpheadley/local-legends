import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { getAllJournalPosts } from "@/lib/journal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Podcast — Southern Legends",
  description: "Stories from the Appalachian foothills of Northeast Alabama. Listen on Spotify, Apple Podcasts, or YouTube.",
  alternates: { canonical: "/podcast" },
  openGraph: { url: "/podcast" },
};

const PLATFORMS = [
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/033rE2IJkbyZuLXZwEjtgo",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: "Apple Podcasts",
    href: "https://podcasts.apple.com/podcast/id1896892029",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c2.071 0 3.938.8 5.324 2.1a7.456 7.456 0 0 1 2.176 5.303c0 1.758-.61 3.373-1.622 4.645a7.435 7.435 0 0 1-1.757 1.654c.044-.225.069-.457.069-.695 0-1.99-1.614-3.604-3.604-3.604s-3.604 1.614-3.604 3.604c0 .238.025.47.069.695a7.435 7.435 0 0 1-1.757-1.654A7.43 7.43 0 0 1 5.5 11.903c0-2.07.84-3.945 2.199-5.315A7.458 7.458 0 0 1 12 4.5zm0 2.625a4.778 4.778 0 1 0 0 9.557 4.778 4.778 0 0 0 0-9.557zm0 1.875a2.903 2.903 0 1 1 0 5.807 2.903 2.903 0 0 1 0-5.807z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@mpheadley",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    name: "RSS",
    href: `${siteConfig.url}/podcast.xml`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
      </svg>
    ),
  },
];

export default function PodcastPage() {
  const episodes = getAllJournalPosts().filter(
    (p) => p.frontmatter.audioUrl || p.frontmatter.videoUrl
  );

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="gradient-hero relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-[1]" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 pt-28 pb-16 md:pt-32 md:pb-20">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-ll-accent mb-4">
            Podcast
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Southern Legends
          </h1>
          <p className="mt-4 text-lg text-white/75 leading-relaxed">
            Stories from the Appalachian foothills of Northeast Alabama — on faith, community, small business, and what it means to build a life in a place people overlook.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {PLATFORMS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-colors"
              >
                {p.icon}
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="bg-ll-light py-14 md:py-18">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-xl font-bold text-ll-dark mb-10"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Episodes
          </h2>
          {episodes.length === 0 ? (
            <p className="text-ll-text-light">No episodes yet.</p>
          ) : (
            <div className="space-y-8">
              {episodes.map((ep) => (
                <Link
                  key={ep.slug}
                  href={`/essays/${ep.slug}`}
                  className="group block border-b border-ll-border pb-8 last:border-0"
                >
                  <p className="text-xs font-semibold tracking-widest uppercase text-ll-text-light mb-2">
                    {new Date(ep.frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    {ep.frontmatter.audioDuration && ` · ${ep.frontmatter.audioDuration}`}
                  </p>
                  <h3
                    className="text-xl font-bold text-ll-dark group-hover:text-ll-primary transition-colors mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {ep.frontmatter.title}
                  </h3>
                  <p className="text-ll-text leading-relaxed text-sm">
                    {(ep.frontmatter as unknown as {description?:string}).description ?? ep.frontmatter.excerpt ?? ep.frontmatter.subtitle}
                  </p>
                  <span className="inline-block mt-3 text-sm font-medium text-ll-primary group-hover:underline">
                    Listen →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
