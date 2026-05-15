"use client";

import { useRef } from "react";

export interface StripPhoto {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoStripProps {
  photos?: StripPhoto[];
  photosJson?: string;
  caption?: string;
}

export default function PhotoStrip({ photos, photosJson, caption }: PhotoStripProps) {
  const resolvedPhotos: StripPhoto[] = photosJson
    ? (JSON.parse(photosJson) as StripPhoto[])
    : (photos ?? []);
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  }

  return (
    <figure className="not-prose my-8 bg-ll-warm border border-ll-border rounded-lg overflow-hidden">
      <div className="relative group">
        {/* Strip */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto snap-x snap-mandatory px-4 py-4 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {resolvedPhotos.map((photo, i) => (
            <div
              key={i}
              className="flex-shrink-0 snap-start relative rounded overflow-hidden"
              style={{ width: 240, height: 180 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover"
                width={240}
                height={180}
              />
              {photo.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-black/50 px-2 py-1">
                  <p className="text-white text-xs leading-snug">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Scroll buttons */}
        {resolvedPhotos.length > 2 && (
          <>
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {caption && (
        <figcaption className="px-5 pb-3 text-xs italic text-ll-text-light text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
