#!/usr/bin/env python3
"""Check metadata consistency, discovery files, and optional live crawler responses."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import argparse
import importlib.util
import json
import re
import struct
import urllib.request
import urllib.robotparser
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('build_seo', ROOT / 'scripts/build-seo.py')
config = importlib.util.module_from_spec(spec)
spec.loader.exec_module(config)

class Head(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.in_head = False; self.in_json = False
        self.metas = {}; self.canonicals = []; self.json = []; self.buffer = ''
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'head': self.in_head = True
        if not self.in_head: return
        if tag == 'meta':
            key = a.get('property', a.get('name', ''))
            if key.startswith(('og:', 'twitter:')) or key == 'robots':
                assert key not in self.metas, f'Duplicate {key}'
                self.metas[key] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonicals.append(a['href'])
        if tag == 'script' and a.get('type') == 'application/ld+json': self.in_json = True; self.buffer = ''
    def handle_data(self, data):
        if self.in_json: self.buffer += data
    def handle_endtag(self, tag):
        if tag == 'script' and self.in_json:
            self.json.append(json.loads(self.buffer)); self.in_json = False
        if tag == 'head': self.in_head = False


def check_page(filename, html):
    head = Head(html); expected = config.canonical(filename)
    assert head.canonicals == [expected], (filename, head.canonicals)
    for key in ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:site_name', 'og:image:alt', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']:
        assert head.metas.get(key), (filename, key)
    assert head.metas['og:url'] == expected, filename
    assert head.metas['og:image'] == head.metas['twitter:image'] == config.IMAGE
    assert head.metas['twitter:card'] == 'summary_large_image'
    assert head.metas['og:image:width'] == '1200' and head.metas['og:image:height'] == '630'
    assert 'noindex' not in head.metas.get('robots', '')
    assert 'jcnino2020.github.io' not in html, filename
    if filename == 'index.html':
        assert len(head.json) == 1
        person = head.json[0]
        assert person['@context'] == 'https://schema.org' and person['@type'] == 'Person'
        assert person['url'] == config.BASE + '/' and person['name'] == 'Jan Carlo G. Niñonuevo'
        assert person['sameAs'] == ['https://github.com/jcnino2020', 'https://www.youtube.com/@jcninoo']
        assert not any(k in person for k in ['birthDate', 'address', 'telephone', 'gender', 'award'])
    print(filename + ': canonical, social tags, and structured-data checks passed')


def main():
    parser = argparse.ArgumentParser(); parser.add_argument('--live', action='store_true'); args = parser.parse_args()
    expected = [config.canonical(name) for name in config.PUBLIC]
    tree = ET.parse(ROOT / 'sitemap.xml')
    locs = [node.text for node in tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    assert locs == expected and len(set(locs)) == len(expected)
    assert all(not urlparse(url).query and not urlparse(url).fragment and not url.endswith('.html') for url in locs)
    robots = urllib.robotparser.RobotFileParser(); robots.parse((ROOT / 'robots.txt').read_text().splitlines())
    assert robots.site_maps() == [config.BASE + '/sitemap.xml']
    assert all(robots.can_fetch('Googlebot', url) for url in expected)
    assert not robots.can_fetch('Googlebot', config.BASE + '/api/contact')
    # Noindex pages must remain fetchable so a crawler can read the directive.
    for name in ['photo-manager.html', '404.html']:
        assert 'noindex' in Head((ROOT / name).read_text()).metas['robots']
        assert robots.can_fetch('Googlebot', config.BASE + '/' + Path(name).stem)
    for name in config.PUBLIC: check_page(name, (ROOT / name).read_text())
    image = (ROOT / 'images/social/portfolio-social-v1.png').read_bytes()
    assert image[:8] == b'\x89PNG\r\n\x1a\n'
    width, height, depth, color, *_ = struct.unpack('>IIBBBBB', image[16:29])
    assert (width, height, depth, color) == (1200, 630, 8, 2)
    assert len(image) < 1_000_000
    print(f'Sitemap: {len(config.PUBLIC)} clean URLs; robots/noindex: consistent; social image: 1200×630, 8-bit RGB PNG.')
    if args.live:
        def fetch(url):
            request = urllib.request.Request(url, headers={'User-Agent': 'PortfolioMetadataCheck/1.0'})
            response = urllib.request.urlopen(request, timeout=30)
            assert response.status == 200 and response.url == url, (url, response.status, response.url)
            return response
        for name in config.PUBLIC:
            response = fetch(config.canonical(name))
            check_page(name, response.read().decode())
        for name in ['sitemap.xml', 'robots.txt', 'images/social/portfolio-social-v1.png']:
            response = fetch(config.BASE + '/' + name)
            assert response.read() == (ROOT / name).read_bytes(), name
        assert fetch(config.IMAGE).headers.get_content_type() == 'image/png'
        print('Live canonical URLs resolve directly; robots, sitemap, and preview image match local artifacts.')


if __name__ == '__main__': main()
