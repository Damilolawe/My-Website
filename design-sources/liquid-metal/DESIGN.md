---
name: "Liquid Metal"
description: "Dark graphite glassmorphism — heavy 48px backdrop blur on near-opaque graphite panes, hairline pewter borders, and brushed-silver text accents. No color, no glow, no aurora. Just clean machined glass over a flat charcoal canvas with subtle metallic gradients on display type."
tags: [dark, glass, minimal, premium, modern]
colors:
  primary:   "#E8EAEE"
  secondary: "#8C92A0"
  tertiary:  "#C8CDD6"
  neutral:   "#0E1013"
  surface:   "#15181D"
typography:
  display: Inter
  body:    Inter
  mono:    "JetBrains Mono"
  scale:
    hero: "4.25rem / 1.04 / 600 / -0.035em"
    h1:   "2.75rem / 1.08 / 600 / -0.03em"
    h2:   "1.625rem / 1.2 / 500 / -0.02em"
    body: "1rem / 1.55 / 400 / -0.005em"
radius:
  sm: 8px
  md: 14px
  lg: 20px
  pill: 9999px
shadows:
  card:   "0 1px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(232, 234, 238, 0.10)"
  button: "inset 0 1px 0 rgba(232, 234, 238, 0.14)"
borders:
  card:    "1px solid rgba(220, 225, 235, 0.08)"
  divider: "rgba(220, 225, 235, 0.06)"
glass:
  surface: "rgba(30, 34, 40, 0.28)"
  blur:    64px
  saturate: 115%
  border:  "1px solid rgba(220, 225, 235, 0.14)"
  shadow:  "0 1px 0 rgba(0, 0, 0, 0.25)"
  inner_highlight: "inset 0 1px 0 rgba(232, 234, 238, 0.10)"
  backdrop: "radial-gradient(at 18% 22%, rgba(60, 66, 76, 0.55) 0%, transparent 55%), radial-gradient(at 82% 78%, rgba(36, 40, 48, 0.65) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(48, 52, 60, 0.35) 0%, transparent 65%), #0E1115"
buttons:
  primary:
    background: linear-gradient(180deg, rgba(232, 234, 238, 0.22) 0%, rgba(180, 188, 200, 0.10) 100%)
    color: #F4F6FA
    border: 1px solid rgba(232, 234, 238, 0.32)
    shape: pill
    padding: 12px 24px
    font: 600 / 0.9375rem / -0.01em
    shadow: inset 0 1px 0 rgba(255, 255, 255, 0.20)
    backdrop_blur: 40px
    backdrop_saturate: 130%
  secondary:
    background: rgba(40, 46, 54, 0.28)
    color: #E8EAEE
    border: 1px solid rgba(220, 225, 235, 0.14)
    shape: pill
    padding: 12px 24px
    font: 500 / 0.9375rem / -0.01em
    shadow: inset 0 1px 0 rgba(232, 234, 238, 0.08)
    backdrop_blur: 40px
    backdrop_saturate: 120%
  outline:
    background: rgba(20, 23, 28, 0.40)
    color: #E8EAEE
    border: 1px solid rgba(220, 225, 235, 0.14)
    shape: pill
    padding: 11px 22px
    font: 500 / 0.9375rem / -0.01em
    backdrop_blur: 24px
    backdrop_saturate: 110%
  ghost:
    background: transparent
    color: rgba(232, 234, 238, 0.70)
    border: none
    shape: pill
    padding: 11px 16px
    font: 500 / 0.9375rem
charts:
  variant: line
  stroke_width: 1.75
  gridlines: false
  highlight: last
  dot_marker: true
  axis_color: "#5A6070"
  palette: ["#C8CDD6", "#8C92A0", "#5A6070"]
fonts_url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
dependencies: ["lucide-react"]
---

# Liquid Metal

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Liquid Metal** as its
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

- **Primary** — pill shape, bg `linear-gradient(180deg, rgba(232, 234, 238, 0.22) 0%, rgba(180, 188, 200, 0.10) 100%)`, text `#F4F6FA`, border `1px solid rgba(232, 234, 238, 0.32)`, padding `12px 24px`, weight `600`, shadow `inset 0 1px 0 rgba(255, 255, 255, 0.20)`.
- **Secondary** — pill shape, bg `rgba(40, 46, 54, 0.28)`, text `#E8EAEE`, border `1px solid rgba(220, 225, 235, 0.14)`, padding `12px 24px`, weight `500`, shadow `inset 0 1px 0 rgba(232, 234, 238, 0.08)`.
- **Outline** — pill shape, bg `rgba(20, 23, 28, 0.40)`, text `#E8EAEE`, border `1px solid rgba(220, 225, 235, 0.14)`, padding `11px 22px`, weight `500`.
- **Ghost** — pill shape, text `rgba(232, 234, 238, 0.70)`, padding `11px 16px`, weight `500`.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#15181D`
- Border: `1px solid rgba(220, 225, 235, 0.08)`
- Shadow: `0 1px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(232, 234, 238, 0.10)`
- Radius: `radius.lg` (`20px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

> This system ships a **glass treatment** — see the Glass token table.
> Apply `backdrop-filter: blur(64px)` to translucent panes.
> The page must have a backdrop (gradient mesh / blurred orbs) for glass to refract.

#### Charts

- Bar/line variant: `line`
- No gridlines — let the bars/lines carry the data.
- Highlight strategy: `last` — emphasize a single bar/point per chart.
- Use the declared palette in order: `#C8CDD6`, `#8C92A0`, `#5A6070`.

#### Typography pairings

- **Display (`Inter`)** — h1, h2, hero headlines, brand wordmarks.
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

## Overview
Liquid Metal is dark glassmorphism stripped of every color cue. Where Aurora Glass detonates a vivid mesh behind translucent panes, Liquid Metal sits on a **flat charcoal canvas** — two neutral stops, no orbs, no glow. The glass itself does the talking: 48px backdrop blur, graphite tint at 55% opacity, cool pewter hairlines, and a metallic top-edge gloss that reads as machined aluminum under frost.

This is the industrial machined-metal language: industrial, cool, premium. Every surface feels milled.

## Atmosphere
- The page background is a **flat vertical graphite gradient** — `#14171C` to `#0B0D11`. No mesh, no aurora, no color. The neutrality is deliberate: it makes the glass read as glass, not as a tinted overlay.
- Cards are **graphite panes** at 55% opacity with a heavy 48px blur. They have weight — closer to brushed steel under glass than to floating bubbles.
- Buttons are **frosted pills**. The primary uses a vertical silver gradient (18% → 10%) to suggest a brushed metal cap with a cool hairline rim. No color, no glow shadow.
- Borders are **cool pewter hairlines** at 10–14% — they catch light without ever introducing hue.
- Shadows are **deep and heavy** (80px blur, -24px y, 75% opacity) paired with a 1px cool top highlight and a 1px dark bottom relief. That double-stroke is the metallic edge.

## Liquid Metal Text Accents
Display type uses **brushed silver** as the accent stop — `#C8CDD6` paired with the primary ivory `#E8EAEE` to create a subtle metallic gradient on hero titles, callout numerals, and accent words. Apply it with `background-clip: text` and a 180° linear gradient (silver top, ivory bottom) so the text reads like polished steel under cool light.

```css
.metal-text {
  background: linear-gradient(180deg, #E8EAEE 0%, #C8CDD6 60%, #8C92A0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

Use this on hero words, large numerals, and section accents only — never on body text.

## Typography
**Inter** at every level. Hero compresses to -3.5% tracking; body breathes at -0.5%. Display weight is **600**, never 700 — heavy weights look plastic on glass.

| Role | Size      | Weight | Tracking  |
|------|-----------|--------|-----------|
| Hero | 4.25rem   | 600    | -0.035em  |
| H1   | 2.75rem   | 600    | -0.03em   |
| H2   | 1.625rem  | 500    | -0.02em   |
| Body | 1rem      | 400    | -0.005em  |

## Color
- **Ivory #E8EAEE** — primary text on graphite glass. Cool, slightly cyan-leaning.
- **Brushed Silver #C8CDD6** — the metallic accent stop. Used in display gradients only, never as a solid fill.
- **Pewter #8C92A0** — captions, axis labels, secondary chrome.
- **Graphite #15181D** — opaque surface fallback when glass is not available.
- **Charcoal #0E1013** — the page canvas.

**No saturated colors exist in this system.** No mint, no violet, no rose. The accent is brightness, not hue.

## Buttons
All four are frosted glass pills. **There are no solid buttons.**

- **Primary** — brushed silver glass with a vertical 18%→10% white gradient, cool hairline border at 28%, double-stroke shadow (cool top, dark bottom). Reads as a polished metal cap.
- **Secondary** — graphite pane at 55%, hairline pewter border, 32px backdrop blur.
- **Outline** — whisper-glass at 40% with a 14% hairline ring.
- **Ghost** — bare label, no surface.

All four are **pills** (9999px). Sharp corners only on hairlines.

## Charts & Data
A single 1.75px brushed-silver line over the flat graphite canvas. **No gridlines, no fills, no second color.** A small dot marks the latest value. Axis labels in pewter `#5A6070`. The chart should read like an oscilloscope sweep on a darkroom monitor.

## Do's and Don'ts
- ✅ Always render the flat graphite canvas. The neutrality is what makes the glass read as metal.
- ✅ Use `background-clip: text` with the silver gradient on hero accents.
- ✅ Pair every glass surface with a cool top highlight (1px white at 14–22%) AND a dark bottom relief (1px black at 40%). The double-stroke is the metallic edge.
- ✅ Keep cards at ~55% opacity with 48px blur — heavier than aurora, never bubble-light.
- ❌ No colored gradients anywhere. No mint, no blue, no violet. Brightness only.
- ❌ No glow shadows. Shadows are deep and dark, not luminous.
- ❌ No saturation boost on the backdrop — keep `saturate: 100%`. Color in the canvas would defeat the metallic read.
- ❌ No solid CTAs. Even the primary is frosted glass with a silver gradient.

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#E8EAEE` |
| secondary | `#8C92A0` |
| tertiary  | `#C8CDD6` |
| neutral   | `#0E1013` |
| surface   | `#15181D` |

### Typography

- **Display:** Inter
- **Body:** Inter
- **Mono:** JetBrains Mono

| Role | size / leading / weight / tracking |
|------|------------------------------------|
| Hero | 4.25rem / 1.04 / 600 / -0.035em |
| H1   | 2.75rem / 1.08 / 600 / -0.03em |
| H2   | 1.625rem / 1.2 / 500 / -0.02em |
| Body | 1rem / 1.55 / 400 / -0.005em |

### Radius

- sm: `8px`
- md: `14px`
- lg: `20px`
- pill: `9999px`

### Shadows

- **card:** `0 1px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(232, 234, 238, 0.10)`
- **button:** `inset 0 1px 0 rgba(232, 234, 238, 0.14)`

### Borders

- **card:** `1px solid rgba(220, 225, 235, 0.08)`
- **divider:** `rgba(220, 225, 235, 0.06)`

### Glass

Translucent panes with backdrop-filter — the preview renders cards from these exact values.

| Property | Value |
|----------|-------|
| surface | `rgba(30, 34, 40, 0.28)` |
| blur | `64px` |
| saturate | `115%` |
| border | `1px solid rgba(220, 225, 235, 0.14)` |
| shadow | `0 1px 0 rgba(0, 0, 0, 0.25)` |
| innerHighlight | `inset 0 1px 0 rgba(232, 234, 238, 0.10)` |
| backdrop | `radial-gradient(at 18% 22%, rgba(60, 66, 76, 0.55) 0%, transparent 55%), radial-gradient(at 82% 78%, rgba(36, 40, 48, 0.65) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(48, 52, 60, 0.35) 0%, transparent 65%), #0E1115` |

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `linear-gradient(180deg, rgba(232, 234, 238, 0.22) 0%, rgba(180, 188, 200, 0.10) 100%)` |
| color | `#F4F6FA` |
| border | `1px solid rgba(232, 234, 238, 0.32)` |
| padding | `12px 24px` |
| fontWeight | `600` |
| fontSize | `0.9375rem` |
| tracking | `-0.01em` |
| shadow | `inset 0 1px 0 rgba(255, 255, 255, 0.20)` |
| backdropBlur | `40px` |
| backdropSaturate | `130%` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `rgba(40, 46, 54, 0.28)` |
| color | `#E8EAEE` |
| border | `1px solid rgba(220, 225, 235, 0.14)` |
| padding | `12px 24px` |
| fontWeight | `500` |
| fontSize | `0.9375rem` |
| tracking | `-0.01em` |
| shadow | `inset 0 1px 0 rgba(232, 234, 238, 0.08)` |
| backdropBlur | `40px` |
| backdropSaturate | `120%` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `rgba(20, 23, 28, 0.40)` |
| color | `#E8EAEE` |
| border | `1px solid rgba(220, 225, 235, 0.14)` |
| padding | `11px 22px` |
| fontWeight | `500` |
| fontSize | `0.9375rem` |
| tracking | `-0.01em` |
| backdropBlur | `24px` |
| backdropSaturate | `110%` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `transparent` |
| color | `rgba(232, 234, 238, 0.70)` |
| border | `none` |
| padding | `11px 16px` |
| fontWeight | `500` |
| fontSize | `0.9375rem` |

### Charts

| Property | Value |
|----------|-------|
| variant | `line` |
| strokeWidth | `1.75` |
| gridlines | `false` |
| highlight | `last` |
| dotMarker | `true` |
| axisColor | `#5A6070` |
| palette | `#C8CDD6`, `#8C92A0`, `#5A6070` |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — shadow: `0 8px 24px -8px rgba(200, 205, 214, 0.35), inset 0 1px 0 rgba(255,255,255,0.18)`, transform: `translateY(-1px)`, filter: `saturate(1.15)`
- **focus** — outline: `2px solid rgba(200, 205, 214, 0.5)`, outline-offset: `3px`
- **active** — transform: `translateY(0) scale(0.98)`, filter: `brightness(0.96)`
- **disabled** — opacity: `0.4`, filter: `saturate(0.4) blur(0.4px)`
- **loading** — opacity: `0.7`
- **selected** — bg: `rgba(200, 205, 214, 0.18)`, color: `#C8CDD6`

#### Input

- **hover** — border: `1px solid rgba(200, 205, 214, 0.4)`, shadow: `inset 0 1px 0 rgba(255,255,255,0.18)`
- **focus** — border: `1px solid rgba(200, 205, 214, 0.65)`, shadow: `0 0 0 4px rgba(200, 205, 214, 0.15), inset 0 1px 0 rgba(255,255,255,0.18)`
- **disabled** — opacity: `0.4`
- **error** — border: `1px solid rgba(248,113,113,0.7)`, shadow: `0 0 0 4px rgba(248,113,113,0.15)`

#### Card

- **hover** — shadow: `0 16px 48px -16px rgba(200, 205, 214, 0.25), inset 0 1px 0 rgba(255,255,255,0.18)`, transform: `translateY(-2px)`, filter: `saturate(1.1)`
- **selected** — border: `1px solid rgba(200, 205, 214, 0.5)`
- **dragging** — shadow: `0 24px 64px -16px rgba(0,0,0,0.4)`, transform: `scale(1.02)`, opacity: `0.85`

#### Tab

- **hover** — bg: `rgba(200, 205, 214, 0.08)`
- **focus** — outline: `2px solid rgba(200, 205, 214, 0.5)`, outline-offset: `2px`
- **selected** — bg: `rgba(200, 205, 214, 0.18)`, color: `#C8CDD6`

### Density

| Mode | padding × | row × | body | radius × | Use for |
|------|-----------|-------|------|----------|---------|
| compact | 0.72 | 0.78 | 0.8125rem | 0.85 | Information-dense — tables, IDEs, dashboards |
| comfortable | 1 | 1 | 0.9375rem | — | Default — most product UI |
| spacious | 1.35 | 1.3 | 1rem | 1.15 | Editorial — marketing, long-form, settings |

### Motion

**Signature — Refract.** Long opacity- and blur-driven transitions. Not a hard move, but a shift of light across the glass surface.

```css
transition: opacity 350ms cubic-bezier(0.32, 0.72, 0, 1), backdrop-filter 350ms cubic-bezier(0.32, 0.72, 0, 1), transform 350ms cubic-bezier(0.32, 0.72, 0, 1);
```

| Token | Value |
|-------|-------|
| duration.instant | `100ms` |
| duration.fast | `200ms` |
| duration.base | `350ms` |
| duration.slow | `550ms` |
| easing.standard | `cubic-bezier(0.32, 0.72, 0, 1)` |
| easing.decelerate | `cubic-bezier(0.0, 0, 0.2, 1)` |
| easing.accelerate | `cubic-bezier(0.4, 0, 1, 1)` |
| easing.spring | `cubic-bezier(0.34, 1.2, 0.64, 1)` |

### Elevation

Five-level scale, system-specific recipe.

| Level | Shadow | Recipe |
|-------|--------|--------|
| level0 | `inset 0 1px 0 rgba(255,255,255,0.18)` | Flat glass surface — top-edge gloss only. |
| level1 | `0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.18)` | Soft lift + top-edge gloss. |
| level2 | `0 12px 32px -8px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255,255,255,0.18)` | Floating pane — popover. |
| level3 | `0 24px 64px -16px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(200, 205, 214, 0.08), inset 0 1px 0 rgba(255,255,255,0.18)` | Sheet — accent rim for depth. |
| level4 | `0 40px 96px -24px rgba(0, 0, 0, 0.5), 0 0 48px -12px rgba(200, 205, 214, 0.25), inset 0 1px 0 rgba(255,255,255,0.18)` | Modal — dramatic glow, scrim required. |

### Content

- **measure:** `66ch` (max line length for body prose)
- **paragraph spacing:** `1.25em`
- **list indent:** `1.5em`
- **list gap:** `0.5em`
- **link:** color `#C8CDD6`, underline `hover`
- **blockquote:** border `1px solid rgba(200, 205, 214, 0.4)`, padding `0.9em 1.2em`
- **code:** background `rgba(200, 205, 214, 0.1)`, color `#C8CDD6`

### Accessibility (WCAG 2.1)

**Overall:** AA

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 14.77:1 | AA | AAA | — |
| Body text on canvas | 15.82:1 | AA | AAA | — |
| Muted text on surface | 5.71:1 | AA | AA | — |
| Accent on surface | 11.15:1 | AA-Large | AAA | — |
| Accent on canvas | 11.94:1 | AA-Large | AAA | — |