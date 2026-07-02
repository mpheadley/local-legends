#!/usr/bin/env python3
"""
Calhoun Journal Submission Pipeline
Usage:
  python3 tools/cj-submit.py --slug shannon-jenkins [--dry-run] [--send]

Reads a published SL profile .mdx, strips MDX syntax, adds attribution,
and drafts (or sends) a submission email to contact@calhounjournal.com.

Requires: ~/Developer/webdev/crm/gmail_token_compose.json for sending.
"""

import argparse
import re
import sys
from pathlib import Path

PROFILES_DIR = Path(__file__).parent.parent / "content" / "profiles"
CJ_EMAIL = "contact@calhounjournal.com"
CJ_NAME = "Lee Kathryn"
MATT_EMAIL = "matt@southernlegends.blog"
SL_BASE_URL = "https://southernlegends.blog"

BIO = """---
*Matt Headley is the founder of Southern Legends, a long-form profile series documenting the people who shape Alabama's communities. Read more at {url}.*
"""


def find_profile(slug: str) -> Path:
    candidates = [
        PROFILES_DIR / f"{slug}.mdx",
        PROFILES_DIR / f"{slug}.md",
    ]
    for c in candidates:
        if c.exists():
            return c
    # Try subdirectory (some profiles like jay-jenkins live in a folder)
    subdir = PROFILES_DIR / slug
    if subdir.is_dir():
        for c in subdir.iterdir():
            if c.suffix in (".mdx", ".md") and c.stem == slug:
                return c
    raise FileNotFoundError(f"No profile found for slug '{slug}' in {PROFILES_DIR}")


def parse_frontmatter(raw: str) -> tuple[dict, str]:
    """Extract YAML frontmatter and return (meta_dict, body)."""
    if not raw.startswith("---"):
        return {}, raw
    end = raw.index("---", 3)
    fm_block = raw[3:end].strip()
    body = raw[end + 3:].strip()
    meta = {}
    for line in fm_block.splitlines():
        if ":" in line:
            k, _, v = line.partition(":")
            meta[k.strip()] = v.strip().strip('"')
    return meta, body


def strip_mdx(body: str) -> str:
    """Remove MDX components, JSX, crosslink comments, and frontmatter artifacts."""
    # Remove MDX component tags: <ArticleImage .../>, <Callout>, etc.
    body = re.sub(r"<[A-Z][^>]*/>", "", body)
    body = re.sub(r"<[A-Z][^>]*>.*?</[A-Z][^>]*>", "", body, flags=re.DOTALL)
    # Remove HTML comments (crosslink notes)
    body = re.sub(r"\{/\*.*?\*/\}", "", body, flags=re.DOTALL)
    # Remove import/export lines
    body = re.sub(r"^(import|export)\s+.*$", "", body, flags=re.MULTILINE)
    # Remove MDX expression blocks
    body = re.sub(r"\{[^}]+\}", "", body)
    # Collapse multiple blank lines
    body = re.sub(r"\n{3,}", "\n\n", body)
    return body.strip()


def format_for_print(meta: dict, body: str) -> str:
    """Format the profile as clean copy for the Calhoun Journal."""
    slug = meta.get("name", "").lower().replace(" ", "-")
    title = meta.get("title", "")
    subject_name = meta.get("name", "")
    location = meta.get("location", "Alabama")
    profile_url = f"{SL_BASE_URL}/profiles/{slug}" if slug else SL_BASE_URL

    lines = []
    if title:
        lines.append(f'"{title}"')
        lines.append("")
    if subject_name:
        lines.append(f"A Southern Legends profile — {subject_name}, {location}")
        lines.append("")
    lines.append(body)
    lines.append("")
    lines.append(BIO.format(url=f"{SL_BASE_URL}/profiles/{subject_name.lower().replace(' ', '-')}"))
    lines.append("")
    lines.append(f"Originally published at: {profile_url}")
    return "\n".join(lines)


def build_email(meta: dict, clean_text: str) -> dict:
    """Return email fields ready for Gmail API."""
    subject_name = meta.get("name", "this profile")
    profile_slug = subject_name.lower().replace(" ", "-")
    profile_url = f"{SL_BASE_URL}/profiles/{profile_slug}"
    title = meta.get("title", "")

    subject = f'Southern Legends for Calhoun Journal — "{title}" ({subject_name})'

    body_html = f"""<p>Hi {CJ_NAME},</p>

<p>Sending over the next Southern Legends piece for the Journal — "{title}," a profile of {subject_name}.</p>

<p>Same format as before: full text below, published version at {profile_url}. Happy to adjust length or trim for print layout.</p>

<p>Let me know if this works for your next cycle.</p>

<p>Matt</p>

<hr>

<pre style="font-family: Georgia, serif; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">{clean_text}</pre>

<br><br>
<img src="https://matthewheadley.com/images/email/sl-sig-flat.webp" alt="Matt Headley — Southern Legends" style="max-width:400px; display:block;">
"""
    return {
        "to": CJ_EMAIL,
        "from": MATT_EMAIL,
        "subject": subject,
        "body_html": body_html,
        "body_text": clean_text,
    }


def send_email(email: dict):
    """Send via Gmail API using gmail_token_compose.json."""
    import base64
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText

    sys.path.insert(0, str(Path.home() / "Developer/webdev/crm"))
    from google_auth import get_service

    service = get_service(
        "gmail", "v1",
        ["https://mail.google.com/"],
        str(Path.home() / "Developer/webdev/crm/gmail_token_compose.json")
    )

    msg = MIMEMultipart("alternative")
    msg["to"] = email["to"]
    msg["from"] = email["from"]
    msg["subject"] = email["subject"]
    msg.attach(MIMEText(email["body_text"], "plain"))
    msg.attach(MIMEText(email["body_html"], "html"))

    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    result = service.users().messages().send(userId="me", body={"raw": raw}).execute()
    print(f"Sent: message ID {result['id']}")
    return result


def main():
    parser = argparse.ArgumentParser(description="Submit SL profile to Calhoun Journal")
    parser.add_argument("--slug", required=True, help="Profile slug, e.g. shannon-jenkins")
    parser.add_argument("--dry-run", action="store_true", help="Print output without sending")
    parser.add_argument("--send", action="store_true", help="Actually send the email (requires approval)")
    args = parser.parse_args()

    profile_path = find_profile(args.slug)
    print(f"Reading: {profile_path}")

    raw = profile_path.read_text(encoding="utf-8")
    meta, body = parse_frontmatter(raw)
    clean_body = strip_mdx(body)
    clean_text = format_for_print(meta, clean_body)
    email = build_email(meta, clean_text)

    print(f"\n{'='*60}")
    print(f"TO:      {email['to']}")
    print(f"FROM:    {email['from']}")
    print(f"SUBJECT: {email['subject']}")
    print(f"{'='*60}\n")
    print(clean_text[:2000])
    if len(clean_text) > 2000:
        print(f"\n... [{len(clean_text) - 2000} more chars]")

    # Write clean text to disk for reference
    out_path = profile_path.parent / f"{args.slug}-cj-submission.txt"
    out_path.write_text(clean_text, encoding="utf-8")
    print(f"\nClean text written to: {out_path}")

    if args.send:
        confirm = input("\nSend to Calhoun Journal? [y/N] ").strip().lower()
        if confirm == "y":
            send_email(email)
        else:
            print("Aborted.")
    elif not args.dry_run:
        print("\nRun with --send to send, --dry-run to suppress this prompt.")


if __name__ == "__main__":
    main()
