# AC Spatial Specialist — Security and Access

Status: CANONICAL PLATFORM SUMMARY

- Organizational **Role** and software **Capability** are different. The centralized capability matrix is implemented in `src/lib/governance/permissions.ts`.
- Server-side authorization checks capabilities; browser state, query strings, local storage, and role previews do not grant authority.
- Development has a local owner actor for local review only.
- Production authentication has no installed production session adapter and fails closed.
- Local `.dev-data/` and `public/uploads/` persistence is development-only and gitignored.
- Secrets belong in environment/provider configuration, never documentation, source, Studio fields, or logs.
- Production requires durable storage, scoped access, backups/recovery, audit retention, and privacy/terms review.

See [Users, Roles, and Permissions](../USER_ROLES.md), [Studio Administration](../STUDIO_ADMIN.md), and [Production Readiness](PRODUCTION_READINESS.md).
