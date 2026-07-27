# Studio Visual Director

Studio Visual Director is the owner-facing control layer for the approved cyber-spatial brand system. It changes semantic presentation settings without exposing arbitrary CSS, HTML, JavaScript, URLs, file paths, or class names.

## Open the director

1. Run `npm run dev`.
2. Open `/studio/visuals`.
3. Choose a page, optional locale scope, and optional section.
4. Adjust semantic controls or apply a small preset.
5. Select **Save draft**.
6. Open the draft preview link. Draft preview is available only in local development.
7. Select **Publish** only after review.

Public pages read the published snapshot. Saving a draft does not change the normal public route. The `?visualPreview=1` query reads the draft only when `NODE_ENV` is not `production`.

## Inheritance model

Settings resolve in this order:

1. Baseline V1
2. Global settings
3. Shared page override
4. Locale page override (`en` or `vi`)
5. Shared section override
6. Locale section override

If Vietnamese has no override, it inherits the shared page setting. Content and translation data are not stored in Visual Director.

## Semantic controls

- **Backdrop:** enabled state, primary and ambient opacity, brightness, saturation, contrast, blur, overlay, alignment, and restrained pan intensity.
- **Surface:** clear, soft, light, dark, or glass; opacity, blur, border, tint, and shadow strength.
- **Typography:** display/body scale, heading weight, UI tracking, and automatic/light/dark text tone.
- **Media:** source/contain/portrait/editorial/background intent, focal point, frame, and corner treatment.
- **Footer:** dark surface treatment, alignment, accent, typography character, dividers, panel opacity, and blur.

All numeric values have bounded ranges. Persisted data is validated with strict schemas and enum allowlists.

## Media safety rules

Visual Director does not replace the shared media-role renderer:

- Primary Story Backdrop media stays `contain`.
- Ambient Story Backdrop media stays `cover`.
- Compass portraits, compass diagrams, documents, references, and transparent PNG/logo assets stay proportional and cannot be cropped by a visual preset.
- Controlled `cover` is allowed only for an explicit portrait role in an explicit portrait slot, or for a public background slot.

These constraints protect the meaning of source media while still allowing surface and backdrop art direction.

## Draft, publish, and storage

Local development state is stored at:

```text
.dev-data/visual-director.json
```

The `.dev-data/` directory is gitignored. Local Visual Director writes are disabled in production by the existing Studio access guard. The current implementation intentionally follows the existing local Studio architecture; a future authenticated production Studio should replace this storage adapter with a durable production provider.

## Reset behavior

- **Reset section** removes only the selected section override.
- **Reset page** removes shared and locale overrides for the selected page.
- **Baseline V1** resets the complete draft and requires typing `RESET VISUALS`.
- Publishing is a separate action and copies a validated draft snapshot into the published state.

## Presets

Presets are small semantic starting points, not templates:

- `editorial-clear`
- `cyber-glass`
- `immersive-backdrop`
- `high-contrast`
- `service-default`

They can be refined after application and do not insert content, media, credentials, or claims.

## Owner toolbar

The development owner toolbar exposes Studio, Content, Media, Visual, and Edit This Page shortcuts. It remains governed by the existing development/`NEXT_PUBLIC_STUDIO_SHORTCUT` visibility rule and is not a substitute for production authentication.

## Security and production notes

- No arbitrary CSS, HTML, scripts, URLs, paths, or class names are accepted.
- Unknown properties and unknown section identifiers are rejected.
- Public rendering uses validated server-loaded published configuration.
- Baseline V1 is returned when no valid local state exists.
- Canonical business and footer contact details continue to come from `site.config.ts`; Visual Director stores presentation only.
- Credentials, compliance flags, routing, forms, media ingestion, content data, and localization content are outside this system.
