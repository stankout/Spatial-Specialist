# Local Media Ingestion

This workflow scans owner-supplied media without changing the original files. The default read-only source is `E:\Real Estate\Ảnh\Up lên website`; override it with `npm run media:scan -- --source "D:\quoted path"` or `MEDIA_SOURCE_DIR`.

## Commands

- `npm run media:scan` reads supported files, hashes them, extracts available image metadata, creates local previews, and writes `.dev-data/media-scan/manifest.json` plus assignment recommendations. It never changes public assignments.
- `npm run media:import` imports only high-confidence, non-private image candidates. SHA-256 checksums prevent duplicate imports.
- `npm run media:assign` fills only empty high-confidence slots. `npm run media:assign -- --replace` is the explicit replacement mode.

Generated previews live in `.dev-data/media-scan/previews/`. The readable report is `docs/generated/MEDIA_ASSIGNMENT_REPORT.md`. Both paths, local uploads, source metadata, and manifests are gitignored.

## Classification and privacy

Classification combines filename, dimensions, orientation, file size, and an owner-review rule. Low-confidence context remains `unknown`; medium-confidence media may be reviewed in Studio but is not assigned automatically. Media that may contain addresses, names, reports, account details, children, GPS metadata, or uncertain rights remains unapproved. Originals are never edited. Imported public derivatives must have GPS removed; when no safe optimization tool is available, the pipeline declines oversized JPEG/video import rather than copying it publicly.

Studio Media collections are metadata tags, not duplicate files: Ready for Website, Needs Owner Review, Portrait, Homepage, DEAL, CONDITION, SPACE, 9:16 Background, Video, and Private / Do Not Publish.

## Story backdrops

Page Assets includes optional base, mobile, and desktop Story Backdrop slots for Homepage, DEAL, CONDITION, and SPACE. Modes are disabled by default. `scroll-pan-image` maps bounded main-content scroll progress to image position with a passive, requestAnimationFrame-throttled listener. The footer remains outside the backdrop shell. Reduced-motion visitors receive a static position or no backdrop according to the assignment. Vertical assets are mobile-first; desktop falls back to the approved design unless a desktop asset is separately assigned.

Backdrop assignments include overlay strength/color, contrast mode, focal configuration, enable state, and reduced-motion fallback. Public preview links open the relevant page. No code edit is required for normal activation.

## Performance and production

Initial budgets are 500 KB for a hero image, 200 KB for a thumbnail, and 8 MB for background video. The manifest flags larger files. This local provider is for development only; production needs durable object storage, image transformation, access controls, backups, and an authenticated Studio. Background video also requires an approved H.264/WebM derivative, poster image, muted playback, and rights review before activation.
# Owner-controlled Media Inbox

`/studio/media/inbox` is the review queue for every supported file found by `npm run media:scan`. Automated context and service labels are suggestions only. The owner may import a safe item under a different media role or service lens.

Importing adds an item to the Media Library. It does not publish it. Public rendering requires all of the following:

- the asset is imported;
- `Privacy reviewed` is enabled;
- `Approved for public use` is enabled;
- the asset is assigned to a public page slot or an enabled media section.

Use `/studio/page-assets` to select one page at a time, save development draft assignments, explicitly replace occupied slots, configure story backdrops, and manage media-section order. Draft previews use `?mediaPreview=1` and never become public assignments automatically.

Rescanning merges by checksum. Owner decisions and imported asset IDs are preserved. Missing source files remain in the Inbox with `available: false`; they are not deleted from the Media Library.

## Deterministic fit and source quality

`cropMode` remains the stored asset preference. `getMediaRenderPolicy()` is the canonical role-and-slot policy used by the shared `MediaImage` component. Studio previews always preserve source composition with `contain`. Owner/page portraits may use `cover` only in explicit portrait slots. Compass portraits, diagrams, general/reference images, transparent PNGs, and background previews use `contain`. Public background slots may use slot-specific crop behavior; Story Backdrops favor full-composition display.

Quality labels describe source dimensions only and never imply upscaling: `web-ready` (1200 × 800), `large-display-ready` (2560 × 1440), `4k-ready` (3840 × 2160), or `below-web-ready`. Recommended starting sizes are 1600 × 2400 for portraits, 2560 × 1440 for section backgrounds, 2160 × 3840 for 9:16 Story Backdrops, and 1920 × 1080 for video posters.

Story Backdrop is page-level media, not a collection of section backgrounds. Assign vertical artwork to the page's Mobile Story Backdrop slot, use `scroll-pan-image`, preview the draft, and publish only after privacy and rights approval. The main-content shell owns the continuous layer; the footer remains outside it. Desktop keeps the approved design unless a separate desktop backdrop is deliberately assigned. Reduced-motion visitors receive the configured static fallback.
