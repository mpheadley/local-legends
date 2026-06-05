# Southern Legends — Shipped Features

*Last updated: 2026-06-05. Source of truth for what's built.*

---

## Content

- **Essays / Journal** — MDX-driven at `/essays/[slug]`. Frontmatter: `title`, `date`, `image`, `imageCaption`, `audioUrl`, `videoUrl`, `audioDuration`, `excerpt`, `published`, `featured`, `unlisted`, `related`, `cardImage`, `merchImage`, `merchUrl`
- **Profiles** — MDX-driven at `/profiles/[slug]`
- **Search** — full-text search across essays + profiles
- **Sitemap + robots.txt** — auto-generated

## Media

- **AudioPlayer** — custom scrubber player; auto-renders when `audioUrl` in frontmatter
- **VideoPlayer** — native `<video>` embed; auto-renders when `videoUrl` in frontmatter (above audio player)
- **VideoEmbed** — YouTube / Vimeo iframe embed (lazy-loaded via IntersectionObserver)
- **VideoLoop** — looping silent background video
- **PhotoStrip** — horizontal photo strip component

## Podcast

- **RSS feed** at `/podcast.xml` — itunes-compatible; pulls all essays + profiles with `audioUrl` or `videoUrl`
- **Video podcast support** — `videoUrl` frontmatter → `video/mp4` enclosure type; `audioUrl` → `audio/mpeg`
- **Blob store** — `southern-legends-blob` (Vercel Blob, public, IAD1) for audio and video assets

## Storage

- **Vercel Blob** — store ID `store_F46wkKj98GIsW4TA`; public bucket; `BLOB_READ_WRITE_TOKEN` in project env
- **Upload script** — `scripts/upload-blob.mjs` — `BLOB_READ_WRITE_TOKEN=xxx node scripts/upload-blob.mjs <file> <pathname>`

## Other Routes

- `/profiles/feed.xml` — profiles RSS
- `/api/content-feed` — content API
- `/api/youtube-stats` — YouTube view/like counts for VideoEmbed
- `/podcast.xml` — podcast RSS (essays + profiles, audio + video)
- `/subscribe` — email signup (Supabase)
- `/support`, `/colophon`, `/about`, `/search`

## Deploy

- GitHub → Vercel auto-deploy (push = deploy)
- Project: `southern-legends` (`prj_o78QHj3ziy62Rgg1yZnGFt202VQd`)
- Live: southernlegends.blog
