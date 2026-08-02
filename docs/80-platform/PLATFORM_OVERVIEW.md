# AC Spatial Specialist — Platform Overview

Status: CANONICAL TECHNICAL INDEX

The platform is a Next.js bilingual public website plus an owner-facing Studio. Business truth lives in canonical business documents; platform code implements approved behavior and reports its current state through [CURRENT_STATE](../00-core/CURRENT_STATE.md).

## Public platform

- Locale routes live under `src/app/[locale]` with EN/VI parity.
- Public service eligibility is centralized in `src/data/site.config.ts`.
- Public content and sitemap output filter by Published state and public service eligibility.
- DEAL and SPACE are active. CONDITION is fail-closed and publicly hidden.

## Studio

Studio includes content, media, Page Assets, embeds, visuals, pages, social, catalog/commerce foundations, operations, settings, users/roles, and readiness views. Local editing uses gitignored development persistence and is not production administration.

## Detailed implementation references

- [Platform V1](../PLATFORM_V1.md)
- [Studio Administration](../STUDIO_ADMIN.md)
- [Content Studio](../CONTENT_STUDIO.md)
- [Media Library](../MEDIA_LIBRARY.md) and [Media Ingestion](../MEDIA_INGESTION.md)
- [Visual Director](../VISUAL_DIRECTOR.md)
- [Living Visual Engine](../LIVING_VISUAL_ENGINE.md)
- [Motion Media System](../MOTION_MEDIA_SYSTEM.md)
- [Public Art Direction](../PUBLIC_ART_DIRECTION.md)
- [Social Channels](../SOCIAL_CHANNELS.md)
- [Users, Roles, and Permissions](../USER_ROLES.md)
- [Leads and Forms](../LEADS_AND_FORMS.md)
- [Deployment](../DEPLOYMENT.md) and [Launch Checklist](../LAUNCH_CHECKLIST.md)

See [Publishing Model](PUBLISHING_MODEL.md), [Security and Access](SECURITY_AND_ACCESS.md), and [Production Readiness](PRODUCTION_READINESS.md) for the current control boundaries.
