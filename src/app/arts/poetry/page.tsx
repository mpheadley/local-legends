import type { Metadata } from "next";
import Link from "next/link";
import { getAllProfiles } from "@/lib/profiles";
import { getAllJournalPosts } from "@/lib/journal";
import SectionLinks from "@/app/components/SectionLinks";
import ShareRow from "@/app/components/ShareRow";

export const metadata: Metadata = {
  title: "Poetry — Southern Legends",
  description: "Original poetry from Alabama writers and the Appalachian foothills.",
  alternates: { canonical: "/arts/poetry" },
  openGraph: { url: "/arts/poetry" },
};

const POETRY_TAGS = ["poetry", "poem", "poems", "verse", "lyric", "lyrics"];

export default function PoetryPage() {
  const profiles = getAllProfiles().filter(p =>
    p.frontmatter.tags?.some((t: string) => POETRY_TAGS.includes(t.toLowerCase()))
  );
  const essays = getAllJournalPosts().filter(p =>
    p.frontmatter.tags?.some((t: string) => POETRY_TAGS.includes(t.toLowerCase()))
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-4">
        <Link href="/arts" className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400 hover:underline">
          ← Arts
        </Link>
      </div>
      <div className="mb-12">
        <p className="text-sm uppercase tracking-widest text-stone-400 mb-3">Poetry</p>
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Poems from the Foothills
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
          Southern Legends publishes original poetry from Alabama writers and artists of the
          Appalachian foothills. We are looking for poems that know where they live.
        </p>
      </div>

      {/* Contributors */}
      <div className="bg-amber-50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-lg p-6 mb-12">
        <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">Contribute a Poem</h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm mb-3">
          We are inviting Alabama poets to submit original work. We are particularly interested in
          Brodie Boyd, Jason Wright, and other regional voices. No payment yet — but a real audience.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/nominate"
            className="inline-block bg-amber-700 text-white px-5 py-2 rounded font-medium hover:bg-amber-800 transition text-sm"
          >
            Submit Your Work
          </Link>
          <a
            href="mailto:matt@gatherstudio.app?subject=Poetry for Southern Legends"
            className="inline-block border border-amber-700 text-amber-700 dark:text-amber-400 px-5 py-2 rounded font-medium hover:bg-amber-50 dark:hover:bg-stone-700 transition text-sm"
          >
            Email Directly
          </a>
        </div>
      </div>

      {/* Published poems */}
      {(profiles.length > 0 || essays.length > 0) ? (
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">Published Poems</h2>
          <div className="space-y-6">
            {profiles.map(p => (
              <article key={p.slug} className="border-b border-stone-100 dark:border-stone-800 pb-6">
                <Link href={`/profiles/${p.slug}`} className="group">
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 mb-1">
                    {p.frontmatter.title}
                  </h3>
                  {p.frontmatter.excerpt && (
                    <p className="text-stone-500 dark:text-stone-400">{p.frontmatter.excerpt}</p>
                  )}
                </Link>
              </article>
            ))}
            {essays.map(p => (
              <article key={p.slug} className="border-b border-stone-100 dark:border-stone-800 pb-6">
                <Link href={`/essays/${p.slug}`} className="group">
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 mb-1">
                    {p.frontmatter.title}
                  </h3>
                  {p.frontmatter.excerpt && (
                    <p className="text-stone-500 dark:text-stone-400">{p.frontmatter.excerpt}</p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-stone-400 italic text-sm">
          First poems coming soon. We are actively seeking Alabama poets to contribute.
        </p>
      )}

      <ShareRow
        url="/arts/poetry"
        title="Poetry — Southern Legends"
        description="Original poetry from Alabama writers and the Appalachian foothills."
      />
      <SectionLinks current="/arts" />
    </main>
  );
}
