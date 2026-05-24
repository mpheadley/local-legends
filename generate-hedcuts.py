#!/usr/bin/env python3
"""Generate hedcut-style illustrations for all Southern Legends profiles via Gemini API."""

import base64
import json
import os
import sys
import requests
import time
from pathlib import Path

# Cost guard — estimate and confirm before spending
sys.path.insert(0, str(Path(__file__).parent.parent / "tools"))
try:
    from cost_guard import CostGuard
    _guard = CostGuard()
except ImportError:
    _guard = None

API_KEY = "AIzaSyDiw3FbInZ9Fh63SRg-NZ7twr-YQHu0Aeo"
# For image editing from reference photos (multimodal input)
MODEL_EDIT = "gemini-2.5-flash-image"
# For text-to-image scenes
MODEL_IMAGEN = "imagen-4.0-generate-001"
BASE_GENERATE = "https://generativelanguage.googleapis.com/v1beta/models"

IMAGES_DIR = Path("/Volumes/Samsung_T5/webdev/southern-legends/public/images/profiles")
DOWNLOADS = Path("/Volumes/Samsung_T5/DownloadsT5")

PORTRAIT_PROMPT = (
    "Transform this photograph into a hedcut portrait illustration in the style of "
    "The Wall Street Journal. Use only black ink on white background. Apply fine stippling "
    "dots and crosshatching lines to build depth and texture — dense dots for shadows, "
    "sparse dots for highlights, crosshatching for mid-tones. Capture the subject's likeness "
    "accurately. Remove or simplify the background to clean white with minimal lines. "
    "No color. Pure black-and-white pen-and-ink hedcut technique. "
    "Portrait orientation, tight framing on face and shoulders."
)

SCENE_PROMPT_BASE = (
    "Create a hedcut-style pen-and-ink illustration in the style of The Wall Street Journal. "
    "Use only black ink on white background. Apply fine stippling dots and crosshatching lines "
    "to build depth and texture. No color. Pure black-and-white editorial illustration. "
    "Detailed, journalistic, and atmospheric. "
)


def load_image_b64(path):
    with open(path, "rb") as f:
        data = f.read()
    ext = Path(path).suffix.lower().lstrip(".")
    mime = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "webp": "image/webp"}.get(ext, "image/jpeg")
    return base64.b64encode(data).decode("utf-8"), mime


def call_gemini_edit(parts, output_path):
    """Gemini multimodal: image input + text → image output."""
    url = f"{BASE_GENERATE}/{MODEL_EDIT}:generateContent?key={API_KEY}"
    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]},
    }
    resp = requests.post(url, json=payload, timeout=120)
    if resp.status_code != 200:
        print(f"  ERROR {resp.status_code}: {resp.text[:400]}")
        return False
    result = resp.json()
    for part in result.get("candidates", [{}])[0].get("content", {}).get("parts", []):
        key = "inlineData" if "inlineData" in part else "inline_data" if "inline_data" in part else None
        if key:
            img_data = base64.b64decode(part[key]["data"])
            Path(output_path).parent.mkdir(parents=True, exist_ok=True)
            with open(output_path, "wb") as f:
                f.write(img_data)
            print(f"  Saved → {Path(output_path).name}")
            return True
    finish = result.get("candidates", [{}])[0].get("finishReason", "")
    if finish:
        print(f"  Blocked ({finish})")
    else:
        print(f"  No image in response: {json.dumps(result)[:200]}")
    return False


def call_imagen(prompt_text, output_path):
    """Imagen 4: text → image via predict endpoint."""
    url = f"{BASE_GENERATE}/{MODEL_IMAGEN}:predict?key={API_KEY}"
    payload = {
        "instances": [{"prompt": prompt_text}],
        "parameters": {"sampleCount": 1},
    }
    resp = requests.post(url, json=payload, timeout=120)
    if resp.status_code != 200:
        print(f"  ERROR {resp.status_code}: {resp.text[:400]}")
        return False
    result = resp.json()
    predictions = result.get("predictions", [])
    if predictions and "bytesBase64Encoded" in predictions[0]:
        img_data = base64.b64decode(predictions[0]["bytesBase64Encoded"])
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(img_data)
        print(f"  Saved → {Path(output_path).name}")
        return True
    print(f"  No image in response: {json.dumps(result)[:300]}")
    return False


def from_photo(ref_path, out_path, extra_desc=""):
    print(f"\n[portrait] {Path(ref_path).name}")
    b64, mime = load_image_b64(ref_path)
    prompt = (extra_desc + " " if extra_desc else "") + PORTRAIT_PROMPT
    parts = [
        {"inline_data": {"mime_type": mime, "data": b64}},
        {"text": prompt},
    ]
    return call_gemini_edit(parts, out_path)


def from_text(scene_prompt, out_path):
    print(f"\n[scene/text] {Path(out_path).name}")
    return call_imagen(SCENE_PROMPT_BASE + scene_prompt, out_path)


def from_photo_and_text(ref_path, scene_prompt, out_path):
    print(f"\n[scene+photo] {Path(ref_path).name}")
    b64, mime = load_image_b64(ref_path)
    parts = [
        {"inline_data": {"mime_type": mime, "data": b64}},
        {"text": SCENE_PROMPT_BASE + scene_prompt},
    ]
    return call_gemini_edit(parts, out_path)


JOBS = [
    # --- Person portraits (from reference photo) ---
    {
        "ref": DOWNLOADS / "47572566_2055298197850077_7509346568655339520_n.jpg",
        "out": IMAGES_DIR / "interfaith-ministries/april-lafollette-hedcut.png",
        "fn": "photo",
        "extra": "April LaFollette, director of Interfaith Ministries of Calhoun County, Alabama.",
    },
    {
        "ref": IMAGES_DIR / "aquality-farms/sam-farmers-market.webp",
        "out": IMAGES_DIR / "aquality-farms/samuel-sawyer-hedcut.png",
        "fn": "photo",
        "extra": "Samuel Sawyer, founder of Aquality Farms, an urban hydroponic farm in Anniston, Alabama.",
    },
    {
        "ref": IMAGES_DIR / "lewis-downing/lewis-at-counter.webp",
        "out": IMAGES_DIR / "lewis-downing/lewis-downing-hedcut.png",
        "fn": "photo",
        "extra": "Lewis Downing, owner of Downing and Sons hardware and garden store on Gurnee Avenue, Anniston, Alabama.",
    },
    {
        "ref": IMAGES_DIR / "jean-ellison/jean-ellison-brand-fistpump-upscaled.webp",
        "out": IMAGES_DIR / "jean-ellison/jean-ellison-hedcut.png",
        "fn": "photo",
        "extra": "Jean Ellison, classically trained soprano, co-founder of The Music Box, and founder of Mom-To-Go catering, Anniston, Alabama.",
    },
    {
        "ref": IMAGES_DIR / "shannon-jenkins/shannon-jenkins-headshot-v4.webp",
        "out": IMAGES_DIR / "shannon-jenkins/shannon-jenkins-hedcut.png",
        "fn": "photo",
        "extra": "Shannon Jenkins, President and CEO of United Way of East Central Alabama.",
    },
    # --- Scene illustrations (from text or reference scene) ---
    {
        "out": IMAGES_DIR / "freedom-riders-national-monument/burning-bus-hedcut.png",
        "fn": "text",
        "scene": (
            "A Greyhound bus on a rural Alabama highway with smoke rising from it, 1961. "
            "People standing beside the road in the distance. "
            "Historical civil rights memorial illustration. Pen-and-ink hedcut style. "
            "Somber, documentary, journalistic. This illustrates the Freedom Riders National Monument in Anniston, Alabama. "
            "Dramatic crosshatching on the sky and road surface."
        ),
    },
    {
        "out": IMAGES_DIR / "chief-ladiga-trail/chief-ladiga-hedcut.png",
        "fn": "text",
        "scene": (
            "Chief Ladiga, a Muscogee Creek chief of Northeast Alabama in the early 1800s, "
            "dignified portrait facing forward. He wears traditional Muscogee regalia. "
            "Appalachian foothills visible in the background through fine crosshatching. "
            "Powerful, respectful, and historically grounded. Tight portrait framing."
        ),
    },
    {
        "ref": IMAGES_DIR / "noccalula-falls/falls-from-gorge.webp",
        "out": IMAGES_DIR / "noccalula-falls/noccalula-hedcut.png",
        "fn": "scene+photo",
        "scene": (
            "Render this waterfall scene as a dramatic hedcut illustration. "
            "Noccalula Falls — 90 feet of water plunging into a Black Creek gorge in Gadsden, Alabama. "
            "The nine-foot bronze statue of Noccalula, a Cherokee woman mid-leap at the falls edge, visible at the top. "
            "Mist rising from the pool below. Dense crosshatching in the gorge shadows. "
            "Vertical composition, atmosphere of myth and gravity."
        ),
    },
    {
        "ref": IMAGES_DIR / "anniston-museums-gardens/museum-lobby-explore.webp",
        "out": IMAGES_DIR / "anniston-museums-gardens/museum-hedcut.png",
        "fn": "scene+photo",
        "scene": (
            "Transform this museum lobby photograph into a hedcut illustration. "
            "A child looking up in wonder inside the Anniston Museum of Natural History. "
            "Large taxidermied specimens and dioramas in the background. "
            "The sense of a small person encountering something much larger than expected. "
            "The illustration should feel like wonder, not tourism."
        ),
    },
]


def main():
    # --- Cost guard: estimate before running ---
    photo_jobs = [j for j in JOBS if j["fn"] == "photo"]
    text_jobs  = [j for j in JOBS if j["fn"] == "text"]
    mixed_jobs = [j for j in JOBS if j["fn"] == "scene+photo"]
    if _guard:
        _guard.check_batch([
            ("gemini_flash_image_edit", len(photo_jobs) + len(mixed_jobs)),
            ("imagen4_generate",        len(text_jobs)),
        ])
    else:
        edit_cost = (len(photo_jobs) + len(mixed_jobs)) * 0.06
        text_cost = len(text_jobs) * 0.04
        total = edit_cost + text_cost
        print(f"\n⚠️  cost-guard not available. Estimated cost: ${total:.2f}")
        if input("Continue? [y/N] ").strip().lower() != "y":
            sys.exit(0)

    print(f"Generating {len(JOBS)} hedcut illustrations...\n")
    results = []
    for i, job in enumerate(JOBS, 1):
        print(f"[{i}/{len(JOBS)}]", end="")
        out = job["out"]
        fn = job["fn"]
        try:
            if fn == "photo":
                ok = from_photo(job["ref"], out, job.get("extra", ""))
                if ok and _guard:
                    _guard.log_gemini("gemini_flash_image_edit", 1, {"script": "generate-hedcuts", "out": str(out)})
            elif fn == "text":
                ok = from_text(job["scene"], out)
                if ok and _guard:
                    _guard.log_gemini("imagen4_generate", 1, {"script": "generate-hedcuts", "out": str(out)})
            elif fn == "scene+photo":
                ok = from_photo_and_text(job["ref"], job["scene"], out)
                if ok and _guard:
                    _guard.log_gemini("gemini_flash_image_edit", 1, {"script": "generate-hedcuts", "out": str(out)})
            results.append((Path(out).name, "OK" if ok else "FAIL"))
        except Exception as e:
            print(f"  EXCEPTION: {e}")
            results.append((Path(out).name, f"ERROR: {e}"))
        if i < len(JOBS):
            time.sleep(2)  # rate limit buffer

    print("\n\n=== Results ===")
    for name, status in results:
        print(f"  {status:6} {name}")


if __name__ == "__main__":
    main()
