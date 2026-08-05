#!/usr/bin/env python3
"""Generate Matt-voice voiceover for RBWF reel and mix into video."""

import os, requests, subprocess, json
from pathlib import Path

API_KEY = os.environ.get("ELEVENLABS_API_KEY", "sk_34cbd436ce76260360a84c0c4fb2a3f84f3b00fb5b353d62")
VOICE_ID = os.environ.get("ELEVENLABS_MATT_VOICE_ID", "qzBOTHLs8xNI7kHO94dr")

SCRIPT = """The willow tree is still there.

Michele Hornsby's son Justin died by suicide on their property in 2017. She didn't leave.

She planted a willow tree. Drove to Oklahoma. Came home with a llama.

The llama was already named Justine. She took that as a sign.

There are a hundred and twenty animals at Redbird Willow Farm now — and people come when they don't know where else to go.

Redbird Willow Farm. Anniston, Alabama."""

BASE = Path("/Volumes/Samsung_T5/webdev/southern-legends/assets/redbird-willow-farm")
INPUT_VIDEO = BASE / "rbwf-final-branded.mp4"
AUDIO_OUT = BASE / "rbwf-voiceover.mp3"
FINAL_OUT = BASE / "rbwf-final-voiced.mp4"

def generate_voiceover():
    print("Generating voiceover with ElevenLabs...")
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    headers = {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
    }
    payload = {
        "text": SCRIPT,
        "model_id": "eleven_turbo_v2_5",
        "voice_settings": {
            "stability": 0.55,
            "similarity_boost": 0.82,
            "style": 0.15,
            "use_speaker_boost": True
        }
    }
    r = requests.post(url, headers=headers, json=payload)
    if r.status_code != 200:
        print(f"ElevenLabs error {r.status_code}: {r.text}")
        return False
    AUDIO_OUT.write_bytes(r.content)
    print(f"Voiceover saved: {AUDIO_OUT} ({len(r.content):,} bytes)")
    return True

def mix_voiceover():
    print("Mixing voiceover into video...")
    # Lower background music to 0.35, narration at 1.3, pad narration to video length
    cmd = [
        "ffmpeg", "-y",
        "-i", str(INPUT_VIDEO),
        "-i", str(AUDIO_OUT),
        "-filter_complex",
        "[0:a]volume=0.35[bg];[1:a]volume=1.3,apad[vo];[bg][vo]amix=inputs=2:duration=first:dropout_transition=2[a]",
        "-map", "0:v",
        "-map", "[a]",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-ar", "48000",
        str(FINAL_OUT)
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"ffmpeg error:\n{result.stderr[-2000:]}")
        return False
    print(f"Final voiced reel: {FINAL_OUT}")
    return True

if __name__ == "__main__":
    if generate_voiceover():
        if mix_voiceover():
            print("\nDone. Upload rbwf-final-voiced.mp4 to YouTube.")
            # Open in QuickTime to preview
            subprocess.run(["open", str(FINAL_OUT)])
