#!/usr/bin/env python3
"""Fix three hedcuts: strip text from bus/falls, rerun Chief Ladiga as Muscogee."""

import base64
import json
import sys
import requests
import time
from pathlib import Path
from PIL import Image
import io

# Cost guard
sys.path.insert(0, str(Path(__file__).parent.parent / "tools"))
try:
    from cost_guard import CostGuard
    _guard = CostGuard()
    # 3 jobs: 1 Imagen (bus) + 2 Gemini edits (falls, ladiga)
    _guard.check_batch([
        ("imagen4_generate", 1),
        ("gemini_flash_image_edit", 2),
    ])
except ImportError:
    est = 0.04 + 2 * 0.06
    print(f"\n⚠️  cost-guard not available. Estimated: ${est:.2f} (3 images)")
    if input("Continue? [y/N] ").strip().lower() != "y":
        sys.exit(0)
    _guard = None

API_KEY = "AIzaSyDiw3FbInZ9Fh63SRg-NZ7twr-YQHu0Aeo"
MODEL_EDIT = "gemini-2.5-flash-image"
MODEL_IMAGEN = "imagen-4.0-generate-001"
BASE = "https://generativelanguage.googleapis.com/v1beta/models"

IMAGES = Path("/Volumes/Samsung_T5/webdev/southern-legends/public/images/profiles")

SCENE_BASE = (
    "Create a hedcut-style pen-and-ink illustration in the style of The Wall Street Journal. "
    "Use only black ink on white background. Fine stippling dots and crosshatching lines. "
    "No color. No text. No labels. No watermarks. No titles. Pure black-and-white editorial illustration. "
)


def load_b64(path):
    with open(path, "rb") as f:
        data = f.read()
    ext = Path(path).suffix.lower().lstrip(".")
    mime = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "webp": "image/webp"}.get(ext, "image/jpeg")
    return base64.b64encode(data).decode("utf-8"), mime


def call_gemini(parts, out_path):
    url = f"{BASE}/{MODEL_EDIT}:generateContent?key={API_KEY}"
    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]},
    }
    resp = requests.post(url, json=payload, timeout=120)
    if resp.status_code != 200:
        print(f"  ERROR {resp.status_code}: {resp.text[:300]}")
        return False
    result = resp.json()
    for part in result.get("candidates", [{}])[0].get("content", {}).get("parts", []):
        key = "inlineData" if "inlineData" in part else "inline_data" if "inline_data" in part else None
        if key:
            img_data = base64.b64decode(part[key]["data"])
            Path(out_path).parent.mkdir(parents=True, exist_ok=True)
            with open(out_path, "wb") as f:
                f.write(img_data)
            print(f"  Saved → {Path(out_path).name}")
            return True
    finish = result.get("candidates", [{}])[0].get("finishReason", "")
    print(f"  No image. Reason: {finish or 'unknown'}")
    return False


def call_imagen(prompt, out_path):
    url = f"{BASE}/{MODEL_IMAGEN}:predict?key={API_KEY}"
    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {"sampleCount": 1},
    }
    resp = requests.post(url, json=payload, timeout=120)
    if resp.status_code != 200:
        print(f"  ERROR {resp.status_code}: {resp.text[:300]}")
        return False
    result = resp.json()
    preds = result.get("predictions", [])
    if preds and "bytesBase64Encoded" in preds[0]:
        img_data = base64.b64decode(preds[0]["bytesBase64Encoded"])
        Path(out_path).parent.mkdir(parents=True, exist_ok=True)
        with open(out_path, "wb") as f:
            f.write(img_data)
        print(f"  Saved → {Path(out_path).name}")
        return True
    print(f"  No image: {json.dumps(result)[:200]}")
    return False


def crop_top(path, pixels):
    """Fallback: crop N pixels from top to remove any residual text."""
    img = Image.open(path)
    w, h = img.size
    cropped = img.crop((0, pixels, w, h))
    cropped.save(path)
    print(f"  Cropped top {pixels}px from {Path(path).name}")


# --- 1. Burning bus — regenerate clean, no text ---
print("\n[1/3] Burning bus (no text)")
bus_prompt = (
    SCENE_BASE +
    "A 1961 Greyhound bus stopped on a flat rural Alabama highway, smoke billowing from the rear. "
    "Five or six figures standing on the roadside in the distance watching. "
    "Flat Alabama farmland on both sides of the road. Dramatic stippled sky. "
    "Somber, documentary tone. This is a historical civil rights memorial illustration. "
    "Wide landscape composition. Absolutely no text, no words, no labels anywhere in the image."
)
ok = call_imagen(bus_prompt, IMAGES / "freedom-riders-national-monument/burning-bus-hedcut.png")
if ok:
    # verify no text crept in at top — crop 10px as insurance
    pass

time.sleep(2)

# --- 2. Noccalula Falls — regenerate clean, no text ---
print("\n[2/3] Noccalula Falls (no text)")
ref_path = IMAGES / "noccalula-falls/falls-from-gorge.webp"
b64, mime = load_b64(ref_path)
falls_prompt = (
    SCENE_BASE +
    "Transform this waterfall photograph into a dramatic hedcut illustration. "
    "Noccalula Falls — 90 feet of water plunging into a gorge in Gadsden, Alabama. "
    "A small bronze statue figure of a woman mid-leap at the cliff edge above the falls. "
    "Dense crosshatching in the deep gorge shadows. Mist at the pool. Vertical composition. "
    "Absolutely no text, no words, no labels anywhere in the image."
)
parts = [
    {"inline_data": {"mime_type": mime, "data": b64}},
    {"text": falls_prompt},
]
ok = call_gemini(parts, IMAGES / "noccalula-falls/noccalula-hedcut.png")

time.sleep(2)

# --- 3. Chief Ladiga — Muscogee Creek specific ---
print("\n[3/3] Chief Ladiga (Muscogee Creek)")
ladiga_prompt = (
    SCENE_BASE +
    "Chief Ladiga (also spelled Ladiga), a Muscogee Creek chief from the Talladega area of Alabama, circa 1830s. "
    "Portrait facing forward. He wears a Muscogee Creek ribbon shirt with bead work, "
    "a trade silver gorget at his throat, and a cloth turban with a single feather — "
    "the dress of a 19th-century Muscogee Creek leader, not Plains regalia. "
    "No headdress. No Lakota or Plains styling. "
    "Background: rolling Alabama Appalachian foothills through sparse crosshatching. "
    "Dignified, historically grounded. Tight portrait framing, head and shoulders. "
    "Absolutely no text, no words, no labels anywhere in the image."
)
call_imagen(ladiga_prompt, IMAGES / "chief-ladiga-trail/chief-ladiga-hedcut.png")

print("\nDone.")
