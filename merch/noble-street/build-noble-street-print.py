"""
Build Fourthwall print file for Noble Street shirt.
Noble Street, Anniston, AL — arts corridor, bike trail gateway, community backbone.
Output: 4500x5400 PNG, transparent background.
Font: Abril Fatface for headline, IM Fell English for supporting text.
"""
from PIL import Image, ImageDraw, ImageFont
import os

MERCH_DIR = os.path.dirname(os.path.abspath(__file__))
FONTS_DIR = os.path.join(MERCH_DIR, "../fonts")
SHIRT_SIZE = (4500, 5400)

def find_font(names, size):
    for name in names:
        try:
            return ImageFont.truetype(name, size)
        except:
            pass
    return ImageFont.load_default()

def tw(draw, text, font):
    bb = draw.textbbox((0, 0), text, font=font)
    return bb[2] - bb[0], bb[3] - bb[1]

def draw_tracked(draw, x, y, text, font, fill, tracking=4):
    cx = x
    for ch in text:
        draw.text((cx, y), ch, font=font, fill=fill)
        cx += tw(draw, ch, font)[0] + tracking

def build_shirt(dark=False):
    w, h = SHIRT_SIZE
    img = Image.new("RGBA", SHIRT_SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    if dark:
        INK = (245, 240, 232, 255)
        INK_DIM = (245, 240, 232, 170)
        INK_LIGHT = (245, 240, 232, 120)
    else:
        INK = (28, 25, 23, 255)
        INK_DIM = (28, 25, 23, 180)
        INK_LIGHT = (28, 25, 23, 100)

    font_headline = find_font([os.path.join(FONTS_DIR, "AbrilFatface-Regular.ttf")], 600)
    font_sub = find_font([os.path.join(FONTS_DIR, "AbrilFatface-Regular.ttf")], 220)
    font_eyebrow = find_font([os.path.join(FONTS_DIR, "IMFellEnglish-Italic.ttf"),
                              "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"], 155)
    font_sl = find_font([os.path.join(FONTS_DIR, "IMFellEnglish-Italic.ttf"),
                         "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"], 175)
    font_addr = find_font([os.path.join(FONTS_DIR, "IMFellEnglish-Regular.ttf"),
                           "/System/Library/Fonts/Supplemental/Georgia.ttf"], 130)

    eyebrow = "Anniston, Alabama"
    line1 = "Noble"
    line2 = "Street"
    addr = "THE  ARTS  CORRIDOR  ·  THE  TRAIL  GATEWAY"
    sl = "SOUTHERN  LEGENDS"

    rule_h = 7
    rule_w = 860

    l1w, l1h = tw(draw, line1, font_headline)
    l2w, l2h = tw(draw, line2, font_headline)

    def ew_tracked(text, font, tracking=4):
        total = sum(tw(draw, c, font)[0] for c in text) + tracking * (len(text) - 1)
        _, fh = tw(draw, text, font)
        return total, fh

    eyebrow_w, eyebrow_h = ew_tracked(eyebrow, font_eyebrow, 4)
    addr_w, addr_h = ew_tracked(addr, font_addr, 3)
    sl_w, sl_h = tw(draw, sl, font_sl)

    gap_eyebrow_rule = 70
    gap_rule_headline = 90
    gap_headline = -30        # tight stack — Abril Fatface has internal padding
    gap_headline_addr = 380   # Abril Fatface at 600px has ~350px internal descender padding
    gap_addr_rule = 90
    gap_rule_sl = 75

    total_h = (eyebrow_h + gap_eyebrow_rule +
               rule_h + gap_rule_headline +
               l1h + gap_headline + l2h +
               gap_headline_addr + addr_h +
               gap_addr_rule + rule_h + gap_rule_sl +
               sl_h)

    y = int(h * 0.34) - total_h // 2
    rx = (w - rule_w) // 2

    # Eyebrow
    draw_tracked(draw, (w - eyebrow_w) // 2, y, eyebrow, font_eyebrow, INK_DIM, 4)
    y += eyebrow_h + gap_eyebrow_rule

    # Top rule
    draw.rectangle([rx, y, rx + rule_w, y + rule_h], fill=INK_DIM)
    y += rule_h + gap_rule_headline

    # NOBLE (large)
    draw.text(((w - l1w) // 2, y), line1, font=font_headline, fill=INK)
    y += l1h + gap_headline

    # STREET (large)
    draw.text(((w - l2w) // 2, y), line2, font=font_headline, fill=INK)
    y += l2h + gap_headline_addr

    # Arts corridor subline
    draw_tracked(draw, (w - addr_w) // 2, y, addr, font_addr, INK_LIGHT, 3)
    y += addr_h + gap_addr_rule

    # Bottom rule
    draw.rectangle([rx, y, rx + rule_w, y + rule_h], fill=INK_DIM)
    y += rule_h + gap_rule_sl

    # Southern Legends
    draw.text(((w - sl_w) // 2, y), sl, font=font_sl, fill=INK_DIM)

    return img

os.makedirs(MERCH_DIR, exist_ok=True)

print("Building light shirt (dark ink on ivory/white)...")
shirt = build_shirt(dark=False)
out = os.path.join(MERCH_DIR, "noble-street-shirt-print.png")
shirt.save(out, "PNG")
print(f"  Saved: {out}")

print("Building dark shirt (cream ink on dark)...")
shirt_dark = build_shirt(dark=True)
out_dark = os.path.join(MERCH_DIR, "noble-street-shirt-print-dark.png")
shirt_dark.save(out_dark, "PNG")
print(f"  Saved: {out_dark}")

print("Done.")
