interface Props {
  slug: string;
  name: string;
  teaser: string;
  image?: string;
}

export default function NextProfileCard({ slug, name, teaser, image }: Props) {
  return (
    <section
      style={{
        background: "#0d1a13",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "3rem 1.5rem",
      }}
    >
      <p
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(250,250,247,0.4)",
          marginBottom: "1rem",
        }}
      >
        Next Story
      </p>
      <a
        href={`/profiles/${slug}`}
        style={{
          display: "flex",
          gap: "1.25rem",
          alignItems: "center",
          textDecoration: "none",
          maxWidth: "680px",
        }}
      >
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            width={80}
            height={80}
            style={{
              borderRadius: "8px",
              objectFit: "cover",
              flexShrink: 0,
              width: "80px",
              height: "80px",
            }}
          />
        )}
        <div>
          <div
            style={{
              fontFamily: "var(--font-heading, Georgia, serif)",
              fontSize: "1.2rem",
              color: "#FAFAF7",
              marginBottom: "0.4rem",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: "rgba(250,250,247,0.5)",
              lineHeight: 1.65,
            }}
          >
            {teaser}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#C4622D",
              marginTop: "0.5rem",
            }}
          >
            Read →
          </div>
        </div>
      </a>
    </section>
  );
}
