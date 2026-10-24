---
name: Voidstage
description: "Pure black void canvas, geometric medium-weight display with extreme negative tracking, frosted glass pills, and a single electric blue accent."
tags: [dark, premium, "design-tool", cinematic]
colors:
  primary:   "#ffffff"
  secondary: "#a6a6a6"
  tertiary:  "#0099ff"
  neutral:   "#000000"
  surface:   "#090909"
typography:
  display: Geist
  body:    Inter
  mono:    "JetBrains Mono"
  scale:
    hero: "4.5rem / 0.85 / 500 / -3.6px"
    h1:   "3.875rem / 0.95 / 500 / -2.5px"
    h2:   "2rem / 1.13 / 500 / -1px"
    body: "0.9375rem / 1.3 / 400 / -0.01px"
radius:
  sm: 5px
  md: 8px
  lg: 12px
  pill: 9999px
shadows:
  card:   "rgba(0,153,255,0.15) 0 0 0 1px, rgba(0,0,0,0.25) 0 10px 30px"
  button: "rgba(0,153,255,0.15) 0 0 0 1px"
buttons:
  primary:
    background: #FFFFFF
    color: #000000
    border: none
    shape: pill
    padding: 10px 22px
    font: display / 500 / -0.01em
  secondary:
    background: rgba(255,255,255,0.08)
    color: #FFFFFF
    border: 1px solid rgba(255,255,255,0.16)
    shape: pill
    padding: 10px 22px
    font: display / 500 / -0.01em
  outline:
    background: transparent
    color: #FFFFFF
    border: 1px solid rgba(255,255,255,0.4)
    shape: pill
    padding: 10px 22px
    font: display / 500 / -0.01em
  ghost:
    background: transparent
    color: rgba(255,255,255,0.6)
    border: none
    shape: pill
    padding: 10px 14px
    font: display / 500 / -0.01em
charts:
  variant: dots
  stroke_width: 1
  fill_opacity: 0
  bar_gap: 10px
  highlight: all
  dot_marker: true
fonts_url: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400&display=swap"
dependencies: ["lucide-react"]
---

# Voidstage

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Voidstage** as its
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

- **Primary** — pill shape, bg `#FFFFFF`, text `#000000`, padding `10px 22px`, weight `500`.
- **Secondary** — pill shape, bg `rgba(255,255,255,0.08)`, text `#FFFFFF`, border `1px solid rgba(255,255,255,0.16)`, padding `10px 22px`, weight `500`.
- **Outline** — pill shape, text `#FFFFFF`, border `1px solid rgba(255,255,255,0.4)`, padding `10px 22px`, weight `500`.
- **Ghost** — pill shape, text `rgba(255,255,255,0.6)`, padding `10px 14px`, weight `500`.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#090909`
- Shadow: `rgba(0,153,255,0.15) 0 0 0 1px, rgba(0,0,0,0.25) 0 10px 30px`
- Radius: `radius.lg` (`12px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

#### Charts

- Bar/line variant: `dots`
- Highlight strategy: `all` — emphasize a single bar/point per chart.

#### Typography pairings

- **Display (`Geist`)** — h1, h2, hero headlines, brand wordmarks.
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

Voidstage is a cinematic, tool-obsessed dark canvas — the confidence of a design tool built by designers who worship craft. The entire experience is drenched in pure black (`#000000`), not warm charcoal or cozy dark gray, but an absolute void that makes every element feel like it's floating in deep space. The product UI is the hero art; full-fidelity screenshots and interactive demos are embedded directly in the narrative.

The typography is the signature move. A geometric medium-weight display with aggressive negative tracking (as extreme as -5.5px on 110px headlines) creates words under pressure — compressed, kinetic, almost spring-loaded. Body type transitions to a refined neo-grotesque with extensive OpenType alternates, giving even small text a custom feel. The single accent — electric blue (`#0099ff`) — is deployed as link color, border, and ring shadow, a cold throughline against the warm-less black.

**Signature moves**
- Pure `#000000` void canvas — never warm or gray-tinted
- Geometric display at weight 500 only, with extreme negative tracking
- Electric blue (`#0099ff`) as the sole accent — interactive only
- Pill-shaped buttons (40–100px radius) — no sharp corners on interactive
- Frosted glass surfaces using `rgba(255,255,255,0.1)` over dark
- Blue ring shadows for card containment: `rgba(0,153,255,0.15) 0 0 0 1px`

## 2. Palette

### Primary
- **Void Black** `#000000` — page canvas
- **Pure White** `#ffffff` — heading text, button text on accent
- **Electric Blue** `#0099ff` — links, borders, focus, accent

### Surface
- Void `#000000` — page
- Frosted `rgba(255,255,255,0.1)` — translucent button / glass
- Frosted Hover `rgba(255,255,255,0.5)` — slightly more opaque
- Near Black `#090909` — elevated dark surface, ring color

### Text
- Pure White `#ffffff` — headings, high-emphasis
- Muted Silver `#a6a6a6` — body, descriptions
- Ghost White `rgba(255,255,255,0.6)` — placeholders, tertiary

### Glow
- Blue Glow `rgba(0,153,255,0.15)` — focus ring shadow, halo
- Default Link Blue `#0000ee` — sparingly in content areas

## 3. Typography

| Role | Size | Weight | Leading | Tracking |
|------|------|--------|---------|----------|
| Display Hero | 110px | 500 | 0.85 | -5.5px |
| Section Display | 85px | 500 | 0.95 | -4.25px |
| Section Heading | 62px | 500 | 1.00 | -3.1px |
| Feature Heading | 32px | 500 | 1.13 | -1px |
| Card Title | 24px | 400 | 1.30 | -0.01px |
| Body L | 18px | 400 | 1.30 | -0.01px |
| Body | 15px | 400 | 1.30 | -0.01px |
| Nav / UI | 15px | 400 | 1.00 | -0.15px |
| Caption | 14px | 400 | 1.40 | normal |
| Label | 13px | 500 | 1.60 | normal |
| Mono | 10.4px | 400 | 1.60 | normal |

**Compression is the personality.** Display weight is fixed at 500 — never bold, never regular. Ultra-tight line-heights (0.85) at display sizes mean letters nearly overlap vertically. Intentional density that rewards reading at arm's length.

## 4. Buttons

### Solid White Pill (Primary)
```css
background: #ffffff;
color: #000000;
padding: 10px 20px;
border-radius: 9999px;
```

### Frosted Pill
- `rgba(255,255,255,0.1)` background, white text
- Pill radius (40px+)
- Glass effect on dark — translucent and ambient

### Ghost
- No background, white text
- Hover reveals subtle frosted background

## 5. Cards

- **Dark surface card**: black or `#090909`, with `rgba(0,153,255,0.15) 0 0 0 1px` blue ring shadow, 10–15px radius
- **Elevated card**: `rgba(255,255,255,0.1) 0 0.5px 0 0.5px` (top highlight) + `rgba(0,0,0,0.25) 0 10px 30px` (deep ambient)
- Product screenshots: 8–12px radius, full-width within dark containers

## 6. Spacing

- Base: 8px
- Scale: `1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 30, 35`
- Section vertical: 80–120px
- Card internal: 15–30px

## 7. Radius scale

`1 / 5–7 / 8 / 10–12 / 15–20 / 30–40 / 100` — pill (100px+) is reserved for primary CTAs and tags. Cards stay at 10–15px.

## 8. Depth & elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 | Pure black, no shadow | Page background |
| 1 | `rgba(0,153,255,0.15) 0 0 0 1px` | Card borders, blue ring |
| 2 | `#090909 0 0 0 2px` | Subtle near-black containment |
| 3 | White edge highlight + deep ambient | Elevated cards, floating |

**Inverted elevation.** Instead of darker shadows on lighter backgrounds, Voidstage uses blue-tinted ring shadows for containment, white edge highlights to simulate light hitting the top edge, and deep ambient shadows for true floating. There is no glassmorphism blur — translucency is achieved through simple rgba opacity.

## 9. Do's & don'ts

✅ **Do**
- Use pure black (`#000000`) — never charcoal or warm dark
- Apply extreme negative tracking on display (-3px to -5.5px)
- Keep all buttons pill-shaped (40px+ radius)
- Reserve electric blue (`#0099ff`) for interactive accents only
- Apply blue ring shadows for card containment

❌ **Don't**
- Use warm dark backgrounds (`#1a1a1a`, `#2d2d2d`)
- Use bold (700+) on display — medium 500 only
- Introduce a second accent color — single accent system
- Use squared corners on interactive elements
- Add decorative imagery — the product is the illustration

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#ffffff` |
| secondary | `#a6a6a6` |
| tertiary  | `#0099ff` |
| neutral   | `#000000` |
| surface   | `#090909` |

### Typography

- **Display:** Geist
- **Body:** Inter
- **Mono:** JetBrains Mono

| Role | size / leading / weight / tracking |
|------|------------------------------------|
| Hero | 4.5rem / 0.85 / 500 / -3.6px |
| H1   | 3.875rem / 0.95 / 500 / -2.5px |
| H2   | 2rem / 1.13 / 500 / -1px |
| Body | 0.9375rem / 1.3 / 400 / -0.01px |

### Radius

- sm: `5px`
- md: `8px`
- lg: `12px`
- pill: `9999px`

### Shadows

- **card:** `rgba(0,153,255,0.15) 0 0 0 1px, rgba(0,0,0,0.25) 0 10px 30px`
- **button:** `rgba(0,153,255,0.15) 0 0 0 1px`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `#FFFFFF` |
| color | `#000000` |
| border | `none` |
| padding | `10px 22px` |
| fontFamily | `display` |
| fontWeight | `500` |
| tracking | `-0.01em` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `rgba(255,255,255,0.08)` |
| color | `#FFFFFF` |
| border | `1px solid rgba(255,255,255,0.16)` |
| padding | `10px 22px` |
| fontFamily | `display` |
| fontWeight | `500` |
| tracking | `-0.01em` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `transparent` |
| color | `#FFFFFF` |
| border | `1px solid rgba(255,255,255,0.4)` |
| padding | `10px 22px` |
| fontFamily | `display` |
| fontWeight | `500` |
| tracking | `-0.01em` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `transparent` |
| color | `rgba(255,255,255,0.6)` |
| border | `none` |
| padding | `10px 14px` |
| fontFamily | `display` |
| fontWeight | `500` |
| tracking | `-0.01em` |

### Charts

| Property | Value |
|----------|-------|
| variant | `dots` |
| strokeWidth | `1` |
| fillOpacity | `0` |
| barGap | `10px` |
| highlight | `all` |
| dotMarker | `true` |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — shadow: `0 0 24px -4px rgba(0, 153, 255, 0.5), 0 8px 24px -8px rgba(0,0,0,0.6)`, filter: `brightness(1.1)`
- **focus** — outline: `1.5px solid #0099ff`, outline-offset: `3px`
- **active** — transform: `translateY(1px)`, filter: `brightness(0.92)`
- **disabled** — opacity: `0.35`, filter: `saturate(0.4)`
- **loading** — opacity: `0.6`
- **selected** — bg: `#0099ff`, color: `#0A0A0A`

#### Input

- **hover** — border: `1px solid rgba(0, 153, 255, 0.5)`
- **focus** — border: `1px solid #0099ff`, shadow: `0 0 0 3px rgba(0, 153, 255, 0.2)`
- **disabled** — opacity: `0.35`
- **error** — border: `1px solid #F87171`, shadow: `0 0 0 3px rgba(248,113,113,0.2)`

#### Card

- **hover** — shadow: `0 16px 40px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(0, 153, 255, 0.18)`, transform: `translateY(-2px)`
- **selected** — border: `1px solid #0099ff`, shadow: `0 0 0 1px #0099ff`
- **dragging** — shadow: `0 24px 60px -16px rgba(0,0,0,0.85)`, transform: `scale(1.02)`, opacity: `0.85`

#### Tab

- **hover** — color: `#0099ff`
- **focus** — outline: `1.5px solid #0099ff`, outline-offset: `2px`
- **selected** — color: `#0099ff`, border: `0 0 1.5px 0 solid #0099ff`

### Density

| Mode | padding × | row × | body | radius × | Use for |
|------|-----------|-------|------|----------|---------|
| compact | 0.72 | 0.78 | 0.8125rem | 0.85 | Information-dense — tables, IDEs, dashboards |
| comfortable | 1 | 1 | 0.9375rem | — | Default — most product UI |
| spacious | 1.35 | 1.3 | 1rem | 1.15 | Editorial — marketing, long-form, settings |

### Motion

**Signature — Glide.** Fließende, leicht beschleunigte Übergänge mit Accent-Glow auf hover. Premium-Feeling durch kontrollierte Lichtspiele.

```css
transition: all 280ms cubic-bezier(0.32, 0.72, 0, 1);
```

| Token | Value |
|-------|-------|
| duration.instant | `100ms` |
| duration.fast | `180ms` |
| duration.base | `280ms` |
| duration.slow | `450ms` |
| easing.standard | `cubic-bezier(0.32, 0.72, 0, 1)` |
| easing.decelerate | `cubic-bezier(0.0, 0, 0.2, 1)` |
| easing.accelerate | `cubic-bezier(0.4, 0, 1, 1)` |
| easing.spring | `cubic-bezier(0.5, 1.25, 0.55, 1)` |

### Elevation

Five-level scale, system-specific recipe.

| Level | Shadow | Recipe |
|-------|--------|--------|
| level0 | `none` | Flat — Hairline mit Accent-Hauch. |
| level1 | `0 2px 4px rgba(0,0,0,0.45)` | Subtle drop — list items. |
| level2 | `0 12px 28px -8px rgba(0,0,0,0.6)` | Popover — vom Canvas gelöst. |
| level3 | `0 20px 48px -12px rgba(0,0,0,0.7), 0 0 32px -8px rgba(0, 153, 255, 0.25)` | Sheet — Accent-Halo. |
| level4 | `0 40px 96px -16px rgba(0,0,0,0.85), 0 0 64px -12px rgba(0, 153, 255, 0.4)` | Modal — voller Accent-Rim, dramatisch. |

### Content

- **measure:** `66ch` (max line length for body prose)
- **paragraph spacing:** `1.3em`
- **list indent:** `1.5em`
- **list gap:** `0.5em`
- **link:** color `#0099ff`, underline `hover`
- **blockquote:** border `2px solid #0099ff`, padding `0.8em 1.2em`
- **code:** background `rgba(0, 153, 255, 0.12)`, color `#0099ff`

### Accessibility (WCAG 2.1)

**Overall:** AA

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 19.91:1 | AA | AAA | — |
| Body text on canvas | 21:1 | AA | AAA | — |
| Muted text on surface | 8.18:1 | AA | AAA | — |
| Accent on surface | 6.64:1 | AA-Large | AA | — |
| Accent on canvas | 7:1 | AA-Large | AAA | — |