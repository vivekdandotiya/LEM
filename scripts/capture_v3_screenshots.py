import os
import subprocess
import time

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs", "screenshots"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

TARGETS = [
    ("v3-home-1440.png", "http://localhost:3000/?skip_loader=1", 1440, 900),
    ("v3-home-390.png", "http://localhost:3000/?skip_loader=1", 390, 844),
    ("v3-services-1440.png", "http://localhost:3000/services?skip_loader=1", 1440, 900),
    ("v3-services-390.png", "http://localhost:3000/services?skip_loader=1", 390, 844),
    ("v3-about-1440.png", "http://localhost:3000/about?skip_loader=1", 1440, 900),
    ("v3-about-390.png", "http://localhost:3000/about?skip_loader=1", 390, 844),
    ("v3-contact-1440.png", "http://localhost:3000/contact?skip_loader=1", 1440, 900),
    ("v3-blog-1440.png", "http://localhost:3000/blog?skip_loader=1", 1440, 900),
    ("v3-service-seo-1440.png", "http://localhost:3000/services/seo?skip_loader=1", 1440, 900),
]

print("=== CAPTURING V3 SCREENSHOTS ===")

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

print("=== SCREENSHOT CAPTURE COMPLETE ===")
