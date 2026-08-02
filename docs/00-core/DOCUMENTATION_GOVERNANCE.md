# AC Spatial Specialist — Documentation Governance

Status: CANONICAL GOVERNANCE
Owner: Owner + technical maintainer

## Critical invariants

- Draft is not Published.
- Assignment is not Approval.
- Organizational Role is not software Capability.
- Reference is not Production Asset.
- Production must fail closed when required authority, approval, or providers are absent.

## Authority by document function

| Document class | Verb | Authority |
|---|---|---|
| Documentation Governance | governs | How repository truth is created and changed |
| Master Brief | defines | Stable company-level direction and invariants |
| Domain specification | governs | Detailed truth inside its domain |
| Page / product / feature specification | specifies | Approved intent within its bounded scope |
| Decision record | explains | Durable rationale and change history |
| Roadmap | plans | Sequence only; never approval |
| Current State | reports | Verified implementation reality |
| AI Handoff | orients | Safe agent entry point |
| Workbench | explores | Zero canonical authority |
| Reference | inspires | Zero production authority |
| Archive | preserves | Historical only; zero current authority |
| Code | implements | Behavior, not independent business policy |
| Conversation | discusses | Never canonical by itself |

## Lifecycle states

- `DRAFT`: working content; not approved and not public by implication.
- `PROPOSED`: defined for evaluation; not activated.
- `TEMPLATE`: reusable structure; not current business truth.
- `CANONICAL`: authoritative within the document's declared scope.
- `CURRENT POLICY`: verified rule reflected in current specifications/code, without inventing a historical approval date.
- `ACTIVE`, `INACTIVE`, `RETIRED`: domain lifecycle states that require explicit governing definitions.
- `NON-CANONICAL`: Workbench, reference, migration-control, or historical material.

Folder location alone does not remove a `DRAFT` or `PROPOSED` lifecycle marker. Migration is not approval.

## Conflict resolution

1. Confirm both documents' scope and lifecycle.
2. Governance controls how truth works; it does not redefine business content.
3. Master Brief controls explicit company-wide invariants.
4. The more specific canonical document controls within its scope unless it violates a higher explicit prohibition.
5. CURRENT_STATE reports drift but does not override intended business truth.
6. Code that conflicts with approved policy creates implementation/documentation drift; code does not silently win.
7. Escalate unresolved business conflicts to the Owner. Do not fill `TBD` values.

## Change and approval rules

- Durable concepts have one home document; summaries link back rather than create duplicate authorities.
- Major accepted decisions update the owning specification and, when useful, receive a decision record.
- Roadmap placement, prototype code, routes, schemas, or internal configuration never activate a service/product.
- Draft publication is a separate authorized action.
- Media assignment is a placement operation; rights, privacy, quality, and public-use approval remain separate gates.
- Organizational authority is defined in operations; software capability implements but does not create that authority.

## Workbench, incoming, references, and archive

- `docs/95-workbench/` is for exploration, prompts, proposals, migration controls, and unresolved decisions. It has zero normative authority.
- `docs/_incoming/` is frozen source input for K0. It remains unchanged for auditability; the migration ledger accounts for every file.
- [The Core Migration Ledger](MIGRATION_LEDGER.md) is authoritative only for K0 source/destination accounting. Migration-control copies in Workbench remain non-canonical history.
- `references/` contains evidence/inspiration and is non-production by default. Rights must be explicit before promotion through the media workflow.
- `docs/99-archive/` contains superseded history. Archived material cannot override current truth.

## Naming and links

Use clear English filenames, relative Markdown links for repository documents, one canonical destination per durable concept, and no unexplained copy suffixes. New canonical documents should declare status, class or purpose, and owner where meaningful.

## Maintenance triggers

Update CURRENT_STATE after material implementation or readiness changes. Update ROADMAP when priority changes. Update DECISION_INDEX when a durable rule is added, superseded, or reversed. Re-run `npm run docs:check` after documentation architecture changes.
