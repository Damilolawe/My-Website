# AWE / DIGITAL — Creative Website Studio

A premium, highly animated, accessible portfolio and lead-generation website for Dami Awe's independent creative web studio.

## Stack
- HTML, CSS, vanilla JavaScript
- No paid framework, account, API, or build process
- Cloudflare Pages static hosting (build command: leave blank; output directory: `/`)
- Works locally by opening `index.html`

## Features
- Cinematic reveal sequences and scroll-driven movement
- Magnetic UI, cursor spotlight, animated creative project demos
- Interactive "design lab" for playing with art direction
- Responsive mobile layouts, keyboard navigation, accessible reduced-motion support

## Deployment to Cloudflare Pages
1. In Cloudflare Dashboard open **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Authorize GitHub if prompted, then select **Damilolawe/My-Website**.
3. Set production branch to `main`. Framework preset: **None**. Build command: **(blank)**. Build output directory: `/`.
4. Deploy. Cloudflare will assign a `pages.dev` URL, then you can add a custom domain under the project settings.

## Notes
- The sample project demos and case-study summaries are illustrative. Replace with verified client testimonials, live links and final project details before promoting them as finished client work.
- Contact CTA currently uses email mailto links. Set a working studio email in the HTML before launch.
- Prices and specific service commitments intentionally aren't hardcoded; tailor them to your real offerings.
- Designed to work without tracking scripts or analytics by default.
