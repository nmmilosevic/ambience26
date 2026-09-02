# Ambience Home Design (ambience26)

Quiet-luxury redesign of [ambiencehomedesign.com](https://ambiencehomedesign.com/) — elegant, modern, photography-led portfolio for Andrea Böck’s Marbella studio.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Fonts: Tenor Sans (display/titles) + Epilogue (body)
- Local media in `public/media/` (downloaded from the live WordPress CDN)
- Design context: `PRODUCT.md`, `DESIGN.md`

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content & media

Extracted site map and project listings live in `content-extract/`. App content modules are in `src/content/`.

```bash
node scripts/scrape-save.mjs      # refresh project listings from live site
node scripts/download-media.mjs   # download all media into public/media
node scripts/rewrite-media-paths.mjs  # point src/content at local /media paths
```

## Design system

Tokens, motion curves, bans, and component rules live in `DESIGN.md` and are mirrored as CSS variables in `src/app/globals.css`.
