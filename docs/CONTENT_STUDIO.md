# Content Studio

Content Studio lets the owner create structured website content without editing TypeScript. In local development, set `STUDIO_ENABLED=true`, run `npm run dev`, and open `/studio/content`.

## Creating content

Select **New Content**, choose a type and the DEAL, CONDITION, SPACE, or GENERAL category, then add one or both locales. English and Vietnamese are independent; Studio never translates automatically. Configure the slug before publication because editing a title does not silently change an existing URL.

The editor supports heading, text, image, embed, gallery, quote, callout, CTA, and divider blocks. Blocks can be moved up/down, duplicated, edited, or removed. Text supports paragraphs, bullet/numbered lists and the safe notation `**bold**`, `_italic_`, and `[label](https://example.com)`. Raw HTML and JavaScript are not supported.

Image and gallery blocks select existing Media Library assets, preserving alt text and focal points. Embed blocks select saved Embed Library records and reuse the safe provider renderer. Add provider URLs through `/studio/embeds`; do not paste iframe code into content.

## Video publishing

1. Add and save the approved YouTube URL in Embed Library.
2. Create a **Video** content entry.
3. Select the saved embed and an optional Media Library thumbnail.
4. Add title, excerpt, approved transcript, service category, tags, CTA, and SEO.
5. Save as draft, preview, select the locale to publish, then publish.

Never fabricate transcripts. Published videos appear at `/{locale}/videos` and `/{locale}/videos/{slug}`.

## Categories

- **DEAL:** Real Estate videos, articles, guides, and property analysis.
- **CONDITION:** Inspection Education such as Roof, Electrical, Plumbing, HVAC, Foundation, Moisture, Attic, Crawlspace, Exterior, Drainage, Safety, and New Construction.
- **SPACE:** Spatial Analysis such as Orientation, Layout, Circulation, Residential, Property Selection, Business Space, Spatial Organization, and Traditional Feng Shui Education. Keep practical observations separate from optional traditional interpretation.
- **GENERAL:** brand-wide education not limited to one service.

Property Analysis may record a property type, generalized location, and analysis lenses. Do not store or publish an exact private client address.

## Lifecycle and preview

- **Draft:** editable and excluded from public pages, service feeds, related content, and sitemap.
- **Published:** only selected locales are public. A locale with no content is never rendered as an empty translation.
- **Unpublish:** returns the entry to draft while preserving its content.
- **Archived:** retained locally but inaccessible publicly.

Draft preview is development-only at `/studio/content/preview/{id}?locale=en`. The preview URL does not make the entry public.

## SEO and CTAs

Each locale has SEO title, description, canonical override, and index/noindex controls. Public implementations can conservatively fall back to the approved title, excerpt, and featured image. CTA presets use centralized routes for Real Estate, Inspection, Spatial Consultation, and Contact. Custom CTAs accept only internal localized paths.

## Local data and production requirements

Development entries are stored as one atomic JSON file per entry in:

```text
.dev-data/content/
```

The directory is gitignored. Inspect it for troubleshooting, but use Studio—not manual JSON editing—for normal work.

`STUDIO_ENABLED=true` is not authentication. Production Studio remains disabled until the project has real authentication, owner authorization, a database/CMS provider, production media storage, backups, audit logging, and an intentional privacy/retention policy. The local filesystem repository is a development provider, not a production dependency.
