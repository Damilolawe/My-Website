---
name: "Acid Chrome"
description: "Liquid chrome and oil-slick iridescence on onyx — holographic gradients, polished metal CTAs, and prismatic accents. Y2K reborn as molten metal, not neon. Chrome is the color."
tags: [dark, futuristic, premium, y2k, modern]
colors:
  primary:   "#F2F4F8"
  secondary: "#8089A0"
  tertiary:  "#FF4DD8"
  neutral:   "#06070C"
  surface:   "#0E1018"
typography:
  display: Syne
  body:    Inter
  mono:    "JetBrains Mono"
  scale:
    hero: "5rem / 1 / 700 / -0.035em"
    h1:   "3rem / 1.05 / 700 / -0.03em"
    h2:   "1.5rem / 1.2 / 600 / -0.015em"
    body: "1rem / 1.55 / 400 / -0.005em"
radius:
  sm: 6px
  md: 12px
  lg: 20px
  pill: 9999px
shadows:
  card:   "0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 12px 32px -16px rgba(255, 77, 216, 0.18), 0 12px 32px -16px rgba(0, 229, 255, 0.14)"
  button: "inset 0 1px 0 rgba(255, 255, 255, 0.55), inset 0 -1px 0 rgba(0, 0, 0, 0.25), 0 8px 24px -8px rgba(255, 77, 216, 0.30)"
borders:
  card:    "1px solid rgba(242, 244, 248, 0.10)"
  divider: "rgba(242, 244, 248, 0.06)"
buttons:
  primary:
    background: linear-gradient(180deg, #F8FAFF 0%, #C4CCDA 45%, #6F7888 100%)
    color: #0A0C12
    border: 1px solid rgba(255, 255, 255, 0.35)
    shape: pill
    padding: 13px 26px
    font: display / 700 / 0.9375rem / -0.005em
    shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55), inset 0 -1px 0 rgba(0, 0, 0, 0.25), 0 8px 24px -8px rgba(255, 77, 216, 0.30)
  secondary:
    background: linear-gradient(95deg, #FF4DD8 0%, #B14DFF 35%, #4D9FFF 70%, #00E5C2 100%)
    color: #06070C
    border: 1px solid rgba(255, 255, 255, 0.25)
    shape: pill
    padding: 13px 26px
    font: display / 700 / 0.9375rem / -0.005em
    shadow: 0 8px 24px -8px rgba(177, 77, 255, 0.40)
  outline:
    background: rgba(14, 16, 24, 0.60)
    color: #F2F4F8
    border: 1px solid rgba(242, 244, 248, 0.22)
    shape: pill
    padding: 12px 24px
    font: body / 500 / 0.9375rem / -0.005em
  ghost:
    background: transparent
    color: #FF4DD8
    border: none
    shape: pill
    padding: 11px 14px
    font: body / 600 / 0.9375rem / -0.005em
    hover: underline
charts:
  variant: line
  stroke_width: 2
  gridlines: false
  highlight: last
  dot_marker: true
  axis_color: "#5A6378"
  palette: ["#FF4DD8", "#B14DFF", "#4D9FFF", "#00E5C2"]
fonts_url: "https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
dependencies: ["lucide-react"]
---

# Acid Chrome

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Acid Chrome** as its
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

- **Primary** — pill shape, bg `linear-gradient(180deg, #F8FAFF 0%, #C4CCDA 45%, #6F7888 100%)`, text `#0A0C12`, border `1px solid rgba(255, 255, 255, 0.35)`, padding `13px 26px`, weight `700`, shadow `inset 0 1px 0 rgba(255, 255, 255, 0.55), inset 0 -1px 0 rgba(0, 0, 0, 0.25), 0 8px 24px -8px rgba(255, 77, 216, 0.30)`.
- **Secondary** — pill shape, bg `linear-gradient(95deg, #FF4DD8 0%, #B14DFF 35%, #4D9FFF 70%, #00E5C2 100%)`, text `#06070C`, border `1px solid rgba(255, 255, 255, 0.25)`, padding `13px 26px`, weight `700`, shadow `0 8px 24px -8px rgba(177, 77, 255, 0.40)`.
- **Outline** — pill shape, bg `rgba(14, 16, 24, 0.60)`, text `#F2F4F8`, border `1px solid rgba(242, 244, 248, 0.22)`, padding `12px 24px`, weight `500`.
- **Ghost** — pill shape, text `#FF4DD8`, padding `11px 14px`, weight `600`.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#0E1018`
- Border: `1px solid rgba(242, 244, 248, 0.10)`
- Shadow: `0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 12px 32px -16px rgba(255, 77, 216, 0.18), 0 12px 32px -16px rgba(0, 229, 255, 0.14)`
- Radius: `radius.lg` (`20px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

#### Tabs

Variant: `pill`. Segmented control inside a tinted track. Active tab gets a filled pill in the accent color.
Tabs are uppercased with `0.08em` tracking.

#### Charts

- Bar/line variant: `line`
- No gridlines — let the bars/lines carry the data.
- Highlight strategy: `last` — emphasize a single bar/point per chart.
- Use the declared palette in order: `#FF4DD8`, `#B14DFF`, `#4D9FFF`, `#00E5C2`.

#### Typography pairings

- **Display (`Syne`)** — h1, h2, hero headlines, brand wordmarks.
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
Acid Chrome is Y2K rebuilt around polished metal instead of neon. Where Neon Y2K is sharp, glowing and electric, Acid Chrome is **molten, prismatic, and cool** — liquid chrome caps with cool top highlights and dark bottom relief, oil-slick iridescent secondary buttons, and a single hot magenta stop that drifts through the entire palette like an oil spill on wet asphalt.

This is the language of luxury hardware launches, cyber fashion, music client work, and any product that wants to feel **expensive AND alien**.

## Atmosphere
- Page canvas is **onyx #06070C** — deep blue-black with a microscopic cyan cast that makes chrome surfaces refract correctly.
- Cards sit at **#0E1018** with a 10% pearl hairline border. The lift is two faint colored halos — magenta + cyan — at 18% / 14% opacity. Not a glow. A refraction.
- The signature button is the **liquid chrome pill** — a vertical 3-stop silver gradient (pearl → steel → graphite) with a 55% white inner top highlight, 25% black inner bottom relief, and a soft magenta underglow. It reads like a polished aluminum cap caught under a single prismatic light.
- The secondary is the **oil-slick pill** — a 95° horizontal sweep through magenta → violet → blue → mint. This is the only place in the system where the full prism appears.

## Color
- **Pearl #F2F4F8** — primary text. Cool, slightly cyan.
- **Iridescent Magenta #FF4DD8** — the prismatic accent stop. Used in card halos, ghost links, chart highlights.
- **Pewter #8089A0** — secondary text, captions, axis labels.
- **Onyx #06070C** — page canvas.
- **Surface #0E1018** — card fallback.

The oil-slick gradient stops (**#FF4DD8 → #B14DFF → #4D9FFF → #00E5C2**) appear only in: the secondary button, the chart line, and at most one decorative accent per page. Their scarcity is the system.

## Typography
- **Display: Syne** at 5rem / 700, -3.5% tracking. Geometric futurism with character.
- **Body: Inter** at 1rem for paragraphs and UI.
- **Mono: JetBrains Mono** for spec callouts.

| Role | Font | Size | Weight | Tracking |
|------|------|------|--------|----------|
| Hero | Syne | 5rem | 700 | -0.035em |
| H1 | Syne | 3rem | 700 | -0.03em |
| H2 | Syne | 1.5rem | 600 | -0.015em |
| Body | Inter | 1rem | 400 | -0.005em |

## The Chrome Pill (signature)
The primary CTA is the system's defining gesture. Build it with all four stacked effects:

```css
.chrome-pill {
  background: linear-gradient(180deg, #F8FAFF 0%, #C4CCDA 45%, #6F7888 100%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 9999px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),   /* cool top highlight */
    inset 0 -1px 0 rgba(0, 0, 0, 0.25),         /* dark bottom relief */
    0 8px 24px -8px rgba(255, 77, 216, 0.30);   /* prismatic underglow */
  color: #0A0C12;
}
```

The double inset stroke is what sells the polished metal — never ship the chrome pill without both.

## The Oil-Slick Pill
Secondary CTA. Use the 95° horizontal sweep — not vertical, not radial. The angle matters: it's the direction light travels across an oil spill on wet street.

## Buttons
All four are pills. Sharp corners are forbidden in this system.

- **Primary** — liquid chrome cap. Once per view, max.
- **Secondary** — oil-slick iridescent sweep. Once per view, max.
- **Outline** — onyx fill at 60% with a 22% pearl hairline. The everyday tertiary.
- **Ghost** — bare iridescent magenta label, hover underline.

## Charts & Data
A single 2px line over onyx. The line travels through the iridescent palette — magenta to cyan — with a small magenta dot at the latest value. No gridlines, no fills. Axis labels in pewter #5A6378.

## Do's and Don'ts
- ✅ Always pair the chrome pill with both inset strokes (top white + bottom black). The double-stroke IS the metallic edge.
- ✅ The oil-slick gradient appears in **at most three places per page**: the secondary button, the chart line, and one decorative accent.
- ✅ Card halos are **two colored shadows at 14–18%**, not a glow. Refraction, not luminance.
- ✅ Onyx (#06070C), not pure black. The cyan cast makes chrome read correctly.
- ❌ No flat solid CTAs. The primary is always chrome; the secondary is always oil-slick.
- ❌ No saturated single-color glows like Neon Y2K. The energy here is **prismatic**, not electric.
- ❌ No serifs. No display fonts other than Syne.
- ❌ No sharp corners on buttons. Pills only.

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#F2F4F8` |
| secondary | `#8089A0` |
| tertiary  | `#FF4DD8` |
| neutral   | `#06070C` |
| surface   | `#0E1018` |

### Typography

- **Display:** Syne
- **Body:** Inter
- **Mono:** JetBrains Mono

| Role | size / leading / weight / tracking |
|------|------------------------------------|
| Hero | 5rem / 1 / 700 / -0.035em |
| H1   | 3rem / 1.05 / 700 / -0.03em |
| H2   | 1.5rem / 1.2 / 600 / -0.015em |
| Body | 1rem / 1.55 / 400 / -0.005em |

### Radius

- sm: `6px`
- md: `12px`
- lg: `20px`
- pill: `9999px`

### Shadows

- **card:** `0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 12px 32px -16px rgba(255, 77, 216, 0.18), 0 12px 32px -16px rgba(0, 229, 255, 0.14)`
- **button:** `inset 0 1px 0 rgba(255, 255, 255, 0.55), inset 0 -1px 0 rgba(0, 0, 0, 0.25), 0 8px 24px -8px rgba(255, 77, 216, 0.30)`

### Borders

- **card:** `1px solid rgba(242, 244, 248, 0.10)`
- **divider:** `rgba(242, 244, 248, 0.06)`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `linear-gradient(180deg, #F8FAFF 0%, #C4CCDA 45%, #6F7888 100%)` |
| color | `#0A0C12` |
| border | `1px solid rgba(255, 255, 255, 0.35)` |
| padding | `13px 26px` |
| fontFamily | `display` |
| fontWeight | `700` |
| fontSize | `0.9375rem` |
| tracking | `-0.005em` |
| shadow | `inset 0 1px 0 rgba(255, 255, 255, 0.55), inset 0 -1px 0 rgba(0, 0, 0, 0.25), 0 8px 24px -8px rgba(255, 77, 216, 0.30)` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `linear-gradient(95deg, #FF4DD8 0%, #B14DFF 35%, #4D9FFF 70%, #00E5C2 100%)` |
| color | `#06070C` |
| border | `1px solid rgba(255, 255, 255, 0.25)` |
| padding | `13px 26px` |
| fontFamily | `display` |
| fontWeight | `700` |
| fontSize | `0.9375rem` |
| tracking | `-0.005em` |
| shadow | `0 8px 24px -8px rgba(177, 77, 255, 0.40)` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `rgba(14, 16, 24, 0.60)` |
| color | `#F2F4F8` |
| border | `1px solid rgba(242, 244, 248, 0.22)` |
| padding | `12px 24px` |
| fontFamily | `body` |
| fontWeight | `500` |
| fontSize | `0.9375rem` |
| tracking | `-0.005em` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `pill` |
| background | `transparent` |
| color | `#FF4DD8` |
| border | `none` |
| padding | `11px 14px` |
| fontFamily | `body` |
| fontWeight | `600` |
| fontSize | `0.9375rem` |
| tracking | `-0.005em` |
| hoverHint | `underline` |

### Charts

| Property | Value |
|----------|-------|
| variant | `line` |
| strokeWidth | `2` |
| gridlines | `false` |
| highlight | `last` |
| dotMarker | `true` |
| axisColor | `#5A6378` |
| palette | `#FF4DD8`, `#B14DFF`, `#4D9FFF`, `#00E5C2` |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — shadow: `4px 6px 0 0 #F2F4F8`, transform: `translateY(-2px) rotate(-1deg)`
- **focus** — outline: `3px solid #FF4DD8`, outline-offset: `3px`
- **active** — shadow: `1px 2px 0 0 #F2F4F8`, transform: `translateY(1px) scale(0.96)`
- **disabled** — opacity: `0.4`
- **loading** — opacity: `0.7`
- **selected** — bg: `#FF4DD8`, color: `#F2F4F8`, transform: `rotate(-2deg)`

#### Input

- **hover** — border: `2px solid #FF4DD8`
- **focus** — border: `2px solid #FF4DD8`, shadow: `3px 3px 0 0 #FF4DD8`
- **disabled** — opacity: `0.4`
- **error** — border: `2px solid #EF4444`, shadow: `3px 3px 0 0 #EF4444`

#### Card

- **hover** — shadow: `6px 8px 0 0 #F2F4F8`, transform: `translateY(-4px) rotate(-1deg)`
- **selected** — border: `2px solid #FF4DD8`, transform: `rotate(-1deg)`
- **dragging** — transform: `rotate(-3deg) scale(1.05)`, opacity: `0.85`

#### Tab

- **hover** — color: `#FF4DD8`, transform: `translateY(-1px)`
- **focus** — outline: `3px solid #FF4DD8`, outline-offset: `2px`
- **selected** — bg: `#FF4DD8`, color: `#F2F4F8`, transform: `rotate(-1deg)`

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
| level1 | `2px 3px 0 0 #F2F4F8` | Hard offset, slight shift. |
| level2 | `4px 6px 0 0 #F2F4F8` | Cards — visible offset. |
| level3 | `6px 8px 0 0 #F2F4F8` | Dialog — strong offset. |
| level4 | `8px 12px 0 0 #F2F4F8` | Modal — maximum offset, scrim required. |

### Content

- **measure:** `62ch` (max line length for body prose)
- **paragraph spacing:** `1.25em`
- **list indent:** `1.5em`
- **list gap:** `0.55em`
- **link:** color `#FF4DD8`, underline `always`
- **blockquote:** border `3px solid #FF4DD8`, padding `0.8em 1.2em`
- **code:** background `#FF4DD8`, color `#F2F4F8`

### Accessibility (WCAG 2.1)

**Overall:** AA

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 17.24:1 | AA | AAA | — |
| Body text on canvas | 18.28:1 | AA | AAA | — |
| Muted text on surface | 5.43:1 | AA | AA | — |
| Accent on surface | 6.61:1 | AA-Large | AA | — |
| Accent on canvas | 7:1 | AA-Large | AAA | — |
