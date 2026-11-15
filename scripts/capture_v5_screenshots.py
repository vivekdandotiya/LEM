import os
import subprocess
import time

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs", "screenshots", "v5"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

TARGETS = [
    ("v5-home-hero-1440.png", "http://localhost:3000/?skip_loader=1", 1440, 900),
    ("v5-home-hero-390.png", "http://localhost:3000/?skip_loader=1", 390, 844),
    ("v5-ppc-desktop-1440.png", "http://localhost:3000/services/ppc?skip_loader=1", 1440, 900),
    ("v5-ppc-mobile-390.png", "http://localhost:3000/services/ppc?skip_loader=1", 390, 844),
    ("v5-seo-desktop-1440.png", "http://localhost:3000/services/seo?skip_loader=1", 1440, 900),
    ("v5-brand-intro-1440.png", "http://localhost:3000/?intro=1", 1440, 900),
]

print("=== CAPTURING V5 SCREENSHOTS ===")

for filename, url, w, h in TARGETS:
    out_path = os.path.join(OUTPUT_DIR, filename)
    cmd = [
        EDGE_PATH,
        "--headless=new",
        f"--window-size={w},{h}",
        "--hide-scrollbars",
        "--disable-gpu",
        f"--screenshot={out_path}",
        url,
    ]
    print(f"Capturing {filename} at {w}x{h}...")
    try:
        subprocess.run(cmd, capture_output=True, timeout=25)
        if os.path.exists(out_path):
            print(f"  OK: {filename} ({os.path.getsize(out_path):,} bytes)")
        else:
            print(f"  Warning: {filename} failed to save")
    except Exception as e:
        print(f"  Error on {filename}: {e}")

print("=== V5 CAPTURE COMPLETE ===")
