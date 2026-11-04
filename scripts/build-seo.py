#!/usr/bin/env python3
"""Refresh static sharing metadata and crawler discovery files (Python stdlib)."""
from pathlib import Path
from html import escape, unescape
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://jcnino-it.vercel.app'
SITE = 'JC Niñonuevo | IT Portfolio'
IMAGE = BASE + '/images/social/portfolio-social-v1.png'
IMAGE_ALT = 'JC Niñonuevo. Useful digital systems. Developer, researcher, and systems thinker in Bacolod City, Philippines.'
PUBLIC = [
    'index.html', 'web-development.html', 'system-design.html',
    'research-capstones.html', 'network-labs.html', 'creative-work.html',
    'case-study-gnet.html', 'case-study-drainwatch.html',
    'case-study-hydroalert.html', 'case-study-truthlens.html',
    'case-study-gawangpinas.html',
    'case-study-pasabaybcd.html',
    'case-study-sugar-inventory.html',
    'case-study-lakat-ta.html',
]


def canonical(filename):
    return BASE + '/' if filename == 'index.html' else BASE + '/' + Path(filename).stem


def tag(key, value, attribute='property'):
    return f'  <meta {attribute}="{key}" content="{escape(value, quote=True)}">'


def main():
    for filename in PUBLIC:
        path = ROOT / filename
        source = path.read_text()
        head_match = re.search(r'<head\b[^>]*>(.*?)</head>', source, re.S | re.I)
        head = head_match.group(1)
        title = unescape(re.search(r'<title>(.*?)</title>', head, re.S | re.I).group(1))
        description = unescape(re.search(r'<meta\s+name="description"\s+content="([^"]*)"', head, re.I).group(1))
        # Remove legacy or previously generated equivalents before adding singleton tags.
        head = re.sub(r'\s*<!-- BEGIN SHARING AND DISCOVERY -->.*?<!-- END SHARING AND DISCOVERY -->', '', head, flags=re.S)
        head = re.sub(r'\s*<meta\b(?=[^>]*(?:name|property)=["\'](?:og:|twitter:)[^"\']*["\'])[^>]*>', '', head, flags=re.I)
        head = re.sub(r'\s*<link\b(?=[^>]*rel=["\']canonical["\'])[^>]*>', '', head, flags=re.I)
        head = re.sub(r'\s*<!--\s*(?:Open Graph / Facebook|Twitter)\s*-->', '', head)
        url = canonical(filename)
        lines = [
            '\n<!-- BEGIN SHARING AND DISCOVERY -->',
            f'  <link rel="canonical" href="{url}">',
            tag('og:type', 'website'), tag('og:site_name', SITE),
            tag('og:locale', 'en_PH'), tag('og:title', title),
            tag('og:description', description), tag('og:url', url),
            tag('og:image', IMAGE), tag('og:image:secure_url', IMAGE),
            tag('og:image:type', 'image/png'), tag('og:image:width', '1200'),
            tag('og:image:height', '630'), tag('og:image:alt', IMAGE_ALT),
            tag('twitter:card', 'summary_large_image', 'name'),
            tag('twitter:title', title, 'name'),
            tag('twitter:description', description, 'name'),
            tag('twitter:image', IMAGE, 'name'), tag('twitter:image:alt', IMAGE_ALT, 'name'),
        ]
        if filename == 'index.html':
            person = {
                '@context': 'https://schema.org', '@type': 'Person',
                '@id': BASE + '/#person',
                'name': 'Jan Carlo G. Niñonuevo', 'alternateName': 'JC Niñonuevo',
                'url': BASE + '/', 'image': BASE + '/images/jc-ninonuevo.jpg',
                'description': description,
                'sameAs': ['https://github.com/jcnino2020', 'https://www.youtube.com/@jcninoo'],
            }
            lines.append('  <script type="application/ld+json">\n' + json.dumps(person, ensure_ascii=False, indent=2) + '\n  </script>')
        lines.append('<!-- END SHARING AND DISCOVERY -->\n')
        source = source[:head_match.start(1)] + head.rstrip() + '\n'.join(lines) + source[head_match.end(1):]
        path.write_text(source)

    # Crawlers must be allowed to fetch these pages to see their noindex directives.
    for filename in ['photo-manager.html', '404.html']:
        path = ROOT / filename
        source = path.read_text()
        source = re.sub(r'\s*<meta\b(?=[^>]*name=["\']robots["\'])[^>]*>', '', source, flags=re.I)
        source = source.replace('</head>', '<meta name="robots" content="noindex, nofollow"></head>', 1)
        path.write_text(source)

    ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    urlset = ET.Element('{http://www.sitemaps.org/schemas/sitemap/0.9}urlset')
    for filename in PUBLIC:
        node = ET.SubElement(urlset, '{http://www.sitemaps.org/schemas/sitemap/0.9}url')
        ET.SubElement(node, '{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text = canonical(filename)
    ET.indent(urlset, space='  ')
    (ROOT / 'sitemap.xml').write_bytes(ET.tostring(urlset, encoding='utf-8', xml_declaration=True) + b'\n')
    (ROOT / 'robots.txt').write_text('User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ' + BASE + '/sitemap.xml\n')
    print(f'Updated {len(PUBLIC)} public pages, Person data, sitemap.xml, and robots.txt.')


if __name__ == '__main__':
    main()
