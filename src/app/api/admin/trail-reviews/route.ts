import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

const ADMIN_PIN = process.env.ADMIN_PIN ?? "1234"

function checkPin(req: NextRequest) {
  const pin = req.headers.get("x-admin-pin")
  return pin === ADMIN_PIN
}

export async function GET(req: NextRequest) {
  if (!checkPin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const status = req.nextUrl.searchParams.get("status") ?? "pending"
  const query = supabase
    .from("trail_reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100)

  if (status === "pending") query.eq("approved", false)
  else if (status === "approved") query.eq("approved", true)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ reviews: data ?? [] })
}

export async function PATCH(req: NextRequest) {
  if (!checkPin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id, approved } = await req.json()
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const { error } = await supabase
    .from("trail_reviews")
    .update({ approved })
    .eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  if (!checkPin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const { error } = await supabase.from("trail_reviews").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
