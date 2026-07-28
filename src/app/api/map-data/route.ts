import { NextResponse } from "next/server";
import { getMapData } from "@/lib/map-data";

export const revalidate = 3600;

export async function GET() {
  const data = await getMapData();
  return NextResponse.json(data);
}
