# Vercel And GitHub Setup

This document explains the setup flow for connecting GitHub and Vercel for the Stan Kout AI Career OS.

## 1. Create The GitHub Repository

Create a GitHub repository for the project and push the local files.

Recommended initial branch:

```text
ai-setup/phase-00-foundation
```

Keep `main` production-ready. Use pull requests to merge reviewed work.

## 2. Push Code To GitHub

Typical flow after Git is available:

```bash
git checkout -b ai-setup/phase-00-foundation
git add .
git commit -m "Add phase 0 foundation scaffold"
git push origin ai-setup/phase-00-foundation
```

Do not commit `.env` or real secrets.

## 3. Import The Repo Into Vercel

After a Next.js app exists:

1. Open Vercel.
2. Import the GitHub repository.
3. Select the project framework.
4. Confirm build settings.
5. Add required environment variables.
6. Deploy a preview build.

If the repo does not contain an app yet, wait to import into Vercel until the app scaffold exists.

## 4. Add Environment Variables

Use `.env.example` as the reference list. Add real values only in local `.env` files or Vercel's environment settings.

Required placeholders:

```text
OPENAI_API_KEY=
DATABASE_URL=
NOTION_API_KEY=
NOTION_TASKS_DATABASE_ID=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_DEFAULT_LOCALE=vi
NEXT_PUBLIC_SUPPORTED_LOCALES=vi,en
```

Never paste real API keys into docs, prompts, source code, GitHub issues, or Notion pages.

## 5. Use Preview Deployments

Every pull request should produce a Vercel Preview Deployment once the app exists.

Review the preview for:

- Build success.
- Correct UI behavior.
- No exposed secrets.
- Vietnamese/bilingual labels where relevant.
- No product feature regressions.

## 6. Merge To Production Only After Review

Merge to `main` only after:

- The pull request is reviewed.
- Available checks pass.
- Vercel preview is reviewed.
- Docs are updated.
- Notion task status is updated.
- Important decisions are recorded in Decision Log.

After merge, Vercel can deploy production from `main`.

