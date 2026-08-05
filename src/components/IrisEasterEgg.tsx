'use client'
import { useEffect, useState } from 'react'

export default function IrisEasterEgg() {
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try { if (sessionStorage.getItem('sl_iris_egg_seen')) return } catch {}
    const t = setTimeout(() => {
      setShow(true)
      setVisible(true)
      const hide = setTimeout(() => {
        setVisible(false)
        setTimeout(() => setShow(false), 800)
        try { sessionStorage.setItem('sl_iris_egg_seen', '1') } catch {}
      }, 3500)
      return () => clearTimeout(hide)
    }, 60000)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null
  return (
    <div style={{
      position: 'fixed', bottom: 16, right: 16, zIndex: 9999,
      pointerEvents: 'none', transition: 'opacity 0.8s ease',
      opacity: visible ? 0.85 : 0,
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/iris-cat-cheshire.gif" alt="" width={120} height={120}
        style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }} />
    </div>
  )
}
