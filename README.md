<!-- Public brand: Awe Concepts; previous Firebase hosting kept during domain transition. -->
# AWE CONCEPTS

Damilola Awe’s creative web studio: an animated agency homepage, interactive concept demos, AWE Express ordering, and Awe Concepts Custom inquiries. Netlify hosts the public site and server functions; a dedicated Supabase project stores private customer data. Stripe is hard-locked to test mode.

**Status:** implemented and locally tested; not yet verified on a deployed Netlify account. Orders default to closed. No live charges, paid upgrades, or customer publications have been made. See [PLATFORM.md](docs/PLATFORM.md) for setup, walkthroughs, security, costs, and exact limitations.

## Development

Node 22 or newer:

```sh
npm ci
npm run build
npm run check
npm test
```

`dist/` contains only public files. Serve that directory for the design preview. A static server does not run accounts, uploads, payments, or the dashboard API. Functions are in `netlify/functions/`; test those through Netlify development/deploy tooling or the included HTTP workflow tests. Never publish the repository root as the static output.

## Netlify deployment

Import **Damilolawe/My-Website**, branch `main`. Settings are committed in `netlify.toml`:

| Setting | Value |
| --- | --- |
| Build | `npm run build` |
| Publish directory | `dist` |
| Functions directory | `netlify/functions` |
| Node | 22 |

Keep the free plan and disable automatic paid upgrades. Configure server environment variables using `.env.example` as the checklist; do not place secrets in `config.js`, HTML, or build output. Initially leave `ORDERS_ENABLED=false`. A public brochure/design-explorer deployment can run without service credentials. Finish the backend setup and real sandbox testing before opening ordering.

Netlify sign-in was interrupted by automatic approval review reporting a ChatGPT usage limit. No successful deployment or public URL is claimed.

## Project map

| Location | Purpose |
| --- | --- |
| `index.html`, `styles.css`, `studio.css` | Original studio visual design and Express / Custom positioning |
| `script.js`, `sculpture.js`, `case-studies.*` | GSAP, Three.js/software fallback, project dialogs and local brief builder |
| `demos/` | Actor concept, café interaction and task dashboard demos |
| `app/`, `order.html`, `account.html`, `admin.html` | Customer ordering and authenticated studio interface |
| `shared/model.mjs`, `shared/render.mjs` | Validated data model, six reusable website directions and deterministic HTML generation |
| `platform/` | Server authorization, storage, generation, jobs and approved file export |
| `netlify/functions/` | API, verified Stripe webhooks, published tenant routes and scheduled worker |
| `supabase/migrations/` | Private database, RLS, atomic payment/approval operations and storage bucket |
| `tests/` | PostgreSQL, HTTP workflow, upload, signature and security regression tests |
| `docs/PLATFORM.md` | Account setup, owner operations, cost estimates and limitations |

Public `config.js` retains an empty contact email as previously requested. Once you choose a business contact, set it there and in `PUBLIC_CONTACT_EMAIL`, and update the privacy/support copy. The homepage brief remains a local copy/download tool; the account’s Custom brief submits to the dashboard when backend setup is complete.

No other repository or existing Supabase project has been modified. ResidenceOS and Cirvo remain labeled as original products in development. Fictional demos and template samples are labeled as such.
