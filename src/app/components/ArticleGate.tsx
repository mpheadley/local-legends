"use client";

import { useEffect, useState } from "react";

const FREE_LIMIT = 3;
const READS_KEY = "sl_reads";
const UNLOCKED_KEY = "sl_unlocked";

function getReads(): string[] {
  try {
    return JSON.parse(localStorage.getItem(READS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function isUnlocked(): boolean {
  return localStorage.getItem(UNLOCKED_KEY) === "true";
}

export default function ArticleGate({ slug }: { slug: string }) {
  const [gated, setGated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (isUnlocked()) return;

    const reads = getReads();
    if (!reads.includes(slug)) {
      reads.push(slug);
      localStorage.setItem(READS_KEY, JSON.stringify(reads));
    }

    if (reads.length >= FREE_LIMIT) {
      setGated(true);
    }
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          source: "article-gate",
        }),
      });
      if (res.ok) {
        localStorage.setItem(UNLOCKED_KEY, "true");
        setStatus("success");
        setTimeout(() => setGated(false), 800);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!gated) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20" style={{ top: "45%" }}>
      {/* Gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #f5f0eb)" }}
        aria-hidden="true"
      />

      {/* Gate card */}
      <div className="absolute top-32 left-0 right-0 bottom-0 bg-ll-light flex items-start justify-center px-6 pt-8">
        <div className="max-w-md w-full text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-ll-text-light mb-3">
            3 of 3 free stories this month
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-ll-dark mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Keep reading — free.
          </h2>
          <p className="text-base text-ll-text mb-6">
            Southern Legends is free with your email. No payment, no paywall.
            Just stories from people who stayed.
          </p>

          {status === "success" ? (
            <p className="text-lg font-semibold text-ll-primary">
              You&apos;re in. Unlocking the story...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="sm:w-36 px-4 py-3 rounded text-ll-dark text-sm bg-white border border-ll-border focus:outline-none focus:ring-2 focus:ring-ll-accent"
                />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded text-ll-dark text-sm bg-white border border-ll-border focus:outline-none focus:ring-2 focus:ring-ll-accent"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-ll-primary text-white font-semibold rounded hover:bg-ll-primary-dark transition-colors disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Unlock all stories — free"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-red-500">Something went wrong. Try again.</p>
          )}

          <p className="mt-4 text-xs text-ll-text-light">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </div>
  );
}
