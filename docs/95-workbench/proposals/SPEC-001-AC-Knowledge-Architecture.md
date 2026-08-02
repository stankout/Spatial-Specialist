# SPEC-001-AC Knowledge Architecture

## Background

AC Spatial Specialist has outgrown a documentation model where project knowledge can live safely in conversations, scattered notes, source code, or individual developer memory.

The repository should become the durable institutional memory of the company.

The documentation system therefore needs to preserve four different kinds of truth without mixing them:

1. **Business truth** — what AC is, offers, allows, promises, and intends.
2. **Design intent** — how AC should communicate and appear.
3. **Operational truth** — how people run the business and approve work.
4. **Implementation truth** — what the software currently does and how it works.

A fifth category exists outside canonical truth:

5. **Exploration** — ideas, research, references, experiments, and proposals that have not been approved.

The central architectural rule is:

> **Unapproved ideas must never silently become company truth, and implementation must never silently redefine business truth.**

---

## Requirements

### MUST

* Markdown is the primary canonical documentation format.
* The repository must identify authoritative documents explicitly.
* Business definitions must remain separate from software implementation.
* Current implementation state must remain separate from intended future state.
* Draft ideas and research must remain separate from approved specifications.
* Reference assets must never be treated as approved production assets.
* Decisions with long-term consequences must remain discoverable.
* An AI developer must be able to orient itself from a small boot sequence.
* CONDITION must be representable as a defined service while remaining inactive.
* Documentation must support DEAL, SPACE, future CONDITION, and future products without requiring a structural redesign.

### SHOULD

* Documents should have clear owners and lifecycle states.
* Canonical concepts should have one primary definition.
* Other documents should reference canonical definitions rather than repeat them.
* Specifications should become progressively more detailed from company ? domain ? feature.
* Historical material should remain available without polluting current truth.

### COULD

* Small YAML registries may supplement Markdown where machine-readable indexing creates real value.
* Automated checks may later validate document IDs, links, lifecycle states, or duplicate identifiers.

### MUST NOT

* Turn every concept into its own document.
* Treat roadmap items as approved requirements.
* Treat source code as the authoritative definition of business policy.
* Treat old documentation as canonical merely because it exists.
* Store large copyrighted reference media in Git by default.
* Require humans or agents to read the entire documentation tree before performing a bounded task.

---

# Recommended Repository Documentation Architecture

```text
/
+-- README.md
+-- AGENTS.md
¦
+-- docs/
¦   ¦
¦   +-- 00-core/
¦   ¦   +-- START_HERE.md
¦   ¦   +-- MASTER_BRIEF.md
¦   ¦   +-- CURRENT_STATE.md
¦   ¦   +-- ROADMAP.md
¦   ¦   +-- DECISION_INDEX.md
¦   ¦   +-- AI_HANDOFF.md
¦   ¦   +-- DOCUMENTATION_GOVERNANCE.md
¦   ¦
¦   +-- 10-brand/
¦   ¦   +-- BRAND_SYSTEM.md
¦   ¦   +-- VISION_AND_POSITIONING.md
¦   ¦   +-- VOICE_AND_TONE.md
¦   ¦   +-- TERMINOLOGY.md
¦   ¦
¦   +-- 20-business/
¦   ¦   +-- SERVICE_REGISTRY.md
¦   ¦   +-- COMPANY_STRUCTURE.md
¦   ¦   +-- CUSTOMER_LIFECYCLE.md
¦   ¦   +-- services/
¦   ¦       +-- DEAL.md
¦   ¦       +-- SPACE.md
¦   ¦       +-- CONDITION.md
¦   ¦
¦   +-- 30-design/
¦   ¦   +-- DESIGN_SYSTEM.md
¦   ¦   +-- VISUAL_LANGUAGE.md
¦   ¦   +-- MOTION_LANGUAGE.md
¦   ¦   +-- MEDIA_DIRECTION.md
¦   ¦   +-- TYPOGRAPHY.md
¦   ¦   +-- COLOR_SYSTEM.md
¦   ¦   +-- pages/
¦   ¦       +-- HOME.md
¦   ¦       +-- ABOUT.md
¦   ¦       +-- DEAL.md
¦   ¦       +-- SPACE.md
¦   ¦       +-- SEARCH.md
¦   ¦       +-- CONTACT.md
¦   ¦
¦   +-- 40-content/
¦   ¦   +-- CONTENT_STRATEGY.md
¦   ¦   +-- CONTENT_MODEL.md
¦   ¦   +-- CONTENT_MATRIX.md
¦   ¦   +-- page-copy/
¦   ¦
¦   +-- 50-products/
¦   ¦   +-- PRODUCT_PORTFOLIO.md
¦   ¦   +-- proposals/
¦   ¦   +-- specs/
¦   ¦   +-- retired/
¦   ¦
¦   +-- 60-data/
¦   ¦   +-- DATA_GOVERNANCE.md
¦   ¦   +-- SOURCE_REGISTRY.md
¦   ¦   +-- indicators/
¦   ¦   +-- calculations/
¦   ¦   +-- refresh-policies/
¦   ¦
¦   +-- 70-operations/
¦   ¦   +-- OPERATING_MODEL.md
¦   ¦   +-- ROLES_AND_AUTHORITY.md
¦   ¦   +-- SOP_INDEX.md
¦   ¦   +-- sops/
¦   ¦       +-- publishing/
¦   ¦       +-- content/
¦   ¦       +-- media/
¦   ¦       +-- leads/
¦   ¦       +-- customers/
¦   ¦       +-- service-delivery/
¦   ¦
¦   +-- 80-platform/
¦   ¦   +-- PLATFORM_OVERVIEW.md
¦   ¦   +-- ARCHITECTURE.md
¦   ¦   +-- SECURITY_AND_ACCESS.md
¦   ¦   +-- PUBLISHING_MODEL.md
¦   ¦   +-- PRODUCTION_READINESS.md
¦   ¦   +-- features/
¦   ¦   +-- integrations/
¦   ¦
¦   +-- 90-decisions/
¦   ¦   +-- README.md
¦   ¦   +-- business/
¦   ¦   +-- design/
¦   ¦   +-- product/
¦   ¦   +-- data/
¦   ¦   +-- operations/
¦   ¦   +-- architecture/
¦   ¦
¦   +-- 95-workbench/
¦   ¦   +-- ideas/
¦   ¦   +-- research/
¦   ¦   +-- proposals/
¦   ¦
¦   +-- 99-archive/
¦       +-- legacy/
¦
+-- references/
    +-- README.md
    +-- registry/
    +-- visual/
    +-- motion/
    +-- competitor/
    +-- link-collections/
```

---

# Why This Structure

The proposed `brand / business / design / content / products / data / operations` structure is fundamentally sound.

The main changes are:

### Add `00-core`

There needs to be a deliberately tiny control plane for the entire knowledge base.

Nobody should have to browse eight domains simply to understand what repository they entered.

### Add `80-platform`

Platform documentation should not live inside business or operations.

This domain describes the software system:

* public application
* Studio
* publishing model
* authentication
* permissions
* visual engine
* integrations
* deployment
* runtime behavior

It describes **how the platform works**, not what the company believes.

### Add `90-decisions`

`DECISIONS.md` alone will eventually become unmanageable.

Use individual records for durable decisions and keep one small index in `00-core`.

### Add `95-workbench`

This is essential.

Research, possibilities, experiments, competitive observations, proposed products, and incomplete thinking need somewhere legitimate to live without becoming canonical.

Without this area, drafts inevitably leak into authoritative documentation.

### Add `99-archive`

Old documentation should normally be moved, not deleted.

Archive material has historical value but zero authority unless explicitly restored.

### Keep `references/` outside `docs/`

References are evidence and inspiration.

They are not AC specifications.

That distinction should be visible from the filesystem itself.

---

# Purpose of Major Areas

| Area            | Responsibility                                  | Authority                         |
| --------------- | ----------------------------------------------- | --------------------------------- |
| `00-core`       | Project orientation and governance              | Highest cross-domain authority    |
| `10-brand`      | Identity, positioning, terminology, voice       | Canonical brand truth             |
| `20-business`   | Services, company model, customer model         | Canonical business truth          |
| `30-design`     | Visual and experience intent                    | Canonical design truth            |
| `40-content`    | Editorial strategy and approved messaging       | Canonical content truth           |
| `50-products`   | Product definitions and approved product specs  | Canonical product truth           |
| `60-data`       | Data meaning, sources, formulas, freshness      | Canonical data truth              |
| `70-operations` | Roles, approval processes, SOPs                 | Canonical operating truth         |
| `80-platform`   | Technical architecture and implementation model | Canonical technical documentation |
| `90-decisions`  | Permanent decision rationale/history            | Governance record                 |
| `95-workbench`  | Unapproved thinking                             | Non-canonical                     |
| `99-archive`    | Superseded historical material                  | Non-canonical                     |
| `references`    | Inspiration/evidence/reference assets           | Non-canonical                     |

---

# Source-of-Truth Model

A single linear hierarchy such as:

`MASTER BRIEF ? DOMAIN SPEC ? FEATURE SPEC ? IMPLEMENTATION`

is useful but insufficient.

AC has several independent kinds of authority.

The recommended model is:

```text
                     DOCUMENTATION_GOVERNANCE
                              ¦
                              ?
                         MASTER_BRIEF
                              ¦
             +----------------+----------------+
             ?                ?                ?
        DOMAIN TRUTH      DOMAIN TRUTH     DOMAIN TRUTH
         Business            Design            Data
             ¦                ¦                ¦
             +---------------------------------+
                        ?           ?
                   PAGE / PRODUCT / FEATURE
                         SPECIFICATIONS
                              ¦
                              ?
                    PLATFORM IMPLEMENTATION
                              ¦
                              ?
                        CURRENT_STATE
```

Parallel to this:

```text
IDEAS / RESEARCH / REFERENCES
             ¦
             ?
          PROPOSAL
             ¦
             ?
      OWNER DECISION
             ¦
             ?
      CANONICAL SPEC UPDATE
```

Decisions provide the historical bridge:

```text
Decision Record
    ¦
    +-- why the change happened
    +-- who approved it
    +-- what it affects
    +-- which canonical documents were changed
```

---

# Authority Rules

## Rule 1 — Governance defines how truth works

`DOCUMENTATION_GOVERNANCE.md` is authoritative about:

* document lifecycle
* ownership
* approval
* conflict resolution
* IDs
* canonical vs non-canonical material
* archival rules

It does **not** define AC's services or product strategy.

---

## Rule 2 — MASTER_BRIEF defines global invariants

Examples:

* company identity
* major business domains
* active service architecture
* global constraints
* broad platform purpose

It should say that CONDITION is inactive.

It should **not** contain the entire CONDITION specification.

---

## Rule 3 — Domain specifications own detailed truth

For example:

```text
MASTER_BRIEF.md
    ?
SERVICE_REGISTRY.md
    ?
services/CONDITION.md
```

`CONDITION.md` owns the detailed service definition.

The Master Brief only states the global invariant that the service exists conceptually but is not currently active.

---

## Rule 4 — More specific canonical documents win inside their scope

Example:

`VISUAL_LANGUAGE.md` may define global visual principles.

`pages/HOME.md` may define a homepage-specific exception.

The page specification wins **for the homepage only**, provided the exception does not violate a higher-level explicit prohibition.

---

## Rule 5 — Accepted decisions trigger canonical updates

Decision records should not become an alternate specification system.

A decision such as:

> CONDITION remains inactive until credential requirements are satisfied.

belongs permanently in a decision record.

But the active rule should also appear in:

* `MASTER_BRIEF.md`
* `SERVICE_REGISTRY.md`
* `services/CONDITION.md`

The decision record explains **why**.

The specifications define **what is true now**.

---

## Rule 6 — CURRENT_STATE never overrides intended truth

`CURRENT_STATE.md` answers:

> What is implemented right now?

It does not answer:

> What should AC ultimately be?

A missing implementation does not cancel an approved specification.

---

## Rule 7 — Code does not silently redefine policy

If software behavior conflicts with an approved specification, that is documentation or implementation drift.

It is not automatically a new business rule.

The discrepancy must be resolved intentionally.

---

## Rule 8 — Roadmap is not specification

A roadmap item means:

> AC may or intends to work on this.

It does not mean the feature is approved in all details.

Feature implementation should require an approved specification when the work materially changes product, business, data, or operating behavior.

---

## Rule 9 — Workbench and references have zero normative authority

Anything under:

```text
docs/95-workbench/
references/
docs/99-archive/
```

must never override canonical documentation.

---

# Recommended Master Documents

The proposed five documents are close, but I recommend **seven core documents**.

```text
START_HERE.md
MASTER_BRIEF.md
CURRENT_STATE.md
ROADMAP.md
DECISION_INDEX.md
AI_HANDOFF.md
DOCUMENTATION_GOVERNANCE.md
```

Two important changes:

* `DECISIONS.md` becomes `DECISION_INDEX.md`.
* `CODEX_HANDOFF.md` becomes `AI_HANDOFF.md`.

This avoids designing long-term company infrastructure around one coding agent.

A tiny root `AGENTS.md` may point agents into this boot sequence without duplicating it.

---

# 1. START_HERE.md

**Owner:** Owner / repository maintainer

**Purpose:**
Human and AI entry point.

**Update when:**
The documentation structure or primary boot sequence changes.

**Contains:**

* What AC Spatial Specialist is
* What this documentation system is
* Which documents are canonical
* Where each knowledge domain lives
* Recommended reading paths by role
* Links to the six other core documents

**Must not contain:**

* Detailed strategy
* Product requirements
* Current sprint details
* Full architecture explanations
* Duplicated policies

Target size: approximately one screen to two screens.

---

# 2. MASTER_BRIEF.md

Recommended rename:

```text
AC_MASTER_BRIEF.md
?
MASTER_BRIEF.md
```

The repository already establishes that this is AC.

**Owner:** Owner

**Purpose:**
Stable high-level definition of the company and platform.

**Update when:**
A major company-level truth changes.

**Contains:**

* company purpose
* positioning
* service architecture
* major audiences
* major platform capabilities
* global business constraints
* high-level domain map
* major invariants

For example:

```text
DEAL      ACTIVE
SPACE     ACTIVE
CONDITION INACTIVE
```

**Must not contain:**

* implementation status
* sprint tasks
* detailed page layouts
* API schemas
* full SOPs
* detailed formulas
* brainstorming

This should be relatively stable.

---

# 3. CURRENT_STATE.md

**Owner:** Developer / technical maintainer
**Business-sensitive changes:** verified by Owner

**Purpose:**
Snapshot of what actually exists now.

**Update when:**

* a meaningful feature is completed
* architecture materially changes
* production readiness changes
* a feature is activated/deactivated
* a major implementation phase completes

**Contains:**

* implemented systems
* active/inactive functionality
* current phase
* environment state
* known gaps
* important technical limitations
* production-readiness status
* last completed major phase
* next approved implementation area

Example:

```text
Current phase:
MEGA PHASE 3 — Complete

Next major phase:
MEGA PHASE 4 — Studio UX 2.0

Status:
Not started
```

**Must not contain:**

* long-term product ideas
* historical implementation diary
* detailed design specifications
* task-by-task changelog

This is a snapshot, not a journal.

---

# 4. ROADMAP.md

**Owner:** Owner

**Purpose:**
Sequence approved or candidate future work without pretending it is implemented.

**Update when:**

* priorities change
* initiatives are approved
* initiatives move between lifecycle stages

**Contains:**

* Now
* Next
* Later
* Blocked
* Future / exploratory initiatives
* links to product or feature specs

Example:

```text
NOW
Documentation Architecture

NEXT
Studio UX 2.0

FUTURE
AC Market Intelligence
CONDITION activation
Commerce
Customer portal
```

**Must not contain:**

* detailed specifications
* task management
* implementation history
* product formulas
* raw brainstorming

---

# 5. DECISION_INDEX.md

This replaces a large `DECISIONS.md`.

**Owner:** Owner + Developer depending on decision category

**Purpose:**
Fast index into permanent decision records.

**Update when:**
A decision record is created, superseded, or reversed.

**Contains:**

```text
ID       Date        Domain       Status       Decision
BDR-001  YYYY-MM-DD  Business     ACCEPTED     CONDITION remains inactive
DDR-002  YYYY-MM-DD  Design       ACCEPTED     Contact/Footer architecture retained
ADR-003  YYYY-MM-DD  Platform     ACCEPTED     Public reads Published state
```

Each entry links to:

```text
docs/90-decisions/<domain>/<record>.md
```

**Must not contain:**

* complete decision discussions
* specifications
* meeting transcripts

---

# 6. AI_HANDOFF.md

Recommended rename:

```text
CODEX_HANDOFF.md
?
AI_HANDOFF.md
```

Codex-specific instructions may later exist inside it where genuinely necessary.

**Owner:** Lead developer / technical maintainer

**Purpose:**
Safe entry point for an AI coding agent.

**Update when:**

* development workflow changes
* current phase changes significantly
* testing rules change
* deployment policy changes
* important safety constraints change

**Contains:**

* required boot sequence
* current task orientation
* forbidden actions
* canonical source locations
* development expectations
* test expectations
* commit policy
* push/deploy policy
* how to load task-specific context
* how to report documentation drift

**Must not contain:**

* duplicated business specifications
* full architecture documentation
* entire roadmap
* detailed design language
* secrets
* credentials

The handoff should point to canonical sources rather than reproduce them.

---

# 7. DOCUMENTATION_GOVERNANCE.md

This is the critical missing master document.

**Owner:** Owner + technical maintainer

**Purpose:**
Define the operating rules of the repository knowledge base itself.

Without this document, future contributors will not know which documents are authoritative or how to change them safely.

**Update when:**

* documentation architecture changes
* lifecycle rules change
* ownership changes
* approval process changes

**Contains:**

* canonical authority hierarchy
* document types
* lifecycle states
* ownership rules
* approval rules
* naming rules
* cross-reference rules
* conflict-resolution rules
* archival rules
* reference-vs-production distinction
* requirements for updating CURRENT_STATE
* requirements for decision records
* metadata conventions

**Must not contain:**

* company strategy
* product definitions
* page specifications
* implementation instructions unrelated to documentation

---

# Root README and AGENTS.md

These are navigation files, not canonical truth.

## README.md

Purpose:

```text
What repository is this?
How do I run/use it?
Where is documentation?
Where should humans start?
```

It links to:

```text
docs/00-core/START_HERE.md
```

## AGENTS.md

Keep this deliberately tiny.

Example responsibility:

```text
Before modifying this repository:

1. Read docs/00-core/AI_HANDOFF.md
2. Read docs/00-core/CURRENT_STATE.md
3. Follow DOCUMENTATION_GOVERNANCE.md
4. Load only domain documents relevant to your task
```

It should never become a second `AI_HANDOFF.md`.

---

# Duplication Rule

Every durable concept must have a **home document**.

Other documents may summarize it, but must link back to its owner.

Example:

```text
Concept:
CONDITION activation policy

Primary definition:
docs/20-business/services/CONDITION.md

Registry status:
docs/20-business/SERVICE_REGISTRY.md

Global summary:
docs/00-core/MASTER_BRIEF.md

Historical rationale:
docs/90-decisions/business/BDR-001-condition-activation.md

Implementation status:
docs/00-core/CURRENT_STATE.md
```

These five documents are not duplicates because they answer five different questions:

```text
CONDITION.md
What is the service and what rules govern it?

SERVICE_REGISTRY.md
What services exist and what is their status?

MASTER_BRIEF.md
What must anyone understanding AC know?

Decision record
Why was this rule adopted?

CURRENT_STATE.md
What is implemented and exposed today?
```

That distinction should become the pattern for the entire repository.

---

# Core Principle

The repository should distinguish these verbs:

```text
MASTER BRIEF      defines
DOMAIN SPEC       governs
FEATURE SPEC      specifies
DECISION RECORD   explains
ROADMAP           plans
CURRENT STATE     reports
AI HANDOFF        orients
WORKBENCH         explores
REFERENCE         inspires
CODE              implements
```

Once those responsibilities stay separate, the repository can become AC Spatial Specialist's durable company memory without becoming a documentation bureaucracy.
