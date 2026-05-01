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

## Decision log

| Date | Project | Decision | Reasoning |
|---|---|---|---|
| April 2026 | Chief Ladiga Trail | Buy `chiefladiga.org` and `chiefladiga.com`; redirect both to SL profile; print `chiefladiga.org` on next sticker run | 2032 book horizon + Indigenous-history audience + physical merch in circulation. All three criteria met. |

Add new rows as future projects qualify.
