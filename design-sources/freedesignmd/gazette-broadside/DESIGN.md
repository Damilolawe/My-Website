---
name: "Gazette Broadside"
description: "A maximalist editorial broadside that earns every inch with prose. Sage-grey paper surface, Old Standard TT at extreme display scale for headlines, drop-caps that span eight body lines, full-bleed pull-quote slabs in oversized serif italic, Inter for navigation, a single muted burgundy accent reserved for the editor's mark and the issue-number tag. Built for long-form magazines, opinion sections, and editorial publishers who lead with words at oversized scale."
tags: [editorial, premium, warm, serif, bold]
colors:
  primary:   "#1d1f1c"
  secondary: "#6b6e64"
  tertiary:  "#1d1f1c"
  neutral:   "#dadbcd"
  surface:   "#e6e7d8"
typography:
  display: "Old Standard TT"
  body:    "Old Standard TT"
  mono:    "JetBrains Mono"
  scale:
    hero: "12rem / 0.86 / 700 / -0.04em"
    h1:   "5.5rem / 0.96 / 700 / -0.025em"
    h2:   "2.25rem / 1.18 / 400 / -0.012em"
    body: "1.1875rem / 1.7 / 400 / -0.003em"
radius:
  sm: 1px
  md: 2px
  lg: 3px
  pill: 9999px
shadows:
  card:   none
  button: none
borders:
  card:    "1px solid rgba(29,31,28,0.16)"
  divider: rgba(29,31,28,0.20)
buttons:
  primary:
    background: #1d1f1c
    color: #e6e7d8
    border: none
    shape: sharp
    padding: 12px 24px
    font: 500 / 0.8125rem / 0.18em
    uppercase: true
  secondary:
    background: transparent
    color: #1d1f1c
    border: 1px solid #1d1f1c
    shape: sharp
    padding: 12px 24px
    font: 500 / 0.8125rem / 0.18em
    uppercase: true
  outline:
    background: transparent
    color: #1d1f1c
    border: 1px solid rgba(29,31,28,0.20)
    shape: sharp
    padding: 12px 24px
    font: 500 / 0.8125rem / 0.18em
    uppercase: true
  ghost:
    background: transparent
    color: #6b6e64
    border: none
    shape: sharp
    padding: 12px 18px
    font: 500 / 0.8125rem / 0.18em
    uppercase: true
charts:
  variant: "thin-bars"
  stroke_width: 1
  fill_opacity: 0
  gridlines: false
  bar_gap: 14px
  highlight: single
  dot_marker: false
fonts_url: "https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
dependencies: ["lucide-react"]
---

# Gazette Broadside

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Gazette Broadside** as its
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

- **Primary** — sharp shape, bg `#1d1f1c`, text `#e6e7d8`, padding `12px 24px`, weight `500`, uppercased.
- **Secondary** — sharp shape, text `#1d1f1c`, border `1px solid #1d1f1c`, padding `12px 24px`, weight `500`, uppercased.
- **Outline** — sharp shape, text `#1d1f1c`, border `1px solid rgba(29,31,28,0.20)`, padding `12px 24px`, weight `500`, uppercased.
- **Ghost** — sharp shape, text `#6b6e64`, padding `12px 18px`, weight `500`, uppercased.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#e6e7d8`
- Border: `1px solid rgba(29,31,28,0.16)`
- Shadow: `none`
- Radius: `radius.lg` (`3px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

#### Tabs

Variant: `underline`. Flat row of labels. Active tab gets a 2px underline in the accent color — no fill.

#### Charts

- Bar/line variant: `thin-bars`
- No gridlines — let the bars/lines carry the data.
- Highlight strategy: `single` — emphasize a single bar/point per chart.

#### Typography pairings

- **Display (`Old Standard TT`)** — h1, h2, hero headlines, brand wordmarks.
- **Body (`Old Standard TT`)** — paragraphs, labels, button text, form inputs.
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

Gazette Broadside is a maximalist editorial broadside that earns every inch with prose. The page surface is sage-grey `#e6e7d8` — a cool olive-paper tone that reads as a printed weekly review, never bright. Headlines run in Old Standard TT 700 at 192px with a 0.86 leading — the classical bold serif at full-bleed scale, taking up the entire above-the-fold. The first paragraph of every article opens with a drop-cap that spans eight body lines: Old Standard TT 400 at 13rem, slight negative left margin so it visually overhangs the column. Pull quotes are full-bleed slabs: Old Standard TT italic 400 at 64px on a 1.18 leading, surrounded by 96px of vertical space, indented from a single 1px ink rule on the left. Body sits in Old Standard TT regular at 19px on a 1.7 leading. Navigation runs in Inter 500 with 0.18em uppercase tracking — the only sans in the entire system. The single accent is muted burgundy `#6e2530` reserved for the editor's mark and the issue-number tag.

The discipline is in the maximalism: every page is dense with type, but the type does the entire job. There are no images, no cards, no decoration — just headlines at 192px, drop-caps at 208px, pull-quote slabs at 64px italic, and 19px body that runs for full columns.

**Signature moves**
- Old Standard TT 700 at 192px headlines — classical bold serif at full-bleed scale
- Drop-caps spanning 8 body lines (208px), Old Standard TT 400, slight negative left margin
- Full-bleed pull-quote slabs — italic 64px with 96px breathing room and a 1px left rule
- 19px body in Old Standard TT regular on 1.7 leading — long-form serious reading
- Sage-grey paper `#e6e7d8` — cool olive printed-weekly tone, never warm cream
- Burgundy `#6e2530` exclusively on editor's mark + issue-number tag — two surfaces only
- Inter (500, 0.18em uppercase) is the only sans — used for nav and page-number rails

## 2. Palette

### Surfaces
- **Sage Paper** `#e6e7d8` — page background (cool olive printed-weekly)
- **Sage Lift** `#dadbcd` — masthead, footer, table headers
- **Hairline** `rgba(29,31,28,0.16)` — every divider, every rule

### Ink
- **Ink** `#1d1f1c` — text, headings, primary CTA fill (warm near-black)
- **Ink 50** `#6b6e64` — secondary text, mono captions, byline

### Accent
- **Burgundy** `#6e2530` — editor's mark, issue-number tag
- That is the only color in the system.

## 3. Typography

| Role | Font | Size | Weight | Leading | Tracking |
|------|------|------|--------|---------|----------|
| Hero Headline | Old Standard TT | 192px | 700 | 0.86 | -0.04em |
| H1 | Old Standard TT | 88px | 700 | 0.96 | -0.025em |
| H2 / Subhead | Old Standard TT | 36px | 400 | 1.18 | -0.012em |
| Drop-Cap | Old Standard TT | 208px | 400 | 0.85 | -0.04em |
| Pull Quote | Old Standard TT (italic) | 64px | 400 | 1.18 | -0.012em |
| Body | Old Standard TT | 19px | 400 | 1.7 | -0.003em |
| Lead Paragraph | Old Standard TT | 22px | 400 | 1.6 | -0.005em |
| Byline / Caption | Inter | 12px | 500 | 1.4 | 0.10em uppercase |
| Nav / Section Label | Inter | 13px | 500 | 1.4 | 0.18em uppercase |
| Page Number | JetBrains Mono | 11px | 500 | 1.0 | 0.10em uppercase |
| Issue Number | JetBrains Mono | 13px | 500 | 1.0 | 0.04em tabular-nums |

Old Standard TT carries display, drop-caps, pull-quotes, and body — the entire editorial voice in one classical serif. Inter carries only the navigation rail and bylines. Mono carries only page numbers and the issue tag.

## 4. Buttons

### Primary (Ink Sharp)
```css
background: #1d1f1c;
color: #e6e7d8;
padding: 12px 24px;
border-radius: 2px;
text-transform: uppercase;
letter-spacing: 0.18em;
font-weight: 500;
```

The 0.18em tracking is the engraved-masthead voice carried into the subscribe button.

### Secondary (Ink Outline)
- Transparent, 1px solid ink, ink text — same near-sharp shape, same wide tracking

### Outline & Ghost
- Outline: transparent, 1px hairline at 20% ink
- Ghost: no border, ink-50 uppercase

## 5. Cards (rare)

The system prefers full-bleed columns separated by 1px hairlines and generous vertical breathing room. When a card is needed (a back-issue tile, a contributor card), it is sharp 2px corners, 1px hairline at 16% ink — never lifted, never shadowed.

## 6. Charts

Thin precise bars (3px wide, 14px gap). One bar in burgundy, others in 22% ink. NO gridlines. Y-axis labels in JetBrains Mono uppercase 11px. Charts are reserved for editorial data exhibits and read as broadside graphics.

## 7. Tabs

Underline 1.5px in burgundy for the active state. Inactive tabs are ink-50 in Inter 500 uppercase 0.18em. The active label often switches to Old Standard TT italic at the same size — the rhythm change.

## 8. Spacing

- Base 8px (text-baseline aware)
- Scale: `8, 16, 24, 32, 48, 64, 96, 128, 200, 280`
- Section padding: 200px desktop, 96px mobile — full editorial breathing room
- Pull-quote padding: 96px above and below
- Drop-cap negative left margin: -16px

## 9. Do's & don'ts

✅ **Do**
- Use Old Standard TT 700 at 192px for the hero headline — the classical bold at full-bleed
- Open every article with a drop-cap spanning 8 body lines (208px) with a slight negative left margin
- Use full-bleed pull-quote slabs — Old Standard TT italic 64px with 96px breathing room
- Use 19px body — long-form serious reading is the entire premise
- Reserve burgundy for editor's mark + issue-number tag exclusively

❌ **Don't**
- Add images or photography to the broadside — the typography earns the entire page
- Use Old Standard TT for nav or UI labels — Inter at 0.18em uppercase is the only sans
- Use a second accent — burgundy alone, on two surfaces
- Round any corner beyond 3px — letterpress precision throughout
- Use 16px body — 19px on 1.7 leading is the editorial-broadside readability minimum

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#1d1f1c` |
| secondary | `#6b6e64` |
| tertiary  | `#1d1f1c` |
| neutral   | `#dadbcd` |
| surface   | `#e6e7d8` |

### Typography

- **Display:** Old Standard TT
- **Body:** Old Standard TT
- **Mono:** JetBrains Mono

| Role | size / leading / weight / tracking |
|------|------------------------------------|
| Hero | 12rem / 0.86 / 700 / -0.04em |
| H1   | 5.5rem / 0.96 / 700 / -0.025em |
| H2   | 2.25rem / 1.18 / 400 / -0.012em |
| Body | 1.1875rem / 1.7 / 400 / -0.003em |

### Radius

- sm: `1px`
- md: `2px`
- lg: `3px`
- pill: `9999px`

### Shadows

- **card:** `none`
- **button:** `none`

### Borders

- **card:** `1px solid rgba(29,31,28,0.16)`
- **divider:** `rgba(29,31,28,0.20)`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `#1d1f1c` |
| color | `#e6e7d8` |
| border | `none` |
| padding | `12px 24px` |
| fontWeight | `500` |
| fontSize | `0.8125rem` |
| tracking | `0.18em` |
| uppercase | `true` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#1d1f1c` |
| border | `1px solid #1d1f1c` |
| padding | `12px 24px` |
| fontWeight | `500` |
| fontSize | `0.8125rem` |
| tracking | `0.18em` |
| uppercase | `true` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#1d1f1c` |
| border | `1px solid rgba(29,31,28,0.20)` |
| padding | `12px 24px` |
| fontWeight | `500` |
| fontSize | `0.8125rem` |
| tracking | `0.18em` |
| uppercase | `true` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#6b6e64` |
| border | `none` |
| padding | `12px 18px` |
| fontWeight | `500` |
| fontSize | `0.8125rem` |
| tracking | `0.18em` |
| uppercase | `true` |

### Charts

| Property | Value |
|----------|-------|
| variant | `thin-bars` |
| strokeWidth | `1` |
| fillOpacity | `0` |
| gridlines | `false` |
| barGap | `14px` |
| highlight | `single` |
| dotMarker | `false` |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — bg: `rgba(29, 31, 28, 0.15)`, color: `#1d1f1c`, border: `1px solid #1d1f1c`
- **focus** — outline: `1px dashed #1d1f1c`, outline-offset: `2px`
- **active** — bg: `#1d1f1c`, color: `#e6e7d8`
- **disabled** — opacity: `0.35`
- **loading** — opacity: `0.6`
- **selected** — bg: `#1d1f1c`, color: `#e6e7d8`

#### Input

- **hover** — border: `1px solid rgba(29, 31, 28, 0.5)`
- **focus** — bg: `rgba(29, 31, 28, 0.05)`, border: `1px solid #1d1f1c`
- **disabled** — opacity: `0.35`
- **error** — bg: `rgba(239,68,68,0.05)`, border: `1px solid #EF4444`

#### Card

- **hover** — border: `1px solid #1d1f1c`
- **selected** — bg: `rgba(29, 31, 28, 0.05)`, border: `1px solid #1d1f1c`
- **dragging** — opacity: `0.7`

#### Tab

- **hover** — color: `#1d1f1c`
- **focus** — outline: `1px dashed #1d1f1c`, outline-offset: `1px`
- **selected** — bg: `rgba(29, 31, 28, 0.1)`, color: `#1d1f1c`

### Density

| Mode | padding × | row × | body | radius × | Use for |
|------|-----------|-------|------|----------|---------|
| compact | 0.72 | 0.78 | 0.8125rem | 0.85 | Information-dense — tables, IDEs, dashboards |
| comfortable | 1 | 1 | 0.9375rem | — | Default — most product UI |
| spacious | 1.35 | 1.3 | 1rem | 1.15 | Editorial — marketing, long-form, settings |

### Motion

**Signature — Cursor blink.** Discrete, often stepped transitions. Like a terminal cursor: on or off. Response under 120 ms.

```css
transition: all 120ms linear;
```

| Token | Value |
|-------|-------|
| duration.instant | `0ms` |
| duration.fast | `60ms` |
| duration.base | `120ms` |
| duration.slow | `200ms` |
| easing.standard | `linear` |
| easing.decelerate | `linear` |
| easing.accelerate | `linear` |
| easing.spring | `steps(2, end)` |

### Elevation

Five-level scale, system-specific recipe.

| Level | Shadow | Recipe |
|-------|--------|--------|
| level0 | `none` | Flat — the stroke carries the hierarchy. |
| level1 | `none` | Border tone lifts the surface. |
| level2 | `0 0 0 1px rgba(29, 31, 28, 0.5)` | Ring outline — popover. |
| level3 | `0 0 0 1px #1d1f1c, 0 12px 32px -16px rgba(29, 31, 28, 0.4)` | Sheet with accent ring + glow. |
| level4 | `0 0 0 1px #1d1f1c, 0 24px 64px -20px rgba(29, 31, 28, 0.5)` | Modal with accent ring + glow. |

### Content

- **measure:** `78ch` (max line length for body prose)
- **paragraph spacing:** `1em`
- **list indent:** `1.25em`
- **list gap:** `0.35em`
- **link:** color `#1d1f1c`, underline `always`
- **blockquote:** border `1px solid rgba(29, 31, 28, 0.5)`, padding `0.7em 1em`
- **code:** background `rgba(29, 31, 28, 0.12)`, color `#1d1f1c`

### Accessibility (WCAG 2.1)

**Overall:** AA-Large

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 13.27:1 | AA | AAA | — |
| Body text on canvas | 11.85:1 | AA | AAA | — |
| Muted text on surface | 4.16:1 | AA | AA-Large | `#61635a` → 4.88:1 (AA) |
| Accent on surface | 13.27:1 | AA-Large | AAA | — |
| Accent on canvas | 11.85:1 | AA-Large | AAA | — |
