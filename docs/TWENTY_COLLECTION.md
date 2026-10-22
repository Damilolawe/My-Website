# AWE CONCEPTS — The Twenty Collection

## What changed

Awe Concepts Express now includes **twenty** separate layout systems. Six original IDs are preserved for backward compatibility, while fourteen new art directions are introduced. These are not twenty color presets: each has its own hero structure, content layout, visual motifs, background artwork, mobile rules and animation direction.

| ID | Design | Creative structure |
|---|---|---|
| index | The Index | Precision grid / identity-card layout |
| folio | Folio No. 01 | Editorial magazine cover |
| still | Still Studio | Luxury architectural gallery |
| afterhours | After Hours | Full-bleed cinematic opening |
| signal | Signal / Noise | Graphic kinetic disruption |
| daylight | Daylight | Playful geometric portrait |
| atlas | Atlas / Grid | Academic/data-led career story |
| terminal | Terminal 01 | Developer console and code narrative |
| orbit | Orbit 360 | Floating spatial futurism |
| playbill | The Playbill | Theatrical printed playbill |
| monologue | Monologue | Screenplay-script experience |
| portraiture | Portraiture | Casting portrait and lookbook |
| contactsheet | Contact Sheet | Photography contact archive |
| atelier | Maison Atelier | Fashion editorial composition |
| museum | Museum Notes | Curated museum installation |
| brutalist | Brutalist Press | Collage/poster brutalist energy |
| nocturne | Nocturne | Dark, high-end personal brand |
| foundry | The Foundry | Industrial service-business identity |
| bloom | Bloom House | Organic lifestyle and boutique service |
| ledger | Ledger & Co. | Structured consultancy brand |

## Matching the selected purpose

The customer chooses their goal *before* choosing a design. All twenty options remain accessible, while relevant designs rise to the top with recommendation cues. The public demo now uses a purpose-appropriate **fictional** content kit rather than showing the same biography to every customer.

The six purposes are: Student résumé, Professional portfolio, Actor/model, Creative portfolio, Personal brand, Small business. Each kit changes the demonstration identity, headline, work/credit/service cards, bio, CTA and displayed sections. Relevant section headings and the customer content collection fields also change with the selected purpose.

**No fictional credit, skill, achievement, testimonial or service is added to a paying customer's website.** Real sites are generated only from user-supplied material reviewed by the owner. The demo-only data is explicitly labeled fictional.

## Preview routes

The static build outputs:

- `/templates/<template-id>.html` and `--still.html` (original demo identity)
- `/templates/<purpose-slug>/<template-id>.html` and `--still.html`

There are 20 default demonstrations × 2 modes, plus 20 × 6 purpose-matched × 2 modes, totaling **280 static sample HTML pages**. URLs are generated exclusively from allowlisted template IDs and purpose slugs. Every public demo is labeled fictional and loaded into a script-disabled `iframe.srcdoc`. X-Frame-Options and CSP remain unchanged; private versions and customer content are never served to public previews.

## The main studio

The site now includes a newly directed home hero, a twenty-design showroom with purpose selector, and an interactive before/after comparison stage with native keyboard-accessible range input. The site reuses its existing GSAP/WebGL tools rather than introducing new paid APIs. Customers can see the entire design portfolio before signing in.

## Motion and accessibility

Generated customer websites are static HTML and CSS. Animation presets are **none, subtle, expressive**, with expressive selected by default in the new order flow; the customer can disable motion. Media queries respect `prefers-reduced-motion`. Scroll-linked features use progressive enhancement and retain visible content when unsupported. No generated site requires third-party animation JavaScript.

## Database and delivery

AWE CONCEPTS's dedicated Supabase project received 14 additional `awe_templates` rows via the idempotent script in `supabase/sql/register_twenty_templates.sql`. Existing IDs, owner preferences and private data remain unchanged. Templates still require the same verified payment, private draft, authenticated owner review, version-specific approval, and separate delivery path. **No real payments have been enabled by this release.**

## Validation and limitations

`npm ci && npm run build && npm run check && npm test` is required to pass before merging. Tests verify 20 distinct hero HTML compositions, six purpose-appropriate outputs, all 240 purpose-specific generated pages, motion behavior, escaping, valid links and preservation of the previous approval workflow.

Remaining launch QA: visually inspect 20×6 combinations in real mobile and desktop browsers; verify deployed Netlify paths; test accessibility/contrast and performance, and test actual customer uploads, approval, domain and email workflows. Automated tests do not replace production browser verification. CSS and abstract artwork do not automatically replace professional client photography or copywriting.
