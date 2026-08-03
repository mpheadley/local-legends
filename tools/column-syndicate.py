#!/usr/bin/env python3
"""
column-syndicate.py — Post-publication column syndication engine.

After a Star column runs, this script:
  1. Reads the column from src/data/columns.ts
  2. Creates an SL essay MDX in content/journal/<slug>.mdx (with attribution)
  3. Determines cross-venture routing (The Aisle, Ecclesia) from tags
  4. Drafts Resend newsletter blast (requires --send to fire)
  5. Stages external pitch emails for outlets that match the column verticals
  6. Records a mention in the entity graph (subject_mentions)

Outlet First-Run Rule: Star runs first. This script runs AFTER Donna confirms it ran.
ALL CAPS gate applies to all external outbound. Internal SL publish is open.

Usage:
  python3 tools/column-syndicate.py <slug>                    # preview only
  python3 tools/column-syndicate.py <slug> --publish          # write MDX + push to SL
  python3 tools/column-syndicate.py <slug> --publish --send   # + send newsletter blast
  python3 tools/column-syndicate.py <slug> --run-date 2026-08-06  # set Star run date

Examples:
  python3 tools/column-syndicate.py were-all-a-little-mad-here --publish
  python3 tools/column-syndicate.py the-wiring-is-not-the-cruelty --publish --send

Env: RESEND_API_KEY, ADMIN_SEND_SECRET (for newsletter), NEXT_PUBLIC_SUPABASE_URL
"""

import os
import sys
import re
import json
import argparse
import subprocess
import urllib.request
from pathlib import Path
from datetime import datetime, date

# ── Paths ─────────────────────────────────────────────────────────────────────

REPO         = Path(__file__).parent.parent
COLUMNS_TS   = REPO / "src" / "data" / "columns.ts"
JOURNAL_DIR  = REPO / "content" / "journal"
TOOLS_DIR    = REPO / "tools"
SITE         = "https://southernlegends.blog"
SL_SEND_URL  = f"{SITE}/api/newsletter/send-post"

# ── Tag → venture routing ─────────────────────────────────────────────────────

TAG_VENTURE_MAP = {
    # Faith/theology → Ecclesia
    "Faith": ["ecclesia"],
    "Theology": ["ecclesia"],
    "Liturgy": ["ecclesia"],
    "Formation": ["ecclesia"],
    "Scripture": ["ecclesia"],

    # Wedding/relationships → The Aisle
    "Wedding": ["theaisle"],
    "Marriage": ["theaisle"],
    "Relationships": ["theaisle"],

    # Mental health → Attune, Steady
    "Mental Health": ["attune", "steady"],
    "Bipolar": ["attune", "steady", "southern-legends"],
    "Neurodiversity": ["attune", "steady"],

    # Place/Southern → Southern Legends (always), possibly Back Forty
    "Place": ["southern-legends"],
    "Southern Culture": ["southern-legends"],
    "Local History": ["southern-legends"],
    "Farming": ["southern-legends", "backforty"],
    "Land": ["southern-legends", "backforty"],

    # AI/tech → God and the Algorithm
    "AI": ["god-and-the-algorithm", "gather-studio"],
    "Technology": ["god-and-the-algorithm", "gather-studio"],

    # Satire
    "Satire": ["gt"],
    "Dark Comedy": ["gt"],
    "Humor": [],  # humor alone doesn't route anywhere specific
}

# Tag → external publication fit
TAG_PUBLICATION_MAP = {
    "Faith": ["christian-century", "sojourners", "umc-global"],
    "Theology": ["christian-century", "image-journal"],
    "Mental Health": ["the-sun-magazine", "sojourners", "brevity"],
    "Bipolar": ["the-sun-magazine", "sojourners"],
    "Neurodiversity": ["christian-century", "sojourners"],
    "Farming": ["garden-gun", "oxford-american"],
    "Land": ["garden-gun", "oxford-american"],
    "Southern Culture": ["garden-gun", "oxford-american", "bitter-southerner"],
    "Place": ["oxford-american", "bitter-southerner", "foothills-magazine"],
    "Music": ["oxford-american", "paste-magazine", "image-journal"],
    "Arts": ["image-journal", "oxford-american"],
    "Humor": ["the-sun-magazine"],
    "Dark Comedy": ["the-sun-magazine"],
    "Satire": [],
    "AI": ["platformer", "god-and-the-algorithm"],
}


def load_env(key: str) -> str:
    v = os.environ.get(key, "").strip()
    if v:
        return v
    for path in [REPO / ".env.local", Path.home() / ".zshrc"]:
        if path.exists():
            for line in path.read_text().splitlines():
                if line.strip().startswith(f"{key}="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    return ""


def parse_column_from_ts(slug: str) -> dict | None:
    """
    Minimal parser for columns.ts. Extracts the column matching slug.
    Reads the block between { slug: "..." and the next top-level },
    then extracts key fields using regex.
    """
    text = COLUMNS_TS.read_text()

    # Find block starting with slug: "..." matching our slug
    pattern = rf'slug:\s*["\']({re.escape(slug)})["\']'
    m = re.search(pattern, text)
    if not m:
        return None

    # Extract the surrounding object
    start = text.rfind("{", 0, m.start())
    if start == -1:
        return None

    # Find matching closing brace (count braces)
    depth = 0
    i = start
    while i < len(text):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                break
        i += 1
    block = text[start:i+1]

    def field(name: str) -> str:
        m2 = re.search(rf'{name}:\s*["\`](.*?)["\`]', block, re.DOTALL)
        return m2.group(1).strip() if m2 else ""

    def field_array(name: str) -> list[str]:
        m2 = re.search(rf'{name}:\s*\[(.*?)\]', block, re.DOTALL)
        if not m2:
            return []
        return [s.strip().strip('"').strip("'") for s in m2.group(1).split(",") if s.strip().strip('"').strip("'")]

    def field_body() -> list[str]:
        m2 = re.search(r'body:\s*\[(.*?)\],', block, re.DOTALL)
        if not m2:
            return []
        raw = m2.group(1)
        return [s.strip().strip('"').strip("'") for s in re.split(r'",\s*"', raw) if s.strip().strip('"').strip("'")]

    return {
        "slug": slug,
        "title": field("title"),
        "dek": field("dek"),
        "status": field("status"),
        "outlet": field("outlet"),
        "tags": field_array("tags"),
        "pullQuote": field("pullQuote"),
        "body": field_body(),
        "scriptureAnchor": field("scriptureAnchor"),
    }


def determine_routes(tags: list[str]) -> tuple[list[str], list[str]]:
    """Returns (venture_targets, external_pub_targets) from tags."""
    ventures = set(["southern-legends"])  # SL is always a target
    externals = set()
    for tag in tags:
        for v in TAG_VENTURE_MAP.get(tag, []):
            ventures.add(v)
        for p in TAG_PUBLICATION_MAP.get(tag, []):
            externals.add(p)
    return sorted(ventures), sorted(externals)


def build_mdx(col: dict, run_date: str) -> str:
    """Build MDX content for the SL essay archive."""
    today = run_date or date.today().isoformat()
    tags_str = ", ".join(f'"{t}"' for t in col["tags"])
    body_text = "\n\n".join(col["body"])
    scripture = col.get("scriptureAnchor", "")
    pull = col.get("pullQuote", "")

    pull_block = f'\n<PullQuote>{pull}</PullQuote>\n' if pull else ""
    scripture_block = f'\n> *{scripture}*\n' if scripture else ""

    return f"""---
title: "{col['title']}"
subtitle: "{col['dek']}"
date: "{today}"
author: "Matt Headley"
published: true
featured: false
tags: [{tags_str}]
excerpt: "{col['dek']}"
originalPublication:
  name: "The Anniston Star"
  date: "{today}"
---

{scripture_block}
{pull_block}

{body_text}

---

*Originally published in The Anniston Star, {today}. Reprinted with permission.*
"""


def print_preview(col: dict, ventures: list[str], externals: list[str], run_date: str) -> None:
    print(f"\n{'='*60}")
    print(f"COLUMN: {col['title']}")
    print(f"Status: {col['status']} | Outlet: {col['outlet']}")
    print(f"Tags:   {', '.join(col['tags'])}")
    print(f"Run date: {run_date or 'not set'}")
    print(f"\nSyndication targets:")
    print(f"  Ventures:  {', '.join(ventures)}")
    print(f"  Externals: {', '.join(externals) or 'none staged'}")
    print(f"\nMDX would be written to:")
    print(f"  {JOURNAL_DIR / col['slug']}.mdx")
    print(f"\nNewsletter: /api/newsletter/send-post")
    print(f"{'='*60}\n")


def send_newsletter(col: dict) -> None:
    secret = load_env("ADMIN_SEND_SECRET")
    if not secret:
        print("[warn] ADMIN_SEND_SECRET not set — newsletter not sent")
        return

    excerpt = col["dek"] or (col["body"][0][:200] + "…" if col["body"] else "")
    payload = {
        "title": col["title"],
        "excerpt": excerpt,
        "postUrl": f"/essays/{col['slug']}",
        "section": "Faith Column",
    }
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        SL_SEND_URL, data=data,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {secret}"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            result = json.loads(resp.read())
            print(f"Newsletter sent: broadcast ID {result.get('broadcastId')}")
    except urllib.error.HTTPError as e:
        print(f"[warn] Newsletter failed [{e.code}]: {e.read().decode()}")


def stage_venture_posts(col: dict, ventures: list[str]) -> None:
    """Print staged posts for non-SL ventures."""
    for venture in ventures:
        if venture == "southern-legends":
            continue
        print(f"\n[STAGED — {venture.upper()}]")
        if venture == "ecclesia":
            print(f"  Post to ecclesiacommunity.org/journal/{col['slug']}")
            print(f"  Facebook: Ecclesia Community group")
        elif venture == "theaisle":
            print(f"  Post to theaisle.app/columns/{col['slug']}")
        elif venture == "attune":
            print(f"  Queue in Attune formation feed")
        elif venture == "backforty":
            print(f"  Post to southernlegends.blog/back-forty/{col['slug']}")
        elif venture in ("gt", "tpt"):
            print(f"  NOTE: satire routing — review before staging")


def stage_external_pitches(col: dict, externals: list[str]) -> None:
    """Print gated external pitch drafts."""
    if not externals:
        return
    print(f"\n[EXTERNAL PITCHES — ALL CAPS GATED — DO NOT SEND WITHOUT AUTHORIZATION]")
    for pub in externals:
        print(f"\n  {pub.upper()}")
        print(f"  Subject: Submission inquiry — \"{col['title']}\"")
        print(f"  Body: I'm Matt Headley, pastor and columnist for The Anniston Star.")
        print(f"  Attached piece: \"{col['title']}\" ({len(' '.join(col['body']).split())} words)")
        print(f"  Published: {col['outlet']}, {date.today().strftime('%B %d, %Y')}")
        print(f"  [EDIT: add publication-specific hook before sending]")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("slug", help="Column slug from columns.ts")
    parser.add_argument("--publish", action="store_true", help="Write MDX and mark as published")
    parser.add_argument("--send", action="store_true", help="Also send newsletter blast")
    parser.add_argument("--run-date", default="", help="Star publication date (YYYY-MM-DD)")
    args = parser.parse_args()

    col = parse_column_from_ts(args.slug)
    if not col:
        print(f"Column '{args.slug}' not found in {COLUMNS_TS}")
        sys.exit(1)

    ventures, externals = determine_routes(col["tags"])
    run_date = args.run_date or date.today().isoformat()

    if not args.publish:
        print_preview(col, ventures, externals, run_date)
        stage_venture_posts(col, ventures)
        stage_external_pitches(col, externals)
        print("Run with --publish to write the MDX and push to SL.")
        return

    # Write MDX
    mdx_path = JOURNAL_DIR / f"{args.slug}.mdx"
    if mdx_path.exists():
        print(f"[warn] {mdx_path} already exists — overwrite? (y/n) ", end="")
        if input().strip().lower() != "y":
            print("Aborted.")
            sys.exit(0)

    mdx = build_mdx(col, run_date)
    mdx_path.write_text(mdx)
    print(f"✓ MDX written: {mdx_path}")

    # Report routing
    print(f"✓ Syndication targets: {', '.join(ventures)}")
    stage_venture_posts(col, ventures)
    stage_external_pitches(col, externals)

    # Newsletter
    if args.send:
        send_newsletter(col)
    else:
        print(f"\nNewsletter: run with --send to broadcast to subscribers.")

    print(f"\nDone. Next: git add content/journal/{args.slug}.mdx && git commit && push.")


if __name__ == "__main__":
    main()
