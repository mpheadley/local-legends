import { Link } from "next-view-transitions";
import { resolveChips, type Taxonomy } from "@/data/taxonomy";

/**
 * Multi-dimensional taxonomy chips. Render top and bottom on any content
 * surface (profile / essay / book / listicle / tag page / index / 404).
 *   <TaxonomyBar taxonomy={{ genre: "listicle", voice: "matt", category: "church", subject: "baptist-churches" }} />
 */
export default function TaxonomyBar({
  taxonomy,
  ventureDefault = "southern-legends",
  position = "top",
}: {
  taxonomy: Taxonomy;
  ventureDefault?: string;
  position?: "top" | "bottom";
}) {
  const chips = resolveChips(taxonomy, ventureDefault);
  if (chips.length === 0) return null;

  return (
    <nav
      aria-label={`Taxonomy (${position})`}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.4rem",
        alignItems: "center",
        margin: position === "top" ? "0 0 1.25rem" : "1.75rem 0 0",
        paddingTop: position === "bottom" ? "1rem" : 0,
        borderTop: position === "bottom" ? "1px solid #e0d8cc" : "none",
      }}
    >
      {chips.map((c) => (
        <Link
          key={`${c.dimension}-${c.slug}`}
          href={c.href}
          title={`${c.dimensionLabel}: ${c.label}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: "#5a4a38",
            background: "#f3ece0",
            border: "1px solid #e0d5c4",
            borderRadius: "999px",
            padding: "0.25rem 0.65rem",
            textDecoration: "none",
            lineHeight: 1.4,
            transition: "all 0.15s",
          }}
        >
          {c.hint && <span aria-hidden="true">{c.hint}</span>}
          <span style={{ opacity: 0.55, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {c.dimensionLabel}
          </span>
          <span style={{ fontWeight: 600, color: "#3a2e1e" }}>{c.label}</span>
        </Link>
      ))}
    </nav>
  );
}
