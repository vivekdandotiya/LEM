import os
import re
import sys

FORBIDDEN_BLUES = [
    r'#2b44f0',
    r'#8d9cff',
    r'#0000ff',
    r'#0066cc',
    r'#1e40af',
    r'#3b82f6',
    r'#60a5fa',
    r'text-blue',
    r'bg-blue',
    r'border-blue',
]

def check_zero_blue():
    print("=== 1. ZERO-BLUE AUDIT ===")
    violations = []
    src_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src"))
    
    for root, _, files in os.walk(src_dir):
        for f in files:
            if f.endswith(('.tsx', '.ts', '.css', '.mjs')):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
                    content = fp.read()
                    for pattern in FORBIDDEN_BLUES:
                        matches = re.findall(pattern, content, re.IGNORECASE)
                        if matches:
                            rel = os.path.relpath(path, src_dir)
                            violations.append((rel, pattern, len(matches)))
    
    if violations:
        print(f"FAILED: Found {len(violations)} forbidden blue references!")
        for rel, pat, count in violations:
            print(f"  {rel}: matched '{pat}' ({count} times)")
        return False
    else:
        print("PASS: Strictly zero blue detected across all src/ files (TSX, TS, CSS)!")
        return True

def check_candle_eliminated():
    print("\n=== 2. CANDLE ELIMINATION AUDIT ===")
    src_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src"))
    matches = []
    for root, _, files in os.walk(src_dir):
        for f in files:
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
                if 'candle' in content.lower():
                    matches.append((os.path.relpath(path, src_dir)))
    
    if matches:
        print(f"FAILED: Found candle references in src/: {matches}")
        return False
    else:
        print("PASS: Exactly zero candle references in src/!")
        return True

def check_required_files():
    print("\n=== 3. V5 REQUIRED FILES CHECK ===")
    base = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    required = [
        "docs/CLIENT-CONTENT.md",
        "docs/CLIENT-CONTENT-ANNOTATED.md",
        "docs/CONTENT-MAP.md",
        "docs/CLIENT-CHANGES.md",
        "docs/COPY-FIXES.md",
        "docs/COPY-REVIEW.md",
        "docs/SMOOTHNESS-AUDIT.md",
        "src/components/intro/BrandFloodIntro.tsx",
        "src/components/intro/intro.css",
        "src/data/hero.ts",
        "src/data/services.ts",
        "src/data/faqs.ts",
        "src/data/processes.ts",
        "src/app/services/ppc/page.tsx",
    ]
    all_ok = True
    for r in required:
        full = os.path.join(base, r)
        if os.path.exists(full):
            sz = os.path.getsize(full)
            print(f"  OK: {r} ({sz:,} bytes)")
        else:
            print(f"  MISSING: {r}")
            all_ok = False
    return all_ok

def check_copy_budget():
    print("\n=== 4. COPY BUDGET AUDIT ===")
    base = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    proc_file = os.path.join(base, "src", "data", "processes.ts")
    with open(proc_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    bodies = re.findall(r"body:\s*['\"]([^'\"]+)['\"]", content)
    over_budget = []
    for b in bodies:
        wc = len(b.split())
        if wc > 40:
            over_budget.append((b, wc))
    
    if over_budget:
        print(f"FAILED: {len(over_budget)} process descriptions exceed 40 words:")
        for b, wc in over_budget:
            print(f"  ({wc} words): {b[:60]}...")
        return False
    else:
        print(f"PASS: All {len(bodies)} process phase bodies are within budget!")
        return True

if __name__ == '__main__':
    ok1 = check_zero_blue()
    ok2 = check_candle_eliminated()
    ok3 = check_required_files()
    ok4 = check_copy_budget()
    
    if ok1 and ok2 and ok3 and ok4:
        print("\n>>> ALL V5 INTEGRITY CHECKS PASSED <<<")
        sys.exit(0)
    else:
        print("\n>>> V5 CHECKS FAILED <<<")
        sys.exit(1)
