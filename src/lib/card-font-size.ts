/**
 * Computes a card title font size that:
 * 1. Scales down with total title length (editorial hierarchy)
 * 2. Caps based on longest word so no word breaks mid-glyph at card width
 *
 * cardContentPx: estimated inner content width of the card.
 *   ~300px for homepage grid (consistent across 1–3 col breakpoints).
 *   ~700px for FeaturedTilt (full-screen panel).
 */
export function computeCardFontSize(
  displayText: string,
  cardFont?: string,
  cardFontSize?: "sm" | "md" | "lg",
  cardContentPx = 300
): string {
  const isCondensed = cardFont === "condensed";
  const isSerifCaps = cardFont === "serif-caps";

  // Strip HTML tags before measuring
  const stripped = displayText.replace(/<[^>]+>/g, "");

  const SIZES = isCondensed
    ? { sm: 4, md: 5, lg: 6.5 }
    : { sm: 3.5, md: 4.25, lg: 5.5 };

  const lengthBasedRem = cardFontSize
    ? SIZES[cardFontSize]
    : isCondensed
    ? stripped.length > 32 ? 4 : stripped.length > 22 ? 5 : 6.5
    : stripped.length > 32 ? 3.0 : stripped.length > 22 ? 3.75 : 4.5;

  // Longest word must fit in one line without breaking.
  // charWidthFactor: approximate em-width per character (serif ~0.62, caps+tracking ~0.68, condensed ~0.52)
  const maxWordLen = stripped.split(/\s+/).reduce((m, w) => Math.max(m, w.length), 0);
  // serif-caps: 0.85 accounts for uppercase glyph width (~0.75) + 0.08em letter-spacing + small safety margin
  const charWidthFactor = isCondensed ? 0.52 : isSerifCaps ? 0.85 : 0.62;
  const wordCapRem = cardContentPx / (maxWordLen * charWidthFactor) / 16;

  return `${Math.min(lengthBasedRem, wordCapRem).toFixed(2)}rem`;
}
