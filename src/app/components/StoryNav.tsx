import Link from "next/link";
import Image from "next/image";
import type { Profile } from "@/lib/profiles";

interface StoryNavProps {
  prev: Profile | null;
  next: Profile | null;
}

export default function StoryNav({ prev, next }: StoryNavProps) {
  if (!prev && !next) return null;

  return (
    <nav className="story-nav border-t border-ll-border" aria-label="More stories">
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-10">
        <p
          className="text-xs font-medium uppercase tracking-wider text-ll-text-light mb-6"
        >
          More Stories
        </p>
        <div className="grid grid-cols-2 gap-6">
          {/* Left card */}
          <div>
            {prev && (
              <Link href={`/profiles/${prev.slug}`} className="group block text-left">
                {prev.frontmatter.heroImage && (
                  <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden mb-3">
                    <Image
                      src={prev.frontmatter.heroImage}
                      alt={prev.frontmatter.heroAlt || prev.frontmatter.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 45vw, 300px"
                      loading="lazy"
                    />
                  </div>
                )}
                <span
                  className="block text-base font-bold text-ll-dark group-hover:text-ll-primary transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {prev.frontmatter.name}
                </span>
                <span className="mt-0.5 block text-sm text-ll-text-light">
                  {prev.frontmatter.location}
                </span>
              </Link>
            )}
          </div>

          {/* Right card */}
          <div>
            {next && (
              <Link href={`/profiles/${next.slug}`} className="group block text-left">
                {next.frontmatter.heroImage && (
                  <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden mb-3">
                    <Image
                      src={next.frontmatter.heroImage}
                      alt={next.frontmatter.heroAlt || next.frontmatter.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 45vw, 300px"
                      loading="lazy"
                    />
                  </div>
                )}
                <span
                  className="block text-base font-bold text-ll-dark group-hover:text-ll-primary transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {next.frontmatter.name}
                </span>
                <span className="mt-0.5 block text-sm text-ll-text-light">
                  {next.frontmatter.location}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
