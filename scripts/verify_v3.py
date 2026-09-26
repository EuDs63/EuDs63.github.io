"""Verify the v3 Pages artifact without changing source articles."""
import json
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

root = Path(sys.argv[1]).resolve()
base = sys.argv[2].rstrip('/') + '/'
site = urlsplit(base)
assert site.path == '/v3/', 'Refusing a build outside /v3/'


def local_target(url, page_url):
    parsed = urlsplit(urljoin(page_url, url))
    if parsed.netloc != site.netloc:
        return None
    assert parsed.path.startswith(site.path), f'Escapes /v3/: {url}'
    relative = unquote(parsed.path[len(site.path):])
    target = (root / relative).resolve()
    assert target.is_relative_to(root), f'Escapes artifact directory: {url}'
    if target.is_dir():
        target /= 'index.html'
    assert target.is_file(), f'Missing local target: {url}'
    return target


class Page(HTMLParser):
    def __init__(self, page_url):
        super().__init__()
        self.page_url = page_url
        self.noindex = False
        self.in_nav = False
        self.redirect = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'nav':
            self.in_nav = True
        if tag == 'meta' and attrs.get('http-equiv', '').lower() == 'refresh':
            self.redirect = True
        if tag == 'meta' and attrs.get('name') == 'robots':
            self.noindex = 'noindex' in attrs.get('content', '')
        if tag == 'link' and set(attrs.get('rel', '').split()) & {'stylesheet', 'icon', 'apple-touch-icon', 'canonical', 'preload'}:
            local_target(attrs.get('href', ''), self.page_url)
        if tag == 'script' and attrs.get('src'):
            local_target(attrs['src'], self.page_url)
            assert 'googletagmanager.com' not in attrs['src'], 'Analytics must be off in v3'
        if self.in_nav and tag == 'a' and attrs.get('href'):
            local_target(attrs['href'], self.page_url)

    def handle_endtag(self, tag):
        if tag == 'nav':
            self.in_nav = False


for route in ('', 'posts', 'about', 'archives', 'discover', 'records', 'rss_subscription'):
    assert (root / route / 'index.html').is_file(), f'Missing main route: {route}'

pages = list(root.rglob('*.html'))
checked = 0
for path in pages:
    relative = path.relative_to(root).as_posix()
    page_url = urljoin(base, relative)
    source = path.read_text(encoding='utf-8')
    # Hugo pagination redirects have only refresh/canonical, not a themed document.
    if '<title>' not in source:
        continue
    page = Page(page_url)
    page.feed(source)
    if page.redirect:
        continue
    assert page.noindex, f'Missing noindex: {relative}'
    assert 'v3-pref-theme' in source, f'Theme preference not isolated: {relative}'
    assert 'v3-menu-scroll-position' in source, f'Menu preference not isolated: {relative}'
    checked += 1

index = json.loads((root / 'index.json').read_text(encoding='utf-8'))
assert index, 'Search index is empty'
for entry in index:
    local_target(entry['permalink'], base)

feed = ET.parse(root / 'index.xml')
for link in feed.findall('./channel/item/link'):
    local_target(link.text, base)

records = (root / 'records/index.html').read_text(encoding='utf-8')
assert '/v3/css/records.css' in records, 'Records stylesheet is not rooted in v3'
print(f'PASS: {checked} HTML pages; {len(index)} search entries; RSS, navigation, assets, noindex and isolated preferences.')
