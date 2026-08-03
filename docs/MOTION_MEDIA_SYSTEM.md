# AC Motion Media System

## Purpose

Phase 2 extends the existing Media Library, Page Assets, Story Backdrop, and Living Visual Engine into one governed media system. It does not create a parallel CMS. Owner media and AC-native procedural scenes use the same asset model, assignment workflow, Draft/Published boundary, presentation contract, and public renderer.

## Architecture audit

Before Phase 2, assets had no explicit source discriminator; role names mixed content intent with implementation; slot compatibility was not validated; video had no readiness/poster policy; several public components decided `object-fit` independently; and Visual Director could not select a code-native scene. Upload and approval governance was already strong and remains intact.

The completed architecture is:

```text
Media source
  -> MediaAsset taxonomy + owner review
  -> Page Asset slot compatibility
  -> Draft assignment + presentation contract
  -> owner Publish action
  -> shared MotionMediaRenderer
  -> public EN/VI route
```

## Source taxonomy

- `uploaded-image`: owner imagery; intrinsic ratio preserved by default.
- `uploaded-video`: owner video; metadata, readiness, poster, and playback policy are explicit.
- `procedural-scene`: deterministic AC-native SVG/CSS scene from the scene registry.
- `embed`: governed external embed source; remains in the Embed system.
- `document`: PDF/reference asset; always presented proportionally.

Legacy assets are migrated at parse time by MIME type/provider, so existing local metadata does not need a destructive rewrite.

## Semantic media roles

New roles include ambient/background/content video, owner/service portrait, property/editorial/supporting imagery, diagram, document/reference, logo, social media, Story Backdrop, decorative motion, and HUD overlay. Existing legacy roles remain accepted for backward compatibility. Role is semantic intent; slot is placement; presentation is behavior. These are deliberately separate.

## Presentation contract

The shared resolver in `src/lib/media/presentation.ts` decides:

- contain/cover/source fit;
- whether crop is allowed;
- focal/alignment behavior;
- slot/background behavior;
- opacity, brightness, contrast, saturation, blur, tint, and blend mode;
- autoplay, loop, mute, inline playback, preload, playback rate, poster, mobile hiding, and reduced-motion fallback.

Documents, diagrams, logos, transparent PNGs, compass portraits, and general/reference media never become accidental `cover` crops. Cover is permitted only for a compatible portrait/background contract.

## Slot contracts

`src/lib/media/slot-contracts.ts` is the single compatibility table. Each Page Asset slot declares accepted source types, recommended roles, crop permission, aspect-ratio guidance, and background behavior. Both the Studio picker and server-side assignment save validate this contract. UI filtering therefore cannot be bypassed by an API request.

## AC-native procedural scenes

The scene registry lives in `src/data/procedural-scenes.json`; rendering is deterministic and uses no random values at hydration time.

| Scene | Intended use |
| --- | --- |
| AC Ambient Intelligence | restrained brand/home/about atmosphere |
| Market Network | DEAL/property/market intelligence |
| Spatial Field | SPACE/orientation/layered analysis |
| Global Intelligence | research and global context |
| Security Grid | CONDITION/technical integrity fallback; service remains publicly gated |
| Cyber Archive | articles, videos, and guides archive atmosphere |
| Astral Tech | optional symbolic-tech layer, not mystical claims |
| Signal Terminal | search and signal-oriented utility context |

Scenes are registered as reviewable media assets. They are owner-created and decorative, but are not automatically marked approved for public assignment. Visual Director page defaults may render them as the low-intensity living environment; owner Page Asset publication remains a separate explicit decision.

## Motion and accessibility policy

- Decorative background video may autoplay only when muted, looping, and `playsInline`.
- Editorial/content video never autoplays and keeps user controls.
- Offscreen media and media in a hidden browser tab pause.
- Reduced-motion uses a static poster when available or hides decorative motion gracefully.
- Mobile can suppress decorative video while retaining content and page meaning.
- Procedural scenes reduce node/line density on mobile and stop animation under `prefers-reduced-motion`.
- Decorative scenes are hidden from assistive technology; meaningful media uses owner-approved alt text.

## Story Backdrop

Story Backdrop still has desktop/mobile assignments, one controlled full-page journey, Draft/Published isolation, and existing pan behavior for tall imagery. Procedural scenes can now serve as a stable backdrop layer. Uploaded motion does not replace the primary readable content surface, and public media is still gated by rights/privacy/public-use approval.

## Studio responsibilities

- Media Inbox discovers source files and metadata. Owner decides import role and service lens. Import never publishes.
- Media Library owns asset identity, title, alt/caption, semantic role, privacy, rights, readiness, and approval.
- Page Assets owns slot assignment and the fit/playback/treatment contract. It validates compatibility and publishes assignments.
- Visual Director owns global/page/locale/section atmosphere and AC procedural fallback selection. It does not silently replace Page Asset assignments.
- Public renderer consumes only approved Published assignment state, plus the governed Living Visual defaults.

## Public renderer

`MotionMediaRenderer` is used by hero/background/portrait assignments, managed media sections, SPACE compass media, About media, editorial content blocks and galleries, and procedural scenes. It delegates to the shared image, video, document, or scene renderer while using one resolved contract.

## Performance policy

- No video preloading beyond metadata for decorative media; content video defaults to `none`.
- No second animation runtime or canvas loop was added.
- Scene geometry is deterministic, small, and CSS-driven.
- Offscreen and background-tab pausing reduces CPU/GPU work.
- Mobile density is lower than desktop.
- Raster quality labels report source suitability; they never imply upscaling.
- Procedural scenes are resolution-independent.

## HD, 2K, and 4K strategy

Uploaded media is never artificially enlarged. Studio labels source resolution as below-web, web, large-display, or 4K ready. Procedural scenes can be rendered at 1080×1920, 1920×1080, 2560×1440, 2160×3840, or 3840×2160 without source upscaling because their geometry is resolution-independent.

List scenes and create a deterministic render plan:

```bash
npm run media:scene:list
npm run media:scene:render -- market-network 4k 12 30
```

The render command writes a plan to `.dev-data/scene-renders/`; it does not pretend to create a video. A browser frame-capture adapter and FFmpeg are required for encoded exports.

## Optional FFmpeg optimization

FFmpeg is intentionally optional and is not a runtime/build dependency. Optimization always creates a delivery derivative at a path that is different from the source master. The source master is never overwritten.

Choose the delivery purpose explicitly:

```bash
npm run media:optimize -- --profile background input.mov public/media/background.mp4
npm run media:optimize -- --profile editorial input.mov public/media/editorial.mp4
npm run media:optimize -- --profile muted-editorial input.mov public/media/editorial-muted.mp4
```

The profiles are governed contracts:

- `background` creates a `background-delivery` derivative. It removes audio, uses the explicit `privacy-safe` delivery metadata policy by default, and still requires a separately approved poster where the slot calls for one.
- `editorial` creates an `editorial-delivery` derivative. It preserves audio and metadata by default so meaningful editorial media behavior is not lost.
- `muted-editorial` creates a `muted-editorial-delivery` derivative. Audio is removed only because the muted purpose was selected explicitly; metadata remains preserved by default.

`--metadata privacy-safe` may be selected explicitly for an editorial derivative when delivery metadata has been reviewed and should be removed for privacy. The optimizer reports the actual policy and never claims metadata preservation when stripping was selected. Unknown profiles and metadata policies fail clearly. Input and output paths must differ, and the output must be MP4.

Every profile adds fast-start behavior, preserves source aspect ratio, caps the long edge at Full HD, and never enlarges the source. Use `--dry-run` to inspect the exact contract and FFmpeg argument plan without creating an output. When FFmpeg or ffprobe is unavailable, a real optimization reports an actionable dependency message and leaves the app unaffected.

## Production storage boundary

Local uploads, inbox data, assignments, metadata overrides, and render plans live under gitignored local development storage. Production write support still requires authenticated Studio access, a durable provider such as Cloudinary/S3/Supabase/Vercel Blob, audit logs, backup/retention, CDN policy, and provider secrets stored only in server environment variables.

## Governance retained

Draft and Published data remain separate; approval gates remain server-side; public pages never expose review/private/unapproved media; EN/VI share equivalent slots; Story Backdrop is preserved; and CONDITION stays hidden from public navigation/routing until explicitly enabled.
