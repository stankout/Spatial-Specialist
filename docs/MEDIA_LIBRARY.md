# Media Library and Content Studio

## Local development

Set `STUDIO_ENABLED=true` and `MEDIA_STORAGE_PROVIDER=local`, run `npm run dev`, then open `/studio`. The Studio is intentionally absent from public navigation.

Uploaded image binaries are stored in `public/uploads/`. Local metadata and slot assignments are stored in `.dev-data/media-library.json` and `.dev-data/media-assignments.json`. Both `public/uploads/` and `.dev-data/` are excluded from Git and can be inspected directly in VS Code.

The local provider accepts validated JPEG, PNG, WebP, and AVIF files up to 10 MB. File signatures, declared MIME type, extension, and practical dimensions are checked server-side. Local storage is a development convenience and is not a production media architecture.

## Assigning the homepage portrait

1. Open `/studio` and upload an approved portrait.
2. Select the image in Media Library and add approved English/Vietnamese alt text.
3. Open Page Assets → Homepage.
4. Assign the image to `homepage.heroPortrait`.
5. Refresh `/en` or `/vi`. The image uses responsive sizing, `object-fit: cover`, and its saved focal position.
6. Choose Remove to restore the existing branded placeholder.

## Assigning a homepage background

Assign an image to `homepage.heroBackground`, then choose Cover, Contained Editorial Panel, Background with Overlay, or Subtle Texture. Overlay strength is stored with the assignment. Removing the assignment restores the approved image-free homepage composition.

## Replacing images and metadata

Select any uploaded or versioned static asset to edit title, localized alt text, localized caption, and focal X/Y position. Page Assets shows every predefined slot, current preview, and assignment control. Media Library shows where each asset is used. Deleting an uploaded image removes its assignments first; versioned static files must be removed through the normal source-control workflow.

Permanent brand assets may be committed under `public/media/`, for example `public/media/brand/anh-cao-portrait.jpg`. Studio recognizes supported files recursively and represents them through the same `MediaAsset` model as uploads.

## Production provider and security requirements

Production Studio and all Studio API operations remain disabled in this phase. `STUDIO_ENABLED` alone never enables production editing. Before production writes can be enabled, implement and verify:

1. Real administrator authentication and authorization on both the page and every write API.
2. A production `MediaStorageProvider` adapter for Cloudinary, S3-compatible storage, Supabase Storage, or Vercel Blob.
3. Provider credentials stored only in server environment variables.
4. Audit logging, deletion rules, upload abuse controls, and backup/retention policy.
5. CDN/image optimization configuration and any required Next.js remote image allowlist.

Never expose an unauthenticated production upload endpoint or treat a shared URL/config flag as authentication.
