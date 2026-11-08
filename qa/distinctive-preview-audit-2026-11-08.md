# Awe Concepts — preview design differentiation audit
Date: 2026-11-08
Branch: design/distinctive-111-previews-20261108

## Scope
- 168 preview homepages exist in the repository.
- 111 belong to the common prospect redesign manifest.
- 103 of those pages received new per-site CSS directions and altered section orders.
- 8 previously custom-designed pages were intentionally preserved.
- Four additional legacy clone pages (chique-collective, loove-labs, one-two-one-cafe, studio-ephemera) received four tailored HTML narratives and separate visual architectures.
- The other 53 legacy previews retain their existing site-specific page structures.
- All source changes are on a non-main branch. No GitHub Actions jobs were initiated for this redesign.

## Source implementation
- Reusable pure design transformation: scripts/distinctive-preview-design.mjs
- 22 hero compositions, 11 gallery systems, 8 feature arrangements, 8 story treatments, 8 closing treatments, 6 navigation styles, 8 typographic treatments and 6 content orders are combined deterministically.
- Per-site fingerprints are unique across the 111-index design model.
- Preserved original imagery, business copy, links, full address text, marquee markup and script, and footer attribution for all prospect transformations.
- Four legacy clone page bodies and CSS were individually rewritten without inventing hours, menu prices, or owner names.

## Validation status
- GitHub compare confirmed all 103 prospect homepages and 27 related source stylesheets are changed, plus the four legacy clone homepages.
- Pure-generator signature check: 111/111 unique design fingerprints.
- Static regression assertions: tests/distinctive-preview-architecture.test.mjs.
- **Not visually verified**: no local/Actions/browser screenshot QA of these new branch layouts was performed; no live deployment or desktop/mobile click-through performed.
- **Not yet merged/deployed**: live preview.aweconcepts.com does not yet show the redesigns.
- Do not mark client-ready or 100% until visual QA verifies typography, responsive layout, animation and imagery on the branch, and live QA follows deployment.

## GitHub Actions budget protection
- Avoid workflow_dispatch on revamp-111-prospects, polish-111-prospects, and screenshot QA workflows until quota permits.
- Do not merge this branch until ready for the main-branch preview deployment workflow and its associated resource use.
- If final QA is run outside GitHub Actions, use the existing Playwright scripts locally with adequate permissions/checkout, and record failures before merging.
