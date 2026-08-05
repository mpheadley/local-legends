/**
 * Printful API client — shared across all Gather ventures.
 *
 * One Printful store, one API key. Each venture maps to a set of
 * product variant IDs stored in env vars.
 *
 * Env vars required:
 *   PRINTFUL_API_KEY          — from Printful Dashboard → Settings → API
 *   PRINTFUL_STORE_ID         — numeric store ID from the same settings page
 *
 * Patron welcome kit variant IDs (one per venture, set per app):
 *   PRINTFUL_VARIANT_SHIRT_SL          — Southern Legends patron shirt variant
 *   PRINTFUL_VARIANT_STICKER_SL        — Southern Legends sticker variant
 *   PRINTFUL_VARIANT_SHIRT_ECCLESIA    — Ecclesia patron shirt variant
 *   PRINTFUL_VARIANT_STICKER_ECCLESIA  — Ecclesia sticker variant
 *   (add more as ventures grow)
 */

const BASE = "https://api.printful.com";

export type PrintfulAddress = {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string; // e.g. "AL"
  country_code: string; // e.g. "US"
  zip: string;
};

export type PrintfulOrderItem = {
  variant_id: number;
  quantity: number;
  /** Optional: override the design file for this line item */
  files?: { url: string; type?: string }[];
};

export type PrintfulOrderInput = {
  recipient: PrintfulAddress;
  items: PrintfulOrderItem[];
  /** If true, submits for real fulfillment. If false, draft only (default false). */
  confirm?: boolean;
  /** Free-form tag stored on the order for your reference */
  external_id?: string;
  /** Retail costs shown on packing slip — leave unset for default */
  retail_costs?: { currency: string; subtotal: string; shipping: string; total: string };
};

type PrintfulResponse<T> = { code: number; result: T; error?: string };

function headers() {
  const key = process.env.PRINTFUL_API_KEY;
  if (!key) throw new Error("PRINTFUL_API_KEY not set");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID ?? "",
  };
}

/** Create an order. Set confirm:true to submit for real fulfillment. */
export async function createOrder(input: PrintfulOrderInput): Promise<{ id: number; status: string }> {
  const body = {
    recipient: input.recipient,
    items: input.items,
    confirm: input.confirm ?? false,
    external_id: input.external_id,
    ...(input.retail_costs ? { retail_costs: input.retail_costs } : {}),
  };

  const res = await fetch(`${BASE}/orders`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });

  const json: PrintfulResponse<{ id: number; status: string }> = await res.json();
  if (json.code !== 200) throw new Error(`Printful order failed: ${json.error ?? json.code}`);
  return json.result;
}

/** Confirm a draft order (submit for fulfillment). */
export async function confirmOrder(orderId: number): Promise<void> {
  const res = await fetch(`${BASE}/orders/${orderId}/confirm`, {
    method: "POST",
    headers: headers(),
  });
  const json: PrintfulResponse<unknown> = await res.json();
  if (json.code !== 200) throw new Error(`Printful confirm failed: ${json.error ?? json.code}`);
}

/** Get product variants for a catalog product (use to look up variant IDs). */
export async function getVariants(productId: number): Promise<{ id: number; name: string; size: string; color: string }[]> {
  const res = await fetch(`${BASE}/products/${productId}/variants`, { headers: headers() });
  const json: PrintfulResponse<{ variants: { id: number; name: string; size: string; color: string }[] }> = await res.json();
  if (json.code !== 200) throw new Error(`Printful variants failed: ${json.error ?? json.code}`);
  return json.result.variants;
}

/**
 * Send the patron welcome kit for a given venture.
 *
 * Looks up shirt + sticker variant IDs from env vars, creates a confirmed
 * Printful order. If variant IDs are not yet configured, logs a warning
 * and returns null (so the webhook doesn't hard-fail).
 */
export async function sendPatronWelcomeKit(opts: {
  venture: string; // "sl" | "ecclesia" | "gs" | etc.
  recipient: PrintfulAddress;
  externalId?: string; // e.g. Stripe subscription ID
}): Promise<{ orderId: number } | null> {
  const slug = opts.venture.toUpperCase().replace(/-/g, "_");
  const shirtVariantId = process.env[`PRINTFUL_VARIANT_SHIRT_${slug}`];
  const stickerVariantId = process.env[`PRINTFUL_VARIANT_STICKER_${slug}`];

  if (!shirtVariantId) {
    console.warn(`[Printful] No shirt variant configured for venture: ${opts.venture}. Set PRINTFUL_VARIANT_SHIRT_${slug}.`);
    return null;
  }

  const items: PrintfulOrderItem[] = [
    { variant_id: Number(shirtVariantId), quantity: 1 },
  ];

  if (stickerVariantId) {
    items.push({ variant_id: Number(stickerVariantId), quantity: 1 });
  }

  const order = await createOrder({
    recipient: opts.recipient,
    items,
    confirm: true, // submit immediately for fulfillment
    external_id: opts.externalId,
  });

  return { orderId: order.id };
}

/**
 * Parse a Stripe Checkout Session's shipping_details into a PrintfulAddress.
 * Returns null if address is incomplete.
 */
export function stripeShippingToPrintful(
  shipping: {
    name?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      state?: string | null;
      country?: string | null;
      postal_code?: string | null;
    } | null;
  } | null
): PrintfulAddress | null {
  if (!shipping?.address || !shipping.name) return null;
  const a = shipping.address;
  if (!a.line1 || !a.city || !a.state || !a.country || !a.postal_code) return null;

  return {
    name: shipping.name,
    address1: a.line1,
    address2: a.line2 ?? undefined,
    city: a.city,
    state_code: a.state,
    country_code: a.country,
    zip: a.postal_code,
  };
}
