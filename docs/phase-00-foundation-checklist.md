# Phase 0 Foundation Checklist

Phase 0 creates the operating foundation for the Stan Kout AI Career OS. It should not build product features.

## Branch

Recommended branch:

```text
ai-setup/phase-00-foundation
```

## GitHub Setup

- [ ] Create the GitHub repository.
- [ ] Add this project to the repository.
- [ ] Create or use branch `ai-setup/phase-00-foundation`.
- [ ] Keep `main` production-ready.
- [ ] Do not commit directly to `main`.
- [ ] Use pull requests for review.
- [ ] Add code-related issues to GitHub when implementation starts.

## Vercel Setup

- [ ] Create or identify the Vercel project.
- [ ] Import the GitHub repository into Vercel.
- [ ] Configure preview deployments for pull requests.
- [ ] Configure production deployment from `main`.
- [ ] Add environment variables in Vercel after real values exist.
- [ ] Review preview deployment before merging to production.

## Notion Setup

- [ ] Create Roadmap database.
- [ ] Create Tasks database.
- [ ] Create Prompt Library database.
- [ ] Create Knowledge Base database.
- [ ] Create Decision Log database.
- [ ] Add Career Phase property to task planning.
- [ ] Add GitHub Branch, PR URL, and Vercel Preview URL fields to Tasks.
- [ ] Record important architecture choices in Decision Log.

## Environment Setup

- [ ] `.env.example` exists.
- [ ] `.env.example` contains placeholder variables only.
- [ ] `.env` is not committed.
- [ ] Required placeholders exist:
  - [ ] `OPENAI_API_KEY=`
  - [ ] `DATABASE_URL=`
  - [ ] `NOTION_API_KEY=`
  - [ ] `NOTION_TASKS_DATABASE_ID=`
  - [ ] `NEXT_PUBLIC_APP_URL=`
  - [ ] `NEXT_PUBLIC_DEFAULT_LOCALE=vi`
  - [ ] `NEXT_PUBLIC_SUPPORTED_LOCALES=vi,en`

## Documentation Setup

- [ ] `AGENTS.md` exists.
- [ ] `README.md` exists.
- [ ] `docs/bilingual-development-standard.md` exists.
- [ ] `docs/branching-strategy.md` exists.
- [ ] `docs/notion-database-templates.md` exists.
- [ ] `docs/vercel-github-setup.md` exists.
- [ ] Phase 0 prompt checklist exists in `prompts/`.

## Branch Rules

- [ ] Use `ai-setup/phase-00-foundation` for Phase 0 setup.
- [ ] Use `docs/*` for documentation-only changes.
- [ ] Use `security/*` for secret handling and security review.
- [ ] Use `feature/*` only after product feature work is scoped.
- [ ] Keep branches small and reviewable.

## Security Checks

- [ ] No real secrets are committed.
- [ ] No API keys are in docs, prompts, README, or source files.
- [ ] Notion is not treated as a production database.
- [ ] Client data, uploaded photos, birth data, and private records are treated as sensitive.
- [ ] Error examples do not expose stack traces or private data.

## Phase 0 Exit Criteria

- [ ] Foundation docs are complete.
- [ ] Environment template is present and secret-free.
- [ ] Branching strategy is documented.
- [ ] Notion database templates are documented.
- [ ] Vercel/GitHub setup flow is documented.
- [ ] Future agents know to read `AGENTS.md` first.

