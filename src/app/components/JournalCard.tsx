import { Link } from "next-view-transitions";
import type { JournalPost } from "@/lib/journal";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function JournalCard({ post }: { post: JournalPost }) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <Link href={`/essays/${slug}`} className="group block">
      <p style={{
        fontFamily: "var(--font-source-sans)",
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#9C8E84",
        marginBottom: "0.5rem",
      }}>
        {formatDate(frontmatter.date)} &middot; {readingTime}
      </p>
      <h3
        className="group-hover:text-ll-primary transition-colors"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.25rem",
          fontWeight: 400,
          lineHeight: 1.15,
          color: "var(--color-ll-dark)",
          marginBottom: "0.5rem",
          fontVariationSettings: '"opsz" 36',
        }}
      >
        {frontmatter.title}
      </h3>
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.875rem",
        lineHeight: 1.6,
        color: "#5C534A",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {frontmatter.excerpt}
      </p>
      <span className="group-hover:underline" style={{
        display: "inline-block",
        marginTop: "0.75rem",
        fontSize: "0.8125rem",
        fontWeight: 500,
        color: "var(--color-ll-primary)",
        fontFamily: "var(--font-source-sans)",
      }}>
        Read →
      </span>
    </Link>
  );
}
