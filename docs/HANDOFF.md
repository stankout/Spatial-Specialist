# AC Spatial Specialist Platform Handoff

> Legacy technical handoff retained for implementation detail. The canonical agent entry point is [AI_HANDOFF.md](00-core/AI_HANDOFF.md), and current implementation reality is [CURRENT_STATE.md](00-core/CURRENT_STATE.md).

## System map

- **Public website:** localized Next.js App Router routes under `src/app/[locale]`.
- **Studio:** owner and future staff control plane under `src/app/(root)/studio`.
- **Domain modules:** provider-neutral logic under `src/lib`.
- **Canonical configuration:** business, service, credential, compliance, platform, and social defaults under `src/data`.
- **Hosting:** intended for Vercel after environment and production adapters are configured.
- **Development persistence:** gitignored `.dev-data/`; never treat it as a production database or backup.

## Local setup

1. Clone the repository.
2. Read `AGENTS.md`, this document, and `docs/STUDIO_ADMIN.md`.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`; add only values obtained from the owner/provider portals.
5. Run `npm run dev`.
6. Before review, run lint, typecheck, tests, and production build.

Do not commit `.env.local`, `.dev-data/`, uploaded client media, API keys, webhook secrets, passwords, or private client records.

## Production providers still required

- Authentication/session provider with MFA, invitations, password recovery, and server session validation.
- Durable database/repository for Studio settings, content, operations, users, and audit events.
- Production object storage for uploaded media.
- Transactional email and scheduling integrations.
- Payment/webhook provider before paid commerce is enabled.
- Digital delivery and print-on-demand providers only if those features are activated.
- Backup/restore provider and tested recovery procedure.
- Production audit persistence and retention policy.
- Optional social publishing API for future automated posting; public profile links do not depend on it.

## Deployment and backup

Use preview deployments and owner review before production. Environment values belong in the hosting provider, not source files. Establish database and media backups before production editing is enabled, document recovery ownership, and test restoration rather than assuming a backup exists.

## Roles and ownership

The owner controls user administration, production credentials, payments, and destructive provider changes. Developers manage technical integration and deployment only when explicitly authorized. Managers run normal operations. Content editors prepare content/media without elevated publication or infrastructure access. See `docs/USER_ROLES.md` for the capability source of truth.
