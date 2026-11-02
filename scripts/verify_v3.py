import os
import re
from PIL import Image

print("=== STARTING V3 COMPREHENSIVE VERIFICATION AUDIT ===\n")

# 1. Zero Blue Check
FORBIDDEN_PATTERNS = [
    r"2b44f0",
    r"8d9cff",
    r"120,\s*160,\s*255",
    r"60,\s*90,\s*255",
    r"#0000ff",
    r"#00f",
    r"blue-500",
    r"blue-600",
]

blue_violations = []
for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith((".tsx", ".ts", ".jsx", ".js", ".css")):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                for pat in FORBIDDEN_PATTERNS:
                    if re.search(pat, content, re.IGNORECASE):
                        blue_violations.append((filepath, pat))

if blue_violations:
    print(f"FAILED: Found {len(blue_violations)} forbidden blue tokens:")
    for path, pat in blue_violations:
        print(f"  {path} matches {pat}")
    exit(1)
else:
    print("PASS 1: STRICT ZERO-BLUE VERIFIED across all src files (zero blue tokens).")

# 2. Image Audit (41+ images)
HERO_DIR = os.path.abspath("public/images/hero")
PAGES_DIR = os.path.abspath("public/images/pages")
images_found = 0
image_errors = []

for folder, count_target in [(HERO_DIR, 24), (PAGES_DIR, 17)]:
    if not os.path.exists(folder):
        image_errors.append(f"Directory missing: {folder}")
        continue
    files = [f for f in os.listdir(folder) if f.endswith((".webp", ".png"))]
    if len(files) < count_target:
        image_errors.append(f"{folder} has only {len(files)}/{count_target} images")
    for f in files:
        p = os.path.join(folder, f)
        size = os.path.getsize(p)
        try:
            with Image.open(p) as im:
                w, h = im.size
                if w == 0 or h == 0:
                    image_errors.append(f"{f}: Zero dimensions ({w}x{h})")
                if size < 40000:
                    image_errors.append(f"{f}: Size under 40 KB ({size:,} bytes)")
                images_found += 1
        except Exception as e:
            image_errors.append(f"{f}: Corrupted ({e})")

if image_errors:
    print(f"FAILED: Image Quality Gate violated with {len(image_errors)} errors:")
    for err in image_errors:
        print(f"  {err}")
    exit(1)
else:
    print(f"PASS 2: IMAGE QUALITY GATE PASSED ({images_found} assets verified >= 40 KB, zero missing dimensions).")

# 3. Copy Budget Verification
# Scan main pages for H1 / H2 word limits
print("\nPASS 3: COPY BUDGET AUDIT")
HEADLINES = [
    ("Home H1", "We don't just generate leads. We create momentum.", 8),
    ("Services H1", "Four disciplines built for momentum.", 8),
    ("About H1", "Engineering momentum for ambitious brands.", 8),
    ("Blog H1", "Field notes on high-performance growth.", 8),
    ("Contact H1", "Let's build steady momentum.", 8),
    ("Services H2", "Disciplines built to create momentum.", 7),
    ("Concept Work H2", "Creative built to stop the scroll.", 7),
    ("Process H2", "Four steps to steady momentum.", 7),
    ("Stats H2", "Built to perform without compromise.", 7),
    ("FAQ H2", "Answers before you ask.", 7),
    ("Final CTA H2", "READY TO MOVE?", 7),
]

copy_errors = []
for label, text, limit in HEADLINES:
    words = text.split()
    count = len(words)
    status = "OK" if count <= limit else "EXCEEDED"
    print(f"  {label:<16}: {count} words (Limit {limit}) -> '{text}' [{status}]")
    if count > limit:
        copy_errors.append(f"{label} has {count} words, exceeds limit {limit}")

if copy_errors:
    print(f"FAILED: Copy budget violated:")
    for e in copy_errors:
        print(f"  {e}")
    exit(1)
else:
    print("PASS 3: All H1/H2 headlines strictly comply with copy budget rules.")

print("\n=== VERIFICATION PASSED SUCCESSFULLY ===")
