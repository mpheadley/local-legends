#!/usr/bin/env python3
"""
SL Profile Audit — every Southern Legends profile against the profile standard.

Standard (HARD RULES — see CLAUDE.md "SL Profile Standard"):
  1. heroImage present + face-focused (heroPosition set when needed)
  2. NO `aiWritten: true` — profiles carry Matt's editorial byline, no AI marking.
     (The renderer 404s any profile with aiWritten:true, so this also = broken.)
  3. >= 1 inline image (ArticleImage / InlineImage)
  4. carousel (<PhotoCarousel slidesId="..."/>) when 3+ images are available
  5. >= 1 pull quote (<PullQuote>)
  6. >= 2 internal crosslinks
  7. no AI-disclosure footer

Usage:
  python3 tools/sl-profile-audit.py            # report only
  python3 tools/sl-profile-audit.py --fix       # apply SAFE mechanical fixes
                                                 # (only removes aiWritten flag when
                                                 #  --allow-publish is ALSO passed)
  python3 tools/sl-profile-audit.py --fix --allow-publish
"""
import re, sys, os, glob

ROOT = os.path.join(os.path.dirname(__file__), "..")
PROFILES = os.path.join(ROOT, "content", "profiles")

def parse(fm_text):
    d = {}
    for line in fm_text.splitlines():
        m = re.match(r'^(\w+):\s*(.*)$', line)
        if m:
            d[m.group(1)] = m.group(2).strip().strip('"')
    return d

def audit_file(path):
    raw = open(path, encoding="utf-8").read()
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', raw, re.DOTALL)
    if not m:
        return None
    fm, body = parse(m.group(1)), m.group(2)
    issues = []
    if fm.get("published") == "true":
        if "aiWritten: true" in m.group(1):
            issues.append("AI-GATED (published but aiWritten:true -> 404s live)")
    elif "aiWritten: true" in m.group(1):
        issues.append("aiWritten:true (draft, dark)")
    if not fm.get("heroImage"):
        issues.append("no heroImage")
    inline = len(re.findall(r'<(ArticleImage|InlineImage)\b', body))
    if inline == 0:
        issues.append("no inline image")
    if "<PullQuote" not in body:
        issues.append("no pull quote")
    if "<PhotoCarousel" not in body:
        issues.append("no carousel")
    links = len(re.findall(r'\]\(/(?:profiles|journal|essays|cities|guides)/', body))
    if links < 2:
        issues.append(f"<2 crosslinks ({links})")
    return {"slug": os.path.basename(path)[:-4], "fm": fm, "raw_fm": m.group(1),
            "body": body, "issues": issues, "path": path}

def main():
    fix = "--fix" in sys.argv
    allow_publish = "--allow-publish" in sys.argv
    files = sorted(glob.glob(os.path.join(PROFILES, "*.mdx")))
    results = [r for r in (audit_file(f) for f in files) if r]
    clean = [r for r in results if not r["issues"]]
    print(f"\n=== SL PROFILE AUDIT — {len(results)} profiles, {len(clean)} clean ===\n")
    # group by issue
    from collections import Counter
    counts = Counter()
    for r in results:
        for i in r["issues"]:
            counts[i.split(" (")[0]] += 1
    print("Issue tallies:")
    for k, v in counts.most_common():
        print(f"  {v:3d}  {k}")
    print("\nPer-profile:")
    for r in results:
        if r["issues"]:
            print(f"  {r['slug']:42s} {'; '.join(r['issues'])}")
    if fix:
        fixed = 0
        for r in results:
            new = r_raw = open(r["path"], encoding="utf-8").read()
            # SAFE fix: strip aiWritten flag only when explicitly allowed to publish
            if allow_publish and "aiWritten: true" in new:
                new = re.sub(r'\naiWritten:\s*true', '', new)
            if new != r_raw:
                open(r["path"], "w", encoding="utf-8").write(new)
                fixed += 1
        print(f"\n[--fix] rewrote {fixed} files"
              + ("" if allow_publish else " (aiWritten flag left in place — pass --allow-publish to strip)"))

if __name__ == "__main__":
    main()
