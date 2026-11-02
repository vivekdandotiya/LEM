import os
import urllib.request
from PIL import Image, ImageEnhance

TARGETS = [
    # Meta ads & paid social: Real digital ad management / telemetry
    ("public/images/home/service-meta.webp", "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=85"),
    ("public/images/services/hub-meta.webp", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85"),
    ("public/images/services/meta-ads/meta-hero.webp", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85"),
    ("public/images/blog/cover-ads.webp", "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=85"),
]

def process(path, url):
    temp = path + ".tmp.jpg"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp, open(temp, 'wb') as f:
            f.write(resp.read())
        
        img = Image.open(temp).convert("RGB")
        # Warm grading: slightly boost red and green, soften cold blue
        r, g, b = img.split()
        r = r.point(lambda i: min(255, int(i * 1.04)))
        g = g.point(lambda i: min(255, int(i * 1.02)))
        b = b.point(lambda i: int(i * 0.94))
        img = Image.merge("RGB", (r, g, b))
        img = ImageEnhance.Contrast(img).enhance(1.05)
        
        os.makedirs(os.path.dirname(path), exist_ok=True)
        img.save(path, "WEBP", quality=88)
        if os.path.exists(temp): os.remove(temp)
        print(f"Successfully processed {path} ({os.path.getsize(path):,} bytes)")
    except Exception as e:
        print(f"Error {path}: {e}")
        if os.path.exists(temp): os.remove(temp)

for path, url in TARGETS:
    process(path, url)
