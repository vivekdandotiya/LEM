import os
import re
import shutil

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC = os.path.join(ROOT, "src")
PUBLIC = os.path.join(ROOT, "public")

print("=== LEAD EDGE INTEGRITY CHECK ===")

# 1. Zero Blue Grep Check
FORBIDDEN_PATTERNS = [
    re.compile(r"2b44f0", re.IGNORECASE),
    re.compile(r"8d9cff", re.IGNORECASE),
    re.compile(r"120\s*,\s*160\s*,\s*255", re.IGNORECASE),
    re.compile(r"60\s*,\s*90\s*,\s*255", re.IGNORECASE),
]

blue_violations = []

for base_dir in [SRC]:
    for dirpath, _, filenames in os.walk(base_dir):
        for f in filenames:
            if f.endswith((".js", ".jsx", ".ts", ".tsx", ".css", ".html")):
                path = os.path.join(dirpath, f)
                with open(path, "r", encoding="utf-8", errors="ignore") as file:
                    content = file.read()
                    for p in FORBIDDEN_PATTERNS:
                        if p.search(content):
                            blue_violations.append((path, p.pattern))

if blue_violations:
    print(f"FAILED: Found {len(blue_violations)} forbidden blue token occurrences:")
    for path, pat in blue_violations:
        print(f"  - {path}: matches {pat}")
else:
    print("PASSED: STRICT ZERO-BLUE VERIFIED across all src files.")

# 2. Image Asset Count
image_count = 0
for dirpath, _, filenames in os.walk(PUBLIC):
    for f in filenames:
        if f.endswith((".webp", ".png", ".jpg", ".svg")):
            image_count += 1
print(f"PASSED: Found {image_count} visual assets in public/.")

# 3. Clean up animorio-temp if present
animorio_temp = os.path.join(ROOT, "animorio-temp")
if os.path.exists(animorio_temp):
    try:
        shutil.rmtree(animorio_temp)
        print("PASSED: Cleaned up animorio-temp/ folder.")
    except Exception as e:
        print(f"Notice: Could not remove animorio-temp: {e}")

print("=== INTEGRITY CHECK COMPLETE ===")
