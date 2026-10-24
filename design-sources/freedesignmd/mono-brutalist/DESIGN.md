---
name: "Mono Brutalist"
description: "Pure black on white. Hard borders, monospace everywhere, zero compromise."
tags: [brutalist, minimal, dark]
colors:
  primary:   "#000000"
  secondary: "#555555"
  tertiary:  "#000000"
  neutral:   "#FFFFFF"
  surface:   "#FFFFFF"
typography:
  display: "JetBrains Mono"
  body:    "JetBrains Mono"
  mono:    "JetBrains Mono"
radius:
  sm: 0px
  md: 0px
  lg: 0px
buttons:
  primary:
    background: #000000
    color: #FFFFFF
    border: 2px solid #000000
    shape: sharp
    padding: 12px 24px
    font: mono / 700 / 0.08em
    uppercase: true
  secondary:
    background: #FFFFFF
    color: #000000
    border: 2px solid #000000
    shape: sharp
    padding: 12px 24px
    font: mono / 700 / 0.08em
    uppercase: true
  outline:
    background: transparent
    color: #000000
    border: 2px dashed #000000
    shape: sharp
    padding: 12px 24px
    font: mono / 700 / 0.08em
    uppercase: true
  ghost:
    background: transparent
    color: #000000
    border: none
    shape: sharp
    padding: 10px 0
    font: mono / 700 / 0.08em
    uppercase: true
    hover: underline
charts:
  variant: flat
  bar_gap: 2px
  highlight: all
fonts_url: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap"
dependencies: ["lucide-react"]
---

# Mono Brutalist

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Mono Brutalist** as its
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

- **Primary** — sharp shape, bg `#000000`, text `#FFFFFF`, border `2px solid #000000`, padding `12px 24px`, weight `700`, uppercased.
- **Secondary** — sharp shape, bg `#FFFFFF`, text `#000000`, border `2px solid #000000`, padding `12px 24px`, weight `700`, uppercased.
- **Outline** — sharp shape, text `#000000`, border `2px dashed #000000`, padding `12px 24px`, weight `700`, uppercased.
- **Ghost** — sharp shape, text `#000000`, padding `10px 0`, weight `700`, uppercased.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#FFFFFF`
- Radius: `radius.lg` (`0px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

#### Tabs

Variant: `brutalist`. Hard rectangular tabs with thick borders. Active tab is fully filled in the primary color.
Tabs are uppercased with `0.1em` tracking.

#### Charts

- Bar/line variant: `flat`
- Highlight strategy: `all` — emphasize a single bar/point per chart.

#### Typography pairings

- **Display (`JetBrains Mono`)** — h1, h2, hero headlines, brand wordmarks.
- **Body (`JetBrains Mono`)** — paragraphs, labels, button text, form inputs.
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

## Overview
Raw, uncompromising, system-font monospace. No color, no curves, no shadow. Structure and typography do all the work.

## Colors
- **Primary #000000** — pure black. Borders, text, fills.
- **Secondary #555555** — only for de-emphasized meta.
- **Neutral / Surface #FFFFFF** — pure white.

## Typography
**JetBrains Mono** at every level. Use weight (400/500/700/800) and uppercase for hierarchy.

## Spacing
8px grid. Sections 80px. Tight, deliberate.

## Components
Hard 2px black borders. Zero border-radius. Zero shadows. Buttons uppercase.

## Icons
`lucide-react` with stroke width 2. Always black.

## Do's and Don'ts
- ✅ Use uppercase for buttons and labels.
- ✅ Keep borders crisp at 2px.
- ❌ No rounded corners, anywhere.
- ❌ No grays except #555 for meta.

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#000000` |
| secondary | `#555555` |
| tertiary  | `#000000` |
| neutral   | `#FFFFFF` |
| surface   | `#FFFFFF` |

### Typography

- **Display:** JetBrains Mono
- **Body:** JetBrains Mono
- **Mono:** JetBrains Mono

### Radius

- sm: `0px`
- md: `0px`
- lg: `0px`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `#000000` |
| color | `#FFFFFF` |
| border | `2px solid #000000` |
| padding | `12px 24px` |
| fontFamily | `mono` |
| fontWeight | `700` |
| tracking | `0.08em` |
| uppercase | `true` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `#FFFFFF` |
| color | `#000000` |
| border | `2px solid #000000` |
| padding | `12px 24px` |
| fontFamily | `mono` |
| fontWeight | `700` |
| tracking | `0.08em` |
| uppercase | `true` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#000000` |
| border | `2px dashed #000000` |
| padding | `12px 24px` |
| fontFamily | `mono` |
| fontWeight | `700` |
| tracking | `0.08em` |
| uppercase | `true` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#000000` |
| border | `none` |
| padding | `10px 0` |
| fontFamily | `mono` |
| fontWeight | `700` |
| tracking | `0.08em` |
| uppercase | `true` |
| hoverHint | `underline` |

### Charts

| Property | Value |
|----------|-------|
| variant | `flat` |
| barGap | `2px` |
| highlight | `all` |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — shadow: `4px 4px 0 0 #000000`, transform: `translate(-2px, -2px)`
- **focus** — outline: `2px solid #000000`, outline-offset: `3px`
- **active** — shadow: `none`, transform: `translate(0, 0)`
- **disabled** — opacity: `0.4`, filter: `grayscale(0.4)`
- **loading** — opacity: `0.6`
- **selected** — bg: `#000000`, color: `#FFFFFF`

#### Input

- **hover** — border: `2px solid #000000`
- **focus** — border: `2px solid #000000`, shadow: `4px 4px 0 0 #000000`
- **disabled** — bg: `rgba(0, 0, 0, 0.05)`, opacity: `0.4`
- **error** — border: `2px solid #B91C1C`, shadow: `4px 4px 0 0 #B91C1C`

#### Card

- **hover** — shadow: `6px 6px 0 0 #000000`, transform: `translate(-3px, -3px)`
- **selected** — border: `3px solid #000000`
- **dragging** — shadow: `8px 8px 0 0 #000000`, transform: `rotate(-1deg) scale(1.02)`

#### Tab

- **hover** — bg: `rgba(0, 0, 0, 0.08)`
- **focus** — outline: `2px solid #000000`, outline-offset: `2px`
- **selected** — bg: `#000000`, color: `#FFFFFF`

### Density

| Mode | padding × | row × | body | radius × | Use for |
|------|-----------|-------|------|----------|---------|
| compact | 0.72 | 0.78 | 0.8125rem | 0.85 | Information-dense — tables, IDEs, dashboards |
| comfortable | 1 | 1 | 0.9375rem | — | Default — most product UI |
| spacious | 1.35 | 1.3 | 1rem | 1.15 | Editorial — marketing, long-form, settings |

### Motion

**Signature — Hard cut.** No animation. Transitions are cuts — the state switches, the eye follows. Brutalism means no softening.

```css
transition: none;
```

| Token | Value |
|-------|-------|
| duration.instant | `0ms` |
| duration.fast | `50ms` |
| duration.base | `100ms` |
| duration.slow | `150ms` |
| easing.standard | `linear` |
| easing.decelerate | `linear` |
| easing.accelerate | `linear` |
| easing.spring | `steps(3, end)` |

### Elevation

Five-level scale, system-specific recipe.

| Level | Shadow | Recipe |
|-------|--------|--------|
| level0 | `none` | Flat — the border carries the separation. |
| level1 | `2px 2px 0 0 #000000` | Hard offset 2/2, no blur. |
| level2 | `4px 4px 0 0 #000000` | Hard offset 4/4 — cards. |
| level3 | `6px 6px 0 0 #000000` | Hard offset 6/6 — dialogs. |
| level4 | `8px 8px 0 0 #000000` | Hard offset 8/8 — modals, thicker border. |

### Content

- **measure:** `64ch` (max line length for body prose)
- **paragraph spacing:** `1.2em`
- **list indent:** `1.5em`
- **list gap:** `0.5em`
- **link:** color `#000000`, underline `always`
- **blockquote:** border `4px solid #000000`, padding `0.8em 1em`
- **code:** background `#000000`, color `#FFFFFF`

### Accessibility (WCAG 2.1)

**Overall:** AAA

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 21:1 | AA | AAA | — |
| Body text on canvas | 21:1 | AA | AAA | — |
| Muted text on surface | 7.46:1 | AA | AAA | — |
| Accent on surface | 21:1 | AA-Large | AAA | — |
| Accent on canvas | 21:1 | AA-Large | AAA | — |
