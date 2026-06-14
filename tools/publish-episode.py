#!/usr/bin/env python3
"""
Southern Legends — Episode Publish Script

Audio → Vercel Blob (RSS enclosure, ~30MB, one-time ingestion pull)
Video → YouTube (free, embedded on SL site via youtubeUrl frontmatter)
No video Blob upload.

Usage:
  python3 tools/publish-episode.py \
    --video /path/to/ep3-final.mp4 \
    --slug the-hospital \
    --title "The Hospital" \
    --date 2026-06-09 \
    [--youtube https://youtu.be/xxxxx]
"""
import argparse
import os
import subprocess
import re
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).parent.parent
CONTENT_DIR = REPO / "content" / "journal"
BLOB_TOKEN = os.environ.get("BLOB_READ_WRITE_TOKEN", "")


def run(cmd, **kwargs):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, **kwargs)
    if result.returncode != 0:
        print(f"  ERROR: {result.stderr.strip()}")
        sys.exit(1)
    return result.stdout.strip()


def extract_audio(video_path: str, out_path: str):
    print("→ Extracting audio from video...")
    run(f"""ffmpeg -y -i "{video_path}" \
        -vn -af "loudnorm=I=-16:TP=-1.5:LRA=11" \
        -c:a libmp3lame -b:a 192k "{out_path}" """)
    size = os.path.getsize(out_path)
    print(f"  Audio: {size / 1024 / 1024:.1f} MB")
    return size


def get_duration(path: str) -> str:
    out = run(f'ffprobe -v quiet -show_entries format=duration -of csv=p=0 "{path}"')
    try:
        secs = float(out)
        m, s = divmod(int(secs), 60)
        return f"{m}:{s:02d}"
    except:
        return ""


def upload_to_blob(file_path: str, blob_name: str) -> str:
    if not BLOB_TOKEN:
        print("  SKIP: BLOB_READ_WRITE_TOKEN not set — set it and re-run")
        return ""
    print(f"→ Uploading {blob_name} to Vercel Blob...")
    result = run(f"""node -e "
const {{ put }} = require('@vercel/blob');
const fs = require('fs');
async function main() {{
  const blob = await put('{blob_name}', fs.readFileSync('{file_path}'), {{
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
    allowOverwrite: true
  }});
  console.log(blob.url);
}}
main().catch(e => {{ console.error(e.message); process.exit(1); }});
"
""", cwd=str(REPO))
    print(f"  URL: {result}")
    return result


def update_frontmatter(slug: str, audio_url: str, youtube_url: str, media_size: int, duration: str, content_dir: Path = CONTENT_DIR):
    mdx = content_dir / f"{slug}.mdx"
    if not mdx.exists():
        print(f"  ERROR: {mdx} not found")
        sys.exit(1)

    content = mdx.read_text()

    def replace_or_add(text, key, value):
        pattern = rf'^{key}:.*$'
        replacement = f'{key}: "{value}"'
        if re.search(pattern, text, re.MULTILINE):
            return re.sub(pattern, replacement, text, flags=re.MULTILINE)
        # Add after 'published:' line
        return re.sub(r'^(published:.*)', rf'\1\n{replacement}', text, flags=re.MULTILINE)

    if audio_url:
        content = replace_or_add(content, 'audioUrl', audio_url)
    if youtube_url:
        content = replace_or_add(content, 'youtubeUrl', youtube_url)
    if media_size:
        pattern = r'^mediaSize:.*$'
        replacement = f'mediaSize: {media_size}'
        if re.search(pattern, content, re.MULTILINE):
            content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
        else:
            content = re.sub(r'^(published:.*)', rf'\1\nmediaSize: {media_size}', content, flags=re.MULTILINE)
    if duration:
        content = replace_or_add(content, 'audioDuration', duration)

    mdx.write_text(content)
    print(f"  Updated {mdx.name}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--video', required=True, help='Path to episode MP4')
    parser.add_argument('--slug', required=True, help='MDX slug')
    parser.add_argument('--title', required=True, help='Episode title')
    parser.add_argument('--date', required=True, help='Publish date YYYY-MM-DD')
    parser.add_argument('--ep', default='', help='Episode number e.g. ep1')
    parser.add_argument('--youtube', default='', help='YouTube URL after manual upload (sets youtubeUrl in MDX)')
    parser.add_argument('--content-type', default='journal', choices=['journal', 'profiles'], help='Content directory: journal or profiles')
    args = parser.parse_args()

    video_path = args.video
    slug = args.slug
    ep = args.ep or f"ep{slug[:3]}"
    content_dir = REPO / "content" / args.content_type

    if not os.path.exists(video_path):
        print(f"ERROR: Video file not found: {video_path}")
        sys.exit(1)

    print(f"\n🎙  Publishing: {args.title}")
    print(f"   Slug: {slug}\n")

    # 1. Extract audio
    audio_path = f"/tmp/{ep}-{slug}.mp3"
    audio_size = extract_audio(video_path, audio_path)
    duration = get_duration(audio_path)
    video_size = os.path.getsize(video_path)
    print(f"  Duration: {duration}")

    # 2. Upload audio only (video goes to YouTube, not Blob)
    audio_blob_name = f"audio/{ep}-{slug}.mp3"
    audio_url = upload_to_blob(audio_path, audio_blob_name)

    # 3. Update frontmatter
    print("→ Updating MDX frontmatter...")
    update_frontmatter(slug, audio_url, args.youtube, audio_size, duration, content_dir)

    # 5. Git commit + push
    print("→ Committing and pushing...")
    run(f'cd "{REPO}" && git add content/{args.content_type}/{slug}.mdx && git commit -m "publish: {args.title} ({args.date})" && git push')

    print(f"\n✓ Done. RSS will update within 60 seconds.")
    print(f"  Apple Podcasts: auto-polls every few hours")
    print(f"  Spotify: Settings → RSS → Refresh to force update")
    print(f"\n  Next: upload to YouTube manually and post social")


if __name__ == '__main__':
    main()
