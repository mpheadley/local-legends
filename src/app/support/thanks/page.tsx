import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you — Southern Legends",
  description: "Your monthly support of Southern Legends is active.",
  robots: { index: false, follow: false },
};

export default function PatronThanksPage() {
  return (
    <main id="main-content" className="min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-widest text-ll-primary font-semibold mb-3">
          You&rsquo;re a Patron
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-ll-dark mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Thank you — genuinely.
        </h1>
        <p className="text-ll-text mb-3 leading-relaxed">
          Your monthly support is active. A confirmation is on its way to your inbox, and a receipt from Stripe
          right behind it. If you don&rsquo;t see them in a few minutes, check spam for a note from Southern Legends.
        </p>
        <p className="text-ll-text-light text-sm mb-8">
          Southern Legends stays free to read because of people like you. That&rsquo;s the whole model, and
          you&rsquo;re now part of it. Cancel any time — just reply to the email.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-ll-primary text-white font-semibold text-sm rounded-md hover:bg-ll-primary-dark transition-colors"
          >
            Read the latest →
          </Link>
          <Link
            href="/profiles"
            className="inline-block px-6 py-3 border border-ll-dark text-ll-dark font-semibold text-sm rounded-md hover:bg-ll-dark hover:text-white transition-colors"
          >
            Browse profiles
          </Link>
        </div>
      </div>
    </main>
  );
}
