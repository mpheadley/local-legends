"use client"

interface SpotifyEmbedProps {
  playlistId: string
  title?: string
  compact?: boolean
}

export default function SpotifyEmbed({ playlistId, title, compact = true }: SpotifyEmbedProps) {
  if (!playlistId) return null
  const height = compact ? 152 : 352
  return (
    <div style={{ margin: "1.5rem 0" }}>
      {title && (
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#9a6c2f",
          marginBottom: "0.5rem",
        }}>
          {title}
        </p>
      )}
      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: "8px" }}
        title={title ?? "Spotify playlist"}
      />
    </div>
  )
}
