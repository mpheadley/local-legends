"use client";

import AudioPlayer from "./AudioPlayer";

interface SermonCardProps {
  src: string;
  title: string;
  preachedAt?: string;
  caption?: string;
}

export default function SermonCard({ src, title, preachedAt, caption }: SermonCardProps) {
  return (
    <div className="not-prose my-8">
      {preachedAt && (
        <p className="text-xs font-medium text-ll-text-light uppercase tracking-wide mb-1 px-1">
          Preached at {preachedAt}
        </p>
      )}
      <AudioPlayer src={src} title={title} caption={caption} />
    </div>
  );
}
