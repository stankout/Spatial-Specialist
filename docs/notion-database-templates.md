# Notion Database Templates

Notion is the command center for planning and coordination. It is not the production database.

Use these database templates to organize the Stan Kout AI Career OS.

## 1. Roadmap

Purpose: track long-term phases, major milestones, and strategic direction.

Recommended properties:

- Name
- Phase
- Status: Idea / Planned / Building / Testing / Done
- Priority: Low / Medium / High / Critical
- Related Tasks
- Related GitHub Repo
- Notes

Example rows:

| Name | Phase | Status | Priority | Notes |
| --- | --- | --- | --- | --- |
| Phase 0 Foundation | Phase 0 | Building | Critical | Setup docs, env, branch rules, and workflow standards. |
| Real Estate Study System | Phase 1 | Planned | High | Georgia licensing tracker and bilingual glossary. |
| Feng Shui Spatial MVP | Phase 3 | Planned | High | Intake, photo review, symbolic interpretation, and practical recommendations. |

## 2. Tasks

Purpose: manage implementation work and agent handoffs.

Recommended properties:

- Task Name
- Career Phase
- Status: Backlog / Ready / In Progress / Review / Done
- Type: Feature / Bug / Research / Refactor / Prompt / UI / Security / Docs
- Priority
- Agent
- GitHub Branch
- Pull Request URL
- Vercel Preview URL
- Spec
- Test Result
- Unresolved Questions

Example rows:

| Task Name | Career Phase | Status | Type | Agent | GitHub Branch |
| --- | --- | --- | --- | --- | --- |
| Create Phase 0 foundation docs | Phase 0 | In Progress | Docs | Docs Agent | `ai-setup/phase-00-foundation` |
| Add bilingual output prompt rules | Phase 0 | Review | Prompt | AI Agent Engineer | `docs/bilingual-rules` |
| Verify no secrets in env template | Phase 0 | Ready | Security | Security Agent | `security/env-handling` |

## 3. Prompt Library

Purpose: store reusable prompts for AI agents and product workflows.

Recommended properties:

- Prompt Name
- Agent Type
- Use Case
- Version
- Prompt Text
- Expected Output
- Notes

Example rows:

| Prompt Name | Agent Type | Use Case | Version | Expected Output |
| --- | --- | --- | --- | --- |
| Phase 0 Agent Checklist | Docs Agent | Setup workflow | 1.0 | Small setup changes with summary and verification notes. |
| Bilingual Output Rules | AI Agent Engineer | Vietnamese user output | 1.0 | Clear Vietnamese or bilingual response with uncertainty rules. |
| Real Estate Glossary Writer | Real Estate Agent | Study notes | 0.1 | English term with Vietnamese explanation. |

## 4. Knowledge Base

Purpose: organize domain research, source notes, and product rules.

Recommended categories:

- Feng Shui Rules
- Bazi Rules
- Tu Vi Rules
- I Ching Rules
- Real Estate Rules
- Trading Core Rules
- UX Writing Rules
- Symbolism Notes
- Source Notes

Recommended properties:

- Title
- Category
- Source Type
- Source Reference
- Summary
- Product Rule
- Confidence
- Related Phase
- Last Reviewed

Example rows:

| Title | Category | Source Type | Product Rule | Confidence |
| --- | --- | --- | --- | --- |
| Feng Shui photo output structure | Feng Shui Rules | User Core Rule | Separate visible facts, symbolic interpretation, practical fixes, and confidence. | High |
| Real estate compliance reminder | Real Estate Rules | Workflow Rule | Recommend verification with broker, attorney, lender, CPA, inspector, or local authority when needed. | High |
| Bazi calculation assumptions | Bazi Rules | Product Rule | State calendar, timezone, birth time, and day-boundary assumptions. | High |

## 5. Decision Log

Purpose: record important choices so future agents understand why the system is built a certain way.

Recommended properties:

- Decision
- Date
- Context
- Options Considered
- Final Choice
- Reason
- Related Task
- Related PR

Example rows:

| Decision | Date | Context | Final Choice | Reason |
| --- | --- | --- | --- | --- |
| Use English for code identifiers | 2026-06-16 | Bilingual product needs | English internal symbols, Vietnamese user-facing text | Improves compatibility with tools and agents while supporting Vietnamese users. |
| Do not create fake Next.js i18n files yet | 2026-06-16 | Repo has no app scaffold | Document structure only | Avoids creating unused code before framework exists. |
| Treat Notion as command center only | 2026-06-16 | Planning vs production data | Use Notion for planning, database for production | Protects private client data and avoids weak production architecture. |

