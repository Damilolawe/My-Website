# Kappo Sono — independent website concept by Awe Concepts

This is a **working five-page website proposal**, not an official Kappo Sono website. The restaurant has not approved the design, wording, photos or use of its brand. Do not replace its official website or use as an official booking site without approval.

Pages: home, 13-course **July 2024 archival** menu, chef story, filterable image gallery with accessible lightbox, location/reservation information.

Restaurant information verified against https://www.kapposono.com/ (announcement of November 18, 2026 grand opening; 135 West 42nd Street), and published archives. Archive menu based on https://luxuryexperience.com/restaurants/kappo-sono-new-york-ny-usa/ (July 5, 2024). Resy may show old location details and cannot be treated as live verified opening information.

Photos: direct links to the restaurant's own Squarespace CDN (from https://www.kapposono.com/). They are real restaurant photography, **not screenshots scraped from Instagram**. Instagram profile linked throughout. Permission must be secured before official or commercial use; these external images require the CDN to remain accessible and an image-src CSP allowance for images.squarespace-cdn.com. Images may depict a previous location and historical dishes.

Accessibility: keyboard-operable navigation/gallery, Esc to close overlay, focus handling, reduced-motion support, alt text; responsive layout. No collection of visitor data or fake booking forms. Search robots noindex/nofollow for concept.

Deployment: repo root scripts/build.mjs already copies preview/ to Firebase dist/; run npm run build, then firebase deploy --only hosting --project awe-digital. GitHub commit alone does not deploy it.
