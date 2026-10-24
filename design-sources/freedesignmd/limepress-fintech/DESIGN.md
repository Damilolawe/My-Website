---
name: "Limepress Fintech"
description: "Lime-bright fintech with weight-900 display at 0.85 line-height — billboard-density typography, dark-green-on-lime pill CTAs, ring-shadow depth."
tags: [fintech, bold, warm, playful]
colors:
  primary:   "#0e0f0c"
  secondary: "#454745"
  tertiary:  "#9fe870"
  neutral:   "#e8ebe6"
  surface:   "#ffffff"
typography:
  display: "Archivo Black"
  body:    Inter
  mono:    "JetBrains Mono"
  scale:
    hero: "5.5rem / 0.85 / 900 / 0"
    h1:   "4rem / 0.85 / 900 / 0"
    h2:   "2.5rem / 0.85 / 900 / 0"
    body: "1.125rem / 1.44 / 600 / 0.18px"
radius:
  sm: 10px
  md: 16px
  lg: 30px
  pill: 9999px
shadows:
  card:   "rgba(14,15,12,0.12) 0 0 0 1px"
borders:
  card:    "1px solid rgba(14,15,12,0.12)"
  divider: rgba(14,15,12,0.12)
buttons:
  primary:
    background: #9fe870
    color: #163300
    border: none
    shape: pill
    padding: 12px 24px
    font: 600
    hover: scale
  secondary:
    background: rgba(22,51,0,0.08)
    color: #0e0f0c
    border: none
    shape: pill
    padding: 10px 20px
    font: 600
    hover: scale
  outline:
    background: #ffffff
    color: #0e0f0c
    border: none
    shape: pill
    padding: 10px 20px
    font: 600
    shadow: rgba(14,15,12,0.12) 0 0 0 1px
    hover: scale
  ghost:
    background: rgba(211,242,192,0.4)
    color: #0e0f0c
    border: none
    shape: pill
    padding: 10px 16px
    font: 600
charts:
  variant: bars
  stroke_width: 3
  fill_opacity: 0.2
  gridlines: false
  bar_radius: "6px 6px 0 0"
  bar_gap: 12px
  highlight: single
  dot_marker: false
fonts_url: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap"
dependencies: ["lucide-react"]
---

# Limepress Fintech

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Limepress Fintech** as its
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

- **Primary** — pill shape, bg `#9fe870`, text `#163300`, padding `12px 24px`, weight `600`.
- **Secondary** — pill shape, bg `rgba(22,51,0,0.08)`, text `#0e0f0c`, padding `10px 20px`, weight `600`.
- **Outline** — pill shape, bg `#ffffff`, text `#0e0f0c`, padding `10px 20px`, weight `600`, shadow `rgba(14,15,12,0.12) 0 0 0 1px`.
- **Ghost** — pill shape, bg `rgba(211,242,192,0.4)`, text `#0e0f0c`, padding `10px 16px`, weight `600`.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#ffffff`
- Border: `1px solid rgba(14,15,12,0.12)`
- Shadow: `rgba(14,15,12,0.12) 0 0 0 1px`
- Radius: `radius.lg` (`30px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

#### Charts

- Bar/line variant: `bars`
- Bar radius: `6px 6px 0 0`
- No gridlines — let the bars/lines carry the data.
- Highlight strategy: `single` — emphasize a single bar/point per chart.

#### Typography pairings

- **Display (`Archivo Black`)** — h1, h2, hero headlines, brand wordmarks.
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

Limepress Fintech is the visual translation of "money without borders" — a bold, confident fintech surface that throws out corporate-blue convention in favor of a single, electric **lime-green** (`#9fe870`) accent paired with warm near-black (`#0e0f0c`). The page is a calm warm white, but the typography turns up the volume: display headlines run at weight **900** with a remarkable **0.85 line-height**, so the letters nearly stack on top of each other. The result reads like a protest sign — urgent, physical, impossible to ignore.

The accent strategy is disciplined: lime green is reserved for primary CTAs, with **dark forest green** (`#163300`) as the contrasting button text. This nature-pairing feels alive and optimistic, completely unlike the saturated blues of legacy banking. Hover behavior is physical, not chromatic — buttons grow with `scale(1.05)` and compress to `scale(0.95)` on press. The button literally responds to your cursor like a tactile object.

The body voice is Inter at weight **600** by default — confident, never light. Combined with OpenType `"calt"` (contextual alternates) on every text element, the whole system reads as one continuous, deliberate voice.

**Signature moves**
- Display weight 900 at 0.85 line-height — the densest type stack in the catalog
- Lime Green (`#9fe870`) on `#163300` — nature-inspired CTA combo
- Inter weight 600 as body default — never 400
- Scale(1.05) on hover, scale(0.95) on active — physical button motion
- OpenType `"calt"` enabled globally
- Pill buttons (9999px) and big rounded cards (30–40px)
- **Ring shadow** (`0 0 0 1px`) as the entire elevation system — no soft blur

## 2. Palette

### Primary
- **Near Black** `#0e0f0c` — text, dark sections (warm green undertone)
- **Limepress Green** `#9fe870` — primary CTA, brand identity
- **Dark Green** `#163300` — button label on green
- **Light Mint** `#e2f6d5` — soft surface, badge
- **Pastel Green** `#cdffad` — interactive hover accent

### Semantic
- Positive `#054d28` · Danger `#d03238` · Warning `#ffd11a`
- Background Cyan `rgba(56,200,255,0.10)` · Bright Orange `#ffc091`

### Neutral
- Warm Dark `#454745` · Gray `#868685` · Light Surface `#e8ebe6`

## 3. Typography

| Role | Font | Size | Weight | Leading | Tracking |
|------|------|------|--------|---------|----------|
| Display Mega | Display | 126px | 900 | 0.85 | 0 |
| Display Hero | Display | 96px | 900 | 0.85 | 0 |
| Section | Display | 64px | 900 | 0.85 | 0 |
| Sub-heading | Display | 40px | 900 | 0.85 | 0 |
| Card title | Body | 26px | 600 | 1.23 | -0.39px |
| Feature | Body | 22px | 600 | 1.25 | -0.4px |
| Body | Body | 18px | 400 | 1.44 | +0.18px |
| Body Semibold | Body | 18px | 600 | 1.44 | -0.108px |
| Button | Body | 18–22px | 600 | 1.00–1.44 | -0.108px |
| Caption | Body | 14px | 400–600 | 1.50–1.86 | -0.084 to -0.108px |

**Weight 900 is the identity.** Letters overlap vertically. Body weight is 600 (not 400) — confidence reads in every paragraph.

## 4. Buttons

### Primary Pill
```css
background: #9fe870;
color: #163300;
padding: 12px 24px;
border-radius: 9999px;
```
Hover: `scale(1.05)`. Active: `scale(0.95)`.

### Secondary Pill
- Background `rgba(22,51,0,0.08)`, text `#0e0f0c`
- 9999px radius, same scale animation

## 5. Cards
- Background `#ffffff`
- Radius: 16/30/40px
- Border: `1px solid rgba(14,15,12,0.12)` or `1px solid #9fe870`
- Shadow: `rgba(14,15,12,0.12) 0 0 0 1px` ring

## 6. Charts
**Chunky lime bars with single-bar highlight, no gridlines** — flat, billboard-style. Line charts at 3px stroke with 20% lime fill: a confident, hand-drawn feel rather than a data-grid.

## 7. Spacing
- Base: 8px
- Scale: `1, 2, 3, 4, 5, 8, 10, 11, 12, 16, 18, 19, 20, 22, 24`

## 8. Depth & elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 | Flat | Default |
| 1 | `rgba(14,15,12,0.12) 0 0 0 1px` | Card border |
| 2 | `rgb(134,134,133) 0 0 0 1px inset` | Input focus |

**Ring shadow is the entire shadow system.** No blur shadows anywhere.

## 9. Do's & don'ts

✅ **Do**
- Use weight 900 on display — the extreme weight IS the brand
- Hold display line-height at 0.85 — never relax it
- Lime CTAs only — `#9fe870` background, `#163300` text
- Apply scale(1.05) hover and scale(0.95) active
- Use Inter weight 600 as body default

❌ **Don't**
- Use lighter weights for display — only 900
- Use lime as a large background — CTAs and small accents only
- Skip the scale animation on buttons
- Use blur shadows — ring shadows only

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#0e0f0c` |
| secondary | `#454745` |
| tertiary  | `#9fe870` |
| neutral   | `#e8ebe6` |
| surface   | `#ffffff` |

### Typography

- **Display:** Archivo Black
- **Body:** Inter
- **Mono:** JetBrains Mono

| Role | size / leading / weight / tracking |
|------|------------------------------------|
| Hero | 5.5rem / 0.85 / 900 / 0 |
| H1   | 4rem / 0.85 / 900 / 0 |
| H2   | 2.5rem / 0.85 / 900 / 0 |
| Body | 1.125rem / 1.44 / 600 / 0.18px |

### Radius

- sm: `10px`
- md: `16px`
- lg: `30px`
- pill: `9999px`

### Shadows

- **card:** `rgba(14,15,12,0.12) 0 0 0 1px`

### Borders

- **card:** `1px solid rgba(14,15,12,0.12)`
- **divider:** `rgba(14,15,12,0.12)`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `#9fe870` |
| color | `#163300` |
| border | `none` |
| padding | `12px 24px` |
| fontWeight | `600` |
| hoverHint | `scale` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `rgba(22,51,0,0.08)` |
| color | `#0e0f0c` |
| border | `none` |
| padding | `10px 20px` |
| fontWeight | `600` |
| hoverHint | `scale` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `#ffffff` |
| color | `#0e0f0c` |
| border | `none` |
| padding | `10px 20px` |
| fontWeight | `600` |
| shadow | `rgba(14,15,12,0.12) 0 0 0 1px` |
| hoverHint | `scale` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `rgba(211,242,192,0.4)` |
| color | `#0e0f0c` |
| border | `none` |
| padding | `10px 16px` |
| fontWeight | `600` |

### Charts

| Property | Value |
|----------|-------|
| variant | `bars` |
| strokeWidth | `3` |
| fillOpacity | `0.2` |
| gridlines | `false` |
| barRadius | `6px 6px 0 0` |
| barGap | `12px` |
| highlight | `single` |
| dotMarker | `false` |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — bg: `rgba(159, 232, 112, 0.92)`, shadow: `0 4px 20px -8px rgba(159, 232, 112, 0.4)`
- **focus** — outline: `1.5px solid #9fe870`, outline-offset: `4px`
- **active** — transform: `translateY(1px)`, filter: `brightness(0.95)`
- **disabled** — opacity: `0.45`
- **loading** — opacity: `0.7`
- **selected** — bg: `#0e0f0c`, color: `#ffffff`

#### Input

- **hover** — border: `1px solid #0e0f0c`
- **focus** — border: `1px solid #9fe870`, shadow: `0 1px 0 0 #9fe870`
- **disabled** — opacity: `0.45`
- **error** — border: `1px solid #991B1B`, shadow: `0 1px 0 0 #991B1B`

#### Card

- **hover** — shadow: `0 8px 24px -12px rgba(15,23,42,0.14)`, transform: `translateY(-1px)`
- **selected** — border: `1px solid #0e0f0c`

#### Tab

- **hover** — color: `#0e0f0c`
- **focus** — outline: `1.5px solid #9fe870`, outline-offset: `3px`
- **selected** — color: `#9fe870`, border: `0 0 2px 0 solid #9fe870`

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
- **link:** color `#9fe870`, underline `always`
- **blockquote:** border `4px solid #9fe870`, padding `0.4em 0 0.4em 1.5em`
- **code:** background `rgba(14, 15, 12, 0.06)`, color `#0e0f0c`

### Accessibility (WCAG 2.1)

**Overall:** FAIL

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 19.23:1 | AA | AAA | — |
| Body text on canvas | 15.98:1 | AA | AAA | — |
| Muted text on surface | 9.37:1 | AA | AAA | — |
| Accent on surface | 1.47:1 | AA-Large | FAIL | `#3f8115` → 4.81:1 (AA) |
| Accent on canvas | 1.22:1 | AA-Large | FAIL | `#377012` → 5:1 (AA) |