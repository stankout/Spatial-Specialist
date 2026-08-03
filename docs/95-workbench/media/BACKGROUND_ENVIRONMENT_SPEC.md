# BACKGROUND_ENVIRONMENT_SPEC.md
## AC Spatial Specialist — Living Visual Environment Production Contract

Status: PRODUCTION SPECIFICATION — REVIEWED V1
Scope: PUBLIC WEBSITE ENVIRONMENTS ONLY
Master Families: EXACTLY FOUR

Revision notes:

- normalized procedural preset naming to the approved `ac-[family]-[context]-[role]-[orientation]-v[number]` convention
- separated Preset from Intensity in default mappings
- clarified the relationship between static masters, poster derivatives and reduced-motion states
- added Studio / Page Assets metadata, assignment and fallback governance
- clarified that the Asset Inventory counts deliverable groups rather than literal exported-file count
- added QA checks for Draft/Published separation, preset versioning and poster provenance

---

# 1. Environment North Star

AC environments phải làm website có cảm giác sống mà không đòi hỏi sự chú ý.

Bốn môi trường phải cùng thuộc một hệ thống nhưng mang bốn semantic roles rõ:

- AC AMBIENT establishes the system.
- DEAL NETWORK communicates direction.
- SPATIAL FIELD communicates orientation.
- EDITORIAL ARCHIVE communicates structured intelligence.

Nguyên tắc khóa:

- FIELD BEFORE PANEL
- RELATIONSHIP BEFORE DECORATION
- HUMAN BEFORE HUD
- The environment moves.
- The interface responds.
- The person remains calm.
- Content remains understandable when every effect is disabled.

Visual character:

- architectural
- spatial
- precise
- cinematic
- calm
- intelligent
- premium
- technical
- restrained
- human-compatible

Environment có thể truyền đạt:

- orientation
- direction
- relationship
- depth
- indexing
- context
- movement
- system state ở mức decorative/interaction state

Environment không được ngụ ý:

- live market data
- real property boundaries
- real transaction activity
- scientific spatial measurement
- real customer activity
- real operational status
- financial prediction

trừ khi một factual data layer độc lập cung cấp thông tin đã được xác minh.

Decorative geometry phải luôn đọc như visual language, không như dashboard factual.

---

# 2. Four-Family System

## ENV-01 — AC AMBIENT

Meaning: intersection, system, whole-property perspective, calm intelligence.
Primary use: Homepage, Services, Contact, Booking, general/fallback pages.
Visual signature: deep mineral-green field, intersection point, sparse datum, soft atmospheric light.

## ENV-02 — DEAL NETWORK

Meaning: direction, transaction context, geography, comparison, decision movement.
Primary use: DEAL, Real Estate content, selected market editorial.
Visual signature: measured linear paths, restrained nodes, decision branches, muted brass signal.

## ENV-03 — SPATIAL FIELD

Meaning: orientation, circulation, relationship, threshold, site/environment.
Primary use: SPACE, Spatial Consultation content, method/orientation material.
Visual signature: arcs, field lines, orientation marks, circulation paths, emerald/mint/restrained cyan.

## ENV-04 — EDITORIAL ARCHIVE

Meaning: indexed knowledge, documents, method, structured intelligence.
Primary use: Insights, Guides, Articles, Videos, Search, future active Tools.
Visual signature: editorial grid, index markers, document traces, ruled lines, structured planes.

## Family boundary rules

1. Không tạo family thứ năm cho About, Contact, Booking, Search hoặc future route.
2. Page variation đến từ preset, intensity, density, crop, safe zones, responsive transformation và medium.
3. AC AMBIENT là general fallback; không dùng DEAL/SPACE semantics một cách ngẫu nhiên trên neutral routes.
4. DEAL NETWORK không xuất hiện như stock/crypto/MLS visualization.
5. SPATIAL FIELD không dùng mystical/Feng Shui cliché.
6. EDITORIAL ARCHIVE không biến thành admin dashboard.
7. CONDITION không có environment hoặc public preset.

---

# 3. Shared Layer Model

Hệ layer nhỏ nhất hữu ích gồm sáu lớp.

## L0 — BASE FIELD

Purpose: tonal foundation và contrast baseline.
Visibility: luôn hiện, kể cả static/reduced motion.
Motion: không hoặc drift cực chậm.
Responsive: giữ nguyên meaning, giảm texture/noise trên mobile.
Medium: procedural, video hoặc static.
Studio: family, brightness, tonal bias.

## L1 — STRUCTURAL GEOMETRY

Purpose: establish architectural logic của family.
Visibility: sparse, không full-screen graph paper.
Motion: mostly static; có thể drift/reveal chậm.
Responsive: density giảm mạnh dưới 768.
Medium: procedural ưu tiên; static fallback bắt buộc.
Studio: density, visibility, portrait-safe mode.

## L2 — AMBIENT LIGHT

Purpose: depth, atmosphere, silhouette separation, section transition.
Visibility: broad, soft, low-frequency.
Motion: very slow intensity/position drift.
Responsive: ít light sources hơn, amplitude thấp hơn.
Medium: procedural/video/static gradient.
Studio: brightness, contrast mode, portrait-safe mode.

## L3 — SEMANTIC SIGNAL

Purpose: family-specific meaning: intersection, direction, orientation hoặc indexing.
Visibility: selective, not continuous noise.
Motion: family motion class.
Responsive: một hoặc vài signal tối đa trên mobile.
Medium: procedural preferred; video/static alternative.
Studio: signal accent, intensity, interaction policy.

## L4 — INTERACTION RESPONSE

Purpose: acknowledge focus, hover, selection hoặc CTA.
Visibility: only after interaction.
Motion: immediate, short, one-shot.
Responsive: tap/focus alternative; no hover dependency.
Medium: procedural/UI-linked.
Studio: interaction on/off and intensity; advanced timing in Visual Director.

## L5 — CONTENT CONTRAST VEIL

Purpose: protect copy/portrait/forms without opaque card walls.
Visibility: local only where content needs it.
Motion: none or follows section transition without visible lag.
Responsive: stronger on mobile if text occupies more field.
Medium: gradient/tonal suppression.
Studio: copy-safe mode, portrait-safe mode, background brightness.

Layer ordering is semantic, not a required implementation stack.

---

# 4. Color System

## Shared base palette

- Near-black green: primary deep field and text-edge contrast.
- Deep forest: structural tonal depth.
- Mineral green: secondary plane and atmosphere.
- Warm off-white: content contrast reference.
- Emerald: AC/SPACE positive spatial signal.
- Mint: focus, relationship highlight, soft orientation cue.
- Restrained cyan: selective SPACE depth signal only.
- Muted brass: DEAL directional/decision signal.
- Controlled violet: rare editorial transition only when semantic justification exists.

## ENV-01 — AC AMBIENT

Base: near-black green + deep forest.
Secondary: mineral green.
Signal: emerald/mint intersection point.
Highlight: warm off-white reflected haze, not white bloom.
Text relationship: copy sits over calmer, darker field.
Portrait relationship: green must not contaminate skin; maintain neutral/warm edge separation.
Warning: do not add brass/cyan merely to show all brand colors.

## ENV-02 — DEAL NETWORK

Base: near-black green / deep forest.
Secondary: mineral/blue-green trace.
Signal: muted brass.
Highlight: warm pale mineral.
Text relationship: brass never used behind body copy at high brightness.
Portrait relationship: keep brass/trace away from face.
Warning: no red/green trading palette, ticker aesthetic or bright financial green.

## ENV-03 — SPATIAL FIELD

Base: deep spatial green.
Secondary: mineral green.
Signal: emerald + mint.
Selective depth: restrained cyan.
Highlight: warm off-white/neutral.
Text relationship: arcs/fields lower contrast inside copy-safe zones.
Portrait relationship: avoid cyan/green edge spill onto skin.
Warning: no gold mystical language, rainbow aura or saturated cyan wash.

## ENV-04 — EDITORIAL ARCHIVE

Base: near-black green or mineral-dark depending page context.
Secondary: graphite/mineral.
Signal: mint/emerald index.
Optional accent: muted brass for selected issue/feature, not every item.
Highlight: warm off-white ruled/document plane.
Text relationship: content must dominate; background contrast lower than typography.
Portrait relationship: occasional author media remains visually separate.
Warning: no terminal-blue, database green or faux document text.

---

# 5. Lighting System

## Shared light behaviors

### Ambient Field Light
Large, soft, stable tonal depth. Never pulses visibly.

### Directional Glow
Used mainly by DEAL to imply path/decision; travels slowly and sparsely.

### Edge Light
Used to separate portrait/media silhouette; stationary or extremely stable.

### Localized Signal
Small semantic emphasis around intersection/node/arc/index; no giant bloom.

### Content Contrast Support
Local darkening/tonal veil behind copy and forms.

## Hero

- deepest spatial range
- one primary atmospheric source and one subtle secondary source maximum
- portrait separation stable
- no bright center behind headline or face
- semantic signal may be slightly more visible than later sections

## Section transition

- geometry may converge/reconfigure once
- brightness variation must remain subtle
- transition should not cross copy as a moving spotlight

## Content area

- lower light amplitude
- reduced geometry and lower contrast
- editorial/media hierarchy dominates

## Contact / Footer convergence

- visual noise reduces toward near zero
- one calm field light remains
- no dramatic CTA glow
- forms receive stable contrast, not moving light

Prohibited:

- light crossing Owner face
- fast brightness changes
- repeated large lens flare
- bright bloom behind body text
- continuous spotlight tracking cursor

---

# 6. Motion Taxonomy

Use six motion classes only.

| Class | Purpose | Speed character | Amplitude | Frequency | Desktop | Mobile | Reduced motion | Loop suitability |
|---|---|---|---|---|---|---|---|---|
| AMBIENT DRIFT | Keep field alive | Very slow | Very low | Continuous | Yes | Minimal or off | Static | High |
| DIRECTIONAL PROPAGATION | Communicate DEAL direction | Slow measured travel | Low | Occasional / one-shot | Yes | Simplified | Static signal state | High if sparse |
| ORIENTATION RESPONSE | Communicate SPACE relationship | Slow arc/field adjustment | Low | On interaction/section | Yes | Tap-state/static | Static geometry | Medium-high |
| INDEX REVEAL | Communicate archive/index | Controlled short reveal | Very low | Per section/item | Yes | Minimal | Immediate state | Not continuous |
| SECTION TRANSITION | Connect page environments | Slow-medium one-time | Low | Once per section | Yes | Simplified/off | Instant | N/A |
| INTERACTION PULSE | Acknowledge hover/focus/tap | Immediate, short | Very low | On action only | Yes | Tap/focus | Instant contrast state | N/A |

No motion may exist solely to prove animation.

---

# 7. Intensity System

Four levels are useful because OFF is an accessibility/state mode, while CALM/STANDARD/EXPRESSIVE are creative presets.

## OFF

- static field
- no continuous motion
- interaction uses contrast/geometry state only
- used for reduced motion, performance fallback and Motion Off preset

## CALM — Default for most public pages

- minimal ambient drift
- sparse signals
- no continuous interaction response
- best for Home, Contact, Booking, Search, long-form content

## STANDARD — Default for service heroes

- visible but restrained semantic motion
- one-shot hover/focus/tap response
- moderate depth
- best for DEAL and SPACE hero/orientation moments

## EXPRESSIVE — Exceptional only

- richer depth, more visible transition and signal response
- never default for long-form, forms or mobile
- requires art-direction review
- still no aggressive motion

Owner-safe Studio controls:

- Environment family
- Preset
- Intensity
- Motion policy
- Signal accent
- Background brightness
- Portrait-safe mode
- Mobile behavior
- Static fallback
- Reduced-motion preview

Advanced-only:

- low-level timing curves
- geometry internals
- noise/seed
- coordinate logic
- render diagnostics

---

# 8. Interaction Rules

## Pointer movement

Default: no cursor-chasing light.
Allowed: very low-amplitude field bias within a narrow range on desktop only.
Not required for comprehension.

## Section selection

Allowed: one semantic emphasis change when section becomes active.
Do not continuously animate every visible section.

## DEAL hover/focus/tap

- one restrained directional signal
- brass path becomes clearer
- static/focus state remains readable without motion
- touch receives tap/focus equivalent

## SPACE hover/focus/tap

- one orientation arc/field relationship opens slightly
- emerald/mint signal increases
- touch receives tap/focus equivalent

## Scroll

Only slow parallax/reveal within limits defined in Section 9.

## Keyboard focus

Environment may acknowledge focus, but UI focus ring must remain independent and visible.

## CTA interaction

Short signal response only. No constant pulse. Environment must never delay navigation.

---

# 9. Scroll Rules

Allowed:

- one or two depth planes moving at very low relative speed
- gradual geometry reveal tied to section entrance
- field-to-field tonal transition
- isolated DEAL signal movement
- isolated archive index reveal

Avoid:

- scroll-jacking
- camera fly-through
- constant zoom
- independent content drift
- rapidly changing perspective
- scroll-linked face/portrait motion
- required scroll motion for understanding

Rules:

1. Foreground content remains fixed to normal document flow.
2. Background parallax stays subtle enough that users may not consciously notice it.
3. Motion amplitude decreases at 1024 and below.
4. At 768 and mobile, most scroll-linked behavior becomes one-time reveal or static.
5. Reduced motion removes all scroll dependence.

---

# 10. Loop Rules

## General

- camera locked or effectively locked
- no camera fly-through
- start/end geometry align
- light level returns smoothly
- signal direction remains continuous
- no unexpected object entry
- no text/logos in generated video
- poster must match first visible state closely

## Recommended durations

- AC AMBIENT: 18–30 seconds
- DEAL NETWORK: 14–24 seconds
- SPATIAL FIELD: 18–30 seconds
- EDITORIAL ARCHIVE: 20–36 seconds

## Visible seam risk

High when:

- a bright signal crosses frame only once
- camera drifts continuously in one direction
- geometry morphs without returning
- light blooms strongly

Mitigation:

- cycle semantic signals with soft fade before seam
- use reversible or closed-path motion
- maintain fixed camera
- match first/last light and geometry states

## Poster relationship

Poster should represent the calm base frame, not a random peak-motion moment.

---

# 11. ENV-01 — AC AMBIENT

ENVIRONMENT ID: ENV-01
PUBLIC NAME: AC AMBIENT
INTERNAL PURPOSE: General AC system field and whole-property perspective environment.
PRIMARY PAGES: Homepage, Services, Contact, Booking.
SECONDARY PAGES: About utility sections, Search/general fallback.
SEMANTIC MEANING: intersection, system, perspective, calm intelligence.
VISUAL THESIS: one calm mineral-green spatial field where a small number of datum relationships converge around an implied AC intersection without looking like a network dashboard.

BASE FIELD: near-black/deep forest gradient with mineral depth.
FOREGROUND LAYER: sparse local datum fragments and one controlled intersection cue.
MIDGROUND LAYER: broad atmospheric light plane and one or two subtle depth planes.
BACKGROUND LAYER: quiet mineral texture/noise, nearly static.
GEOMETRY: long datum lines, partial frame edges, sparse nodes, non-uniform grid fragments, one intersection point.
LIGHT SOURCES: broad upper/side atmospheric source; stable portrait edge separation source.
COLOR SEMANTICS: deep green = system; mint/emerald = active intersection; warm pale mineral = human/content contrast.
TEXT-SAFE ZONES: default left 45–55% on Homepage; centered calm zone for forms; configurable by page composition.
PORTRAIT-SAFE ZONES: default right 30–40%; no line/bright node crossing face/torso silhouette.
MOTION CLASSES: AMBIENT DRIFT, SECTION TRANSITION, INTERACTION PULSE.
INTERACTION RESPONSE: subtle field bias; DEAL/SPACE orientation may activate family-specific cues temporarily without changing base family.
SCROLL RESPONSE: slow depth separation, then visual deceleration toward Contact/Footer.
LOOP BEHAVIOR: fixed camera; light and one intersection signal complete closed cycle.
DESKTOP BEHAVIOR: full spatial depth, sparse geometry, portrait support.
TABLET BEHAVIOR: reduce depth planes and line count; maintain copy/portrait separation.
MOBILE BEHAVIOR: simplified static/low-motion field; portrait appears in page sequence, not over-animated background.
REDUCED-MOTION BEHAVIOR: intentional static master.
STATIC FALLBACK: mineral green gradient, one intersection cue, sparse datum; wide and mobile variants.
VIDEO FALLBACK: optional premium 18–30 sec locked loop; not required for launch.
PROCEDURAL PREFERENCE: PROCEDURAL FIRST.
GEN-AI USE: allowed for concept/static artwork; no text/logo/fake data.
PERFORMANCE RISK: above-fold procedural startup and overdraw; mitigate with immediate static poster and low complexity.
ACCESSIBILITY TREATMENT: decorative, hidden from assistive technology.
STUDIO CONTROLS: preset, intensity, brightness, intersection signal, portrait-safe, mobile mode, motion policy, static fallback.
PAGE-ASSET ROLE: home.hero.environment / services.environment / contact.environment.
ASSET NAMES: ac-env-ac-ambient-static-wide-v01; ac-env-ac-ambient-static-mobile-v01; ac-env-ac-ambient-poster-wide-v01; ac-env-ac-ambient-video-wide-v01; ac-env-ac-ambient-procedural-preset-v01.
DO NOT: outer-space nebula, particle cloud, radar, financial network, bright center behind copy, lines across face.

### Medium recommendation

PROCEDURAL FIRST. Static is launch-critical. Video is premium alternate only.

### Video production concept

Master: 3840×2160 or highest practical master, 24/30fps, 18–30 sec.
Web: responsive 1080p/720p delivery, 24/30fps, modern web codec with compatible fallback.
File-size philosophy: visual subtlety matters more than high bitrate; keep above-fold delivery conservative and poster-first.
Mobile: static by default; optional lightweight loop only after performance QA.

---

# 12. ENV-02 — DEAL NETWORK

ENVIRONMENT ID: ENV-02
PUBLIC NAME: DEAL NETWORK
INTERNAL PURPOSE: Directional environment for Real Estate decision context.
PRIMARY PAGES: DEAL.
SECONDARY PAGES: Real Estate articles, selected market/decision editorial.
SEMANTIC MEANING: direction, comparison, geography, decision pathways, measured movement.
VISUAL THESIS: a restrained field of linear paths and decision branches where one muted brass signal travels with purpose; nothing resembles live transactions or market data.

BASE FIELD: near-black/deep forest.
FOREGROUND LAYER: one or two directional traces and occasional branch marker.
MIDGROUND LAYER: sparse nodes and geographic suggestion without real map boundaries.
BACKGROUND LAYER: mineral directional haze and very faint line field.
GEOMETRY: lateral paths, directional arrows/marks, branch decisions, sparse connection nodes, non-literal geographic contours.
LIGHT SOURCES: low directional edge glow and localized brass signal.
COLOR SEMANTICS: deep green = context; brass = decision/direction; mineral = neutral path; warm off-white = content.
TEXT-SAFE ZONES: avoid crossing headline/body with active brass path; default calm zone opposite primary movement.
PORTRAIT-SAFE ZONES: owner/context portrait kept clear of nodes and branch junctions.
MOTION CLASSES: DIRECTIONAL PROPAGATION, SECTION TRANSITION, INTERACTION PULSE.
INTERACTION RESPONSE: one controlled brass path propagation on DEAL focus/selection.
SCROLL RESPONSE: slow path reveal or one branch alignment; no ticker/stream.
LOOP BEHAVIOR: signal moves on a closed or fade-reset path; start/end brightness matched.
DESKTOP BEHAVIOR: moderate path depth and one active signal.
TABLET BEHAVIOR: fewer branches, one primary route.
MOBILE BEHAVIOR: mostly static linear composition; one tap/focus state if procedural.
REDUCED-MOTION BEHAVIOR: static directional relationship remains clear.
STATIC FALLBACK: deep green field, one main path, muted brass marker; no fake labels/data.
VIDEO FALLBACK: optional 14–24 sec loop, locked camera.
PROCEDURAL PREFERENCE: PROCEDURAL FIRST with static master.
GEN-AI USE: allowed for non-data conceptual artwork; prohibited for fake property map/data.
PERFORMANCE RISK: too many lines/nodes and interaction hooks; cap visual density.
ACCESSIBILITY TREATMENT: decorative; service meaning remains in content.
STUDIO CONTROLS: preset, intensity, path density, brass signal on/off, interaction policy, brightness, mobile mode, fallback.
PAGE-ASSET ROLE: deal.hero.environment / deal.editorial.environment.
ASSET NAMES: ac-env-deal-network-static-wide-v01; ac-env-deal-network-static-mobile-v01; ac-env-deal-network-poster-wide-v01; ac-env-deal-network-video-wide-v01; ac-env-deal-network-procedural-preset-v01.
DO NOT: stock market, crypto graph, fake MLS map, ticker, real-time transaction animation, flashing nodes, bright red/green trading palette.

### Medium recommendation

PROCEDURAL FIRST. Static launch master required. Video optional for premium hero/social derivative.

### Video production concept

Master: 3840×2160, 24/30fps, 14–24 sec.
Web: 1080p/720p 24/30fps.
Signal speed: measured; no more than one visually dominant propagation at a time.
Mobile: static default or 720p lightweight alternate after QA.

---

# 13. ENV-03 — SPATIAL FIELD

ENVIRONMENT ID: ENV-03
PUBLIC NAME: SPATIAL FIELD
INTERNAL PURPOSE: Orientation and relationship environment for SPACE.
PRIMARY PAGES: SPACE.
SECONDARY PAGES: Spatial method/education content.
SEMANTIC MEANING: orientation, circulation, relationship, threshold, site/environment.
VISUAL THESIS: a dark architectural field in which partial arcs, paths and threshold relationships respond slowly and precisely, clearly interpretive rather than scientific or mystical.

BASE FIELD: deep spatial green with mineral depth.
FOREGROUND LAYER: partial orientation arc and one circulation/path signal.
MIDGROUND LAYER: field lines, threshold geometry, subtle compass structure.
BACKGROUND LAYER: atmospheric green depth with restrained cyan only at far depth.
GEOMETRY: arcs, partial radial relationships, circulation paths, entrance/threshold cues, sparse compass-like orientation marks.
LIGHT SOURCES: soft emerald/mint relational glow; stable warm edge separation for portrait/content.
COLOR SEMANTICS: emerald = active relation; mint = orientation; restrained cyan = depth; warm neutral = human/content.
TEXT-SAFE ZONES: suppress radial/arc intersections behind copy; maintain calm field.
PORTRAIT-SAFE ZONES: no arc through head/face/hands; avoid cyan spill on skin.
MOTION CLASSES: ORIENTATION RESPONSE, AMBIENT DRIFT, SECTION TRANSITION, INTERACTION PULSE.
INTERACTION RESPONSE: one arc opens/aligns on SPACE focus or tap; static state remains meaningful.
SCROLL RESPONSE: circulation path/field relationship reveals once; no camera movement.
LOOP BEHAVIOR: arcs breathe/shift within small range and return; light remains stable.
DESKTOP BEHAVIOR: richer relational depth and multiple subdued arcs.
TABLET BEHAVIOR: one dominant arc/path, lower depth.
MOBILE BEHAVIOR: simplified vertical orientation cue or static field; no dense radial crop.
REDUCED-MOTION BEHAVIOR: static orientation geometry.
STATIC FALLBACK: dark spatial field, one arc, one threshold/path cue, copy-safe zone.
VIDEO FALLBACK: optional 18–30 sec locked loop.
PROCEDURAL PREFERENCE: PROCEDURAL FIRST.
GEN-AI USE: allowed for clearly conceptual/static environment; no mystical/scientific pretense.
PERFORMANCE RISK: layered arcs/blur and overdraw; reduce layers/resolution on mobile.
ACCESSIBILITY TREATMENT: decorative; any method meaning must be written in content.
STUDIO CONTROLS: preset, intensity, orientation density, accent balance, portrait-safe, mobile simplification, motion policy, fallback.
PAGE-ASSET ROLE: space.hero.environment / space.editorial.environment.
ASSET NAMES: ac-env-space-field-static-wide-v01; ac-env-space-field-static-mobile-v01; ac-env-space-field-poster-wide-v01; ac-env-space-field-video-wide-v01; ac-env-space-field-procedural-preset-v01.
DO NOT: Bagua wallpaper, gold dragons, magic beams, astrology, fantasy temple, mystical smoke, fake measurement readout, bright compass rose behind copy.

### Traditional-reference rule

Traditional Feng Shui references, when used, must remain editorial, precise, interpretive and restrained. Never present decorative geometry as scientific measurement.

### Medium recommendation

PROCEDURAL FIRST. Static required. Premium loop optional.

### Video production concept

Master: 3840×2160, 24/30fps, 18–30 sec.
Web: 1080p/720p 24/30fps.
Motion: arcs and field lines shift subtly; camera fixed.
Mobile: static default; optional very low-density loop only after motion/performance review.

---

# 14. ENV-04 — EDITORIAL ARCHIVE

ENVIRONMENT ID: ENV-04
PUBLIC NAME: EDITORIAL ARCHIVE
INTERNAL PURPOSE: Structured knowledge environment for public content.
PRIMARY PAGES: Insights, Guides, Articles, Videos.
SECONDARY PAGES: Search, future active Tools.
SEMANTIC MEANING: indexing, archive, documents, method, public intelligence.
VISUAL THESIS: a quiet editorial field of ruled planes, index markers and document/diagram fragments that supports content hierarchy without resembling an admin screen or fake analytics system.

BASE FIELD: mineral-dark/near-black green or warm-mineral dark depending content.
FOREGROUND LAYER: occasional index marker or ruled line; no fake text.
MIDGROUND LAYER: editorial planes/document traces.
BACKGROUND LAYER: low-contrast grid and soft archive depth.
GEOMETRY: editorial grid, margins, index numbers without factual implication, document edges, diagram fragments.
LIGHT SOURCES: soft page-like edge illumination and one selected index highlight.
COLOR SEMANTICS: mineral = archive; mint/emerald = selected index; brass = rare featured issue; warm off-white = reading reference.
TEXT-SAFE ZONES: broad calm areas behind titles/body; geometry suppressed around long-form text.
PORTRAIT-SAFE ZONES: author image frames remain separate; no document marks across face.
MOTION CLASSES: INDEX REVEAL, AMBIENT DRIFT at near-zero, SECTION TRANSITION.
INTERACTION RESPONSE: metadata/index illumination or subtle plane shift; no fake dashboard activity.
SCROLL RESPONSE: occasional index reveal; no continuous parallax in long-form.
LOOP BEHAVIOR: if video used, nearly static 20–36 sec with subtle plane/light cycle.
DESKTOP BEHAVIOR: editorial depth with sparse indexed planes.
TABLET BEHAVIOR: fewer planes and larger calm zones.
MOBILE BEHAVIOR: mostly static; simple ruled/index cue.
REDUCED-MOTION BEHAVIOR: static editorial master.
STATIC FALLBACK: intentional archive composition, title-safe and content-first.
VIDEO FALLBACK: usually unnecessary; premium alternate only.
PROCEDURAL PREFERENCE: HYBRID, leaning STATIC/PROCEDURAL.
GEN-AI USE: allowed for conceptual editorial artwork; no fake documents/data/text.
PERFORMANCE RISK: unnecessary section-level scenes and repeated grids; prefer one shared static/procedural field.
ACCESSIBILITY TREATMENT: decorative.
STUDIO CONTROLS: preset, intensity, grid/plane density, index accent, brightness, mobile/static, reduced motion.
PAGE-ASSET ROLE: insights.environment / search.environment.
ASSET NAMES: ac-env-editorial-archive-static-wide-v01; ac-env-editorial-archive-static-mobile-v01; ac-env-editorial-archive-poster-wide-v01; ac-env-editorial-archive-video-wide-v01; ac-env-editorial-archive-procedural-preset-v01.
DO NOT: admin dashboard, terminal, database screenshot, fake analytics, faux document text, blinking cursor, rows of metrics.

### Medium recommendation

HYBRID: static/procedural first. Video is optional and low priority.

### Video production concept

Master: 3840×2160, 24fps, 20–36 sec.
Web: 1080p/720p 24fps only if used.
Mobile: static.
Motion: plane/light shift and index reveal only.

---

# 15. Procedural / Video / Static Strategy

| Environment | Preferred mode | Why | Static requirement | Video role | Complexity note |
|---|---|---|---|---|---|
| AC AMBIENT | Procedural First | Responsive, Studio-controllable, portrait-safe adaptation | P0 | Premium alternate | Keep layer count low above fold |
| DEAL NETWORK | Procedural First | Semantic path response and responsive simplification | P0 | Premium/social alternate | Avoid node/path excess |
| SPATIAL FIELD | Procedural First | Arc/field relationship benefits from interaction | P0 | Premium alternate | Blur/arc layers can be expensive |
| EDITORIAL ARCHIVE | Hybrid Static/Procedural | Long-form content needs stability more than motion | P0 | P3 only | One shared field, not per article |

## Render/export contract

### Static masters

- Wide master intent: 16:9 or free-field wide composition, minimum high-resolution source suitable for 2560px+ responsive export.
- Mobile master intent: dedicated 9:16 or vertical free-field composition, not blind crop.
- Web exports: AVIF/WebP conceptually, plus compatible fallback as repository requires.
- Preserve uncompressed/source master separately.
- No text, logos or factual labels baked into environment artwork.

### Static master, poster and reduced-motion relationship

- The static master is the approved visual source.
- A poster is normally an optimized delivery derivative of that approved static master or of the calm first frame of an approved loop.
- A separate poster composition is justified only when the video first frame cannot preserve copy-safe, portrait-safe or responsive requirements.
- Reduced-motion may reference the approved static master or poster derivative. It does not require a duplicate visual file merely to create a separate state.
- Source master, delivery poster and reduced-motion assignment must remain traceable to the same approved environment family and version.

### Video masters

- Production master: 4K where practical, 24/30fps; 60fps only for source experimentation, not default web delivery.
- Delivery: responsive 1080p/720p, 24/30fps.
- Codec: modern web codec with compatible fallback according to current platform support.
- Audio: none.
- Poster: required.
- Mobile: static by default; lightweight video only when performance and motion meaning justify it.
- File-size target philosophy: smallest file that preserves gradients/geometry without banding; never make comprehension depend on video load.

---

# 16. Responsive Matrix

Legend: Density 0–4; Motion OFF/CALM/STANDARD; Depth 0–4.

| Viewport | AC AMBIENT | DEAL NETWORK | SPATIAL FIELD | EDITORIAL ARCHIVE | Video rule | Static threshold |
|---|---|---|---|---|---|---|
| 1440+ | density 3, CALM, depth 4, full portrait-safe field | density 3, STANDARD, depth 3, one active brass path | density 3, STANDARD, depth 4, multiple subdued arcs | density 2, CALM, depth 2 | Desktop video allowed selectively | Static only on failure/reduced motion |
| 1280 | density 3, CALM, depth 3 | density 2–3, STANDARD, depth 3 | density 2–3, STANDARD, depth 3 | density 2, CALM, depth 2 | Video selective | Poster ready immediately |
| 1024 | density 2, CALM, depth 2, wider copy-safe zone | density 2, CALM/STANDARD, one main path | density 2, CALM, one main arc/path | density 1–2, CALM | Video usually off for heavy scenes | Static if sustained performance issue |
| 768 | density 1–2, CALM, depth 1–2 | density 1, CALM, static-friendly | density 1, CALM, simplified orientation | density 1, OFF/CALM | Video off by default | Static preferred |
| 390 | density 1, OFF/CALM, depth 1; copy-first | one static directional cue; tap state optional | one static vertical/arc cue | static ruled/index cue | Static default | Immediate static |
| 360 | density 0–1, OFF, depth 0–1 | static minimal path | static minimal orientation | static minimal archive | No background video | Static mandatory |

## Responsive transformation rules

- Mobile re-composes, not crops.
- Geometry count and overlap reduce before visual scale reduces.
- Copy-safe field grows as content stacks.
- Portrait support on mobile follows page architecture; environment never competes with service comprehension.
- Procedural complexity and blur reduce aggressively below 768.
- Reduced-motion static master may serve as mobile default.

---

# 17. Portrait Integration

## Silhouette clearance

- maintain clean perimeter around head, shoulders and visible hands
- no bright node, arc junction or path touching silhouette edge
- keep at least one calm tonal band between portrait and semantic signal

## Face-safe zone

- no scan line, grid crossing, flare, node or high-contrast line on face
- no moving light over face
- no cyan/green tint contaminating skin

## Skin-tone separation

- use stable warm-neutral edge light or tonal separation
- environment remains cooler/darker than skin
- portrait color grading remains human/natural

## Negative space

- default Home: copy left, portrait right
- service portraits: preserve gaze/scene lead room
- mobile: portrait receives dedicated composition and calmer field

## Geometry avoidance

- portrait-safe mode suppresses L1/L3 geometry inside configured silhouette mask/safe region
- no HUD frame around head unless extremely minimal and non-overlapping

## Motion avoidance

- semantic signal routes around portrait
- no constant motion within face-safe zone
- environment can drift behind body only at low contrast

## Mobile sequence

Homepage mobile presents proposition, DEAL/SPACE and Explore Services before large portrait. Environment supports that sequence rather than preserving desktop portrait placement.

---

# 18. Content Contrast

Use the least invasive mechanism first:

1. geometry suppression
2. local contrast veil
3. tonal gradient
4. background intensity reduction
5. subtle surface backing only where content requires
6. restrained text shadow as last small enhancement

## Copy-safe field

- copy region has lower geometry density and lower light amplitude
- active signals route away from long text
- body text receives stable background, not moving light

## Forms

- Contact/Booking use AC AMBIENT at CALM/OFF
- form area receives stable veil or editorial plane
- no animated path behind inputs or error messages

## Long-form content

- EDITORIAL ARCHIVE becomes near-static
- ruled/index geometry remains peripheral
- body copy hierarchy dominates

## Do not

- put every text block inside opaque card
- use heavy text shadow to compensate for bad environment
- animate brightness under reading content

---

# 19. Accessibility

- Environments are decorative by default and hidden from assistive technology.
- Semantic meaning remains in headings, labels, navigation and content.
- prefers-reduced-motion switches continuous motion to intentional static state.
- Focus visibility belongs to interface controls, not environment animation.
- Background contrast must support text at normal and 200% zoom.
- High-contrast/forced-color modes may suppress environment entirely.
- Background videos are muted, decorative, pauseable where controls are required by implementation policy, and always have poster fallback.
- If a manual pause control exists, paused state persists for the session where feasible.
- No motion required for service selection or comprehension.
- Motion avoids rapid brightness, flicker and large-field movement.
- Mobile static substitution is acceptable and often preferred.
- Decorative video needs no transcript; any editorial video is outside this environment spec and follows content-video accessibility rules.

---

# 20. Performance Contract

## Load priority

1. CONTENT
2. NAVIGATION
3. SERVICE ROUTES / CTA
4. PORTRAIT
5. STATIC POSTER
6. PROCEDURAL ENVIRONMENT
7. VIDEO ALTERNATE / INTERACTION EFFECTS

## Above the fold

- render readable base field immediately
- show static poster before procedural/video readiness
- procedural startup must not block interaction
- avoid multiple concurrent environment engines

## Section-level environments

- reuse family/preset rather than instantiate bespoke heavy scene per section
- lazy-initialize when near viewport if architecture permits
- stop or reduce offscreen motion

## Video

- desktop only when justified
- mobile static default
- poster required
- no autoplay audio
- no full-resolution source delivery

## Conceptual budgets

These are design targets, not claims about current implementation:

- First visual fallback should appear with normal page paint, not wait for scene initialization.
- Above-fold environment should use a small number of layers and signals.
- Background media should remain materially smaller than primary editorial video assets.
- Mobile should prefer static/sub-720p only when video is justified.
- Interaction effects should not trigger layout work or block navigation.

## Failure behavior

Environment failure must never block:

- navigation
- copy
- CTA
- forms
- portrait
- service selection

Fallback order:

procedural/video → static poster → base gradient field.

---

# 21. Studio Controls

## Owner-safe Page Editor controls

### Environment Family
AC AMBIENT / DEAL NETWORK / SPATIAL FIELD / EDITORIAL ARCHIVE, constrained by page/section policy.

### Preset
CALM / EDITORIAL / FOCUSED / CINEMATIC / MOTION OFF where allowed.

### Intensity
OFF / CALM / STANDARD / EXPRESSIVE, with page-safe defaults.

### Motion Policy
Use preset / On / Off / Reduced.

### Signal Accent
Family-approved semantic accent only.

### Background Brightness
Limited safe range.

### Portrait-Safe Mode
On/off or automatic where portrait slot exists.

### Mobile Behavior
Static / Simplified procedural / Lightweight motion if approved.

### Static Fallback
Select approved family static asset.

### Reduced-Motion Preview
Preview static/reduced state.

## Advanced Visual Director controls

- detailed layer visibility
- geometry density ranges
- timing relationships
- parallax strength
- procedural seed/noise
- advanced light placement
- diagnostic overlay
- render/performance diagnostics

## Guardrails

- page policy can restrict environment family
- signal accent limited to semantic palette
- Expressive disabled on forms/long-form/mobile by default
- portrait-safe automatically recommended when owner media assigned
- no CONDITION family or preset

---

# 22. Presets

Use five compact presets.

## CALM

Default: AC AMBIENT, Contact, Booking, general sections.
Motion: minimal ambient.
Density: low.
Allowed: all families.
Forbidden: multiple active signals, expressive transitions.

## EDITORIAL

Default: EDITORIAL ARCHIVE.
Motion: near-zero/index reveal only.
Density: low-medium peripheral.
Allowed: AC AMBIENT supporting content.
Forbidden: heavy parallax, bright signal.

## FOCUSED

Default: selected DEAL/SPACE service moments.
Motion: one semantic response.
Density: medium but controlled.
Allowed: DEAL NETWORK / SPATIAL FIELD / AC AMBIENT orientation.
Forbidden: forms and long-form body sections.

## CINEMATIC

Use: selected desktop hero/premium campaign only.
Motion: richer light/depth within restraint.
Density: medium.
Allowed: AC AMBIENT, DEAL NETWORK, SPATIAL FIELD.
Forbidden: mobile default, reduced motion, Contact/forms, long-form, EDITORIAL ARCHIVE body pages.

## MOTION OFF

Use: reduced motion, performance fallback, manual choice.
Motion: none.
Density: static composition retained.
Allowed: all families.
Forbidden: none.

## Default mapping

| Context | Environment family | Preset | Intensity |
|---|---|---|---|
| Home Hero | AC AMBIENT | CALM or FOCUSED | CALM by default; STANDARD only after art-direction review |
| Services | AC AMBIENT | FOCUSED | CALM or STANDARD |
| DEAL Hero | DEAL NETWORK | FOCUSED | STANDARD |
| SPACE Hero | SPATIAL FIELD | FOCUSED | STANDARD |
| Insights | EDITORIAL ARCHIVE | EDITORIAL | CALM |
| Contact / Booking | AC AMBIENT | CALM | CALM or OFF |
| Search | EDITORIAL ARCHIVE or policy-approved AC AMBIENT | EDITORIAL, CALM or MOTION OFF | OFF or CALM |

Preset and Intensity are separate controls. A combined label such as `STANDARD-FOCUSED` is not an approved stored value.

---

# 23. Page Assets Contract

| Role | Family | Primary asset | Procedural scene | Static fallback | Video fallback | Mobile override | Reduced-motion | Approval | Reuse rule |
|---|---|---|---|---|---|---|---|---|---|
| home.hero.environment | AC AMBIENT | approved procedural preset | ac-env-ac-ambient-procedural-preset-v01 | ac-env-ac-ambient-static-wide-v01 | optional ac-env-ac-ambient-video-wide-v01 | dedicated mobile static/simplified preset | static | Owner approval for master | Home/general family |
| services.environment | AC AMBIENT | focused service orientation preset | ac-env-ac-ambient-procedural-focused-v01 | AC Ambient static | optional none | simplified/static | static | Owner approval | Services/general |
| deal.hero.environment | DEAL NETWORK | approved procedural preset | ac-env-deal-network-procedural-preset-v01 | deal wide static | optional deal video | dedicated mobile static | static | Owner approval | DEAL family only |
| deal.editorial.environment | DEAL NETWORK | editorial/calm preset | ac-env-deal-network-procedural-editorial-v01 | deal static | none by default | static | static | Design/content approval | DEAL editorial only |
| space.hero.environment | SPATIAL FIELD | approved procedural preset | ac-env-space-field-procedural-preset-v01 | space wide static | optional space video | dedicated mobile static | static | Owner approval | SPACE family only |
| space.editorial.environment | SPATIAL FIELD | editorial/calm preset | ac-env-space-field-procedural-editorial-v01 | space static | none by default | static | static | Design/content approval | SPACE editorial only |
| insights.environment | EDITORIAL ARCHIVE | archive preset/static | ac-env-editorial-archive-procedural-preset-v01 | archive wide static | optional P3 | mobile static | static | Owner/design approval | Insights/content family |
| search.environment | EDITORIAL ARCHIVE or AC AMBIENT | calm compact preset | shared preset | shared static | none | static | static | Design approval | shared utility use |
| contact.environment | AC AMBIENT | calm low-intensity preset | ac-env-ac-ambient-procedural-calm-v01 | AC Ambient static | none by default | static | static | Owner approval for master | Contact/Booking |

Contract rules:

- Page Assets remains assignment authority.
- Visual Director controls advanced presentation and preset behavior, not ownership of assigned media.
- Mobile/reduced-motion overrides use approved family assets, never a new visual identity.
- Assignment does not equal approval unless governance explicitly defines it.
- Draft assignment does not become Published assignment automatically.
- A procedural preset, static fallback and optional video alternate must remain inside the same approved environment family.
- Do not design database schema from this contract.

## 23.1 Required Environment Metadata

Before a P0/P1 environment asset or procedural preset is approved or assigned, the Media Library, Visual Director or linked production manifest should be able to reference:

- environment ID and family
- asset or preset version
- source-master filename
- delivery-derivative filename
- medium: procedural / static / video / hybrid
- source or generation provenance
- commercial-use / rights status
- approved prompt or production reference where generated media is used
- wide / mobile / reduced-motion compatibility
- copy-safe zone
- portrait-safe zone
- poster relationship
- supported preset
- allowed intensity range
- page-family restrictions
- approval status
- Owner / Designer / Developer review where required
- superseded or archived version
- no-fake-data review
- CONDITION exclusion review

This is an operational handoff requirement, not a database schema.

## 23.2 Assignment Authority and Publishing Rules

1. Media Library stores approved environment assets and derivatives.
2. Page Assets assigns an approved family, preset and fallback to a page or section.
3. Visual Director may tune only the presentation controls allowed by the assignment and role contract.
4. Draft and Published assignments remain separate.
5. A page may not silently switch environment family because a preferred asset fails.
6. Device-specific overrides must use approved assets from the same family.
7. `home.hero.environment` should normally remain AC AMBIENT.
8. `deal.hero.environment` remains DEAL NETWORK.
9. `space.hero.environment` remains SPATIAL FIELD.
10. `insights.environment` normally remains EDITORIAL ARCHIVE unless a documented content-policy decision selects AC AMBIENT.
11. Contact and Booking must use a stable AC AMBIENT state with no motion beneath active form fields.
12. CONDITION has no public assignment target, preset or fallback.

## 23.3 Fallback Resolution Order

Use this order:

```text
approved procedural preset
→ approved video alternate, only when policy permits
→ approved family poster / static derivative
→ approved family base gradient
```

Additional rules:

- Reduced-motion skips directly to the approved static state.
- Mobile normally selects a dedicated mobile static or simplified procedural state before considering video.
- A fallback must not borrow another family merely because its colors appear compatible.
- Failure of the environment must not change copy, CTA, portrait or form behavior.
- Every fallback assignment should preserve the approved environment version and provenance.

---

# 24. Asset Naming

Pattern:

ac-[family]-[page-or-context]-[role]-[orientation]-v[number]

## Source master

ac-env-ac-ambient-source-wide-v01
ac-env-deal-network-source-wide-v01
ac-env-space-field-source-wide-v01
ac-env-editorial-archive-source-wide-v01

## Static poster/master

ac-env-ac-ambient-static-wide-v01
ac-env-ac-ambient-static-mobile-v01
ac-env-deal-network-static-wide-v01
ac-env-space-field-static-wide-v01
ac-env-editorial-archive-static-wide-v01

## Desktop video

ac-env-ac-ambient-video-wide-v01
ac-env-deal-network-video-wide-v01
ac-env-space-field-video-wide-v01
ac-env-editorial-archive-video-wide-v01

## Mobile video

Only if approved:

ac-env-deal-network-video-mobile-v01

## Social derivative

ac-env-ac-ambient-social-wide-v01
ac-env-deal-network-social-wide-v01
ac-env-space-field-social-wide-v01
ac-env-editorial-archive-social-wide-v01

## Procedural preset

ac-env-ac-ambient-procedural-preset-v01
ac-env-ac-ambient-procedural-focused-v01
ac-env-deal-network-procedural-preset-v01
ac-env-deal-network-procedural-editorial-v01
ac-env-space-field-procedural-preset-v01
ac-env-space-field-procedural-editorial-v01
ac-env-editorial-archive-procedural-preset-v01

Procedural preset names follow the same approved `ac-...` namespace as visual assets. The word `preset` or the preset role belongs inside the role portion of the filename, not as a separate filename prefix.

Rules:

- lowercase
- hyphen-separated
- version required for approved public masters
- no spaces
- no final-final-2
- language suffix only when visual itself contains localized text; environments should normally contain none
- source and derivatives remain distinct
- archived versions never overwrite approved master

---

# 25. Still Image Prompts

Prompts describe non-documentary environmental artwork. They must not request text, logos or fake data.

## ENV-01 — AC AMBIENT

### Master Still Prompt

A calm architectural digital atmosphere for a premium property and spatial intelligence brand, deep near-black mineral green field, sparse non-uniform datum lines and partial architectural guides, one subtle intersection point slightly right of center, soft atmospheric side light, restrained depth planes, large clean text-safe area on the left, portrait-safe zone on the right with no lines crossing the face or body, precise editorial composition, cinematic but quiet, human-compatible, no readable text, no logos, no data, wide 16:9 composition intent.

### Mobile Still Prompt

A vertically composed calm architectural field in deep mineral green, simplified datum structure, one restrained intersection cue below center, broad dark copy-safe area in the upper half, low geometry density, subtle depth and stable light, designed for mobile 9:16 without cropping a desktop image, no text, no logo, no data, no portrait obstruction.

### Negative Prompt

outer space, stars, nebula, particle storm, crypto network, stock market, radar, cockpit HUD, neon purple, bright cyan wash, giant lens flare, heavy fog, text, logo, numbers, charts, map, dashboard, glowing border, face-obscuring lines.

## ENV-02 — DEAL NETWORK

### Master Still Prompt

A restrained architectural network environment representing direction and decision pathways, deep forest and near-black green base, sparse linear routes and a few measured branch points, one muted brass signal moving conceptually from left to right, non-literal geographic suggestion without map boundaries, large calm copy-safe area, premium editorial composition, controlled depth, no factual data, no labels, no property map, wide 16:9 intent.

### Mobile Still Prompt

A vertical mobile composition with one clear directional path and one restrained brass marker on a deep green field, minimal nodes, no dense network, broad copy-safe zone, low depth, calm and precise, no text, no chart, no map, 9:16 intent.

### Negative Prompt

stock chart, crypto graph, trading terminal, red and green candles, live data, MLS map, property pins, ticker, flashing nodes, cyberpunk, neon, particle swarm, arrows everywhere, text, logo, numbers, financial dashboard.

## ENV-03 — SPATIAL FIELD

### Master Still Prompt

A precise architectural spatial field representing orientation, circulation and relationship, deep spatial green base, partial emerald and mint arcs, one threshold-like geometry and one circulation path, restrained cyan only in distant depth, generous copy-safe zone, portrait-safe zone with no arc crossing a face, calm editorial composition, clearly conceptual rather than scientific or mystical, wide 16:9 intent, no text, no logos, no data.

### Mobile Still Prompt

A simplified vertical orientation field for mobile, deep mineral green, one partial arc and one vertical circulation cue, low density, large dark copy-safe region, stable soft light, 9:16 composition, no mystical symbols, no text, no face-obscuring geometry.

### Negative Prompt

gold dragon, Bagua wallpaper, fantasy temple, astrology, magic beams, aura, mystical smoke, ritual symbols, scientific readout, measurement numbers, radar, neon cyan, particle storm, text, logo, face overlay.

## ENV-04 — EDITORIAL ARCHIVE

### Master Still Prompt

A quiet premium editorial archive atmosphere, near-black mineral green and graphite field, sparse ruled lines, subtle document edges and indexed planes without readable text, one restrained mint index highlight, large calm areas for headlines and body copy, structured intelligence rather than dashboard UI, minimal depth, wide 16:9 intent, no charts, no metrics, no logos, no fake documents.

### Mobile Still Prompt

A vertical editorial archive field with one ruled margin, one subtle index marker and a few quiet document planes, deep mineral background, very low geometry density, broad reading-safe area, 9:16 intent, no text, no dashboard, no terminal.

### Negative Prompt

admin dashboard, terminal, database screen, code, readable document text, analytics chart, metrics, blinking cursor, SaaS cards, neon, HUD, dense grid, fake data, logo, newspaper collage.

---

# 26. Image-to-Video Prompts

All prompts assume the still already contains the correct composition. Camera remains locked.

## ENV-01 — AC AMBIENT

### Subtle Loop Prompt

Animate only a very slow atmospheric drift and a faint closed-cycle light shift around the intersection point. Keep the camera completely locked. Preserve geometry, safe zones and portrait clearance. Start and end frames must match closely. No new objects, no brightness spikes, no text deformation, no geometry mutation. Duration 18–30 seconds.

### Premium Loop Prompt

Create a restrained cinematic loop with subtle depth separation between two broad planes, one soft mint intersection signal that fades in and returns to baseline, and a stable portrait-safe area. Camera locked, no zoom, no fly-through, no flare crossing copy or face. Seamless 20–30 second cycle.

### Mobile Loop Prompt

Use only a faint ambient light drift and one minimal intersection cue. Geometry remains nearly static. Camera locked. Keep upper copy-safe area dark and stable. Seamless 12–20 second loop.

### Negative Motion Prompt

no camera move, no particle emission, no object entry, no sudden light, no flashing, no scan line, no geometry morph, no text, no lens flare, no face crossing, no speed ramp.

## ENV-02 — DEAL NETWORK

### Subtle Loop Prompt

Animate one muted brass signal traveling slowly along a closed or fade-reset directional path while all other lines remain stable. Camera locked, light stable, no ticker behavior, no new nodes. Seamless 14–24 second loop.

### Premium Loop Prompt

Create one measured decision-path sequence: a subtle signal approaches a branch, one route becomes slightly clearer, then all states return smoothly to baseline. Preserve copy-safe area, no live-data feeling, camera locked, seamless 16–24 seconds.

### Mobile Loop Prompt

Animate one short directional trace only, with low amplitude and long pause. Keep the rest static. Camera locked, no dense network. Seamless 10–16 seconds.

### Negative Motion Prompt

no stock-market speed, no flashing nodes, no chart animation, no map pins, no red/green candles, no camera pan, no fly-through, no line multiplication, no sudden brightness, no text deformation.

## ENV-03 — SPATIAL FIELD

### Subtle Loop Prompt

Animate a partial orientation arc breathing within a very small range and one circulation path becoming slightly clearer, then returning. Camera locked, light stable, portrait-safe zone untouched, seamless 18–30 seconds.

### Premium Loop Prompt

Create a calm relational field response: two distant arcs align slightly, a restrained emerald/mint signal passes through one threshold relation, and the field returns to the original state. No magic effects, no scientific readout, no camera movement. Seamless 20–30 seconds.

### Mobile Loop Prompt

Animate one vertical orientation cue with minimal movement; keep all other geometry static. Maintain dark copy-safe area. Camera locked. Seamless 12–20 seconds.

### Negative Motion Prompt

no magic beam, no aura, no mystical smoke, no radial explosion, no compass spin, no camera orbit, no geometry mutation, no new symbols, no brightness pulse, no text deformation.

## ENV-04 — EDITORIAL ARCHIVE

### Subtle Loop Prompt

Animate only a slight page-plane depth shift and a soft mint index illumination that fades back to baseline. Camera locked, no readable text, no scrolling document content, seamless 20–36 seconds.

### Premium Loop Prompt

Create a restrained editorial loop where one ruled plane becomes visible, an index marker appears softly, and the field returns to its original quiet state. No dashboard activity, no terminal behavior, no camera movement, seamless 24–36 seconds.

### Mobile Loop Prompt

Use a nearly static composition with one gentle index reveal. No parallax. Camera locked. Seamless 14–24 seconds.

### Negative Motion Prompt

no terminal typing, no blinking cursor, no scrolling code, no dashboard metrics, no page flipping, no camera fly-through, no text generation, no sudden brightness, no geometry mutation.

---

# 27. Procedural Handoff

No repository component names are assumed.

## Shared inputs

- environment family
- preset
- intensity
- motion policy
- viewport class
- reduced-motion state
- page/section context
- portrait-safe zone
- copy-safe zone
- interaction state
- background brightness
- signal accent

## Shared layer relationships

- Base Field initializes first.
- Structural Geometry loads next at family/viewport density.
- Ambient Light establishes depth without moving over copy/portrait.
- Semantic Signal remains sparse and family-specific.
- Interaction Response appears only after user action.
- Content Contrast Veil suppresses geometry/light in protected zones.

## ENV-01 behavior

Inputs: intersection position, datum density, ambient depth, portrait/copy-safe zones.
Motion: broad drift; one closed-cycle intersection signal.
Responsive reduction: remove depth planes and extra nodes.
Interaction hooks: DEAL/SPACE focus may temporarily bias semantic cue.
Fallback trigger: scene init failure, reduced motion, mobile policy, performance guard.
Studio controls: family preset, intensity, brightness, portrait-safe, mobile mode.

## ENV-02 behavior

Inputs: path orientation, branch count range, signal accent, copy-safe area.
Motion: one measured path propagation.
Responsive reduction: one main path, minimal nodes.
Interaction hooks: DEAL focus/focus-visible/tap.
Fallback trigger: performance threshold, reduced motion, unsupported interaction.
Studio controls: density, signal on/off, intensity, mobile static.

## ENV-03 behavior

Inputs: arc count range, orientation center, threshold/path relationship, accent balance.
Motion: small arc alignment/field response.
Responsive reduction: one arc and one path cue.
Interaction hooks: SPACE focus/focus-visible/tap.
Fallback trigger: blur/overdraw issue, reduced motion, mobile policy.
Studio controls: orientation density, accent, intensity, portrait-safe.

## ENV-04 behavior

Inputs: plane count, grid/index density, selected index accent, content-safe zones.
Motion: optional index reveal, near-zero drift.
Responsive reduction: static ruled/index cue.
Interaction hooks: selected content metadata illumination only.
Fallback trigger: always acceptable to use static; long-form/performance mode.
Studio controls: editorial density, index accent, brightness, motion off.

---

# 28. Minimum Launch Set

Launch does not require four cinematic videos.

## Required

1. Four wide static source masters.
2. Four dedicated mobile static source masters.
3. Four approved procedural preset definitions if the current engine can support them safely.
4. Four reduced-motion assignments referencing the approved static family states; duplicate visual files are not required unless delivery needs differ.
5. Four poster delivery derivatives matching the calm base state; these should normally derive from the approved static masters rather than become separate visual concepts.
6. Page Assets assignments for Home, Services, DEAL, SPACE, Insights and Contact/Booking using the four families.
7. Browser QA at required responsive sizes.

## Procedural support

- implement where existing engine already makes it feasible
- AC AMBIENT, DEAL NETWORK and SPATIAL FIELD have highest procedural value
- EDITORIAL ARCHIVE may launch static/hybrid

## Can postpone

- all cinematic video alternates
- social derivatives
- advanced interactive transitions
- premium section-level motion
- mobile video

---

# 29. Premium V1 Set

Add after launch:

1. Higher-quality procedural rendering for all four families.
2. Premium desktop video alternates for AC AMBIENT, DEAL NETWORK and SPATIAL FIELD.
3. Optional subtle archive loop.
4. Refined DEAL/SPACE focus response.
5. Better section-to-section field transitions.
6. Social derivatives for Home/DEAL/SPACE/Insights.
7. Portrait-aware geometry suppression where current engine supports it.
8. Runtime quality scaling and performance diagnostics.
9. Expanded Studio preview for mobile/reduced motion/fallback states.

Taxonomy remains exactly four families.

---

# 30. Production Queue

| Step | Output | Dependencies | Why now |
|---|---|---|---|
| 1. Visual concept lock | one approved concept frame per family | source docs | prevents style drift |
| 2. Wide still master | four wide masters | concept approval | establishes composition and fallback |
| 3. Mobile still master | four vertical masters | wide concept, mobile architecture | avoids blind crop |
| 4. Motion test | one low-cost loop test per procedural-priority family | still master | validates motion language |
| 5. Procedural prototype | AC/DEAL/SPACE, archive if useful | engine audit, motion test | enables Studio control/responsive behavior |
| 6. Poster export | four calm base posters | still master | loading/failure/reduced motion |
| 7. Video alternate | optional premium loops | motion approval | adds cinematic layer only when justified |
| 8. Performance review | desktop/tablet/mobile | prototypes/assets | avoids heavy hero dependency |
| 9. Studio import | assets/presets registered | naming/approval | owner control |
| 10. Page Assets assignment | approved roles/fallbacks | Studio import | connects page contracts |
| 11. Browser QA | all required viewports/states | assignments | validates real experience |
| 12. Approval | Owner/design/developer as relevant | QA results | protects publication quality |

---

# 31. Master Environment Table

| ENV ID | Name | Primary use | Semantic role | Implementation mode | Base color | Signal color | Motion | Desktop | Mobile | Static fallback | Video alternate | Page-Asset role | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENV-01 | AC AMBIENT | Home/Services/Contact | system/intersection | Procedural First | near-black/deep forest | emerald/mint | ambient drift | full spatial field | simplified/static | required | optional | home.hero.environment / services.environment / contact.environment | P0 |
| ENV-02 | DEAL NETWORK | DEAL | direction/decision | Procedural First | deep forest | muted brass | directional propagation | measured network | one path/static | required | optional | deal.hero.environment | P0 |
| ENV-03 | SPATIAL FIELD | SPACE | orientation/relationship | Procedural First | deep spatial green | emerald/mint/cyan | orientation response | relational arcs | simplified/static | required | optional | space.hero.environment | P0 |
| ENV-04 | EDITORIAL ARCHIVE | Insights/content | indexed intelligence | Hybrid Static/Procedural | mineral-dark | mint/rare brass | index reveal | sparse editorial planes | static | required | P3 | insights.environment | P0 |

---

# 32. Asset Inventory

Compact target inventory: 29 deliverable groups.

A deliverable group may produce more than one exported file, such as source master, optimized poster, codec fallback or responsive derivative. The number `29` is therefore not a literal final file count.

| ID | Deliverable | Family | Format concept | Priority |
|---|---|---|---|---|
| A01 | Wide static master | AC AMBIENT | source + web static | P0 |
| A02 | Mobile static master | AC AMBIENT | source + web static | P0 |
| A03 | Poster | AC AMBIENT | AVIF/WebP/JPEG fallback concept | P0 |
| A04 | Procedural preset | AC AMBIENT | Studio preset | P0 |
| A05 | Reduced-motion state | AC AMBIENT | static/preset | P0 |
| A06 | Premium video wide | AC AMBIENT | web loop | P2 |
| A07 | Wide static master | DEAL NETWORK | source + web static | P0 |
| A08 | Mobile static master | DEAL NETWORK | source + web static | P0 |
| A09 | Poster | DEAL NETWORK | web poster | P0 |
| A10 | Procedural preset | DEAL NETWORK | Studio preset | P0 |
| A11 | Reduced-motion state | DEAL NETWORK | static/preset | P0 |
| A12 | Premium video wide | DEAL NETWORK | web loop | P2 |
| A13 | Wide static master | SPATIAL FIELD | source + web static | P0 |
| A14 | Mobile static master | SPATIAL FIELD | source + web static | P0 |
| A15 | Poster | SPATIAL FIELD | web poster | P0 |
| A16 | Procedural preset | SPATIAL FIELD | Studio preset | P0 |
| A17 | Reduced-motion state | SPATIAL FIELD | static/preset | P0 |
| A18 | Premium video wide | SPATIAL FIELD | web loop | P2 |
| A19 | Wide static master | EDITORIAL ARCHIVE | source + web static | P0 |
| A20 | Mobile static master | EDITORIAL ARCHIVE | source + web static | P0 |
| A21 | Poster | EDITORIAL ARCHIVE | web poster | P0 |
| A22 | Procedural/static preset | EDITORIAL ARCHIVE | Studio preset | P0 |
| A23 | Reduced-motion state | EDITORIAL ARCHIVE | static/preset | P0 |
| A24 | Optional video wide | EDITORIAL ARCHIVE | web loop | P3 |
| A25 | Focused AC preset | Shared | Studio preset | P1 |
| A26 | Editorial/calm DEAL preset | DEAL | Studio preset | P1 |
| A27 | Editorial/calm SPACE preset | SPACE | Studio preset | P1 |
| A28 | Home/DEAL/SPACE social environment derivatives | Shared | 1.91:1 set | P2 |
| A29 | Environment QA contact sheet | Shared | review artifact | P1 |

Inventory interpretation rules:

- `Wide static master` and `Mobile static master` are approved source compositions.
- `Poster` is normally an optimized delivery derivative, not a new art direction.
- `Reduced-motion state` may be a preset/assignment referencing an approved static derivative rather than a duplicate file.
- `Procedural preset` requires versioning and rollback even when no binary media file exists.
- Social derivatives remain optional P2 exports and must preserve the source family.

---

# 33. QA Matrix

| ID | Environment | Area | Requirement | Viewport | Priority | Pass condition |
|---|---|---|---|---|---|---|
| ENV-QA-01 | All | Copy readability | Headline/body remain readable before scene loads | All | P0 | Base field/poster supports required contrast |
| ENV-QA-02 | AC AMBIENT | Portrait safety | No geometry/light crosses Owner face | 1440/1280/1024 | P0 | Face-safe zone remains calm in all states |
| ENV-QA-03 | All | Portrait safety | Skin tone remains natural | Desktop/tablet | P0 | No green/cyan contamination |
| ENV-QA-04 | DEAL NETWORK | Semantic clarity | Reads as direction, not live data | All | P0 | No chart/ticker/map interpretation in review |
| ENV-QA-05 | SPATIAL FIELD | Semantic clarity | Reads as orientation, not mystical/scientific | All | P0 | No cliché or measurement pretense |
| ENV-QA-06 | EDITORIAL ARCHIVE | Content hierarchy | Content dominates environment | All | P0 | Background remains peripheral |
| ENV-QA-07 | All | Motion intensity | Default motion is CALM/STANDARD only | Desktop | P0 | No continuous attention-seeking movement |
| ENV-QA-08 | All | Reduced motion | Continuous motion removed | All | P0 | Static state retains hierarchy/meaning |
| ENV-QA-09 | All video | Loop seam | Start/end not visibly discontinuous | Desktop | P1 | Seam not noticed in three consecutive loops |
| ENV-QA-10 | All video | Light stability | No brightness spikes | Desktop | P0 | Luminance remains stable behind copy |
| ENV-QA-11 | All | Mobile density | Geometry materially reduced | 390/360 | P0 | Mobile is re-composed, not desktop crop |
| ENV-QA-12 | All | Tablet behavior | No compressed desktop overload | 768/1024 | P1 | Reduced layers and readable safe zones |
| ENV-QA-13 | All | Procedural failure | Static fallback appears intentionally | All | P0 | No blank/broken environment |
| ENV-QA-14 | All video | Video failure | Poster/base field remains | All | P0 | Content and actions unaffected |
| ENV-QA-15 | All | Contrast | Text meets implementation contrast target | All | P0 | Contrast audit passes on real pages |
| ENV-QA-16 | Contact/Booking | Forms | No motion under active inputs/errors | All | P0 | Form area stable and readable |
| ENV-QA-17 | DEAL NETWORK | Interaction | Focus/tap works without hover | Touch/keyboard | P0 | Meaning/state available without pointer hover |
| ENV-QA-18 | SPATIAL FIELD | Interaction | Focus/tap equivalent exists | Touch/keyboard | P0 | Orientation state clear without hover |
| ENV-QA-19 | All | Focus visibility | UI focus is independent of environment | All | P0 | Focus ring remains visible in every preset |
| ENV-QA-20 | All | Performance | Content/nav/CTA usable before scene readiness | All | P0 | No environment-blocked interaction |
| ENV-QA-21 | All | Mobile video | Full-resolution desktop video not loaded by default | 390/360 | P0 | Static/lightweight policy confirmed |
| ENV-QA-22 | All | Studio controls | Owner-safe controls map to real behavior | Studio | P1 | Preset/intensity/mobile/fallback preview correctly |
| ENV-QA-23 | All | Advanced controls | Raw internals absent from normal workflow | Studio | P1 | Shader/noise/coordinates hidden outside Advanced |
| ENV-QA-24 | All | Page Assets | Assigned family/fallback remains authoritative | Studio/public | P0 | No hard-coded bypass |
| ENV-QA-25 | All | Approval | Assignment does not silently publish | Studio | P0 | Draft/Published governance preserved |
| ENV-QA-26 | All | No fake data | Decorative geometry never appears factual | All | P0 | Review finds no metrics/maps/live-data implication |
| ENV-QA-27 | All | CONDITION | No public asset/preset/label exists | All | P0 | CONDITION absent from public environment system |
| ENV-QA-28 | SPATIAL FIELD | Cultural restraint | No mystical cliché | All | P0 | No dragon/temple/aura/Bagua wallpaper |
| ENV-QA-29 | All | Visual fatigue | Same high-noise motif not repeated in adjacent sections | Desktop/mobile | P1 | Density rhythm varies while family remains consistent |
| ENV-QA-30 | All | 200% zoom | Text remains readable; background does not obstruct | Desktop | P1 | Core content/actions accessible at zoom |
| ENV-QA-31 | All | High contrast | Environment can be suppressed | Forced/high contrast | P1 | Content remains complete without ambience |
| ENV-QA-32 | All | Asset naming | Approved masters follow convention | Studio/Media | P1 | No temporary names used publicly |
| ENV-QA-33 | All | Poster match | Poster matches calm first video/procedural state | Desktop | P1 | Transition does not visibly jump |
| ENV-QA-34 | Home | Service comprehension | Environment does not overpower DEAL/SPACE orientation | 1440/390 | P0 | Service labels remain primary readable layer |
| ENV-QA-35 | All | No text in art | Generated/static environment contains no baked-in copy | All | P0 | EN/VI content remains independent |
| ENV-QA-36 | All | Draft / Published | Draft environment assignment does not silently replace Published | Studio/public | P0 | Published state changes only through normal governance |
| ENV-QA-37 | All | Preset versioning | Approved procedural preset can be identified and rolled back | Studio/Visual Director | P1 | Version and superseded state are visible in the handoff record |
| ENV-QA-38 | All | Poster provenance | Poster traces to the approved static master or calm loop frame | Media/Studio | P1 | Source relationship is recorded and visually consistent |

---

# 34. Open Decisions

## Owner decisions

1. Approve the four master concept frames and semantic distinction.
2. Approve whether any premium background video is worth production after static/procedural QA.
3. Approve family master assets and public-use presets before publication.

## Designer decisions

1. Final copy-safe/portrait-safe zone maps for actual page compositions.
2. Final density and lighting balance per approved preset.
3. Whether controlled violet has any justified use; default is none.
4. Final static composition and mobile re-composition for each family.

## Developer decisions

1. Which existing procedural engine capabilities can represent each family without major rewrite.
2. Runtime quality scaling and fallback triggers.
3. Supported web codecs/formats and delivery pipeline.
4. Whether device-specific Page Assets and portrait-safe masks are currently supported.
5. How Visual Director presets map to available parameters without creating parallel storage.
6. How procedural preset versions, rollback and superseded states are represented.
7. Whether static masters and poster derivatives can share provenance and approval metadata without duplicate records.

## Content decisions

1. Which Insights/search routes use EDITORIAL ARCHIVE versus neutral AC AMBIENT.
2. Which future active Tools genuinely require an environment and factual data layer.

## Rights/compliance decisions

1. Generated still/video vendor terms and public commercial rights.
2. Provenance/recordkeeping required for generated environment assets.
3. Any third-party texture/reference incorporated into final masters.

Ordinary implementation choices such as exact blur radius, line width or easing do not require Owner decision.

---

# 35. DO NOT LIST

Do not produce:

- one background per route
- fifth environment family without blocking need
- fake data visualization
- fake property map
- stock-market animation
- crypto network aesthetic
- radar overload
- particle storm
- outer-space nebula
- magic energy
- gold dragon
- fantasy temple
- Bagua wallpaper
- astrology cliché
- constant scan lines
- glowing border around every object
- flashing nodes
- large moving lens flare
- fast parallax
- camera fly-through
- portrait-obscuring geometry
- light crossing Owner face
- text baked into environment artwork
- logos baked into environment artwork
- full-resolution video on mobile by default
- autoplay audio
- motion required for comprehension
- fake scientific measurement
- fake operational status
- fake market activity
- environment that exposes CONDITION
- nested page-specific visual identities
- heavy fog behind copy
- continuous CTA pulse
- bright cyan or purple cyberpunk wash
- admin-dashboard treatment for EDITORIAL ARCHIVE

---

# Final North Star

AC environments should make the website feel alive without demanding attention.

AC AMBIENT establishes the system.

DEAL NETWORK communicates direction.

SPATIAL FIELD communicates orientation.

EDITORIAL ARCHIVE communicates structured intelligence.

The environment moves.

The interface responds.

The person remains calm.

The content remains understandable even when every visual effect is disabled.
