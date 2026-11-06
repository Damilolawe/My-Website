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
# Production checks only the production site itself. Preview concepts are
# deployed and validated independently by tests/branded-previews.test.mjs and
# the preview browser QA workflows. The production build retains a legacy
# dist/preview directory, but its relative assets target the isolated host.
# Do not misreport those preview-specific links as broken production paths.
for path in sorted(root.rglob('*.html')):
    if path.is_relative_to(root / 'preview'):
        continue
    page=Page(path); page.feed(path.read_text());pages[path.resolve()]=page
errors=[]
# Firebase's static Hosting cannot accept Netlify Forms submissions. Require the
# dedicated Supabase function, a real JSON acknowledgment, and visible feedback.
contact=(root/'contact.html').read_text()
if not all(x in contact for x in ['name="awe-inquiries"', 'method="POST"', 'type="module" src="/contact.js"']):
    errors.append("Inquiry form must be wired to its Firebase-compatible module")
if 'data-netlify' in contact:
    errors.append("Obsolete Netlify Forms detection must not be present")
handler=root/'contact.js'
if not handler.exists():
    errors.append("Contact AJAX handler missing from deploy")
else:
    code=handler.read_text()
    if not all(x in code for x in ['/functions/v1/awe-inquiry', '"application/json"', 'data?.ok !== true', 'data?.reference']):
        errors.append("Contact submission must require a real Supabase intake acknowledgment")
if not ('/contact.js' in contact and 'id="inquiry-status"' in contact and 'id="inquiry-success"' in contact):
    errors.append("Contact status and inline confirmation elements missing")
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
