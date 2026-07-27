import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { upsertSubscriber, updateSubscriberStatus } from '@/lib/subscribers'
import { supabase } from '@/lib/supabase'

// Lazy-initialize to avoid build-time failure when env vars aren't set
function getStripe() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' as any })
}

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Log trail support donations
        if (session.metadata?.type === 'trail_support') {
          await supabase.from('trail_support').insert({
            trail_slug: session.metadata.trail_slug,
            trail_name: session.metadata.trail_name,
            amount_cents: session.amount_total ?? 0,
            stripe_session_id: session.id,
          })
          break
        }

        if (session.mode !== 'subscription') break
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string
        const email = session.customer_details?.email ?? session.customer_email
        if (!email) break

        // Get full subscription to confirm status
        const sub = await stripe.subscriptions.retrieve(subscriptionId)
        await upsertSubscriber({
          email,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          status: sub.status === 'active' ? 'active' : 'past_due',
        })
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const status =
          sub.status === 'active' ? 'active' :
          sub.status === 'canceled' ? 'canceled' : 'past_due'
        await updateSubscriberStatus(sub.id, status)
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await updateSubscriberStatus(sub.id, 'canceled')
        break
      }
    }
  } catch (err) {
    console.error('Stripe webhook error:', err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
