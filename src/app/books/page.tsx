import type { Metadata } from "next";
import Link from "next/link";
import { getAllJournalPosts } from "@/lib/journal";
import SectionLinks from "@/app/components/SectionLinks";
import ShareRow from "@/app/components/ShareRow";

export const metadata: Metadata = {
  title: "Books & Literature — Southern Legends",
  description: "Books, literature, and magazines from and about the American South.",
  alternates: { canonical: "/books" },
  openGraph: { url: "/books" },
};

const BOOK_TAGS = ["books", "literature", "reading", "memoir", "novel", "poetry", "nonfiction", "fiction", "magazines", "publishing"];

// Regional magazines and publishers
const REGIONAL_PUBS = [
  { name: "Oxford American", url: "https://oxfordamerican.org", description: "The literary magazine of the South." },
  { name: "Garden & Gun", url: "https://gardenandgun.com", description: "Southern culture, food, and outdoors." },
  { name: "Bitter Southerner", url: "https://bittersoutherner.com", description: "The new South in long-form." },
  { name: "Alabama Writers' Forum", url: "https://writersforum.org", description: "Alabama's literary organization." },
  { name: "Deep South Magazine", url: "https://deepsouthmag.com", description: "Stories from the American South." },
  { name: "Reckon Review", url: "https://reckon.news", description: "Southern journalism and culture." },
];

export default function BooksPage() {
  const essays = getAllJournalPosts().filter(p =>
    p.frontmatter.tags?.some((t: string) => BOOK_TAGS.includes(t.toLowerCase()))
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-widest text-stone-400 mb-3">Books & Literature</p>
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Reading the South
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
          The South has always been a place people write about — and write from. This section 
          covers books, literary magazines, and publishing from and about the American South, 
          with particular attention to Alabama and Appalachian voices.
        </p>
      </div>

      {/* Books from Matt */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">Forthcoming from Matt Headley</h2>
        <div className="space-y-4">
          {[
            {
              slug: "forthcoming-plainspoken-blueprint",
              title: "Plainspoken Blueprint",
              tagline: "Message first. Brand second. Website last.",
              tags: ["business", "messaging"],
            },
            {
              slug: "forthcoming-tend-before-the-wedding",
              title: "Tend: Before the Wedding",
              tagline: "Five conversations before you say I do.",
              tags: ["marriage", "formation", "faith"],
            },
            {
              slug: "forthcoming-god-and-the-algorithm",
              title: "God and the Algorithm",
              tagline: "How I became more rested and less productive.",
              tags: ["faith", "technology", "AI"],
            },
            {
              slug: "forthcoming-broken-ground",
              title: "Broken Ground",
              tagline: "Losing a flower farm in Anniston. Resigning from a church I loved. A manic episode I didn't recognize until the damage was done. And what it looked like to rebuild.",
              tags: ["memoir", "Alabama"],
            },
          ].map(book => (
            <article key={book.slug} className="border border-stone-200 dark:border-stone-700 rounded-lg p-5">
              <Link href={`/essays/${book.slug}`} className="group">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 mb-1">
                  {book.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 italic">{book.tagline}</p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">Read the announcement →</p>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Regional Publications */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Southern Publications Worth Reading</h2>
        <p className="text-stone-500 dark:text-stone-400 mb-6 text-sm">Magazines and journals doing serious work on Southern culture and literature.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {REGIONAL_PUBS.map(pub => (
            <a
              key={pub.name}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 hover:border-amber-500 dark:hover:border-amber-500 transition group"
            >
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 mb-1">
                {pub.name}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">{pub.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Essays tagged books */}
      {essays.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">Reading Notes</h2>
          <div className="space-y-4">
            {essays.map(p => (
              <article key={p.slug} className="border-b border-stone-100 dark:border-stone-800 pb-4">
                <Link href={`/essays/${p.slug}`} className="group">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                    {p.frontmatter.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Contribute */}
      <div className="bg-stone-50 dark:bg-stone-800 rounded-lg p-8 mt-12">
        <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">Contribute a Review or Reading Note</h2>
        <p className="text-stone-500 dark:text-stone-400 mb-4 text-sm">
          Read something Southern worth telling people about? We publish brief reading notes and book reviews from regional contributors.
        </p>
        <Link
          href="/nominate"
          className="inline-block bg-amber-700 text-white px-5 py-2 rounded font-medium hover:bg-amber-800 transition text-sm"
        >
          Submit a Review
        </Link>
      </div>

      <ShareRow
        url="/books"
        title="Books & Literature — Southern Legends"
        description="Books, literature, and magazines from and about the American South."
      />

      <SectionLinks current="/books" />
    </main>
  );
}
