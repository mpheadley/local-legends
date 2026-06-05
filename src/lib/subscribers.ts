import { supabase } from './supabase'

const HMAC_SECRET = process.env.MEMBER_TOKEN_SECRET!
const COOKIE_NAME = 'sl_member'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function hasActiveSubscription(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('subscribers')
    .select('status')
    .eq('email', email.toLowerCase().trim())
    .eq('status', 'active')
    .single()
  return !error && !!data
}

export async function upsertSubscriber(params: {
  email: string
  stripe_customer_id: string
  stripe_subscription_id: string
  status: 'active' | 'canceled' | 'past_due'
}) {
  const { error } = await supabase.from('subscribers').upsert(
    {
      email: params.email.toLowerCase().trim(),
      stripe_customer_id: params.stripe_customer_id,
      stripe_subscription_id: params.stripe_subscription_id,
      status: params.status,
    },
    { onConflict: 'email' }
  )
  if (error) throw error
}

export async function updateSubscriberStatus(
  stripe_subscription_id: string,
  status: 'active' | 'canceled' | 'past_due'
) {
  const { error } = await supabase
    .from('subscribers')
    .update({ status })
    .eq('stripe_subscription_id', stripe_subscription_id)
  if (error) throw error
}

// HMAC-signed token: base64(email + "|" + expiry) + "." + signature
// Keeps cookie tamper-proof without a DB lookup on every request

async function hmac(message: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(HMAC_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
}

export async function mintMemberToken(email: string): Promise<string> {
  const expiry = Date.now() + COOKIE_MAX_AGE * 1000
  const payload = `${email.toLowerCase().trim()}|${expiry}`
  const sig = await hmac(payload)
  return `${btoa(payload)}.${sig}`
}

export async function verifyMemberToken(token: string): Promise<string | null> {
  try {
    const [payloadB64, sig] = token.split('.')
    if (!payloadB64 || !sig) return null
    const payload = atob(payloadB64)
    const expected = await hmac(payload)
    if (expected !== sig) return null
    const [email, expiryStr] = payload.split('|')
    if (Date.now() > Number(expiryStr)) return null
    return email
  } catch {
    return null
  }
}

export { COOKIE_NAME, COOKIE_MAX_AGE }
