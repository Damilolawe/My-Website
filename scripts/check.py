"""Check deployable HTML paths and fragment links, duplicate IDs, and essential metadata."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
from collections import Counter
import re, subprocess
source=Path(__file__).resolve().parent.parent
root=source/'dist'
class Page(HTMLParser):
    def __init__(self,path):
        super().__init__(); self.path=path; self.ids=[]; self.links=[]; self.title=False; self.h1=0; self.lang=False
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='html':self.lang=bool(a.get('lang'))
        if tag=='title':self.title=True
        if tag=='h1':self.h1+=1
        for key in ['href','src']:
            if a.get(key):self.links.append(a[key])
pages={}
for path in sorted(root.rglob('*.html')):
    page=Page(path); page.feed(path.read_text());pages[path.resolve()]=page
errors=[]
# Netlify Forms need an actual static HTML form and a CSP that permits same-origin POST.
headers=(root/'_headers').read_text()
contact=(root/'contact.html').read_text()
if "form-action 'self'" not in headers:
    errors.append("CSP must permit same-origin inquiry form submissions")
if not all(x in contact for x in ['name="awe-inquiries"', 'data-netlify="true"', 'name="form-name" value="awe-inquiries"', 'method="POST"', 'action="/inquiry-received"']):
    errors.append("Static Netlify inquiry form is missing required detection or submission fields")
if not (root/'inquiry-received.html').exists():
    errors.append("Contact success page missing from deploy")
for path,page in pages.items():
    for id,count in Counter(page.ids).items():
        if count>1:errors.append(f'{path.name}: duplicate #{id}')
    if not(page.title and page.lang and page.h1==1):errors.append(f'{path.name}: title/lang/h1 missing')
    for link in page.links:
        u=urlparse(link)
        if u.scheme or u.netloc:continue
        target=((root/u.path.lstrip('/')) if u.path.startswith('/') else (path.parent/u.path)).resolve() if u.path else path
        if target.is_dir():target=target/'index.html'
        if not target.exists():errors.append(f'{path.name}: missing {link}')
        if u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:errors.append(f'{path.name}: missing fragment {link}')
for js in [*source.glob('*.js'),*list((source/'demos').glob('*.js')),*list((source/'app').glob('*.mjs')),*list((source/'shared').glob('*.mjs')),*list((source/'platform').glob('*.mjs')),*list((source/'netlify/functions').glob('*.mjs'))]:
    subprocess.run(['node','--check',str(js)],check=True)
if errors:raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} pages; local links, fragments, unique IDs, title/lang/h1; all authored JavaScript syntax.')
