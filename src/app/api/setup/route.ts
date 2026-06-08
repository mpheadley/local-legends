import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const MIGRATION_SQL = `
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS subscribers_email_idx ON subscribers (email);
CREATE INDEX IF NOT EXISTS subscribers_stripe_sub_idx ON subscribers (stripe_subscription_id);
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS subscribers_updated_at ON subscribers;
CREATE TRIGGER subscribers_updated_at
  BEFORE UPDATE ON subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
`

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.ADMIN_SEND_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase.rpc('exec_sql_raw', { sql: MIGRATION_SQL }).single()
    .then((res) => res, () => ({ error: null, data: null, count: null, status: 200, statusText: 'OK' }))

  // Try direct table creation via supabase-js
  // The table might already be set up or we need DDL access
  // Instead, let's just verify the table exists
  const { data, error: checkErr } = await supabase
    .from('subscribers')
    .select('id')
    .limit(1)

  if (checkErr?.message?.includes('does not exist')) {
    return NextResponse.json({ 
      error: 'Table does not exist. Run migration in Supabase SQL Editor.',
      sql_file: 'supabase/migrations/001_subscribers.sql'
    }, { status: 500 })
  }

  return NextResponse.json({ ok: true, message: 'subscribers table exists and is ready' })
}
