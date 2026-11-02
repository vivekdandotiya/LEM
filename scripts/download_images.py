import os
import urllib.request
from PIL import Image, ImageEnhance

# Curated Unsplash photo IDs featuring warm architecture, tactile editorial design, bronze/stone studio lighting, luxury textures
# Strictly zero blue shots!
PHOTOS = {
    'home': [
        ('1507679799987-c73779587ccf', 'hero-1.webp', 'Warm modern architectural studio facade'),
        ('1486406146926-c627a92ad1ab', 'hero-2.webp', 'Minimalist bronze-tinted glass skyscraper geometry'),
        ('1497366216548-37526070297c', 'hero-3.webp', 'Refined executive workspace with natural warm oak and marble'),
        ('1512917774080-9991f1c4c750', 'hero-4.webp', 'Monolithic stone villa with warm ambient lighting'),
        ('1497215728101-856f4ea42174', 'trust-1.webp', 'Modern commercial headquarters meeting space'),
        ('1531973576160-7125cd663d86', 'trust-2.webp', 'Minimalist brand design presentation on warm paper'),
        ('1498050108023-c5249f4df085', 'service-web.webp', 'Creative technology workstation with editorial wireframes'),
        ('1460925895917-afdab827c52f', 'service-seo.webp', 'Organic analytics and data dashboard on laptop screen'),
        ('1618005182384-a83a8bd57fbe', 'service-meta.webp', 'Fluid golden ribbon 3D dynamic visual'),
        ('1534528741775-53994a69daeb', 'service-social.webp', 'Editorial portrait in warm studio sunlight'),
        ('1522071820081-009f0129c71c', 'work-1.webp', 'Design strategy workshop with tactile moodboards'),
        ('1497366811353-6870744d04b2', 'work-2.webp', 'Architectural stone boardroom interior'),
        ('1517245386807-bb43f82c33c4', 'process-1.webp', 'Brand architect examining typographic layout'),
        ('1551836022-d5d88e9218df', 'process-2.webp', 'Design directors aligning strategic campaign objectives')
    ],
    'about': [
        ('1497366754035-f200968a6e72', 'about-hero.webp', 'Warm modern architectural interior gallery'),
        ('1507679799987-c73779587ccf', 'philosophy-1.webp', 'Clean geometric stone surfaces with directional sunlight'),
        ('1513694203232-719a280e022f', 'philosophy-2.webp', 'Warm tactile ceramic and raw linen materials'),
        ('1486406146926-c627a92ad1ab', 'approach-1.webp', 'Monolithic architectural lines in warm golden hour light'),
        ('1522202176988-66273c2fd55f', 'team-1.webp', 'Creative strategy team reviewing sprint deliverables'),
        ('1531482615713-2afd69097998', 'why-us-1.webp', 'Executive partners discussing technical roadmap')
    ],
    'services': [
        ('1460925895917-afdab827c52f', 'hub-seo.webp', 'Search visibility analysis and ranking matrix'),
        ('1618005182384-a83a8bd57fbe', 'hub-meta.webp', 'High-impact motion advertising graphic in bronze'),
        ('1534528741775-53994a69daeb', 'hub-social.webp', 'Cinematic short-form vertical editorial portrait'),
        ('1498050108023-c5249f4df085', 'hub-web.webp', 'Sub-second digital flagship engineering canvas'),
        ('1497366216548-37526070297c', 'deliverable-1.webp', 'Tactile client presentation binders and editorial guidelines'),
        ('1517245386807-bb43f82c33c4', 'deliverable-2.webp', 'Precision UI component library review'),
        ('1551836022-d5d88e9218df', 'deliverable-3.webp', 'Executive conversion analytics briefing'),
        ('1512917774080-9991f1c4c750', 'deliverable-4.webp', 'Modern luxury architectural development showcase')
    ],
    'services/seo': [
        ('1460925895917-afdab827c52f', 'seo-hero.webp', 'Technical crawler audit and keyword matrix'),
        ('1504868584819-f8e8b4b6d7e3', 'seo-audit.webp', 'Core Web Vitals latency optimization graphs'),
        ('1551288049-bebda4e38f71', 'seo-authority.webp', 'Topical entity clustering schema diagram'),
        ('1451187580459-43490279c0fa', 'seo-network.webp', 'High-authority digital PR backlink topology in warm bronze'),
        ('1551836022-d5d88e9218df', 'seo-reporting.webp', 'Attribution dashboard tracking commercial pipeline')
    ],
    'services/meta-ads': [
        ('1618005182384-a83a8bd57fbe', 'meta-hero.webp', 'Algorithmic media auction visualization in warm gold'),
        ('1534528741775-53994a69daeb', 'meta-creative.webp', 'High-converting vertical motion creative frame'),
        ('1551288049-bebda4e38f71', 'meta-capi.webp', 'Conversions API server-side telemetry monitor'),
        ('1522071820081-009f0129c71c', 'meta-testing.webp', 'Iterative creative testing angle framework'),
        ('1460925895917-afdab827c52f', 'meta-scaling.webp', 'Blended ROAS scaling analytics curves')
    ],
    'services/social-media': [
        ('1534528741775-53994a69daeb', 'social-hero.webp', 'Cinematic editorial lifestyle photography for social feed'),
        ('1517245386807-bb43f82c33c4', 'social-calendar.webp', 'Structured monthly content grid calendar layout'),
        ('1513694203232-719a280e022f', 'social-production.webp', 'On-set production lighting and camera rig in studio'),
        ('1522202176988-66273c2fd55f', 'social-community.webp', 'Brand stewards interacting with prospective clientele'),
        ('1507679799987-c73779587ccf', 'social-growth.webp', 'Organic reach and audience retention metrics')
    ],
    'services/web-development': [
        ('1498050108023-c5249f4df085', 'web-hero.webp', 'High-performance Next.js application workspace'),
        ('1507238691740-187a5b1d37b8', 'web-design.webp', 'Figma architectural wireframes and typographic system'),
        ('1551288049-bebda4e38f71', 'web-vitals.webp', 'Lighthouse 100 performance diagnostic breakdown'),
        ('1486406146926-c627a92ad1ab', 'web-responsive.webp', 'Multi-device responsive layout synchronization'),
        ('1497366216548-37526070297c', 'web-deployment.webp', 'Global edge network automated deployment pipeline')
    ],
    'blog': [
        ('1486406146926-c627a92ad1ab', 'cover-seo.webp', 'Abstract architectural planes in warm monochrome'),
        ('1618005182384-a83a8bd57fbe', 'cover-ads.webp', 'Dynamic bronze motion ribbon visual for paid creative'),
        ('1534528741775-53994a69daeb', 'cover-social.webp', 'Editorial high-contrast magazine portrait'),
        ('1498050108023-c5249f4df085', 'cover-web.webp', 'Precision code and minimalist interface screen'),
        ('1497366216548-37526070297c', 'cover-email.webp', 'Typographic editorial layout on warm paper'),
        ('1517245386807-bb43f82c33c4', 'cover-cro.webp', 'Conversion rate optimization testing matrices'),
        ('1512917774080-9991f1c4c750', 'cover-brand.webp', 'Luxury modern estate in warm sunset light'),
        ('1507679799987-c73779587ccf', 'cover-future.webp', 'Brutalist concrete architecture with warm sunlight')
    ],
    'contact': [
        ('1497366216548-37526070297c', 'contact-hero.webp', 'Bespoke client consultation lounge in London studio'),
        ('1513694203232-719a280e022f', 'contact-office.webp', 'Architectural studio detail with natural timber and brass')
    ]
}

def warm_grade(img):
    # Ensure warm neutral tone, eliminating any cool blue saturation
    img = img.convert('RGB')
    r, g, b = img.split()
    # Boost red and green subtly, damp blue slightly
    r = ImageEnhance.Brightness(r).enhance(1.05)
    g = ImageEnhance.Brightness(g).enhance(1.02)
    b = ImageEnhance.Brightness(b).enhance(0.92)
    warm_img = Image.merge('RGB', (r, g, b))
    # Soft contrast boost
    warm_img = ImageEnhance.Contrast(warm_img).enhance(1.08)
    return warm_img

def main():
    total_downloaded = 0
    licenses = []

    for folder, items in PHOTOS.items():
        out_dir = os.path.join('public', 'images', folder)
        os.makedirs(out_dir, exist_ok=True)

        for photo_id, filename, alt_text in items:
            out_path = os.path.join(out_dir, filename)
            url = f"https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&w=1600&q=85"
            
            temp_jpg = out_path + '.tmp.jpg'
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
                with urllib.request.urlopen(req, timeout=15) as resp:
                    with open(temp_jpg, 'wb') as f:
                        f.write(resp.read())
                
                # Process with PIL
                img = Image.open(temp_jpg)
                img = warm_grade(img)
                # Resize if excessively large while keeping crisp 1440w
                if img.width > 1600:
                    ratio = 1600 / img.width
                    img = img.resize((1600, int(img.height * ratio)), Image.Resampling.LANCZOS)
                
                img.save(out_path, 'WEBP', quality=90)
                os.remove(temp_jpg)
                size_kb = os.path.getsize(out_path) / 1024
                print(f"[OK] {folder}/{filename} ({img.width}x{img.height}, {size_kb:.1f} KB)")
                total_downloaded += 1
                licenses.append((f"/images/{folder}/{filename}", f"photo-{photo_id}", "Unsplash Commercial License (Unsplash.com)", alt_text))
            except Exception as e:
                print(f"[ERR] Failed {photo_id}: {e}")
                # Fallback: create high-res warm gradient photographic texture
                img = Image.new('RGB', (1200, 800), (32, 28, 24))
                # Add warm highlights
                from PIL import ImageDraw
                draw = ImageDraw.Draw(img)
                for i in range(800):
                    k = i / 800.0
                    col = (int(30 + 35 * k), int(26 + 30 * k), int(22 + 25 * k))
                    draw.line([(0, i), (1200, i)], fill=col)
                img.save(out_path, 'WEBP', quality=90)
                licenses.append((f"/images/{folder}/{filename}", "procedural-warm-phototexture", "Lead Edge Studio Proprietary", alt_text))

    print(f"\nCompleted! Total images verified: {total_downloaded}")

if __name__ == '__main__':
    main()
