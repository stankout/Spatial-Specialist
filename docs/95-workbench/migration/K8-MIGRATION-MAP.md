# AC Spatial Specialist — Knowledge V1 Migration Map

Status: DRAFT
Document Class: Repository Migration Control
Intended Post-Migration Location: docs/95-workbench/migration/K8-MIGRATION-MAP.md

---

# 1. Purpose

This document defines the proposed file movement from:

docs/_incoming/

into AC Knowledge Architecture V1.

Migration must preserve document meaning and lifecycle.

Do not blindly remove DRAFT / PROPOSED states from content.

---

# 2. Core Architecture

Create:

docs/00-core/

docs/10-brand/

docs/20-business/services/

docs/30-design/pages/

docs/30-design/templates/

docs/40-content/

docs/50-products/templates/

docs/50-products/proposals/

docs/50-products/specs/

docs/50-products/specs/market-pulse/

docs/60-data/templates/

docs/60-data/indicators/

docs/60-data/calculations/

docs/60-data/refresh-policies/

docs/70-operations/sops/

docs/80-platform/features/

docs/80-platform/integrations/

docs/90-decisions/business/

docs/90-decisions/design/

docs/90-decisions/platform/

docs/90-decisions/product/

docs/95-workbench/proposals/

docs/95-workbench/owner-decisions/

docs/95-workbench/migration/

docs/99-archive/legacy/

references/registry/

references/visual/

references/motion/

references/posters/

references/website/

references/competitor/

references/link-collections/

---

# 3. K1

FROM:
K1-AC-MASTER-BRIEF-DRAFT.md

TO:
docs/00-core/AC_MASTER_BRIEF.md

Important:
Preserve unresolved markers.

Do not automatically label APPROVED unless Owner decision supports it.

---

FROM:
K1-OWNER-DECISIONS.md

TO:
docs/95-workbench/owner-decisions/K1-OWNER-DECISIONS.md

---

# 4. K2

K2-BRAND-SYSTEM-DRAFT.md
→ docs/10-brand/BRAND_SYSTEM.md

K2-VISION-AND-POSITIONING-DRAFT.md
→ docs/10-brand/VISION_AND_POSITIONING.md

K2-VOICE-AND-TONE-DRAFT.md
→ docs/10-brand/VOICE_AND_TONE.md

K2-TERMINOLOGY-DRAFT.md
→ docs/10-brand/TERMINOLOGY.md

---

# 5. K3

K3-SERVICE-REGISTRY-DRAFT.md
→ docs/20-business/SERVICE_REGISTRY.md

K3-DEAL-SERVICE-SPEC-DRAFT.md
→ docs/20-business/services/DEAL.md

K3-SPACE-SERVICE-SPEC-DRAFT.md
→ docs/20-business/services/SPACE.md

K3-CONDITION-SERVICE-SPEC-DRAFT.md
→ docs/20-business/services/CONDITION.md

---

# 6. K4

K4-CUSTOMER-LIFECYCLE-DRAFT.md
→ docs/20-business/CUSTOMER_LIFECYCLE.md

K4-OPERATING-MODEL-DRAFT.md
→ docs/70-operations/OPERATING_MODEL.md

K4-ROLES-AND-AUTHORITY-DRAFT.md
→ docs/70-operations/ROLES_AND_AUTHORITY.md

K4-APPROVAL-MODEL-DRAFT.md
→ docs/70-operations/APPROVAL_MODEL.md

K4-MANAGER-HANDBOOK-DRAFT.md
→ docs/70-operations/MANAGER_HANDBOOK.md

K4-SOP-INDEX-DRAFT.md
→ docs/70-operations/SOP_INDEX.md

---

# 7. K5

K5-VISUAL-LANGUAGE-DRAFT.md
→ docs/30-design/VISUAL_LANGUAGE.md

K5-MOTION-LANGUAGE-DRAFT.md
→ docs/30-design/MOTION_LANGUAGE.md

K5-MEDIA-DIRECTION-DRAFT.md
→ docs/30-design/MEDIA_DIRECTION.md

K5-ADVERTISING-DIRECTION-DRAFT.md
→ docs/30-design/ADVERTISING_DIRECTION.md

K5-REFERENCE-GOVERNANCE-DRAFT.md
→ references/README.md

K5-REFERENCE-INDEX-DRAFT.md
→ references/registry/REFERENCE_INDEX.md

---

# 8. K6

K6-PAGE-SPEC-TEMPLATE.md
→ docs/30-design/templates/PAGE_SPEC_TEMPLATE.md

K6-HOME-PAGE-SPEC-DRAFT.md
→ docs/30-design/pages/HOME.md

K6-ABOUT-PAGE-SPEC-DRAFT.md
→ docs/30-design/pages/ABOUT.md

K6-SERVICES-PAGE-SPEC-DRAFT.md
→ docs/30-design/pages/SERVICES.md

K6-DEAL-PAGE-SPEC-DRAFT.md
→ docs/30-design/pages/DEAL.md

K6-SPACE-PAGE-SPEC-DRAFT.md
→ docs/30-design/pages/SPACE.md

K6-SEARCH-PAGE-SPEC-DRAFT.md
→ docs/30-design/pages/SEARCH.md

K6-VIDEOS-PAGE-SPEC-DRAFT.md
→ docs/30-design/pages/VIDEOS.md

K6-GUIDES-ARTICLES-PAGE-SPEC-DRAFT.md
→ docs/30-design/pages/GUIDES_ARTICLES.md

K6-CONTACT-PAGE-SPEC-DRAFT.md
→ docs/30-design/pages/CONTACT.md

---

# 9. K7 Product

K7-PRODUCT-PORTFOLIO-DRAFT.md
→ docs/50-products/PRODUCT_PORTFOLIO.md

K7-PRODUCT-SPEC-TEMPLATE.md
→ docs/50-products/templates/PRODUCT_SPEC_TEMPLATE.md

K7-AC-MARKET-PULSE-SPEC-DRAFT.md
→ docs/50-products/specs/AC_MARKET_PULSE.md

K7-MARKET-PULSE-METHODOLOGY-DRAFT.md
→ docs/50-products/specs/market-pulse/METHODOLOGY.md

K7-MARKET-PULSE-EXPLANATION-DRAFT.md
→ docs/50-products/specs/market-pulse/EXPLANATION.md

---

# 10. K7 Data

K7-DATA-GOVERNANCE-DRAFT.md
→ docs/60-data/DATA_GOVERNANCE.md

K7-SOURCE-REGISTRY-DRAFT.md
→ docs/60-data/SOURCE_REGISTRY.md

K7-INDICATOR-SPEC-TEMPLATE.md
→ docs/60-data/templates/INDICATOR_SPEC_TEMPLATE.md

K7-IND-MORTGAGE-30Y-DRAFT.md
→ docs/60-data/indicators/MORTGAGE_30Y.md

K7-IND-TREASURY-10Y-DRAFT.md
→ docs/60-data/indicators/TREASURY_10Y.md

K7-IND-FED-POLICY-DRAFT.md
→ docs/60-data/indicators/FED_POLICY.md

K7-IND-CPI-YOY-DRAFT.md
→ docs/60-data/indicators/CPI_YOY.md

K7-IND-ACTIVE-INVENTORY-DRAFT.md
→ docs/60-data/indicators/ACTIVE_INVENTORY.md

K7-IND-NEW-LISTINGS-DRAFT.md
→ docs/60-data/indicators/NEW_LISTINGS.md

K7-IND-MEDIAN-DOM-DRAFT.md
→ docs/60-data/indicators/MEDIAN_DOM.md

K7-IND-PRICE-CUT-SHARE-DRAFT.md
→ docs/60-data/indicators/PRICE_CUT_SHARE.md

K7-IND-SALE-TO-LIST-DRAFT.md
→ docs/60-data/indicators/SALE_TO_LIST.md

K7-MARKET-PULSE-NORMALIZATION-DRAFT.md
→ docs/60-data/calculations/MARKET_PULSE_NORMALIZATION.md

K7-MARKET-PULSE-SCORING-DRAFT.md
→ docs/60-data/calculations/MARKET_PULSE_SCORING.md

---

# 11. Proposal

SPEC-001-AC-Knowledge-Architecture.md
→ docs/95-workbench/proposals/SPEC-001-AC-Knowledge-Architecture.md

Do not promote to canonical truth.

---

# 12. K8

K8-KNOWLEDGE-MANIFEST-DRAFT.md
→ docs/95-workbench/migration/K8-KNOWLEDGE-MANIFEST.md

K8-OWNER-DECISION-REGISTER-DRAFT.md
→ docs/95-workbench/owner-decisions/OWNER_DECISION_REGISTER.md

K8-MIGRATION-MAP-DRAFT.md
→ docs/95-workbench/migration/K8-MIGRATION-MAP.md

K8-CANONICALIZATION-CHECKLIST.md
→ docs/95-workbench/migration/K8-CANONICALIZATION-CHECKLIST.md

---

# 13. Existing Documentation

Before moving any existing docs:

AUDIT FIRST.

Do not overwrite existing useful documents solely because a new destination exists.

For each collision:

1. compare content
2. determine whether existing doc is current
3. merge non-conflicting valuable information
4. preserve historical information where needed
5. archive superseded legacy document
6. avoid duplicate canonical sources

---

# 14. Empty Directories

Git does not preserve empty directories by itself.

Do not add meaningless placeholder files everywhere merely to manufacture the entire future tree.

Create directories as needed by actual files.

Documentation may describe future paths before they physically exist.

---

# 15. Incoming Cleanup

Do not delete docs/_incoming/ until:

all staged files are accounted for

migration map is verified

destination files exist

no staged information was lost

documentation links pass review.

After successful migration:

docs/_incoming/

may be removed if empty.

---

# 16. No Business Mutation

Migration is primarily structural.

Codex must not use migration as an excuse to:

rewrite company positioning

change service status

validate proposed Market Pulse weights

activate products

change public application behavior.

Those are separate tasks.
