# Awe Concepts — visual acceptance contract

A passing build, CSS test or pull-request merge is NOT visual approval.
Never describe a template as visually verified or production polished without
reviewing its rendered appearance.

## Before editing
Inspect the actual rendered site from top to bottom at desktop 1440/1920,
tablet 768 and mobile 390. Visit all linked pages in Signature. Save a
baseline screenshot. Look beyond the reported issue: hierarchy, typography,
line-height, kerning, clipped letters, page-wide backgrounds, alignment,
mobile menus, navigation, contrast, images, motion and horizontal scrolling.
Trace the actual computed CSS and inherited rules that cause the issue.

## Before merging
Run the unit tests, build, and real-browser checks. Velocity has the
npm run qa:visual check (start a local HTTP server serving dist/ first).
It visits all five pages at four widths and checks header edges and gradient,
readable reveal-line heights, nav links and active states, mobile menu
toggle, and horizontal overflow. It saves screenshots and an exact JSON report.

Visually inspect every captured screenshot, including areas not mentioned
in the original bug report. Compare with before images. Fix obvious related
flaws in the same pass. Record the screenshot evidence, exact test result and
remaining known defects in the PR. A red or skipped workflow is not a pass.

For other templates, use their existing browser QA, screenshot collection
and an explicit full-page manual visual review at matching viewport sizes.
Do not infer visual approval from a test that only checks HTML/CSS strings.

## After deploying
Verify the intended full Git commit is live. Open actual public desktop and
mobile pages, inspect again, and exercise navigation. If hosting or live
browser access fails, report it as implemented but NOT production-verified.

## Evidence-based statuses
Implemented: source code changed only.
Browser-tested: real browser assertions actually ran and passed.
Visually reviewed: the rendered screenshots were inspected.
Production-verified: deployed commit and actual live appearance were checked.

Automated checks flag known failures, but artistic quality still requires
human/assistant inspection of full-page screenshots. Neither can replace
the other.
