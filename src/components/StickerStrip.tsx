'use client'

import Link from 'next/link'
import Image from 'next/image'

const STICKERS = [
  { id: 'clt-sticker',                 photo: '/merch/clt-sticker.webp',                       name: 'Chief Ladiga Trail',   rot: -4  },
  { id: 'woodstock-sticker',           photo: '/merch/woodstock-sticker.webp',                  name: 'Woodstock 5K',         rot:  3  },
  { id: 'fort-mcclellan-sticker',      photo: '/merch/fort-mcclellan-sticker.png',              name: 'Fort McClellan',       rot: -6  },
  { id: 'lickskillet-ox-sticker',      photo: '/merch/lickskillet-ox-sticker.png',              name: 'Lickskillet Ox',       rot:  5  },
  { id: 'pinhoti-sticker',             photo: '/merch/pinhoti-badge-sticker.png',               name: 'Pinhoti Trail',        rot: -3  },
  { id: 'blossom-decay-sticker',       photo: '/merch/blossom-and-decay-sticker.png',           name: 'Blossom & Decay',      rot:  7  },
  { id: 'green-thumbs-club-sticker',   photo: '/merch/green-thumbs-club-sticker.webp',          name: 'Green Thumbs Club',    rot: -5  },
  { id: 'coldwater-sticker',           photo: '/merch/coldwater-badge-sticker.png',             name: 'Coldwater',            rot:  2  },
  { id: 'ecclesia-coin-sticker-photoreal', photo: '/merch/ecclesia-coin-sticker-photoreal-v2.png', name: 'Ecclesia Coin',    rot: -8  },
  { id: 'bipolar-proud-sticker',       photo: '/merch/bipolar-proud-sticker.png',               name: 'Bipolar & Proud',      rot:  4  },
  { id: 'i-contain-multitudes-sticker',photo: '/merch/i-contain-multitudes-sticker.png',        name: 'Multitudes',           rot: -2  },
]

export default function StickerStrip() {
  return (
    <div style={{
      background: '#0a120d',
      borderTop: '1px solid rgba(154,108,47,.12)',
      borderBottom: '1px solid rgba(154,108,47,.12)',
      padding: '18px 0',
      overflowX: 'auto',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '0 20px',
        width: 'max-content',
      }}>
        <span style={{
          fontSize: '10px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(154,108,47,.5)',
          marginRight: '10px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          Grab a sticker →
        </span>

        {STICKERS.map((s) => (
          <Link
            key={s.id}
            href={`/buy/${s.id}`}
            title={`${s.name} — $5`}
            style={{
              display: 'inline-block',
              flexShrink: 0,
              transform: `rotate(${s.rot}deg)`,
              transition: 'transform .15s ease, filter .15s ease',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.45))',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = `rotate(${s.rot * 0.3}deg) scale(1.12)`
              el.style.filter = 'drop-shadow(0 4px 12px rgba(0,0,0,.6))'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = `rotate(${s.rot}deg)`
              el.style.filter = 'drop-shadow(0 2px 6px rgba(0,0,0,.45))'
            }}
          >
            <Image
              src={s.photo}
              alt={s.name}
              width={70}
              height={70}
              style={{ width: '70px', height: '70px', objectFit: 'contain', display: 'block' }}
              unoptimized
            />
          </Link>
        ))}

        <Link
          href="/merch#stickers"
          style={{
            flexShrink: 0,
            marginLeft: '8px',
            fontSize: '11px',
            color: 'rgba(202,138,4,.6)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            borderLeft: '1px solid rgba(154,108,47,.2)',
            paddingLeft: '14px',
          }}
        >
          All stickers $5 →
        </Link>
      </div>
    </div>
  )
}
