#!/usr/bin/env python3
"""Generate woodcut-style hero illustrations for Southern Legends essays."""

import base64
import json
import sys
import requests
import time
from pathlib import Path

# Cost guard
sys.path.insert(0, str(Path(__file__).parent.parent / "tools"))
try:
    from cost_guard import CostGuard
    _guard = CostGuard()
except ImportError:
    _guard = None

API_KEY = "AIzaSyDiw3FbInZ9Fh63SRg-NZ7twr-YQHu0Aeo"
MODEL_IMAGEN = "imagen-4.0-generate-001"
BASE = "https://generativelanguage.googleapis.com/v1beta/models"

JOURNAL_IMG = Path("/Volumes/Samsung_T5/webdev/southern-legends/public/images/journal")
JOURNAL_IMG.mkdir(parents=True, exist_ok=True)

WOODCUT_BASE = (
    "Create a woodcut-style print illustration. "
    "Thick black ink lines carved into white. Bold, expressionistic woodblock print. "
    "High contrast. Strong shadows and deep blacks. Rough, hand-carved line quality. "
    "No color. No text. No labels. No watermarks. "
    "Style of Thomas Bewick or Käthe Kollwitz woodcuts. "
    "Atmospheric and spare — let the white space breathe. "
)

ESSAYS = [
    {
        "slug": "the-hospital",
        "out": JOURNAL_IMG / "the-hospital-woodcut.png",
        "scene": (
            "A lone figure sits hunched in a plastic chair in a hospital emergency room waiting area, 2am. "
            "Harsh fluorescent light from above. Empty chairs extending to either side. "
            "A window in the background shows darkness outside. "
            "The figure is small against the institutional space. Stillness and waiting. "
            "Wide horizontal composition."
        ),
    },
    {
        "slug": "hope-in-the-wilderness",
        "out": JOURNAL_IMG / "hope-in-the-wilderness-woodcut.png",
        "scene": (
            "A solitary person walks a narrow path into a dense dark pine forest. "
            "The trees press in from both sides, their trunks carved with thick vertical lines. "
            "A single shaft of light breaks through the canopy ahead. "
            "The figure is small, moving toward the light. "
            "Vertical composition. Darkness surrounding a thread of hope."
        ),
    },
    {
        "slug": "no-shade",
        "out": JOURNAL_IMG / "no-shade-woodcut.png",
        "scene": (
            "Close-up of two pairs of hands across a simple wooden table. "
            "One set of hands passes a ceramic cup toward the other. "
            "The cup is the center of the composition. "
            "A church interior is barely suggested in the background — pew edge, faint window arch. "
            "Intimate, still, the gesture of being seen and handed something."
        ),
    },
    {
        "slug": "attempt-73",
        "out": JOURNAL_IMG / "attempt-73-woodcut.png",
        "scene": (
            "A simple wooden desk. A single open notebook, pages filled with handwriting — "
            "the lines of text rendered as texture, not readable words. "
            "A pen resting in the gutter of the notebook. "
            "A stack of closed notebooks beside it. Nothing else on the desk. "
            "A small window with morning light. The work itself as subject."
        ),
    },
    {
        "slug": "a-letter-never-sent",
        "out": JOURNAL_IMG / "a-letter-never-sent-woodcut.png",
        "scene": (
            "A single folded letter resting on a bare wooden surface. "
            "The letter is sealed but not addressed. "
            "A candle or lamp casts light from the side, leaving one edge in shadow. "
            "No hands. No person. Just the object and the decision it holds. "
            "Quiet, heavy, spare."
        ),
    },
    {
        "slug": "chief-ladiga-trail-essay",
        "out": JOURNAL_IMG / "chief-ladiga-trail-woodcut.png",
        "scene": (
            "A paved trail disappears into a tunnel of summer trees, the canopy closing over it. "
            "The path is empty. Early morning light filters through the leaves. "
            "Thick carved lines for the tree trunks, lighter cross-hatching for the leaf canopy. "
            "The trail draws the eye forward and away. "
            "A bicycle leaning against a tree at the edge of the frame."
        ),
    },
]


def call_imagen(prompt, out_path):
    url = f"{BASE}/{MODEL_IMAGEN}:predict?key={API_KEY}"
    payload = {
        "instances": [{"prompt": WOODCUT_BASE + prompt}],
        "parameters": {"sampleCount": 1},
    }
    resp = requests.post(url, json=payload, timeout=120)
    if resp.status_code != 200:
        print(f"  ERROR {resp.status_code}: {resp.text[:300]}")
        return False
    preds = resp.json().get("predictions", [])
    if preds and "bytesBase64Encoded" in preds[0]:
        img_data = base64.b64decode(preds[0]["bytesBase64Encoded"])
        with open(out_path, "wb") as f:
            f.write(img_data)
        print(f"  Saved → {Path(out_path).name}")
        return True
    print(f"  No image: {resp.text[:200]}")
    return False


def main():
    # Cost guard: all jobs use Imagen 4
    if _guard:
        _guard.check("imagen4_generate", count=len(ESSAYS))
    else:
        est = len(ESSAYS) * 0.04
        print(f"\n⚠️  cost-guard not available. Estimated: ${est:.2f} ({len(ESSAYS)} Imagen 4 generations)")
        if input("Continue? [y/N] ").strip().lower() != "y":
            sys.exit(0)

    print(f"Generating {len(ESSAYS)} essay woodcuts...\n")
    for i, job in enumerate(ESSAYS, 1):
        print(f"[{i}/{len(ESSAYS)}] {job['slug']}")
        try:
            ok = call_imagen(job["scene"], job["out"])
            if ok and _guard:
                _guard.log_gemini("imagen4_generate", 1, {"script": "generate-essay-woodcuts", "slug": job["slug"]})
        except Exception as e:
            print(f"  EXCEPTION: {e}")
        if i < len(ESSAYS):
            time.sleep(2)
    print("\nDone.")


if __name__ == "__main__":
    main()
