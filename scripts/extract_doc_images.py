import os
import re
import base64

os.makedirs('docs/client-images', exist_ok=True)
with open('docs/CLIENT-DOC.html', 'r', encoding='utf-8') as f:
    html = f.read()

img_srcs = re.findall(r'<img[^>]+src=["\'](data:image/([^;]+);base64,([^"\']+))["\']', html)
print(f'Found {len(img_srcs)} base64 images')

for i, (full_src, mime_ext, b64_data) in enumerate(img_srcs):
    ext = 'png'
    if 'jpeg' in mime_ext:
        ext = 'jpg'
    elif 'webp' in mime_ext:
        ext = 'webp'
    out_file = f'docs/client-images/doc-img-{i+1:02d}.{ext}'
    with open(out_file, 'wb') as out_f:
        out_f.write(base64.b64decode(b64_data))
    print(f'Saved {out_file} ({os.path.getsize(out_file):,} bytes)')
