import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret =
    request.headers.get("x-revalidate-secret") ||
    new URL(request.url).searchParams.get("secret");
  if (!secret || secret !== process.env.CMS_ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true });
}
