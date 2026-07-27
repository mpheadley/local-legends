import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Sponsor a City — Southern Legends",
  description:
    "Put your business in front of readers who grew up in your city — and the ones who left but never stopped caring about home.",
  alternates: { canonical: "/sponsor" },
  openGraph: { url: "/sponsor" },
}

const TIERS = [
  {
    name: "Friend of the City",
    price: "$25/mo",
    priceNote: "Cancel any time",
    description:
      "Your business name listed in the footer of every story, profile, and directory page for your city. Readers see who's keeping the lights on.",
    features: [
      "Name + link in city section footer",
      "Listed on the /sponsor page",
      "Cancel any time",
    ],
    cta: "Become a Friend",
    href: "/api/sponsorship/checkout?tier=friend",
    highlight: false,
  },
  {
    name: "City Sponsor",
    price: "$75/mo",
    priceNote: "Cancel any time",
    description:
      "Your logo on every city page plus one featured business profile per month — written in the Southern Legends voice, yours to share.",
    features: [
      "Logo + link on all city section pages",
      "One featured business profile per month",
      "Name in city section footer",
      "Listed on the /sponsor page",
    ],
    cta: "Become a Sponsor",
    href: "/api/sponsorship/checkout?tier=sponsor",
    highlight: true,
  },
  {
    name: "Presenting Sponsor",
    price: "$150/mo",
    priceNote: "Requires a short call first",
    description:
      "Exclusive presenting sponsorship of one city section. Your name on every piece of content for that city, plus a monthly spotlight feature and a link in the SL newsletter.",
    features: [
      "Exclusive presenting sponsor for one city",
      "Monthly spotlight feature (editorial, not ad copy)",
      "Logo + link on all city section pages",
      "Featured in the SL Reader newsletter",
      "Name in city section footer",
    ],
    cta: "Get in Touch",
    href: "/api/sponsorship/apply",
    highlight: false,
  },
]

export default function SponsorPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <p className="text-sm uppercase tracking-widest text-[var(--color-ll-primary)] mb-3 font-medium">
          Sponsor Southern Legends
        </p>
        <h1
          className="text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-ll-cream, #f5f0e8)" }}
        >
          Reach the people who never really left
        </h1>
        <p className="text-lg text-stone-400 max-w-xl mx-auto leading-relaxed">
          Southern Legends readers grew up here, or they never stopped thinking about home.
          A sponsorship puts your business in front of the people who care most about this place.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3 mb-16">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl border p-6 flex flex-col ${
              tier.highlight
                ? "border-[var(--color-ll-primary)] bg-stone-900"
                : "border-stone-700 bg-stone-900/50"
            }`}
          >
            {tier.highlight && (
              <p className="text-xs uppercase tracking-widest text-[var(--color-ll-primary)] mb-2 font-medium">
                Most popular
              </p>
            )}
            <h2
              className="text-xl mb-1"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-ll-cream, #f5f0e8)" }}
            >
              {tier.name}
            </h2>
            <p className="text-3xl font-bold text-white mb-1">{tier.price}</p>
            <p className="text-xs text-stone-500 mb-4">{tier.priceNote}</p>
            <p className="text-sm text-stone-400 leading-relaxed mb-4">{tier.description}</p>
            <ul className="text-sm text-stone-400 space-y-1 mb-6 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2 items-start">
                  <span className="text-[var(--color-ll-primary)] mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href={tier.href}
              className={`block text-center py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                tier.highlight
                  ? "bg-[var(--color-ll-primary)] text-white hover:bg-[var(--color-ll-primary-dark)]"
                  : "border border-stone-600 text-stone-300 hover:border-stone-400 hover:text-white"
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      <section className="border-t border-stone-800 pt-12">
        <h2
          className="text-2xl mb-4"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-ll-cream, #f5f0e8)" }}
        >
          What sponsorship is — and isn&apos;t
        </h2>
        <div className="prose prose-stone prose-invert max-w-none text-stone-400 text-sm leading-relaxed space-y-3">
          <p>
            This isn&apos;t advertising. We don&apos;t write press releases or sponsored posts.
            The editorial voice stays independent — your support is what keeps that independence
            possible.
          </p>
          <p>
            The featured profile (City Sponsor and above) is written by us, in the Southern Legends
            voice. You&apos;ll see it before it publishes. If something&apos;s wrong, we&apos;ll fix
            it. But we&apos;re not going to make it sound like an ad.
          </p>
          <p>
            Questions? Email{" "}
            <a
              href="mailto:matt@gatherstudio.app"
              className="text-[var(--color-ll-primary)] hover:underline"
            >
              matt@gatherstudio.app
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mt-12 border-t border-stone-800 pt-12 text-center">
        <p className="text-stone-500 text-sm">
          Want to support without a sponsorship?{" "}
          <Link href="/support" className="text-[var(--color-ll-primary)] hover:underline">
            Become a Reader →
          </Link>
        </p>
      </section>
    </main>
  )
}
