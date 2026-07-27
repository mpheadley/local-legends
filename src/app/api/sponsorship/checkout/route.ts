import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiVersion: "2026-05-27.dahlia" as any,
  })
}

const TIERS: Record<string, { label: string; amount: number; description: string }> = {
  friend: {
    label: "Friend of the City — Southern Legends",
    amount: 2500,
    description: "Name + link in city section footer. Monthly, cancel any time.",
  },
  sponsor: {
    label: "City Sponsor — Southern Legends",
    amount: 7500,
    description: "Logo on city pages + one featured business profile per month.",
  },
}

export async function GET(req: NextRequest) {
  const tier = req.nextUrl.searchParams.get("tier")

  // Presenting tier goes through the contact form, not checkout
  if (tier === "presenting") {
    return NextResponse.redirect(new URL("/api/sponsorship/apply", req.url))
  }

  const tierConfig = tier ? TIERS[tier] : null
  if (!tierConfig) {
    return NextResponse.json({ error: "Invalid tier. Use: friend, sponsor, or presenting" }, { status: 400 })
  }

  const stripe = getStripe()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://southernlegends.blog"

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: tierConfig.amount,
          recurring: { interval: "month" },
          product_data: {
            name: tierConfig.label,
            description: tierConfig.description,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/sponsor/thank-you?tier=${tier}`,
    cancel_url:  `${baseUrl}/sponsor`,
    metadata: { tier, source: "sl-sponsor-page" },
  })

  return NextResponse.redirect(session.url!)
}
