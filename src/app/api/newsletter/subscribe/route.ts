import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const SL_NEWSLETTER_AUDIENCE_ID = "bc84e16a-40ed-4e6b-bc6e-1396bcb83a92";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  let body: { email: string; source?: string; magazine_waitlist?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email?.trim();
  const source = body.source?.trim() ?? "unknown";
  const magazineWaitlist = body.magazine_waitlist ?? false;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: SL_NEWSLETTER_AUDIENCE_ID,
    });

    if (error) {
      console.error("Resend contacts error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    await resend.emails.send({
      from: "Matt Headley <noreply@plainspokenblueprint.com>",
      to: email,
      subject: "You're in",
      html: `<p>Thanks for subscribing to Southern Legends.</p><p>Profiles of local makers, business owners, and community keepers from Northeast Alabama — sent when they're ready, not on a schedule.</p><p><a href="https://southernlegends.blog/profiles">Browse the archive →</a></p><p>Matt Headley</p>`,
      text: `Thanks for subscribing to Southern Legends.\n\nProfiles of local makers, business owners, and community keepers from Northeast Alabama — sent when they're ready, not on a schedule.\n\nhttps://southernlegends.blog/profiles\n\nMatt Headley`,
    }).catch((err) => console.error("Welcome email error:", err));

    const magazineTag = magazineWaitlist ? " · magazine waitlist ✓" : "";
    await resend.emails.send({
      from: "Southern Legends <noreply@plainspokenblueprint.com>",
      to: "matt@southernlegends.blog",
      subject: `New newsletter subscriber — ${source}${magazineTag}`,
      text: `New subscriber.\n\nEmail: ${email}\nSource: ${source}\nMagazine waitlist: ${magazineWaitlist ? "YES" : "no"}`,
    }).catch((err) => console.error("Notify error:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
