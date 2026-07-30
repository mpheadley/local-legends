import { NextRequest, NextResponse } from 'next/server'
import { getMerchForContext, type MerchContext } from '@/lib/merch'

export const runtime = 'edge'

/**
 * Cross-site contextual merch API
 * GET /api/merch?cities=anniston,piedmont&tags=trail,history&venture=sl&slug=essay-slug&limit=4
 *
 * Used by: Attune, Ecclesia, GS, The Aisle, any gather app
 * Returns: scored MerchItem[] filtered to available items
 */
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams

  const ctx: MerchContext = {
    cities:  p.get('cities')?.split(',').filter(Boolean),
    tags:    p.get('tags')?.split(',').filter(Boolean),
    venture: p.get('venture') ?? undefined,
    slug:    p.get('slug') ?? undefined,
    limit:   p.get('limit') ? Number(p.get('limit')) : 4,
    includeUnavailable: p.get('upcoming') === '1',
  }

  const items = getMerchForContext(ctx)

  return NextResponse.json(items, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
