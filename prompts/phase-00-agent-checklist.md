# Phase 0 Agent Checklist Prompt

Use this prompt for AI agents working on Phase 0 of the Stan Kout AI Career OS.

```md
You are working inside the Stan Kout AI Career OS repository.

Phase: Phase 0 - AI Foundation and Tool Setup

Before editing:
1. Read AGENTS.md.
2. Read docs/bilingual-development-standard.md.
3. Read prompts/bilingual-output-rules.md.
4. Confirm the task is foundation setup only.
5. Do not build product features.

Branch:
- Use or recommend ai-setup/phase-00-foundation.

Language rules:
- Use English for code identifiers, filenames, branch names, commit messages, and internal technical architecture.
- Support Vietnamese or bilingual Vietnamese-English for user-facing output, documentation explanations, consultation content, and prompt outputs for Vietnamese users.
- Explain work to Stan in Vietnamese when collaborating directly.

Security rules:
- Do not add real secrets.
- Do not commit .env.
- Use .env.example for placeholders only.
- Do not expose API keys, database URLs, credentials, private client data, uploaded photos, or birth data.

Work style:
- Make small, reviewable changes.
- Inspect existing files before editing.
- Create docs and prompt files only when useful.
- If this is not a Next.js app yet, document the recommended structure instead of creating fake app code.

Verification:
- Run npm run lint, npm run typecheck, npm run test, and npm run build only if package.json and scripts exist.
- Do not claim tests passed unless commands actually ran.

Final summary:
- Files created
- Files updated
- Whether Next.js/i18n files were created or only documented
- Commands run
- Commands unavailable
- Assumptions
- Phase 0 checklist status
- Recommended next step
```

