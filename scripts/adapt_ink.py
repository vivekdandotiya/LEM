with open('animorio-temp/lead-edge-animations/ink-reveal/InkThatReveals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix CSS:
# 1. Remove html, body rules and global box-sizing
css = css.replace("""* { box-sizing: border-box; }
html,
body {
  margin: 0;
  height: 100%;
}
body {
  font-family: 'Mona Sans Variable', system-ui, sans-serif;
  color: var(--inchiostro);
  background: var(--carta);
  overflow: hidden;
}""", "")

# 2. Scope root variables to ink-palco
css = css.replace(":root {", ".ink-palco {")

# 3. Fix touch-action to pan-y by default so users can scroll
css = css.replace("touch-action: none;", "touch-action: pan-y;")

# 4. Scope classes with .ink-
css = css.replace('.palco', '.ink-palco')
css = css.replace('.parola', '.ink-parola')
css = css.replace('.tela', '.ink-tela')
css = css.replace('.gemello', '.ink-gemello')
css = css.replace('.nota', '.ink-nota')
css = css.replace('.linea-base', '.ink-linea-base')

with open('src/components/animorio/ink/InkThatReveals.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Wrote src/components/animorio/ink/InkThatReveals.css')

# Now adapt JSX
with open('animorio-temp/lead-edge-animations/ink-reveal/InkThatReveals.jsx', 'r', encoding='utf-8') as f:
    jsx = f.read()

# Add 'use client'; and CSS import
jsx = "'use client';\nimport './InkThatReveals.css';\n" + jsx

# Props signature
jsx = jsx.replace(
    "export default function InkThatReveals() {",
    "export default function InkThatReveals({ word = 'Momentum', height = 'min(88svh, 900px)', hint = 'Move across the paper. The same word sits underneath, inflated.' }) {"
)

# Apply height prop to container style
jsx = jsx.replace(
    "style={{ display: 'contents' }}",
    "style={{ width: '100%', height: height, position: 'relative', overflow: 'hidden', background: '#F5F3EE' }}"
)

# Scoping lookups to container
jsx = jsx.replace("palco = container.current.querySelector('[data-palco]')", "palco = container.current.querySelector('[data-palco]')")
jsx = jsx.replace(".parola", ".ink-parola")
jsx = jsx.replace(".tela", ".ink-tela")
jsx = jsx.replace(".gemello", ".ink-gemello")
jsx = jsx.replace(".palco", ".ink-palco")
jsx = jsx.replace(".linea-base", ".ink-linea-base")

# Class names in JSX
jsx = jsx.replace('className="palco"', 'className="ink-palco"')
jsx = jsx.replace('className="parola"', 'className="ink-parola"')
jsx = jsx.replace('className="tela"', 'className="ink-tela"')
jsx = jsx.replace('className="gemello"', 'className="ink-gemello"')
jsx = jsx.replace('className="nota"', 'className="ink-nota"')

# Word in JSX
jsx = jsx.replace('<h1 className="ink-parola" data-parola="">Soffio</h1>', '<div className="ink-parola" data-parola="" role="heading" aria-level={2}>{word}</div>')
jsx = jsx.replace('<span>Soffio</span>', '<span>{word}</span>')
jsx = jsx.replace(
    '<p className="ink-nota">Passa sopra la carta: sotto c la stessa parola, gonfia.</p>',
    '<p className="ink-nota">{hint}</p>'
)
# Also handle UTF-8 variations
import re
jsx = re.sub(r'<p className="ink-nota">[^<]+</p>', '<p className="ink-nota">{hint}</p>', jsx)

# Set height CSS variable on container
jsx = jsx.replace("const palco = container.current.querySelector('[data-palco]');", "const palco = container.current.querySelector('[data-palco]');\n    if (palco) palco.style.setProperty('--schermo', height);")

with open('src/components/animorio/ink/InkThatReveals.jsx', 'w', encoding='utf-8') as f:
    f.write(jsx)

print('Wrote src/components/animorio/ink/InkThatReveals.jsx')
