<!-- DESIGN SYSTEM -->
---
name: Ambience Home Design
description: Marbella quiet-luxury interior architecture
colors:
  bg: "oklch(0.975 0.008 85)"
  surface: "oklch(0.945 0.01 85)"
  ink: "oklch(0.24 0.018 55)"
  muted: "oklch(0.5 0.014 55)"
  accent: "oklch(0.44 0.07 45)"
  void: "oklch(0.19 0.015 55)"
  on-void: "oklch(0.965 0.006 85)"
typography:
  display:
    fontFamily: "Tenor Sans, system-ui, sans-serif"
  body:
    fontFamily: "Epilogue, system-ui, sans-serif"
motion:
  ease-out: "cubic-bezier(0.16, 1, 0.3, 1)"
  page-veil-in: "340ms"
  page-veil-out: "480ms"
  page-veil: "820ms"
  image-wipe: "1250ms"
  text-reveal: "1200ms"
  hero-wipe: "850ms"
  loader-exit: "1550ms"
---

## Overview

Midday Marbella showroom: warm limestone planes, charcoal type, bronze accent used sparingly. Photography leads; UI is a quiet frame. Logo unchanged.

## Color strategy

Restrained: tinted warm neutrals + bronze accent under 10% of surface area.

## Typography

Tenor Sans (display) + Epilogue (body). Fluid scale via clamp. Hierarchy through scale and weight, not ornament.

## Motion system

Unhurried showroom pace. Exponential ease-out only (`cubic-bezier(0.16, 1, 0.3, 1)`). Exits ~72% of enter duration so handoffs do not stack.

| Layer | Behavior | Duration |
|---|---|---|
| Site loader | Logo hold + line draw, then fade out on first session visit | hold 1.2s, exit 1.55s |
| Page transition | Linen veil covers on click (transform), holds through nav, eases out when ready | in 0.34s, out 0.48s |
| Hero | Clip wipe LTR/RTL + slow Ken Burns on active slide | wipe 0.85s, title 0.95s, dwell ~9s |
| Images | Clip-path wipe left-to-right + subtle scale settle (no blur) | 1.25s |
| Text | Opacity + x + blur→sharp LTR, staggered; blur cleared after settle | title 1.2s, body 1.25s |
| Blocks | Opacity + x only (no filter on large surfaces) | 1.2s |
| UI | Button hover lift, nav underline draw, mobile menu | 0.22–0.55s |

All motion honors `prefers-reduced-motion` (instant content, no veil/loader choreography).

## Logo

Header mark at 70% of previous size: `h-[1.4rem]` mobile, `h-[1.575rem]` desktop.
