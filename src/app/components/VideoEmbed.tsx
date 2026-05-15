"use client";

import { useEffect, useRef, useState } from "react";

interface VideoEmbedProps {
  url: string;
  caption?: string;
}

function parseVideoUrl(url: string): { embedUrl: string; platform: "youtube" | "vimeo" } | null {
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0`,
      platform: "youtube",
    };
  }

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return {
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1`,
      platform: "vimeo",
    };
  }

  return null;
}

export default function VideoEmbed({ url, caption }: VideoEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const parsed = parseVideoUrl(url);

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
        <p className="text-sm text-ll-text-light italic">Unsupported video URL.</p>
      </figure>
    );
  }

  return (
    <figure className="not-prose my-8 bg-ll-warm border border-ll-border rounded-lg overflow-hidden">
      <div ref={containerRef} className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {visible ? (
          <iframe
            src={parsed.embedUrl}
            title={caption ?? "Embedded video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <div className="absolute inset-0 bg-ll-border animate-pulse" />
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
