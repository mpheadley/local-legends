"use client";
import { useState, useEffect } from "react";

const PIN_KEY = "sl_admin_pin";
const BROWN = "#292524";
const AMBER = "#D97706";
const AMBER_BG = "#FEF3C7";
const CREAM = "#FAFAF7";

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [tab, setTab] = useState<"queue"|"post"|"email"|"ghostwrite">("queue");

  // Queue state
  type Profile = { slug: string; title: string; date: string; published: boolean };
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [queueFilter, setQueueFilter] = useState<"all"|"published"|"drafts">("all");
  const [queueLoading, setQueueLoading] = useState(false);

  // Post state
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [posting, setPosting] = useState(false);
  const [postResult, setPostResult] = useState<string|null>(null);

  // Email state
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string|null>(null);

  // Ghostwriter state
  const [angle, setAngle] = useState("");
  const [writing, setWriting] = useState(false);
  const [ghostPost, setGhostPost] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(PIN_KEY);
    if (saved) { setPin(saved); setAuthed(true); }
  }, []);

  function submitPin() { sessionStorage.setItem(PIN_KEY, pinInput); setPin(pinInput); setAuthed(true); }
  function headers() { return { "Content-Type": "application/json", "x-admin-pin": pin }; }

  async function loadQueue() {
    setQueueLoading(true);
    const r = await fetch("/api/admin/queue", { headers: { "x-admin-pin": pin } });
    const d = await r.json();
    setQueueLoading(false);
    if (d.ok) setProfiles(d.profiles);
  }

  async function postNow() {
    if (!message.trim()) return;
    setPosting(true); setPostResult(null);
    const r = await fetch("/api/admin/fb-post", { method: "POST", headers: headers(), body: JSON.stringify({ message, link: link || undefined }) });
    const d = await r.json();
    setPosting(false);
    if (d.ok) { setPostResult(d.post_url); setMessage(""); setLink(""); }
    else setPostResult("Error: " + d.error);
  }

  async function sendEmail() {
    if (!subject.trim() || !body.trim()) return;
    setSending(true); setSendResult(null);
    const r = await fetch("/api/newsletter/send", { method: "POST", headers: headers(), body: JSON.stringify({ subject, body, secret: pin }) });
    const d = await r.json();
    setSending(false);
    setSendResult(d.ok ? "✓ Broadcast sent." : "Error: " + (d.error ?? "Unknown"));
  }

  async function ghostwrite() {
    if (!angle.trim()) return;
    setWriting(true); setGhostPost("");
    const r = await fetch("/api/admin/ghostwrite", { method: "POST", headers: headers(), body: JSON.stringify({ angle }) });
    const d = await r.json();
    setWriting(false);
    if (d.ok) setGhostPost(d.post);
  }

  if (!authed) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: CREAM }}>
      <div style={{ background: "#fff", border: "1px solid #e5e0d8", borderRadius: 12, padding: 32, width: 320, textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,.06)" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🌿</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: "#78716c", marginBottom: 20 }}>Southern Legends · Admin</div>
        <input type="password" placeholder="PIN" value={pinInput}
          onChange={e => setPinInput(e.target.value)} onKeyDown={e => e.key === "Enter" && submitPin()}
          style={{ width: "100%", background: "#fafaf7", border: "1px solid #d4c9b8", borderRadius: 8, color: BROWN, padding: "10px 14px", fontSize: 18, letterSpacing: 4, textAlign: "center", marginBottom: 12, boxSizing: "border-box" }}
        />
        <button onClick={submitPin} style={{ width: "100%", background: AMBER, color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
          Enter
        </button>
      </div>
    </div>
  );

  const tabs = [
    { key: "queue" as const, label: "📋 Queue" },
    { key: "post" as const, label: "📘 Post" },
    { key: "email" as const, label: "✉ Email" },
    { key: "ghostwrite" as const, label: "✍ Write" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: CREAM, color: BROWN, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #e5e0d8", display: "flex", alignItems: "center", gap: 10, background: "#fff" }}>
        <span>🌿</span>
        <span style={{ fontWeight: 700, fontSize: 16, fontFamily: "Georgia, serif" }}>Southern Legends</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#a8a29e" }}>southernlegends.blog</span>
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #e5e0d8", padding: "0 16px", background: "#fff" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: "12px 14px", background: "none", border: "none",
            borderBottom: `2px solid ${tab===t.key ? AMBER : "transparent"}`,
            color: tab===t.key ? BROWN : "#a8a29e", cursor: "pointer", fontWeight: tab===t.key ? 700 : 400, fontSize: 13,
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: 20 }}>

        {/* Queue */}
        {tab === "queue" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#a8a29e" }}>Profile Queue</div>
              <button onClick={loadQueue} disabled={queueLoading} style={{ background: AMBER_BG, border: `1px solid ${AMBER}`, color: AMBER, borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                {queueLoading ? "Loading…" : "↻ Refresh"}
              </button>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {(["all","published","drafts"] as const).map(f => (
                <button key={f} onClick={() => setQueueFilter(f)} style={{ background: queueFilter===f ? AMBER : "#fff", border: "1px solid #e5e0d8", color: queueFilter===f ? "#fff" : "#78716c", borderRadius: 5, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{f}</button>
              ))}
            </div>
            {profiles.length === 0 && !queueLoading && (
              <div style={{ color: "#a8a29e", fontSize: 13, textAlign: "center", padding: 32 }}>Click Refresh to load profiles</div>
            )}
            {profiles
              .filter(p => queueFilter === "all" ? true : queueFilter === "published" ? p.published : !p.published)
              .map(p => (
                <div key={p.slug} style={{ background: "#fff", border: "1px solid #e5e0d8", borderRadius: 8, padding: "10px 13px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: BROWN, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                    <div style={{ fontSize: 11, color: "#a8a29e", marginTop: 2 }}>{p.date} · <span style={{ color: p.published ? "#16a34a" : AMBER }}>{p.published ? "Published" : "Draft"}</span></div>
                  </div>
                  <button onClick={() => { setMessage(`${p.title}\n\nhttps://southernlegends.blog/profiles/${p.slug}`); setLink(`https://southernlegends.blog/profiles/${p.slug}`); setTab("post"); }} style={{ background: AMBER, color: "#fff", border: "none", borderRadius: 5, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>
                    Post →
                  </button>
                </div>
              ))}
          </div>
        )}

        {/* Post */}
        {tab === "post" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#a8a29e" }}>Facebook Post</div>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Write your post…"
              style={{ background: "#fff", border: "1px solid #e5e0d8", borderRadius: 8, color: BROWN, padding: "10px 12px", fontSize: 14, lineHeight: 1.6, minHeight: 140, resize: "vertical", fontFamily: "Georgia, serif", width: "100%", boxSizing: "border-box" }}
            />
            <div style={{ fontSize: 11, color: "#a8a29e", textAlign: "right" }}>{message.length} chars</div>
            <input value={link} onChange={e => setLink(e.target.value)} placeholder="Link (optional)"
              style={{ background: "#fff", border: "1px solid #e5e0d8", borderRadius: 8, color: BROWN, padding: "9px 12px", fontSize: 13, width: "100%", boxSizing: "border-box" }}
            />
            <button onClick={postNow} disabled={posting || !message.trim()} style={{ background: posting ? "#e5e0d8" : AMBER, color: posting ? "#a8a29e" : "#fff", border: "none", borderRadius: 8, padding: "11px 0", fontWeight: 700, fontSize: 14, cursor: posting ? "default" : "pointer" }}>
              {posting ? "⏳ Posting…" : "🚀 Post to Facebook"}
            </button>
            {postResult && (
              <div style={{ background: postResult.startsWith("Error") ? "#fef2f2" : "#f0fdf4", border: `1px solid ${postResult.startsWith("Error") ? "#fecaca" : "#bbf7d0"}`, borderRadius: 8, padding: "10px 14px", fontSize: 13 }}>
                {postResult.startsWith("Error") ? postResult : <><span style={{ color: "#16a34a" }}>✓ Posted! </span><a href={postResult} target="_blank" style={{ color: AMBER }}>View on Facebook →</a></>}
              </div>
            )}
          </div>
        )}

        {/* Email */}
        {tab === "email" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#a8a29e" }}>Newsletter Broadcast</div>
            <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject line"
              style={{ background: "#fff", border: "1px solid #e5e0d8", borderRadius: 8, color: BROWN, padding: "9px 12px", fontSize: 14, fontWeight: 600, width: "100%", boxSizing: "border-box" }}
            />
            <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Email body (plain text or HTML)…"
              style={{ background: "#fff", border: "1px solid #e5e0d8", borderRadius: 8, color: BROWN, padding: "10px 12px", fontSize: 13, lineHeight: 1.7, minHeight: 220, resize: "vertical", fontFamily: "Georgia, serif", width: "100%", boxSizing: "border-box" }}
            />
            <button onClick={sendEmail} disabled={sending || !subject.trim() || !body.trim()} style={{ background: sending ? "#e5e0d8" : BROWN, color: "#fff", border: "none", borderRadius: 8, padding: "11px 0", fontWeight: 700, fontSize: 14, cursor: sending ? "default" : "pointer" }}>
              {sending ? "⏳ Sending…" : "✉ Send Broadcast"}
            </button>
            {sendResult && (
              <div style={{ background: sendResult.startsWith("Error") ? "#fef2f2" : "#f0fdf4", border: `1px solid ${sendResult.startsWith("Error") ? "#fecaca" : "#bbf7d0"}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: sendResult.startsWith("Error") ? "#dc2626" : "#16a34a" }}>
                {sendResult}
              </div>
            )}
          </div>
        )}

        {/* Ghostwriter */}
        {tab === "ghostwrite" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#a8a29e" }}>Caption Ghostwriter</div>
            <div style={{ fontSize: 12, color: "#78716c", lineHeight: 1.5 }}>Describe the story angle. Returns a warm, narrative Facebook caption in the Southern Legends voice.</div>
            <textarea value={angle} onChange={e => setAngle(e.target.value)} placeholder="e.g. 'Jay Jenkins has run the same hardware store in Anniston for 38 years and still keeps the key to every house he's ever sold'"
              style={{ background: "#fff", border: "1px solid #e5e0d8", borderRadius: 8, color: BROWN, padding: "10px 12px", fontSize: 13, lineHeight: 1.6, minHeight: 80, resize: "vertical", fontFamily: "Georgia, serif", width: "100%", boxSizing: "border-box" }}
            />
            <button onClick={ghostwrite} disabled={writing || !angle.trim()} style={{ background: writing ? "#e5e0d8" : AMBER_BG, border: `1px solid ${AMBER}`, color: writing ? "#a8a29e" : AMBER, borderRadius: 8, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: writing ? "default" : "pointer" }}>
              {writing ? "⏳ Writing…" : "✍ Draft Caption"}
            </button>
            {ghostPost && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ background: "#fff", border: "1px solid #e5e0d8", borderRadius: 8, padding: "14px 16px", fontSize: 14, lineHeight: 1.7, fontFamily: "Georgia, serif", color: BROWN, whiteSpace: "pre-wrap" }}>{ghostPost}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setMessage(ghostPost); setTab("post"); }} style={{ flex: 1, background: AMBER, color: "#fff", border: "none", borderRadius: 7, padding: "9px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Use This →</button>
                  <button onClick={() => navigator.clipboard.writeText(ghostPost)} style={{ background: "#fff", border: "1px solid #e5e0d8", color: "#78716c", borderRadius: 7, padding: "9px 14px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Copy</button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
