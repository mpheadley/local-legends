# Southern Legends Podcast — Marketing & Growth Plan
*Created 2026-06-22 · Episodes 1–3 live*

---

## Show Identity

**Southern Legends** is the audio version of the same editorial project: profiles of people building something in Northeast Alabama, told in Matt's voice, with the question underneath every story — what kept you going?

**Format:** Solo narration. Matt reads his own writing. No guests, no interview format — the podcast IS the profile, in audio.

**Length:** 12–20 minutes per episode (roughly one profile)

**Cadence:** Every 2 weeks (matching the SL 1-profile-per-2-weeks sustainable pace)

**Existing episodes:**
- Ep1 — The Digital Gym (digital-gym)
- Ep2 — Freedom Riders (freedom-riders)
- Ep3 — The Hospital (the-hospital)

---

## Upgrade Priorities (do these now)

### 1. Intro/Outro Reels — DONE
- `sl-intro.mp4` — 18-second Ken Burns montage, Porchline Drive bed, SL wordmark fade
- `sl-outro.mp4` — 14-second closing montage

### 2. Show Notes Template
Every episode needs:
- 2-paragraph episode summary (who, what, why it matters)
- 3-5 chapter markers with timestamps
- Link to the SL profile on southernlegends.blog
- 1 cross-link to a related SL profile or essay
- CTA: "Subscribe wherever you listen" + southernlegends.blog

### 3. Podcast Cover Art
- Current: `podcast-cover.jpg` — check if it's sized correctly (3000×3000px, JPEG)
- If not: generate new cover at 3000×3000 with correct padding for Apple/Spotify preview

### 4. RSS Feed Health
- Ensure `sl-intro-episode.mp3` is correct for the RSS feed format
- Add all three existing episodes to the RSS feed with proper metadata
- Submit to: Apple Podcasts, Spotify for Podcasters, Amazon Music, Pocket Casts

---

## Distribution Platform Setup

### Apple Podcasts (PRIMARY)
- Submit via: podcasters.apple.com
- Requires: RSS feed URL + Apple ID
- SL RSS: southernlegends.blog/podcast/feed.xml (verify this exists)
- Review: 1–5 business days

### Spotify
- Submit via: podcasters.spotify.com
- Instant after RSS submission
- Dashboard: full analytics, listener location, episode performance

### YouTube
- Each episode: upload full audio with a still image (podcast cover or episode hero photo)
- Use `publish-episode.py` flow already in pipeline
- Add chapter markers in description

### SL Website
- `/podcast` page — episode grid, embedded player, subscribe links
- Already built per CLAUDE.md — verify it's live at southernlegends.blog/podcast

---

## Marketing Strategy

### 1. Social (Matt posts manually — NOT Iris)

**Instagram (@southernlegends or @matthewheadley)**
- Release day: audiogram clip (30 sec) — one strong line from the episode
- Day 3: pull quote image (the money line from the profile)
- Day 7: "still reading" — link to the full written profile

**Facebook**
- Full episode card + Spotify link
- Tag subject if they have a Facebook page (with permission)

**Stories/Reels**
- 30-60 sec audiogram using the Ken Burns reel style
- Caption: "New episode — [name of subject]. Available wherever you listen."

### 2. Email List
- Episode launch: one-email blast to SL subscribers
- Subject: "New Southern Legends episode: [Subject Name]"
- Body: story hook (first 2 sentences of the profile) + episode link + subscribe CTA

### 3. SL Website Cross-promotion
- Every profile page: embed the podcast episode if one exists
- Every essay: "Also available as a podcast episode" if relevant
- Homepage: "Listen to Southern Legends" callout below profiles grid

### 4. The Aisle Connection
- SL podcast = storytelling credibility for The Aisle
- Add SL podcast as a feature on Matt's Aisle vendor profile
- "The storyteller behind The Aisle" — cross-reference in Aisle copy

### 5. Farmers Market / Local
- Have a QR card at the market: "Listen to Southern Legends"
- QR → southernlegends.blog/podcast
- Natural conversation starter: "I write profiles of local builders — Sam from Aquality is Episode 1"

### 6. Southern Legends Guest Outreach
- After each profile publishes + episode drops:
  - Send the subject their episode link
  - Ask them to share with their audience
  - This multiplies reach with zero cost
  - Template: "Your episode is live. If you share it with your people, I'll put it in the show notes as the 'Subject's favorite episode.'"

---

## Episode Production (updated pipeline with new reels)

```
Record (iPhone, teleprompter or walk-and-talk)
  ↓
Adobe Podcast Enhance (free — ai.podcast.adobe.com)
  ↓
CapCut assembly:
  - sl-intro.mp4 (18 sec)
  - Enhanced episode audio
  - sl-outro.mp4 (14 sec)
  ↓
Export: 1080p MP4
  ↓
python3 tools/publish-episode.py [flags]
  ↓
Upload to YouTube (chapter markers in description)
  ↓
RSS auto-updates → Apple + Spotify pick it up within 24h
```

---

## The Multiple Podcasts Question

**Recommendation: one podcast, three formats.**

Rather than launching 3 separate podcast feeds (SL, PB, Tend), launch one feed — **Southern Legends** — with three episode types:

| Type | Format | Example |
|------|--------|---------|
| **Profile** | Matt reads his written profile | "The Digital Gym" |
| **Conversation** | Matt in dialogue with a subject | Jay Jenkins on community |
| **Essay** | Matt reads his personal writing | "The Hospital" |

This keeps the feed growing faster (more types of content = more release opportunities), doesn't fragment the audience, and lets Matt test what resonates before spinning up dedicated feeds.

**When to spin up a second feed:**
- 20+ SL episodes live AND
- A second venture (Plainspoken Blueprint, Tend) has 5+ episodes worth of content AND
- A real weekly audience is proven (1,000+ monthly listeners)

**Future candidates (in priority order):**
1. **Plainspoken Blueprint** — message coaching interviews + frameworks. Gather Studio content.
2. **Tend** — marriage conversation episodes. Could be Matt + Heather format.
3. **Farmers Market** — hyper-local, season-based (April-October). Very small but tight audience.

---

## Growth Milestones

| Milestone | Target |
|-----------|--------|
| All 3 existing eps on Apple + Spotify | Jul 1, 2026 |
| New episode with updated intro/outro | Jul 15, 2026 |
| 100 monthly listeners | Aug 1, 2026 |
| Episode 6 live | Sep 1, 2026 |
| 500 monthly listeners | Nov 1, 2026 |
| Episode 12 live | Jan 1, 2027 |
| First "Conversation" episode | Feb 1, 2027 |

---

## Metrics (monthly check)

- Apple Podcasts: unique listeners, plays, follows
- Spotify: streams, listeners, follows
- YouTube: views, watch time, subscribers
- Website: /podcast page traffic

**One KPI to watch:** Episode follows-to-plays ratio. If people follow but don't play, the description/title isn't landing. If people play but don't follow, the ending CTA needs work.

---

*Update this plan when an episode ships, a platform is added, or a milestone is hit.*
