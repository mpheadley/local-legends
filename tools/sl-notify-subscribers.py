#!/usr/bin/env python3
"""
sl-notify-subscribers.py — email a new Southern Legends article to the Resend audience.

Draft-first by design (honors the outbound-review + ALL-CAPS gating rules):
  - default: reads the essay frontmatter, builds the branded email, writes an HTML
    preview, and PRINTS the draft. Sends nothing.
  - --send:  POSTs to the deployed /api/newsletter/send broadcast route. Only fires
    with this explicit flag AND after you've reviewed the preview.

Usage:
  python3 tools/sl-notify-subscribers.py <slug>            # draft + preview only
  python3 tools/sl-notify-subscribers.py <slug> --send     # broadcast to subscribers

Env (looked up in shell env, then southern-legends/.env.local):
  ADMIN_SEND_SECRET   — Bearer secret for /api/newsletter/send
  SL_SEND_URL         — default https://southernlegends.blog/api/newsletter/send
"""
import os
import re
import sys
import json
import urllib.request

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(REPO, "content", "journal")
SITE = "https://southernlegends.blog"
PREVIEW = "/tmp/sl-notify-preview.html"


def load_env(key: str) -> str:
    v = os.environ.get(key)
    if v:
        return v.strip()
    env_path = os.path.join(REPO, ".env.local")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line.startswith(f"{key}="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    return ""


def parse_frontmatter(path: str) -> dict:
    with open(path) as f:
        text = f.read()
    m = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not m:
        return {}
    fm = {}
    for line in m.group(1).splitlines():
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        fm[k.strip()] = v.strip().strip('"').strip("'")
    return fm


def build_email(fm: dict, slug: str) -> tuple[str, str]:
    title = fm.get("title", slug)
    excerpt = fm.get("excerpt", "")
    hero = fm.get("heroImage") or fm.get("image") or ""
    hero_url = (SITE + hero) if hero.startswith("/") else hero
    url = f"{SITE}/essays/{slug}"

    hero_html = (
        f'<img src="{hero_url}" alt="{fm.get("heroAlt", title)}" '
        f'style="width:100%;max-width:600px;border-radius:6px;margin:0 0 24px;">'
        if hero_url else ""
    )

    html = f"""\
<div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;color:#1C1917;">
  <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a8378;margin:0 0 8px;">Southern Legends</p>
  <h1 style="font-size:28px;line-height:1.2;margin:0 0 12px;">{title}</h1>
  {hero_html}
  <p style="font-size:17px;line-height:1.6;color:#3a352f;margin:0 0 24px;">{excerpt}</p>
  <p style="margin:0 0 32px;">
    <a href="{url}" style="display:inline-block;background:#C4622D;color:#fff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:4px;">Read the full story &rarr;</a>
  </p>
  <hr style="border:none;border-top:1px solid #e5e0d8;margin:0 0 16px;">
  <p style="font-size:13px;color:#8a8378;line-height:1.6;margin:0;">
    You're getting this because you subscribed to Southern Legends — stories from Northeast Alabama.
    Free to read, always. <a href="{SITE}/subscribe" style="color:#C4622D;">Reader tier ($4.99/mo)</a> if you want to help keep it going.<br>
    Matt Headley &middot; <a href="{SITE}" style="color:#8a8378;">southernlegends.blog</a>
  </p>
</div>"""
    subject = title
    return subject, html


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    do_send = "--send" in sys.argv
    if not args:
        print("Usage: sl-notify-subscribers.py <slug> [--send]")
        sys.exit(1)

    slug = args[0].replace(".mdx", "")
    path = os.path.join(CONTENT, f"{slug}.mdx")
    if not os.path.exists(path):
        print(f"Not found: {path}")
        sys.exit(1)

    fm = parse_frontmatter(path)
    if fm.get("published", "true").lower() == "false":
        print(f"⚠ {slug} is not published (published: false). Publish before notifying.")
        sys.exit(1)

    subject, html = build_email(fm, slug)
    with open(PREVIEW, "w") as f:
        f.write(html)

    print(f"Slug:    {slug}")
    print(f"Subject: {subject}")
    print(f"Read at: {SITE}/essays/{slug}")
    print(f"Preview: {PREVIEW}  (open to review before sending)")

    if not do_send:
        print("\nDRAFT ONLY — no email sent. Review the preview, then re-run with --send.")
        return

    secret = load_env("ADMIN_SEND_SECRET")
    if not secret:
        print("\n✗ ADMIN_SEND_SECRET not found in env or .env.local — cannot send.")
        sys.exit(1)
    send_url = load_env("SL_SEND_URL") or f"{SITE}/api/newsletter/send"

    req = urllib.request.Request(
        send_url,
        data=json.dumps({"subject": subject, "html": html}).encode(),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {secret}"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            body = resp.read().decode()
            print(f"\n✓ Broadcast sent. {body}")
    except urllib.error.HTTPError as e:
        print(f"\n✗ Send failed [{e.code}]: {e.read().decode()}")
        sys.exit(1)


if __name__ == "__main__":
    main()
