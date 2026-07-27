"use client"

export function SponsoredBadge({ label = "Sponsored" }: { label?: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.65rem",
        fontFamily: "var(--font-geist-sans, sans-serif)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#92400e",
        background: "#fef3c7",
        border: "1px solid #d97706",
        borderRadius: 4,
        padding: "1px 6px",
        verticalAlign: "middle",
        marginLeft: "0.5rem",
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  )
}
