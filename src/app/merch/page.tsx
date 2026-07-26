'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SHIRTS = [
  {
    id: 'pv-raiders-xc',
    name: 'PV Raiders XC — Pirate Tee',
    tagline: 'Run Like You Stole It.',
    pricePublic: 30,
    priceTeam: 25,
    photo: '/merch/pv-shirt-mockup.webp',
    fundraiser: '25% of every sale donated to the Raiders XC program.',
    featured: true,
  },
  {
    id: 'survived-woodstock',
    name: 'I Survived Woodstock Avenue',
    tagline: 'You ran the hill. You earned it.',
    pricePublic: 30,
    priceTeam: 25,
    photo: '/merch/survived-woodstock.webp',
  },
  {
    id: 'anniston-45',
    name: '45 Years of Running',
    tagline: 'Woodstock 5K · Anniston, AL',
    pricePublic: 30,
    priceTeam: 25,
    photo: '/merch/anniston-45.webp',
  },
  {
    id: 'sl-run',
    name: 'Southern Legends Running',
    tagline: 'NE Alabama on foot.',
    pricePublic: 30,
    priceTeam: 25,
    photo: '/merch/sl-run.webp',
  },
  {
    id: 'raider-road-runners',
    name: 'Raider Road Runners Kids Tee',
    tagline: 'For the next generation.',
    pricePublic: 28,
    priceTeam: 25,
    photo: '/merch/raider-road-runners.webp',
  },
  {
    id: 'clt-trail',
    name: 'Chief Ladiga Trail Tee',
    tagline: "NE Alabama's longest trail.",
    pricePublic: 30,
    priceTeam: 25,
    photo: '/merch/clt-trail.webp',
  },
]

const STICKERS = [
  { id: 'sl-sticker', name: 'Southern Legends Sticker', tagline: 'NE Alabama pride.', price: 4, photo: '/merch/sl-sticker.webp' },
  { id: 'raiders-sticker', name: 'PV Raiders XC Sticker', tagline: 'Run Like You Stole It.', price: 4, photo: '/merch/raiders-sticker.webp' },
  { id: 'woodstock-sticker', name: 'Woodstock 5K Sticker', tagline: 'Anniston, AL · Aug 2.', price: 4, photo: '/merch/woodstock-sticker.webp' },
  { id: 'clt-sticker', name: 'Chief Ladiga Trail Sticker', tagline: 'Bike. Walk. Run.', price: 4, photo: '/merch/clt-sticker.webp' },
]

const SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL']
const BUNDLE_THRESHOLD = 3
const BUNDLE_DISCOUNT = 0.20

type CartItem = { id: string; name: string; size?: string; price: number; qty: number }

export default function MerchPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [size, setSize] = useState<string>('')
  const [teamPrice, setTeamPrice] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])

  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const success = urlParams?.get('success') === '1'

  const shirtCount = cart.filter(i => SHIRTS.find(s => s.id === i.id)).reduce((a, i) => a + i.qty, 0)
  const bundleActive = shirtCount >= BUNDLE_THRESHOLD
  const rawTotal = cart.reduce((a, i) => a + i.price * i.qty, 0)
  const shirtTotal = cart.filter(i => SHIRTS.find(s => s.id === i.id)).reduce((a, i) => a + i.price * i.qty, 0)
  const discount = bundleActive ? Math.round(shirtTotal * BUNDLE_DISCOUNT * 100) / 100 : 0
  const total = rawTotal - discount

  function addToCart(item: CartItem) {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size)
      if (existing) return prev.map(i => i.id === item.id && i.size === item.size ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  function removeFromCart(id: string, size?: string) {
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)))
  }

  function toggleSticker(sticker: typeof STICKERS[0]) {
    const inCart = cart.some(i => i.id === sticker.id)
    if (inCart) removeFromCart(sticker.id)
    else addToCart({ id: sticker.id, name: sticker.name, price: sticker.price, qty: 1 })
  }

  async function checkout() {
    if (cart.length === 0) return
    setLoading(true)
    const res = await fetch('/api/merch/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, bundleDiscount: discount }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setLoading(false)
  }

  return (
    <main id="main-content" className="min-h-screen bg-stone-950 pt-24 pb-16 px-6" style={{ color: 'var(--color-ll-warm)' }}>
      <div className="max-w-5xl mx-auto">

        {success && (
          <div className="mb-8 p-4 rounded-lg border border-green-700 bg-green-950/60 text-green-400 text-sm">
            Pre-order received. We&apos;ll email you when your order ships (approx. 2–3 weeks).
          </div>
        )}

        {/* Pre-order banner */}
        <div className="mb-8 p-4 rounded-lg border text-sm leading-relaxed" style={{ background: 'rgba(154,52,18,.08)', borderColor: 'rgba(154,52,18,.25)', color: 'rgba(240,237,230,.6)' }}>
          <strong style={{ color: 'var(--color-ll-primary)' }}>Pre-order open · Woodstock 5K, Aug 2</strong>
          <br />
          Order online now or find us at the booth. Ships 2–3 weeks after the race.{' '}
          25% of PV Raiders tee sales goes to the Raiders XC program.
        </div>

        {/* Bundle banner */}
        <div className="mb-6 p-4 rounded-lg border text-sm leading-relaxed" style={{ background: 'rgba(202,138,4,.1)', borderColor: 'rgba(202,138,4,.35)', color: 'rgba(240,237,230,.7)' }}>
          <strong style={{ color: 'var(--color-ll-accent)' }}>Bundle deal: 3+ shirts = 20% off all shirts</strong>
          <br />
          Mix any designs. Stickers always $4 each — bundle includes sticker discount too.
          {bundleActive && <span className="text-green-400 ml-2">✓ Bundle active — {shirtCount} shirts in cart</span>}
        </div>

        {/* Header */}
        <div className="mb-9">
          <p className="text-xs tracking-[0.35em] uppercase mb-2.5" style={{ color: 'rgba(240,237,230,.3)' }}>
            Southern Legends · NE Alabama
          </p>
          <h1
            className="text-4xl md:text-5xl font-black leading-none mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Local Merch.
          </h1>
          <p className="text-sm max-w-xl leading-relaxed" style={{ color: 'rgba(240,237,230,.5)' }}>
            Custom shirts, stickers, and trail gear for NE Alabama schools, races, and trails.
            Pre-order online or grab one at the booth — cash, Venmo, or Square.
          </p>
        </div>

        {/* SHIRTS */}
        <p className="text-xs tracking-[0.3em] uppercase mt-10 mb-4" style={{ color: 'rgba(240,237,230,.3)' }}>
          Shirts — $28–$30 · Team/Coach $25
        </p>
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
          {SHIRTS.map((d) => {
            const isSelected = selected === d.id
            const price = teamPrice ? d.priceTeam : d.pricePublic
            const inCart = cart.some(i => i.id === d.id)
            return (
              <div
                key={d.id}
                className="rounded-xl overflow-hidden cursor-pointer transition-colors duration-150"
                style={{
                  background: '#161616',
                  border: `1px solid ${isSelected ? 'var(--color-ll-primary)' : 'rgba(255,255,255,0.08)'}`,
                }}
                onClick={() => { setSelected(isSelected ? null : d.id); setSize('') }}
              >
                <div className="relative aspect-square bg-stone-900 overflow-hidden">
                  <Image
                    src={d.photo}
                    alt={d.name}
                    fill
                    className="object-cover cursor-zoom-in"
                    sizes="(max-width: 640px) 100vw, 320px"
                    onClick={(e) => { e.stopPropagation(); window.open(d.photo, '_blank') }}
                  />
                </div>
                <div className="p-4 pb-5">
                  <div className="flex justify-between items-start mb-1">
                    <h2 className="text-sm font-black leading-tight flex-1 mr-2">{d.name}</h2>
                    <span className="text-base font-black whitespace-nowrap" style={{ color: 'var(--color-ll-primary)' }}>
                      ${price}
                      {bundleActive && <span className="text-green-400 text-xs ml-1">-20%</span>}
                    </span>
                  </div>
                  <p className="text-xs mb-1.5" style={{ color: 'rgba(240,237,230,.4)' }}>{d.tagline}</p>
                  {d.fundraiser && (
                    <p className="text-xs mt-1" style={{ color: 'var(--color-ll-primary)', letterSpacing: '0.04em' }}>
                      {d.fundraiser}
                    </p>
                  )}
                  {inCart && !isSelected && (
                    <p className="text-xs mt-1.5 text-green-400">✓ In cart</p>
                  )}

                  {isSelected && (
                    <div className="mt-3.5" onClick={(e) => e.stopPropagation()}>
                      <p className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(240,237,230,.35)' }}>
                        Select size
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {SIZES.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSize(sz)}
                            className="px-3 py-1 rounded text-xs font-bold transition-colors"
                            style={{
                              border: `1px solid ${size === sz ? 'var(--color-ll-primary)' : 'rgba(255,255,255,.15)'}`,
                              background: size === sz ? 'var(--color-ll-primary)' : 'transparent',
                              color: 'var(--color-ll-warm)',
                            }}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                      <label className="flex items-center gap-1.5 text-xs mb-2.5 cursor-pointer" style={{ color: 'rgba(240,237,230,.4)' }}>
                        <input
                          type="checkbox"
                          checked={teamPrice}
                          onChange={(e) => setTeamPrice(e.target.checked)}
                          style={{ accentColor: 'var(--color-ll-primary)' }}
                        />
                        Team / coach price — ${d.priceTeam}
                      </label>
                      <button
                        disabled={!size}
                        onClick={() => {
                          if (size) {
                            addToCart({ id: d.id, name: d.name, size, price, qty: 1 })
                            setSelected(null)
                            setSize('')
                          }
                        }}
                        className="w-full py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors"
                        style={{
                          background: size ? 'var(--color-ll-primary)' : 'rgba(255,255,255,.07)',
                          color: 'var(--color-ll-warm)',
                          cursor: size ? 'pointer' : 'not-allowed',
                        }}
                      >
                        {size ? `Add to cart — $${price}` : 'Pick a size first'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* STICKERS */}
        <p className="text-xs tracking-[0.3em] uppercase mt-10 mb-4" style={{ color: 'rgba(240,237,230,.3)' }}>
          Stickers — $4 each
        </p>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {STICKERS.map((st) => {
            const inCart = cart.some(i => i.id === st.id)
            return (
              <div
                key={st.id}
                className="rounded-xl overflow-hidden cursor-pointer transition-colors duration-150"
                style={{
                  background: '#161616',
                  border: `1px solid ${inCart ? 'var(--color-ll-accent)' : 'rgba(255,255,255,0.08)'}`,
                }}
                onClick={() => toggleSticker(st)}
              >
                <div className="relative bg-stone-900 overflow-hidden" style={{ aspectRatio: '1', maxHeight: 160 }}>
                  <Image
                    src={st.photo}
                    alt={st.name}
                    fill
                    className="object-contain p-4"
                    sizes="220px"
                  />
                </div>
                <div className="p-4 pb-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-black leading-tight flex-1 mr-2">{st.name}</h3>
                    <span className="text-base font-black whitespace-nowrap" style={{ color: 'var(--color-ll-accent)' }}>
                      ${st.price}
                    </span>
                  </div>
                  <p className="text-xs mb-2.5" style={{ color: 'rgba(240,237,230,.4)' }}>{st.tagline}</p>
                  <button
                    className="w-full py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors"
                    style={{
                      background: inCart ? 'rgba(202,138,4,.2)' : 'rgba(255,255,255,.07)',
                      color: inCart ? 'var(--color-ll-accent)' : 'var(--color-ll-warm)',
                      border: `1px solid ${inCart ? 'rgba(202,138,4,.4)' : 'transparent'}`,
                    }}
                  >
                    {inCart ? '✓ Added' : 'Add'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* CART */}
        {cart.length > 0 && (
          <div className="mt-10 mb-2 p-6 rounded-xl border" style={{ background: '#0f1c13', borderColor: 'rgba(125,206,125,.2)' }}>
            <p className="text-xs font-black tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(240,237,230,.4)' }}>
              Your cart
            </p>
            {cart.map((item) => (
              <div
                key={item.id + (item.size ?? '')}
                className="flex justify-between items-center py-2 text-sm"
                style={{ borderBottom: '1px solid rgba(255,255,255,.06)', color: 'rgba(240,237,230,.7)' }}
              >
                <span>{item.name}{item.size ? ` — ${item.size}` : ''} {item.qty > 1 ? `×${item.qty}` : ''}</span>
                <span className="flex items-center gap-3">
                  <span>${(item.price * item.qty).toFixed(0)}</span>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-base transition-colors hover:text-red-400"
                    style={{ background: 'none', border: 'none', color: 'rgba(240,237,230,.3)', cursor: 'pointer' }}
                  >
                    ×
                  </button>
                </span>
              </div>
            ))}
            {bundleActive && (
              <p className="text-xs text-green-400 mt-1.5">
                Bundle discount (20% off {shirtCount} shirts) — −${discount.toFixed(2)}
              </p>
            )}
            <div className="flex justify-between items-center pt-3 text-base font-black">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              disabled={loading}
              onClick={checkout}
              className="block w-full py-3.5 mt-4 rounded-lg text-sm font-black uppercase tracking-widest transition-opacity disabled:opacity-60"
              style={{ background: 'var(--color-ll-primary)', color: 'var(--color-ll-warm)', cursor: loading ? 'wait' : 'pointer' }}
            >
              {loading ? 'Redirecting to checkout…' : 'Checkout — secure payment'}
            </button>
            <p className="text-center mt-2.5 text-xs" style={{ color: 'rgba(240,237,230,.25)' }}>
              Stripe · Ships 2–3 weeks after race · Shipping address collected at checkout
            </p>
          </div>
        )}

        <hr className="my-12" style={{ borderColor: 'rgba(255,255,255,.06)' }} />

        {/* Footer info */}
        <div className="flex flex-wrap gap-8">
          {[
            { label: 'At the booth', val: 'Cash · Venmo · Square' },
            { label: 'Bundle deal', val: '3+ shirts = 20% off all shirts' },
            { label: 'Team pricing', val: '$25 for athletes & coaches' },
            { label: 'Custom orders', val: 'matt@southernlegends.blog' },
          ].map(({ label, val }) => (
            <div key={label}>
              <p className="text-xs tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(240,237,230,.28)' }}>{label}</p>
              <p className="text-sm" style={{ color: 'rgba(240,237,230,.5)' }}>{val}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <Link
            href="/support"
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: 'rgba(240,237,230,.35)' }}
          >
            Want to support the publication directly? →
          </Link>
        </div>

      </div>
    </main>
  )
}
