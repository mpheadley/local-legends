import type { Metadata } from "next";
import Link from "next/link";
import { getAllProfiles } from "@/lib/profiles";
import { getAllJournalPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Arts — Southern Legends",
  description: "Poetry, music, and theater from the Appalachian foothills of Northeast Alabama.",
  alternates: { canonical: "/arts" },
  openGraph: { url: "/arts" },
};

const ARTS_TAGS = ["poetry", "music", "theater", "arts", "songs", "lyrics", "performance", "theatre"];

export default function ArtsPage() {
  const profiles = getAllProfiles().filter(p =>
    p.frontmatter.tags?.some((t: string) => ARTS_TAGS.includes(t.toLowerCase()))
  );
  const essays = getAllJournalPosts().filter(p =>
    p.frontmatter.tags?.some((t: string) => ARTS_TAGS.includes(t.toLowerCase()))
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-widest text-stone-400 mb-3">Arts</p>
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Poetry, Music & Theater
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
          Northeast Alabama has always made things worth hearing. This is where Southern Legends 
          publishes poems, songs, and stories from the stage — local voices and regional artists 
          from across the Appalachian foothills.
        </p>
      </div>

      {/* Contribute CTA */}
      <div className="bg-amber-50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-lg p-6 mb-12">
        <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">Contribute Your Work</h2>
        <p className="text-stone-600 dark:text-stone-400 mb-4">
          Southern Legends publishes original poetry, song lyrics, and theater pieces from Alabama writers and performers. 
          No payment yet — but your work reaches a real regional audience.
        </p>
        <Link
          href="/nominate"
          className="inline-block bg-amber-700 text-white px-5 py-2 rounded font-medium hover:bg-amber-800 transition"
        >
          Submit Your Work
        </Link>
      </div>

      {/* Sections */}
      <div className="grid gap-8 sm:grid-cols-3 mb-12">
        {[
          { label: "Poetry", tag: "poetry", description: "Poems from NE Alabama and the foothills." },
          { label: "Music", tag: "music", description: "Songs, lyrics, and musicians from the region." },
          { label: "Theater", tag: "theater", description: "Stage work, scripts, and performance notes." },
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

      {/* Articles tagged with arts */}
      {(profiles.length > 0 || essays.length > 0) && (
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">Arts Stories</h2>
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
      )}

      {profiles.length === 0 && essays.length === 0 && (
        <p className="text-stone-400 italic">
          First arts pieces coming soon. Submit your work above.
        </p>
      )}
    </main>
  );
}
