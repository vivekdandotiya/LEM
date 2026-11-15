import re

with open('docs/CLIENT-DOC.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace img tags with marker [IMAGE_N]
pattern = r'<img[^>]+>'
counter = 0

def replacer(match):
    global counter
    counter += 1
    return f"\n\n[[IMAGE_{counter:02d}]]\n\n"

annotated_html = re.sub(pattern, replacer, html)

# Strip tags to get clean annotated text
clean_text = re.sub(r'<style[^>]*>.*?</style>', '', annotated_html, flags=re.DOTALL)
clean_text = re.sub(r'<[^>]+>', '\n', clean_text)
lines = [l.strip() for l in clean_text.split('\n') if l.strip()]

output = '\n'.join(lines)
with open('docs/CLIENT-CONTENT-ANNOTATED.md', 'w', encoding='utf-8') as f:
    f.write(output)

print(f'Wrote docs/CLIENT-CONTENT-ANNOTATED.md ({len(lines)} lines)')
