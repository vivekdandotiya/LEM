import os
import subprocess

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs", "screenshots"))

TARGETS = [
    ("home-fresh.png", "http://localhost:3000/?skip_loader=1"),
    ("about-fresh.png", "http://localhost:3000/about?skip_loader=1"),
]

for filename, url in TARGETS:
    out_path = os.path.join(OUTPUT_DIR, filename)
    cmd = [
        EDGE_PATH,
        "--headless=new",
        "--window-size=1440,900",
        "--hide-scrollbars",
        "--disable-gpu",
        "--force-prefers-reduced-motion",
        f"--screenshot={out_path}",
        url,
    ]
    print(f"Capturing {filename} with reduced motion flag...")
    try:
        subprocess.run(cmd, capture_output=True, timeout=15)
        if os.path.exists(out_path):
            print(f"  OK: {filename} ({os.path.getsize(out_path):,} bytes)")
        else:
            print(f"  Failed: {filename}")
    except Exception as e:
        print(f"  Error: {e}")

print("Done.")
