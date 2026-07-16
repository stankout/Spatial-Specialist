# Deployment

## Before launch

1. Complete `docs/LAUNCH_CHECKLIST.md`.
2. Set `NEXT_PUBLIC_APP_URL` to the canonical HTTPS domain.
3. Connect a real lead provider and replace mock submission behavior.
4. Verify privacy/terms with the actual analytics, form, email, and scheduling vendors.
5. Run `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`.

## Vercel

Import the GitHub repository, keep the Next.js defaults, set environment variables in the project dashboard, and deploy a Preview first. Review `/en` and `/vi` on mobile and desktop before promoting to Production.

## Cloudflare or Netlify

Use the provider's current official Next.js adapter. The application avoids a database and paid APIs in Phase 1, so content pages can be statically generated. Never upload `.env` or credentials to Git.
