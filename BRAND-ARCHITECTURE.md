# Brand Architecture

**Purpose:** Decisions about when SL is the canonical home for a piece vs. when a piece earns its own domain. Captures reasoning so future cases don't get re-litigated.

**Last updated:** April 2026.

---

## Default: SL is the home

Every profile, journal piece, and essay lives canonically at `southernlegends.blog`. No dedicated domain. No microsite.

This default holds for the overwhelming majority of pieces — Lewis Downing, Jean Ellison, Shannon Jenkins, Anniston Museums, Aquality Farms, the journal essays. They draw their meaning from being part of one body of work. Splitting them off would dilute SL.

---

## Exception: long-horizon projects with a discrete arc

A piece earns a dedicated domain only when **all three** are true:

1. **Multi-year arc.** The project has a horizon beyond a single profile — a book, a series, an anniversary, an ongoing investigation.
2. **Discrete audience beyond SL readers.** The piece reaches a community SL doesn't otherwise serve (hikers, Indigenous-history readers, a specific local subculture).
3. **Physical or off-platform presence.** Stickers, T-shirts, signage, event programs — anything that puts a URL on a physical surface and benefits from a memorable single-purpose domain.

If only one or two of these hold, stay on SL. Dedicated domains have a maintenance and brand-fragmentation cost; only pay it when the project warrants it.

---

## Current dedicated-domain projects

### Chief Ladiga Trail (2032 book project)

- **SL profile:** `southernlegends.blog/profiles/chief-ladiga-trail` (published April 25, 2026)
- **Dedicated domains owned:**
  - `chiefladiga.org` (preferred — institutional/historical register fits the subject)
  - `chiefladiga.com` (redirect; locks the namespace)
- **Redirect target (current):** `https://southernlegends.blog/profiles/chief-ladiga-trail` — 301 permanent, both domains.
- **Why this qualifies:**
  - Multi-year arc — 200th anniversary in 2032 is the named horizon.
  - Discrete audience — hikers, Indigenous-history readers, NE Alabama / NW Georgia trail community.
  - Physical merch — stickers and T-shirts already in print circulation.
- **Print URL going forward:** `chiefladiga.org` (drop the `https://` and `www.` — bare domain reads cleanest on physical surfaces).
- **Existing stickers/shirts** with `southernlegends.blog` are not waste — those still work. The shift to `chiefladiga.org` applies to the *next* run forward.

---

## Architecture phases

A dedicated domain goes through phases as the project matures. Don't skip phases.

### Phase 1 — Redirect only *(current Chief Ladiga state)*

Domain redirects to the SL profile. SL is canonical. The dedicated domain is just a memorable front door.

**Cost:** ~$12–24/year for domain renewal. No build.
**Why this is enough early:** Brand-building works through name recognition long before site content is needed. Years of stickers and shirts pointing at `chiefladiga.org` builds equity in the name. The destination doesn't have to be impressive yet.

### Phase 2 — Microsite *(eventual, not yet)*

A dedicated minimal site at the domain. Hero image, summary, link to the SL profile, possibly a newsletter signup specific to the project.

**Trigger:** When the body of work outgrows what one SL profile can hold. For Chief Ladiga, this might be: a follow-up piece with the Muscogee Nation, a multi-part series on the trail's history, a book draft that needs a teaser landing page.

**Architecture flip:** Once a microsite exists, the dedicated domain becomes canonical. The SL profile cross-links to it as "originally published on Southern Legends" or "see the full project at chiefladiga.org."

### Phase 3 — Full project site *(book launch territory)*

A real site for the project — chapters, supporting material, events, merch, mailing list. SL becomes a sister project rather than the parent.

**Trigger:** Book deal signed, or the project has earned an independent identity.

---

## When to NOT do this

Even when a piece feels significant, resist the urge to spin off a domain unless the three criteria are met. Examples that should stay on SL:

- **Profile subjects who become friends.** Lewis Downing, Shannon Jenkins, Jean Ellison — they're profiled, the relationship continues, but the project doesn't need its own site.
- **Multi-part series within SL** that don't have an external audience or merch. Stay on SL with internal cross-links and a tag/category page.
- **A journal essay that lands well.** Even No Shade or I'm Not Going to Disappear — these belong on SL canonically. A book of journal essays might eventually warrant its own domain (per BOOK-DIRECTIONS.md), but individual pieces don't.

---

## The honest architecture question (revisit periodically)

For each piece in the SL ecosystem, ask once a year: *Has this earned a dedicated domain by now?*

If two-of-three criteria are now true, consider buying the namespace and redirecting (Phase 1) — domains are cheap, and locking the namespace early prevents squatters and protects future optionality. Don't build past Phase 1 until the work warrants it.

---

## Design follows writing, not the other way around

The same logic that governs domains governs visual identity — maps, illustrations, merch designs, custom typography for a piece. **The writing comes first. The design serves it.**

The Chief Ladiga corridor map (`public/images/clt-corridor-map.svg`) is layered the way it is because the profile exists. The map renders a thesis the writing already earned: *"the corridor of removal became the railroad became the trail."* Layers — terrain, Creek territory, railroad, trail, 1832 history, Silver Comet, towns — only mean what they mean because the profile told the reader what to see. Without the profile, those layers would be decoration.

### Why the rule matters

- **Design follows thesis.** A trail map is not a thesis. A trail map *of a thesis* is. If the thesis doesn't exist on the page yet, the design has nothing to render.
- **Design without writing flatters the wrong thing.** It signals "we have an asset" rather than "we have a story." SL's editorial register collapses the moment design leads.
- **Reverse-engineering writing from design is a losing battle.** When the design exists first, the writing tends to bend toward justifying the design — which is how editorial sites lose their voice.

### The order of operations

For any project that might warrant a designed visual identity:

1. **Profile / piece written.** Research, interview, draft, edit. The thesis emerges through the writing.
2. **Design serves the thesis.** Map, illustration, custom layout — only after step 1 has a clear hook the design can render.
3. **Merch follows the design.** Stickers, T-shirts, prints — only after step 2 has produced a visual that has earned its place editorially.
4. **Domain decision** (per the criteria above) — usually triggered by step 3, since physical merch is the strongest signal a project has reached the dedicated-domain threshold.

Do these in order. Skipping ahead produces work the audience won't recognize as serious.

### When the rule can break

Rare exceptions — typically when the design *is* the research:

- A custom map that's so labor-intensive it functions as primary research (in which case it's not really design ahead of writing — the map-making *is* the writing).
- A merch run for an existing local institution where SL is partnering rather than originating (the Anniston Museums shirt for a museum event, e.g.). In partnership work, SL's design follows the partner's editorial logic.
- A design done as voice/style exploration, not for publication (the early font-preview HTML files in the repo are this — they exist to find the design language, not to ship).

If you can't name which exception applies, the rule still applies.

### Current case: Pinhoti Trail (April 2026)

The question came up: *"Could we create a Pinhoti Trail design similar to the Ladiga design that traces the actual trail?"*

Answer: yes — but not yet. There is no Pinhoti profile written. Without one, a Pinhoti map is decoration. The order of operations:

1. Write a Pinhoti profile (or series — the trail is too long for one piece). Research the volunteer trail-builders, interview thru-hikers, walk sections, find the narrative anchor.
2. Once the profile has a thesis, design the corridor visual that renders it. Likely a different aspect ratio than the Ladiga (taller, north-south orientation), and possibly a paired/sister design with the Ladiga since the trails meet in Piedmont, Alabama.
3. Merch follows.
4. Lock `pinhotitrail.org` (or similar) cheaply now if all three brand-architecture criteria are anticipated to hold — but don't build past Phase 1 redirect until the work warrants it.

---

## Decision log

| Date | Project | Decision | Reasoning |
|---|---|---|---|
| April 2026 | Chief Ladiga Trail | Buy `chiefladiga.org` and `chiefladiga.com`; redirect both to SL profile; print `chiefladiga.org` on next sticker run | 2032 book horizon + Indigenous-history audience + physical merch in circulation. All three criteria met. |

Add new rows as future projects qualify.
