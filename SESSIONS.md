# Sessions — Southern Legends

> **TLDR:** Session history, newest first. **Read when:** Need to know what shipped or what's deferred. **Skip if:** you're starting fresh and don't need continuity context.

Newest first.

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
