import Image from "next/image";

/**
 * MattNote — first-person editorial note in Matt's voice, with his hedcut.
 * Use on listicles, profiles, guides to add real local knowledge the data
 * can't carry. Byline is the attribution; no AI-disclosure footer (Matt authored).
 *   <MattNote>Text here...</MattNote>
 */
export default function MattNote({ children }: { children: React.ReactNode }) {
  return (
    <aside
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr",
        gap: "1rem",
        alignItems: "start",
        background: "#fbf7ef",
        border: "1px solid #e6dcc9",
        borderLeft: "4px solid #B8860B",
        borderRadius: "10px",
        padding: "1.1rem 1.25rem",
        margin: "1.75rem 0",
      }}
    >
      <Image
        src="/images/about/headshot-hedcut-matt-headley.webp"
        alt="Matt Headley"
        width={56}
        height={56}
        style={{ borderRadius: "50%", border: "2px solid #1a1712", background: "#fff" }}
      />
      <div>
        <div
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#9A3412",
            fontWeight: 700,
            marginBottom: "0.35rem",
          }}
        >
          Matt&rsquo;s Note
        </div>
        <div style={{ fontSize: "0.98rem", lineHeight: 1.65, color: "#3a2e1e" }}>{children}</div>
      </div>
    </aside>
  );
}
