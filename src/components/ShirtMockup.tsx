'use client'

import { useId } from 'react'
import Image from 'next/image'

/**
 * Renders a print design on a blank t-shirt SVG silhouette.
 * Default state for all public merch — hover shows shirt color.
 * Pass shirtColor to show the design already on shirt (vendor/review context).
 */
export type ShirtColor = string // hex or css color

type Props = {
  src: string
  alt: string
  /** Shirt fill color. Defaults to blank (#f5f0e8 cream). */
  shirtColor?: ShirtColor
  /** Width of the shirt mockup in px. Height is auto (aspect ~0.87). */
  size?: number
  /** Extra className on the outer div */
  className?: string
}

// Shirt fill → derived stroke/collar/seam colors
function shirtPalette(color: string) {
  // Dark shirts get light subtle lines, light shirts get dark ones
  const dark = isDark(color)
  return {
    stroke:  dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)',
    collar:  dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)',
    seam:    dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
  }
}

function isDark(hex: string): boolean {
  const c = hex.replace('#', '')
  if (c.length < 6) return false
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}

const BLANK: ShirtColor = '#f5f0e8'

export default function ShirtMockup({ src, alt, shirtColor, size = 320, className }: Props) {
  const uid   = useId().replace(/:/g, '')
  const fill  = shirtColor ?? BLANK
  const dark  = isDark(fill)
  const pal   = shirtPalette(fill)
  const h     = Math.round(size * (460 / 400))

  return (
    <div
      className={className}
      style={{ position: 'relative', width: size, height: h, flexShrink: 0 }}
      aria-label={`${alt} on a ${shirtColor ? 'shirt' : 'blank'} background`}
    >
      {/* T-shirt SVG silhouette */}
      <svg
        viewBox="0 0 400 460"
        width={size}
        height={h}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        style={{ display: 'block', position: 'absolute', inset: 0 }}
      >
        <defs>
          <filter id={`shad-${uid}`} x="-6%" y="-4%" width="112%" height="116%">
            <feDropShadow dx="0" dy="5" stdDeviation="10" floodColor="rgba(0,0,0,0.18)" />
          </filter>
        </defs>
        {/* Body + sleeves */}
        <path
          d="M148,32
             C132,18 82,20 58,48
             L2,90 L36,124
             C78,107 90,126 90,154
             L90,432 L310,432 L310,154
             C310,126 322,107 364,124
             L398,90 L342,48
             C318,20 268,18 252,32
             C238,60 220,74 200,74
             C180,74 162,60 148,32 Z"
          fill={fill}
          stroke={pal.stroke}
          strokeWidth="0.5"
          filter={`url(#shad-${uid})`}
        />
        {/* Collar highlight arc */}
        <path
          d="M152,35 C165,58 183,72 200,72 C217,72 235,58 248,35"
          fill="none"
          stroke={pal.collar}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Sleeve seam lines */}
        <line x1="90" y1="132" x2="90" y2="154" stroke={pal.seam} strokeWidth="1" opacity="0.6" />
        <line x1="310" y1="132" x2="310" y2="154" stroke={pal.seam} strokeWidth="1" opacity="0.6" />
        {/* Very subtle chest crease */}
        <line
          x1="170" y1="160" x2="170" y2="300"
          stroke={dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)'}
          strokeWidth="2"
        />
      </svg>

      {/* Design overlay in chest area */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '27%',
        transform: 'translateX(-50%)',
        width: '55%',
        aspectRatio: '1',
      }}>
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'contain' }}
          sizes={`${Math.round(size * 0.55)}px`}
        />
      </div>
    </div>
  )
}
