import type React from "react";

interface CardStyleInput {
  title: string;
  titleHtml?: string;
  cardTitle?: string;
  cardTitleHtml?: string;
  cardFont?: "serif" | "serif-bold" | "serif-italic" | "serif-caps" | "condensed";
  cardFontSize?: "sm" | "md" | "lg";
  cardTitleColor?: "white" | "gold";
}

export interface CardTitleMeta {
  displayTitle: string;
  resolvedHtml: string | undefined;
  useHtml: boolean;
  fontFamily: string;
  fontWeight: number;
  fontStyle: React.CSSProperties["fontStyle"];
  textTransform: React.CSSProperties["textTransform"];
  letterSpacing: string | undefined;
  titleColor: string;
}

/**
 * Single source of truth for editorial card title styling.
 * Used by HeroCarousel, FeaturedTilt, and any future card component.
 * Font size is intentionally excluded — each component uses a different
 * container width, so they call computeCardFontSize() with their own px value.
 */
export function resolveCardTitleMeta(
  card: CardStyleInput,
  defaultColor = "#FAFAF7"
): CardTitleMeta {
  const { title, titleHtml, cardTitle, cardTitleHtml, cardFont, cardTitleColor } = card;

  const displayTitle = cardTitle || title;
  const useHtml = !!cardTitleHtml || (!cardTitle && !!titleHtml);
  const resolvedHtml = cardTitleHtml || titleHtml;

  const isCondensed = cardFont === "condensed";
  const fontFamily = isCondensed ? "var(--font-condensed)" : "var(--font-heading)";
  const fontWeight = cardFont === "serif-bold" ? 700 : isCondensed ? 700 : 400;
  const fontStyle: React.CSSProperties["fontStyle"] = cardFont === "serif-italic" ? "italic" : "normal";
  const textTransform: React.CSSProperties["textTransform"] =
    isCondensed || cardFont === "serif-caps" ? "uppercase" : undefined;
  const letterSpacing = cardFont === "serif-caps" ? "0.08em" : undefined;
  const titleColor = cardTitleColor === "gold" ? "var(--color-ll-accent)" : defaultColor;

  return {
    displayTitle,
    resolvedHtml,
    useHtml,
    fontFamily,
    fontWeight,
    fontStyle,
    textTransform,
    letterSpacing,
    titleColor,
  };
}
