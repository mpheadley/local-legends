"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

interface Props {
  slug: string;
  title: string;
  description: string;
  basePath?: string;
}

export default function FloatingShareBar({ slug, title, description, basePath = "/profiles" }: Props) {
  const [visible, setVisible] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Show only after hero has scrolled past; hide when closing section is reached
    const heroSentinel = document.getElementById("hero-end-sentinel");
    const endSentinel = document.getElementById("share-bar-sentinel");

    const heroObserver = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0 }
    );
    const endObserver = new IntersectionObserver(
      ([e]) => setAtEnd(e.isIntersecting || e.boundingClientRect.top < 0),
      { threshold: 0 }
    );

    if (heroSentinel) heroObserver.observe(heroSentinel);
    if (endSentinel) endObserver.observe(endSentinel);

    return () => {
      heroObserver.disconnect();
      endObserver.disconnect();
    };
  }, []);

  const full = `${siteConfig.url}${basePath}/${slug}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(full)}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(full)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${full}`)}`;

  async function copy() {
    await navigator.clipboard.writeText(full).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="sl-float-share"
      style={{ opacity: visible && !atEnd ? 1 : 0, pointerEvents: visible && !atEnd ? "auto" : "none" }}
    >
      <span className="sl-float-share-label">Share</span>
      <a href={xUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="sl-float-share-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href={fbUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="sl-float-share-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
      <a href={emailUrl} aria-label="Share via email" className="sl-float-share-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      </a>
      <button onClick={copy} aria-label={copied ? "Copied" : "Copy link"} className="sl-float-share-btn">
        {copied
          ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
        }
      </button>
    </div>
  );
}
