# Stan Kout AI Career OS - Agent Operating Manual

This repository is the technical operating system for Stan Kout's long-term AI-assisted career, real estate, Feng Shui, symbolic knowledge, content, and client consultation workflows.

All AI coding agents, human collaborators, and future automation workflows must read this file before making changes.

## Core Mission

Stan Kout AI Career OS supports a 20-year career path that starts with Real Estate / Nha Dat, Georgia Real Estate licensing, future broker practice, real estate consultation, Feng Shui spatial organizing, and AI-assisted client intake, analysis, recommendation, document generation, and project management.

The system must eventually support these branches:

1. Real Estate / Nha Dat
2. Feng Shui / Phong Thuy
3. Feng Shui Spatial Home / Work / Office Organizer
4. Bazi / Tu Tru / Can Chi / Ngu Hanh
5. I Ching / Kinh Dich
6. Tu Vi reference layer
7. Trading Core reference layer
8. Content creation / media / music / livestream / education
9. Client consultation workflow
10. Long-term Stan Kout Career Phases planning

## Core System Map

- Notion = where ideas, tasks, roadmap, prompts, research, and career phases live
- GitHub = where source code, branches, pull requests, and releases live
- AGENTS.md = operating rules for AI agents and collaborators
- Codex / Cursor / Copilot = AI coding workers
- Vercel = where the app goes online
- OpenAI API / Vercel AI SDK = AI runtime brain
- Supabase / Postgres / Neon = real production data layer

Full workflow:

```text
Notion Task / Career Phase
-> Agent reads task + AGENTS.md
-> Agent creates or uses GitHub branch
-> Agent edits code
-> Agent runs lint/typecheck/test/build
-> Agent creates or prepares PR
-> Vercel creates Preview Deployment
-> Human reviews preview
-> Merge to main
-> Vercel deploys production
-> Notion task gets updated
-> Decision Log records important choices
```

## Tool And App Roles

### Notion

Notion is the project command center.

Use Notion for roadmap, task board, prompt library, knowledge base, bug tracker, feature specs, research vault, decision log, agent logs, client workflow planning, and Career Phases planning.

Notion is not the production database.

### GitHub

GitHub is the source of truth for source code, branches, pull requests, implementation issues, code reviews, release tracking, and CI/CD state.

### Vercel

Vercel is the deployment layer for the Next.js app, preview deployments, production deployments, environment variables, and deployment status checks.

### Codex / Cursor / Copilot

AI coding agents must:

- Read `AGENTS.md` before doing anything.
- Inspect files before editing.
- Use small, reviewable changes.
- Create or use a feature branch when Git is available.
- Follow the relevant Career Phase.
- Run verification commands when available.
- Summarize changed files, assumptions, and unresolved questions.
- Explain actions to Stan in Vietnamese when collaborating directly.

### OpenAI API / Vercel AI SDK

Use the AI runtime layer for chat interfaces, streaming responses, prompt templates, tool calling, agent workflows, and domain-specific assistant modules.

### Supabase / Postgres / Neon

Use a production database for user accounts, client records, uploaded image metadata, birth chart records, analysis history, payments, app logs, and private user records.

Do not use Notion as the main production database.

## Repository Structure

If this becomes a Next.js repo, use or evolve toward this structure:

```text
stan-kout-ai-career-os/
├── AGENTS.md
├── README.md
├── .env.example
├── package.json
├── next.config.ts
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   └── api/
│       ├── chat/
│       ├── analyze-photo/
│       ├── bazi/
│       ├── fengshui/
│       ├── iching/
│       ├── real-estate/
│       └── notion-sync/
├── components/
│   ├── ui/
│   ├── dashboard/
│   └── domain/
├── lib/
│   ├── ai/
│   ├── bazi/
│   ├── fengshui/
│   ├── iching/
│   ├── calendar/
│   ├── real-estate/
│   ├── trading-core/
│   ├── database/
│   ├── i18n/
│   └── notion/
├── prompts/
├── tests/
├── docs/
└── scripts/
```

If the repo is not a Next.js app yet, document the intended structure instead of creating fake application code.

## Stan Kout Career Phases

### Phase 0: AI Foundation And Tool Setup

Goal:

- Set up Notion workspace.
- Set up GitHub repo.
- Set up Vercel project.
- Set up `.env.example`.
- Set up `AGENTS.md`.
- Set up project docs.
- Set up initial task board and branch rules.

Agent responsibilities:

- Architect Agent defines structure.
- Docs Agent writes project docs.
- Security Agent checks secret handling.
- QA Agent verifies setup.

Branches:

- `ai-setup/phase-00-foundation`
- `docs/phase-00-ai-os`
- `chore/env-template`

Checklist:

- `AGENTS.md` exists.
- README exists.
- `.env.example` exists.
- Notion workflow documented.
- Git branch strategy documented.
- No secrets committed.

### Phase 1: Real Estate Licensing And Study System

Goal: build a Georgia Real Estate licensing study tracker, PSI topic organization, English-Vietnamese glossary, flashcard workflow, course progress tracking, and exam readiness tracking.

Agents: Real Estate Agent, Docs Agent, QA Agent, Notion Workflow Agent.

Branches:

- `career/phase-01-real-estate-license`
- `feature/psi-study-tracker`
- `docs/real-estate-glossary`

### Phase 2: Realtor Operating System

Goal: build future real estate practice workflows under a broker, including client intake, buyer/seller checklists, property analysis templates, consultation notes, MLS/IDX planning docs, and Georgia compliance reminders.

Agents: Real Estate Agent, Backend Agent, Frontend Agent, Docs Agent, Security Agent.

Branches:

- `career/phase-02-realtor-os`
- `feature/client-intake`
- `feature/property-analysis`
- `docs/ga-real-estate-compliance`

### Phase 3: Feng Shui Spatial Organizer MVP

Goal: build an MVP for Feng Shui home/work/office organizing with intake data, property photos, separation of visible facts from symbolic interpretation, practical organization recommendations, and deposit/project workflow.

Agents: Feng Shui Domain Agent, AI Agent Engineer, Frontend Agent, Backend Agent, QA Agent.

Branches:

- `career/phase-03-fengshui-spatial-mvp`
- `feature/fengshui-photo-analysis`
- `feature/client-project-deposit-flow`
- `feature/spatial-recommendation-engine`

### Phase 4: Bazi / Can Chi / Ngu Hanh Module

Goal: input birth date, time, and timezone; convert solar/lunar dates when needed; calculate Can Chi pillars and Ngu Hanh distribution; provide symbolic interpretation without presenting metaphysical outputs as guaranteed facts.

Agents: Bazi Agent, Calendar Agent, Backend Agent, QA Agent.

Branches:

- `career/phase-04-bazi-engine`
- `feature/can-chi-calculator`
- `feature/five-elements-distribution`
- `test/bazi-known-dates`

### Phase 5: I Ching / Kinh Dich Module

Goal: build hexagram lookup, original hexagram, changing lines, transformed hexagram, Vietnamese explanation, and uncertainty-aware symbolic framing.

Agents: I Ching Agent, AI Agent Engineer, Frontend Agent, QA Agent.

Branches:

- `career/phase-05-iching-engine`
- `feature/hexagram-lookup`
- `feature/changing-lines`
- `feature/iching-reading-template`

### Phase 6: Symbolic Knowledge Base

Goal: build a structured knowledge base for Feng Shui, I Ching, Bazi, Jungian symbolism, Manly P. Hall-inspired symbolism notes, and user-defined Core of Feng.

Rules:

- Do not quote large copyrighted passages.
- Summarize sources in original words.
- Keep source references in docs.
- Separate historical source notes from product rules.
- Distinguish observable facts, symbolic interpretation, and practical advice.

Branches:

- `career/phase-06-symbolic-knowledge-base`
- `docs/source-map`
- `feature/knowledge-base-search`
- `feature/prompt-library-sync`

### Phase 7: Trading Core Reference Layer

Goal: add Trading Core as an optional reference system for journaling, checklist, psychology logs, and indicator documentation. Do not build live trading execution unless explicitly scoped.

Branches:

- `career/phase-07-trading-core`
- `feature/trading-journal`
- `feature/trading-checklist`
- `docs/core-of-trading`

### Phase 8: Content And Brand Operating System

Goal: support content workflow for YouTube, music, livestream, motivational speech, real estate education, and consultation content with scripts, topic calendars, hooks, and publishing checklists.

Branches:

- `career/phase-08-content-brand-os`
- `feature/content-calendar`
- `feature/script-generator`
- `docs/brand-voice`

### Phase 9: Client Portal And Paid Consultation Workflow

Goal: build client onboarding, payment/deposit status, project timeline, document/photo uploads, consultation reports, and revision tracking.

Branches:

- `career/phase-09-client-portal`
- `feature/client-dashboard`
- `feature/payment-status`
- `feature/report-generator`

### Phase 10: Broker Firm / Long-Term Business OS

Goal: prepare a scalable future broker firm system with CRM, agent team workflow, listing workflow, compliance docs, client lifecycle, and multi-service business dashboard.

Branches:

- `career/phase-10-broker-firm-os`
- `feature/crm-core`
- `feature/team-workflow`
- `docs/broker-firm-playbook`

## AI Agent Types

### Architect Agent

Responsible for system design, folder structure, data model, tool selection, technical roadmap, and cross-agent coordination.

Must not implement large features without first defining architecture. Must respect existing repo conventions.

### Frontend Agent

Responsible for Next.js pages, React components, dashboard UI, forms, user-facing flows, and Vietnamese-English labels.

Keep UI reusable, components clean, and business logic out of UI components.

### Backend Agent

Responsible for API routes, server actions, database schema, auth, file upload metadata, and data validation.

Use Zod or equivalent validation, avoid secret exposure, and implement clear error handling.

### AI Agent Engineer

Responsible for OpenAI API, Vercel AI SDK, prompt templates, tool calling, streaming responses, and agent workflows.

Prompts must live in `prompts/`. AI outputs must include uncertainty when needed. Do not invent domain rules or create unsafe automation.

### Feng Shui Domain Agent

Responsible for Form School logic, Bat Trach logic, Huyen Khong planning, Gua/Kua directions, spatial recommendations, and photo-analysis rules.

Separate visible facts from interpretation. Never claim guaranteed outcomes. Practical recommendations come first; symbolic layers come second.

### Bazi Agent

Responsible for Can Chi, Thien Can / Dia Chi, Ngu Hanh, Tu Tru, and birth time/timezone assumptions.

State calendar assumptions, timezone assumptions, and day-boundary assumptions. Keep calculations testable and separate from symbolic interpretation.

### I Ching Agent

Responsible for hexagram lookup, changing lines, transformed hexagram, Vietnamese explanation, and symbolic reading templates.

Separate original text, commentary, and user interpretation. Mark uncertainty and avoid fatalistic statements.

### Real Estate Agent

Responsible for Georgia real estate study workflow, licensing path, buyer/seller workflow, property analysis, compliance reminders, and consultation document generation.

Do not present legal, tax, lending, brokerage, or compliance guidance as final authority. Recommend verification with a licensed broker, attorney, lender, CPA, inspector, or local authority when needed.

### Trading Core Agent

Responsible for trading journal, checklist, indicator documentation, psychology rules, and Core of Trading notes.

No financial guarantees, no unverified live trading automation, and no blind trade signals.

### Docs Agent

Responsible for README, docs, changelog, decision log, Notion sync documentation, and prompt documentation.

Docs must be clear, current, and free of secrets.

### QA Agent

Responsible for test plans, unit tests, integration tests, build verification, bug reproduction, and acceptance criteria.

Every feature should have acceptance criteria. Every calculation module should have test cases. Every unresolved issue should be documented.

### Security Agent

Responsible for secrets, environment variables, auth, API key handling, data privacy, and permission review.

Never commit `.env`, expose API keys, store private credentials in Notion, or log private client data without a safe reason.

## Bilingual Development Rules

This project supports English-Vietnamese workflows.

### Language Hierarchy

Use English for:

- File names
- Folder names
- Function names
- Variable names
- Type names
- API route names
- Database column names
- Internal technical comments
- Test names
- Commit messages
- Branch names

Use Vietnamese or bilingual Vietnamese-English for:

- User-facing UI labels
- Client reports
- Consultation explanations
- Real estate study notes
- Feng Shui / Bazi / I Ching interpretations
- Prompt outputs for Vietnamese users
- Glossaries
- Domain education content

### Naming Rules

Good:

```ts
const birthDate = userInput.birthDate;
const fiveElementsDistribution = calculateFiveElements(chart);
const propertyFacingDirection = analyzeFacingDirection(compassReading);
```

Bad:

```ts
const ngaySinh = userInput.ngaySinh;
const nguHanh = tinhNguHanh(chart);
const huongNha = phanTichHuongNha(compassReading);
```

Reason: internal code should stay English so tools, agents, and developers can understand it. Vietnamese should appear in UI text, content, reports, and domain explanations.

### UI Label Example

Good:

```ts
export const viLabels = {
  birthDate: "Ngày sinh",
  birthTime: "Giờ sinh",
  timezone: "Múi giờ",
  calculateChart: "Tính lá số",
  fiveElements: "Ngũ Hành",
  propertyDirection: "Hướng nhà",
};
```

Good bilingual version:

```ts
export const bilingualLabels = {
  birthDate: "Ngày sinh / Birth Date",
  birthTime: "Giờ sinh / Birth Time",
  timezone: "Múi giờ / Timezone",
  calculateChart: "Tính lá số / Calculate Chart",
};
```

### Comment Rules

Use comments only when they explain non-obvious logic.

Good:

```ts
// Vietnamese lunar date conversion depends on timezone and day-boundary assumptions.
const lunarDate = convertSolarToLunar(solarDate, timezone);
```

Bad:

```ts
// calculate chart
const chart = calculateChart(input);
```

For complex metaphysical logic, comments may include Vietnamese terminology:

```ts
// Can Chi calculation: Heavenly Stem = Thiên Can, Earthly Branch = Địa Chi.
// Keep the calculation deterministic and testable before adding symbolic interpretation.
const pillars = calculateCanChiPillars(input);
```

### Prompt Template Rules

Prompts must clearly define output language.

Example:

```md
Output language:
- Use Vietnamese as the primary language.
- Keep technical terms in English when they are industry-standard.
- For real estate terms, show English first and Vietnamese explanation in parentheses.
- For metaphysical terms, use Vietnamese first and English explanation when helpful.
```

### Domain Output Rules

For Feng Shui, Bazi, I Ching, Tu Vi, and symbolic systems, always separate:

1. Observable facts
2. Calculated data
3. Symbolic interpretation
4. Practical recommendation
5. Confidence / uncertainty

Vietnamese output example:

```text
1. Dữ kiện quan sát:
- Cửa chính nằm bên trái ảnh.
- Phòng có nhiều vật chắn gần lối đi.

2. Luận theo Phong Thủy:
- Lối đi bị nghẽn có thể tượng trưng cho khí khó lưu thông.
- Đây là diễn giải biểu tượng, không phải kết luận tuyệt đối.

3. Gợi ý thực tế:
- Dọn lối đi.
- Giữ khu vực cửa chính sáng, sạch, dễ mở.
```

### Real Estate Bilingual Rule

For real estate education, use this style:

```text
Promissory Note (giấy hứa trả nợ): tài liệu trong đó borrower cam kết trả khoản vay cho lender.
Security Instrument (văn bản bảo đảm): tài liệu dùng property làm collateral cho loan.
```

### Error Message Rule

User-facing errors should be simple.

Good:

```ts
"Không thể tính lá số vì thiếu giờ sinh. Please enter birth time."
```

Better:

```ts
"Thiếu giờ sinh. Vui lòng nhập giờ sinh để tiếp tục."
```

Technical logs can stay English:

```ts
logger.error("Missing birthTime in Bazi calculation request", { requestId });
```

## Localization Structure

If this becomes a Next.js app, use this structure:

```text
lib/i18n/
├── index.ts
└── locales/
    ├── vi.ts
    └── en.ts
```

Example `lib/i18n/locales/vi.ts`:

```ts
export const vi = {
  common: {
    appName: "Stan Kout AI Career OS",
    dashboard: "Bảng điều khiển",
    continue: "Tiếp tục",
    cancel: "Hủy",
  },
  bazi: {
    title: "Bát Tự / Tứ Trụ",
    birthDate: "Ngày sinh",
    birthTime: "Giờ sinh",
    timezone: "Múi giờ",
    calculate: "Tính lá số",
  },
  fengShui: {
    title: "Phong Thủy Không Gian",
    uploadPhoto: "Tải ảnh lên",
    analyzeSpace: "Phân tích không gian",
    practicalFixes: "Gợi ý chỉnh sửa thực tế",
  },
  realEstate: {
    title: "Real Estate / Nhà Đất",
    studyTracker: "Theo dõi ôn thi",
    glossary: "Từ điển thuật ngữ",
  },
};
```

Example `lib/i18n/locales/en.ts`:

```ts
export const en = {
  common: {
    appName: "Stan Kout AI Career OS",
    dashboard: "Dashboard",
    continue: "Continue",
    cancel: "Cancel",
  },
  bazi: {
    title: "Bazi / Four Pillars",
    birthDate: "Birth Date",
    birthTime: "Birth Time",
    timezone: "Timezone",
    calculate: "Calculate Chart",
  },
  fengShui: {
    title: "Feng Shui Spatial Analysis",
    uploadPhoto: "Upload Photo",
    analyzeSpace: "Analyze Space",
    practicalFixes: "Practical Fixes",
  },
  realEstate: {
    title: "Real Estate",
    studyTracker: "Study Tracker",
    glossary: "Glossary",
  },
};
```

Example `lib/i18n/index.ts`:

```ts
import { en } from "./locales/en";
import { vi } from "./locales/vi";

export const locales = {
  vi,
  en,
};

export type Locale = keyof typeof locales;

export function getLocale(locale: Locale = "vi") {
  return locales[locale] ?? locales.vi;
}
```

Only create localization files after the app framework exists.

## Branching Strategy

- `main` is production-ready.
- Do not commit directly to `main`.
- Use feature branches.
- Use career phase branches for large roadmap stages.
- Use short-lived branches for tasks.
- Use PRs for review.

Branch naming:

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

Examples:

```text
ai-setup/phase-00-foundation
career/phase-03-fengshui-spatial-mvp
feature/fengshui-photo-analysis
feature/bazi-calculator
feature/iching-changing-lines
docs/notion-workflow
security/env-handling
fix/vercel-build-error
```

## Notion Workflow

Notion is the command center and source of truth for roadmap, tasks, feature specs, prompt library, knowledge base, research vault, bug tracker, decision log, agent logs, and Career Phases.

GitHub is the source of truth for source code, pull requests, implementation issues, CI/CD, and release state.

When working from a Notion task, agents must:

1. Read the full task spec.
2. Identify the Career Phase.
3. Identify the correct agent role.
4. Identify relevant repo files.
5. Create or use the correct branch.
6. Implement the smallest complete change.
7. Run lint/typecheck/test/build when available.
8. Summarize changed files.
9. Update Notion task manually or through MCP/API when available.
10. Add unresolved questions if needed.

## Notion Database Templates

### Roadmap

Recommended properties: Name, Phase, Status, Priority, Related Tasks, Related GitHub Repo, Notes.

Status values: Idea, Planned, Building, Testing, Done.

Priority values: Low, Medium, High, Critical.

### Tasks

Recommended properties: Task Name, Career Phase, Status, Type, Priority, Agent, GitHub Branch, Pull Request URL, Vercel Preview URL, Spec, Test Result, Unresolved Questions.

Status values: Backlog, Ready, In Progress, Review, Done.

Type values: Feature, Bug, Research, Refactor, Prompt, UI, Security, Docs.

### Prompt Library

Recommended properties: Prompt Name, Agent Type, Use Case, Version, Prompt Text, Expected Output, Notes.

### Knowledge Base

Recommended categories: Feng Shui Rules, Bazi Rules, Tu Vi Rules, I Ching Rules, Real Estate Rules, Trading Core Rules, UX Writing Rules, Symbolism Notes, Source Notes.

### Decision Log

Recommended properties: Decision, Date, Context, Options Considered, Final Choice, Reason, Related Task, Related PR.

## Domain Rules

1. Treat Feng Shui, Tu Vi, Bazi, I Ching, and symbolic systems as interpretive frameworks, not guaranteed facts.
2. Separate observable facts, calculated data, symbolic interpretation, practical recommendation, and uncertainty.
3. Do not present metaphysical outputs as deterministic truth.
4. For date conversion, always state calendar system, timezone, birth time assumption, and day-boundary assumption when relevant.
5. For Feng Shui image analysis, describe what is visible first, then possible symbolic interpretation, then practical fixes, then confidence level.
6. For Real Estate, do not give legal, tax, lending, brokerage, or compliance advice as final authority.
7. For Trading, no profit guarantees, no blind trade signals, and no live trading automation unless explicitly scoped.
8. For health/safety, do not diagnose. Recommend professional help for medical, legal, or financial high-stakes matters.

## Source And Knowledge Handling

The repo may reference Feng Shui books, I Ching translations, Chinese horoscope references, Jungian symbolism, Manly P. Hall symbolism and esoteric history, real estate study materials, and Trading Core notes.

Rules:

- Do not copy long copyrighted passages.
- Summarize sources in original words.
- Keep source notes separate from product rules.
- Use source material as research context, not unquestioned truth.
- When uncertain, document the assumption.
- Avoid inventing rules that are not in the source or user-defined Core.
- If a rule is user-defined, label it as `User Core Rule`.

## Security Rules

- Never commit `.env`.
- Never expose API keys.
- Never store private credentials in Notion.
- Never hardcode secrets.
- Use `.env.example`.
- Treat client personal data as private.
- Treat uploaded photos and birth data as sensitive.
- Avoid logging private user data unless explicitly needed and safely handled.

Use environment variables for:

```text
OPENAI_API_KEY
DATABASE_URL
NOTION_API_KEY
NOTION_TASKS_DATABASE_ID
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_DEFAULT_LOCALE
NEXT_PUBLIC_SUPPORTED_LOCALES
```

## Commands

If this is a Node/Next.js repo, run commands when available:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

If a command does not exist, say so. Do not invent success.

## Coding Rules

- Use TypeScript where applicable.
- Avoid `any`.
- Keep calculation logic out of UI components.
- Use reusable modules.
- Put domain logic inside `lib/`.
- Put prompt templates inside `prompts/`.
- Put docs inside `docs/`.
- Use clear English names for internal code symbols.
- Avoid huge rewrites.
- Prefer small diffs.
- Add tests for calculation logic.
- Update docs when workflow changes.

## AI Prompt Rules

- Store reusable prompts in `prompts/`.
- Prompts should define agent role, input schema, output schema, safety rules, uncertainty rules, domain boundaries, and output language.
- Never put API keys or secrets in prompts.
- Prompts for metaphysical systems must separate data, interpretation, practical advice, and confidence.
- Prompt outputs for Vietnamese users should use Vietnamese as the primary language unless the task asks otherwise.

## Definition Of Done

A task is done only when:

- The relevant code compiles, if code exists.
- Lint passes, if available.
- Typecheck passes, if available.
- Tests pass, if available.
- Build passes, if available.
- Changed files are summarized.
- Assumptions are listed.
- Unresolved questions are listed.
- Related docs are updated.
- Notion task status is ready for review or done.
- No secrets are exposed.

## Public Website Guardrails

These rules are persistent for the Anh Cao / Spatial Specialist LLC public website:

1. Never invent credentials, license numbers, brokerage affiliations, certifications, insurance, awards, or professional status.
2. Never invent testimonials, transaction statistics, client outcomes, listings, market data, or repair costs.
3. Never display CPI® unless `cpiActive` is explicitly enabled with verified supporting data.
4. Never display REALTOR® unless trademark eligibility is explicitly enabled and current.
5. Keep business identity, contact details, social URLs, service areas, credentials, and compliance claims config-driven.
6. Disabled or missing business data must hide cleanly; raw placeholders must never reach production UI.
7. Maintain meaningful English/Vietnamese parity and equivalent language-switch routes.
8. Preserve semantic HTML, keyboard access, visible focus, readable contrast, and reduced-motion behavior.
9. Protect Core Web Vitals with static generation, minimal client JavaScript, optimized images, and click-to-load video embeds.
10. Run lint, typecheck, tests, and production build before considering public website work complete.
11. Never copy third-party layouts, protected text, logos, certification marks, or photography without documented rights.
12. Add new service claims only through approved config or content after owner/compliance verification.

## Daily Workflow

1. Open Notion.
2. Pick the highest priority task.
3. Confirm Career Phase.
4. Confirm responsible agent.
5. Move task to Ready or In Progress.
6. Create or use correct branch.
7. Ask Codex/Cursor/Copilot to read `AGENTS.md`.
8. Implement task.
9. Run verification.
10. Push branch.
11. Review Vercel Preview URL.
12. Merge when accepted.
13. Update Notion status.
14. Add Decision Log entry if needed.

## Collaboration With Stan

When explaining work to Stan:

- Use Vietnamese by default.
- Translate important English technical terms when helpful.
- Explain the reason and meaning of each major action so Stan can learn the workflow.
- Keep final summaries concise and practical.
