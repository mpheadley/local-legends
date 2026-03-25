"use client";

import { useEffect } from "react";

// Set NEXT_PUBLIC_GA4_ID in .env.local (e.g. G-XXXXXXXXXX)
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim();

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Loads GA4. Only call this after cookie consent is granted.
 */
export function loadGA4() {
  if (!GA4_ID || typeof window === "undefined") return;

  // Prevent double-loading
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA4_ID}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID);
}

/**
 * Analytics component — attaches GA4 event tracking via event delegation.
 * Renders nothing visible. Only activates when consent is granted.
 *
 * Tracked events:
 *  - story_click: story card clicks
 *  - share_click: share button clicks
 *  - external_link_click: outbound links (NPS, trail map, etc.)
 */
export default function Analytics({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled || !GA4_ID || typeof window === "undefined") return;

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target || !window.gtag) return;

      // Story card clicks
      const storyCard = target.closest("a[href^='/profiles/']") as HTMLAnchorElement | null;
      if (storyCard) {
        window.gtag("event", "story_click", {
          event_category: "engagement",
          event_label: storyCard.href,
        });
      }

      // Share button clicks
      const shareBtn = target.closest("[data-share]") as HTMLElement | null;
      if (shareBtn) {
        window.gtag("event", "share_click", {
          event_category: "engagement",
          event_label: shareBtn.dataset.share,
        });
      }

      // External link clicks
      const extLink = target.closest("a[href^='http']") as HTMLAnchorElement | null;
      if (extLink && !extLink.href.includes(window.location.hostname)) {
        window.gtag("event", "external_link_click", {
          event_category: "outbound",
          event_label: extLink.href,
        });
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [enabled]);

  return null;
}
