# AC Spatial Specialist — Current State

Status: VERIFIED IMPLEMENTATION SNAPSHOT
Snapshot date: 2026-08-02
Owner: Developer / technical maintainer

This document reports what exists in the repository. It does not approve business proposals or replace domain specifications.

## Current phase

- **Current documentation phase:** K0 Knowledge Migration.
- **Implemented local software baseline:** public bilingual website, AC Studio, Content Studio, Media Library, Page Assets, Embeds, Visual Director, business-platform modules, Living Visual Engine, Motion Media System, and Public Art Direction.
- **Latest documented completed public visual phase:** Phase 3 — Public Art Direction.
- **Not executed in K0:** Studio UX 2.0, Homepage redesign, Market Pulse implementation, and local visual-reference bootstrap.
- **Working tree:** intentionally dirty before K0 with uncommitted Phase 1–3 implementation and documentation work. K0 does not clean, reset, stash, rename, or discard it.

## Public services

| Perspective | Registry state | Public behavior |
|---|---|---|
| DEAL / Real Estate | ACTIVE | Public, navigable, bookable |
| SPACE / Spatial Consultation | ACTIVE | Public, navigable, bookable |
| CONDITION / Home Inspection | INACTIVE (`hidden`) | Public route fails closed; absent from navigation, booking choices, service discovery, public content, and sitemap |

The implementation source is `src/data/site.config.ts`. Route rendering, content filtering, booking/lead filtering, and sitemap generation reuse the public-service predicate.

## Publishing and approval

- Content is public only when status is `published`, the locale is listed in `publishedLocales`, and its service category is public.
- Page Manager stores CONDITION as `draft`, `internal`, with no published locale.
- Social has separate `draft` and `published` collections; public renderers read only `published`.
- Visual Director and Page Assets maintain separate Draft/Published flows.
- Media assignment does not establish approval: public assignment requires import, privacy review, acceptable rights status, and explicit public-use approval.

## Roles and access

- Organizational roles and software capabilities are separate concepts.
- The centralized software matrix defines OWNER, DEVELOPER, MANAGER, and CONTENT_EDITOR capabilities.
- Development uses a local owner actor. Role preview does not grant server authority.
- Production authentication has no installed session adapter and therefore fails closed.

## Persistence and providers

- `.dev-data/` and `public/uploads/` are development-only and gitignored.
- Local repositories are not a production database, backup, or media store.
- Production authentication, durable database/storage, reliable email, scheduling, analytics, backups, and audit persistence remain unverified or unconfigured until their adapters and environment checks pass.
- Mock payment, lead, email, POD, and local-storage behavior is development-only or disabled outside its allowed environment.
- A provider name in an environment variable is not proof of production readiness.

## Known technical debt and limitations

- Existing source and legacy docs contain visible encoding/mojibake in some strings; K0 normalizes migrated knowledge files but does not rewrite unrelated application content.
- Root-level legacy documentation predates the new authority model; compatibility notices point readers to canonical indexes while detailed technical material remains in place.
- Production repositories/providers and legal/compliance reviews are still required.
- Market Pulse methodology, formulas, weights, and labels are documented only as PROPOSED / NOT VALIDATED.

## Verification record

Verified on 2026-08-02:

- Documentation check: passed; required core files, critical invariants, duplicate canonical paths, zero-byte canonical Markdown, and relative links checked.
- Lint: passed.
- Typecheck: passed.
- Tests: 21 files passed, 150 tests passed.
- Production build: passed; 64 static pages generated during the build.
- Production HTTP QA: `/en/home-inspection` and `/vi/home-inspection` returned 404; DEAL and SPACE hubs returned 200 in both locales.
- `git diff --check`: passed; line-ending conversion warnings are informational and no whitespace error was reported.

Update this snapshot only when implementation or production readiness materially changes.
