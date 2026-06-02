from PIL import Image, ImageFilter
import numpy as np
import os

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dennis-hedcut.png')
DST = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dennis-hedcut-faded.png')

img = Image.open(SRC).convert('RGBA')
w, h = img.size

fade = 200  # px fade on each edge

xs = np.linspace(0, 1, w)
ys = np.linspace(0, 1, h)

left   = np.clip(xs / (fade / w), 0, 1)
right  = np.clip((1 - xs) / (fade / w), 0, 1)
top    = np.clip(ys / (fade / h), 0, 1)
bottom = np.clip((1 - ys) / (fade / h), 0, 1)

xg, yg = np.meshgrid(left * right, top * bottom)
mask = np.sqrt(xg * yg)
mask = np.clip(mask, 0, 1)

mask_img = Image.fromarray((mask * 255).astype(np.uint8), 'L')
mask_img = mask_img.filter(ImageFilter.GaussianBlur(radius=12))

# Apply fade mask to alpha channel
r, g, b, a = img.split()
orig_alpha = np.array(a).astype(float)
fade_alpha = np.array(mask_img).astype(float)
new_alpha = (orig_alpha * fade_alpha / 255).astype(np.uint8)

result = Image.merge('RGBA', (r, g, b, Image.fromarray(new_alpha)))
result.save(DST, 'PNG')
print(f'Saved: {DST} ({w}×{h}px)')
