"""
Build Fourthwall print files for CLT x SL merch.
Output: 4500x4500 PNG (tote), 4500x5400 PNG (shirt), transparent background.
"""
from PIL import Image, ImageDraw, ImageFont
import os

MERCH_DIR = os.path.dirname(os.path.abspath(__file__))
BADGE = os.path.join(MERCH_DIR, "chief-ladiga-badge-2x.png")

# Fourthwall specs
TOTE_SIZE = (4500, 4500)
SHIRT_SIZE = (4500, 5400)

def find_font(names, size):
    for name in names:
        try:
            return ImageFont.truetype(name, size)
        except:
            pass
    return ImageFont.load_default()

def build_design(canvas_size, badge_px=1800):
    w, h = canvas_size
    img = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Load badge and remove white background
    badge = Image.open(BADGE).convert("RGBA")
    data = badge.getdata()
    new_data = []
    for r, g, b, a in data:
        # Knock out near-white pixels
        if r > 230 and g > 230 and b > 230:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append((r, g, b, a))
    badge.putdata(new_data)
    badge = badge.resize((badge_px, badge_px), Image.LANCZOS)

    # Center badge, vertically centered on chest (upper 55% of canvas)
    badge_x = (w - badge_px) // 2
    badge_y = int(h * 0.08)
    img.paste(badge, (badge_x, badge_y), badge)

    # "1832" — IM Fell English
    font_year = find_font([
        os.path.join(MERCH_DIR, "IMFellEnglish-Regular.ttf"),
        "/Library/Fonts/Georgia.ttf",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
    ], 420)

    font_sl = find_font([
        os.path.join(MERCH_DIR, "IMFellEnglish-Italic.ttf"),
        "/Library/Fonts/Georgia Italic.ttf",
        "/System/Library/Fonts/Supplemental/Georgia Italic.ttf",
    ], 200)

    year_text = "1832"
    sl_text = "SOUTHERN  LEGENDS"

    CREAM = (245, 240, 232, 255)
    CREAM_DIM = (245, 240, 232, 200)

    # Measure text blocks
    bbox_year = draw.textbbox((0, 0), year_text, font=font_year)
    year_w = bbox_year[2] - bbox_year[0]
    year_h = bbox_year[3] - bbox_year[1]

    bbox_sl = draw.textbbox((0, 0), sl_text, font=font_sl)
    sl_w = bbox_sl[2] - bbox_sl[0]
    sl_h = bbox_sl[3] - bbox_sl[1]

    gap = 60  # space between year and SL text
    total_h = badge_px + 80 + year_h + gap + sl_h

    # Center the whole design block vertically
    block_top = (h - total_h) // 2
    badge_y = block_top
    year_y = badge_y + badge_px + 80
    sl_y = year_y + year_h + gap

    # Re-paste badge at new position
    img2 = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    draw2 = ImageDraw.Draw(img2)
    img2.paste(badge, ((w - badge_px) // 2, badge_y), badge)

    draw2.text(((w - year_w) // 2, year_y), year_text, font=font_year, fill=CREAM)
    draw2.text(((w - sl_w) // 2, sl_y), sl_text, font=font_sl, fill=CREAM_DIM)

    return img2

# Build tote
print("Building tote...")
tote = build_design(TOTE_SIZE, badge_px=2000)
tote_path = os.path.join(MERCH_DIR, "clt-sl-tote-print.png")
tote.save(tote_path, "PNG")
print(f"  Saved: {tote_path}")

# Build shirt
print("Building shirt...")
shirt = build_design(SHIRT_SIZE, badge_px=1900)
shirt_path = os.path.join(MERCH_DIR, "clt-sl-shirt-print.png")
shirt.save(shirt_path, "PNG")
print(f"  Saved: {shirt_path}")

print("Done.")
