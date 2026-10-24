---
name: "Neo-Memphis"
description: "1980s Memphis Group revival — primary red, electric blue, and chrome yellow squiggling across cream paper. Hand-drawn shapes, chunky geometric sans, hard black borders, zero gradients."
tags: [playful, maximalist, retro, geometric]
colors:
  primary:   "#0E0E0E"
  secondary: "#5A5A5A"
  tertiary:  "#E63946"
  neutral:   "#F4EFD8"
  surface:   "#FBF7E5"
typography:
  display: "Archivo Black"
  body:    "DM Sans"
  mono:    "Space Mono"
  scale:
    hero: "5.5rem / 0.95 / 900 / -0.04em"
    h1:   "3rem / 1 / 900 / -0.03em"
    h2:   "1.375rem / 1.2 / 700 / 0"
    body: "1.0625rem / 1.5 / 400 / 0"
radius:
  sm: 0
  md: 2px
  lg: 4px
  pill: 9999px
shadows:
  card:   "4px 4px 0 #0E0E0E"
  button: "3px 3px 0 #0E0E0E"
borders:
  card:    "2px solid #0E0E0E"
  divider: "rgba(14, 14, 14, 0.20)"
buttons:
  primary:
    background: #E63946
    color: #F4EFD8
    border: 3px solid #0E0E0E
    shape: rounded
    padding: 14px 24px
    font: display / 900 / 0.9375rem / 0.04em
    uppercase: true
    shadow: 4px 4px 0 #0E0E0E
  secondary:
    background: #1B6CD9
    color: #F4EFD8
    border: 3px solid #0E0E0E
    shape: rounded
    padding: 14px 24px
    font: display / 900 / 0.9375rem / 0.04em
    uppercase: true
    shadow: 4px 4px 0 #0E0E0E
  outline:
    background: #F4C20D
    color: #0E0E0E
    border: 3px solid #0E0E0E
    shape: rounded
    padding: 14px 24px
    font: display / 900 / 0.9375rem / 0.04em
    uppercase: true
    shadow: 4px 4px 0 #0E0E0E
  ghost:
    background: transparent
    color: #0E0E0E
    border: none
    shape: sharp
    padding: 10px 4px
    font: display / 900 / 0.875rem / 0.06em
    uppercase: true
    hover: underline
charts:
  variant: bars
  gridlines: false
  bar_radius: 0
  bar_gap: 12px
  highlight: all
  axis_color: "#5A5A5A"
  palette: ["#E63946", "#1B6CD9", "#F4C20D", "#0E0E0E", "#E63946", "#1B6CD9", "#F4C20D"]
fonts_url: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap"
dependencies: ["lucide-react"]
---

# Neo-Memphis

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Neo-Memphis** as its
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

- **Primary** — rounded shape, bg `#E63946`, text `#F4EFD8`, border `3px solid #0E0E0E`, padding `14px 24px`, weight `900`, uppercased, shadow `4px 4px 0 #0E0E0E`.
- **Secondary** — rounded shape, bg `#1B6CD9`, text `#F4EFD8`, border `3px solid #0E0E0E`, padding `14px 24px`, weight `900`, uppercased, shadow `4px 4px 0 #0E0E0E`.
- **Outline** — rounded shape, bg `#F4C20D`, text `#0E0E0E`, border `3px solid #0E0E0E`, padding `14px 24px`, weight `900`, uppercased, shadow `4px 4px 0 #0E0E0E`.
- **Ghost** — sharp shape, text `#0E0E0E`, padding `10px 4px`, weight `900`, uppercased.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#FBF7E5`
- Border: `2px solid #0E0E0E`
- Shadow: `4px 4px 0 #0E0E0E`
- Radius: `radius.lg` (`4px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

#### Charts

- Bar/line variant: `bars`
- Bar radius: `0`
- No gridlines — let the bars/lines carry the data.
- Highlight strategy: `all` — emphasize a single bar/point per chart.
- Use the declared palette in order: `#E63946`, `#1B6CD9`, `#F4C20D`, `#0E0E0E`, `#E63946`, `#1B6CD9`, `#F4C20D`.

#### Typography pairings

- **Display (`Archivo Black`)** — h1, h2, hero headlines, brand wordmarks.
- **Body (`DM Sans`)** — paragraphs, labels, button text, form inputs.
- **Mono (`Space Mono`)** — code, eyebrows, metadata, numerals in tables.

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
Neo-Memphis is the 1980s Memphis Group reanimated for product UI — chunky geometric sans, hard black borders, primary-color shapes, and offset block shadows. Where Risograph Press is two-color print on cream, Neo-Memphis is **four-color poster-loud** on the same paper: red, electric blue, chrome yellow, and pure ink, fighting for attention without ever apologizing.

This system is for kids' apps, music platforms, festival sites, fashion drops, creator tools, and brands that refuse to be quiet.

## Color (the trinity + ink)
- **Memphis Red #E63946** — primary CTA fill. The loudest voice.
- **Electric Blue #1B6CD9** — secondary CTA, accent shapes, highlight blocks.
- **Chrome Yellow #F4C20D** — outline buttons, callouts, decorative tiles. Use sparingly — yellow earns its loudness by being rare.
- **Ink #0E0E0E** — every border, every shadow, body text. The structural skeleton.

Background is **cream #F4EFD8** — never pure white. Memphis was always printed, and printed paper is always warm.

## Typography
- **Display: Archivo Black** at 5.5rem / 900, -4% tracking. Chunky, geometric, posterized.
- **Body: DM Sans** at 1.0625rem for paragraphs and UI. Geometric companion.
- **Mono: Space Mono** for captions and labels. Playful typewriter rhythm.

| Role | Font | Size | Weight | Tracking |
|------|------|------|--------|----------|
| Hero | Archivo Black | 5.5rem | 900 | -0.04em |
| H1 | Archivo Black | 3rem | 900 | -0.03em |
| H2 | DM Sans | 1.375rem | 700 | 0 |
| Body | DM Sans | 1.0625rem | 400 | 0 |
| Label | Archivo Black | 0.875rem | 900 | +0.06em UPPER |

## Buttons
All buttons share the same anatomy: **3px ink border + 4px ink offset shadow**. The variants change only by fill color.

- **Primary** — Memphis red. The single loudest action per screen.
- **Secondary** — electric blue. Equal weight to primary, different intent.
- **Outline** — chrome yellow tile. For tertiary loud calls; the yellow is the warning flag.
- **Ghost** — bare ink uppercase, hover underline. For inline links.

**Pills are forbidden on action buttons.** Sharp 4px corners only. The block shadow IS the system.

## Cards
**2px ink border + 4px ink offset shadow** on cream surface. No drop shadows ever — Memphis used physical paper offsets, never glow. Radius is **4px maximum**, often 0.

## Memphis Decoration
The system permits — encourages — decorative geometric shapes scattered across the page:
- Small filled circles in chrome yellow.
- Squiggle lines in electric blue.
- Triangular ink confetti.

Use these as **background accents only**, never as buttons. They are the visual jazz that defined Memphis posters.

## Charts & Data
Chunky bars in **rotating trinity** — red, blue, yellow, ink, repeat. Sharp 0px corners, 12px gap, no gridlines. Axis labels in mid graphite. Reads like a 1986 magazine infographic.

## Do's and Don'ts
- ✅ Always use the offset ink shadow on cards and buttons. No exceptions.
- ✅ Borders are **3px on buttons, 2px on cards**, always pure ink.
- ✅ Cream background — never pure white.
- ✅ Geometric shapes scattered as background decoration are encouraged.
- ❌ No gradients anywhere. Memphis is **flat color or nothing**.
- ❌ No glow, no drop-shadow blur. Only crisp offset blocks.
- ❌ No more than one Memphis red CTA per view. Red earns its loudness by being rare.
- ❌ No serif anywhere. The geometry is the voice.

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#0E0E0E` |
| secondary | `#5A5A5A` |
| tertiary  | `#E63946` |
| neutral   | `#F4EFD8` |
| surface   | `#FBF7E5` |

### Typography

- **Display:** Archivo Black
- **Body:** DM Sans
- **Mono:** Space Mono

| Role | size / leading / weight / tracking |
|------|------------------------------------|
| Hero | 5.5rem / 0.95 / 900 / -0.04em |
| H1   | 3rem / 1 / 900 / -0.03em |
| H2   | 1.375rem / 1.2 / 700 / 0 |
| Body | 1.0625rem / 1.5 / 400 / 0 |

### Radius

- sm: `0`
- md: `2px`
- lg: `4px`
- pill: `9999px`

### Shadows

- **card:** `4px 4px 0 #0E0E0E`
- **button:** `3px 3px 0 #0E0E0E`

### Borders

- **card:** `2px solid #0E0E0E`
- **divider:** `rgba(14, 14, 14, 0.20)`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `rounded` |
| background | `#E63946` |
| color | `#F4EFD8` |
| border | `3px solid #0E0E0E` |
| padding | `14px 24px` |
| fontFamily | `display` |
| fontWeight | `900` |
| fontSize | `0.9375rem` |
| tracking | `0.04em` |
| uppercase | `true` |
| shadow | `4px 4px 0 #0E0E0E` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `rounded` |
| background | `#1B6CD9` |
| color | `#F4EFD8` |
| border | `3px solid #0E0E0E` |
| padding | `14px 24px` |
| fontFamily | `display` |
| fontWeight | `900` |
| fontSize | `0.9375rem` |
| tracking | `0.04em` |
| uppercase | `true` |
| shadow | `4px 4px 0 #0E0E0E` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `rounded` |
| background | `#F4C20D` |
| color | `#0E0E0E` |
| border | `3px solid #0E0E0E` |
| padding | `14px 24px` |
| fontFamily | `display` |
| fontWeight | `900` |
| fontSize | `0.9375rem` |
| tracking | `0.04em` |
| uppercase | `true` |
| shadow | `4px 4px 0 #0E0E0E` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#0E0E0E` |
| border | `none` |
| padding | `10px 4px` |
| fontFamily | `display` |
| fontWeight | `900` |
| fontSize | `0.875rem` |
| tracking | `0.06em` |
| uppercase | `true` |
| hoverHint | `underline` |

### Charts

| Property | Value |
|----------|-------|
| variant | `bars` |
| gridlines | `false` |
| barRadius | `0` |
| barGap | `12px` |
| highlight | `all` |
| axisColor | `#5A5A5A` |
| palette | `#E63946`, `#1B6CD9`, `#F4C20D`, `#0E0E0E`, `#E63946`, `#1B6CD9`, `#F4C20D` |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — shadow: `4px 6px 0 0 #0E0E0E`, transform: `translateY(-2px) rotate(-1deg)`
- **focus** — outline: `3px solid #E63946`, outline-offset: `3px`
- **active** — shadow: `1px 2px 0 0 #0E0E0E`, transform: `translateY(1px) scale(0.96)`
- **disabled** — opacity: `0.4`
- **loading** — opacity: `0.7`
- **selected** — bg: `#E63946`, color: `#0E0E0E`, transform: `rotate(-2deg)`

#### Input

- **hover** — border: `2px solid #E63946`
- **focus** — border: `2px solid #E63946`, shadow: `3px 3px 0 0 #E63946`
- **disabled** — opacity: `0.4`
- **error** — border: `2px solid #EF4444`, shadow: `3px 3px 0 0 #EF4444`

#### Card

- **hover** — shadow: `6px 8px 0 0 #0E0E0E`, transform: `translateY(-4px) rotate(-1deg)`
- **selected** — border: `2px solid #E63946`, transform: `rotate(-1deg)`
- **dragging** — transform: `rotate(-3deg) scale(1.05)`, opacity: `0.85`

#### Tab

- **hover** — color: `#E63946`, transform: `translateY(-1px)`
- **focus** — outline: `3px solid #E63946`, outline-offset: `2px`
- **selected** — bg: `#E63946`, color: `#0E0E0E`, transform: `rotate(-1deg)`

### Density

| Mode | padding × | row × | body | radius × | Use for |
|------|-----------|-------|------|----------|---------|
| compact | 0.72 | 0.78 | 0.8125rem | 0.85 | Information-dense — tables, IDEs, dashboards |
| comfortable | 1 | 1 | 0.9375rem | — | Default — most product UI |
| spacious | 1.35 | 1.3 | 1rem | 1.15 | Editorial — marketing, long-form, settings |

### Motion

**Signature — Bounce.** Exaggerated spring easing with a slight rotational tilt. Every interaction feels physical and playful.

```css
transition: transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

| Token | Value |
|-------|-------|
| duration.instant | `100ms` |
| duration.fast | `200ms` |
| duration.base | `320ms` |
| duration.slow | `500ms` |
| easing.standard | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| easing.decelerate | `cubic-bezier(0.0, 0, 0.2, 1)` |
| easing.accelerate | `cubic-bezier(0.4, 0, 1, 1)` |
| easing.spring | `cubic-bezier(0.5, 2, 0.4, 1)` |

### Elevation

Five-level scale, system-specific recipe.

| Level | Shadow | Recipe |
|-------|--------|--------|
| level0 | `none` | Flat — the tone separates. |
| level1 | `2px 3px 0 0 #0E0E0E` | Hard offset, slight shift. |
| level2 | `4px 6px 0 0 #0E0E0E` | Cards — visible offset. |
| level3 | `6px 8px 0 0 #0E0E0E` | Dialog — strong offset. |
| level4 | `8px 12px 0 0 #0E0E0E` | Modal — maximum offset, scrim required. |

### Content

- **measure:** `62ch` (max line length for body prose)
- **paragraph spacing:** `1.25em`
- **list indent:** `1.5em`
- **list gap:** `0.55em`
- **link:** color `#E63946`, underline `always`
- **blockquote:** border `3px solid #E63946`, padding `0.8em 1.2em`
- **code:** background `#E63946`, color `#0E0E0E`

### Accessibility (WCAG 2.1)

**Overall:** AA-Large

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 17.96:1 | AA | AAA | — |
| Body text on canvas | 16.72:1 | AA | AAA | — |
| Muted text on surface | 6.42:1 | AA | AA | — |
| Accent on surface | 3.88:1 | AA-Large | AA-Large | — |
| Accent on canvas | 3.61:1 | AA-Large | AA-Large | — |
