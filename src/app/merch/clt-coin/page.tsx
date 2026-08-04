'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FINISHES = [
  { id: 'brushed-brass',  label: 'Brushed Brass',   price: 25, desc: 'Zinc+copper alloy · warm gold tone · standard' },
  { id: 'antiqued-brass', label: 'Antiqued Brass',   price: 25, desc: 'Chemical patina · aged look · collector finish' },
  { id: 'stainless',      label: 'Stainless Steel',  price: 28, desc: '316L stainless · mirror polished · lifetime wear' },
  { id: 'gold-plated',    label: 'Gold Plated',       price: 35, desc: 'Brass base · 14K gold plate · premium' },
  { id: 'dark-patina',    label: 'Dark Patina',       price: 25, desc: 'Oxidized brass · black-brown · rugged' },
]

const SPECS = [
  '40mm diameter',
  '3mm thick',
  'Reeded edge',
  'Front: CLT badge + SL triskelion',
  'Back: Trail route Anniston→Piedmont',
  'Die-struck · heavy · collectible',
  'Ships 3–4 weeks after order',
]

export default function CLTCoinPage() {
  const [finish, setFinish] = useState(FINISHES[0])
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function checkout() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/merch/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: [{
            id: `clt-coin-2032-${finish.id}`,
            name: `CLT Commemorative Coin — 2032 · ${finish.label}`,
            price: finish.price,
            qty,
          }],
        }),
      })
      const { url, error: err } = await res.json()
      if (err || !url) throw new Error(err || 'Checkout failed')
      window.location.href = url
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--color-ll-dark)', color: 'var(--color-ll-warm)' }}>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: '38vh', background: 'linear-gradient(155deg, #06130a 0%, #1a2e12 100%)' }}>
        <div aria-hidden="true" className="grid-topo absolute inset-0 opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to bottom, transparent, var(--color-ll-dark))' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-12">
          <Link href="/merch" className="text-xs tracking-widest opacity-40 hover:opacity-70 transition-opacity mb-6 inline-block">← MERCH</Link>
          <h1 className="text-4xl font-black mb-3" style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--color-ll-gold)' }}>
            CLT Commemorative Coin
          </h1>
          <p className="text-sm tracking-widest opacity-50 mb-1">CHIEF LADIGA TRAIL · 1832–2032 · 200 YEAR ANNIVERSARY</p>
          <p className="text-sm opacity-60">A heavy, die-struck collectible marking 200 years of the trail. Front face: CLT badge and the Southern Legends triskelion. Back: the full trail route from Anniston to Piedmont.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-24 pt-8">

        {/* Coin image */}
        <div className="flex justify-center mb-10">
          <div className="relative w-48 h-48 rounded-full overflow-hidden" style={{ border: '2px solid rgba(201,162,39,0.3)' }}>
            <Image
              src="/merch/clt-coin-face.png"
              alt="CLT Commemorative Coin — 2032"
              fill
              className="object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
        </div>

        {/* Finish picker */}
        <div className="mb-8">
          <h2 className="text-xs tracking-widest opacity-50 mb-4">CHOOSE YOUR FINISH</h2>
          <div className="grid gap-3">
            {FINISHES.map((f) => (
              <button
                key={f.id}
                onClick={() => setFinish(f)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all"
                style={{
                  border: `1px solid ${finish.id === f.id ? 'rgba(201,162,39,0.8)' : 'rgba(255,255,255,0.1)'}`,
                  background: finish.id === f.id ? 'rgba(201,162,39,0.08)' : 'rgba(255,255,255,0.03)',
                }}
              >
                <div>
                  <div className="text-sm font-semibold mb-0.5" style={{ color: finish.id === f.id ? '#C9A227' : 'var(--color-ll-warm)' }}>
                    {f.label}
                  </div>
                  <div className="text-xs opacity-50">{f.desc}</div>
                </div>
                <div className="text-lg font-black ml-4 shrink-0" style={{ fontFamily: 'Fraunces, Georgia, serif', color: '#C9A227' }}>
                  ${f.price}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Qty + checkout */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-9 h-9 rounded flex items-center justify-center text-sm transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}
            >−</button>
            <span className="w-8 text-center text-sm font-semibold">{qty}</span>
            <button
              onClick={() => setQty(q => Math.min(10, q + 1))}
              className="w-9 h-9 rounded flex items-center justify-center text-sm transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}
            >+</button>
          </div>
          <button
            onClick={checkout}
            disabled={loading}
            className="flex-1 py-3 rounded-lg font-bold text-sm tracking-wide transition-all"
            style={{
              background: loading ? 'rgba(201,162,39,0.3)' : '#C9A227',
              color: '#06130a',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'REDIRECTING…' : `PREORDER ${qty > 1 ? `${qty}× ` : ''}${finish.label.toUpperCase()} — $${finish.price * qty}`}
          </button>
        </div>

        {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

        <p className="text-xs opacity-30 mb-10">Secure checkout via Stripe. Ships 3–4 weeks after your order. US shipping included.</p>

        {/* Specs */}
        <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-xs tracking-widest opacity-50 mb-4">SPECS</h2>
          <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
            {SPECS.map((s) => (
              <li key={s} className="text-xs opacity-60 flex items-start gap-2">
                <span style={{ color: '#C9A227' }}>·</span> {s}
              </li>
            ))}
          </ul>
        </div>

        {/* 3D viewer link */}
        <div className="mt-10 text-center">
          <a
            href="http://localhost:7720/gather/assets/topo-coin-viewer.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest transition-opacity hover:opacity-80"
            style={{ color: '#C9A227', opacity: 0.5 }}
          >
            VIEW 3D COIN RENDER →
          </a>
        </div>

      </div>
    </main>
  )
}
