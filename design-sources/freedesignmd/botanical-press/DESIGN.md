---
name: "Botanical Press"
description: "Pressed-herbarium editorial — deep forest ink and oxidized terracotta on bone paper. Italic Cormorant display, generous leading, hairline rules, and a single warm spot color used like a botanist's annotation stamp."
tags: [editorial, natural, warm, serif]
colors:
  primary:   "#1F2A1E"
  secondary: "#7A8472"
  tertiary:  "#B7553A"
  neutral:   "#F2EDE0"
  surface:   "#F8F4E9"
typography:
  display: "Cormorant Garamond"
  body:    Lora
  mono:    "IBM Plex Mono"
  scale:
    hero: "5.25rem / 1 / 400 / -0.025em"
    h1:   "3rem / 1.05 / 400 / -0.02em"
    h2:   "1.5rem / 1.3 / 500 / 0"
    body: "1.0625rem / 1.7 / 400 / 0"
radius:
  sm: 2px
  md: 3px
  lg: 4px
shadows:
  card:   "0 1px 0 rgba(31, 42, 30, 0.06)"
  button: none
borders:
  card:    "1px solid rgba(31, 42, 30, 0.16)"
  divider: "rgba(31, 42, 30, 0.10)"
buttons:
  primary:
    background: #1F2A1E
    color: #F2EDE0
    border: 1px solid #1F2A1E
    shape: rounded
    padding: 13px 24px
    font: display / 500 / 1rem / 0.01em
  secondary:
    background: #F8F4E9
    color: #1F2A1E
    border: 1px solid #1F2A1E
    shape: rounded
    padding: 13px 24px
    font: display / 500 / 1rem / 0.01em
  outline:
    background: transparent
    color: #B7553A
    border: 1px solid #B7553A
    shape: rounded
    padding: 12px 22px
    font: display / 500 / 0.9375rem / 0.02em
    uppercase: true
  ghost:
    background: transparent
    color: #B7553A
    border: none
    shape: rounded
    padding: 10px 4px
    font: display / 500 / 1rem / 0.01em
    hover: underline
charts:
  variant: line
  stroke_width: 1.5
  gridlines: false
  highlight: last
  dot_marker: true
  axis_color: "#7A8472"
  palette: ["#B7553A", "#1F2A1E", "#7A8472"]
fonts_url: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Lora:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
dependencies: ["lucide-react"]
---

# Botanical Press

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Botanical Press** as its
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

- **Primary** — rounded shape, bg `#1F2A1E`, text `#F2EDE0`, border `1px solid #1F2A1E`, padding `13px 24px`, weight `500`.
- **Secondary** — rounded shape, bg `#F8F4E9`, text `#1F2A1E`, border `1px solid #1F2A1E`, padding `13px 24px`, weight `500`.
- **Outline** — rounded shape, text `#B7553A`, border `1px solid #B7553A`, padding `12px 22px`, weight `500`, uppercased.
- **Ghost** — rounded shape, text `#B7553A`, padding `10px 4px`, weight `500`.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#F8F4E9`
- Border: `1px solid rgba(31, 42, 30, 0.16)`
- Shadow: `0 1px 0 rgba(31, 42, 30, 0.06)`
- Radius: `radius.lg` (`4px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

#### Charts

- Bar/line variant: `line`
- No gridlines — let the bars/lines carry the data.
- Highlight strategy: `last` — emphasize a single bar/point per chart.
- Use the declared palette in order: `#B7553A`, `#1F2A1E`, `#7A8472`.

#### Typography pairings

- **Display (`Cormorant Garamond`)** — h1, h2, hero headlines, brand wordmarks.
- **Body (`Lora`)** — paragraphs, labels, button text, form inputs.
- **Mono (`IBM Plex Mono`)** — code, eyebrows, metadata, numerals in tables.

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
Botanical Press is the visual language of a 19th-century pressed-flora archive — deep forest ink and oxidized terracotta annotations on warm bone paper. Every screen reads like a herbarium card: hairline rules, italic Cormorant display, generous leading, and a single warm spot color used the way a botanist would stamp a specimen number.

This system is for editorial product, slow content, journals, longform reading, naturalist brands, and anything that wants the calm authority of a museum collection card.

## Color
- **Forest Ink #1F2A1E** — primary text and headings. Deep enough to read as black on bone, green enough to feel inked rather than printed.
- **Oxidized Terracotta #B7553A** — the **only** accent. Used for annotations, outlines, ghost links, and chart highlights. Treat it like a stamp: rare, intentional, never decorative.
- **Faded Sage #7A8472** — meta, captions, axis labels. The pencil tone.
- **Bone #F2EDE0** — page paper. Warm off-white, never pure.
- **Herbarium Card #F8F4E9** — surface for cards. A half-shade lighter than the page so the card lifts without floating.

**There is no blue, no purple, no cool gradient anywhere.** The palette is two pigments on paper.

## Typography
**Cormorant Garamond italic** is the display voice — it gives the system its herbarium-label cadence. Body is **Lora** for warm, readable serif paragraphs. Generous leading (1.7 on body) is mandatory; this is reading-first design.

| Role | Font | Size | Weight | Style |
|------|------|------|--------|-------|
| Hero | Cormorant | 5.25rem | 400 | Italic |
| H1 | Cormorant | 3rem | 400 | Italic |
| H2 | Lora | 1.5rem | 500 | Roman |
| Body | Lora | 1.0625rem | 400 | Roman, leading 1.7 |
| Caption | IBM Plex Mono | 0.8125rem | 500 | Specimen-number voice |

## Buttons
All four are rectangular with 2–4px radii — herbarium labels never have pill corners.

- **Primary** — forest ink fill, bone label, italic Cormorant. The botanist's stamp.
- **Secondary** — herbarium-card surface with a 1px ink border. Italic display label.
- **Outline** — transparent with a 1px terracotta hairline. Uppercase, +2% tracking. Used for annotation-style CTAs.
- **Ghost** — italic terracotta label, no chrome, hover underline. For inline references.

**No shadows on any button.** The forest ink itself carries the weight.

## Cards
Bone-card surface with a **1px forest-ink border at 16%** and a 1px hairline shadow at 6%. Cards lie flat. Radius is 4px. Never lift them with drop-shadow — the herbarium read depends on the page-flat plane.

## Charts & Data
A single 1.5px terracotta line over the bone canvas with a small dot at the latest value. **No gridlines, no fills, no second color.** Axis labels in faded sage. Reads like a growth chart pencilled into the margin of a field notebook.

## Annotation Stamps
The terracotta accent should appear once or twice per screen, used like a wax seal:
- The single spot color on a chart line.
- A small terracotta rule under a section number.
- An italic terracotta caption beside a quoted figure.

Never use terracotta on body text. Never use it as a fill on cards. Its scarcity is what makes it read as authoritative.

## Do's and Don'ts
- ✅ Cormorant italic for every display heading. The italic is non-negotiable.
- ✅ Generous leading (1.6–1.7) on body. This is reading-first.
- ✅ Hairline borders only — 1px forest ink at 16% or terracotta at 100%.
- ✅ Treat terracotta like a stamp — once or twice per screen, never as decoration.
- ❌ No drop shadows on cards or buttons. The page-flat read is the system.
- ❌ No pill buttons. No radii above 4px.
- ❌ No cool colors. No blue, no purple, no neutral grey.
- ❌ No sans-serif display. Cormorant italic carries the voice.

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#1F2A1E` |
| secondary | `#7A8472` |
| tertiary  | `#B7553A` |
| neutral   | `#F2EDE0` |
| surface   | `#F8F4E9` |

### Typography

- **Display:** Cormorant Garamond
- **Body:** Lora
- **Mono:** IBM Plex Mono

| Role | size / leading / weight / tracking |
|------|------------------------------------|
| Hero | 5.25rem / 1 / 400 / -0.025em |
| H1   | 3rem / 1.05 / 400 / -0.02em |
| H2   | 1.5rem / 1.3 / 500 / 0 |
| Body | 1.0625rem / 1.7 / 400 / 0 |

### Radius

- sm: `2px`
- md: `3px`
- lg: `4px`

### Shadows

- **card:** `0 1px 0 rgba(31, 42, 30, 0.06)`
- **button:** `none`

### Borders

- **card:** `1px solid rgba(31, 42, 30, 0.16)`
- **divider:** `rgba(31, 42, 30, 0.10)`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `rounded` |
| background | `#1F2A1E` |
| color | `#F2EDE0` |
| border | `1px solid #1F2A1E` |
| padding | `13px 24px` |
| fontFamily | `display` |
| fontWeight | `500` |
| fontSize | `1rem` |
| tracking | `0.01em` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `rounded` |
| background | `#F8F4E9` |
| color | `#1F2A1E` |
| border | `1px solid #1F2A1E` |
| padding | `13px 24px` |
| fontFamily | `display` |
| fontWeight | `500` |
| fontSize | `1rem` |
| tracking | `0.01em` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `rounded` |
| background | `transparent` |
| color | `#B7553A` |
| border | `1px solid #B7553A` |
| padding | `12px 22px` |
| fontFamily | `display` |
| fontWeight | `500` |
| fontSize | `0.9375rem` |
| tracking | `0.02em` |
| uppercase | `true` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `rounded` |
| background | `transparent` |
| color | `#B7553A` |
| border | `none` |
| padding | `10px 4px` |
| fontFamily | `display` |
| fontWeight | `500` |
| fontSize | `1rem` |
| tracking | `0.01em` |
| hoverHint | `underline` |

### Charts

| Property | Value |
|----------|-------|
| variant | `line` |
| strokeWidth | `1.5` |
| gridlines | `false` |
| highlight | `last` |
| dotMarker | `true` |
| axisColor | `#7A8472` |
| palette | `#B7553A`, `#1F2A1E`, `#7A8472` |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — bg: `rgba(183, 85, 58, 0.92)`, shadow: `0 4px 20px -8px rgba(183, 85, 58, 0.4)`
- **focus** — outline: `1.5px solid #B7553A`, outline-offset: `4px`
- **active** — transform: `translateY(1px)`, filter: `brightness(0.95)`
- **disabled** — opacity: `0.45`
- **loading** — opacity: `0.7`
- **selected** — bg: `#1F2A1E`, color: `#F8F4E9`

#### Input

- **hover** — border: `1px solid #1F2A1E`
- **focus** — border: `1px solid #B7553A`, shadow: `0 1px 0 0 #B7553A`
- **disabled** — opacity: `0.45`
- **error** — border: `1px solid #991B1B`, shadow: `0 1px 0 0 #991B1B`

#### Card

- **hover** — shadow: `0 8px 24px -12px rgba(15,23,42,0.14)`, transform: `translateY(-1px)`
- **selected** — border: `1px solid #1F2A1E`

#### Tab

- **hover** — color: `#1F2A1E`
- **focus** — outline: `1.5px solid #B7553A`, outline-offset: `3px`
- **selected** — color: `#B7553A`, border: `0 0 2px 0 solid #B7553A`

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
- **link:** color `#B7553A`, underline `always`
- **blockquote:** border `4px solid #B7553A`, padding `0.4em 0 0.4em 1.5em`
- **code:** background `rgba(31, 42, 30, 0.06)`, color `#1F2A1E`

### Accessibility (WCAG 2.1)

**Overall:** AA-Large

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 13.57:1 | AA | AAA | — |
| Body text on canvas | 12.76:1 | AA | AAA | — |
| Muted text on surface | 3.56:1 | AA | AA-Large | `#666e5f` → 4.82:1 (AA) |
| Accent on surface | 4.37:1 | AA-Large | AA-Large | — |
| Accent on canvas | 4.11:1 | AA-Large | AA-Large | — |