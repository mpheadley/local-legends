import Link from "next/link";

interface Profile {
  slug: string;
  frontmatter: { title?: string; name?: string };
}

interface Props {
  prev: Profile | null;
  next: Profile | null;
}

export default function PrevNextEdgeArrows({ prev, next }: Props) {
  return (
    <>
      {prev && (
        <Link
          href={`/profiles/${prev.slug}`}
          aria-label={`Previous story: ${prev.frontmatter.name ?? prev.frontmatter.title}`}
          title={prev.frontmatter.name ?? prev.frontmatter.title}
          className="sl-edge-arrow sl-edge-arrow--prev"
        >
          ‹
        </Link>
      )}
      {next && (
        <Link
          href={`/profiles/${next.slug}`}
          aria-label={`Next story: ${next.frontmatter.name ?? next.frontmatter.title}`}
          title={next.frontmatter.name ?? next.frontmatter.title}
          className="sl-edge-arrow sl-edge-arrow--next"
        >
          ›
        </Link>
      )}
    </>
  );
}
