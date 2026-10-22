# AWE / DIGITAL search and sharing launch checklist

## Search-indexing boundaries

The main AWE / DIGITAL homepage, the design-philosophy story, and the Express information page are public marketing pages. Each includes unique title/description, Open Graph title/description, and a Twitter/X summary-card marker.

The generated `dist/templates/**` pages use fictional placeholder portfolios. They are valuable as **linked demonstrations**, but should not become organic search results falsely suggesting they are real client websites. The template renderer now adds `<meta name="robots" content="noindex, nofollow, noarchive">` only when rendering `sample: true`. Customer-approved real websites are not blanket-noindexed.

The customer account dashboard, owner dashboard, and 404 error page also use `noindex`. **Noindex is not security**: authenticated APIs, server-side authorization, private content protections, and storage policies remain mandatory.

## After Firebase deployment

1. Verify the Firebase `web.app` production hostname actually works; do not publish an invented domain in metadata.
2. Decide on the durable business domain. When one is configured, add canonical absolute URLs and `og:url` values to marketing pages and an intentional `og:image` (real studio brand image with commercial reuse rights, not a placeholder).
3. Generate a sitemap with the **verified production origin** and only real, index-worthy marketing pages. Avoid including private account pages, fictional template demos, unsupported server routes, or user-private projects.
4. Configure Google Search Console domain/property verification. Submit sitemap only once the real hostname is verified and the site's inquiry path is functional.
5. Validate Open Graph/X previews using deployed URLs and fetch results. Ensure no description claims fictitious customer work is real.
6. Run Lighthouse mobile accessibility/performance, verify keyboard navigation, reduced-motion settings, and actual image transfer. Source-code checks do not substitute for browser QA.
7. Check customer-site publication logic independently: individual customer sites should have appropriate SEO metadata and may be indexed only after their owners approve publishing.
8. Update privacy notices and the inquiry workflow for the eventual hosting/backend provider before encouraging visitors to submit personal details.

## Release coordination

This repository may be edited by a separate Work session to activate Firebase deployment. Keep these SEO improvements in a separate branch and merge only after reconciling the current default branch. No Firebase project settings, deployment secrets, Supabase schema, Netlify Functions, checkout, or customer data should change as part of this SEO release.
