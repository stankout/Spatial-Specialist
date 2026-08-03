# AC Public Art Direction

## Purpose

Phase 3 turns the existing cyber-editorial foundation into one coherent public brand experience. It does not replace the Living Visual Engine, Motion Media System, owner-published media assignments, or Studio governance. The public layer composes those systems into clearer foreground hierarchy, surface depth, page rhythm, and service-specific journeys.

The design principle is **cinematic architectural intelligence**: calm enough to read, precise enough to trust, and distinctive without relying on fake luxury, excessive effects, or invented content.

## Baseline audit

The pre-change audit covered Homepage, DEAL, SPACE, About, Services, Search, Videos, Guides, Articles, Booking, and Contact in English and selected Vietnamese routes at desktop and mobile sizes.

Findings:

- The procedural environments were strong, but several foreground sections behaved like unrelated opaque slabs.
- Search, About, and archive empty states had dark-on-dark contrast failures over procedural scenes.
- Videos, Guides, and Articles repeated the same large title block and unintentional empty dark area.
- Homepage already had a strong personal-brand hero and correct portrait handling; it needed composition integration rather than a redesign.
- DEAL had a strong hero, but pathways and market context needed a more lateral, opportunity-oriented rhythm.
- SPACE had correct compass image fit and a sound information model, but its pathways and method needed clearer circulation and connection.
- About used the correct owner portrait, but the image and story read as separate blocks and development-facing copy appeared in the public narrative.
- Services read as a catalogue of cards instead of two active perspectives.
- Booking and Contact were functionally clear and required only surface and hierarchy polish.
- Header and footer architecture were already successful and needed only restrained refinement.

## Global composition system

The final public layer is implemented in `src/app/public-art-direction.css`, loaded after the existing visual, foreground, living, and motion stylesheets.

Core rules:

- Cinematic maximum width: `1600px`
- Editorial maximum width: `1320px`
- Reading width: `760px`
- Fluid public edge spacing and section rhythm
- Five practical type roles: display, section, card, body, and technical metadata
- Light and dark environmental surfaces with semantic foreground contrast
- Square geometry, hairline borders, restrained glass, and no ornamental luxury effects
- Hover movement limited to small translations and line/surface changes
- Reduced-motion users receive static transitions

The layer is intentionally additive. Visual Director values and owner Published assignments still resolve first; the public art direction layer only controls composition around them.

## Route art direction

### Homepage

- Anh Cao remains the primary identity.
- The editorial statement and portrait share one visual field.
- The approved portrait keeps its assigned crop and focal controls.
- DEAL and SPACE are staggered as two related perspectives instead of equal template cards.
- Explore Services behavior and current conversion links remain unchanged.

### DEAL / Real Estate

- Uses lateral decision pathways, market-context rails, and a darker media stage.
- Buyer, seller, and investor content remains primary.
- Georgia service-area and market education sections use structured editorial rows.
- No listings, transactions, market statistics, testimonials, or brokerage claims are invented.

### SPACE / Spatial Consultation

- Uses connected pathways, orientation navigation, and sequential methodology.
- The compass portrait remains `contain`; the art direction never forces a crop.
- The mobile pathway becomes a vertical circulation sequence.
- Observable spatial analysis remains separate from optional traditional interpretation.

### About

- The owner portrait is integrated into the hero system.
- Public copy is organized as Person / Perspective / System.
- The section uses only existing approved positioning: bilingual communication, property context, spatial function, and separation of observation from interpretation.
- No biography, credential, achievement, or transaction history is invented.

### Services

- Only publicly active services appear.
- DEAL and SPACE are presented as two decision perspectives, not a generic services catalogue.
- CONDITION remains internal and does not render publicly.

### Search

- Search uses a high-contrast signal-terminal composition.
- Drafts, private records, and inactive CONDITION data remain excluded by the existing search index.
- The query, type selector, results, and empty state retain their existing behavior.

### Videos, Guides, and Articles

- Archives use an editorial header with a truthful published-item count.
- The no-content state is an intentional archive state, not a development placeholder.
- Only published content is rendered. Draft and archived entries remain private.

### Booking and Contact

- The existing lead architecture, validation, provider abstraction, service selector, UTM handling, and success flow are unchanged.
- Refinement is limited to surface depth, selection clarity, and visual continuity with public scenes.

## Content and compliance guardrails

- CONDITION remains inactive and publicly gated.
- Credential, REALTOR®, CPI®, brokerage, insurance, review, listing, and certification rules remain config-driven.
- Missing or unapproved media is hidden or represented by the existing governed empty-state systems.
- Owner Draft and Published media states remain unchanged.
- No third-party artwork, stock photography, invented testimonials, market figures, or simulated property data were added.

## Responsive behavior

- Desktop preserves wide editorial splits and lateral service pathways.
- Tablet collapses splits before navigation or body copy becomes crowded.
- Mobile converts SPACE circulation to a vertical sequence and stacks archive/search controls.
- Vietnamese content uses content-driven height; no fixed text container height is introduced.
- Media fit continues to be resolved by the shared role- and slot-aware presentation system.

## Accessibility and performance

- Semantic heading order and existing landmarks are preserved.
- Search and archive contrast is explicitly corrected on dark scenes.
- Focus-visible behavior remains present for navigation, CTAs, forms, and interactive cards.
- Motion is transform/opacity based and disabled under `prefers-reduced-motion`.
- No new client component, runtime image request, video autoplay, third-party script, or font request is introduced.
- Procedural backgrounds remain code-native and governed by the existing visual engine.

## QA matrix

Public routes:

- `/en` and `/vi`
- `/en/real-estate` and `/vi/real-estate`
- `/en/spatial-consultation` and `/vi/spatial-consultation`
- `/en/about` and `/vi/about`
- `/en/services` and `/vi/services`
- `/en/search` and `/vi/search`
- `/en/videos`, `/en/guides`, and `/en/articles`
- `/en/book` and `/vi/book`
- `/en/contact` and `/vi/contact`

Target viewports:

- `1440 × 900`
- `1024 × 768`
- `768 × 1024`
- `390 × 844`

Studio regression routes:

- `/studio`
- `/studio/media`
- `/studio/page-assets`
- `/studio/visuals`

## Next planned phase

Phase 4 is **Studio UX 2.0**. It should improve owner workflow and observability without changing the public art direction contract established here.
