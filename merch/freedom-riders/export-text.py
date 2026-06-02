from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.dirname(os.path.abspath(__file__))
FONT_REG = "/Volumes/Samsung_T5/webdev/southern-legends/merch/fonts/IMFellEnglish-Regular.ttf"
FONT_ITA = "/Volumes/Samsung_T5/webdev/southern-legends/merch/fonts/IMFellEnglish-Italic.ttf"
COLOR = (28, 25, 23)  # #1c1917 — dark version
WHITE = (255, 255, 255)  # white version

def make_text_png(text, font_path, size, filename, max_width=None, line_spacing=1.3, color=COLOR):
    font = ImageFont.truetype(font_path, size)

    # Split on explicit \n or wrap at max_width
    lines = text.split('\n')

    # Measure each line
    dummy = Image.new('RGBA', (1, 1))
    draw = ImageDraw.Draw(dummy)

    line_heights = []
    line_widths = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        line_widths.append(bbox[2] - bbox[0])
        line_heights.append(bbox[3] - bbox[1])

    img_w = max(line_widths) + 20
    line_h = max(line_heights)
    img_h = int(line_h * line_spacing * len(lines)) + 20

    img = Image.new('RGBA', (img_w, img_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    y = 10
    for i, line in enumerate(lines):
        bbox = draw.textbbox((0, 0), line, font=font)
        x = (img_w - (bbox[2] - bbox[0])) // 2
        draw.text((x, y), line, font=font, fill=color + (255,))
        y += int(line_h * line_spacing)

    # Trim transparent edges
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    path = os.path.join(OUT, filename)
    img.save(path, 'PNG')
    print(f"Saved: {filename} ({img.size[0]}×{img.size[1]}px)")

elements = [
    # (text, font, size, filename)
    ('"I was trying to get\na date with a woman."', FONT_ITA, 72, 'text-quote.png'),
    ('David Dennis', FONT_REG, 96, 'text-name-large.png'),
    ('David Dennis', FONT_REG, 56, 'text-name-small.png'),
    ('Freedom Rider · 1961', FONT_ITA, 42, 'text-role.png'),
    ('ANNISTON, ALABAMA · MAY 14, 1961', FONT_REG, 28, 'text-location.png'),
    ('20883 · JACKSON, MISS. · 1961', FONT_REG, 28, 'text-booking.png'),
    ('SOUTHERN LEGENDS', FONT_ITA, 28, 'text-sl-credit.png'),
]

for text, font, size, filename in elements:
    make_text_png(text, font, size, filename)

# White versions for dark shirts
print('\nExporting white versions...')
for text, font, size, filename in elements:
    white_filename = filename.replace('text-', 'text-white-')
    make_text_png(text, font, size, white_filename, color=WHITE)

print('\nDone. All text PNGs exported to:', OUT)
