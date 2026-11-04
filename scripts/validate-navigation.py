#!/usr/bin/env python3
"""Check portfolio collections and featured projects in every public More menu."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]


class Navigation(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.menus = []
        self.current = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'details' and 'data-nav-more' in attrs:
            self.current = {'links': [], 'controls': None, 'panel': None}
            self.menus.append(self.current)
        if self.current is None:
            return
        if tag == 'summary':
            self.current['controls'] = attrs.get('aria-controls')
        if tag == 'div' and 'nav-more-popover' in attrs.get('class', '').split():
            self.current['panel'] = attrs.get('id')
        if tag == 'a':
            self.current['links'].append(attrs['href'])

    def handle_endtag(self, tag):
        if tag == 'details':
            self.current = None


def check(name, source, expected, featured):
    menus = Navigation(source).menus
    assert len(menus) == 2, (name, 'Expected desktop and mobile disclosures')
    assert len({menu['panel'] for menu in menus}) == 2, (name, 'Duplicate panel IDs')
    for menu in menus:
        assert menu['controls'] == menu['panel'] and menu['panel'], name
        links = menu['links']
        assert len(links) == len(set(links)) == 10, (name, 'Missing or duplicate links')
        internal = [link for link in links if link.startswith('/')]
        assert all(not urlsplit(link).query for link in internal), name
        pages = {urlsplit(link).path for link in internal if not urlsplit(link).fragment}
        assert pages == expected, (name, 'Portfolio collection coverage differs', pages ^ expected)
        assert [link for link in links if link not in internal] == featured, (name, 'Featured projects differ')
        assert '/#education' in links and 'id="education"' in (ROOT / 'index.html').read_text()
        for page in pages:
            assert (ROOT / (page.lstrip('/') + '.html')).is_file(), (name, page)
    print(name + ': both disclosures cover all five collections, education, and four featured projects.')


def main():
    sitemap = ET.parse(ROOT / 'sitemap.xml')
    expected = {urlsplit(node.text).path for node in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')} - {'/'}
    expected = {page for page in expected if not page.startswith('/case-study-')}
    home = (ROOT / 'index.html').read_text()
    projects = home.split('<section id="projects"', 1)[1].split('class="project-collections"', 1)[0]
    featured = list(dict.fromkeys(re.findall(r'href="(https://[^"]+)"', projects)))
    assert len(featured) == 4
    for file in ROOT.glob('*.html'):
        source = file.read_text()
        if file.name == 'photo-manager.html':
            continue
        check(file.name, source, expected, featured)
        prefix = '/' if file.name == '404.html' else ''
        assert f'href="{prefix}assets/navigation.css"' in source, file.name
        assert f'src="{prefix}assets/navigation.js"' in source, file.name


if __name__ == '__main__':
    main()
