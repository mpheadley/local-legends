import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Books by Matt Headley — Southern Legends",
  description:
    "Books by Matt Headley — pastor, flower farmer, and editor of Southern Legends. Including Tend: Before the Wedding, God & the Algorithm, the Plainspoken Blueprint series, Broken Ground, and more.",
  alternates: { canonical: "/author" },
  openGraph: {
    url: "/author",
    title: "Books by Matt Headley",
    description:
      "Pastor, flower farmer, and author from Northeast Alabama. All books, forthcoming titles, and newsletter signup.",
    images: [{ url: "/images/about/headshot-hedcut-matt-headley.webp" }],
  },
};

type BookStatus = "presell" | "forthcoming" | "drafting" | "serializing" | "longGame";

interface Merch {
  name: string;
  url: string;
  price: string;
}

interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  tagline: string;
  status: BookStatus;
  statusLabel: string;
  coverImage?: string;
  series?: string;
  presellUrl?: string;
  signupLabel?: string;
  signupUrl?: string;
  merch?: Merch[];
  eta?: string;
  description: string;
}

const STATUS_STYLES: Record<BookStatus, string> = {
  presell: "bg-amber-700 text-white",
  forthcoming: "bg-stone-800 text-stone-200",
  drafting: "bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200",
  serializing: "bg-emerald-700 text-white",
  longGame: "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400",
};

const BOOKS: Book[] = [
  {
    slug: "tend-before-the-wedding",
    title: "Tend: Before the Wedding",
    tagline: "Five conversations before you say I do.",
    status: "presell",
    statusLabel: "Presell Open — ships Aug 2026",
    coverImage: undefined,
    series: "The Tend Series",
    presellUrl: "/essays/forthcoming-tend-before-the-wedding",
    signupLabel: "Get notified when it ships",
    signupUrl: "/subscribe",
    eta: "August 2026",
    merch: [
      { name: "\"Tend\" tee — cream on black", url: "https://southernlegends.blog/merch", price: "$28" },
    ],
    description:
      "A premarital workbook built from five real conversations — about money, family history, conflict, faith, and sex. Not prompts. Conversations. For couples who want to get somewhere before they walk the aisle.",
  },
  {
    slug: "god-and-the-algorithm",
    title: "God & the Algorithm",
    subtitle: "How I became more rested and less productive.",
    tagline: "I built God out of code. It wasn't what I needed.",
    status: "drafting",
    statusLabel: "Drafting now",
    presellUrl: undefined,
    signupLabel: "Notify me when it's ready",
    signupUrl: "/subscribe",
    series: "Standalone",
    merch: [
      { name: "\"More rested. Less productive.\" tee", url: "https://southernlegends.blog/merch", price: "$28" },
    ],
    description:
      "During a manic episode, I built a community of AI spiritual directors — one for each Enneagram type, plus a Richard Rohr and a figure I labeled Jesus. The technical execution worked. This book is what I found when I looked at it in daylight.",
  },
  {
    slug: "plainspoken-blueprint",
    title: "Clever Confuses. Clarity Sells.",
    subtitle: "The Plainspoken Blueprint field guide.",
    tagline: "Message first. Brand second. Website last.",
    status: "drafting",
    statusLabel: "~80% drafted",
    series: "The Plainspoken Blueprint Series — Book 1",
    signupLabel: "Notify me when it's ready",
    signupUrl: "/subscribe",
    merch: [
      { name: "\"Clarity Sells\" tee — white on dark green", url: "https://southernlegends.blog/merch", price: "$28" },
      { name: "\"Message First\" tote", url: "https://southernlegends.blog/merch", price: "$22" },
    ],
    description:
      "Almost every small business has the sequence backwards. They fix the website before the brand. The brand before the message. This is the argument for one right order — and a field guide to working it.",
  },
  {
    slug: "southern-legends-vol1",
    title: "Southern Legends Vol. 1",
    tagline: "Collected profiles from Northeast Alabama.",
    status: "serializing",
    statusLabel: "Serializing now — email list gets first access",
    coverImage: "/images/books/sl-vol1-cover.png",
    series: "Southern Legends",
    signupLabel: "Join the list — get early access",
    signupUrl: "/subscribe",
    merch: [
      { name: "SL Crimson wordmark tee", url: "https://southernlegends.blog/merch", price: "$28" },
      { name: "SL field journal", url: "https://southernlegends.blog/merch", price: "$18" },
    ],
    description:
      "The profiles, the places, the people doing quiet durable work in Northeast Alabama. Not because they are famous — because they are here, and that is worth something. Compiled from the first year of the column.",
  },
  {
    slug: "broken-ground",
    title: "Broken Ground",
    tagline: "Losing a flower farm. Leaving a church. What it looked like to rebuild.",
    status: "forthcoming",
    statusLabel: "Memoir — long game",
    series: "Standalone",
    signupLabel: "Notify me when it's ready",
    signupUrl: "/subscribe",
    merch: [
      { name: "\"Pleasant Valley\" tee — faded black", url: "https://southernlegends.blog/merch", price: "$28" },
    ],
    description:
      "I lost a flower farm in Anniston. I resigned from a church I loved. I survived a manic episode I didn't recognize until the damage was done. This is the memoir of what it looked like to start over when you're not sure what you're starting toward.",
  },
  {
    slug: "chief-ladiga-trail",
    title: "The Chief Ladiga Trail",
    tagline: "In 1832, the Creek Nation was removed from Northeast Alabama. This book argues for a reckoning, not a celebration.",
    status: "longGame",
    statusLabel: "Research phase — 2032 target",
    series: "Standalone",
    eta: "2032 (bicentennial)",
    signupLabel: "Notify me when it's ready",
    signupUrl: "/subscribe",
    merch: [
      { name: "Chief Ladiga Trail map tee", url: "https://southernlegends.blog/merch", price: "$28" },
    ],
    description:
      "A historical reckoning with the Creek removal from Northeast Alabama, timed to the 2032 bicentennial. Built from years of SL profiles, trail walks, and local history. Not a celebration — a witness.",
  },
  {
    slug: "back-forty",
    title: "The Back Forty",
    tagline: "Dispatches on dirt, chickens, and the people who perform them.",
    status: "serializing",
    statusLabel: "Column in progress — read it now",
    series: "Southern Legends",
    presellUrl: "/back-forty",
    signupLabel: "Read the column",
    signupUrl: "/back-forty",
    merch: [
      { name: "\"I Farmed and Lost the Farm\" tee", url: "https://southernlegends.blog/merch", price: "$28" },
      { name: "Back Forty agrarian print", url: "https://southernlegends.blog/merch", price: "$24" },
    ],
    description:
      "Southern Gothic agrarian satire, running on Southern Legends under Matt's name. Half dispatch, half confession. A man who farmed for real and lost the farm anyway — on dirt, chickens, and the honest absurdity of growing things.",
  },
  {
    slug: "homesteading-book",
    title: "Company of Farmers",
    tagline: "The people who taught me to love the land — and the farm I dreamed, built, and did not keep.",
    status: "forthcoming",
    statusLabel: "Forthcoming",
    series: "Standalone",
    signupLabel: "Notify me when it's ready",
    signupUrl: "/subscribe",
    merch: [],
    description:
      "Half portrait collection, half confession. The farmers, homesteaders, and land-keepers who shaped what Matt believed was possible — and the story of the farm that didn't survive the believing.",
  },
];

const MERCH_GENERAL: Merch[] = [
  { name: "SL crimson tee", url: "https://southernlegends.blog/merch", price: "$28" },
  { name: "\"The South is not a theme park\" tote", url: "https://southernlegends.blog/merch", price: "$22" },
  { name: "SL field journal", url: "https://southernlegends.blog/merch", price: "$18" },
];

export default function AuthorPage() {
  const presellBooks = BOOKS.filter(b => b.status === "presell");
  const activeBooks = BOOKS.filter(b => b.status === "serializing" || b.status === "drafting");
  const forthcomingBooks = BOOKS.filter(b => b.status === "forthcoming" || b.status === "longGame");

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">

      {/* Header */}
      <div className="flex gap-6 items-start mb-14">
        <Image
          src="/images/about/headshot-hedcut-matt-headley.webp"
          alt="Matt Headley"
          width={96}
          height={96}
          className="rounded-full shrink-0"
          style={{ width: 96, height: 96 }}
        />
        <div>
          <p className="text-sm uppercase tracking-widest text-stone-400 mb-1">Author</p>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2 font-fraunces">
            Books by Matt Headley
          </h1>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
            Pastor of Ecclesia Community, a fresh expression of Christian community.
            Flower farmer in Northeast Alabama. Founder and editor of Southern Legends.
          </p>
        </div>
      </div>

      {/* Presell */}
      {presellBooks.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-5">Available Now</h2>
          <div className="space-y-6">
            {presellBooks.map(book => (
              <BookCard key={book.slug} book={book} featured />
            ))}
          </div>
        </section>
      )}

      {/* Active / In Progress */}
      <section className="mb-14">
        <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-5">In Progress</h2>
        <div className="space-y-5">
          {activeBooks.map(book => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>

      {/* Forthcoming */}
      <section className="mb-14">
        <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-5">Forthcoming</h2>
        <div className="space-y-5">
          {forthcomingBooks.map(book => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>

      {/* Merch */}
      <section className="mb-14">
        <h2 className="text-xs uppercase tracking-widest text-stone-400 mb-5">Merch</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-5">
          Shirts, totes, and prints related to the books and the column. DTF-printed, made to order.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {BOOKS.flatMap(b => (b.merch ?? []).map(m => ({ ...m, book: b.title }))).concat(MERCH_GENERAL.map(m => ({ ...m, book: "Southern Legends" }))).slice(0, 8).map((item, i) => (
            <a
              key={i}
              href={item.url}
              className="border border-stone-200 dark:border-stone-700 rounded-lg p-4 hover:border-amber-500 transition group flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">{item.name}</p>
                <p className="text-xs text-stone-400 mt-0.5">{item.book}</p>
              </div>
              <span className="text-sm font-semibold text-stone-500 dark:text-stone-400">{item.price}</span>
            </a>
          ))}
        </div>
        <a
          href="/merch"
          className="inline-block mt-4 text-sm text-amber-700 dark:text-amber-400 hover:underline"
        >
          See all merch →
        </a>
      </section>

      {/* Newsletter + Support */}
      <section className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-stone-50 dark:bg-stone-800 rounded-lg p-6">
          <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Stay in the loop</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
            Email list gets early access to every book — presell announcements, chapters, and release dates before anyone else.
          </p>
          <Link
            href="/subscribe"
            className="inline-block bg-amber-700 text-white text-sm font-medium px-5 py-2 rounded hover:bg-amber-800 transition"
          >
            Subscribe →
          </Link>
        </div>
        <div className="bg-stone-50 dark:bg-stone-800 rounded-lg p-6">
          <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Support this work</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
            Southern Legends and all the books are made by one person with a laptop and a farm.
            If it's been worth something, you can say so here.
          </p>
          <Link
            href="/support"
            className="inline-block border border-stone-400 dark:border-stone-500 text-stone-700 dark:text-stone-300 text-sm font-medium px-5 py-2 rounded hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition"
          >
            Support →
          </Link>
        </div>
      </section>

    </main>
  );
}

function BookCard({ book, featured = false }: { book: Book; featured?: boolean }) {
  return (
    <article
      className={`rounded-lg border p-6 ${
        featured
          ? "border-amber-500 dark:border-amber-600 bg-amber-50/40 dark:bg-amber-950/20"
          : "border-stone-200 dark:border-stone-700"
      }`}
    >
      <div className="flex gap-5">
        {book.coverImage && (
          <div className="shrink-0">
            <Image
              src={book.coverImage}
              alt={book.title}
              width={72}
              height={100}
              className="rounded shadow-sm object-cover"
              style={{ width: 72, height: 100, objectFit: "cover" }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {book.series && (
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">{book.series}</p>
          )}
          <h3 className="font-bold text-stone-900 dark:text-stone-100 font-fraunces text-lg leading-snug mb-0.5">
            {book.title}
          </h3>
          {book.subtitle && (
            <p className="text-sm text-stone-500 dark:text-stone-400 italic mb-1">{book.subtitle}</p>
          )}
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">{book.tagline}</p>

          <span className={`inline-block text-xs px-2 py-0.5 rounded font-medium mb-3 ${STATUS_STYLES[book.status]}`}>
            {book.statusLabel}
          </span>

          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
            {book.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {book.presellUrl && book.status === "presell" && (
              <Link
                href={book.presellUrl}
                className="inline-block bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded hover:bg-amber-800 transition"
              >
                Presell — {book.eta ?? "order now"} →
              </Link>
            )}
            {book.presellUrl && book.status === "serializing" && (
              <Link
                href={book.presellUrl}
                className="inline-block bg-stone-800 text-white text-sm font-medium px-4 py-2 rounded hover:bg-stone-700 transition"
              >
                {book.signupLabel ?? "Read now"} →
              </Link>
            )}
            {book.signupUrl && book.status !== "serializing" && (
              <Link
                href={book.signupUrl}
                className="inline-block border border-stone-400 dark:border-stone-500 text-stone-700 dark:text-stone-300 text-sm px-4 py-2 rounded hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition"
              >
                {book.signupLabel ?? "Notify me"} →
              </Link>
            )}
          </div>

          {book.merch && book.merch.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {book.merch.map(m => (
                <a
                  key={m.name}
                  href={m.url}
                  className="text-xs text-stone-500 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 underline underline-offset-2"
                >
                  {m.name} — {m.price}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
