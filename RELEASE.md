# AWE / DIGITAL — release notes

## Initial audit

Inspected all eight original repository files at `7599d7e788d60635ba313847fda055114ef54726`. Preserved the strongest elements: ink/acid identity, editorial typography, original vector portrait, product preview art, and a live art-direction sandbox.

Issues addressed:

- Static project mockups had little meaningful functionality; added three standalone interactive concept experiences.
- The brief builder only copied preset choices; replaced it with a validated three-step flow and real visitor input, summary, copy, download, and configurable email drafts.
- There was no usable contact route despite a contact section; made the disabled state explicit and added one public configuration point. Public email remains unset by the owner's choice.
- Added the missing small-business example and a separate working application demonstration.
- Replaced decorative emoji/dingbat substitutes with drawn SVG marks or CSS artwork; removed unsupported registered-trademark symbols.
- Product work is labeled independently developed and in development; concept content is labeled fictional, with no invented client outcomes or production deployments.
- Replaced continuous site-wide pointer polling with event-driven interaction. Artwork pauses offscreen/background and respects motion preferences.
- Replaced manual modal imitation with native dialogs, with keyboard focus behavior and Escape dismissal.
- Added a real 404, clean deployment build, security headers, and local pinned animation dependencies.

## Direction and reference study

Electric editorial: a deliberate contrast between large geometric typography and warmer serif expression, with original sculptural artwork and distinct concept art directions. Reference study focused on typographic hierarchy, choreographed transitions, project storytelling, and interactive work presentation, rather than copying protected layouts or code.

References inspected:

- https://www.awwwards.com/sites/keva-nyc
- https://www.awwwards.com/sites/habitat-creative-agency (search listing; full retrieval unavailable)
- https://www.awwwards.com/sites/mutt-agency (search listing; full retrieval unavailable)
- https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- https://threejs.org/docs/
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Verification performed

- Authored JavaScript passes `node --check`; five HTML pages pass local asset/fragment, duplicate-ID, title, language, and single-H1 checks through `scripts/check.py`.
- Cloud browser functional checks: case study opening, in-development product details, Escape dismissal, mobile menu open/navigation/close, and pause-motion mode.
- Responsive browser previews at 320px, 390px, 768px iframe widths and a 1363px desktop viewport. Fixed narrow-screen design-lab expansion. Width checks show no page overflow at the narrow/tablet/desktop sizes after correction.
- Actor concept: scene selection and film filter (two sample credits).
- Café concept: adding an item, increasing quantity, computed $7.00 total for two sample espressos, category and plant-based filtering (one matching food item).
- Orbit: task creation (six to seven), search (one of seven), status change (completed count two to three), remove/undo, and browser-confirmed CSV download.
- Brief: mobile three-step flow with optional name/email, design-lab direction carried into the summary, and a download-prepared state. The iframe download event observer timed out; the subsequent direct-page test confirmed the actual `.txt` download and clipboard copy.
- WebGL is disabled in the test browser. The software-projected artwork fallback and controls were verified; the Three.js rendering path was syntax checked and reviewed but requires verification on a GPU-enabled browser.

These are practical functional checks, not a comprehensive device lab, WCAG certification, or a claimed Lighthouse score.

## Launch state

Source is prepared for Cloudflare Pages. This file does not claim a production deployment has succeeded. Cloudflare sign-in is required in the available browser; the final response records whether deployment was completed. No domain, account, email address, or paid plan has been assumed.

Public email is intentionally unset, so the site can showcase work and generate downloadable briefs but cannot yet receive public inquiries. Configure a verified contact destination before using it as an unattended lead-generation channel.
