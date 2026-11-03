#!/usr/bin/env python3
"""Keep the native More disclosure consistent in static and legacy headers."""
from pathlib import Path
from html import escape
import re

ROOT = Path(__file__).resolve().parents[1]
GROUPS = [
    ('Explore', [
        ('Web systems', '/web-development'),
        ('System design', '/system-design'),
        ('Research & capstones', '/research-capstones'),
        ('Network labs', '/network-labs'),
        ('Photo & video', '/creative-work'),
        ('Education & certificates', '/#education'),
    ]),
    ('Case studies', [
        ('GNET Network & Data', '/case-study-gnet'),
        ('BCD DrainWatch', '/case-study-drainwatch'),
        ('HydroAlert Negros', '/case-study-hydroalert'),
        ('TruthLens', '/case-study-truthlens'),
    ]),
]


def disclosure(placement):
    groups = ''.join(
        '<div class="nav-more-group"><p class="nav-more-heading">' + title + '</p><ul>'
        + ''.join(f'<li><a href="{url}">{escape(label)}</a></li>' for label, url in links)
        + '</ul></div>' for title, links in GROUPS
    )
    return (
        '<!-- BEGIN MORE NAVIGATION -->'
        f'<details class="nav-more" data-nav-more><summary aria-controls="more-{placement}-panel">'
        'More<span class="nav-more-chevron" aria-hidden="true"></span></summary>'
        f'<div class="nav-more-popover" id="more-{placement}-panel"><div class="nav-more-grid">'
        + groups + '</div></div></details><!-- END MORE NAVIGATION -->'
    )


def clear_generated(source):
    source = re.sub(r'^[ \t]*<!-- BEGIN MORE NAVIGATION -->[^\n]*<!-- END MORE NAVIGATION -->[ \t]*\n', '', source, flags=re.M)
    return re.sub(r'<!-- BEGIN MORE NAVIGATION -->.*?<!-- END MORE NAVIGATION -->', '', source, flags=re.S)


def main():
    count = 0
    for path in ROOT.glob('*.html'):
        source = path.read_text()
        if 'class="desktop-nav"' not in source:
            continue
        source = clear_generated(source)
        source = re.sub(r'(<nav class="desktop-nav"[^>]*>)(.*?)(</nav>)',
                        lambda m: m[1] + m[2] + disclosure('desktop') + m[3], source, count=1, flags=re.S)
        source = re.sub(r'(<nav class="mobile-nav"[^>]*>)(.*?)(</nav>)',
                        lambda m: m[1] + m[2] + disclosure('mobile') + m[3], source, count=1, flags=re.S)
        prefix = '/' if path.name == '404.html' else ''
        if 'assets/navigation.css' not in source:
            source = source.replace('</head>', f'<link rel="stylesheet" href="{prefix}assets/navigation.css"><script src="{prefix}assets/navigation.js" defer></script></head>', 1)
        path.write_text(source)
        count += 1

    # This archive injects its header through the retained shared template.
    path = ROOT / 'assets/portfolio.js'
    source = clear_generated(path.read_text())
    if '<a href="index.html#skills" class="nav-link">Skills</a>' not in source:
        source = source.replace('        <a href="index.html#experience" class="nav-link">Experience</a>',
                                '        <a href="index.html#skills" class="nav-link">Skills</a>\n        <a href="index.html#experience" class="nav-link">Experience</a>', 1)
    source = source.replace('<a href="index.html#projects">Work</a><a href="index.html#experience">',
                            '<a href="index.html#projects">Work</a><a href="index.html#skills">Skills</a><a href="index.html#experience">', 1)
    source = source.replace('      </div>\n      <div class="hidden md:flex items-center" id="nav-cta">',
                            '        ' + disclosure('desktop') + '\n      </div>\n      <div class="hidden md:flex items-center" id="nav-cta">', 1)
    source = source.replace('    </div></div>\n  </div>\n</nav>',
                            '      ' + disclosure('mobile') + '\n    </div></div>\n  </div>\n</nav>', 1)
    if 'window.initPortfolioNavigation?.();' not in source:
        source = source.replace('    injectComponents();', '    injectComponents();\n    window.initPortfolioNavigation?.();', 1)
    # Rebuilding only inserts generated fragments, never additional indentation.
    source = re.sub(r'^[ \t]+(?=<!-- BEGIN MORE NAVIGATION -->)', '        ', source, flags=re.M)
    path.write_text(source)
    path = ROOT / 'web-development.html'
    source = path.read_text()
    if 'assets/navigation.css' not in source:
        source = source.replace('</head>', '<link rel="stylesheet" href="assets/navigation.css"><script src="assets/navigation.js" defer></script></head>', 1)
    path.write_text(source)
    print(f'Updated {count} static headers and the shared archive header.')


if __name__ == '__main__':
    main()
