import os
import re

src = 'src'
for root, _, files in os.walk(src):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.css')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                c = fp.read()
                matches = re.findall(r'backdrop-(?:blur|filter)[^\s\"\';\)]*', c)
                css_matches = re.findall(r'-webkit-backdrop-filter|backdrop-filter', c)
                if matches or css_matches:
                    print(p, set(matches + css_matches))
