import type { Metadata } from "next";
import { buildSearchIndex } from "@/lib/search";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search stories and journal entries on Southern Legends.",
  alternates: { canonical: "/search" },
  openGraph: { url: "/search" },
};

export default function SearchPage() {
  const index = buildSearchIndex();

  return (
    <main id="main-content">
      <section className="relative text-white overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-black/50 z-[1]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-28 pb-10 md:pt-32 md:pb-14">
          <h1
            className="text-3xl md:text-4xl font-bold uppercase tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Search
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/75 max-w-xl">
            Find stories, profiles, and journal entries.
          </p>
        </div>
      </section>

      <section className="bg-ll-light min-h-[50vh]">
        <SearchClient index={index} />
      </section>
    </main>
  );
}
