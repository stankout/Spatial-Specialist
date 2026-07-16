# Anh Cao × Spatial Specialist LLC

Production-ready bilingual website foundation for three independent property service lines:

- Real Estate
- Home Inspection education and future services
- Spatial & Feng Shui Consultation

The product follows the strategic idea **“One property. Three perspectives.”** English is the default locale at `/en`; Vietnamese is available at `/vi` with equivalent routes.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`; the root redirects to `/en`.

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Owner configuration

Business identity and compliance-sensitive claims live in `src/data/`. Credentials default to disabled and render only when both eligibility flags and required data are present. Forms use mock mode until a provider adapter is connected.

Read `docs/LAUNCH_CHECKLIST.md` before publishing. Never add secrets to the repository.
