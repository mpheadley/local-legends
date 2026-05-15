"use client";

import { useEffect, useRef, useState } from "react";

interface MusicEmbedProps {
  url: string;
  caption?: string;
}

type Platform = "spotify" | "bandcamp";

function parseMusitUrl(url: string): { embedUrl: string; platform: Platform; height: number } | null {
  const spotifyMatch = url.match(
    /open\.spotify\.com\/(track|album|playlist|episode)\/([A-Za-z0-9]+)/
  );
  if (spotifyMatch) {
    return {
      embedUrl: `https://open.spotify.com/embed/${spotifyMatch[1]}/${spotifyMatch[2]}?utm_source=generator`,
      platform: "spotify",
      height: 152,
    };
  }

  // Bandcamp: extract from embed URL or track page URL
  const bcEmbedMatch = url.match(/bandcamp\.com\/EmbeddedPlayer\//);
  if (bcEmbedMatch) {
    return { embedUrl: url, platform: "bandcamp", height: 120 };
  }

  const bcTrackMatch = url.match(/bandcamp\.com\//);
  if (bcTrackMatch) {
    // Standard Bandcamp embed for a page URL — use their oembed-style iframe
    const encoded = encodeURIComponent(url);
    return {
      embedUrl: `https://bandcamp.com/EmbeddedPlayer/v=2/track=0/size=large/bgcol=ffffff/linkcol=9A3412/tracklist=false/artwork=small/transparent=true/?url=${encoded}`,
      platform: "bandcamp",
      height: 120,
    };
  }

  return null;
}

export default function MusicEmbed({ url, caption }: MusicEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const parsed = parseMusitUrl(url);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!parsed) {
    return (
      <figure className="not-prose my-8 bg-ll-warm border border-ll-border rounded-lg px-5 py-4">
        <p className="text-sm text-ll-text-light italic">Unsupported music URL.</p>
      </figure>
    );
  }

  return (
    <figure className="not-prose my-8 bg-ll-warm border border-ll-border rounded-lg overflow-hidden">
      <div ref={containerRef} style={{ height: parsed.height }}>
        {visible ? (
          <iframe
            src={parsed.embedUrl}
            title={caption ?? `${parsed.platform} player`}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full border-0"
            style={{ height: parsed.height }}
          />
        ) : (
          <div className="w-full bg-ll-border animate-pulse" style={{ height: parsed.height }} />
        )}
      </div>
      {caption && (
        <figcaption className="px-5 py-3 text-xs italic text-ll-text-light text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
