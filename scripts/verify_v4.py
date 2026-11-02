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
    print("=== ZERO-BLUE AUDIT ===")
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
        print("PASS: Zero blue detected across all src/ files (TSX, TS, CSS)!")
        return True

def check_required_files():
    print("\n=== V4 REQUIRED FILES CHECK ===")
    base = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    required = [
        "src/motion/cursor.ts",
        "src/components/process/ProcessStage.tsx",
        "src/components/process/scenes/SeoScene.tsx",
        "src/components/process/scenes/MetaScene.tsx",
        "src/components/process/scenes/SocialScene.tsx",
        "src/components/process/scenes/WebScene.tsx",
        "src/data/processes.ts",
        "docs/PROCESS-SCENES-RESEARCH.md",
        "tests/cursor.spec.ts",
        "tests/process.spec.ts",
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
    print("\n=== COPY BUDGET AUDIT ===")
    base = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    proc_file = os.path.join(base, "src", "data", "processes.ts")
    with open(proc_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract bodies
    bodies = re.findall(r"body:\s*'([^']+)'", content)
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
        print(f"PASS: All {len(bodies)} process phase bodies are within 40-word budget!")
        return True

if __name__ == '__main__':
    ok1 = check_zero_blue()
    ok2 = check_required_files()
    ok3 = check_copy_budget()
    
    if ok1 and ok2 and ok3:
        print("\n>>> ALL V4 INTEGRITY CHECKS PASSED <<<")
        sys.exit(0)
    else:
        print("\n>>> V4 INTEGRITY CHECKS FAILED <<<")
        sys.exit(1)
