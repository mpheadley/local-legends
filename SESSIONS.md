# Sessions — Southern Legends

> **TLDR:** Session history, newest first. **Read when:** Need to know what shipped or what's deferred. **Skip if:** you're starting fresh and don't need continuity context.

Newest first.

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
