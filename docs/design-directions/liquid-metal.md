## Liquid Metal

The unchanged user-supplied source is at `design-sources/liquid-metal/DESIGN.md` (private repository; not part of Firebase `dist/`).

- Template ID: `liquidmetal`
- Commercial collection: **Signature ($150)**, also Premium
- Original build: `shared/liquid-metal.mjs` and `shared/liquid-metal-style.mjs`, mirrored in `supabase/functions/awe-api/shared`
- Full independent HTML architecture: graphite navigation, machined-metal hero, frosted cards, editable portfolio cases, capabilities, education, experience, testimonials, and contact
- Exact frontmatter tokens: Inter / JetBrains Mono, primary #E8EAEE, background #0E1013, 64px glass blur, 115% saturate and four prescribed pill CTA variants; no saturated hues
- Conflicting source prose mentions 48px blur, flat background and 350ms transitions, whereas the frontmatter and hard constraints specify 64px, atmospheric graphite backdrop and motion <=200ms. Implementation follows the frontmatter plus hard constraints, retaining the original document unchanged
- Customers' approved photos and content replace the sample visuals. No third-party images or code execute on customer pages. No script injection
- The look has a fixed monochromatic system: ordinary customer color pickers cannot override this template's intentionally color-free identity

Visual screenshots and automated checks must be completed before release.
