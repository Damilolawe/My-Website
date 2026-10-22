# AWE / DIGITAL — Premium customer-site improvements

## Customer websites
All six Express directions now generate a full-width responsive editorial site, with distinct layouts (professional grid, publication, luxury, cinematic, bold, playful) rather than sharing a bare section list. Optional structured project cards, services, quotes, portfolio photos and profile links are rendered into semantic HTML. Layout options add hero alignment, page density and corner treatment. Sections can be reordered by the studio owner.

The HTML is deterministic, self-contained, escapes customer text, and references only approved asset IDs. Previously approved versions remain frozen in the database as HTML, so future template updates do **not** silently alter published sites.

**Important:** Testimonials must be factual and customer-approved. The sample site has clearly labeled fictional demonstrations. No fabricated references, education or qualifications should be introduced.

## Résumé import (PDF/DOCX)
On the customer's Your Story step, choose a PDF or DOCX, then select **Preview résumé suggestions**. The user must authenticate before the document can be analyzed. The backend extracts text in memory and returns editable suggestions for name, headline, bio, education, experience, skills and project summaries. No extracted content is inserted until the user checks the fields and explicitly clicks **Apply selected suggestions**. No contact details are automatically published.

**Limits:** Maximum document 4 MB. DOCX extraction covers main-document paragraphs and is most reliable. PDF extraction is best-effort for basic text-based PDFs including some Flate-compressed streams; many digitally generated PDFs use glyph maps beyond this parser's capabilities and may return incomplete or unreadable text. Scanned PDFs need OCR and are not supported. A failed extraction must not block manual content entry. Do not describe it as full PDF support. Future work should replace the lightweight PDF fallback with a well-maintained audited parser, plus size/time resource limits.

This preview route requires a verified session and sends a private document to the server to analyze it. It does not save that extraction result or provide a public endpoint. Original uploaded documents are handled by the existing private-assets workflow.

## Owner visual studio
In **Admin → Review order**, the Visual Studio enhances the editor with:
- Live **unsaved** previews, no request to publish or save.
- Structured projects, services and testimonials with add/delete/reorder controls.
- Section order controls, density, alignment, corner treatment, hero label and CTA text.
- Existing desktop/tablet/mobile preview controls.
- Separate **Saved private draft** view.

**Save & Regenerate** still creates a new private, versioned draft after payment verification. **Approve & Publish** remains a separate owner-authenticated server operation tied to the exact saved version. Local editor previews are never customer-accessible public URLs. Do not regard a local unsaved preview as the version awaiting approval until saved.

## Testing and rollout
Run `npm ci && npm run build && npm run check && npm test`. Regression tests include distinct theme output, escaping and links, stored section order, DOCX sample extraction, basic text-PDF extraction and scanned-PDF failure. Run a full browser-based QA of the live editor, images, résumé files from multiple word processors and responsive layouts before production deployment. Integration tests remain required on Netlify and Supabase.

Keep orders disabled until all existing billing, owner setup, email and connected-provider checks pass. The update does not change contact handling, pricing, payment configuration, storage schema or production authorization rules.
