import os
import subprocess
import time

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs", "screenshots"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

PAGES = [
    ("home", "http://localhost:3000/"),
    ("about", "http://localhost:3000/about"),
    ("services", "http://localhost:3000/services"),
    ("service-seo", "http://localhost:3000/services/seo"),
    ("blog", "http://localhost:3000/blog"),
    ("contact", "http://localhost:3000/contact"),
    ("not-found", "http://localhost:3000/404-test-page"),
]

VIEWPORTS = [
    ("1440", 1440, 900),
    ("390", 390, 844),
]

print("=== CAPTURING SCREENSHOTS (OPTIMIZED) ===")

for name, url in PAGES:
    for vp_name, width, height in VIEWPORTS:
        out_file = os.path.join(OUTPUT_DIR, f"{name}-{vp_name}.png")
        if os.path.exists(out_file) and os.path.getsize(out_file) > 10000:
            print(f"Skipping {os.path.basename(out_file)} (already valid: {os.path.getsize(out_file):,} bytes)")
            continue

        cmd = [
            EDGE_PATH,
            "--headless=new",
            f"--window-size={width},{height}",
            "--hide-scrollbars",
            "--disable-gpu",
            "--run-all-compositor-stages-before-draw",
            f"--screenshot={out_file}",
            url,
        ]
        print(f"Capturing {name} at {width}x{height} -> {os.path.basename(out_file)}")
        try:
            subprocess.run(cmd, capture_output=True, timeout=25)
            if os.path.exists(out_file) and os.path.getsize(out_file) > 1000:
                print(f"  OK: {os.path.basename(out_file)} ({os.path.getsize(out_file):,} bytes)")
            else:
                print(f"  Warning: {os.path.basename(out_file)} empty or missing")
        except Exception as e:
            print(f"  Error capturing {name}: {e}")

print("=== SCREENSHOT CAPTURE COMPLETE ===")
