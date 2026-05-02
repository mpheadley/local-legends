"""
Build Fourthwall print file for The Model City shirt.
Output: 4500x5400 PNG, transparent background, dark ink on transparent.
Font: Abril Fatface for headline, IM Fell English Italic for "Southern Legends"
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

def build_shirt(dark=False):
    w, h = SHIRT_SIZE
    img = Image.new("RGBA", SHIRT_SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    if dark:
        INK = (245, 240, 232, 255)      # #f5f0e8 — cream
        INK_DIM = (245, 240, 232, 180)  # dimmed cream
    else:
        INK = (28, 25, 23, 255)         # #1c1917 — dark brown
        INK_DIM = (28, 25, 23, 180)     # dimmed for supporting text

    font_headline = find_font([
        os.path.join(FONTS_DIR, "AbrilFatface-Regular.ttf"),
    ], 520)

    font_eyebrow = find_font([
        os.path.join(FONTS_DIR, "IMFellEnglish-Italic.ttf"),
        "/System/Library/Fonts/Supplemental/Georgia Italic.ttf",
    ], 160)

    font_sl = find_font([
        os.path.join(FONTS_DIR, "IMFellEnglish-Italic.ttf"),
        "/System/Library/Fonts/Supplemental/Georgia Italic.ttf",
    ], 180)

    eyebrow = "Anniston, Alabama — Est. 1872"
    line1 = "The"
    line2 = "Model"
    line3 = "City"
    sl = "SOUTHERN  LEGENDS"

    # Measure all text blocks
    def tw(text, font):
        bb = draw.textbbox((0, 0), text, font=font)
        return bb[2] - bb[0], bb[3] - bb[1]

    def tw_tracked(text, font, tracking):
        total = sum(tw(c, font)[0] for c in text) + tracking * (len(text) - 1)
        _, h = tw(text, font)
        return total, h

    def draw_tracked(x, y, text, font, fill, tracking):
        cx = x
        for ch in text:
            draw.text((cx, y), ch, font=font, fill=fill)
            cx += tw(ch, font)[0] + tracking

    EYEBROW_TRACKING = 4  # ~1px screen at this print scale

    ew, eh = tw_tracked(eyebrow, font_eyebrow, EYEBROW_TRACKING)
    l1w, l1h = tw(line1, font_headline)
    l2w, l2h = tw(line2, font_headline)
    l3w, l3h = tw(line3, font_headline)
    slw, slh = tw(sl, font_sl)

    rule_h = 8
    rule_w = 800
    gap_eyebrow_rule = 80    # eyebrow to top rule
    gap_rule_headline = 100  # top rule to "The"
    gap_headline = 10        # between headline lines
    gap_headline_rule = 430  # compensates for Abril Fatface bbox including full descender (170px internal padding)
    gap_rule_sl = 80         # bottom rule to "Southern Legends"

    total_h = (eh + gap_eyebrow_rule +
               rule_h + gap_rule_headline +
               l1h + gap_headline + l2h + gap_headline + l3h +
               gap_headline_rule + rule_h + gap_rule_sl +
               slh)

    # Position block at chest — 35% from top
    y = int(h * 0.35) - total_h // 2

    rx = (w - rule_w) // 2

    # Eyebrow
    draw_tracked((w - ew) // 2, y, eyebrow, font_eyebrow, INK_DIM, EYEBROW_TRACKING)
    y += eh + gap_eyebrow_rule

    # Top rule
    draw.rectangle([rx, y, rx + rule_w, y + rule_h], fill=INK_DIM)
    y += rule_h + gap_rule_headline

    # Headline — stacked
    draw.text(((w - l1w) // 2, y), line1, font=font_headline, fill=INK)
    y += l1h + gap_headline
    draw.text(((w - l2w) // 2, y), line2, font=font_headline, fill=INK)
    y += l2h + gap_headline
    draw.text(((w - l3w) // 2, y), line3, font=font_headline, fill=INK)
    y += l3h + gap_headline_rule

    # Bottom rule
    draw.rectangle([rx, y, rx + rule_w, y + rule_h], fill=INK_DIM)
    y += rule_h + gap_rule_sl

    # Southern Legends
    draw.text(((w - slw) // 2, y), sl, font=font_sl, fill=INK_DIM)

    return img

print("Building light shirt (dark ink)...")
shirt = build_shirt(dark=False)
out = os.path.join(MERCH_DIR, "model-city-shirt-print.png")
shirt.save(out, "PNG")
print(f"  Saved: {out}")

print("Building dark shirt (cream ink)...")
shirt_dark = build_shirt(dark=True)
out_dark = os.path.join(MERCH_DIR, "model-city-shirt-print-dark.png")
shirt_dark.save(out_dark, "PNG")
print(f"  Saved: {out_dark}")

print("Done.")
