# AWE CONCEPTS — Immersive Website Collection

## Six purpose-built visual systems

Every Awe Concepts Express customer template now uses a dedicated hero composition and a distinct page rhythm:

| Template | Creative direction | Signature layout and motion |
|---|---|---|
| The Index | Professional/student | Twelve-column identity grid, angled hero image, graphic credential-style stamp, orderly three-column work case studies |
| Folio No. 01 | Photographer/editorial | Magazine cover typography, overlapping editorial portrait, offset twelve-column portfolio, quiet transitions |
| Still Studio | Minimal luxury | Architectural arched artwork, gallery-inspired whitespace, custom serif titles and staggered exhibition-like work panels |
| After Hours | Actor/performer | Full-bleed film stage, theatrical veil, film credits, oversized cinematic titles and reel-like project gallery |
| Signal / Noise | Creative/experimental | Brutalist graphic bands, angled imagery, animated stickers, oversized expressive text and bold work treatments |
| Daylight | Creator/small business | Oversized friendly headline, playful arch, floating sun mark, colorful geometric frames and inviting card rhythm |

The templates use **self-contained CSS animations** with no third-party font or animation API request. They remain functional without JavaScript, which also keeps the private iframe and exported HTML bundles compatible with their current security boundaries.

Templates all continue to honor customer-chosen palette, typography, sections, imagery, motion intensity and the same owner-only publish flow. They never create sample testimonials or fictional accomplishments on behalf of customers.

## Public studio and Awe Concepts Express discovery

The homepage has a live six-template *Creative Worlds* theater. Visitors can select between six genuine fictional demo pages, scroll the previews, switch desktop/mobile viewport widths and open full-size versions.

The Express template selection similarly includes a preview stage with distinctive illustrated posters. It never feeds the current customer's form data into the public demo. Each fictional demo also has a recognizable sample identity rather than using one stock biography across all templates.

GSAP is reused for intentional homepage entrance choreography, while CSS handles responsive preview transitions and ambient design animations. Both the browser's reduced-motion preference and the homepage Pause Motion control are respected: still-mode static demo files are generated during the build specifically so the sandboxed preview can pause without allowing script access.

## Deployment and QA

Build commands:

```sh
npm ci
npm run build
npm run check
npm test
```

Open the studio homepage and scroll to **SIX WORLDS**. Switch templates and preview sizes. In **/order.html**, enter the template selection step, preview and compare all six directions; select and customize each. Use real small-screen browsers and keyboard navigation to validate.

The build generates `dist/templates/{id}.html` and `dist/templates/{id}--still.html` for the 6 demos. Normal Express orders continue to generate private drafts only after verified test payment. Nothing in this feature changes the protected review/approve/publish operation.

## Current limitations

No customer design change becomes public automatically. This work does not turn on Stripe, change Supabase auth, configure email or diagnose the separate contact-form deployment. Client-side performance and visual polish still require testing on real low-end mobile devices and the final hosted Netlify URL. CSS scroll-timeline effects progressively enhance supported browsers; static content remains readable in browsers without support. Production exports retain the source's HTML/CSS structure without relying on costly external media.
