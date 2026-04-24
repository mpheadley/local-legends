# Southern Legends — Platform & Monetization Research
_Compiled from conversation on April 10, 2026_

## Context

Matt runs **Southern Legends** (`southernlegends.blog`), a free editorial site profiling small businesses in Northeast Alabama. Built in Next.js with MDX files. He also runs **Headley Web & SEO**, a freelance web design and local SEO business.

The question: how to add a monetization/community layer to Southern Legends, and where to publish personal writing (healing journey, former pastor/flower farmer identity) that complements the profiles.

---

## Existing Assets

- **southernlegends.blog** — Next.js + MDX, live, publishing free profiles
- **Patreon** — dormant, ~4 paying supporters (legacy from flower farm / ministry era), ~20 free tier followers
- **CaringBridge** — hundreds of followers from Heather's health journey last year
- **GoFundMe** — raised $10,000 for Heather's surgery; hundreds of donors
- **Stripe** — already set up for Headley Web client payments
- **Resend** — email domain configured at resend.com/domains
- **Formspree** — form handling in place

Key insight: the GoFundMe donors and CaringBridge followers are warm audience who showed up personally, not for a product. Natural audience for personal writing, but transition from "supported you in crisis" to "pay for writing" requires care.

---

## Platform Comparison

### Substack
- Free to start; 10% cut + ~3% Stripe fees on paid subscriptions (~13% total)
- Native email delivery built in
- Has its own discovery network (readers find new writers)
- Official "Developer API" is nearly useless — only looks up public LinkedIn-linked profiles
- Posting via API is unofficial/reverse-engineered; fragile
- Copy/paste markdown works fine manually
- **Verdict:** Good for email + community layer on top of the main site. Not a replacement for southernlegends.blog.

### Patreon
- Tiered memberships ($5/$15/$50 etc.)
- Now has native newsletter/email feature (updated late 2025) — write once, sends to inbox + publishes to page
- Official REST API v2 exists and is maintained
- **Critical gap: API does not support publishing posts.** Developers have been requesting this for years with no movement.
- Takes 8% on Pro tier + ~3% Stripe fees
- Patreon's API is built for member authentication and tier-checking, not content publishing
- **Verdict:** Better API than Substack for member data, but still can't publish programmatically. Email feature is now comparable to Substack for manual workflows.

### Ghost (Pro)
- Best fit for the full vision: editorial site + paid memberships + email newsletter, all native
- Takes **0% of subscription revenue** (only Stripe's ~2.9%)
- Markdown native — copy/paste works, Admin API supports programmatic publishing
- Actual official API for publishing posts (unlike Substack or Patreon)
- Can use as headless CMS with Next.js if desired
- **Pricing (as of July 2025 update):**
  - Starter: $15/mo — no paid subscriptions
  - Publisher: $29/mo — paid subscriptions, custom themes, analytics
  - Self-hosted: free software, but requires VPS + Mailgun ($35+/mo) for email — does NOT work with Resend
- **Verdict:** Right answer for the long-term vision. Wrong answer right now at $29/month before any subscribers exist.

### Build Custom (Next.js)
- Already have the stack (Next.js, Resend, Stripe)
- Would need: auth, member gating, email delivery, subscriber management
- Meaningful Claude Code investment before validating whether people will pay
- 0% platform fees, full ownership
- **Verdict:** Right answer eventually. Premature now.

---

## API Summary for Claude Code Workflows

| Platform | Publish via API? | Markdown support? | Copy/paste workflow? |
|----------|-----------------|-------------------|----------------------|
| Substack | No (unofficial only) | Yes (paste works) | Yes |
| Patreon | No | Yes (paste works) | Yes |
| Ghost | **Yes (official Admin API)** | **Yes (native)** | Yes |
| Custom Next.js | N/A (you own it) | Yes (MDX files) | Yes |

---

## Content Architecture Decision

**southernlegends.blog stays the canonical home for profiles.** It's a real editorial site with real design. No platform should replace it.

The email/community layer sits on top of it — subscribers get notified when profiles drop, plus access to personal writing that doesn't live on the main site.

Think: magazine (southernlegends.blog) + newsletter (wherever). The newsletter drives people back to the site and gives supporters something extra.

**Personal writing** (healing journey, former pastor/flower farmer, "broken and becoming") belongs in the same ecosystem as Southern Legends, not siloed. It's what gives Southern Legends its voice and differentiates it from generic business spotlights.

Suggested structure:
- **Free tier:** Southern Legends profiles (already free on the blog), occasional personal reflections
- **Paid tier:** Deeper personal writing, behind-the-scenes on profiles, the more vulnerable/unpolished stuff

---

## Recommended Path (Staged)

### Now — Zero cost, validate the audience
Reboot Patreon with one honest post: farm is gone, ministry is gone, rebuilding through Southern Legends and this writing. Tell the 4 supporters (and the broader warm audience) what this is now. Invite GoFundMe/CaringBridge people in.

**OR** start a free Substack as the email layer. $0 until paid subscriptions are turned on. Let it grow before asking anyone to pay.

### When audience is established — Low cost
Decide between:
- Substack paid tier (easy, 13% cut)
- Patreon paid tier (slightly better API, comparable email now)

### When generating real revenue — Own the stack
Migrate to Ghost Pro ($29/mo, 0% cut) or build the custom Next.js member area using existing Stripe + Resend setup. At $300+/mo in subscriptions, Ghost's 0% beats Substack's 13% quickly.

---

## Key Constraints to Remember

- Resend does **not** work with Ghost self-hosted (requires Mailgun)
- Stripe account already exists — reusable for Ghost or custom build
- southernlegends.blog MDX setup is a valid content workflow, just file-based
- The warm audience (GoFundMe, CaringBridge) needs a careful transition message — they gave out of personal care, not product interest
- $29/month is hard to justify before earning it back in subscriptions

---

## Mindset Note

The platform decision is secondary to two prior questions:
1. Is the personal writing (healing journey / pastoral voice) something Matt is ready to share publicly and consistently?
2. What's the honest message to the warm audience about what their support means now?

Those answers drive the platform choice, not the other way around.
