export interface TimelineItem {
  date: string;
  label: string;
  detail?: string;
}

interface TimelineBlockProps {
  items?: TimelineItem[];
  itemsJson?: string;
  caption?: string;
}

export default function TimelineBlock({ items, itemsJson, caption }: TimelineBlockProps) {
  const resolvedItems: TimelineItem[] = itemsJson
    ? (JSON.parse(itemsJson) as TimelineItem[])
    : (items ?? []);
  return (
    <figure className="not-prose my-8 bg-ll-warm border border-ll-border rounded-lg px-5 py-5">
      <ol className="relative border-l border-ll-border ml-3 space-y-6">
        {resolvedItems.map((item, i) => (
          <li key={i} className="pl-6">
            {/* Dot */}
            <span
              className="absolute -left-[5px] mt-1 w-2.5 h-2.5 rounded-full bg-ll-primary border-2 border-ll-warm"
              aria-hidden="true"
            />
            <time
              className="block text-xs font-medium text-ll-text-light uppercase tracking-wide mb-0.5"
              dateTime={item.date}
            >
              {item.date}
            </time>
            <p
              className="font-bold text-ll-dark leading-snug"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.label}
            </p>
            {item.detail && (
              <p className="mt-1 text-sm text-ll-text leading-relaxed">{item.detail}</p>
            )}
          </li>
        ))}
      </ol>
      {caption && (
        <figcaption className="mt-5 text-xs italic text-ll-text-light text-center border-t border-ll-border pt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
