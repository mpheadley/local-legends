interface SongCardProps {
  title: string;
  artist: string;
  url: string;
  note?: string;
}

export default function SongCard({ title, artist, url, note }: SongCardProps) {
  return (
    <figure className="not-prose my-8 bg-ll-warm border border-ll-border rounded-lg px-5 py-4">
      <div className="flex items-start gap-4">
        {/* Music note icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-ll-primary flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 3v10.55A4 4 0 1 0 11 17V7h4V3H9z" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-ll-text-light uppercase tracking-wide mb-1">
            Today&rsquo;s Anthem
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-ll-dark hover:text-ll-primary transition-colors leading-snug block"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </a>
          <p className="text-sm text-ll-text-light mt-0.5">{artist}</p>
          {note && (
            <p className="mt-2 text-sm text-ll-text leading-relaxed">{note}</p>
          )}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Listen to ${title} by ${artist}`}
          className="flex-shrink-0 text-ll-primary hover:text-ll-primary-dark transition-colors mt-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </figure>
  );
}
