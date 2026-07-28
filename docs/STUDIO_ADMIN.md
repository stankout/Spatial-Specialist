# AC Studio Administration

AC Studio is the owner-operated control plane for the public website and business platform. During local development it is available under `/studio` with a visibly labeled development owner session. This convenience is not production authentication.

## Access and security

1. Copy `.env.example` to `.env.local` and keep that file uncommitted.
2. Set `STUDIO_ENABLED=true` only for local development.
3. Run `npm run dev` and open `/studio`.
4. Production Studio access remains denied until a real `AuthProvider` and session adapter are implemented. Setting `STUDIO_ENABLED=true` or naming `AUTH_PROVIDER` does not bypass this requirement.

Never share environment files, provider secrets, or the owner account. The role preview on `/studio/users` changes only the permission explanation shown in the browser; protected APIs never trust it.

## Draft and Published

Owner-managed public data follows one mental model:

`Working Draft → Save Draft → Preview → Publish → Public renderer`

Saving a draft does not update the public website. Publishing is a separate server-authorized action. Local Studio records under `.dev-data/` are gitignored development persistence, not a production database.

## Work areas

- **Dashboard:** operational counts and a compact governance summary.
- **Strategy:** positioning and offer planning.
- **Content:** bilingual articles, guides, videos, and portfolio entries.
- **Media / Page Assets / Embeds:** upload, review, approve, assign, and preview owned media.
- **Visuals:** Visual Director draft and publication controls.
- **Pages:** managed page records and visibility.
- **Social:** owned social destinations, placement, order, preview, and publication.
- **Catalog / Commerce:** product records and provider-neutral commerce foundations.
- **Bookings / Leads / Customers / Analytics:** operational records and event vocabulary.
- **Settings:** canonical public identity, contact, feature gates, and provider states without secrets.
- **Users & Roles:** centralized permission model and development-only role preview.
- **Production Readiness:** conservative launch blockers and provider dependencies.

Before handing a Studio change to the owner, run `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`.

