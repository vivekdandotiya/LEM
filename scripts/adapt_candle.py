import re

with open('animorio-temp/lead-edge-animations/candle-loader/TheCandleLoaderThatBurnsDown.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Add 'use client'; at very top
code = "'use client';\nimport './TheCandleLoaderThatBurnsDown.css';\n" + code

# Component signature
code = code.replace(
    'export default function TheCandleLoaderThatBurnsDown() {',
    'export default function TheCandleLoaderThatBurnsDown({ onDone }) {'
)

# Constants
code = code.replace("const SECONDS = 5.6;", "const SECONDS = 3.4;")
code = code.replace("const HOLD = 2.4;", "const HOLD = 0.9;")
code = code.replace("const WORD = 'Boo.';", "const WORD = 'Ignite.';")
code = code.replace("const EVENT = 'The Lantern Walk';", "const EVENT = 'Lead Edge Marketing';")
code = code.replace(
    "const PHASES = ['Lighting the candles', 'Carving the lanterns', 'Waking the guests'];",
    "const PHASES = ['Warming up the strategy', 'Lighting the campaigns', 'Fuelling momentum'];"
)
code = code.replace("const DONE = 'Ready. Mind the dark.';", "const DONE = 'Ready.';")
code = code.replace("const MARKS = ['IX', 'X', 'XI', 'XII'];", "const MARKS = ['01', '02', '03', '04'];")

# Replace blue-white base flame drawing
old_flame = """        /* the blue-white base where the wax vapour burns */
        g = ctx.createRadialGradient(0, -2.2, 0, 0, -2.2, W * 0.95);
        g.addColorStop(0, 'rgba(235,242,255,.85)');
        g.addColorStop(0.45, 'rgba(120,160,255,.55)');
        g.addColorStop(1, 'rgba(60,90,255,0)');"""

new_flame = """        /* the warm-white base where the wax vapour burns */
        g = ctx.createRadialGradient(0, -2.2, 0, 0, -2.2, W * 0.95);
        g.addColorStop(0, 'rgba(255,246,222,.85)');
        g.addColorStop(0.45, 'rgba(255,214,150,.55)');
        g.addColorStop(1, 'rgba(255,160,60,0)');"""

assert old_flame in code, 'old_flame snippet not found!'
code = code.replace(old_flame, new_flame)

# Timeline restart replacement
code = code.replace(
    "cycle = gsap.timeline({ onComplete: () => run(false) })",
    "cycle = gsap.timeline({ onComplete: () => onDone?.() })"
)

# Click on done
code = code.replace(
    "if (done) { run(false); return; }",
    "if (done) { onDone?.(); return; }"
)

# CSS class replacements in JS queries & markup
code = code.replace("root.querySelector('.candle')", "root.querySelector('.candle-canvas')")
code = code.replace("root.querySelector('.word')", "root.querySelector('.candle-word')")
code = code.replace("root.querySelector('.status__text')", "root.querySelector('.candle-status__text')")
code = code.replace("root.querySelector('.status__num')", "root.querySelector('.candle-status__num')")
code = code.replace("span.className = 'dot'", "span.className = 'candle-dot'")

# Markup classes
code = code.replace('className="stage"', 'className="candle-stage"')
code = code.replace('className="loader"', 'className="candle-loader"')
code = code.replace('className="loader__scene"', 'className="candle-loader__scene"')
code = code.replace('className="candle"', 'className="candle-canvas"')
code = code.replace('className="word"', 'className="candle-word"')
code = code.replace('className="loader__meta"', 'className="candle-loader__meta"')
code = code.replace('className="event"', 'className="candle-event"')
code = code.replace('className="event__name"', 'className="candle-event__name"')
code = code.replace('className="event__date"', 'className="candle-event__date"')
code = code.replace('className="status"', 'className="candle-status"')
code = code.replace('className="status__text"', 'className="candle-status__text"')
code = code.replace('className="status__num"', 'className="candle-status__num"')

# Date markup text
code = re.sub(r'<span className="candle-event__date">[^<]+</span>', '<span className="candle-event__date">Digital growth studio</span>', code)

# Wrap in candle-wrap and add Skip button
code = code.replace('<div ref={container}>', '<div ref={container} className="candle-wrap">')
code = code.replace(
    '<div className="candle-stage">',
    '<div className="candle-stage">\n        <button type="button" onClick={onDone} className="candle-skip-btn" aria-label="Skip intro">Skip</button>'
)

with open('src/components/animorio/candle/TheCandleLoaderThatBurnsDown.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print('Successfully created src/components/animorio/candle/TheCandleLoaderThatBurnsDown.jsx!')
