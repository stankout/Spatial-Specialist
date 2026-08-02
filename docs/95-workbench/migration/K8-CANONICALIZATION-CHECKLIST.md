# AC Spatial Specialist — Knowledge V1 Canonicalization Checklist

Status: WORKING CHECKLIST
Document Class: Migration QA
Intended Post-Migration Location: docs/95-workbench/migration/K8-CANONICALIZATION-CHECKLIST.md

---

# A. Intake

[ ] All staged Markdown files discovered

[ ] No zero-byte accidental files

[ ] No duplicate filenames differing only by spaces/case

[ ] SPEC-001 identified as non-canonical proposal

[ ] K8 control documents identified

---

# B. Core Knowledge Architecture

[ ] docs/00-core architecture established

[ ] START_HERE.md created

[ ] AC_MASTER_BRIEF.md placed

[ ] CURRENT_STATE.md created from verified current repository state

[ ] ROADMAP.md created from verified project checkpoint

[ ] DECISION_INDEX.md created

[ ] AI_HANDOFF.md created

[ ] DOCUMENTATION_GOVERNANCE.md created

---

# C. Authority

[ ] Canonical vs non-canonical distinction documented

[ ] Draft does not mean approved

[ ] Roadmap does not mean specification

[ ] Code does not silently redefine business truth

[ ] Workbench material has zero canonical authority

[ ] Archive material has zero current authority

---

# D. Brand

[ ] BRAND_SYSTEM migrated

[ ] VISION_AND_POSITIONING migrated

[ ] VOICE_AND_TONE migrated

[ ] TERMINOLOGY migrated

[ ] Legal entity remains unresolved where not verified

---

# E. Services

[ ] SERVICE_REGISTRY migrated

[ ] DEAL migrated

[ ] SPACE migrated

[ ] CONDITION migrated

[ ] DEAL status ACTIVE preserved

[ ] SPACE status ACTIVE preserved

[ ] CONDITION status INACTIVE preserved

[ ] No migration activates CONDITION publicly

---

# F. Operations

[ ] OPERATING_MODEL migrated

[ ] ROLES_AND_AUTHORITY migrated

[ ] APPROVAL_MODEL migrated

[ ] CUSTOMER_LIFECYCLE migrated

[ ] MANAGER_HANDBOOK migrated

[ ] SOP_INDEX migrated

[ ] Organizational roles remain distinct from software roles/capabilities

---

# G. Design

[ ] VISUAL_LANGUAGE migrated

[ ] MOTION_LANGUAGE migrated

[ ] MEDIA_DIRECTION migrated

[ ] ADVERTISING_DIRECTION migrated

[ ] Page template migrated

[ ] Public page specifications migrated

[ ] Existing approved Contact/Footer design intent preserved

---

# H. References

[ ] Reference governance established

[ ] REFERENCE_INDEX established

[ ] Reference assets not treated as production assets

[ ] Large raw reference media not accidentally committed

[ ] Rights status remains explicit

---

# I. Products

[ ] PRODUCT_PORTFOLIO migrated

[ ] PRODUCT_SPEC_TEMPLATE migrated

[ ] AC Market Pulse specification migrated

[ ] AC Market Pulse remains PROPOSED

[ ] No proposed product becomes ACTIVE through migration

---

# J. Data

[ ] DATA_GOVERNANCE migrated

[ ] SOURCE_REGISTRY migrated

[ ] Indicator template migrated

[ ] Mortgage indicator migrated

[ ] Treasury indicator migrated

[ ] Fed Policy indicator migrated

[ ] CPI indicator migrated

[ ] Inventory indicator migrated

[ ] New Listings indicator migrated

[ ] Median DOM indicator migrated

[ ] Price Cut Share indicator migrated

[ ] Sale-to-List indicator migrated

---

# K. Market Pulse Methodology

[ ] Methodology document migrated

[ ] Normalization document migrated

[ ] Scoring document migrated

[ ] Explanation document migrated

[ ] Proposed weights remain marked PROPOSED

[ ] Historical validation still required

[ ] No methodology is described as validated without evidence

[ ] Financing Pressure remains separate from Market Leverage

[ ] Macro Pressure remains separate from Market Leverage

---

# L. Owner Decisions

[ ] Owner Decision Register migrated

[ ] Unresolved decisions preserved

[ ] No TBD silently filled by Codex

[ ] Blocking decisions clearly marked

[ ] Resolved decisions update owning specs

---

# M. Existing Repository Documentation

[ ] Existing docs audited

[ ] No valuable current documentation lost

[ ] Duplicate canonical definitions removed/merged safely

[ ] Legacy superseded docs archived where appropriate

[ ] Existing Visual Engine docs preserved/linked

[ ] Existing Motion Media docs preserved/linked

[ ] Existing Public Art Direction docs preserved/linked

---

# N. Platform Documentation

[ ] Existing technical architecture inventoried

[ ] PLATFORM_OVERVIEW.md created or linked appropriately

[ ] Publishing model documented

[ ] Security/access model documented from verified implementation

[ ] Production Readiness linked/documented

[ ] No production provider described as configured unless verified

---

# O. AI Handoff

[ ] Root AGENTS.md created or updated

[ ] AGENTS.md remains compact

[ ] AI_HANDOFF.md is authoritative for AI orientation

[ ] Required boot sequence defined

[ ] Task-specific context loading defined

[ ] Forbidden actions listed

[ ] Test expectations listed

[ ] Commit/push/deploy policy listed

---

# P. Current State

Verify from repository rather than draft memory:

[ ] Last completed software phase documented

[ ] Current uncommitted state documented

[ ] Known technical debt documented

[ ] Active services verified

[ ] CONDITION gating verified

[ ] Production-provider state verified

[ ] Current test/build state recorded only after actual execution

---

# Q. Links / Integrity

[ ] Internal Markdown links checked

[ ] No references to missing canonical files without explanation

[ ] Naming convention consistent

[ ] No accidental copy suffixes

[ ] No unexplained duplicate documents

---

# R. Software Regression

Documentation migration should not require application behavior changes.

Nevertheless verify:

[ ] npm run lint

[ ] npm run typecheck

[ ] npm run test

[ ] npm run build

[ ] git diff --check

---

# S. Git Safety

[ ] git status reviewed

[ ] No secrets added

[ ] No large accidental raw media added

[ ] No generated runtime directories added

[ ] No commit performed unless explicitly authorized

[ ] No push performed unless explicitly authorized

[ ] No deploy performed

---

# T. Completion

Knowledge Architecture V1 migration is complete only when:

[ ] staged files accounted for

[ ] canonical architecture exists

[ ] non-canonical architecture exists

[ ] current-state boot documentation works

[ ] Owner unresolved decisions remain visible

[ ] Codex can enter through AI_HANDOFF without old chat history

[ ] docs/_incoming is empty or contains only intentionally unresolved staging material
