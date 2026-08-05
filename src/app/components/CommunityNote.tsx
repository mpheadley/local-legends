import { Link } from "next-view-transitions";

interface Note {
  author: string;
  city?: string;
  text: string;
}

/**
 * CommunityNote — reader/contributor knowledge, plus an "add yours" capture.
 * Notes come from the ContributorNotes pipeline (Turso) once wired; until then
 * pass them inline via `notes`. Always renders the invitation (F0 capture).
 *   <CommunityNote subject="Baptist churches" notes={[{author:"...",text:"..."}]} />
 */
export default function CommunityNote({
  subject = "this list",
  notes = [],
}: {
  subject?: string;
  notes?: Note[];
}) {
  return (
    <aside
      style={{
        background: "#f4f1ea",
        border: "1px solid #e0d8cc",
        borderRadius: "10px",
        padding: "1.1rem 1.25rem",
        margin: "1.5rem 0",
      }}
    >
      <div
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#3D6B4F",
          fontWeight: 700,
          marginBottom: "0.6rem",
        }}
      >
        🫂 Community Notes
      </div>

      {notes.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {notes.map((n, i) => (
            <div key={i} style={{ fontSize: "0.94rem", lineHeight: 1.6, color: "#3a2e1e" }}>
              <span>&ldquo;{n.text}&rdquo;</span>
              <span style={{ display: "block", fontSize: "0.78rem", color: "#7a6a55", marginTop: "0.2rem" }}>
                — {n.author}
                {n.city ? `, ${n.city}` : ""}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "#5a4a38", margin: 0 }}>
          No community notes on {subject} yet. You know these places better than any dataset does.
        </p>
      )}

      <div style={{ marginTop: "0.9rem" }}>
        <Link
          href="/nominate"
          style={{
            display: "inline-block",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#fff",
            background: "#3D6B4F",
            borderRadius: "6px",
            padding: "0.5rem 0.9rem",
            textDecoration: "none",
          }}
        >
          Add your note →
        </Link>
      </div>
    </aside>
  );
}
