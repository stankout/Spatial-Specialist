# REFERENCE_ASSET_USAGE_POLICY.md
## AC Spatial Specialist - Local Visual Reference Asset Policy

Status: WORKBENCH POLICY
Scope: LOCAL VISUAL REFERENCES, HUD, MOTION AND FUTURE MARKET PULSE WORK

## 1. Purpose

This policy authorizes Codex to inspect and use the Owner-provided local reference library as active visual evidence while preserving production safety, provenance and platform authority boundaries.

Authorized reference roots:

```text
E:\Real Estate\Phôi\Phôi Website\Phôi Video Samples
E:\Real Estate\Phôi\Phôi Website\Phôi HUD
```

The Owner states that most materials have been cleared for project use. Codex may study and use the files freely for AC design work, subject to the publication controls in this policy.

## 2. Reference authority

The folders are authoritative for:

- visual composition
- frame construction
- HUD organization
- spacing
- visual density
- technical maturity
- motion rhythm
- glow behavior
- line hierarchy
- panel relationships
- safe zones
- texture and atmosphere
- transition language

They are not authoritative for:

- business facts
- market values
- legal claims
- service activation
- live-data meaning
- public credentials
- production rights status when an individual file has uncertain provenance

## 3. Read-only source rule

Codex must treat both local folders as read-only libraries.

Codex must not:

- delete files
- rename files
- reorganize folders
- overwrite source assets
- destructively convert source files
- remove watermarks
- erase third-party logos
- modify source metadata to imply AC ownership

Derived previews and production exports must be written elsewhere.

## 4. Scan and inventory contract

Before relevant visual work, Codex should scan only the files needed for the task and build a compact working inventory.

Recommended fields:

- source path
- filename
- extension
- file size
- modified date
- pixel dimensions
- orientation
- color mode when detectable
- duration
- frame rate
- codec
- alpha/transparency status when detectable
- preview status
- likely visual family
- rights or provenance note
- recommended use
- production restriction

Do not create a giant permanent inventory unless the task requires it.

## 5. Format handling

### JPG / JPEG / PNG

Inspect directly.

Record:

- dimensions
- crop
- compression quality
- transparency where applicable
- visual role
- safe-zone potential

### MP4

Inspect:

- duration
- frame size
- frame rate
- codec
- bitrate when available
- loop seam potential
- camera movement
- geometry movement
- light stability
- text or logo presence
- suitability for background, overlay, reference or direct delivery

Extract a small number of representative frames when needed. Do not generate hundreds of frames.

### AI / EPS

Use a non-destructive preview workflow when tools support it.

Preferred sequence:

1. inspect metadata
2. create a temporary preview outside the source folder
3. preserve vector geometry when possible
4. record missing fonts or linked resources
5. avoid flattening the only usable master
6. never overwrite the source

If the environment cannot safely preview a file, report it rather than guessing.

## 6. Reference versus runtime asset

Each used file must be classified as one of:

### REFERENCE ONLY

Used to understand style, layout or motion. Not shipped.

### DERIVATION SOURCE

Used to create a new AC-owned derivative or procedural reconstruction.

### APPROVED RUNTIME ASSET

May be copied or exported into the repository after explicit approval.

### BLOCKED FROM PUBLICATION

May be studied, but contains uncertain rights, watermark, third-party branding, private information or technical defects.

No website code may load assets directly from the `E:\` source folders.

## 7. Visual matching policy

When the Owner asks for a close match, Codex may reproduce:

- frame proportions
- column structure
- border hierarchy
- line weight relationships
- corner systems
- panel spacing
- glow intensity
- motion cadence
- visual density
- information grouping
- background behavior

Codex should still adapt the result for:

- AC brand semantics
- responsive layouts
- bilingual content
- accessibility
- reduced motion
- performance
- live-data binding
- Page Assets and Visual Director controls

Do not add arcade particles, decorative dots, diagonal sweeps, random scanning or fake telemetry unless the selected reference and approved brief require them.

## 8. Publication safety

Before a derived or copied asset becomes public, verify:

- approved source classification
- no watermark
- no unapproved third-party logo
- no private information
- no fake data
- no unsupported claim
- no CONDITION exposure
- correct AC naming
- correct service family
- responsive suitability
- reduced-motion fallback
- provenance record
- Owner approval where required

The Owner-provided statement of clearance allows active project use, but individual publication risks still require review when visible third-party material or uncertain provenance remains.

## 9. Repository destination

Derived working assets should use an approved repository location selected during implementation.

Recommended logical categories:

```text
public/media/reference-derived/
public/media/environments/
public/media/hud/
public/media/market-pulse/
```

Do not create these folders blindly if the repository already has a canonical media structure.

Media Library import and Page Assets assignment remain the final authority for public use.

## 10. Market Pulse separation

Market Pulse must separate three layers:

### PRESENTATION LAYER

HUD frame, background, section dividers, decorative geometry, typography zones and responsive layout.

### DATA LAYER

Verified providers, adapters, normalized values, timestamps, source attribution, freshness and methodology.

### STATE LAYER

Loading, current, stale, delayed, unavailable, partial, error and fallback states.

The HUD must never contain baked-in live values.

Charts and sentiment must include:

- source
- timestamp
- timeframe
- methodology where relevant
- stale-data behavior
- unavailable-data behavior

Decorative geometry must not resemble real market information unless it is actually bound to verified data.

## 11. Automatic update principles

Future Market Pulse implementation should use:

- provider adapters
- normalized internal contracts
- server-side caching where appropriate
- timestamps
- freshness thresholds
- graceful provider failure
- last-known-value policy
- no silent fake fallback
- explicit stale or unavailable states
- rate-limit awareness
- source attribution
- observability and audit logging where supported

Provider selection and exact refresh intervals remain future decisions.

## 12. Responsive HUD behavior

HUD design must define:

- desktop slot map
- tablet slot map
- mobile information priority
- overflow behavior
- chart simplification
- minimum readable type
- touch behavior
- reduced motion
- no blind crop from desktop
- no data hidden solely because a decorative frame cannot accommodate it

The data model controls truth. The HUD adapts around it.

## 13. Governance

- Draft does not equal Published.
- Assignment does not equal Approval.
- Reference access does not equal runtime approval.
- Technical capability does not equal public activation.
- CONDITION remains inactive.
- Production must fail closed.
- Missing data must not become invented data.
- The dashboard example supplied later will determine the final Market Pulse composition and slot architecture.
