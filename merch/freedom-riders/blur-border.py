from PIL import Image, ImageFilter
import numpy as np
import os

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dennis-hedcut-transparent.png')
DST = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dennis-hedcut-vignette-white.png')

img = Image.open(SRC).convert('RGBA')
# Composite onto white background first
white = Image.new('RGBA', img.size, (255, 255, 255, 255))
white.paste(img, mask=img.split()[3])
img = white
w, h = img.size

# Build a radial vignette mask — white center, black edges
# Fades from full opacity at center to transparent at edges
cx, cy = w / 2, h * 0.45  # center slightly above midpoint for portrait
rx, ry = w * 0.42, h * 0.48  # ellipse radii

xs = np.linspace(0, w, w)
ys = np.linspace(0, h, h)
xg, yg = np.meshgrid(xs, ys)

dist = np.sqrt(((xg - cx) / rx) ** 2 + ((yg - cy) / ry) ** 2)

# Smooth falloff: fully opaque inside radius 0.7, fades to 0 at radius 1.1
inner, outer = 0.88, 1.02
mask = np.clip((outer - dist) / (outer - inner), 0, 1)

# Smooth the mask
mask_img = Image.fromarray((mask * 255).astype(np.uint8), 'L')
mask_img = mask_img.filter(ImageFilter.GaussianBlur(radius=30))

# Apply to alpha channel
r, g, b, a = img.split()
orig_alpha = np.array(a).astype(float)
vignette_alpha = np.array(mask_img).astype(float)
new_alpha = (orig_alpha * vignette_alpha / 255).astype(np.uint8)

result = Image.merge('RGBA', (r, g, b, Image.fromarray(new_alpha)))
result.save(DST, 'PNG')
print(f'Saved: {DST} ({w}×{h}px)')
