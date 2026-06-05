# Sessions — Southern Legends

> **TLDR:** Session history, newest first. **Read when:** Need to know what shipped or what's deferred. **Skip if:** you're starting fresh and don't need continuity context.

Newest first.

---

## 2026-06-05 — Video podcast + digital gym essay updates

- Named Wade Allen in the digital gym essay (both SL and homiletics-coach versions)
- Rotated jacksonville-first-umc-pulpit.webp hero photo 90° clockwise (was sideways)
- Created Vercel Blob store (southern-legends-blob, public, IAD1); uploaded both walk video takes
- Added VideoPlayer component for direct MP4 embeds on essay pages
- Wired videoUrl frontmatter field → essay page renders video above audio player
- Updated podcast.xml to use video/mp4 enclosure when videoUrl present (video podcast support)
- Added take2 walk video to digital gym essay frontmatter
- Fixed pre-existing MDX HTML comment bug in interfaith-ministries profile
- Drafted email to Wade Allen sharing the essay (not sent — no email in CRM)
- Next: submit southernlegends.blog/podcast.xml to Spotify and Apple Podcasts

---

## 2026-06-03 — Interfaith photo subjects documented, session close

- Identified people in Shepherd's Table Jan 2025 photo: Stephen LaFollette (April's husband), Caroline LaFollette (April's daughter, Amada Home Services), Cheyenne Mattox (Matt's daughter), Pati Tiller (Arc of Calhoun and Cleburne Counties)
- 4 contacts added to CRM
- Memory saved: `project_interfaith_connections.md`
- Post live on SouthernLegendsAL with OG image; personal share with April tag posted

---

## 2026-06-02 — Open items resolved: Digital Gym published, social posts drafted, HF auto-deploy confirmed

- Digital Gym essay confirmed live at `/journal/the-digital-gym-somatic-practice` (published: true, audio wired)
- VideoPlayer component + videoUrl frontmatter support added to journal pages (ea99f6a)
- HF GitHub auto-deploy confirmed already wired — use `git push` only, never `vercel --prod`
- Dennis shirt Facebook posts drafted (personal + SL page) — ready to post
- Mandi Hackett outreach email drafted (mhackett@publictheater.org, We Shall Someday Project)
- Noccalula Falls shirt CRM task created (#2386, due 2026-07-01, linocut concept)
- Market sig still pending Matt's Downtown Market email address

## 2026-06-02 — Interfaith post, podcast launch, OG system, profile update from transcript

**Southern Legends:**
- Interfaith Ministries profile posted to SL Facebook Page (SouthernLegendsAL) via Meta API
- Profile updated from April LaFollette voice memo transcript: added DME & Recycling section, Integrative Health Coaching section (Linda White, 100-lb story, diabetic story, sleep-first coaching), dental clinic made evergreen
- OG image built (Jean Ellison format: hedcut on white + pine→gold gradient + topo) — auto-wired via `interfaith-ministries-calhoun-county-og.png` slug detection
- FB post reposted with OG image attached; personal share copy drafted (with April tag)
- Podcast RSS feed live at `southernlegends.blog/podcast.xml` — auto-generates from `audioUrl` frontmatter
- Podcast cover art built (triskelion + topo gradient, 3000×3000) saved to `public/images/podcast-cover.jpg`
- `logo.webp` rebuilt without drop shadow
- Transcripts added: Little Caesars.txt + Little Caesars 2.txt (April LaFollette interview + Matt website review memo)

**plainspoken-coach:**
- Southern Legends Facebook Page wired to social-accounts.ts (`FB_SL_PAGE_ID` + `FB_SL_PAGE_TOKEN` in Vercel)
- Correct SL page ID confirmed: `1073679299157824` (not 1657310668645051)

**Next:**
- Spotify for Creators: finish show setup (on basics form), submit RSS
- Apple Podcasts: podcasters.apple.com → add RSS feed
- Generate Brian audio for Interfaith profile → add `audioUrl` to frontmatter
- Record own voice for future episodes

---

## 2026-06-02 — Dennis shirt, merch slots, email sigs, HF updates

**Southern Legends:**
- Dave Dennis shirt launched on Fourthwall ($40) — wired into Freedom Riders profile via MerchBlock
- Tertiary merch slot added to ClosingSection — Freedom Riders + Interfaith now show DD + MC + ICM
- Digital Gym essay draft produced (workflow) — pending save to repo
- merch/freedom-riders/ folder: hedcut, bus woodcut, text PNGs, mockup HTML, Fourthwall copy

**matthewheadley.com email sigs:**
- 8 sigs total at matthewheadley.com/email-signature.html
- Matt: Aisle (hedcut), SermonCoach (hedcut + logo right), SL (flat 2x WebP), Personal (green gradient + topo + venture tiles)
- Heather: Aisle (studio headshot), Florals (studio headshot + sprig logo)
- Iris: The Aisle Concierge (navy, dark)
- Market: placeholder (email TBD)
- All have Gmail image URLs

**Heather Florals site:**
- Nav logo → sprig botanical (deployed via vercel --prod, GitHub auto-deploy NOT wired)
- About + blog headshot → studio photo (heather-headshot.webp)

**Open:**
- Market sig email address TBD
- Digital Gym essay → save to SL repo and publish
- Dennis shirt social post (drafted — personal FB first, SL page second)
- Mandi Hackett outreach (We Shall Someday Project, mhackett@publictheater.org)
- HF GitHub auto-deploy needs wiring
- Noccalula Falls linocut shirt (CRM task: 2026-07-01)

## 2026-06-02 — Dave Dennis shirt launched to Fourthwall + profile

**Shirt live:** https://matt-headley-shop.fourthwall.com/products/dave-dennis-freedom-rider-1961 · $40
**Profile updated:** MerchBlock component wired into Freedom Riders profile with front/back mockup images + FW link
**Deployed:** pushed to main, Vercel auto-deploy triggered

**Social strategy:** post personal first (you met Dennis, lived near the depot), share to SL page second
**Mandi Hackett note:** We Shall Someday Project — she wanted to share the SL profile. Shirt launch is a reason to reach out. Email: mhackett@publictheater.org

## 2026-06-02 — Dave Dennis shirt — assets, text PNGs, vignette, mockup

**Assets produced (`merch/freedom-riders/`):**
- `dennis-hedcut.png` — Gemini hedcut from Jackson mugshot
- `dennis-hedcut-vignette.png` — hedcut with soft edge fade (use this for mockups)
- `bus-woodcut.png` — Gemini woodcut of burning bus, rural setting, no text
- `text-*.png` / `text-white-*.png` — 7 text elements × 2 colorways (dark + white), transparent bg
- `dennis-fourthwall.md` — Fourthwall product copy + HTML description
- `dennis-preview.html` — 4-variant mockup (A/B black, C natural, D white)

**SL merch font standard (confirmed):**
- `Southern Legends` credit = **IM Fell English, italic, uppercase, letter-spacing: 1px, opacity: 0.35–0.55**
- All headline/body text = IM Fell English regular or italic
- Current text PNGs use Georgia as stand-in — re-export with IM Fell English TTF when available

**IM Fell English TTF:** download from Google Fonts, save to `merch/fonts/IMFellEnglish-Regular.ttf` and `IMFellEnglish-Italic.ttf`, then re-run `merch/freedom-riders/export-text.py`

**Open:**
- Confirm copyright clearance with Dennis (or publisher) before listing
- Re-export text PNGs with IM Fell English once TTF is downloaded
- Wire Fourthwall product listing

## 2026-05-31 — Dave Dennis shirt mockup — photo vs. hedcut, design variants

**Shirt concept developed for Freedom Riders profile:**
- Confirmed Mississippi Dept. of Archives and History credit on both mugshot photos — public domain, clear for commercial use
- Source photos: `dave-dennis-768x990.webp` (front only) and `David-Dennis.webp` (diptych front+profile)
- Six variants mocked up at `merch/freedom-riders/dennis-preview.html`: photo only, booking number, quote, diptych, natural colorway, left chest
- Best candidate: **V4 diptych** (front) + burning bus photo on back — but bus photos (AP wire) need copyright clearance before commercial use
- Quote locked: *"I was trying to get a date with a woman."* — Dennis's own words about how he ended up on the Freedom Ride
- Dennis has a 2022 book (*The Movement Made Us* with Dave Dennis Jr.) — collab/clearance conversation worth having given Matt met him in person

**Open:**
- Confirm copyright on bus burning photos before using on merch
- Reach out to Dennis (or his publisher) about shirt collab
- Choose winning variant and send to Madi Lou Boutique

## 2026-05-30 — David Dennis, hedcut, YouTube Shorts, syndication CRM

**Freedom riders profile updated:**
- Added "The Man in the Photo" section — Matt's encounter with David Dennis (Freedom Rider, age 20 in 1961) at Anniston event May 2026. Quote: "I was trying to get a date with a woman."
- Embedded YouTube Short (`Vt_aVzaWuAI`) of the encounter
- Gemini hedcut of Matt + David Dennis generated, watermark stripped, saved as `david-dennis-matt-headley-hedcut.webp`, integrated above video
- Two MOV files transcribed: `david-dennis-freedom-rider.txt` (70s, the photo moment) and `freedom-rider-video-2.txt` (SermonCoach NAAC promo, duplicate)

**VideoEmbed component:**
- Now handles `youtube.com/shorts/` URLs — renders at 9:16 portrait, constrained to `max-w-xs` centered

**YouTube:** SermonCoach promo uploaded via `tools/upload-youtube.py` — ID `rX-RLiERAt8`. Token re-authenticated this session (`yt-token.pickle` refreshed).

**CRM tasks added:**
- Pitch freedom riders → AL.com (due June 6, high)
- Pitch freedom riders → Bitter Southerner (due June 20, after AL.com credit)
- Call Lee Kathryn Evancho — Calhoun Journal, 256-342-6891 (due June 6, high)
- David Dennis hedcut t-shirt → Madi Lou Boutique (due June 6)

**Open:**
- David-alone hedcut for t-shirt (crop photo to just Dennis, re-run Gemini)
- matthewheadley.com broken images — still unidentified

**Closed this addendum:**
- `burning-bus-hedcut.webp` — reference already removed from profile; NPS photo in "The Burning" section is sufficient
- SermonCoach homepage video — `rX-RLiERAt8` already embedded at page.tsx line 721

---

## 2026-05-22 — Transcripts integration + publication pipeline locked

**Scope:** Integrated 6 context transcripts spanning business priorities, profiles, personal essays, and AI psychosis framing.

**Profiles ready to publish (3):**
- **Shannon Jenkins** — live on site, published (editorial decision: keep Tammy & Kyle names for hierarchy specificity + Tammy callback at Called Coffee)
- **Lewis Downing** — raw interview transcript filed; structure: Ending (recent town hall revelation) → RD opening (storefront discovery) → Handoff (pruning shears, Sacred Heart connection) → Farm years (weekly farmers market support)
- **Jared/Called Coffee** — drafted, awaiting subject confirmation

**Journal & Merch:**
- **"No Shade"** — ready to publish this weekend (Easter piece, written + locked)
- **"I Contain Multitudes" t-shirt** — design 1–2 hours, queue for print-on-demand, launch alongside journal post

**Essays in flight (4):**
1. **Chief Ladiga Trail** (SL personal essay) — ready to write-as-you-walk; transcript with coaching prompts filed
2. **Manic Writing** (personal essays section) — first draft complete; next: sit 2–3 days, then pull verbatim Patreon/text/FB artifacts to ground dissonance
3. **Matthew Wilson & Psilocybin** (memoir/personal essay) — raw transcript; framing questions deferred (placement: Substack, not SL); sensitive material flagged
4. **AI Psychosis** (primary book angle) — framework locked (non-linear, open in present, rewind to crisis); needs psychiatrist check-in before drafting scene work; Defying Gravity/music threads ready to weave

**Business decisions (locked):**
- SL + web design = primary revenue streams; speaking/books/merch deferred until platform proven
- Syndication: honor Calhoun Journal commitment; text Donna (Anniston Star) with explicit tiering proposal (SL → Star → Calhoun)
- 3 profiles ready to close out publication gaps (2-week quiet after last post)

**Transcripts filed to project:**
- `/southern-legends/transcripts/2026-04-17-business-priorities-and-assets-session.md` (created this session)
- `/southern-legends/transcripts/2026-05-22-lewis-downing-profile-interview.md` (existing)
- `/southern-legends/transcripts/2026-05-22-book-questions-shannon-profile.md` (existing)
- `/southern-legends/transcripts/2026-05-22-defying-gravity-connection.md` (existing)
- `/southern-legends/transcripts/2026-05-22-ai-psychosis-essay-session.md` (existing)
- `/southern-legends/content/memoir/matthew-wilson-session-transcript.md` (existing)

**Next immediate (this week):** t-shirt design, post "No Shade," confirm Lewis + Jared with subjects.

---

## 2026-05-22 — Voice memo audit + editorial tension memo

Reviewed Feb 15–April 30 voice memo transcripts (39 total, 36 successful). Identified 5 valuable memos worth archiving. Filed the editorial meta-thinking memo (April 15, ~4 min) as a research doc: `content/research/20260415-editorial-journaling-tension-memo.md`. Captures core tension about publishing journals on SL—origin as lead gen, comparison/jealousy block, key realization ("rawness is a filter, not a flaw"), unresolved public vs. private question. Remaining 4 memos prepared for filing: Jacob Craig nonprofit discovery call (CRM), Giovanna Between Worlds meeting (project docs), and two food bank operational discussions (CRM research notes). Text-only analysis provided; await next session for tool-enabled filing.

---

## 2026-05-21 — Merge Claude mobile branches

Merged two Claude mobile branches (`claude/curate-reading-list-bw7oP` and `claude/update-ladoga-hero-image-A6y1i`) into main. The `curate-reading-list` branch added 4 files: BRAND-ARCHITECTURE.md, SOCIAL-RESPONSES.md, an expanded SOCIAL-SHARE-PLAN.md, and `content/research/michelle-hornsby-red-bird-willow.md`. The ladoga branch was already fully on main — nothing to merge. Pushed all 13 pending local commits and deleted both remote Claude branches.

---

## 2026-05-20 — Ciara Smith-Roston: ghost draft + Anniston Star URLs

After the research doc was complete, ran Ghost Mode for the SL profile and produced `content/drafts/ciara-smith-roston-draft.mdx` (~1,650 words). Title: "She Started at Sixteen." Frontmatter set `published: false`, `aiWritten: true`. Two `{/* [OPENING — Matt writes] */}` and `{/* [CLOSING — Matt writes] */}` blocks reserve the farm-visit scene and the grief-inventory return as Matt's vulnerable passages. Body sections: 17th Street Baptist formation, City Hall at sixteen, Ward 3 race, Jay Jenkins resignation room, Draper resigns + Joseph Giri exchange, August victory + mother's "mayor and president" line, the record so far. Three PullQuote accents.

Pulled the Aug 26, 2025 Anniston Star victory piece by Bill Wilson (full quotes now in research doc), then hit rate limits on subsequent fetches. Saved nine Star article URLs into the research doc under "Articles to Pull" with file-naming convention. Discrepancies surfaced: Star says age 28 in Aug 2025 (vs JSU's 26 in May); Star says mayor "May 5" (vs JSU's May 6). Both flagged for interview verification.

Spelling note: name is **Ciara** (not Cierra/Sierra). The Jay Jenkins profile has "Cierra Smith" in the photo caption — needs a typo fix on next revision pass.

Strategy decision (coaching): when reaching out to Ciara, interview first, do not send the draft beforehand. Drafts sent before interviews transfer editorial control. Optional fact-check on specific items after the draft is revised.

---

## 2026-05-20 — Sierra Smith-Roston: research doc completed

Corrected the husband identity in both research docs after Matt clarified: **Jay** is Sierra's husband (former detective; legal name Jamel Roston, confirmed via LinkedIn as Anniston Police Officer). **Jay Jenkins** is the former Ward 1 councilman — a separate person who was both a council colleague to Sierra and a flower customer of Heather's. Earlier seed and handoff docs conflated the two; now corrected throughout.

Ran deep web research (Claude Opus + WebSearch) against the corrected prompt. Compiled `content/research/ciara-smith-roston.md` with: verified biography (born Feb 1999; grandmother Gertrude Nettles raised her; mother Christina Wolff; Anniston High 2017; Spelman; JSU MPA in Emergency Management Dec 2023; Forbes 30 Under 30 2018; Hank Johnson intern at 19; CBCI nominee 2019); full political timeline (Ward 3 runoff vs Ben Little Oct 2020, sworn in Nov 2 2020 at age 21, immediately Vice Mayor; mayor May 6 2025 after Draper's May 1 resignation; 57.31% August 2025 win); the **17th Street Baptist Church formation** (SCLC meetings from age 5 — same church where Rev. Nimrod Q. Reynolds was beaten the day of the 16th Street bombing); the **Ben Little subplot** (beat him twice — 2020 runoff and 2025 mayoral); the **Joseph Giri / Monsanto exchange** at her swearing-in; concrete record (RMC/Orlando Health, police/fire raises, Barber Terrace, CDBG); 15+ verified quotes from Smith, her mother, Gloria Floyd, Debra Foster; 14 cited sources.

Updated through-line: not "outsider conquers institution" but "the child raised in the church where they planned the marches has come back to run the city the marches were against." Six open questions flagged for the interview. Outreach blocker: still need Jay Jenkins to make the introduction.

---

## 2026-05-10 — Byline and JSON-LD author URL swept to Plainspoken Blueprint

Finished the headleyweb.com → plainspokenblueprint.com reference sweep. Prior session caught Footer, ClosingSection, and profile CTAs. This session caught the remaining four files.

**What shipped:**
- `ScrollytellingProfile.tsx`: byline text ("builds websites at headleyweb.com" → "helps local businesses find and say the true thing at plainspokenblueprint.com"); outro credit ("Headley Web & SEO" → "Plainspoken Blueprint")
- `about/page.tsx`: footer credit updated to Plainspoken Blueprint
- `page.tsx` + `essays/[slug]/page.tsx`: JSON-LD `author.url` updated to plainspokenblueprint.com

**Deferred:** Matt writes the PB prose paragraph in `about/page.tsx` (placeholder still in place)

---

## 2026-05-10 — PB Ecosystem crosslinks: footer, ClosingSection, profile CTAs, about page

All Southern Legends references to "Headley Web & SEO" or "matthewheadley.com" replaced with Plainspoken Blueprint.

**What shipped:**
- `Footer.tsx`: "Built by Matt Headley (matthewheadley.com) · Headley Web & SEO" → "Matt Headley (plainspokenblueprint.com) · Plainspoken Blueprint (plainspokenblueprint.com)"
- `ClosingSection.tsx`: author byline updated — "Plainspoken Blueprint" replaces "Headley Web & SEO" link, bio shortened and cleaned
- `src/app/profiles/[slug]/page.tsx`: PB Lead CTAs section added below article, above comments — primary CTA ("Does your business have a story this clear? Let's find it. →" → plainspokenblueprint.com), two secondary CTAs (free digital card + free clarity check)
- `src/app/about/page.tsx`: HW references → PB, contact email → matt@plainspokenblueprint.com, PB scaffold section added with `[Placeholder — Matt writes this]` and "Book a 90-min session →" CTA

**Deferred:**
- Matt writes the PB prose paragraph in `src/app/about/page.tsx` (currently a placeholder)
- Changes need to be committed and deployed

**Next session:**
- Commit all changes and push to trigger Vercel auto-deploy
- Matt fills the PB stub paragraph on the about page

## 2026-06-05 — Video rebuild, logo lockdown, SL outreach drafts, Jacksonville play

**Video:** Rebuilt `sl-ep1-full-v3.mp4` (2:21, 1080x1920) with final SL wordmark burned throughout. Structure: 15s highlights reel (Suno banjo) → 2min talking head (audio preserved) → 7s podcast logo outro. In `/private/tmp/sl-ep1-full-v3.mp4` — pending Spotify upload.

**Logo:** `Southern-Legends-logo-final.png` locked in as canonical SL wordmark. Created in Figma (jDNMVKMeXQVDmGoRW2YuWD). Copied to `matthewheadley-com/public/logos/sl-wordmark-trans.png` and `southern-legends/public/images/sl-wordmark-preview.png`.

**SL outreach:** 7 Gmail drafts created — subscribe invites to Anne Kerr, Robin Arnold, Amber Simpson, Jason Wright (unsubscribed commenters); profile outreach to April LaFollette (profile live link), Aubrey Fullbright, Sarah Woolmaker.

**CRM:** Samuel/Aquality marked done + cleared from briefing. Mike Hindman elevated to HIGH SL candidate (Scotland → Chief Ladiga → divided Civil War family → Nebraska Territory → Jacksonville CDA). Bruce Edminston added (Jacksonville square storefronts). Kevin/Pinhotti Pizza added (Habitat board). Josh Sterns updated (former florist building + cooler + team-up angle). Preston + Kathryn added.

**Jacksonville play:** Financial model built (`/private/tmp/jacksonville-financials.md`) covering bar expo, cooler/event space, and full venue package across all ventures. Mid-case: $6,700/mo net. One call to Josh Sterns unlocks everything.
