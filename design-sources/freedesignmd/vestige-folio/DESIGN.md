---
name: "Vestige Folio"
description: "Fashion editorial that doesn't shout. Off-bone surfaces, Playfair Display 400 for product names at oversized scale, Inter for body and UI, generous negative space, and a single muted oxblood accent reserved for the Add-to-Bag CTA. Built for fashion houses, jewellery brands, and high-end retail that wants the catalogue feel of a glossy quarterly."
tags: [editorial, fashion, ecommerce, premium, minimal]
colors:
  primary:   "#1a1612"
  secondary: "#797268"
  tertiary:  "#1a1612"
  neutral:   "#ece6d8"
  surface:   "#f4eee0"
typography:
  display: "Playfair Display"
  body:    Inter
  mono:    "JetBrains Mono"
  scale:
    hero: "7rem / 0.94 / 400 / -0.04em"
    h1:   "4rem / 1 / 400 / -0.03em"
    h2:   "1.875rem / 1.2 / 400 / -0.018em"
    body: "1rem / 1.7 / 400 / -0.005em"
radius:
  sm: 0px
  md: 0px
  lg: 0px
  pill: 9999px
shadows:
  card:   none
  button: none
borders:
  card:    "1px solid rgba(26,22,18,0.10)"
  divider: rgba(26,22,18,0.14)
buttons:
  primary:
    background: #5a1a22
    color: #f4eee0
    border: none
    shape: sharp
    padding: 14px 28px
    font: 500 / 0.8125rem / 0.14em
    uppercase: true
  secondary:
    background: transparent
    color: #1a1612
    border: 1px solid #1a1612
    shape: sharp
    padding: 14px 28px
    font: 500 / 0.8125rem / 0.14em
    uppercase: true
  outline:
    background: transparent
    color: #1a1612
    border: 1px solid rgba(26,22,18,0.18)
    shape: sharp
    padding: 14px 28px
    font: 500 / 0.8125rem / 0.14em
    uppercase: true
  ghost:
    background: transparent
    color: #797268
    border: none
    shape: sharp
    padding: 14px 18px
    font: 500 / 0.8125rem / 0.14em
    uppercase: true
charts:
  variant: "thin-bars"
  stroke_width: 1
  fill_opacity: 0
  gridlines: false
  bar_gap: 18px
  highlight: single
  dot_marker: false
fonts_url: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
dependencies: ["lucide-react"]
---

# Vestige Folio

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Vestige Folio** as its
design system. Treat `DESIGN.md` as the single source of truth.
Your job is to translate the user's product requirements into
components and pages that look like they were designed by the same
person who authored this file.

### 2 · Token compliance

- Pull every color, font family, radius, shadow, and spacing value
  from the frontmatter at the top of this file.
- Use semantic roles (e.g. `primary`, `accent`, `muted`) — never
  hard-code hex values that bypass the system.
- When a token can be expressed as a CSS variable, declare it once
  in your global stylesheet and reference it everywhere downstream.
- The Google Fonts `<link>` is provided in the Typography section.
  Add it to `<head>` before any component renders.

### 3 · Component recipes

Use these recipes verbatim when building the corresponding component.

#### Buttons

Four variants are defined. Pick one — never blend variants or invent a fifth.

- **Primary** — sharp shape, bg `#5a1a22`, text `#f4eee0`, padding `14px 28px`, weight `500`, uppercased.
- **Secondary** — sharp shape, text `#1a1612`, border `1px solid #1a1612`, padding `14px 28px`, weight `500`, uppercased.
- **Outline** — sharp shape, text `#1a1612`, border `1px solid rgba(26,22,18,0.18)`, padding `14px 28px`, weight `500`, uppercased.
- **Ghost** — sharp shape, text `#797268`, padding `14px 18px`, weight `500`, uppercased.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#f4eee0`
- Border: `1px solid rgba(26,22,18,0.10)`
- Shadow: `none`
- Radius: `radius.lg` (`0px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

#### Tabs

Variant: `underline`. Flat row of labels. Active tab gets a 2px underline in the accent color — no fill.

#### Charts

- Bar/line variant: `thin-bars`
- No gridlines — let the bars/lines carry the data.
- Highlight strategy: `single` — emphasize a single bar/point per chart.

#### Typography pairings

- **Display (`Playfair Display`)** — h1, h2, hero headlines, brand wordmarks.
- **Body (`Inter`)** — paragraphs, labels, button text, form inputs.
- **Mono (`JetBrains Mono`)** — code, eyebrows, metadata, numerals in tables.

### 4 · Hard constraints

Never do any of the following without explicit instruction from the user:

- Introduce a new color, font, radius, or shadow that isn't declared above.
- Mix this system with another (e.g. don't paste in Material or Bootstrap defaults).
- Use generic gradient defaults (purple→blue, peach→pink) — they break the system's voice.
- Reach for emoji icons. Use a consistent icon library and size icons in line with body type.
- Add motion that exceeds the system's restraint — keep transitions short (≤200ms) and subtle.

### 5 · Before you finish — verify

Run through this checklist for every screen you produce:

- [ ] Every color used appears in the Colors table above.
- [ ] Headlines use the display font; body copy uses the body font.
- [ ] Buttons match one of the declared variants exactly (shape, padding, weight).
- [ ] Border-radius values come from `radius.sm` / `radius.md` / `radius.lg` / `radius.pill`.
- [ ] Cards and dividers use the declared border + shadow tokens.
- [ ] No values were invented; if you needed something missing, you stopped and asked.

---

## 1. Atmosphere

Vestige Folio is the visual language of a glossy fashion quarterly. The page surface is off-bone `#f4eee0` — closer to coated catalogue stock than to white. Product names run in Playfair Display at 112px, weight 400 — the high-contrast didone strokes earning their drama from sheer scale, never weight. Body sits in Inter at 16px on a 1.7 leading. UI labels run in Inter 500 with extreme 0.14em uppercase tracking — the catalogue-caption voice carried into every button. The single accent is muted oxblood `#5a1a22` that appears only on the Add-to-Bag CTA — the singular conversion moment in the entire system gets the singular color.

The discipline is in the proportion: massive Playfair on bone, generous negative space, and one oxblood button per page that doesn't apologize for being a button.

**Signature moves**
- Playfair Display 400 at 112px for product names — drama through scale, never weight
- Off-bone catalogue surface `#f4eee0` — never white, never beige
- Oxblood `#5a1a22` exclusively on the Add-to-Bag CTA — one conversion, one color
- All UI labels uppercase 0.14em tracking — the catalogue caption voice
- Sharp 0px radius — print rules
- Generous negative space (160px section padding) — the air IS the luxury

## 2. Palette

### Surfaces
- **Bone** `#f4eee0` — page background (warm catalogue stock)
- **Bone Lift** `#ece6d8` — secondary surfaces, lookbook panels
- **Hairline** `rgba(26,22,18,0.10)` — every divider

### Ink
- **Ink** `#1a1612` — text, headings, secondary CTA fill
- **Ink 50** `#797268` — secondary text, mono captions

### Accent
- **Oxblood** `#5a1a22` — Add-to-Bag CTA only
- That is the only color in the system.

## 3. Typography

| Role | Font | Size | Weight | Leading | Tracking |
|------|------|------|--------|---------|----------|
| Product Name (Hero) | Playfair Display | 112px | 400 | 0.94 | -0.04em |
| H1 | Playfair Display | 64px | 400 | 1.0 | -0.03em |
| H2 | Playfair Display | 30px | 400 | 1.2 | -0.018em |
| Pull Quote | Playfair Display (italic) | 28px | 400 | 1.3 | -0.012em |
| Body | Inter | 16px | 400 | 1.7 | -0.005em |
| UI / Button | Inter | 13px | 500 | 1.4 | 0.14em uppercase |
| Caption / Price | JetBrains Mono | 11px | 500 | 1.0 | 0.10em uppercase tabular-nums |
| Price Display | JetBrains Mono | 16px | 500 | 1.0 | 0 tabular-nums |

Playfair only at 400 — the high-contrast didone breaks at any heavier weight. Italic reserved for pull quotes from the season's editor letter.

## 4. Buttons

### Primary (Oxblood — Add to Bag only)
```css
background: #5a1a22;
color: #f4eee0;
padding: 14px 28px;
border-radius: 0;
text-transform: uppercase;
letter-spacing: 0.14em;
font-weight: 500;
```

The 0.14em tracking is wider than typical UI — that is the catalogue caption voice carried into the button.

### Secondary (Ink Outline — every other action)
- Transparent, 1px solid ink, ink text — same sharp shape, same wide tracking

### Outline & Ghost
- Outline: transparent, 1px hairline at 18% ink
- Ghost: no border, ink-50 uppercase, hover underlines

## 5. Cards

```css
background: #f4eee0;
border: 1px solid rgba(26,22,18,0.10);
border-radius: 0;
box-shadow: none;
```

NO shadows, NO radii, NO inset highlights. Lookbook cards lift to bone-lift surface and add a 1px ink top border (3px wide) — that is the only chrome.

## 6. Charts

Thin precise bars (3px wide, 18px gap). One bar in oxblood, others in 18% ink. NO gridlines. Y-axis labels in JetBrains Mono uppercase 11px. Charts are reserved for sales-by-collection breakdowns — they read as exhibit panels, not infographics.

## 7. Tabs

Underline 1px in ink for the active state. Inactive tabs are ink-50 in uppercase 0.14em. Hover = ink text, no underline. The active label is set in Playfair Display italic at the same size — that's the rhythm change.

## 8. Spacing

- Base 8px
- Scale: `8, 16, 24, 32, 48, 64, 96, 128, 160, 200`
- Section padding: 160px desktop, 80px mobile — the air IS the luxury

## 9. Do's & don'ts

✅ **Do**
- Use Playfair Display at 400 only — anything heavier breaks the high-contrast didone
- Hold the oxblood for Add-to-Bag exclusively — one CTA, one color
- Use 0.14em uppercase tracking on every UI label — that's the catalogue voice
- Keep generous negative space — section padding 160px desktop is non-negotiable

❌ **Don't**
- Use Playfair at 600+ — bold breaks the didone proportion
- Use sharp coloured fills on secondary buttons — only oxblood, only Add-to-Bag
- Use any radius — sharp 0px is the print rule
- Use a second accent — oxblood alone, on the conversion CTA only

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#1a1612` |
| secondary | `#797268` |
| tertiary  | `#1a1612` |
| neutral   | `#ece6d8` |
| surface   | `#f4eee0` |

### Typography

- **Display:** Playfair Display
- **Body:** Inter
- **Mono:** JetBrains Mono

| Role | size / leading / weight / tracking |
|------|------------------------------------|
| Hero | 7rem / 0.94 / 400 / -0.04em |
| H1   | 4rem / 1 / 400 / -0.03em |
| H2   | 1.875rem / 1.2 / 400 / -0.018em |
| Body | 1rem / 1.7 / 400 / -0.005em |

### Radius

- sm: `0px`
- md: `0px`
- lg: `0px`
- pill: `9999px`

### Shadows

- **card:** `none`
- **button:** `none`

### Borders

- **card:** `1px solid rgba(26,22,18,0.10)`
- **divider:** `rgba(26,22,18,0.14)`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `#5a1a22` |
| color | `#f4eee0` |
| border | `none` |
| padding | `14px 28px` |
| fontWeight | `500` |
| fontSize | `0.8125rem` |
| tracking | `0.14em` |
| uppercase | `true` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#1a1612` |
| border | `1px solid #1a1612` |
| padding | `14px 28px` |
| fontWeight | `500` |
| fontSize | `0.8125rem` |
| tracking | `0.14em` |
| uppercase | `true` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#1a1612` |
| border | `1px solid rgba(26,22,18,0.18)` |
| padding | `14px 28px` |
| fontWeight | `500` |
| fontSize | `0.8125rem` |
| tracking | `0.14em` |
| uppercase | `true` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#797268` |
| border | `none` |
| padding | `14px 18px` |
| fontWeight | `500` |
| fontSize | `0.8125rem` |
| tracking | `0.14em` |
| uppercase | `true` |

### Charts

| Property | Value |
|----------|-------|
| variant | `thin-bars` |
| strokeWidth | `1` |
| fillOpacity | `0` |
| gridlines | `false` |
| barGap | `18px` |
| highlight | `single` |
| dotMarker | `false` |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — bg: `rgba(26, 22, 18, 0.92)`, shadow: `0 4px 20px -8px rgba(26, 22, 18, 0.4)`
- **focus** — outline: `1.5px solid #1a1612`, outline-offset: `4px`
- **active** — transform: `translateY(1px)`, filter: `brightness(0.95)`
- **disabled** — opacity: `0.45`
- **loading** — opacity: `0.7`
- **selected** — bg: `#1a1612`, color: `#f4eee0`

#### Input

- **hover** — border: `1px solid #1a1612`
- **focus** — border: `1px solid #1a1612`, shadow: `0 1px 0 0 #1a1612`
- **disabled** — opacity: `0.45`
- **error** — border: `1px solid #991B1B`, shadow: `0 1px 0 0 #991B1B`

#### Card

- **hover** — shadow: `0 8px 24px -12px rgba(15,23,42,0.14)`, transform: `translateY(-1px)`
- **selected** — border: `1px solid #1a1612`

#### Tab

- **hover** — color: `#1a1612`
- **focus** — outline: `1.5px solid #1a1612`, outline-offset: `3px`
- **selected** — color: `#1a1612`, border: `0 0 2px 0 solid #1a1612`

### Density

| Mode | padding × | row × | body | radius × | Use for |
|------|-----------|-------|------|----------|---------|
| compact | 0.72 | 0.78 | 0.8125rem | 0.85 | Information-dense — tables, IDEs, dashboards |
| comfortable | 1 | 1 | 0.9375rem | — | Default — most product UI |
| spacious | 1.35 | 1.3 | 1rem | 1.15 | Editorial — marketing, long-form, settings |

### Motion

**Signature — Page turn.** Deliberate, measured motion — like turning a magazine page. Never jerky, never overdone.

```css
transition: all 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

| Token | Value |
|-------|-------|
| duration.instant | `80ms` |
| duration.fast | `180ms` |
| duration.base | `320ms` |
| duration.slow | `500ms` |
| easing.standard | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| easing.decelerate | `cubic-bezier(0.0, 0, 0.2, 1)` |
| easing.accelerate | `cubic-bezier(0.4, 0, 1, 1)` |
| easing.spring | `cubic-bezier(0.5, 1.2, 0.6, 1)` |

### Elevation

Five-level scale, system-specific recipe.

| Level | Shadow | Recipe |
|-------|--------|--------|
| level0 | `none` | Hairline only — typical editorial resting state. |
| level1 | `0 1px 2px rgba(15,23,42,0.04)` | Barely visible — list rows, dividers. |
| level2 | `0 8px 24px -12px rgba(15,23,42,0.12)` | Pull-quote, sidebar — soft lift. |
| level3 | `0 16px 40px -16px rgba(15,23,42,0.18)` | Cover story card — clear lift. |
| level4 | `0 32px 80px -24px rgba(15,23,42,0.28)` | Modal — overlays the layout, with scrim. |

### Content

- **measure:** `60ch` (max line length for body prose)
- **paragraph spacing:** `1.5em`
- **list indent:** `1.75em`
- **list gap:** `0.55em`
- **link:** color `#1a1612`, underline `always`
- **blockquote:** border `4px solid #1a1612`, padding `0.4em 0 0.4em 1.5em`
- **code:** background `rgba(26, 22, 18, 0.06)`, color `#1a1612`

### Accessibility (WCAG 2.1)

**Overall:** AA-Large

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 15.55:1 | AA | AAA | — |
| Body text on canvas | 14.46:1 | AA | AAA | — |
| Muted text on surface | 4.11:1 | AA | AA-Large | `#6e685f` → 4.77:1 (AA) |
| Accent on surface | 15.55:1 | AA-Large | AAA | — |
| Accent on canvas | 14.46:1 | AA-Large | AAA | — |