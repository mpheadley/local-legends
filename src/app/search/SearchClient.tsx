"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { SearchEntry } from "@/lib/search";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function highlight(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
}

function score(entry: SearchEntry, terms: string[]): number {
  let s = 0;
  const title = entry.title.toLowerCase();
  const excerpt = entry.excerpt.toLowerCase();
  const content = entry.content.toLowerCase();
  for (const term of terms) {
    if (title.includes(term)) s += 10;
    if (excerpt.includes(term)) s += 5;
    if (content.includes(term)) s += 1;
  }
  return s;
}

export default function SearchClient({ index }: { index: SearchEntry[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/);
    return index
      .map((entry) => ({ entry, s: score(entry, terms) }))
      .filter(({ s }) => s > 0)
      .sort((a, b) => b.s - a.s)
      .map(({ entry }) => entry);
  }, [query, index]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      {/* Input */}
      <div className="relative mb-10">
        <label htmlFor="search-input" className="sr-only">
          Search
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories, journal…"
          autoFocus
          className="w-full border-b-2 border-ll-border bg-transparent text-ll-dark text-xl py-3 pr-10 pl-0 outline-none focus:border-ll-primary transition-colors placeholder:text-ll-text-light"
          style={{ fontFamily: "var(--font-heading)" }}
        />
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 text-ll-text-light"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Results */}
      {hasQuery && results.length === 0 && (
        <p className="text-ll-text-light text-sm">
          No results for &ldquo;{query}&rdquo;.
        </p>
      )}

      {results.length > 0 && (
        <>
          <p className="text-xs text-ll-text-light uppercase tracking-wide mb-6">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          <ul className="space-y-8">
            {results.map((entry) => (
              <li
                key={`${entry.type}-${entry.slug}`}
                className="border-b border-ll-border pb-8 last:border-0 last:pb-0"
              >
                <Link href={entry.href} className="group block">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="category-tag text-[10px]">
                      {entry.type === "journal" ? "Journal" : entry.category ?? "Profile"}
                    </span>
                    <span className="text-xs text-ll-text-light">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <h2
                    className="text-xl md:text-2xl font-bold text-ll-dark group-hover:text-ll-primary transition-colors mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                    dangerouslySetInnerHTML={{
                      __html: highlight(entry.title, query.trim()),
                    }}
                  />
                  <p
                    className="text-ll-text leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: highlight(entry.excerpt, query.trim()),
                    }}
                  />
                  <span className="inline-block mt-3 text-sm font-medium text-ll-primary group-hover:underline">
                    Read →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {!hasQuery && (
        <p className="text-ll-text-light text-sm">
          Start typing to search across all stories and journal entries.
        </p>
      )}
    </div>
  );
}
