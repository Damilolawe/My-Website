<!-- Public brand: Awe Concepts; previous Firebase hosting kept during domain transition. -->
# AWE CONCEPTS

Damilola Awe’s creative web studio: an animated agency homepage, interactive concept demos, AWE Express ordering, and Awe Concepts Custom inquiries. Firebase Hosting Classic serves the public site; Supabase Edge Functions handle the API and store private customer data. Live checkout is configured for the published Starter and Signature packages. Test-mode payment and fulfillment need fresh end-to-end verification after the catalog expansion.

**Status:** The public site deploys through the Firebase Hosting workflow. Starter and Signature packages are currently enabled, and the API reports live checkout configured. Do not infer payment or customer publication readiness from a successful static build; verify each payment-to-delivery path independently. See [FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md) and [PLATFORM.md](docs/PLATFORM.md) for setup and limitations.

## Development

Node 22 or newer:

```sh
npm ci
npm run build
npm run check
npm test
```

`dist/` contains only public files. Serve that directory for the design preview. A static server does not run accounts, uploads, payments, or the dashboard API. Production functions are in `supabase/functions/`; the HTTP workflow tests simulate their business behavior. Never publish the repository root as the static output.

## Firebase deployment

The existing [Firebase Hosting workflow](.github/workflows/firebase-hosting.yml) builds and checks `dist/`, then deploys it on `main` through Firebase Hosting Classic. See [Firebase setup](docs/FIREBASE_SETUP.md) for required repository configuration. Keep server secrets in GitHub Actions and Supabase, never in `config.js`, HTML, or build output. Changes to checkout activation require a separate launch decision. The current live configuration must be checked alongside webhook and fulfillment results.

## Project map

| Location | Purpose |
| --- | --- |
| `index.html`, `styles.css`, `studio.css` | Original studio visual design and Express / Custom positioning |
| `script.js`, `sculpture.js`, `case-studies.*` | GSAP, Three.js/software fallback, project dialogs and homepage inquiry brief |
| `demos/` | Actor concept, café interaction and task dashboard demos |
| `app/`, `order.html`, `account.html`, `admin.html` | Customer ordering and authenticated studio interface |
| `shared/model.mjs`, `shared/render.mjs` | Validated data model, template catalog and deterministic HTML generation |
| `platform/` | Server authorization, storage, generation, jobs and approved file export |
| `supabase/functions/` | Production API, inquiry intake, verified Stripe webhooks and worker |
| `supabase/migrations/` | Private database, RLS, atomic payment/approval operations and storage bucket |
| `tests/` | PostgreSQL, HTTP workflow, upload, signature and security regression tests |
| `docs/PLATFORM.md` | Account setup, owner operations, cost estimates and limitations |

Public `config.js` contains `contact@aweconcepts.com`. The homepage brief sends through the same Supabase inquiry intake as the contact page; copy and download remain optional. The account’s Custom brief uses the authenticated dashboard API.

ResidenceOS and Cirvo remain labeled as original products in development. Fictional demos and template samples are labeled as such.

## Attribution standard

All **new** client website drafts and portfolio proposals include a discreet **Designed by Awe Concepts** footer with the official SVG mark and a link to https://aweconcepts.com/. Shared renderers enforce this; details and the owner/customer sign-off boundary are documented in [Frontend Icon & Typography Policy](docs/FRONTEND_ICON_POLICY.md). Existing immutable customer approvals are not silently changed.
