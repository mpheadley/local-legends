"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Profile {
  slug: string;
  frontmatter: {
    name?: string;
    title?: string;
    location?: string;
    heroImage?: string;
    heroAlt?: string;
  };
}

interface Props {
  next: Profile;
}

export default function NextUpPopup({ next }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const key = `sl_nextup_${next.slug}`;
    if (sessionStorage.getItem(key)) return;

    function onScroll() {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled > 0.85) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [next.slug, dismissed]);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem(`sl_nextup_${next.slug}`, "1");
  }

  if (!visible) return null;

  const label = next.frontmatter.name ?? next.frontmatter.title ?? "Next Story";

  return (
    <div className="sl-nextup">
      <button onClick={dismiss} aria-label="Close" className="sl-nextup-close">×</button>
      <p className="sl-nextup-label">More Stories</p>
      <Link href={`/profiles/${next.slug}`} className="sl-nextup-link" onClick={dismiss}>
        {next.frontmatter.heroImage && (
          <div style={{ position: "relative", width: 80, height: 60, flexShrink: 0, overflow: "hidden" }}>
            <Image
              src={next.frontmatter.heroImage}
              alt={next.frontmatter.heroAlt ?? label}
              fill
              style={{ objectFit: "cover" }}
              sizes="80px"
            />
          </div>
        )}
        <div>
          {next.frontmatter.location && (
            <p className="sl-nextup-location">{next.frontmatter.location}</p>
          )}
          <p className="sl-nextup-name">{label}</p>
        </div>
      </Link>
    </div>
  );
}
