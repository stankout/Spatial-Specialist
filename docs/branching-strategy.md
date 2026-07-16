# Branching Strategy

This project uses small, reviewable branches. `main` should stay production-ready.

## Core Rules

- Do not commit directly to `main`.
- Use a feature or setup branch for every task.
- Use career phase branches for large roadmap stages.
- Use short-lived branches for focused work.
- Use pull requests for review when GitHub is available.
- Keep branch names in English.

## Branch Naming

```text
career/phase-XX-name
ai-setup/phase-XX-name
feature/short-feature-name
fix/short-bug-name
docs/short-doc-name
test/short-test-name
chore/short-maintenance-name
security/short-security-name
```

## Required Phase 0 Branch

```text
ai-setup/phase-00-foundation
```

Use this branch for initial project foundation work: docs, env template, branch rules, Notion workflow, and setup checklists.

## Examples

```text
ai-setup/phase-00-foundation
career/phase-01-real-estate-license
feature/psi-study-tracker
docs/real-estate-glossary
security/env-handling
```

## When To Use Each Prefix

| Prefix | Use For | Example |
| --- | --- | --- |
| `ai-setup/` | AI workflow and foundation setup | `ai-setup/phase-00-foundation` |
| `career/` | Large career roadmap phases | `career/phase-01-real-estate-license` |
| `feature/` | Product features | `feature/psi-study-tracker` |
| `fix/` | Bug fixes | `fix/vercel-build-error` |
| `docs/` | Documentation-only updates | `docs/real-estate-glossary` |
| `test/` | Test-only work | `test/bazi-known-dates` |
| `chore/` | Maintenance | `chore/env-template` |
| `security/` | Secrets, auth, privacy, and permission work | `security/env-handling` |

## Agent Workflow

1. Read `AGENTS.md`.
2. Identify the Career Phase.
3. Choose the correct branch prefix.
4. Make the smallest complete change.
5. Run available verification commands.
6. Summarize files changed, assumptions, and unresolved questions.

