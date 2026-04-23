import { Link } from "next-view-transitions";
import Image from "next/image";
import type { Profile } from "@/lib/profiles";
import { computeCardFontSize } from "@/lib/card-font-size";

export default function ProfileCardHero({ profile }: { profile: Profile }) {
  const { slug, frontmatter } = profile;
  const { title, titleHtml, cardTitle, cardTitleHtml, cardFont, cardFontSize, cardGradientOffset, cardTitleColor, cardTall, cardShort, name, location, heroImage, heroAlt, heroPosition, cardTextPosition } = frontmatter;
  const displayTitle = cardTitle || title;
  const useHtml = !!cardTitleHtml || (!cardTitle && !!titleHtml);
  const resolvedHtml = cardTitleHtml || titleHtml;
  const isTop = cardTextPosition === "top";
  const isCondensed = cardFont === "condensed";
  const fontFamily = isCondensed ? "var(--font-condensed)" : "var(--font-heading)";
  const fontWeight = cardFont === "serif-bold" ? 700 : isCondensed ? 700 : 400;
  const fontStyle = cardFont === "serif-italic" ? "italic" : "normal";
  const textTransform: React.CSSProperties["textTransform"] = (isCondensed || cardFont === "serif-caps") ? "uppercase" : undefined;
  const letterSpacing = cardFont === "serif-caps" ? "0.08em" : undefined;
  const titleColor = cardTitleColor === "gold" ? "var(--color-ll-accent)" : "#FAFAF7";
  const titleFontSize = computeCardFontSize(displayTitle, cardFont, cardFontSize);

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

        {/* Gradient — flips direction based on text position */}
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
              style={{ fontFamily, fontSize: titleFontSize, fontWeight, fontStyle, textTransform, letterSpacing, color: titleColor, overflowWrap: "break-word", maxWidth: "100%" }}
              dangerouslySetInnerHTML={{ __html: resolvedHtml! }}
            />
          ) : (
            <h3
              className="leading-[1.0]"
              style={{ fontFamily, fontSize: titleFontSize, fontWeight, fontStyle, textTransform, letterSpacing, color: titleColor, overflowWrap: "break-word", maxWidth: "100%" }}
            >
              {displayTitle}
            </h3>
          )}
          <p
            className="leading-snug"
            style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: 300, fontSize: "0.95rem", color: "rgba(250,250,247,0.65)" }}
          >
            {name}&nbsp;&nbsp;·&nbsp;&nbsp;{location}
          </p>
        </div>
      </div>
    </Link>
  );
}
