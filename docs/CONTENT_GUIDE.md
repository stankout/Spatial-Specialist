# Content Guide

## Where content lives

Phase 1 uses typed repository content in `src/lib/content.ts`. Every item includes locale, dates, author, service line, taxonomy, body, CTA, related content, and SEO fields. Current entries are explicitly marked `demo: true`.

## Add a guide

1. Add an English item to `guides` with a unique kebab-case slug.
2. Add the approved Vietnamese title and body in `contentForLocale`.
3. Keep observable facts separate from interpretation and advice.
4. Link only to existing internal routes.
5. Run lint, typecheck, tests, and build.

Never invent client results, listings, credentials, market statistics, or repair prices. Owner biography copy must remain clearly provisional until approved.

## Replace images

Use licensed WebP or AVIF assets in `public/`. Follow `public/placeholders/README.md`, write descriptive alt text, and use `next/image` when real raster images are introduced.
