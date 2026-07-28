<!-- SEED -->
---
name: Ambience Home Design
description: Quiet-luxury interior architecture portfolio for Marbella
colors:
  bg: "oklch(0.985 0.002 75)"
  surface: "oklch(0.965 0.004 75)"
  ink: "oklch(0.22 0.015 55)"
  muted: "oklch(0.48 0.012 55)"
  primary: "oklch(0.42 0.08 43)"
  accent: "oklch(0.28 0.02 250)"
  line: "oklch(0.88 0.008 75)"
typography:
  display:
    fontFamily: "Marcellus, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Epilogue, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
rounded:
  sm: "2px"
  md: "6px"
  lg: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
  section: "clamp(4.5rem, 10vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
---

## Overview

Quiet Marbella showroom at dusk: stone, linen, bronze hardware catching soft light. Photography leads; UI is a calm frame. Restrained color strategy — near-white gallery surfaces, deep ink, bronze primary used sparingly, cool slate accent for secondary links and architecture lines. Not WordPress, not a template: full-bleed heroes, asymmetric project storytelling, minimal chrome.

## Colors

- **bg** — near-white gallery plane (tiny stone chroma toward brand hue, not cream/sand)
- **surface** — soft section shift for alternating bands
- **ink** — primary text, high contrast
- **muted** — secondary text ≥4.5:1 where used for body-adjacent copy
- **primary** — deep bronze from seed hue 43°, CTAs and focal marks; white text on fills
- **accent** — cool architectural slate for secondary emphasis
- **line** — hairline dividers only

## Typography

Display: **Marcellus** — classical, calm, museum-plaque presence without editorial-magazine cliché. Body: **Epilogue** — modern humanist sans for UI and prose. Hierarchy via scale and weight, not all-caps paragraphs. Hero display clamp max ≤4.5rem; letter-spacing ≥ -0.02em.

## Elevation

Almost flat. Prefer border/hairline over shadow. If shadow is needed, soft ≤8px blur, never paired with a 1px decorative border on the same element. No glassmorphism by default.

## Components

- **Header**: translucent over hero photography, logo left, sparse nav, appointment CTA
- **Hero carousel**: full-bleed images, linked title + View project, prev/next + dots, pause on reduce-motion
- **Project feature**: large image plane with title/subtitle linked together; no identical icon-card grids
- **Buttons**: ink fill or ghost on dark photography; verb+object labels
- **Forms**: quiet fields, clear labels, generous hit targets

## Do's and Don'ts

**Do**
- Let project photography dominate first viewport
- Keep text↔image links intact (title and image share destination)
- Prefer generous vertical rhythm and calm motion (ease-out, opacity/transform)

**Don't**
- WordPress/Divi section stacks, template icon cards, or gold-ornament “luxury” chrome
- Cream/sand body backgrounds, gradient text, side-stripe accents, or eyebrow labels on every section
- Gate content visibility behind reveal animations
