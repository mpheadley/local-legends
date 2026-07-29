"use client";

import { useState } from "react";

interface PlaylistEmbedProps {
  playlistId?: string;
  videoId?: string;
  title?: string;
  caption?: string;
  compact?: boolean;
}

export default function PlaylistEmbed({
  playlistId,
  videoId,
  title,
  caption,
  compact = false,
}: PlaylistEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);

  if (!playlistId && !videoId) return null;

  let embedUrl: string;
  if (playlistId && videoId) {
    embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?list=${playlistId}&rel=0&modestbranding=1`;
  } else if (playlistId) {
    embedUrl = `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`;
  } else {
    embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  }

  const thumbUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <figure className={`not-prose my-10 rounded-xl overflow-hidden border border-ll-border bg-ll-warm ${compact ? "max-w-sm" : ""}`}>
      {title && (
        <div className="px-5 pt-4 pb-2 border-b border-ll-border">
          <p className="text-xs uppercase tracking-widest text-ll-accent font-semibold">Watch</p>
          <p className="text-sm font-semibold text-ll-dark mt-0.5">{title}</p>
        </div>
      )}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {active ? (
          <iframe
            src={`${embedUrl}&autoplay=1`}
            title={title ?? "Embedded playlist"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            onClick={() => setActive(true)}
            className="absolute inset-0 w-full h-full flex items-center justify-center group bg-ll-dark"
            aria-label={`Play ${title ?? "video"}`}
          >
            {thumbUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
              />
            )}
            {!thumbUrl && (
              <div className="absolute inset-0 bg-gradient-to-br from-ll-dark to-ll-accent/30" />
            )}
            <span className="relative z-10 w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-ll-accent ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {playlistId && (
              <span className="absolute bottom-3 right-3 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path d="M3 9h14v2H3zm0-4h14v2H3zm0 8h10v2H3zm13 4l-4-4 4-4z" />
                </svg>
                Playlist
              </span>
            )}
          </button>
        )}
        {active && !loaded && (
          <div className="absolute inset-0 bg-ll-border animate-pulse pointer-events-none" />
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
