---
name: "Studio Margaux"
description: "A design-studio identity built on asymmetric oversized typography. Cream surfaces, Fraunces at extreme display scale paired with Inter Tight for body, an inked black block reserved for the studio mark and the single primary CTA, and an italic serif accent line that breaks every layout. Built for design agencies, art-direction portfolios, and creative studios that lead with type instead of imagery."
tags: [editorial, agency, warm, premium, asymmetric]
colors:
  primary:   "#0e0c0a"
  secondary: "#5e574d"
  tertiary:  "#0e0c0a"
  neutral:   "#ebe2ce"
  surface:   "#f1e8d4"
typography:
  display: Fraunces
  body:    "Inter Tight"
  mono:    "JetBrains Mono"
  scale:
    hero: "11rem / 0.85 / 300 / -0.05em"
    h1:   "5.5rem / 0.95 / 400 / -0.035em"
    h2:   "2.25rem / 1.15 / 400 / -0.018em"
    body: "1.0625rem / 1.6 / 400 / -0.005em"
radius:
  sm: 0px
  md: 0px
  lg: 0px
  pill: 9999px
shadows:
  card:   none
  button: none
borders:
  card:    "1px solid rgba(14,12,10,0.14)"
  divider: rgba(14,12,10,0.18)
buttons:
  primary:
    background: #0e0c0a
    color: #f1e8d4
    border: none
    shape: sharp
    padding: 16px 28px
    font: 600 / 0.8125rem / 0.14em
    uppercase: true
  secondary:
    background: transparent
    color: #0e0c0a
    border: 1px solid #0e0c0a
    shape: sharp
    padding: 16px 28px
    font: 600 / 0.8125rem / 0.14em
    uppercase: true
  outline:
    background: transparent
    color: #0e0c0a
    border: 1px solid rgba(14,12,10,0.20)
    shape: sharp
    padding: 16px 28px
    font: 600 / 0.8125rem / 0.14em
    uppercase: true
  ghost:
    background: transparent
    color: #5e574d
    border: none
    shape: sharp
    padding: 16px 18px
    font: 600 / 0.8125rem / 0.14em
    uppercase: true
charts:
  variant: "thin-bars"
  stroke_width: 1
  fill_opacity: 0
  gridlines: false
  bar_gap: 12px
  highlight: single
  dot_marker: false
fonts_url: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
dependencies: ["lucide-react"]
---

# Studio Margaux

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Studio Margaux** as its
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

- **Primary** — sharp shape, bg `#0e0c0a`, text `#f1e8d4`, padding `16px 28px`, weight `600`, uppercased.
- **Secondary** — sharp shape, text `#0e0c0a`, border `1px solid #0e0c0a`, padding `16px 28px`, weight `600`, uppercased.
- **Outline** — sharp shape, text `#0e0c0a`, border `1px solid rgba(14,12,10,0.20)`, padding `16px 28px`, weight `600`, uppercased.
- **Ghost** — sharp shape, text `#5e574d`, padding `16px 18px`, weight `600`, uppercased.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#f1e8d4`
- Border: `1px solid rgba(14,12,10,0.14)`
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

- **Display (`Fraunces`)** — h1, h2, hero headlines, brand wordmarks.
- **Body (`Inter Tight`)** — paragraphs, labels, button text, form inputs.
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

Studio Margaux is a design studio that leads with typography instead of imagery. The page surface is warm cream `#f1e8d4` — a colored letterpress stock, never white. Display headlines run in Fraunces 300 at 176px with -0.05em tracking — the soft-modern serif at extreme thin weight stretched across the full bleed. Below every headline sits a single italic Fraunces line at 56px that intentionally breaks the alignment of the headline above — the asymmetric editorial moment that signals studio-craft. Body sits in Inter Tight at 17px on a 1.6 leading. UI labels in Inter Tight 600 with 0.14em uppercase tracking. The single accent is pure ink `#0e0c0a` — a true near-black inked block reserved for the studio mark, the primary CTA, and the section index numbers (01., 02., 03.).

The discipline is in the asymmetry: every section has one element that intentionally breaks the grid — a headline that overhangs the column, a metadata block that floats into the margin, an italic line that starts mid-page. The layout never resolves to symmetry. That is the studio voice.

**Signature moves**
- Fraunces 300 at 176px — extreme thin display weight stretched full-bleed
- Italic Fraunces second line at 56px breaking the headline alignment — asymmetric craft moment
- Cream surface `#f1e8d4` — colored letterpress stock, never white
- Pure ink `#0e0c0a` blocks reserved for studio mark + primary CTA + section index numbers
- Sharp 0px corners on every surface — letterpress precision
- Section index numbers (01., 02., 03.) in Fraunces 400 at 96px — the chapter mark voice

## 2. Palette

### Surfaces
- **Cream** `#f1e8d4` — page background (warm letterpress stock)
- **Cream Lift** `#ebe2ce` — secondary surfaces, footer
- **Hairline** `rgba(14,12,10,0.14)` — every divider

### Ink
- **Ink** `#0e0c0a` — text, headings, studio mark, primary CTA fill (pure near-black)
- **Ink 50** `#5e574d` — secondary text, mono captions

That is the entire palette. There is no accent — the contrast between cream and pure ink IS the system.

## 3. Typography

| Role | Font | Size | Weight | Leading | Tracking |
|------|------|------|--------|---------|----------|
| Hero | Fraunces | 176px | 300 | 0.85 | -0.05em |
| Hero Italic Line | Fraunces (italic) | 56px | 400 | 1.05 | -0.018em |
| Section Index (01.) | Fraunces | 96px | 400 | 1.0 | -0.04em |
| H1 | Fraunces | 88px | 400 | 0.95 | -0.035em |
| H2 | Fraunces | 36px | 400 | 1.15 | -0.018em |
| Pull Quote | Fraunces (italic) | 32px | 300 | 1.32 | -0.012em |
| Body | Inter Tight | 17px | 400 | 1.6 | -0.005em |
| UI / Button | Inter Tight | 13px | 600 | 1.4 | 0.14em uppercase |
| Caption / Date | JetBrains Mono | 11px | 500 | 1.0 | 0.10em uppercase |
| Project Number | JetBrains Mono | 13px | 500 | 1.0 | 0 tabular-nums |

Fraunces lives at 300 (display thin) and 400 (h1/section index). Italic 300 for pull quotes, italic 400 for the breaking second line. The mono is reserved for project numbers and dates — the metadata voice.

## 4. Buttons

### Primary (Ink Block)
```css
background: #0e0c0a;
color: #f1e8d4;
padding: 16px 28px;
border-radius: 0px;
text-transform: uppercase;
letter-spacing: 0.14em;
font-weight: 600;
```

The 16px vertical padding makes the ink block read as a stamped letterpress slab — heavier than a typical button, intentionally so.

### Secondary (Ink Outline)
- Transparent, 1px solid ink, ink text — same sharp 0px corners, same heavy padding

### Outline & Ghost
- Outline: transparent, 1px hairline at 20% ink
- Ghost: no border, ink-50 uppercase

## 5. Cards (rarely used)

```css
background: #f1e8d4;
border: 1px solid rgba(14,12,10,0.14);
border-radius: 0px;
box-shadow: none;
```

The system prefers hairline-divided sections over cards. When a card is needed (project tile, team member), it is sharp 0px corners with a 1px hairline — never lifted, never shadowed.

## 6. Charts

Thin precise bars (3px wide, 12px gap). One bar in ink, others in 22% ink. NO gridlines. Y-axis labels in JetBrains Mono uppercase 11px. Charts are reserved for studio metrics and read as broadside exhibits.

## 7. Tabs

Underline 1.5px in ink for the active state. Inactive tabs are ink-50 in Inter Tight 600 uppercase. Active label often switches to Fraunces italic at the same size — that is the rhythm change.

## 8. Spacing

- Base 8px
- Scale: `8, 16, 24, 32, 48, 64, 96, 128, 200, 280`
- Section padding: 200px desktop, 96px mobile — full editorial breathing room

## 9. Do's & don'ts

✅ **Do**
- Use Fraunces 300 at 176px for the hero — the extreme thin weight is the studio voice
- Pair every headline with a single Fraunces italic line that breaks the alignment — the asymmetric craft moment
- Hold the cream surface — white reads as web app, beige reads as old textbook
- Number every section in Fraunces 400 at 96px (01., 02., 03.) — the chapter-mark voice

❌ **Don't**
- Use Fraunces at 600+ for display — bold breaks the studio thin-weight signature
- Resolve the layout to symmetry — every section needs one intentional grid-break
- Add a third color or accent — cream + pure ink IS the entire palette
- Round any corner — 0px sharp letterpress precision throughout

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#0e0c0a` |
| secondary | `#5e574d` |
| tertiary  | `#0e0c0a` |
| neutral   | `#ebe2ce` |
| surface   | `#f1e8d4` |

### Typography

- **Display:** Fraunces
- **Body:** Inter Tight
- **Mono:** JetBrains Mono

| Role | size / leading / weight / tracking |
|------|------------------------------------|
| Hero | 11rem / 0.85 / 300 / -0.05em |
| H1   | 5.5rem / 0.95 / 400 / -0.035em |
| H2   | 2.25rem / 1.15 / 400 / -0.018em |
| Body | 1.0625rem / 1.6 / 400 / -0.005em |

### Radius

- sm: `0px`
- md: `0px`
- lg: `0px`
- pill: `9999px`

### Shadows

- **card:** `none`
- **button:** `none`

### Borders

- **card:** `1px solid rgba(14,12,10,0.14)`
- **divider:** `rgba(14,12,10,0.18)`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `#0e0c0a` |
| color | `#f1e8d4` |
| border | `none` |
| padding | `16px 28px` |
| fontWeight | `600` |
| fontSize | `0.8125rem` |
| tracking | `0.14em` |
| uppercase | `true` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#0e0c0a` |
| border | `1px solid #0e0c0a` |
| padding | `16px 28px` |
| fontWeight | `600` |
| fontSize | `0.8125rem` |
| tracking | `0.14em` |
| uppercase | `true` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#0e0c0a` |
| border | `1px solid rgba(14,12,10,0.20)` |
| padding | `16px 28px` |
| fontWeight | `600` |
| fontSize | `0.8125rem` |
| tracking | `0.14em` |
| uppercase | `true` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#5e574d` |
| border | `none` |
| padding | `16px 18px` |
| fontWeight | `600` |
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

- **hover** — bg: `rgba(14, 12, 10, 0.92)`, shadow: `0 4px 20px -8px rgba(14, 12, 10, 0.4)`
- **focus** — outline: `1.5px solid #0e0c0a`, outline-offset: `4px`
- **active** — transform: `translateY(1px)`, filter: `brightness(0.95)`
- **disabled** — opacity: `0.45`
- **loading** — opacity: `0.7`
- **selected** — bg: `#0e0c0a`, color: `#f1e8d4`

#### Input

- **hover** — border: `1px solid #0e0c0a`
- **focus** — border: `1px solid #0e0c0a`, shadow: `0 1px 0 0 #0e0c0a`
- **disabled** — opacity: `0.45`
- **error** — border: `1px solid #991B1B`, shadow: `0 1px 0 0 #991B1B`

#### Card

- **hover** — shadow: `0 8px 24px -12px rgba(15,23,42,0.14)`, transform: `translateY(-1px)`
- **selected** — border: `1px solid #0e0c0a`

#### Tab

- **hover** — color: `#0e0c0a`
- **focus** — outline: `1.5px solid #0e0c0a`, outline-offset: `3px`
- **selected** — color: `#0e0c0a`, border: `0 0 2px 0 solid #0e0c0a`

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
- **link:** color `#0e0c0a`, underline `always`
- **blockquote:** border `4px solid #0e0c0a`, padding `0.4em 0 0.4em 1.5em`
- **code:** background `rgba(14, 12, 10, 0.06)`, color `#0e0c0a`

### Accessibility (WCAG 2.1)

**Overall:** AA

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 16.02:1 | AA | AAA | — |
| Body text on canvas | 15.16:1 | AA | AAA | — |
| Muted text on surface | 5.85:1 | AA | AA | — |
| Accent on surface | 16.02:1 | AA-Large | AAA | — |
| Accent on canvas | 15.16:1 | AA-Large | AAA | — |
