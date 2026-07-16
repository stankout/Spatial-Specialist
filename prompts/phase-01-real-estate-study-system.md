# Phase 1: Real Estate Licensing And Study System

Use this prompt only after Phase 0 is confirmed PASS.

Do not execute Phase 1 until the Phase 0 readiness report has been reviewed and accepted.

## Phase 1 Name

`Real Estate Licensing And Study System`

## Goal

Build a bilingual study system for Georgia Real Estate licensing.

## Scope

- PSI topic tracker
- Georgia State Exam tracker
- English-Vietnamese real estate glossary
- Flashcard workflow
- Course progress tracker
- Exam readiness checklist
- Practice question generator plan
- Study note templates

## Do Not Do Yet

- Do not provide legal advice as final authority.
- Do not connect paid APIs.
- Do not create user accounts unless scoped.
- Do not build production database until architecture is approved.
- Do not invent Georgia law facts without source verification.

## Agent Roles

- Real Estate Agent
- Docs Agent
- QA Agent
- AI Agent Engineer
- Frontend Agent if UI is scoped later
- Backend Agent if data persistence is scoped later

## Bilingual Rule

Use English first for real estate terms, then Vietnamese explanation.

Example:

```text
Promissory Note (giấy hứa trả nợ): tài liệu trong đó borrower cam kết trả khoản vay cho lender.
```

## Required First Deliverable For Phase 1

Before coding, create:

- `docs/phase-01-real-estate-study-system-plan.md`

This plan must include:

- Objectives
- User stories
- Data model draft
- Notion workflow
- Glossary format
- Flashcard format
- Practice exam format
- Acceptance criteria
- Risks and assumptions

## Verification

Run verification commands only if the repo supports them:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

If no `package.json` or scripts exist, report that commands are unavailable.

## Final Summary Required

After any Phase 1 planning work, summarize:

- Files created
- Files updated
- Assumptions
- Source verification needs
- Commands run
- Commands unavailable
- Recommended next step

