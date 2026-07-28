# Users, Roles, and Permissions

The centralized permission source is `src/lib/governance/permissions.ts`. Components should ask whether an actor has a capability through `can(actor, capability)`; they must not scatter role-name checks through the UI.

## Roles

- **OWNER:** full business governance, users, high-risk settings, providers, payments, secrets, and deployment authority.
- **DEVELOPER:** technical architecture, integrations, deployment, and broad Studio work. User ownership and production secrets are not automatic.
- **MANAGER:** daily publishing, media approval, pages, visuals, social, catalog, leads, bookings, customers, analytics, and read-only payment visibility.
- **CONTENT_EDITOR:** content and media drafting/upload work without publication, deletion, user administration, providers, payments, or deployment authority.

The effective matrix is rendered from the same definitions at `/studio/users`; it is not a second copy of permission truth.

## Production security principles

- Authorization is validated on the server.
- Client state, local storage, query strings, and form fields never establish authority.
- Production fails closed until a real authentication provider and session adapter exist.
- Naming an authentication provider in an environment variable is not proof of a working integration.
- Passwords and invitations must eventually belong to the selected identity provider, never repository JSON.
- High-risk operations require explicit capabilities such as `users.manage`, `secrets.manage`, `deployment.manage`, or `payments.manage`.

The current local owner actor exists only outside production. The role simulator is for UX review and cannot change the server actor.

