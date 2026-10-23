# AWE Express Art Direction — Edition 02

This release is an art-direction upgrade for the existing 20-template collection, with particular attention to **After Hours**, **Folio No. 01**, and **Maison Atelier**.

## What changes
- Production template renderer and public previews now share curated photographic compositions in the **fictional sample previews only**. Every template has a contextual photo treatment and sample credit.
- Customer websites **never reference Unsplash or any sample photography**. Customer-uploaded and approved photographs remain the primary imagery. If there is no upload, the fallback is now template-specific self-contained editorial artwork instead of the shared generic orb.
- The first three flagship directions gain explicit layout treatment: full-bleed film-title art for After Hours; asymmetric magazine spreads for Folio; layered runway campaign for Atelier.
- All 20 designs receive a unique photographic treatment, illustration signature and typography/crop accents. Existing full-page compositions and user personalization remain intact.
- No new executable scripts, APIs or third-party fonts in generated customer websites.
- The homepage and builder retain the existing 20-template selection, pricing, contact path, payment controls, and owner approval workflow.

## Licensed preview photographs
The previews refer to original photo pages on Unsplash that are explicitly marked **free to use under the Unsplash License**. Photos remain third-party demo assets, are credited in each preview, and are not transferred to customer sites. See https://unsplash.com/license. The CSP permits `images.unsplash.com` for public template previews, and the site's privacy notice discloses this.

## Testing and deployment
- `npm run build`, `npm run check`, `npm test`
- Browser QA at 360, 390, 768, 1024 and 1440px with all 20 template previews
- Sync the changed shared renderer files to the existing Supabase `awe-api` function only after successful review/merge.
- Never regenerate or overwrite previously approved `awe_versions.html` or published customer directories. Existing publications are immutable and must remain unchanged.

## Boundaries
The photo provider requires a network connection for **sample previews**, and photo previews should retain their fallback background if an image cannot load. Actual customer sites use approved uploaded media and inline art with no remote photo dependency. Live payments remain off.
