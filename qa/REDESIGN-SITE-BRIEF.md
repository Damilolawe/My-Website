# Awe Concepts preview redesign: per-site brief

This is the working brief for redesigning one preview site. Follow it for
every site; it encodes the owner's standing rules and the technical limits of
the preview host.

## Ownership and safety

- Edit only `preview/<slug>/` for the slugs you were assigned. Never edit shared
  files (`scripts/`, `shared/`, `preview/prospect-shared/`, tests, workflows),
  another site's folder, or production files.
- Do not run `scripts/build-branded-previews.mjs` (it wipes the shared output
  other people are testing). Use the single-site build below.
- Do not commit or push. The coordinator commits.
- Do not contact businesses, buy anything, or post anywhere.

## 1. Research (verify, never invent)

- Use web search for the business name + neighborhood. Prefer: Google Maps /
  business listings, the business's Instagram, its own website (research only),
  menus on ordering platforms, reputable press (Eater, Time Out, local papers).
- Record every fact you use with its source URL in `site-record.json`.
- Use only what you can verify: name, full street address with ZIP, phone,
  public email, hours, specialties, menu items, owner names/history **only if a
  source states them**. If unsure, leave it out. Never write a partial address
  as if complete. Never invent testimonials, prices, hours, staff, awards,
  "since 19XX" dates, or menu items.
- Prices: only if a current public menu shows them; otherwise list items
  without prices.
- If the business appears closed or cannot be verified, record that in
  `outstandingIssues` and keep claims minimal.

## 2. Creative direction (the most important part)

Write a one-paragraph direction before coding: audience, personality,
typography pairing (Google Fonts), palette (4-6 named tokens), hero
architecture, section composition, image treatment, motion language, primary
call to action. It must be specific to this business and clearly different from
the other sites in the portfolio.

Rewrite `index.html` and `styles.css` from scratch. Do NOT keep the shared
prospect skeleton. Specifically avoid:

- split hero (text left / photo right) + ticker strip + "The local edit" panel;
- generic lines such as "The table, considered", "After hours, reimagined",
  "A neighborhood table, reimagined", "A restaurant concept led by atmosphere",
  "Explore the concept", "Meet you at the counter";
- three identical feature cards as the main content;
- decorative gradients with no purpose; centered-everything heroes by default.

Think like an agency designing for a paying client. Examples of the range
expected: a ramen bar as a dense, night-lit menu board with steam-blur
photography; a florist as airy asymmetric editorial spreads; a halal grill as
loud street-poster typography with a sticky order bar; a Pilates studio as calm
schedule-first layout; a bagel deli as a chalkboard-style menu with a big map.

Content: build what a customer actually needs: what they sell (menu or
services with real item names), where (full address, map link), when (hours if
verified), how to book/order (only verified third-party platforms), and the
story (only verified facts). Add extra pages (`menu.html`, `visit.html`, ...)
only when there is enough real content; every page must be linked from the
navigation and have its own purpose. One `<h1>` per page.

Keep a discreet one-line notice that this is an independent design concept by
Awe Concepts and not the business's official website (header strip or footer
line). The "Designed by Awe Concepts" credit is added automatically by the
build; do not add your own copy of it.

## 3. Imagery

- Every photo must show what it claims and suit this specific business (a
  doughnut shop shows doughnuts, not croissants). Check each image by eye with
  the contact-sheet helper before using it:
  `python3 scripts/qa-contact-sheet.py images /tmp/claude-0/.../<slug>-imgs.jpg <url> <url> ...`
  then Read the resulting jpg. Guessed photo IDs often show something else.
- Sources: free-licensed Unsplash (`https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=1600&q=80`)
  or Pexels (`https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=1600`).
  Pexels IDs can be found via web search results for `pexels.com/photo/...-<id>/`.
  The repo already contains many Unsplash IDs (`grep -rhoE 'photo-[0-9]+-[0-9a-f]+' preview | sort -u`);
  you may reuse one only after viewing it, and only if no other site in
  `preview/` already uses it (`grep -rl <id> preview`).
- Do not hotlink Instagram/Facebook images, competitors' photos, or photos
  from the business's website. No watermarks. No captions like "illustrative
  stock photography" or "representative image".
- If you cannot find enough fitting photos, use fewer photos and stronger
  typography/CSS compositions rather than irrelevant images.
- Write specific alt text.

## 4. Technical limits of the preview host (enforced by CSP)

- Images only from: same folder, `data:`, `images.unsplash.com`,
  `images.pexels.com`, `images.squarespace-cdn.com`, `static.wixstatic.com`,
  `cdn-s.acuityscheduling.com`. Fonts only via Google Fonts `<link>`.
- No inline `<script>`; behaviour goes in `preview/<slug>/site.js` (optional:
  without it the shared script is used, which toggles `.open` on the header
  `<nav>` when a `[data-menu]` button is clicked and adds `.seen` to
  `[data-reveal]` elements on scroll). No iframes (no map embeds), no form
  submissions, no fetch/XHR.
- `index.html` must contain `<link rel="stylesheet" href="./styles.css">` and
  `<script src="./site.js" defer></script>` exactly (the build versions them).
  Link between pages with `./menu.html` etc.
- No emoji and no arrow/dingbat characters (U+2190-21FF, U+2600-27BF) anywhere
  in HTML/CSS/JS; draw icons with inline SVG or CSS.
- Allowed outbound links: Google/Apple Maps, social profiles, independent
  booking/ordering/ticketing platforms, press articles, `aweconcepts.com`
  (full list: `scripts/preview-link-policy.mjs`). Never link to the business's
  own website.
- Must work from 320px to 1920px with no horizontal scroll; mobile nav must
  open, close, and be keyboard accessible (`aria-expanded`, focus styles).
- Honour `prefers-reduced-motion`. Animations must never leave content hidden
  if JS fails or the element is already in view.
- Headings must not clip or overflow at any width (use `clamp()` and
  `overflow-wrap`).
- Keep `<meta name="robots" content="noindex,nofollow">`.

## 5. Build, inspect, fix, repeat

```
node scripts/build-one-preview.mjs <slug>
QA_ROOT=artifacts/one/<slug>/public node scripts/qa-portfolio.mjs <slug>
```

Results: `artifacts/one/<slug>/qa-results.json`. Screenshots:
`artifacts/portfolio-qa/<date>/<slug>/<page>-desktop.jpg` and `-mobile.jpg`.

Automated checks are not enough. Read the desktop and mobile screenshots of
every page. Full-page images are downscaled when read, so also crop them into
sections to inspect at readable size, e.g.

```
python3 -c "from PIL import Image; im=Image.open('PATH'); [im.crop((0,y,im.width,min(im.height,y+1800))).save(f'/tmp/.../part{i}.jpg') for i,y in enumerate(range(0,im.height,1800))]"
```

Look for: clipped or overlapping text, awkward wrapping, empty areas, wrong or
badly cropped photos, weak hierarchy, poor contrast, broken mobile menu,
sticky elements covering content, footer problems. Fix and re-run until it
passes at both sizes. Only then mark it visually verified.

## 6. Record

Write `preview/<slug>/site-record.json`:

```json
{
  "slug": "...", "name": "...",
  "status": "visually-verified | code-complete | blocked",
  "researchStatus": "verified | partial | unverifiable",
  "verifiedBusinessInfo": {"address": "...", "phone": "...", "hours": "...", "instagram": "...", "other": "..."},
  "sources": ["https://..."],
  "designDirection": "one paragraph",
  "pages": ["index.html", "menu.html"],
  "modifiedFiles": ["preview/<slug>/index.html", "..."],
  "images": [{"url": "...", "subject": "what it shows", "license": "Unsplash License | Pexels License"}],
  "problemsFound": ["..."], "fixesImplemented": ["..."],
  "desktopQA": "passed (inspected 1440x900 screenshots of all pages)",
  "mobileQA": "passed (inspected 390x844 screenshots of all pages, menu opens/closes)",
  "functionalQA": "passed: nav links, anchors, outbound links, console clean",
  "outstandingIssues": []
}
```

Use `visually-verified` only if you actually looked at the screenshots of every
page at both sizes after your last change. Otherwise use `code-complete`.
