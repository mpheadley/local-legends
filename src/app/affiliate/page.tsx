'use client'
import { useState } from 'react'

const REGISTRY_API = 'https://gather-registry.vercel.app/api/affiliate'

const COMMISSION_TIERS = [
  { label: 'Shirts & Prints', pct: '10%', example: '$3.50 per shirt sold' },
  { label: 'Stickers', pct: '15%', example: '$0.75 per sticker' },
  { label: 'Advent Kit', pct: '20%', example: '$9.80 per kit sold' },
  { label: 'Bookshop.org orders', pct: '10%', example: 'via Bookshop affiliate ID' },
]

export default function AffiliateSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [handle, setHandle] = useState('')
  const [platform, setPlatform] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ code: string; link: string } | null>(null)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(REGISTRY_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          venture: 'southern-legends',
          notes: handle ? `${platform || 'social'}: ${handle}` : '',
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setResult({
        code: data.code,
        link: `https://southernlegends.blog/r/${data.code}`,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Email matt@southernlegends.blog.')
    }
    setLoading(false)
  }

  return (
    <main style={{ background: '#1C1917', color: '#FAFAF7', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '5rem 1.5rem 5rem' }}>

        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CA8A04', marginBottom: '1rem', opacity: 0.8 }}>
          Southern Legends · Partner Program
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, lineHeight: 1.1, marginBottom: '1rem' }}>
          Earn when you share the South.
        </h1>
        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(250,250,247,0.65)', marginBottom: '2.5rem', maxWidth: '50ch' }}>
          Share Southern Legends merch, books, and the Ecclesia Resource Shop — earn a commission on every sale. One link, every product.
        </p>

        {/* Commission table */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(250,250,247,0.08)', borderRadius: 8, padding: '1.25rem 1.5rem', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CA8A04', marginBottom: '0.75rem' }}>
            Commissions
          </p>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {COMMISSION_TIERS.map(t => (
              <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'rgba(250,250,247,0.75)' }}>{t.label}</span>
                <span style={{ fontSize: '0.85rem', color: '#CA8A04', fontWeight: 700 }}>{t.pct} <span style={{ fontWeight: 400, color: 'rgba(250,250,247,0.35)', fontSize: '0.78rem' }}>— {t.example}</span></span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.72rem', color: 'rgba(250,250,247,0.3)', marginTop: '1rem', lineHeight: 1.5 }}>
            Paid monthly via Venmo or PayPal once you hit $10. No minimum traffic. No approval process.
          </p>
        </div>

        {result ? (
          <div style={{ background: 'rgba(34,85,34,0.2)', border: '1px solid rgba(100,200,100,0.25)', borderRadius: 8, padding: '1.5rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4ade80', marginBottom: '0.75rem' }}>
              You&rsquo;re in.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(250,250,247,0.8)', marginBottom: '1rem' }}>
              Your affiliate code: <strong style={{ color: '#CA8A04', fontSize: '1rem' }}>{result.code}</strong>
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 6, padding: '0.75rem 1rem', marginBottom: '1rem', wordBreak: 'break-all' }}>
              <p style={{ fontSize: '0.78rem', color: 'rgba(250,250,247,0.4)', marginBottom: '0.3rem' }}>Your link</p>
              <p style={{ fontSize: '0.9rem', color: '#CA8A04' }}>{result.link}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <button
                onClick={() => navigator.clipboard.writeText(result.link)}
                style={{ padding: '0.6rem 1.25rem', background: '#CA8A04', color: '#1C1917', border: 'none', borderRadius: 5, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Copy link
              </button>
              <a
                href={`https://gather-registry.vercel.app/affiliate/dashboard?code=${result.code}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '0.6rem 1.25rem', background: 'rgba(255,255,255,0.08)', color: '#FAFAF7', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 5, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}
              >
                View dashboard →
              </a>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(250,250,247,0.35)', lineHeight: 1.6 }}>
              Share it on social, in a newsletter, or anywhere you talk about the South. I&rsquo;ll email you monthly with what moved. Questions: matt@southernlegends.blog
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(250,250,247,0.5)', marginBottom: '0.35rem' }}>Your name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="First Last"
                required
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(250,250,247,0.12)', borderRadius: 5, color: '#FAFAF7', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(250,250,247,0.5)', marginBottom: '0.35rem' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(250,250,247,0.12)', borderRadius: 5, color: '#FAFAF7', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(250,250,247,0.5)', marginBottom: '0.35rem' }}>Social handle (optional)</label>
                <input
                  type="text"
                  value={handle}
                  onChange={e => setHandle(e.target.value)}
                  placeholder="@yourhandle"
                  style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(250,250,247,0.12)', borderRadius: 5, color: '#FAFAF7', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(250,250,247,0.5)', marginBottom: '0.35rem' }}>Platform</label>
                <select
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', background: '#2a2320', border: '1px solid rgba(250,250,247,0.12)', borderRadius: 5, color: '#FAFAF7', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                >
                  <option value="">Select...</option>
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>Newsletter</option>
                  <option>YouTube</option>
                  <option>Blog</option>
                  <option>TikTok</option>
                  <option>Podcast</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {error && <p style={{ fontSize: '0.8rem', color: '#f87171' }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{ padding: '0.85rem 2rem', background: '#9A3412', color: '#FAFAF7', border: 'none', borderRadius: 5, fontSize: '0.9rem', fontWeight: 700, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1, alignSelf: 'flex-start' }}
            >
              {loading ? 'Working...' : 'Get my link →'}
            </button>
            <p style={{ fontSize: '0.72rem', color: 'rgba(250,250,247,0.3)', lineHeight: 1.5 }}>
              No pitch to affiliates. No quota. No expiry. Share when you want.
            </p>
          </form>
        )}

        <div style={{ marginTop: '3rem', padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(250,250,247,0.06)', borderRadius: 8 }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'rgba(250,250,247,0.7)' }}>Already have a code?</p>
          <a
            href="https://gather-registry.vercel.app/affiliate/dashboard"
            style={{ fontSize: '0.82rem', color: '#CA8A04', textDecoration: 'none' }}
          >
            View your dashboard → gather-registry.vercel.app/affiliate/dashboard
          </a>
        </div>
      </div>
    </main>
  )
}
