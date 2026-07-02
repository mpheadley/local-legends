"use client";

import { useEffect, useState } from "react";

export default function BookTeaser() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Only show once per session/user
    if (localStorage.getItem("sl-book-teaser-seen")) {
      return;
    }

    const check = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight > 0 && scrollTop / scrollHeight >= 0.9) {
        setVisible(true);
        localStorage.setItem("sl-book-teaser-seen", "1");
        window.removeEventListener("scroll", check);
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "book-teaser" }),
      });
    } catch {
      // Fallback — silently fail, still mark as submitted
    }

    setSubmitted(true);
  };

  const handleDismiss = () => {
    setDismissed(true);
  };

  return (
    <div
      role="dialog"
      aria-label="Book preview"
      aria-hidden={!visible || dismissed}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        transform: visible && !dismissed ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        background: "#0d1a13",
        borderTop: "1px solid rgba(202, 138, 4, 0.25)",
        padding: "1.5rem",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
        {/* Dismiss */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss book teaser"
          style={{
            position: "absolute",
            top: "-0.25rem",
            right: 0,
            background: "none",
            border: "none",
            color: "rgba(250,250,247,0.4)",
            cursor: "pointer",
            fontSize: "1.25rem",
            lineHeight: 1,
            padding: "0.25rem",
          }}
        >
          ×
        </button>

        {!submitted ? (
          <>
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#CA8A04",
                marginBottom: "0.5rem",
              }}
            >
              Coming Soon
            </p>
            <p
              style={{
                fontFamily: "var(--font-heading, Georgia, serif)",
                fontSize: "1.1rem",
                color: "#FAFAF7",
                marginBottom: "0.25rem",
                lineHeight: 1.35,
              }}
            >
              These stories are becoming a book.
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(250,250,247,0.5)",
                marginBottom: "1rem",
                lineHeight: 1.6,
              }}
            >
              Southern Legends Vol.&nbsp;1 — Northeast Alabama. Get early access.
            </p>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: "1 1 200px",
                  padding: "0.5rem 0.75rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  color: "#FAFAF7",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.5rem 1.25rem",
                  background: "#C4622D",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Notify me
              </button>
            </form>
          </>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-heading, Georgia, serif)",
              fontSize: "1rem",
              color: "#FAFAF7",
              lineHeight: 1.5,
            }}
          >
            You&apos;re on the list. We&apos;ll let you know when Vol.&nbsp;1 is ready.
          </p>
        )}
      </div>
    </div>
  );
}
