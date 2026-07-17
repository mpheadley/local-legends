# Southern Legends — Shipped Features

*Last updated: 2026-07-17. Source of truth for what's built.*

---

## SL Places — City Targeting Engine (2026-07-17)

- **`src/lib/city-businesses.ts`** — 244 AL cities / 6,818 businesses from Gather Circle DB. Exports `CITIES`, `localBusinesses`, `cityToSlug`, `businessToSlug`, `LocalBusiness` type.
- **`/places`** — Curated index + A-Z grid of all 244 cities.
- **`/places/[city]`** — Full city page: Hero, Dispatch (news feed), Circle (business directory + claim CTAs → gatherstudio.app/api/wiki-claim), SL Places, Claim Band, Blueprint pitch, Faith section (Anniston only). JSON-LD ItemList schema.
- **`/places/[city]/[slug]`** — Business detail. ReelStudio video pitch. BridalShowReviews link for wedding/florist categories. JSON-LD LocalBusiness schema.
- **`/places/nominate`** — Nomination form (POST to `/api/places/nominate`).
- **`src/lib/places.ts`** — `SLSponsor`, `SLLegacyPerson`, `SLEvent` types + `getCitySponsor`, `getCityEvents`, `getCityLegacy`, `isBridalCategory` helpers. Seed `SL_SPONSORS`/`SL_LEGACY`/`SL_EVENTS` as data grows.
- **`/api/city-newsletter/subscribe`** — POST `{email, city}` → Resend subscribe + city-tagged welcome email.
- **`/api/sponsorship/apply`** — POST sponsorship inquiry → notify matt@gatherstudio.app.
- **City components:** `CityHouseAd` (dominant-category→venture ad), `CitySponsor` (sponsor banner), `CityLegacy` (Gather Legacy), `CityEvents` (coming up in [City]), `CityNewsletterSignup` (The [City] Letter).
- **profiles/[slug]** — Blueprint Session pitch block injected after article content.
- **Nav** — "Places" in site nav.

## CMS

- **`/api/revalidate`** — POST endpoint for on-demand ISR cache purge. Called by gatherstudio.app CMS admin after every content save. Requires `x-revalidate-secret: <CMS_ADMIN_TOKEN>` header. Returns `{revalidated: true}` on success.

## Content

- **Broken Ground (Essays)** — MDX-driven at `/essays/[slug]`. Nav label "Broken Ground", URL stays `/essays/`. Frontmatter: `title`, `date`, `image`, `imageCaption`, `audioUrl`, `videoUrl`, `youtubeUrl`, `audioDuration`, `excerpt`, `published`, `featured`, `unlisted`, `related`, `cardImage`, `merchImage`, `merchUrl`
- **Profiles** — MDX-driven at `/profiles/[slug]`. Frontmatter: `title`, `slug`, `published`, `listed`, `aiWritten`, `date`, `excerpt`, `image`. `listed:false` = live URL but excluded from index, sitemap, and search. `aiWritten` flag for editorial tracking.
- **Unlisted profile support** — `getServableProfiles()` returns all published profiles (routable); `getAllProfiles()` returns only `listed:true` (shown in index/search/sitemap)
- **Search** — full-text search across essays + profiles
- **Sitemap + robots.txt** — auto-generated

## Media

- **AudioPlayer** — custom scrubber player; auto-renders when `audioUrl` in frontmatter
- **VideoPlayer** — native `<video>` embed; fallback when `videoUrl` present but no `youtubeUrl`
- **YouTube-first video** — essay page prefers `youtubeUrl` frontmatter for the video slot (renders VideoEmbed); falls back to VideoPlayer for blob URLs
- **VideoEmbed** — YouTube / Vimeo iframe embed (lazy-loaded via IntersectionObserver)
- **VideoLoop** — looping silent background video
- **PhotoStrip** — horizontal photo strip component

## Podcast

- **RSS feed** at `/podcast.xml` — itunes-compatible; pulls all essays + profiles with `audioUrl` or `videoUrl`
- **Video podcast support** — `videoUrl` frontmatter → `video/mp4` enclosure (Spotify video); `audioUrl` only → `audio/mpeg`. Episode links in RSS point to `/essays/[slug]`.
- **JournalCard photo layout** — when `image` or `heroImage` present in frontmatter, renders 16:9 photo card; text-only fallback otherwise
- **Blob store** — `southern-legends-blob` (Vercel Blob, public, IAD1) for audio and video assets

## Storage

- **Vercel Blob** — store ID `store_F46wkKj98GIsW4TA`; public bucket; `BLOB_READ_WRITE_TOKEN` in project env
- **Upload script** — `scripts/upload-blob.mjs` — `BLOB_READ_WRITE_TOKEN=xxx node scripts/upload-blob.mjs <file> <pathname>`

## Newsletter Capture — added 2026-06-14
- **Component:** `src/app/components/NewsletterCapture.tsx` — email-only, dark bg (#1C1917), rust accent (#C4622D)
- **Route:** `POST /api/newsletter/subscribe` — adds to Resend audience `bc84e16a-40ed-4e6b-bc6e-1396bcb83a92`; sends welcome email + Matt notification
- **Magazine waitlist flag:** `magazine_waitlist: true` in POST body → notification email tagged "magazine waitlist ✓"
- **Placement:** Homepage (replaces SubscribeCTA) + bottom of every profile page
- **Copy:** "Subscribe and get SL Magazine Issue 1 free when it drops this fall."

## Other Routes

- `/profiles/feed.xml` — profiles RSS
- `/api/content-feed` — content API
- `/api/youtube-stats` — YouTube view/like counts for VideoEmbed
- `/podcast.xml` — podcast RSS (essays + profiles, audio + video)
- `/subscribe` — email signup (Supabase)
- `/api/newsletter/subscribe` — newsletter subscribe → Resend audience bc84e16a
- `/support`, `/colophon`, `/about`, `/search`

## Deploy

- GitHub → Vercel auto-deploy (push = deploy)
- Project: `southern-legends` (`prj_o78QHj3ziy62Rgg1yZnGFt202VQd`)
- Live: southernlegends.blog
