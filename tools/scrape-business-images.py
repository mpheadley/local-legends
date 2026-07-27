#!/usr/bin/env python3
"""
Southern Legends — Business Image Scraper
Waterfall: OG image → Google Places Photo → Foursquare → Wikimedia → Pexels → category fallback
Updates each listicle MDX with image fields per business.
Usage: python3 tools/scrape-business-images.py [--slug arts-in-anniston] [--pexels-key KEY] [--dry-run]
"""

import os, sys, re, json, time, hashlib, argparse, urllib.request, urllib.parse, urllib.error
from pathlib import Path
from html.parser import HTMLParser

GOOGLE_KEY = "AIzaSyBS4YUm2d4YykOi85Xd_LSnNNgOtMPzBSA"
FOURSQUARE_KEY = "fsq3DMjEKMTzhx7IDVAlnWo5hBkVeObOn2iTMl4ldyntHaw="

ROOT = Path(__file__).parent.parent
LISTICLES_DIR = ROOT / "content" / "listicles"
IMG_DIR = ROOT / "public" / "images" / "businesses"
IMG_DIR.mkdir(parents=True, exist_ok=True)

CATEGORY_FALLBACK = {
    "church": "/images/guides/church.webp",
    "faith": "/images/guides/church.webp",
    "coffee": "/images/guides/coffee.webp",
    "bakery": "/images/guides/bakery.webp",
    "bar": "/images/guides/bar.webp",
    "bbq": "/images/guides/bbq.webp",
    "restaurant": "/images/guides/restaurant.webp",
    "pizza": "/images/guides/pizza.webp",
    "mexican": "/images/guides/mexican.webp",
    "salon": "/images/guides/salon.webp",
    "barber": "/images/guides/barber.webp",
    "boutique": "/images/guides/boutique.webp",
    "gym": "/images/guides/gym.webp",
    "arts": "/images/guides/restaurant.webp",
    "literature": "/images/guides/boutique.webp",
    "books": "/images/guides/boutique.webp",
}

def slug_for(name: str) -> str:
    s = name.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")[:60]

def fetch(url: str, headers: dict = None, timeout: int = 10) -> bytes | None:
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36",
            **(headers or {})
        })
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.read()
    except Exception as e:
        print(f"    fetch error {url[:60]}: {e}")
        return None

def fetch_json(url: str, headers: dict = None) -> dict | None:
    data = fetch(url, headers)
    if data:
        try:
            return json.loads(data)
        except:
            pass
    return None

class OGParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.og_image = None
    def handle_starttag(self, tag, attrs):
        if tag == "meta":
            d = dict(attrs)
            if d.get("property") == "og:image" or d.get("name") == "og:image":
                self.og_image = d.get("content")

def try_og_image(web_url: str) -> str | None:
    """Fetch business website and extract og:image."""
    if not web_url:
        return None
    print(f"    → OG scrape: {web_url[:50]}")
    html = fetch(web_url, timeout=8)
    if not html:
        return None
    try:
        parser = OGParser()
        parser.feed(html[:50000].decode("utf-8", errors="ignore"))
        img = parser.og_image
        if img and img.startswith("http") and not "logo" in img.lower() and not "icon" in img.lower():
            print(f"      ✓ OG image: {img[:60]}")
            return img
    except:
        pass
    return None

def try_google_places(name: str, city: str) -> str | None:
    """Search Google Places then fetch the first photo."""
    query = urllib.parse.quote(f"{name} {city} Alabama")
    search_url = f"https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={query}&inputtype=textquery&fields=place_id,photos&key={GOOGLE_KEY}"
    print(f"    → Google Places: {name[:40]}")
    data = fetch_json(search_url)
    if not data or data.get("status") != "OK":
        return None
    candidates = data.get("candidates", [])
    if not candidates:
        return None
    photos = candidates[0].get("photos", [])
    if not photos:
        return None
    ref = photos[0]["photo_reference"]
    photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference={ref}&key={GOOGLE_KEY}"
    # Google redirects to the actual image
    try:
        req = urllib.request.Request(photo_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as r:
            final_url = r.geturl()
            print(f"      ✓ Google photo")
            return final_url
    except Exception as e:
        print(f"      Google photo error: {e}")
        return None

def try_foursquare(name: str, city: str) -> str | None:
    """Search Foursquare and get venue photo."""
    query = urllib.parse.quote(f"{name}")
    url = f"https://api.foursquare.com/v3/places/search?query={query}&near={urllib.parse.quote(city + ', Alabama')}&limit=1"
    print(f"    → Foursquare: {name[:40]}")
    data = fetch_json(url, headers={"Authorization": FOURSQUARE_KEY})
    if not data:
        return None
    results = data.get("results", [])
    if not results:
        return None
    fsq_id = results[0].get("fsq_id")
    if not fsq_id:
        return None
    photos_url = f"https://api.foursquare.com/v3/places/{fsq_id}/photos?limit=1&sort=POPULAR"
    photos = fetch_json(photos_url, headers={"Authorization": FOURSQUARE_KEY})
    if not photos or len(photos) == 0:
        return None
    p = photos[0]
    img_url = f"{p['prefix']}800x600{p['suffix']}"
    print(f"      ✓ Foursquare photo")
    return img_url

def try_wikimedia(name: str) -> str | None:
    """Search Wikimedia Commons for an image of the place."""
    query = urllib.parse.quote(name)
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={query}&prop=pageimages&format=json&pithumbsize=800"
    print(f"    → Wikimedia: {name[:40]}")
    data = fetch_json(url)
    if not data:
        return None
    pages = data.get("query", {}).get("pages", {})
    for pid, page in pages.items():
        thumb = page.get("thumbnail", {}).get("source")
        if thumb and not "logo" in thumb.lower():
            print(f"      ✓ Wikimedia image")
            return thumb
    return None

def try_pexels(query: str, pexels_key: str) -> str | None:
    """Search Pexels for a thematic image."""
    if not pexels_key:
        return None
    url = f"https://api.pexels.com/v1/search?query={urllib.parse.quote(query)}&per_page=1&orientation=landscape"
    print(f"    → Pexels: {query[:40]}")
    data = fetch_json(url, headers={"Authorization": pexels_key})
    if not data:
        return None
    photos = data.get("photos", [])
    if not photos:
        return None
    src = photos[0].get("src", {}).get("large")
    if src:
        print(f"      ✓ Pexels image")
        return src
    return None

def download_image(url: str, dest: Path) -> bool:
    """Download image URL to dest path as webp via PIL if available, else raw."""
    data = fetch(url, timeout=15)
    if not data or len(data) < 1000:
        return False
    try:
        from PIL import Image
        import io
        img = Image.open(io.BytesIO(data)).convert("RGB")
        img = img.resize((800, 530), Image.LANCZOS) if img.width > 800 else img
        img.save(str(dest), "WEBP", quality=82)
        return True
    except ImportError:
        # No PIL — save raw
        dest_raw = dest.with_suffix(".jpg")
        with open(dest_raw, "wb") as f:
            f.write(data)
        return True
    except Exception as e:
        print(f"      image save error: {e}")
        return False

def get_image_for_business(b: dict, category: str, pexels_key: str, dry_run: bool) -> str | None:
    """Run the waterfall and return a /images/businesses/... path or category fallback."""
    name = b.get("name", "")
    city = b.get("city", "Anniston")
    web = b.get("web")
    bslug = slug_for(name)
    dest = IMG_DIR / f"{bslug}.webp"
    web_path = f"/images/businesses/{bslug}.webp"

    # Already downloaded
    if dest.exists() and dest.stat().st_size > 2000:
        print(f"  ✓ cached: {bslug}")
        return web_path

    img_url = None

    # 1. OG image from their own website
    if not img_url and web:
        img_url = try_og_image(web)

    # 2. Google Places
    if not img_url:
        img_url = try_google_places(name, city)
        time.sleep(0.3)

    # 3. Foursquare
    if not img_url:
        img_url = try_foursquare(name, city)
        time.sleep(0.3)

    # 4. Wikimedia
    if not img_url:
        img_url = try_wikimedia(name)
        time.sleep(0.2)

    # 5. Pexels
    if not img_url and pexels_key:
        pexels_query = f"{category} Alabama {city}"
        img_url = try_pexels(pexels_query, pexels_key)
        time.sleep(0.5)

    if img_url:
        if dry_run:
            print(f"    [dry-run] would save to {dest}")
            return web_path
        print(f"    → downloading to {dest.name}")
        ok = download_image(img_url, dest)
        if ok:
            return web_path
        else:
            print(f"    download failed, using category fallback")

    # Category fallback
    fb = CATEGORY_FALLBACK.get(category or "", "/images/guides/restaurant.webp")
    print(f"    → category fallback: {fb}")
    return fb

def parse_mdx_businesses(content: str) -> list:
    """Extract the businesses JSON from MDX frontmatter."""
    m = re.search(r'^businesses:\s*(\[.*?\])\s*$', content, re.MULTILINE | re.DOTALL)
    if m:
        try:
            return json.loads(m.group(1))
        except:
            pass
    return []

def update_mdx_businesses(content: str, businesses: list) -> str:
    """Replace the businesses JSON in frontmatter."""
    new_json = json.dumps(businesses, ensure_ascii=False)
    return re.sub(
        r'^(businesses:\s*)(\[.*?\])(\s*)$',
        lambda m: m.group(1) + new_json + m.group(3),
        content,
        flags=re.MULTILINE | re.DOTALL
    )

def process_listicle(mdx_path: Path, pexels_key: str, dry_run: bool):
    slug = mdx_path.stem
    print(f"\n{'='*50}")
    print(f"Listicle: {slug}")
    print(f"{'='*50}")

    content = mdx_path.read_text("utf-8")

    # Extract category from frontmatter
    cat_m = re.search(r'^category:\s*["\']?([^"\'\n]+)["\']?', content, re.MULTILINE)
    category = cat_m.group(1).strip() if cat_m else ""

    # Derive category from slug if not set
    if not category:
        for key in CATEGORY_FALLBACK:
            if key in slug:
                category = key
                break

    businesses = parse_mdx_businesses(content)
    if not businesses:
        print(f"  No businesses found, skipping")
        return

    updated = False
    for i, b in enumerate(businesses):
        print(f"\n  [{i+1}/{len(businesses)}] {b['name']}")
        if b.get("image"):
            print(f"  ✓ already has image: {b['image'][:50]}")
            continue
        img_path = get_image_for_business(b, category, pexels_key, dry_run)
        if img_path:
            businesses[i]["image"] = img_path
            updated = True

    if updated and not dry_run:
        new_content = update_mdx_businesses(content, businesses)
        mdx_path.write_text(new_content, "utf-8")
        print(f"\n  ✓ Updated {mdx_path.name}")
    elif dry_run:
        print(f"\n  [dry-run] would update {mdx_path.name}")

def main():
    parser = argparse.ArgumentParser(description="Scrape business images for SL listicles")
    parser.add_argument("--slug", help="Process only this listicle slug")
    parser.add_argument("--pexels-key", default=os.environ.get("PEXELS_API_KEY", ""), help="Pexels API key")
    parser.add_argument("--dry-run", action="store_true", help="Don't write files")
    args = parser.parse_args()

    mdx_files = sorted(LISTICLES_DIR.glob("*.mdx"))
    if args.slug:
        mdx_files = [f for f in mdx_files if f.stem == args.slug]
        if not mdx_files:
            print(f"No listicle found for slug: {args.slug}")
            sys.exit(1)

    print(f"Processing {len(mdx_files)} listicles...")
    for mdx in mdx_files:
        process_listicle(mdx, args.pexels_key, args.dry_run)

    print(f"\n\nDone. Images saved to {IMG_DIR}")
    print("Next: git add public/images/businesses/ content/listicles/ && git commit && git push")

if __name__ == "__main__":
    main()
