"""
Build Fourthwall print file for CLT sticker.
Output: 900x900 PNG (3" at 300 DPI), transparent background.
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

from PIL import Image, ImageDraw
from print_utils import imfell, draw_arc_text

MERCH_DIR = os.path.dirname(os.path.abspath(__file__))
BADGE = os.path.join(MERCH_DIR, "chief-ladiga-badge-nobg.png")

SIZE = 1800
BADGE_PX = 926
CX, CY = SIZE // 2, SIZE // 2

def build_sticker():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))

    # Badge
    badge = Image.open(BADGE).convert("RGBA")
    badge = badge.resize((BADGE_PX, BADGE_PX), Image.LANCZOS)
    bx = (SIZE - BADGE_PX) // 2
    by = (SIZE - BADGE_PX) // 2
    img.paste(badge, (bx, by), badge)

    # Arc text radius — just outside the badge circle
    radius = BADGE_PX // 2 + 10

    # Top: "1832 · 2032" — IM Fell italic
    font_dates = imfell(68, italic=True)
    draw_arc_text(img, "1832 · 2032", font_dates, CX, CY, radius,
                  top=True, tracking=6, fill=(28, 25, 23, 178))

    # Bottom: "southernlegends.blog" — IM Fell regular
    font_url = imfell(62, italic=False)
    draw_arc_text(img, "southernlegends.blog", font_url, CX, CY, radius,
                  top=False, tracking=3, fill=(28, 25, 23, 178))

    return img


print("Building sticker...")
sticker = build_sticker()
out = os.path.join(MERCH_DIR, "clt-sl-sticker-print-v2.png")
sticker.save(out, "PNG")
print(f"  Saved: {out}")
print("Done.")
