import os
import subprocess
import time

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs", "screenshots", "process"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

TARGETS = [
    ("seo-process-1440.png", "http://localhost:3000/services/seo?skip_loader=1", 1440, 900),
    ("seo-process-390.png", "http://localhost:3000/services/seo?skip_loader=1", 390, 844),
    ("meta-process-1440.png", "http://localhost:3000/services/meta-ads?skip_loader=1", 1440, 900),
    ("meta-process-390.png", "http://localhost:3000/services/meta-ads?skip_loader=1", 390, 844),
    ("social-process-1440.png", "http://localhost:3000/services/social-media?skip_loader=1", 1440, 900),
    ("social-process-390.png", "http://localhost:3000/services/social-media?skip_loader=1", 390, 844),
    ("web-process-1440.png", "http://localhost:3000/services/web-development?skip_loader=1", 1440, 900),
    ("web-process-390.png", "http://localhost:3000/services/web-development?skip_loader=1", 390, 844),
]

print("=== CAPTURING PROCESS SCENE SCREENSHOTS ===")

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

print("=== CAPTURE COMPLETE ===")
