# K0 — AC KNOWLEDGE ARCHITECTURE V1 MIGRATION

Target working time: 45–90+ minutes.

Repository:
Current AC Spatial Specialist repository.

This task is primarily DOCUMENTATION ARCHITECTURE, KNOWLEDGE MIGRATION, REPOSITORY GOVERNANCE, and AI HANDOFF.

Do not redesign the website.

Do not implement AC Market Pulse.

Do not activate products or services.

Do not commit.
Do not push.
Do not deploy.

Work autonomously through audit, migration, validation, and final reporting.

Only stop if a genuine blocker prevents safe continuation.

======================================================================
0. CRITICAL CURRENT CONTEXT
======================================================================

The repository currently contains substantial existing implementation.

Previous major work includes:

MEGA PHASE 1
Living Visual Engine 3.0

MEGA PHASE 2
Motion Media System + Original Background Pipeline

MEGA PHASE 3
Full Public Art Direction

Those phases may still contain UNCOMMITTED working-tree changes.

DO NOT:

- reset them
- revert them
- overwrite them
- discard them
- clean them
- stash them unless explicitly required and safe
- treat them as migration debris

The documentation migration must coexist with the current working tree.

Before modifying anything:

capture and inspect:

git status --short
git diff --stat
git diff --check

Understand which files predate K0.

Preserve unrelated existing work.

======================================================================
1. INPUT PACKAGE
======================================================================

The primary migration staging directory is:

docs/_incoming/

It should contain approximately 57 Markdown files:

- 56 knowledge/specification/control documents
- this K0 migration prompt

The package includes:

SPEC-001
K1 Master Definition
K2 Brand
K3 Services
K4 Operations
K5 Creative / References
K6 Page Specifications
K7 Products / Data / Market Pulse
K8 Migration Controls
K0 Execution Prompt

Before migration:

enumerate every file.

Check:

- filenames
- zero-byte files
- duplicates
- suspicious copies
- malformed Markdown
- obvious truncation
- unexpected files

Do not silently ignore staged documents.

======================================================================
2. READ FIRST
======================================================================

Before designing the destination tree, read in this order:

1. docs/_incoming/K8-KNOWLEDGE-MANIFEST-DRAFT.md
2. docs/_incoming/K8-MIGRATION-MAP-DRAFT.md
3. docs/_incoming/K8-CANONICALIZATION-CHECKLIST.md
4. docs/_incoming/K8-OWNER-DECISION-REGISTER-DRAFT.md
5. docs/_incoming/SPEC-001-AC-Knowledge-Architecture.md

Then inspect:

K1
K2
K3
K4
K5
K6
K7

Do not assume SPEC-001 is canonical.

SPEC-001 is historical proposal/reference material.

K8 defines the prepared migration intent.

======================================================================
3. AUDIT EXISTING REPOSITORY DOCUMENTATION
======================================================================

Inspect current:

docs/
README files
AGENTS.md if present
technical documentation
architecture documentation
Studio documentation
Visual Director documentation
Media documentation
governance documentation
production-readiness documentation

Specifically find existing work related to:

Living Visual Engine
Motion Media System
Public Art Direction
Visual Director
Story Backdrop
Media Library
Page Assets
Social
Roles
Governance
Service Registry
Production Readiness
Draft / Published
CONDITION gating

Do not overwrite useful existing documentation.

For collisions:

COMPARE
→ MERGE where appropriate
→ CROSS-LINK when separate concerns exist
→ ARCHIVE only if genuinely superseded

Never delete valuable historical information merely to create a prettier tree.

======================================================================
4. CREATE KNOWLEDGE ARCHITECTURE V1
======================================================================

Establish the architecture described by K8 where useful.

Primary domains:

docs/00-core/

docs/10-brand/

docs/20-business/

docs/30-design/

docs/40-content/

docs/50-products/

docs/60-data/

docs/70-operations/

docs/80-platform/

docs/90-decisions/

docs/95-workbench/

docs/99-archive/

references/

Create directories based on actual content.

Do not manufacture dozens of empty directories with placeholder files solely to satisfy an imaginary enterprise hierarchy.

======================================================================
5. CREATE CORE CONTROL PLANE
======================================================================

Create:

docs/00-core/START_HERE.md

docs/00-core/AC_MASTER_BRIEF.md

docs/00-core/CURRENT_STATE.md

docs/00-core/ROADMAP.md

docs/00-core/DECISION_INDEX.md

docs/00-core/AI_HANDOFF.md

docs/00-core/DOCUMENTATION_GOVERNANCE.md

These form the knowledge-system control plane.

======================================================================
6. AC_MASTER_BRIEF
======================================================================

Use:

K1-AC-MASTER-BRIEF-DRAFT.md

as the source candidate.

Do not invent answers to unresolved Owner Decisions.

Preserve truthful unresolved markers.

The Master Brief should define durable company-level concepts.

Do NOT place volatile implementation status in the Master Brief.

Examples that belong elsewhere:

test count
current dev server PID
current build status
temporary technical debt
current git state

Those belong in CURRENT_STATE.

======================================================================
7. CURRENT_STATE
======================================================================

CURRENT_STATE.md must be generated from THE ACTUAL REPOSITORY.

Do not simply copy conversation assumptions or draft claims.

Verify:

- existing routes
- existing Studio systems
- active services
- CONDITION gating
- current development phase
- production provider configuration state
- working-tree state
- available scripts
- test/build state after QA
- known technical debt identifiable from current docs/repository

Record:

VERIFIED CURRENT STATE

not historical memory.

Explicitly distinguish:

implemented

configured

production-ready

proposed

inactive.

======================================================================
8. ROADMAP
======================================================================

ROADMAP.md should distinguish:

DONE

CURRENT

NEXT

FUTURE

BLOCKED

Roadmap status does NOT constitute feature approval.

Likely current structure should reflect verified facts around:

Living Visual Engine
Motion Media
Public Art Direction
Knowledge Architecture
Studio UX 2.0
Market Pulse
business/commerce
production infrastructure

But verify before writing.

Do not activate future work simply by listing it.

======================================================================
9. DOCUMENTATION GOVERNANCE
======================================================================

DOCUMENTATION_GOVERNANCE.md must define authority such as:

MASTER BRIEF defines company-level direction.

DOMAIN SPEC governs domain truth.

FEATURE / PRODUCT SPEC defines a specific product or feature.

DECISION RECORD explains durable decisions.

ROADMAP plans.

CURRENT STATE reports implementation reality.

AI HANDOFF orients AI agents.

WORKBENCH explores.

REFERENCE inspires.

ARCHIVE preserves history.

CODE implements.

Conversation history is not canonical.

Code must not silently redefine business truth.

Roadmap does not equal approved specification.

Reference does not equal production asset.

======================================================================
10. START_HERE
======================================================================

START_HERE.md should be useful to:

Owner
Manager
Developer
Content Editor
AI agent

Keep it compact.

Explain:

what AC is

where authoritative information lives

what to read by role/task

what CURRENT_STATE means

where unresolved work lives.

Do not make START_HERE another giant Master Brief.

======================================================================
11. AI_HANDOFF
======================================================================

Create a practical AI boot sequence.

Recommended concept:

STEP 1
Read START_HERE.

STEP 2
Read AC_MASTER_BRIEF.

STEP 3
Read CURRENT_STATE.

STEP 4
Read DECISION_INDEX.

STEP 5
Load task-relevant domain specs only.

The handoff should explicitly tell AI agents:

Do not treat Workbench as canonical.

Do not treat Archive as current truth.

Do not activate CONDITION.

Do not convert PROPOSED Market Pulse methodology into validated science.

Do not assume production providers are configured.

Do not commit/push/deploy unless explicitly authorized.

Do not rewrite unrelated systems.

Inspect repository before implementation.

Run appropriate QA.

======================================================================
12. ROOT AGENTS.md
======================================================================

Audit whether AGENTS.md already exists.

If absent:

create a compact root AGENTS.md.

If present:

merge carefully instead of replacing useful instructions.

AGENTS.md should NOT reproduce the whole knowledge base.

It should point agents to:

docs/00-core/START_HERE.md
docs/00-core/AI_HANDOFF.md
docs/00-core/CURRENT_STATE.md

and state critical repository invariants.

Keep it concise.

======================================================================
13. MIGRATE K2 BRAND
======================================================================

Using K8 map, establish:

docs/10-brand/BRAND_SYSTEM.md

docs/10-brand/VISION_AND_POSITIONING.md

docs/10-brand/VOICE_AND_TONE.md

docs/10-brand/TERMINOLOGY.md

Preserve unresolved legal/company identity markers.

Do not manufacture final legal identity.

======================================================================
14. MIGRATE K3 BUSINESS
======================================================================

Establish:

docs/20-business/SERVICE_REGISTRY.md

docs/20-business/services/DEAL.md

docs/20-business/services/SPACE.md

docs/20-business/services/CONDITION.md

docs/20-business/CUSTOMER_LIFECYCLE.md

Critical invariant:

DEAL = ACTIVE

SPACE = ACTIVE

CONDITION = INACTIVE

Migration must not change public application behavior.

======================================================================
15. MIGRATE K4 OPERATIONS
======================================================================

Establish:

docs/70-operations/OPERATING_MODEL.md

docs/70-operations/ROLES_AND_AUTHORITY.md

docs/70-operations/APPROVAL_MODEL.md

docs/70-operations/MANAGER_HANDBOOK.md

docs/70-operations/SOP_INDEX.md

Preserve distinction between:

ORGANIZATIONAL ROLE

and:

SOFTWARE ROLE / CAPABILITY.

Do not claim company staff/processes already exist when documents describe future operating architecture.

======================================================================
16. MIGRATE K5 DESIGN
======================================================================

Establish:

docs/30-design/VISUAL_LANGUAGE.md

docs/30-design/MOTION_LANGUAGE.md

docs/30-design/MEDIA_DIRECTION.md

docs/30-design/ADVERTISING_DIRECTION.md

Integrate/cross-link existing documentation for:

Living Visual Engine

Motion Media

Public Art Direction

Do not destroy detailed technical documentation already created in previous phases.

Business/design specs and implementation docs may remain separate when they answer different questions.

======================================================================
17. REFERENCES
======================================================================

Establish:

references/README.md

references/registry/REFERENCE_INDEX.md

Create additional reference directories only where useful.

Reference material must remain non-production by default.

Do not move actual public production assets into references.

Do not import large external/raw media into Git.

======================================================================
18. MIGRATE K6 PAGE SPECS
======================================================================

Establish:

docs/30-design/templates/PAGE_SPEC_TEMPLATE.md

docs/30-design/pages/HOME.md

docs/30-design/pages/ABOUT.md

docs/30-design/pages/SERVICES.md

docs/30-design/pages/DEAL.md

docs/30-design/pages/SPACE.md

docs/30-design/pages/SEARCH.md

docs/30-design/pages/VIDEOS.md

docs/30-design/pages/GUIDES_ARTICLES.md

docs/30-design/pages/CONTACT.md

These are design/product intent.

Do not automatically alter public pages during K0.

======================================================================
19. MIGRATE K7 PRODUCTS
======================================================================

Establish:

docs/50-products/PRODUCT_PORTFOLIO.md

docs/50-products/templates/PRODUCT_SPEC_TEMPLATE.md

docs/50-products/specs/AC_MARKET_PULSE.md

docs/50-products/specs/market-pulse/METHODOLOGY.md

docs/50-products/specs/market-pulse/EXPLANATION.md

AC Market Pulse remains:

PROPOSED

not ACTIVE.

No Market Pulse application implementation belongs in K0.

======================================================================
20. MIGRATE K7 DATA
======================================================================

Establish:

docs/60-data/DATA_GOVERNANCE.md

docs/60-data/SOURCE_REGISTRY.md

docs/60-data/templates/INDICATOR_SPEC_TEMPLATE.md

docs/60-data/indicators/MORTGAGE_30Y.md

docs/60-data/indicators/TREASURY_10Y.md

docs/60-data/indicators/FED_POLICY.md

docs/60-data/indicators/CPI_YOY.md

docs/60-data/indicators/ACTIVE_INVENTORY.md

docs/60-data/indicators/NEW_LISTINGS.md

docs/60-data/indicators/MEDIAN_DOM.md

docs/60-data/indicators/PRICE_CUT_SHARE.md

docs/60-data/indicators/SALE_TO_LIST.md

docs/60-data/calculations/MARKET_PULSE_NORMALIZATION.md

docs/60-data/calculations/MARKET_PULSE_SCORING.md

Preserve:

PROPOSED

NOT VALIDATED

where applicable.

Do not convert experimental weights into production truth.

======================================================================
21. OWNER DECISION STAGING
======================================================================

Migrate:

K8-OWNER-DECISION-REGISTER-DRAFT.md

to:

docs/95-workbench/owner-decisions/OWNER_DECISION_REGISTER.md

Also preserve K1 owner-decision staging where useful.

Do not resolve any Owner decision autonomously.

If information can be verified from repository facts, distinguish:

repository verification

from:

Owner business decision.

======================================================================
22. WORKBENCH
======================================================================

Migrate SPEC-001 into:

docs/95-workbench/proposals/

Migrate K8 migration documents into:

docs/95-workbench/migration/

Store this K0 prompt under:

docs/95-workbench/migration/prompts/

Workbench has zero canonical authority.

Document this clearly.

======================================================================
23. DECISION SYSTEM
======================================================================

Establish:

docs/90-decisions/

Start lightweight.

Do not manufacture dozens of historical ADR/BDR records.

Create durable decision records only for high-confidence decisions supported by current specs/repository.

At minimum consider documented decisions around:

CONDITION inactivity

Draft vs Published

Reference vs Production Asset

Market Pulse remains proposed/not validated

If a decision cannot be responsibly dated or attributed:

index the rule through canonical specifications rather than fabricating historical metadata.

DECISION_INDEX.md should point to actual durable records.

======================================================================
24. PLATFORM DOCUMENTATION
======================================================================

Audit existing technical docs.

Create or consolidate a lightweight:

docs/80-platform/PLATFORM_OVERVIEW.md

where useful.

It should orient developers toward existing systems such as:

public renderer

Studio

content

media

Page Assets

Visual Director

social

roles/capabilities

service gating

readiness

Do not rewrite detailed existing implementation docs unnecessarily.

Prefer links.

Also ensure developers can locate documentation for:

publishing model

security/access model

production readiness

even if those remain existing documents.

======================================================================
25. CONTENT DOMAIN
======================================================================

The architecture includes:

docs/40-content/

Do not invent a detailed Content Strategy merely to populate this domain.

If existing current content documentation belongs here, migrate/cross-link it.

Otherwise document the domain in START_HERE/architecture and leave detailed content specs for future approved work.

Do not create bureaucracy to satisfy folder aesthetics.

======================================================================
26. ARCHIVE
======================================================================

Use docs/99-archive/ only for genuinely superseded historical documentation.

Do not archive something simply because it is old.

Current useful technical documents may remain where they are if moving them would break links or add no value.

When moved:

update internal links.

======================================================================
27. DOCS INTEGRITY CHECK
======================================================================

Add a lightweight documentation-integrity checker if the repository architecture supports it cleanly.

Preferred responsibilities:

- detect zero-byte Markdown files in canonical docs
- identify broken relative Markdown links where practical
- detect obvious duplicate canonical destination paths
- ensure required core docs exist
- ensure critical service statuses are represented
- ensure Workbench is not treated as canonical by indexes

Possible implementation:

scripts/docs-check.mjs

and optionally:

npm run docs:check

Do not add a heavy dependency for this.

If implementation would be disproportionate, document the limitation instead.

======================================================================
28. CURRENT STATE VERIFICATION
======================================================================

Before finalizing CURRENT_STATE:

verify actual route/service behavior.

At minimum verify that current application architecture still preserves:

/en/home-inspection → 404

/vi/home-inspection → 404

CONDITION absent from active public service exposure

Draft / Published separation where documented

Published social architecture

production provider readiness state

Do not alter application behavior to make documentation appear correct.

Documentation must reflect implementation reality.

======================================================================
29. QA
======================================================================

Run documentation integrity checks.

Then run:

npm run lint

npm run typecheck

npm run test

npm run build

git diff --check

If the repository has another current canonical test command, include it appropriately.

Do not weaken tests.

======================================================================
30. GIT SAFETY
======================================================================

At completion inspect:

git status --short

git diff --stat

git diff --check

Ensure:

- existing Phase 1–3 work remains
- no secrets added
- no raw large media added
- no runtime directories added
- no unexpected deletion
- no application behavior changed unintentionally

DO NOT COMMIT.

DO NOT PUSH.

DO NOT DEPLOY.

======================================================================
31. _incoming CLEANUP
======================================================================

Only after successful migration and verification:

account for every original staged file.

Do not destroy staged information.

When every item has a destination or explicitly documented reason to remain staged:

remove migrated source copies from docs/_incoming/.

The directory may remain only if intentionally unresolved staging material still exists.

Prefer an empty/removed _incoming after successful migration.

K0 migration prompt itself should be preserved in Workbench history.

======================================================================
32. FINAL REPORT
======================================================================

Report:

1. Pre-migration repository state
2. Incoming package audit
3. Existing documentation audit
4. Final knowledge architecture
5. Core docs created
6. Brand migration
7. Business migration
8. Operations migration
9. Design migration
10. Reference architecture
11. Page specs
12. Product migration
13. Data migration
14. Market Pulse status
15. Owner Decision Register
16. Decision architecture
17. Platform documentation
18. Existing docs preserved/merged/archived
19. AGENTS.md / AI boot sequence
20. Documentation integrity tooling
21. CURRENT_STATE verification
22. CONDITION verification
23. Automated QA
24. Files created
25. Files moved
26. Files archived
27. Remaining unresolved decisions
28. Technical debt
29. Recommended next phase

Explicitly state:

Commit: NO
Push: NO
Deploy: NO

======================================================================
33. STOP CONDITION
======================================================================

Stop only after:

- every incoming document is accounted for
- Knowledge Architecture V1 exists
- core boot documentation works
- unresolved Owner Decisions remain visible
- existing technical documentation is preserved
- application regression QA passes
- CURRENT_STATE reflects repository reality
- final report is complete

Do not commit.
Do not push.
Do not deploy.
