# Six creator previews: design and media audit

Scope: KevOnStage, Tony Baker, Keenan Baker, Tahir Moore, Roxxy Haze, Ice McGowan. Preview host only.

Changes:
- Added 14 locally served creator photos and promotional images, with source/provenance records; no substitute stock faces.
- Added two titled, lazy-loaded, privacy-enhanced YouTube embeds per creator, with direct watch links and fullscreen support.
- Fixed oversized/clipped hero headlines, responsive image composition, marquee seams, navigation focus/escape behavior, fixed-header anchor offsets and reduced-motion behavior.
- Removed unsupported statistics and stale dated show listings; corrected podcast, booking, merchandise and special links. Retained independent-concept disclosures and the canonical branded Awe Concepts footer.
- Updated Keenan's editorial palette to purple and white, consistent with his source branding.

Verification:
- Built the preview collection successfully and selected the existing 30-site allowlist without adding/removing sites.
- Inspected desktop and mobile screenshots of each creator site. Checked layouts at 1440, 1024, 768 and 390 CSS-pixel frame widths: no document horizontal overflow or overflowing heading boxes.
- Checked mobile menu open/close and Escape; all six scripts share the same corrected navigation behavior.
- All 12 final YouTube iframe players rendered their title/thumbnail/play controls in the browser. Replaced a Dream Con clip and a podcast episode that returned unavailable in the actual embed despite nominally valid watch-page metadata.
- Validated balanced HTML, unique IDs, internal anchors, local image existence, alt text and iframe attributes for all six source pages.
- Seven existing image CSP, icon and outbound-link/editorial tests passed against unpruned output. The existing allowlist source-directory test still expects Casa Lalo under preview/casa-lalo although its existing build source is casa-lalo; no unrelated restructuring was attempted.

Third-party streaming availability can change. Source rights remain with the creators and their respective owners.
