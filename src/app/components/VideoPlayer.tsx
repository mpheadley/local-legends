"use client";

interface VideoPlayerProps {
  src: string;
  caption?: string;
  poster?: string;
}

export default function VideoPlayer({ src, caption, poster }: VideoPlayerProps) {
  return (
    <figure className="not-prose my-8 bg-ll-warm border border-ll-border rounded-lg overflow-hidden">
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="w-full block"
        style={{ maxHeight: "600px", objectFit: "contain", background: "#1a1511" }}
      />
      {caption && (
        <figcaption className="px-5 py-3 text-xs italic text-ll-text-light text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
