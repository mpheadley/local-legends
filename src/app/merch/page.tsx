'use client'

import { useState } from 'react'

const SHIRTS = [
  {
    id: 'pv-raiders-xc',
    name: 'PV Raiders XC — Pirate Tee',
    tagline: 'Run Like You Stole It.',
    pricePublic: 30,
    priceTeam: 25,
    photo: '/merch/pv-shirt-mockup.webp',
    badge: '/merch/pv-raiders-xc.webp',
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
    badge: '/merch/survived-woodstock.webp',
  },
  {
    id: 'anniston-45',
    name: '45 Years of Running',
    tagline: 'Woodstock 5K · Anniston, AL',
    pricePublic: 30,
    priceTeam: 25,
    photo: '/merch/anniston-45.webp',
    badge: '/merch/anniston-45.webp',
  },
  {
    id: 'sl-run',
    name: 'Southern Legends Running',
    tagline: 'NE Alabama on foot.',
    pricePublic: 30,
    priceTeam: 25,
    photo: '/merch/sl-run.webp',
    badge: '/merch/sl-run.webp',
  },
  {
    id: 'raider-road-runners',
    name: 'Raider Road Runners Kids Tee',
    tagline: 'For the next generation.',
    pricePublic: 28,
    priceTeam: 25,
    photo: '/merch/raider-road-runners.webp',
    badge: '/merch/raider-road-runners.webp',
  },
  {
    id: 'clt-trail',
    name: 'Chief Ladiga Trail Tee',
    tagline: 'NE Alabama\'s longest trail.',
    pricePublic: 30,
    priceTeam: 25,
    photo: '/merch/clt-trail.webp',
    badge: '/merch/clt-trail.webp',
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

const s = {
  page: { background: '#0d0d0d', minHeight: '100vh', padding: '60px 24px', color: '#f5f0e8', fontFamily: 'sans-serif' } as React.CSSProperties,
  wrap: { maxWidth: 1060, margin: '0 auto' } as React.CSSProperties,
  preorderBanner: { background: 'rgba(204,32,32,.08)', border: '1px solid rgba(204,32,32,.25)', borderRadius: 10, padding: '14px 20px', marginBottom: 36, fontSize: 13, color: 'rgba(245,240,232,.6)', lineHeight: 1.7 } as React.CSSProperties,
  bundleBanner: { background: 'rgba(202,138,4,.1)', border: '1px solid rgba(202,138,4,.35)', borderRadius: 10, padding: '14px 20px', marginBottom: 24, fontSize: 13, color: 'rgba(245,240,232,.7)', lineHeight: 1.7 } as React.CSSProperties,
  successBanner: { background: '#1a3a1a', border: '1px solid #2d6a2d', borderRadius: 8, padding: '16px 24px', marginBottom: 40, color: '#7dce7d', fontSize: 14 } as React.CSSProperties,
  header: { marginBottom: 36 } as React.CSSProperties,
  eyebrow: { fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'rgba(245,240,232,.3)', marginBottom: 10 },
  h1: { fontSize: 44, fontWeight: 900, lineHeight: 1.1, marginBottom: 12 } as React.CSSProperties,
  subhead: { color: 'rgba(245,240,232,.5)', fontSize: 15, maxWidth: 560, lineHeight: 1.65 } as React.CSSProperties,
  sectionLabel: { fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(245,240,232,.3)', marginBottom: 16, marginTop: 40 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 20 } as React.CSSProperties,
  stickerGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 } as React.CSSProperties,
  card: (active: boolean): React.CSSProperties => ({ background: '#161616', border: `1px solid ${active ? '#cc2020' : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'border-color .15s' }),
  stickerCard: (inCart: boolean): React.CSSProperties => ({ background: '#161616', border: `1px solid ${inCart ? '#ca8a04' : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'border-color .15s' }),
  photoBox: { background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1', overflow: 'hidden' } as React.CSSProperties,
  stickerPhotoBox: { background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1', overflow: 'hidden', maxHeight: 160 } as React.CSSProperties,
  body: { padding: '16px 16px 20px' } as React.CSSProperties,
  titleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 } as React.CSSProperties,
  cardTitle: { fontSize: 14, fontWeight: 900, lineHeight: 1.2, flex: 1, marginRight: 8 } as React.CSSProperties,
  priceTag: { fontSize: 16, fontWeight: 900, color: '#cc2020', whiteSpace: 'nowrap' as const },
  goldPrice: { fontSize: 16, fontWeight: 900, color: '#ca8a04', whiteSpace: 'nowrap' as const },
  tagline: { fontSize: 12, color: 'rgba(245,240,232,.4)', marginBottom: 6 } as React.CSSProperties,
  fundraiserLine: { fontSize: 11, color: '#cc2020', letterSpacing: '0.04em', marginTop: 4 } as React.CSSProperties,
  expandSection: { marginTop: 14 } as React.CSSProperties,
  sizeLabel: { fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(245,240,232,.35)', marginBottom: 8 },
  sizeRow: { display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginBottom: 12 },
  sizeBtn: (active: boolean): React.CSSProperties => ({ padding: '5px 12px', borderRadius: 6, border: `1px solid ${active ? '#cc2020' : 'rgba(255,255,255,.15)'}`, background: active ? '#cc2020' : 'transparent', color: '#f5f0e8', fontSize: 12, fontWeight: 700, cursor: 'pointer' }),
  teamPriceRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 12, color: 'rgba(245,240,232,.4)' } as React.CSSProperties,
  buyBtn: (ready: boolean): React.CSSProperties => ({ width: '100%', padding: '11px 0', background: ready ? '#cc2020' : 'rgba(255,255,255,.07)', color: '#f5f0e8', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase' as const, cursor: ready ? 'pointer' : 'not-allowed' }),
  addStickerBtn: (inCart: boolean): React.CSSProperties => ({ width: '100%', padding: '9px 0', background: inCart ? 'rgba(202,138,4,.2)' : 'rgba(255,255,255,.07)', color: inCart ? '#ca8a04' : '#f5f0e8', border: `1px solid ${inCart ? 'rgba(202,138,4,.4)' : 'transparent'}`, borderRadius: 8, fontSize: 12, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase' as const, cursor: 'pointer' }),
  cartBox: { background: '#0f1c13', border: '1px solid rgba(125,206,125,.2)', borderRadius: 12, padding: '24px', marginTop: 40, marginBottom: 8 } as React.CSSProperties,
  cartTitle: { fontSize: 13, fontWeight: 900, letterSpacing: '.2em', textTransform: 'uppercase' as const, color: 'rgba(245,240,232,.4)', marginBottom: 16 },
  cartRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,.06)', fontSize: 13, color: 'rgba(245,240,232,.7)' } as React.CSSProperties,
  cartTotal: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0 0', fontSize: 15, fontWeight: 900, color: '#f5f0e8' } as React.CSSProperties,
  discountLine: { fontSize: 12, color: '#7dce7d', marginTop: 6 } as React.CSSProperties,
  checkoutBtn: { display: 'block', width: '100%', padding: '14px 0', background: '#cc2020', color: '#f5f0e8', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 900, letterSpacing: '.1em', textTransform: 'uppercase' as const, cursor: 'pointer', marginTop: 16 } as React.CSSProperties,
  divider: { height: 1, background: 'rgba(255,255,255,.06)', margin: '48px 0 32px' } as React.CSSProperties,
  footer: { display: 'flex', gap: 32, flexWrap: 'wrap' as const } as React.CSSProperties,
  footerLabel: { fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase' as const, color: 'rgba(245,240,232,.28)', marginBottom: 5 },
  footerVal: { fontSize: 13, color: 'rgba(245,240,232,.5)' } as React.CSSProperties,
}

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
      const key = item.id + (item.size ?? '')
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
    <main style={s.page}>
      <div style={s.wrap}>

        {success && (
          <div style={s.successBanner}>
            Pre-order received. We'll email you when your order ships (approx. 2–3 weeks).
          </div>
        )}

        <div style={s.preorderBanner}>
          <strong style={{ color: '#cc2020' }}>Pre-order open · Woodstock 5K, Aug 2</strong>
          <br />
          Order online now or find us at the booth. Ships 2–3 weeks after the race.
          25% of PV Raiders tee sales goes to the Raiders XC program.
        </div>

        <div style={s.bundleBanner}>
          <strong style={{ color: '#ca8a04' }}>Bundle deal: 3+ shirts = 20% off all shirts</strong>
          <br />
          Mix any designs. Stickers always $4 each — bundle includes sticker discount too.
          {bundleActive && <span style={{ color: '#7dce7d', marginLeft: 8 }}>✓ Bundle active — {shirtCount} shirts in cart</span>}
        </div>

        <div style={s.header}>
          <p style={s.eyebrow}>Southern Legends · NE Alabama</p>
          <h1 style={s.h1}>Local Merch.</h1>
          <p style={s.subhead}>
            Custom shirts, stickers, and trail gear for NE Alabama schools, races, and trails.
            Pre-order online or grab one at the booth — cash, Venmo, or Square.
          </p>
        </div>

        {/* SHIRTS */}
        <p style={s.sectionLabel}>Shirts — $28–$30 · Team/Coach $25</p>
        <div style={s.grid}>
          {SHIRTS.map((d) => {
            const isSelected = selected === d.id
            const price = teamPrice ? d.priceTeam : d.pricePublic
            const inCart = cart.some(i => i.id === d.id)
            return (
              <div key={d.id} style={s.card(isSelected)} onClick={() => { setSelected(isSelected ? null : d.id); setSize('') }}>
                <div style={s.photoBox}>
                  <img
                    src={d.photo}
                    alt={d.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }}
                    onClick={(e) => { e.stopPropagation(); window.open(d.photo, '_blank') }}
                    onError={(e) => { const t = e.target as HTMLImageElement; t.src = d.badge; t.style.objectFit = 'contain'; t.style.padding = '24px' }}
                  />
                </div>
                <div style={s.body}>
                  <div style={s.titleRow}>
                    <h2 style={s.cardTitle}>{d.name}</h2>
                    <span style={s.priceTag}>${price}{bundleActive && <span style={{ color: '#7dce7d', fontSize: 11, marginLeft: 4 }}>-20%</span>}</span>
                  </div>
                  <p style={s.tagline}>{d.tagline}</p>
                  {d.fundraiser && <p style={s.fundraiserLine}>{d.fundraiser}</p>}
                  {inCart && !isSelected && <p style={{ fontSize: 11, color: '#7dce7d', marginTop: 6 }}>✓ In cart</p>}

                  {isSelected && (
                    <div style={s.expandSection} onClick={(e) => e.stopPropagation()}>
                      <p style={s.sizeLabel}>Select size</p>
                      <div style={s.sizeRow}>
                        {SIZES.map((sz) => (
                          <button key={sz} onClick={() => setSize(sz)} style={s.sizeBtn(size === sz)}>{sz}</button>
                        ))}
                      </div>
                      <div style={s.teamPriceRow}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                          <input type="checkbox" checked={teamPrice} onChange={(e) => setTeamPrice(e.target.checked)} style={{ accentColor: '#cc2020' }} />
                          Team / coach price — ${d.priceTeam}
                        </label>
                      </div>
                      <button
                        disabled={!size}
                        onClick={() => { if (size) { addToCart({ id: d.id, name: d.name, size, price, qty: 1 }); setSelected(null); setSize('') } }}
                        style={s.buyBtn(!!size)}
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
        <p style={s.sectionLabel}>Stickers — $4 each</p>
        <div style={s.stickerGrid}>
          {STICKERS.map((st) => {
            const inCart = cart.some(i => i.id === st.id)
            return (
              <div key={st.id} style={s.stickerCard(inCart)} onClick={() => toggleSticker(st)}>
                <div style={s.stickerPhotoBox}>
                  <img src={st.photo} alt={st.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }}
                    onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
                </div>
                <div style={s.body}>
                  <div style={s.titleRow}>
                    <h3 style={{ ...s.cardTitle, fontSize: 13 }}>{st.name}</h3>
                    <span style={s.goldPrice}>${st.price}</span>
                  </div>
                  <p style={s.tagline}>{st.tagline}</p>
                  <button style={s.addStickerBtn(inCart)}>{inCart ? '✓ Added' : 'Add'}</button>
                </div>
              </div>
            )
          })}
        </div>

        {/* CART */}
        {cart.length > 0 && (
          <div style={s.cartBox}>
            <p style={s.cartTitle}>Your cart</p>
            {cart.map((item) => (
              <div key={item.id + (item.size ?? '')} style={s.cartRow}>
                <span>{item.name}{item.size ? ` — ${item.size}` : ''} {item.qty > 1 ? `×${item.qty}` : ''}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span>${(item.price * item.qty).toFixed(0)}</span>
                  <button onClick={() => removeFromCart(item.id, item.size)} style={{ background: 'none', border: 'none', color: 'rgba(245,240,232,.3)', cursor: 'pointer', fontSize: 16 }}>×</button>
                </span>
              </div>
            ))}
            {bundleActive && (
              <div style={s.discountLine}>
                Bundle discount (20% off {shirtCount} shirts) — −${discount.toFixed(2)}
              </div>
            )}
            <div style={s.cartTotal}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button disabled={loading} onClick={checkout} style={s.checkoutBtn}>
              {loading ? 'Redirecting to checkout…' : 'Checkout — secure payment'}
            </button>
            <p style={{ fontSize: 11, color: 'rgba(245,240,232,.25)', textAlign: 'center', marginTop: 10 }}>
              Stripe · Ships 2–3 weeks after race · Shipping address collected at checkout
            </p>
          </div>
        )}

        <div style={s.divider} />

        <div style={s.footer}>
          <div><p style={s.footerLabel}>At the booth</p><p style={s.footerVal}>Cash · Venmo · Square</p></div>
          <div><p style={s.footerLabel}>Bundle deal</p><p style={s.footerVal}>3+ shirts = 20% off all shirts</p></div>
          <div><p style={s.footerLabel}>Team pricing</p><p style={s.footerVal}>$25 for athletes & coaches</p></div>
          <div><p style={s.footerLabel}>Custom orders</p><p style={s.footerVal}>matt@southernlegends.blog</p></div>
        </div>

      </div>
    </main>
  )
}
