#!/usr/bin/env python3
"""Build this session's Woodstock 5K markdown deliverables into branded HTML, open + email."""
import re, os, html, subprocess, sys

SL = "/Volumes/Samsung_T5/webdev/southern-legends"
FONTS = "/Volumes/Samsung_T5/webdev/gather/assets/fonts"
OUT = f"{SL}/public/promos/woodstock/docs"
os.makedirs(OUT, exist_ok=True)

def md_to_html(md):
    # strip yaml frontmatter
    md = re.sub(r'^---\n.*?\n---\n', '', md, count=1, flags=re.S)
    # strip mdx JSX comments and lone component tags
    md = re.sub(r'\{/\*.*?\*/\}', '', md, flags=re.S)
    md = re.sub(r'^<[A-Z][^>]*/>\s*$', '', md, flags=re.M)
    lines = md.split('\n')
    out, in_ul, in_ol = [], False, False
    def close_lists():
        nonlocal in_ul, in_ol
        if in_ul: out.append('</ul>'); in_ul = False
        if in_ol: out.append('</ol>'); in_ol = False
    def inline(t):
        t = html.escape(t)
        t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', t)
        t = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', t)
        t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
        t = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', t)
        return t
    for ln in lines:
        s = ln.rstrip()
        if not s.strip():
            close_lists(); continue
        if re.match(r'^---+$', s): close_lists(); out.append('<hr>'); continue
        m = re.match(r'^(#{1,4})\s+(.*)', s)
        if m:
            close_lists(); lvl = len(m.group(1)); out.append(f'<h{lvl}>{inline(m.group(2))}</h{lvl}>'); continue
        m = re.match(r'^\s*[-*]\s+(.*)', s)
        if m:
            if in_ol: out.append('</ol>'); in_ol = False
            if not in_ul: out.append('<ul>'); in_ul = True
            out.append(f'<li>{inline(m.group(1))}</li>'); continue
        m = re.match(r'^\s*\d+\.\s+(.*)', s)
        if m:
            if in_ul: out.append('</ul>'); in_ul = False
            if not in_ol: out.append('<ol>'); in_ol = True
            out.append(f'<li>{inline(m.group(1))}</li>'); continue
        m = re.match(r'^>\s?(.*)', s)
        if m:
            close_lists(); out.append(f'<blockquote>{inline(m.group(1))}</blockquote>'); continue
        close_lists(); out.append(f'<p>{inline(s)}</p>')
    close_lists()
    return '\n'.join(out)

def page(title, body_html, hero=None):
    hero_html = f'<img class="hero" src="file://{hero}" alt="">' if hero else ''
    return f'''<!DOCTYPE html><html><head><meta charset="utf-8"><title>{html.escape(title)}</title><style>
@font-face{{font-family:'Fraunces';src:url('file://{FONTS}/Fraunces-Black.ttf');font-weight:900}}
@font-face{{font-family:'DM Sans';src:url('file://{FONTS}/DMSans-Regular.ttf');font-weight:400}}
@font-face{{font-family:'DM Sans';src:url('file://{FONTS}/DMSans-Medium.ttf');font-weight:500}}
*{{box-sizing:border-box}}
body{{margin:0;background:#0e1510;color:#eee6d6;font-family:'DM Sans',sans-serif;line-height:1.6;font-size:17px}}
.wrap{{max-width:820px;margin:0 auto;padding:0 34px 90px}}
.hero{{width:100%;height:300px;object-fit:cover;display:block;filter:brightness(.82)}}
.masthead{{background:#080c08;border-bottom:1px solid #2b3622;padding:22px 34px;display:flex;justify-content:space-between;align-items:center}}
.masthead b{{font-family:'Fraunces';font-size:22px;color:#f2ede3}}
.masthead span{{font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8f8a76}}
h1{{font-family:'Fraunces';font-weight:900;font-size:44px;line-height:1.05;margin:38px 0 8px;color:#f2ede3}}
h2{{font-family:'Fraunces';font-weight:900;font-size:28px;margin:34px 0 10px;color:#e4c53f;border-top:1px solid #26311f;padding-top:22px}}
h3{{font-family:'Fraunces';font-weight:900;font-size:21px;margin:24px 0 6px;color:#f2ede3}}
h4{{font-size:15px;letter-spacing:1px;text-transform:uppercase;color:#9a6c2f;margin:20px 0 4px}}
p{{margin:12px 0}} a{{color:#e4c53f}}
strong{{color:#f7efdf}}
ul,ol{{margin:12px 0;padding-left:22px}} li{{margin:6px 0}}
code{{background:#12190f;border:1px solid #2b3622;border-radius:4px;padding:1px 6px;font-size:14px;color:#c9c1b1}}
blockquote{{border-left:3px solid #e4c53f;background:rgba(228,197,63,.06);margin:16px 0;padding:12px 18px;color:#d8d0c0;font-style:italic}}
hr{{border:0;border-top:1px solid #26311f;margin:28px 0}}
.foot{{margin-top:40px;border-top:1px solid #26311f;padding-top:18px;font-size:13px;color:#8f8a76}}
</style></head><body>
<div class="masthead"><b>Southern Legends</b><span>Gather Studio · Woodstock 5K</span></div>
{hero_html}
<div class="wrap">{body_html}
<div class="foot">Built by Gather Studio by Matt Headley · southernlegends.blog</div>
</div></body></html>'''

DOCS = [
    ("woodstock-5k-saas-pitch.html", "Woodstock 5K — Gather Studio Pitch",
     f"{SL}/content/outreach/woodstock-5k-saas-pitch.md", None),
    ("woodstock-5k-scaffold.html", "Woodstock 5K — SL Profile Scaffold",
     f"{SL}/content/profiles-research/woodstock-5k-scaffold.md",
     f"{SL}/public/images/journal/chief-ladiga-trail-heather-running.webp"),
    ("landon-vendor-submit.html", "Landon — Vendor App Submit (DRAFT)",
     f"{SL}/content/outreach/landon-vendor-submit-draft.md", None),
    ("woodstock-5k-profile.html", "Woodstock 5K — Profile (Forty-Five Summers)",
     f"{SL}/content/profiles/woodstock-5k.mdx",
     f"{SL}/public/images/journal/chief-ladiga-trail-heather-running.webp"),
]
built = []
for fname, title, src, hero in DOCS:
    if not os.path.exists(src):
        print("MISS", src); continue
    md = open(src).read()
    out_path = f"{OUT}/{fname}"
    open(out_path, "w").write(page(title, md_to_html(md), hero))
    built.append(out_path)
    print("built", fname)

# open all in browser
subprocess.run(["open"] + built, check=False)
print("BUILT", len(built))
for b in built: print(b)
