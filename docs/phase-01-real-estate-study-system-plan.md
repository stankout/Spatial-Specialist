# Phase 1 Real Estate Licensing And Study System Plan

## 1. Phase 1 Overview

Phase 1 creates the planning layer for Stan Kout's bilingual Georgia Real Estate licensing study system.

This phase matters because it turns licensing study work into an organized operating system instead of scattered notes. It prepares Stan to track progress, review weak topics, build English-Vietnamese study material, and later generate practice questions in a controlled, source-aware way.

Phase 1 is not a production app yet. It is the structured planning layer for:

- PSI National Exam study
- Georgia State Exam study
- English-Vietnamese glossary
- Flashcard workflow
- Course progress tracking
- Exam readiness checklist
- Practice question generator plan
- Study note templates

No legal guidance in this phase should be treated as final authority. Georgia real estate law, licensing rules, and PSI requirements must be verified against current official sources before final study content is published or used as authoritative exam preparation.

## 2. Objectives

- Track Real Estate licensing study progress.
- Organize PSI National and Georgia State topics.
- Build an English-Vietnamese glossary for real estate study.
- Create reusable study note templates.
- Create flashcard-ready content.
- Prepare future practice question generation.
- Prepare future dashboard/app structure without building UI yet.
- Mark weak topics for review and spaced repetition.
- Keep source verification visible for exam-sensitive content.
- Separate study organization from legal, brokerage, tax, and lending advice.

## 3. User Stories

```text
As Stan, I want to track PSI National Exam topics,
So that I can see which national real estate concepts I have studied, reviewed, or mastered.
```

```text
As Stan, I want to track Georgia State Exam topics,
So that I can focus on Georgia-specific licensing material separately from national content.
```

```text
As Stan, I want to review bilingual real estate glossary terms,
So that I can understand English exam terms clearly while learning Vietnamese explanations.
```

```text
As Stan, I want to convert study notes into flashcards,
So that I can review definitions, exam traps, and key distinctions quickly.
```

```text
As Stan, I want to generate practice questions later,
So that I can test my understanding after source-verified content exists.
```

```text
As Stan, I want to mark weak topics for review,
So that I can prioritize the areas that need more attention before the exam.
```

```text
As Stan, I want to track exam readiness,
So that I can decide when I am prepared for final review and practice exams.
```

## 4. Scope

### In Scope

- PSI topic tracker
- Georgia State Exam topic tracker
- English-Vietnamese glossary format
- Flashcard workflow
- Course progress tracker
- Exam readiness checklist
- Practice question generator plan
- Study note templates
- Notion task workflow
- Source verification fields for every exam-sensitive item

### Out Of Scope

- No paid APIs yet
- No production database yet
- No legal advice as final authority
- No user accounts yet
- No app UI unless separately scoped
- No invented Georgia law facts
- No live integration with PSI, Georgia Real Estate Commission, broker systems, MLS, or course providers
- No final exam content generation until sources are verified

## 5. Proposed File Structure

Recommended documentation-first structure:

```text
docs/
├── phase-01-real-estate-study-system-plan.md
├── real-estate/
│   ├── psi-national-topics.md
│   ├── georgia-state-topics.md
│   ├── glossary-en-vi.md
│   ├── flashcard-format.md
│   ├── practice-question-format.md
│   ├── exam-readiness-checklist.md
│   └── study-note-template.md
prompts/
├── real-estate-glossary-writer.md
├── real-estate-flashcard-generator.md
├── real-estate-practice-question-generator.md
└── real-estate-study-note-summarizer.md
```

Do not create all of these files yet unless a future task explicitly scopes them. This first Phase 1 task creates the planning document only.

## 6. Data Model Draft

This data model can be used later in Notion or an app database. It is a draft, not a production schema.

### Study Topic

Suggested fields:

- Topic Name
- Exam Type: PSI National / Georgia State
- Category
- Status: Not Started / Studying / Review / Mastered
- Priority: Low / Medium / High / Critical
- Confidence: 1-5
- Source
- Notes
- Related Glossary Terms
- Last Reviewed
- Next Review Date

Purpose: track learning status for each exam topic and make weak areas visible.

### Glossary Term

Suggested fields:

- English Term
- Vietnamese Explanation
- Category
- Example
- Related Exam Type
- Confidence
- Source
- Last Reviewed

Purpose: keep English real estate terms visible while making the meaning understandable in Vietnamese.

### Flashcard

Suggested fields:

- Front
- Back
- Topic
- Difficulty
- Review Status
- Last Reviewed
- Next Review Date

Purpose: turn study notes and glossary terms into reviewable cards.

### Practice Question

Suggested fields:

- Question
- Choices A-D
- Correct Answer
- Explanation
- Topic
- Exam Type
- Difficulty
- Source / Verification Needed

Purpose: prepare future practice questions without inventing unverified exam facts.

## 7. Bilingual Glossary Format

Use English first, then Vietnamese explanation.

```text
Promissory Note (giấy hứa trả nợ): tài liệu trong đó borrower cam kết trả khoản vay cho lender.
Security Instrument (văn bản bảo đảm): tài liệu dùng property làm collateral cho loan.
Earnest Money (tiền đặt cọc thiện chí): khoản tiền buyer đặt để thể hiện ý định mua nghiêm túc.
```

Rules:

- Keep English legal/real estate terms visible.
- Explain in Vietnamese clearly.
- Do not over-translate industry terms.
- Mark terms that require legal, broker, lender, or source verification.
- Keep examples practical and exam-focused.
- Add source references before treating a term as final study content.

Recommended glossary entry format:

```md
## English Term

Vietnamese explanation:

Category:

Related exam type:

Example:

Common confusion:

Source / Verification Needed:

Confidence:
```

## 8. Flashcard Format

Use concise cards that test one concept at a time.

```text
Front:
What is a Promissory Note?

Back:
Promissory Note (giấy hứa trả nợ): tài liệu trong đó borrower cam kết trả khoản vay cho lender.
Key point: It is the borrower's promise to repay the loan.
Exam trap: Do not confuse it with the security instrument.
```

Recommended flashcard fields:

- Front: direct question or prompt
- Back: bilingual answer
- Key point: one-line exam memory hook
- Exam trap: common confusion
- Topic: related topic name
- Source / Verification Needed: source status

## 9. Practice Question Format

Practice questions should be generated only from source-verified material.

```text
Question:
Which document is the borrower's promise to repay a mortgage loan?

A. Security Instrument
B. Promissory Note
C. Deed
D. Title Insurance Policy

Correct Answer:
B

Explanation:
A Promissory Note is the borrower's promise to repay the loan. The Security Instrument pledges the property as collateral.

Vietnamese Explanation:
Promissory Note là giấy hứa trả nợ. Security Instrument là văn bản dùng property làm tài sản bảo đảm.
```

Recommended practice question fields:

- Question
- Choices A-D
- Correct Answer
- Explanation
- Vietnamese Explanation
- Topic
- Exam Type
- Difficulty
- Source / Verification Needed
- Confidence

## 10. Study Note Template

```md
# Topic Name

## English Definition

## Vietnamese Explanation

## Key Exam Points

## Common Traps

## Example

## Related Terms

## Flashcard Version

## Practice Question Version

## Source / Verification Needed
```

Study notes should be short enough to convert into flashcards and practice questions later. If a note depends on Georgia law, PSI rules, licensing rules, or current exam requirements, mark it as source verification needed until checked.

## 11. Notion Workflow

Notion should be used as the Phase 1 command center, not as the production database.

Recommended Notion setup:

- Roadmap item: Phase 1 Real Estate Licensing Study System
- Tasks database for study tasks
- Prompt Library for glossary, flashcard, question, and note prompts
- Knowledge Base for real estate rules and source notes
- Decision Log for important workflow choices

Suggested Notion tasks:

- Create PSI National topic map
- Create Georgia State topic map
- Create English-Vietnamese glossary format
- Create flashcard template
- Create practice question template
- Create exam readiness checklist
- Identify official/current source list for PSI and Georgia licensing rules
- Define weak-topic review workflow
- Define exam readiness scoring method

Suggested task fields:

- Task Name
- Career Phase: Phase 1
- Status
- Type
- Priority
- Agent
- GitHub Branch
- Source Verification Needed
- Test / Review Result
- Unresolved Questions

## 12. Acceptance Criteria

Phase 1 planning is complete when:

- Plan document exists.
- Scope is clear.
- Out-of-scope items are documented.
- Data model draft exists.
- Glossary format exists.
- Flashcard format exists.
- Practice question format exists.
- Study note template exists.
- Notion workflow exists.
- Risks and assumptions are documented.
- No product code was created.
- No legal claims were made without verification.

## 13. Risks And Assumptions

Risks:

- Georgia real estate rules can change and must be source-verified.
- PSI exam topic weighting may change and must be checked from official/current sources before final content generation.
- Study content may become misleading if it is not linked to a source and review date.
- AI-generated questions can create false confidence if they are not reviewed.
- Bilingual explanations may oversimplify legal or licensing terms if not carefully written.

Assumptions:

- This planning document is not legal advice.
- This phase supports study and organization only.
- Production app architecture will be scoped later.
- Notion will be used as the planning and study command center during early phases.
- Any future app database will be designed after architecture approval.
- Stan's target workflow benefits from English terms plus Vietnamese explanations.

## 14. Recommended Next Step

Create the first documentation files:

- `docs/real-estate/psi-national-topics.md`
- `docs/real-estate/georgia-state-topics.md`
- `docs/real-estate/glossary-en-vi.md`
- `docs/real-estate/exam-readiness-checklist.md`

Recommended next prompt:

```text
Create Phase 1 real estate documentation starter files only. Do not create app UI, database code, paid API integrations, or unverified Georgia law facts. Mark source-sensitive content as Source / Verification Needed.
```

