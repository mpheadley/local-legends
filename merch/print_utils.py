"""
Shared utilities for SL merch print file generation.
"""
import math
import os
from PIL import Image, ImageDraw, ImageFont

FONTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")


def find_font(names, size):
    for name in names:
        try:
            return ImageFont.truetype(name, size)
        except:
            pass
    return ImageFont.load_default()


def imfell(size, italic=False):
    filename = "IMFellEnglish-Italic.ttf" if italic else "IMFellEnglish-Regular.ttf"
    return find_font([os.path.join(FONTS_DIR, filename)], size)


def abril(size):
    return find_font([os.path.join(FONTS_DIR, "AbrilFatface-Regular.ttf")], size)


def char_width(draw, ch, font):
    bb = draw.textbbox((0, 0), ch, font=font)
    return bb[2] - bb[0]


def char_height(draw, font):
    bb = draw.textbbox((0, 0), "A", font=font)
    return bb[3] - bb[1]


def draw_tracked(draw, x, y, text, font, fill, tracking=0):
    """Draw text with manual letter-spacing (tracking)."""
    cx = x
    for ch in text:
        draw.text((cx, y), ch, font=font, fill=fill)
        cx += char_width(draw, ch, font) + tracking


def tracked_width(draw, text, font, tracking=0):
    return sum(char_width(draw, ch, font) for ch in text) + tracking * (len(text) - 1)


def draw_arc_text(img, text, font, cx, cy, radius, top=True, tracking=0, fill=(0, 0, 0, 255)):
    """
    Draw text along a circular arc.
    top=True  — text arcs along the top, reads left to right, glyphs point outward.
    top=False — text arcs along the bottom, reads left to right, glyphs point inward.
    Uses PIL y-down coordinate system (angle increases clockwise).
    """
    draw = ImageDraw.Draw(img)

    char_widths = [char_width(draw, ch, font) for ch in text]
    total_px = sum(char_widths) + tracking * (len(text) - 1)
    total_angle = total_px / radius  # radians

    if top:
        # Top arc: center at -π/2, characters advance clockwise (increasing angle)
        angle = -math.pi / 2 - total_angle / 2
        step = 1
    else:
        # Bottom arc: center at π/2, characters advance counter-clockwise (decreasing angle)
        angle = math.pi / 2 + total_angle / 2
        step = -1

    # Compute consistent dy from full font metrics so all chars share the same baseline
    _ref = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
    font_bb = _ref.textbbox((0, 0), "Ag", font=font)
    font_top, font_bottom = font_bb[1], font_bb[3]
    font_height = font_bottom - font_top

    for i, ch in enumerate(text):
        cw = char_widths[i]
        # Center angle for this character
        char_angle = angle + step * (cw / 2) / radius

        x = cx + radius * math.cos(char_angle)
        y = cy + radius * math.sin(char_angle)

        # Rotation: top uses +90, bottom uses -90 (verified for y-down coords)
        rot_deg = math.degrees(char_angle) + 90 if top else math.degrees(char_angle) - 90

        pad = max(cw, char_height(draw, font)) * 3
        char_img = Image.new("RGBA", (int(pad), int(pad)), (0, 0, 0, 0))
        char_draw = ImageDraw.Draw(char_img)
        bb = char_draw.textbbox((0, 0), ch, font=font)
        gw = bb[2] - bb[0]
        dx = pad // 2 - gw // 2 - bb[0]
        dy = pad // 2 - font_height // 2 - font_top  # same baseline for every char
        char_draw.text((dx, dy), ch, font=font, fill=fill)

        rotated = char_img.rotate(-rot_deg, expand=True, resample=Image.BICUBIC)
        img.paste(rotated, (int(x - rotated.width / 2), int(y - rotated.height / 2)), rotated)

        angle += step * (cw + (tracking if i < len(text) - 1 else 0)) / radius
