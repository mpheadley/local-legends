"use client";

import { useState } from "react";
import type { BookProduct } from "@/data/book-preorders";

export default function BookPreorder({ book }: { book: BookProduct }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);
  const [err, setErr] = useState("");

  async function checkout(tier: string) {
    setErr("");
    setLoading(tier);
    try {
      const res = await fetch("/api/books/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: book.slug, tier }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setErr(data.error ?? "Something went wrong.");
    } catch {
      setErr("Something went wrong. Try again.");
    } finally {
      setLoading(null);
    }
  }

  async function notify(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: book.signupSource }),
      });
      if (res.ok) setSigned(true);
      else setErr("Could not sign you up. Try again.");
    } catch {
      setErr("Could not sign you up. Try again.");
    }
  }

  return (
    <div className="my-8 space-y-4">
      {/* Preorder / support tiers */}
      <div className="grid gap-3 sm:grid-cols-3">
        {book.tiers.map((t) => (
          <button
            key={t.id}
            onClick={() => checkout(t.id)}
            disabled={loading !== null}
            className={`text-left border rounded-lg p-4 transition disabled:opacity-60 ${
              t.id === "founding"
                ? "border-amber-400 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/20"
                : "border-stone-200 dark:border-stone-700 hover:border-amber-500"
            }`}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-semibold text-stone-900 dark:text-stone-100">{t.label}</span>
              <span className="font-bold text-amber-700 dark:text-amber-400 ml-2">${t.price}</span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{t.desc}</p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">
              {loading === t.id ? "Opening checkout…" : t.id === "support" ? "Send a gift →" : "Preorder →"}
            </p>
          </button>
        ))}
      </div>
      <p className="text-xs text-stone-400 dark:text-stone-500">
        Forthcoming. Preorders ship on release; you can cancel for a full refund any time before then.
      </p>

      {/* Free notify signup */}
      <div className="border-t border-stone-200 dark:border-stone-700 pt-4">
        {signed ? (
          <p className="text-sm text-amber-700 dark:text-amber-400">You're on the list. I'll email the chapters as they land.</p>
        ) : (
          <form onSubmit={notify} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Not ready to preorder? Get the chapters free by email."
              className="flex-1 px-3 py-2 rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100"
            />
            <button type="submit" className="px-5 py-2 rounded bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 text-sm font-medium hover:bg-stone-700">
              Notify me
            </button>
          </form>
        )}
      </div>

      {err && <p className="text-sm text-red-600 dark:text-red-400">{err}</p>}
    </div>
  );
}
