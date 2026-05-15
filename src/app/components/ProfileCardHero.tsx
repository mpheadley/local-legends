import { Link } from "next-view-transitions";
import Image from "next/image";
import type { Profile } from "@/lib/profiles";
import { resolveCardTitle } from "@/lib/card-title-style";

export default function ProfileCardHero({ profile }: { profile: Profile }) {
  const { slug, frontmatter } = profile;
  const { cardGradientOffset, cardTall, cardShort, name, location, heroImage, heroAlt, heroPosition, cardTextPosition } = frontmatter;
  const isTop = cardTextPosition === "top";

  const { displayTitle, resolvedHtml, useHtml, titleStyle } = resolveCardTitle(frontmatter, {
    containerPx: 300,
    extraStyle: { lineHeight: "1.0", overflowWrap: "normal", maxWidth: "100%" },
  });

  return (
    <Link href={`/profiles/${slug}`} className="group block">
      <div
        className="relative overflow-hidden rounded-sm"
        style={{ aspectRatio: cardTall ? "2 / 3" : cardShort ? "4 / 5" : "3 / 4", viewTransitionName: `profile-hero-${slug}` } as React.CSSProperties}
      >
        {heroImage ? (
          <Image
            src={heroImage}
            alt={heroAlt || name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={heroPosition ? { objectPosition: heroPosition } : undefined}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "#292524" }}
          >
            <span
              className="select-none"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(10rem, 25vw, 22rem)",
                fontWeight: 900,
                color: "rgba(255,255,255,0.06)",
                lineHeight: 0.85,
              }}
              aria-hidden="true"
            >
              {name.charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: (() => {
              const o = cardGradientOffset ?? 0;
              return isTop
                ? `linear-gradient(to bottom, rgba(20,16,14,0.95) ${o}%, rgba(20,16,14,0.5) ${45+o}%, rgba(20,16,14,0.05) ${70+o}%, transparent ${Math.min(100+o,100)}%)`
                : `linear-gradient(to top, rgba(20,16,14,0.95) ${o}%, rgba(20,16,14,0.5) ${45+o}%, rgba(20,16,14,0.05) ${70+o}%, transparent ${Math.min(100+o,100)}%)`;
            })(),
          }}
        />

        {/* Text overlay */}
        <div
          className="absolute left-0 right-0 p-5 flex flex-col gap-1.5"
          style={isTop ? { top: 0 } : { bottom: 0 }}
        >
          {isTop && (
            <div style={{ width: "2.5rem", height: "2px", backgroundColor: "var(--color-ll-accent)", marginBottom: "0.5rem" }} />
          )}
          {useHtml ? (
            <h3
              className="leading-[1.0]"
              style={titleStyle}
              dangerouslySetInnerHTML={{ __html: resolvedHtml! }}
            />
          ) : (
            <h3 className="leading-[1.0]" style={titleStyle}>
              {displayTitle}
            </h3>
          )}
          <p
            className="leading-snug self-start"
            style={{
              fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 300, fontSize: "0.85rem", color: "#FAFAF7",
              background: "rgba(20,16,14,0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(250,250,247,0.15)",
              borderRadius: "4px",
              padding: "0.2rem 0.75rem",
            }}
          >
            {name}&nbsp;&nbsp;·&nbsp;&nbsp;{location}
          </p>
        </div>
      </div>
    </Link>
  );
}
