# AWE / DIGITAL

The independent web design and development studio of Damilola Awe. An electric editorial portfolio with functional concept sites and an interactive brief builder.

## Run and build

No package install or paid service is required. Serve the repository with any local HTTP server (ES modules need HTTP rather than opening `index.html` as a file).

```sh
python3 -m http.server 8080
```

Create a clean, deployable directory:

```sh
node scripts/build.mjs
```

Validate authored JavaScript and HTML links:

```sh
python3 scripts/check.py
```

## Cloudflare Pages

Connect **Damilolawe/My-Website** to **Pages** (not a Workers deployment):

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Root directory | repository root (leave empty) |
| Build command | `node scripts/build.mjs` |
| Build output directory | `dist` |

The output includes the homepage, three demos, a real `404.html`, security headers, and all local assets. There is no backend, paid API, or build-time dependency install. Existing deployments that publish the repository root still have the root HTML/assets, but `dist` is recommended so documentation and source tooling are not published.

An authenticated Cloudflare account is required to create or connect the Pages project. Repository updates alone do not prove a live deployment. After deployment, verify the assigned `pages.dev` URL, the three demos, asset loading, headers, and unknown-path 404 response. Add a custom domain through that Pages project's Custom domains settings if desired; no domain has been assumed or purchased.

## Contact configuration — intentionally disabled

The owner chose to leave the public email unset. `config.js` therefore contains `contactEmail: ""`. The site explicitly states that public inquiries are not open yet. The brief builder works through local copy/download; it never pretends to submit a lead.

To enable email inquiries, set a verified public email in `config.js`. The direct email and brief email-draft links then appear automatically. They open the visitor's email app; the visitor sends their own message. There is no form submission backend or inbox database.

Do not place tokens, passwords, or private configuration in `config.js` or any static asset.

## What visitors can try

- Homepage: GSAP entrance/scroll reveals, magnetic controls, reading progress, a Three.js sculptural ribbon, and software-projected 3D when WebGL is unavailable. Rotation and wireframe controls work in both renderers. Rendering pauses offscreen or in a background tab.
- **The Spotlight**: fictional actor portfolio with original vector artwork, scene selection, and film/stage credit filters.
- **Slow Hours**: fictional café with menu/category and plant-based filters, sample cart, quantity controls, and computed totals. Nothing is ordered or charged.
- **Orbit**: functional fictional workspace. Create, remove/undo, search/filter, and change the status of tasks. Export the current view as CSV; user-entered spreadsheet formula prefixes are neutralized.
- **ResidenceOS and Cirvo**: original products, explicitly labeled in development. Stylized previews, not live university data. No other product repository is used or modified.
- **Design playground**: three art directions, accent picker with automatic text contrast, custom headline, motion intensity, reset, and direction transfer to the brief.
- **Project brief**: three steps, required idea validation, optional timing/budget/contact details, plain-text summary, copy, and `.txt` download. Details remain in the tab and reset on reload.

## Editing map

| File | Purpose |
| --- | --- |
| `index.html` | Main content and original project art |
| `styles.css` | Retained visual foundations |
| `studio.css` | Current art direction, responsive layout, forms |
| `script.js` | Navigation, motion, playground, brief builder |
| `sculpture.js` | GPU artwork and software fallback |
| `case-studies.js` / `.css` | Five accessible project dialogs |
| `demos/` | Three standalone, functional concept experiences |
| `config.js` | Public contact email configuration |
| `_headers` | Cloudflare security and caching policy |
| `scripts/build.mjs` | Clean static build |
| `RELEASE.md` | Audit, verification, and launch limitations |

## Accessibility and data

Semantic controls, skip links, native modal dialogs, focus return, responsive layouts, visible focus states, system reduced-motion support, and a persistent user motion toggle are included. The toggle stores only a local motion preference. No analytics, tracking pixels, cookies, or third-party form endpoints are configured. Optional Google Fonts requests reach Google's font servers; system font fallbacks are present.

Pinned GSAP 3.13.0 and Three.js 0.180.0 are served locally; see `vendor/NOTICE.md` and retained license notices. Motion and content work without a CDN. A modern browser is recommended for native dialogs and view transitions; unsupported page transitions gracefully use normal navigation.

No testimonials, sales metrics, client engagements, fixed service prices, or business policies have been fabricated. Fictional café prices and task records are demonstration data.
