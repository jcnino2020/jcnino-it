#!/usr/bin/env python3
"""Keep the native More disclosure consistent in static headers."""
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
        ('GawangPinas', 'https://gawangpinas.com/',
         'Philippine MSME marketplace with supplier listings and workspaces for inventory and orders.'),
        ('PasabayBCD', 'https://pasabaybcd.vercel.app/',
         'Shared freight for Bacolod, with rate estimates, shipment tracking screens, and shipper tools.'),
        ('Sugar Inventory Monitoring', 'https://sugar-inventory.vercel.app/',
         'Sign-in portal for monitoring sugar stock, SRO quantities, issuance, and deliveries.'),
        ('Lakat Ta', 'https://lakat-ta.vercel.app/',
         'Negros Occidental travel planner with a sample destination catalog, saved places, and itineraries.'),
    ]),
]


def menu_link(label, url, description=None):
    detail = f'<span class="nav-more-description">{escape(description)}</span>' if description else ''
    return f'<li><a href="{url}"><span>{escape(label)}</span>{detail}</a></li>'


def disclosure(placement):
    groups = ''.join(
        '<div class="nav-more-group"><p class="nav-more-heading">' + title + '</p><ul>'
        + ''.join(menu_link(*link) for link in links)
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

    print(f'Updated {count} static headers.')


if __name__ == '__main__':
    main()
