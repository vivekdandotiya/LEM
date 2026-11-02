import os
from PIL import Image

HERO_DIR = os.path.abspath("public/images/hero")
PAGES_DIR = os.path.abspath("public/images/pages")

all_images = []
errors = []

for folder, label in [(HERO_DIR, "Hero Wall"), (PAGES_DIR, "Page Visuals")]:
    if not os.path.exists(folder):
        errors.append(f"Directory missing: {folder}")
        continue
    for fname in os.listdir(folder):
        if fname.endswith((".webp", ".png", ".jpg")):
            fpath = os.path.join(folder, fname)
            size = os.path.getsize(fpath)
            try:
                with Image.open(fpath) as im:
                    w, h = im.size
                    if w == 0 or h == 0:
                        errors.append(f"{fname}: Zero dimension ({w}x{h})")
                    if size < 40000:
                        errors.append(f"{fname}: Size under 40 KB ({size:,} bytes)")
                    all_images.append({
                        "name": fname,
                        "type": label,
                        "dims": f"{w}x{h}",
                        "size_kb": round(size / 1024, 1),
                        "bytes": size
                    })
            except Exception as e:
                errors.append(f"{fname}: Corrupt or unreadable ({e})")

print(f"=== IMAGE AUDIT REPORT ({len(all_images)} IMAGES VERIFIED) ===")
print(f"{'IMAGE FILE':<42} | {'SECTION':<14} | {'DIMENSIONS':<10} | {'SIZE':<9} | {'STATUS'}")
print("-" * 90)

for img in sorted(all_images, key=lambda x: x["name"]):
    status = "FAIL (<40KB)" if img["bytes"] < 40000 else "PASS"
    print(f"{img['name']:<42} | {img['type']:<14} | {img['dims']:<10} | {img['size_kb']:>6.1f} KB | {status}")

print("-" * 90)
if errors:
    print(f"FAILED: {len(errors)} issues detected:")
    for err in errors:
        print(f"  - {err}")
    exit(1)
else:
    print(f"SUCCESS: All {len(all_images)} images passed! (None under 40 KB, zero missing dimensions).")
