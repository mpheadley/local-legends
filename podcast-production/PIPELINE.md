# Southern Legends Podcast — Production Pipeline
*Last updated: 2026-06-08*

---

## Episode Production Sequence

### Step 1 — Record
- Record episode video on iPhone (teleprompter or walk-and-talk)
- Record outro: *"I'm Matt Headley. Thanks for listening to Southern Legends. Y'all take care."*
- Transfer files to `/assets/footage/a-roll/`

### Step 2 — Edit (CapCut)
- Import: intro reel (`sl-intro-reel-v2.mp4`) + episode footage + outro (`sl-outro-v1.mp4`)
- Add captions, cuts, b-roll where needed
- Export: MP4 1080p, filename: `ep[N]-[slug].mp4`

### Step 3 — Run publish script (automates steps 4–8)
```bash
python3 /Volumes/Samsung_T5/webdev/southern-legends/tools/publish-episode.py \
  --video ep1-digital-gym.mp4 \
  --slug the-digital-gym-somatic-practice \
  --title "The Digital Gym: A Somatic Practice" \
  --date 2026-06-02
```

The script does:
- [ ] Extract audio track from video (Matt's voice, no AI)
- [ ] Normalize audio loudness (-16 LUFS)
- [ ] Upload video to Vercel Blob → get URL
- [ ] Upload audio to Vercel Blob → get URL
- [ ] Get file sizes
- [ ] Update MDX frontmatter (audioUrl, videoUrl, mediaSize)
- [ ] Git commit + push → Vercel auto-deploys
- [ ] Ping Spotify RSS refresh endpoint
- [ ] Print YouTube upload reminder

### Step 4 — Clip (required every episode)
Run the clip script to extract the best 45–60s moment as a vertical 9:16 MP4:
```bash
ffmpeg -y -i ep[N].mp4 -ss HH:MM:SS -to HH:MM:SS \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" \
  -c:v libx264 -crf 20 -preset fast -c:a aac -b:a 192k \
  ep[N]-clip.mp4
```
- Use timestamped transcript to find the thesis moment (usually last 60s of content, before outro)
- Upload to Spotify Clips tab (100 char max description)
- Post as FB Reel to SL page with episode link
- Keep clip under 60s for FB Stories compatibility

### Step 5 — Social
- Post FB feed post with YouTube link + essay URL
- Post Option B (building in public) to personal Facebook manually

### Step 5 — Submit (first episode only)
- Spotify: podcasters.spotify.com → already submitted ✓
- Apple Podcasts: podcastsconnect.apple.com → RSS submitted ✓

---

## Assets

| File | Location | Notes |
|---|---|---|
| Intro reel (clips only) | `podcast-production/sl-intro-reel-clips.mp4` | Add audio in script |
| Intro voiceover | `audio/sl-intro-episode.mp3` | Matt's voice |
| Outro (finished) | `assets/footage/sl-outro-v1.mp4` | Voice + banjo, ready |
| Outro voice raw | `audio/sl-outro-voice-matt.m4a` | Raw recording |
| Music bed | `audio/Porchline Drive.mp3` | Suno, Americana funk |
| Music bed (backup) | `audio/Banjo Turnaround.mp3` | Suno, banjo |
| Podcast cover | `public/images/podcast-cover.jpg` | 3000×3000 |
| SL wordmark | `public/images/sl-wordmark-preview.png` | For title cards |

---

## RSS Feed
- URL: `https://southernlegends.blog/podcast.xml`
- Auto-generates from MDX frontmatter fields: `audioUrl`, `videoUrl`, `mediaSize`, `audioDuration`
- Spotify + Apple poll this feed for new episodes
- To force refresh: Spotify → Settings → RSS → Refresh

---

## Frontmatter Fields Per Episode
```yaml
audioUrl: "https://[blob].vercel-storage.com/audio/ep[N]-[slug].mp3"
videoUrl: "https://[blob].vercel-storage.com/video/ep[N]-[slug].mp4"
mediaSize: [bytes]
audioDuration: "MM:SS"
published: true
```
