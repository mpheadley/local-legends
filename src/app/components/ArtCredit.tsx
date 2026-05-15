import Image from "next/image";

interface ArtCreditProps {
  src: string;
  alt: string;
  artist: string;
  artistUrl?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export default function ArtCredit({
  src,
  alt,
  artist,
  artistUrl,
  caption,
  width = 900,
  height = 600,
}: ArtCreditProps) {
  return (
    <figure className="not-prose my-8 bg-ll-warm border border-ll-border rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full object-cover"
        loading="lazy"
      />
      <figcaption className="px-5 py-3 flex items-baseline justify-between gap-4 flex-wrap">
        {caption && (
          <span className="text-xs italic text-ll-text-light">{caption}</span>
        )}
        <span className="text-xs text-ll-text-light ml-auto">
          Art:{" "}
          {artistUrl ? (
            <a
              href={artistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ll-primary underline underline-offset-2 hover:text-ll-primary-dark transition-colors"
            >
              {artist}
            </a>
          ) : (
            <span className="font-medium text-ll-text">{artist}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
