import type { Metadata } from "next";
import Link from "next/link";
import { getAllProfiles } from "@/lib/profiles";
import { getAllJournalPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "The Land — Southern Legends",
  description: "Farming, gardening, and homesteading stories from Northeast Alabama.",
  alternates: { canonical: "/land" },
  openGraph: { url: "/land" },
};

const LAND_TAGS = ["farming", "farm", "garden", "gardening", "homestead", "homesteading", "agriculture", "land", "flowers", "market"];

export default function LandPage() {
  const profiles = getAllProfiles().filter(p =>
    p.frontmatter.tags?.some((t: string) => LAND_TAGS.includes(t.toLowerCase()))
  );
  const essays = getAllJournalPosts().filter(p =>
    p.frontmatter.tags?.some((t: string) => LAND_TAGS.includes(t.toLowerCase()))
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-widest text-stone-400 mb-3">The Land</p>
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Farming, Gardening & Homesteading
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
          Northeast Alabama has always worked the land. This section covers the farmers, 
          gardeners, and homesteaders of the Appalachian foothills — the people who grow 
          things, raise things, and build a life from the ground up.
        </p>
      </div>

      {/* Subsections */}
      <div className="grid gap-6 sm:grid-cols-3 mb-12">
        {[
          { label: "Farms & Markets", tag: "farming", description: "Producers and market vendors across the region." },
          { label: "Gardening", tag: "gardening", description: "What grows here and how people tend it." },
          { label: "Homesteading", tag: "homesteading", description: "Building a self-sufficient life on Alabama land." },
        ].map(({ label, tag, description }) => (
          <div key={tag} className="border border-stone-200 dark:border-stone-700 rounded-lg p-5">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">{label}</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">{description}</p>
            <Link
              href={`/profiles?tag=${tag}`}
              className="text-sm text-amber-700 dark:text-amber-400 hover:underline"
            >
              Browse {label.toLowerCase()} →
            </Link>
          </div>
        ))}
      </div>

      {/* Stories */}
      {(profiles.length > 0 || essays.length > 0) ? (
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">Land Stories</h2>
          <div className="space-y-4">
            {profiles.map(p => (
              <article key={p.slug} className="border-b border-stone-100 dark:border-stone-800 pb-4">
                <Link href={`/profiles/${p.slug}`} className="group">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                    {p.frontmatter.title}
                  </h3>
                  {p.frontmatter.excerpt && (
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{p.frontmatter.excerpt}</p>
                  )}
                </Link>
              </article>
            ))}
            {essays.map(p => (
              <article key={p.slug} className="border-b border-stone-100 dark:border-stone-800 pb-4">
                <Link href={`/essays/${p.slug}`} className="group">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                    {p.frontmatter.title}
                  </h3>
                  {p.frontmatter.excerpt && (
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{p.frontmatter.excerpt}</p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-stone-50 dark:bg-stone-800 rounded-lg p-8 text-center">
          <p className="text-stone-500 dark:text-stone-400 mb-4">
            First land profiles coming soon. Know a farmer, gardener, or homesteader worth featuring?
          </p>
          <Link
            href="/nominate"
            className="inline-block bg-amber-700 text-white px-5 py-2 rounded font-medium hover:bg-amber-800 transition"
          >
            Nominate Someone
          </Link>
        </div>
      )}
    </main>
  );
}
