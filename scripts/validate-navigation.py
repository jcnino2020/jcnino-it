#!/usr/bin/env python3
"""Ensure every sitemap page is reachable through every public More menu."""
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


def check(name, source, expected):
    menus = Navigation(source).menus
    assert len(menus) == 2, (name, 'Expected desktop and mobile disclosures')
    assert len({menu['panel'] for menu in menus}) == 2, (name, 'Duplicate panel IDs')
    for menu in menus:
        assert menu['controls'] == menu['panel'] and menu['panel'], name
        links = menu['links']
        assert len(links) == len(set(links)) == 10, (name, 'Missing or duplicate links')
        assert all(link.startswith('/') and not urlsplit(link).query for link in links), name
        pages = {urlsplit(link).path for link in links if not urlsplit(link).fragment}
        assert pages == expected, (name, 'Sitemap and menu coverage differ', pages ^ expected)
        assert '/#education' in links and 'id="education"' in (ROOT / 'index.html').read_text()
        for page in pages:
            assert (ROOT / (page.lstrip('/') + '.html')).is_file(), (name, page)
    print(name + ': both disclosures cover all nine secondary pages and education.')


def main():
    sitemap = ET.parse(ROOT / 'sitemap.xml')
    expected = {urlsplit(node.text).path for node in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')} - {'/'}
    for file in ROOT.glob('*.html'):
        source = file.read_text()
        if 'class="desktop-nav"' not in source:
            continue
        check(file.name, source, expected)
        prefix = '/' if file.name == '404.html' else ''
        assert f'href="{prefix}assets/navigation.css"' in source, file.name
        assert f'src="{prefix}assets/navigation.js"' in source, file.name
    legacy = (ROOT / 'assets/portfolio.js').read_text()
    template = re.search(r'const navHtml = `(.+?)`;', legacy, re.S).group(1)
    check('shared archive header', template, expected)
    assert 'window.initPortfolioNavigation?.();' in legacy
    archive = (ROOT / 'web-development.html').read_text()
    assert 'href="assets/navigation.css"' in archive and 'src="assets/navigation.js"' in archive


if __name__ == '__main__':
    main()
