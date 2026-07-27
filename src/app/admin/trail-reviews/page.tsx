"use client"

import { useEffect, useState } from "react"

type Review = {
  id: string
  trail_slug: string
  name: string
  rating: number
  title: string | null
  body: string
  date_hiked: string | null
  conditions: string | null
  difficulty_felt: string | null
  approved: boolean
  created_at: string
}

const AMBER = "#D97706"
const DARK = "#1C1917"
const CREAM = "#FAFAF7"

function Stars({ r }: { r: number }) {
  return <span>{[1,2,3,4,5].map(i => <span key={i} style={{color: i<=r?"#CA8A04":"#555"}}>★</span>)}</span>
}

export default function TrailReviewsAdmin() {
  const [pin, setPin] = useState("")
  const [pinInput, setPinInput] = useState("")
  const [authed, setAuthed] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [status, setStatus] = useState<"pending"|"approved">("pending")
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("sl_admin_pin")
    if (saved) { setPin(saved); setAuthed(true) }
  }, [])

  useEffect(() => {
    if (authed) fetchReviews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, status])

  const login = () => {
    localStorage.setItem("sl_admin_pin", pinInput)
    setPin(pinInput)
    setAuthed(true)
  }

  const fetchReviews = async () => {
    setLoading(true)
    const r = await fetch(`/api/admin/trail-reviews?status=${status}`, {
      headers: { "x-admin-pin": pin }
    })
    const d = await r.json()
    setReviews(d.reviews ?? [])
    setLoading(false)
  }

  const act = async (id: string, approved: boolean) => {
    await fetch("/api/admin/trail-reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({ id, approved })
    })
    setMsg(approved ? "Approved ✓" : "Rejected ✓")
    setReviews(r => r.filter(x => x.id !== id))
    setTimeout(() => setMsg(""), 2000)
  }

  const del = async (id: string) => {
    if (!confirm("Delete this review?")) return
    await fetch("/api/admin/trail-reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({ id })
    })
    setReviews(r => r.filter(x => x.id !== id))
  }

  if (!authed) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:DARK}}>
      <div style={{background:"#292524",padding:"2rem",borderRadius:"8px",minWidth:"280px"}}>
        <p style={{color:CREAM,marginBottom:"1rem",fontWeight:600}}>Trail Reviews Admin</p>
        <input type="password" placeholder="PIN" value={pinInput} onChange={e=>setPinInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&login()}
          style={{width:"100%",padding:"0.5rem",marginBottom:"1rem",borderRadius:"4px",border:"1px solid #555",background:"#1C1917",color:CREAM}} />
        <button onClick={login} style={{width:"100%",background:AMBER,color:"#000",padding:"0.5rem",borderRadius:"4px",border:"none",cursor:"pointer",fontWeight:600}}>
          Enter
        </button>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:"100vh",background:DARK,padding:"2rem",color:CREAM}}>
      <div style={{maxWidth:"800px",margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"2rem"}}>
          <h1 style={{fontSize:"1.5rem",fontWeight:700}}>Trail Reviews</h1>
          <div style={{display:"flex",gap:"0.5rem"}}>
            {(["pending","approved"] as const).map(s => (
              <button key={s} onClick={()=>setStatus(s)}
                style={{padding:"0.4rem 1rem",borderRadius:"4px",border:`1px solid ${status===s?AMBER:"#555"}`,
                  background:status===s?AMBER:"transparent",color:status===s?"#000":CREAM,cursor:"pointer",textTransform:"capitalize"}}>
                {s}
              </button>
            ))}
            <button onClick={fetchReviews} style={{padding:"0.4rem 0.8rem",borderRadius:"4px",border:"1px solid #555",background:"transparent",color:CREAM,cursor:"pointer"}}>
              ↻
            </button>
          </div>
        </div>

        {msg && <div style={{background:"#166534",color:"#DCFCE7",padding:"0.75rem 1rem",borderRadius:"6px",marginBottom:"1rem"}}>{msg}</div>}

        {loading ? <p style={{color:"#999"}}>Loading…</p> : reviews.length === 0 ? (
          <p style={{color:"#999"}}>No {status} reviews.</p>
        ) : reviews.map(r => (
          <div key={r.id} style={{background:"#292524",borderRadius:"8px",padding:"1.5rem",marginBottom:"1rem",border:"1px solid #3D3530"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.5rem"}}>
              <div>
                <span style={{fontWeight:600}}>{r.name}</span>
                <span style={{color:"#999",fontSize:"0.8rem",marginLeft:"0.75rem"}}>{r.trail_slug}</span>
                <span style={{marginLeft:"0.75rem"}}><Stars r={r.rating} /></span>
              </div>
              <span style={{color:"#777",fontSize:"0.75rem"}}>{new Date(r.created_at).toLocaleDateString()}</span>
            </div>
            {r.title && <p style={{fontWeight:600,marginBottom:"0.25rem"}}>{r.title}</p>}
            <p style={{color:"#ccc",fontSize:"0.9rem",lineHeight:1.6,marginBottom:"0.75rem"}}>{r.body}</p>
            {(r.conditions || r.difficulty_felt || r.date_hiked) && (
              <div style={{display:"flex",gap:"1rem",fontSize:"0.75rem",color:"#888",marginBottom:"0.75rem"}}>
                {r.date_hiked && <span>Hiked: {r.date_hiked}</span>}
                {r.conditions && <span>Conditions: {r.conditions}</span>}
                {r.difficulty_felt && <span>Felt: {r.difficulty_felt}</span>}
              </div>
            )}
            <div style={{display:"flex",gap:"0.5rem"}}>
              {!r.approved && (
                <button onClick={()=>act(r.id,true)}
                  style={{padding:"0.35rem 1rem",background:"#166534",color:"#DCFCE7",border:"none",borderRadius:"4px",cursor:"pointer",fontWeight:600}}>
                  Approve
                </button>
              )}
              {r.approved && (
                <button onClick={()=>act(r.id,false)}
                  style={{padding:"0.35rem 1rem",background:"#713F12",color:"#FEF3C7",border:"none",borderRadius:"4px",cursor:"pointer"}}>
                  Unapprove
                </button>
              )}
              <button onClick={()=>del(r.id)}
                style={{padding:"0.35rem 1rem",background:"#7F1D1D",color:"#FECACA",border:"none",borderRadius:"4px",cursor:"pointer"}}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
