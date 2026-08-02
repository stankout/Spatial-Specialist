# Anh Cao × Spatial Specialist LLC

Local bilingual website and business-platform foundation for two active public service perspectives:

- DEAL / Real Estate
- SPACE / Spatial Consultation

CONDITION / Home Inspection remains defined internally but inactive and publicly hidden. English is the default locale at `/en`; Vietnamese is available at `/vi` with equivalent routes.

Start with [AC Knowledge Architecture](docs/00-core/START_HERE.md). Current implementation reality is maintained in [CURRENT_STATE](docs/00-core/CURRENT_STATE.md); roadmap items and Workbench material are not approvals.

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
