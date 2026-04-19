import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim();

  if (!apiKey || !audienceId) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  let body: { email: string; firstName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email?.trim();
  const firstName = body.firstName?.trim() ?? "";

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
      firstName,
      unsubscribed: false,
      audienceId,
    });

    if (error) {
      console.error("Resend contacts error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    // Welcome email — best-effort, doesn't block subscribe success
    const greeting = firstName ? `${firstName},` : "Hey,";
    const welcomeHtml = `
      <p>${greeting}</p>
      <p>Thanks for subscribing.</p>
      <p>I'm Matt. I build websites for small businesses here in Northeast Alabama, and somewhere in the middle of that work I started writing about the people I met.</p>
      <p>More stories are here when you're ready:<br>
      <a href="https://southernlegends.blog/profiles">southernlegends.blog/profiles</a></p>
      <p>Profiles go out when they're ready. I'm not chasing a schedule.</p>
      <p>Matt Headley<br>
      <a href="https://southernlegends.blog">southernlegends.blog</a></p>
    `;
    const welcomeText = `${greeting}

Thanks for subscribing.

I'm Matt. I build websites for small businesses here in Northeast Alabama, and somewhere in the middle of that work I started writing about the people I met.

More stories are here when you're ready:
https://southernlegends.blog/profiles

Profiles go out when they're ready. I'm not chasing a schedule.

Matt Headley
southernlegends.blog`;

    await resend.emails.send({
      from: "Matt Headley <noreply@southernlegends.blog>",
      to: email,
      subject: "You're in",
      html: welcomeHtml,
      text: welcomeText,
    }).catch((err) => console.error("Welcome email error:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
