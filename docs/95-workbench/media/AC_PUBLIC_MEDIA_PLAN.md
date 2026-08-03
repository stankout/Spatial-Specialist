# AC_PUBLIC_MEDIA_PLAN.md
## AC Spatial Specialist — Public Media Architecture

Status: MEDIA ARCHITECTURE PLAN
Scope: PUBLIC WEBSITE MEDIA ONLY

---

# 1. Media North Star

Website AC phải giàu hình ảnh vì media truyền đạt đúng ý nghĩa, không phải vì mọi khoảng trống đều được lấp bằng ảnh.

Media system phải giúp người xem hiểu sáu lớp nghĩa:

- PROPERTY
- CONTEXT
- DIRECTION
- ORIENTATION
- HUMAN AUTHORITY
- INTELLIGENCE

Ngôn ngữ thị giác khóa:

- FIELD BEFORE PANEL
- RELATIONSHIP BEFORE DECORATION
- HUMAN BEFORE HUD

Hệ thống phải:

- credible
- original
- performant
- scalable
- rights-safe
- Studio-controllable

Nguyên tắc quyết định:

1. Portrait thật dùng cho human authority.
2. Property/location media thật dùng khi nội dung có tính documentary hoặc factual.
3. Procedural/generative media dùng cho environment, abstraction, editorial illustration và conceptual diagrams.
4. Không tạo hình ảnh giả khiến người xem tưởng AC đã thực hiện một giao dịch, consultation hoặc property project chưa từng xảy ra.
5. Không buộc mỗi route phải có hero photography.
6. Một media role phải có purpose rõ, responsive behavior rõ và fallback rõ.
7. CONDITION không có public media role.

---

# 2. Global Media Taxonomy

Taxonomy cuối nên gọn, đủ tái sử dụng và không tạo hàng chục role gần giống nhau.

## 2.1 Human

### OWNER HERO
Portrait trust anchor cho Homepage.

### OWNER PRIMARY
Primary portrait cho About.

### OWNER CONTEXT
Owner portrait theo service/context: DEAL, SPACE hoặc editorial.

### OWNER DETAIL
Hands, notebook, site observation, tools, vật liệu, chi tiết làm việc thực tế.

## 2.2 Property / Place

### PROPERTY CONTEXT
Ngoại thất, site, street, neighborhood hoặc whole-property context.

### PROPERTY DETAIL
Material, threshold, entrance, room relation, light, circulation, landscape detail.

### LOCATION CONTEXT
Georgia/local environment, city, street, neighborhood, landscape.

## 2.3 Environment / System

### PROCEDURAL BACKGROUND
AC-native living field cho page/section background.

### SERVICE ENVIRONMENT
DEAL Network hoặc Spatial Field.

### EDITORIAL ENVIRONMENT
Archive/intelligence field cho Insights.

## 2.4 Editorial / Content

### EDITORIAL FEATURE
Media lớn cho một featured output.

### EDITORIAL COVER
Cover cho Article, Guide hoặc system content.

### EDITORIAL THUMBNAIL
Thumbnail có khả năng scale cho 50+ bài viết và 100+ video.

### VIDEO POSTER
Poster đại diện video.

### DOCUMENT PREVIEW
Preview PDF/document.

### DIAGRAM
Sơ đồ giải thích relationship, method, orientation hoặc decision.

### TOOL PREVIEW
Preview factual cho future public tools khi active.

## 2.5 Social

### SOCIAL SHARE
Template 1.91:1 cho Open Graph/social share.

### SOCIAL SQUARE
Fallback 1:1 khi channel cần.

---

# 3. Source / Rights Policy

## 3.1 Preferred source hierarchy

1. ORIGINAL AC MEDIA
2. OWNER-CREATED PHOTO/VIDEO
3. PROCEDURAL / CODE-GENERATED
4. GENERATIVE MEDIA ALLOWED trong phạm vi policy
5. LICENSED MEDIA với quyền rõ
6. PUBLIC-DOMAIN / OPEN DATA VISUAL với provenance rõ
7. MANAGED CONTENT có rights metadata phù hợp

## 3.2 Rights requirements

Mỗi asset cần có ít nhất:

- source/origin
- creator/owner
- permission/license status
- intended public use
- page/role assignment
- review/approval state

## 3.3 Không được làm

- remove watermark
- scrape copyrighted photography
- copy another creator’s visual identity
- dùng MLS/listing photo ngoài phạm vi quyền cho phép
- dùng social screenshot như asset sở hữu
- dùng generative photo như bằng chứng một property/client/project có thật

## 3.4 Review flags

Cần rights/compliance review khi media liên quan:

- listing/MLS
- private property
- recognizable person khác ngoài Owner
- drone
- street imagery có license restriction
- maps/open data visualization
- third-party embed/screenshot
- client work

Kế hoạch này không đưa ra kết luận pháp lý; nó xác định điểm cần review.

---

# 4. Generated Media Policy

## ALLOWED

- abstract spatial background
- procedural field
- editorial illustration
- conceptual diagram
- typographic cover
- clearly non-documentary generic property illustration
- atmospheric visual texture
- schematic orientation/environment visual

## LIMITED

- stylized property form nếu ghi rõ editorial/conceptual
- generalized city/location abstraction không giả là địa điểm cụ thể
- material/space illustration không mô tả project có thật
- future tool promo visual không hiển thị fake data

## NOT APPROPRIATE

- fake client consultation
- fake transaction or closing
- fake property presented as real listing
- fake Owner activity
- fake testimonial/customer
- fake office/team scene
- fake market dashboard/data
- generative portrait thay cho Anh Cao

Rule:

Nếu người xem hợp lý có thể hiểu hình đó là documentary evidence, Gen-AI không được dùng trừ khi được ghi rõ là illustration và không gây hiểu nhầm.

---

# 5. Aspect Ratio System

Hệ thống tối giản được phê duyệt:

## 3:2

Primary photography ratio.

Dùng cho:
- property context
- location context
- environmental portrait
- editorial feature photography

## 4:5

Portrait/editorial vertical.

Dùng cho:
- Owner portrait
- mobile portrait crop
- social/editorial portrait

## 16:9

Video/wide editorial.

Dùng cho:
- video poster
- landscape feature media
- property video
- background motion poster

## 1:1

Compact thumbnail / social fallback.

Dùng cho:
- editorial index thumbnail
- social square
- compact content cards where required

## 1.91:1

Open Graph/social share master.

## 9:16

Chỉ cho social/vertical video hoặc specific video content; không phải default website image ratio.

Không cần 4:3 như một master ratio ở V1. Có thể map legacy asset vào 3:2 hoặc framed presentation.

---

# 6. Presentation System

## PORTRAIT-CONTAIN

Purpose: giữ toàn bộ silhouette/body crop quan trọng.

Rules:
- không cắt mặt, tay hoặc gesture quan trọng
- có controlled negative space cho typography
- mobile dùng crop riêng nếu cần

## PORTRAIT-FRAMED

Purpose: editorial portrait trong About/Service context.

Rules:
- 4:5 hoặc 3:2
- frame có breathing room
- không HUD phủ mặt

## PROPERTY-WIDE

Purpose: whole-property/site/context.

Rules:
- 3:2 hoặc 16:9
- ưu tiên context trước luxury spectacle
- crop phải giữ entrance/site/relationship quan trọng

## PROPERTY-DETAIL

Purpose: material/circulation/light/threshold.

Rules:
- 3:2 hoặc 1:1
- không crop thành texture vô nghĩa

## EDITORIAL-COVER

Purpose: cover cho article/guide/feature.

Rules:
- media + clear title-safe area
- có thể là photo, diagram, procedural hoặc typographic

## DIAGRAM-CONTAIN

Purpose: giữ toàn bộ semantic relationship.

Rules:
- contain
- không crop label/legend
- có text explanation

## VIDEO-FRAME

Purpose: poster/video player.

Rules:
- 16:9 default
- title/context/captions support

## BACKGROUND-FIELD

Purpose: ambient/procedural background.

Rules:
- free-field
- copy-safe zones
- mobile density giảm

## SOCIAL-CARD

Purpose: Open Graph/social.

Rules:
- 1.91:1 master
- safe title area
- service identifier
- media area optional

## TOOL-PREVIEW

Purpose: future factual tool.

Rules:
- framed
- real data only
- source/date/methodology visible where applicable

---

# 7. Background Environment System

Chỉ dùng bốn master environments.

## ENV-01 — AC AMBIENT

Meaning:
AC as intersection/system; general-purpose environment.

Visual elements:
- deep green field
- sparse datum/grid
- atmospheric light
- minimal nodes

Motion:
very slow ambient drift.

Usage:
Homepage, Services, Contact/Booking, fallback general pages.

Desktop:
full spatial depth.

Mobile:
lower density, simplified geometry.

Static fallback:
mineral green gradient + sparse static geometry.

Reduced motion:
static field.

Preferred implementation:
PROCEDURAL FIRST.

## ENV-02 — DEAL NETWORK

Meaning:
direction, transaction, geography, market movement.

Visual elements:
- linear paths
- connection nodes
- directional traces
- restrained brass signal

Motion:
slow directional propagation; interaction may react once.

Usage:
DEAL hero/sections, relevant Insights.

Preferred implementation:
PROCEDURAL FIRST with static poster fallback.

## ENV-03 — SPATIAL FIELD

Meaning:
orientation, circulation, relationship, environment.

Visual elements:
- arcs
- field lines
- orientation marks
- emerald/mint/cyan accents

Motion:
slow relational field response.

Usage:
SPACE hero/sections, spatial education content.

Preferred implementation:
PROCEDURAL FIRST.

## ENV-04 — EDITORIAL ARCHIVE

Meaning:
structured intelligence, indexed knowledge, archive.

Visual elements:
- editorial grids
- page/index markers
- subtle document/diagram traces

Motion:
minimal; occasional section transition only.

Usage:
Insights, Guides, Articles, Videos.

Preferred implementation:
HYBRID: procedural/static editorial field.

Policy:
Không tạo one-off background video cho từng route.

---

# 8. Owner Media System

Đây là taxonomy, chưa phải final shot list.

## OWNER-01 — Homepage Hero

Purpose:
human trust anchor; integrated portrait.

Wardrobe:
structured neutral, deep green/black/stone; no loud pattern.

Body crop:
3/4 hoặc full-body source; mobile crop 4:5.

Pose energy:
calm, direct, grounded.

Background:
controlled studio or minimal architectural environment.

Lighting:
soft directional, natural skin, controlled contrast.

Reuse limit:
Homepage only as primary hero; không dùng lại làm About Hero hoặc DEAL Hero.

## OWNER-02 — About Primary

Purpose:
main human/authorship portrait.

Wardrobe:
different from OWNER-01; slightly more editorial/human.

Body crop:
waist-up hoặc environmental 3:2.

Pose energy:
open, present, not corporate-smiling stock.

Background:
real architectural/location context hoặc neutral environment.

Lighting:
soft natural/editorial.

Reuse limit:
About primary + selected press use.

## OWNER-03 — DEAL Context

Purpose:
practitioner linked to real estate decision/context.

Wardrobe:
professional field-ready, not staged closing scene.

Body crop:
3:2 environmental or 4:5 portrait.

Pose energy:
observational, directional, attentive.

Background:
real property/site/street context with permission.

Lighting:
credible available light.

Reuse limit:
DEAL + selected editorial only.

## OWNER-04 — SPACE Context

Purpose:
practitioner linked to orientation/spatial interpretation.

Wardrobe:
neutral, tactile, architectural.

Body crop:
3:2 environmental or 4:5.

Pose energy:
observing space, threshold, circulation or plan.

Background:
real interior/exterior/landscape context.

Lighting:
natural spatial light.

Reuse limit:
SPACE + selected editorial only.

## OWNER-05 — Editorial / Content

Purpose:
author image for Guide/Video/Article/Insights.

Wardrobe:
consistent neutral identity.

Body crop:
head-and-shoulders or waist-up.

Pose energy:
conversational, authoritative.

Background:
clean neutral or editorial environment.

Reuse limit:
content author profile, video poster, byline.

## OWNER-06 — Advertising / Press

Purpose:
press kit, campaign, speaking, social.

Wardrobe:
brand-neutral and evergreen.

Body crop:
multiple ratios including 4:5, 1:1, 1.91:1 safe crop.

Pose energy:
clear, confident, flexible negative space.

Background:
neutral/architectural.

Lighting:
publication-ready.

Reuse limit:
external promotion; không thay website primary portraits.

---

# 9. Homepage Media

## HOME-HERO-OWNER

PAGE: HOME
SECTION: Hero
ROLE: OWNER HERO
PURPOSE: human trust anchor, integrated with living field
SOURCE TYPE: OWNER PHOTOGRAPHY
REQUIRED: YES
SUBJECT: Anh Cao
DESKTOP: 3/4 or full-body integrated right field
TABLET: waist-up / controlled 4:5 crop
MOBILE: 4:5 or waist-up after service orientation
ASPECT: 4:5 master plus wider source preferred
FIT: PORTRAIT-CONTAIN
CROP: face/gesture protected; no face-overlay
MOTION: NONE; environment moves instead
FALLBACK: approved alternate crop or derivative from the OWNER-01 Homepage Hero production set, or an intentional text-led Hero layout without portrait
GEN-AI: NO
RIGHTS: ORIGINAL AC / OWNER-CREATED
PAGE-ASSET ROLE: home.hero.owner
REUSE: Homepage primary only
NOTES: source should allow desktop and mobile crops.

## HOME-HERO-ENVIRONMENT

PAGE: HOME
SECTION: Hero
ROLE: PROCEDURAL BACKGROUND
PURPOSE: spatial intelligence field behind proposition and portrait
SOURCE TYPE: PROCEDURAL SCENE
REQUIRED: YES
SUBJECT: AC intersection/system
DESKTOP: full-field, slow ambient
TABLET: reduced depth
MOBILE: simplified density/static-friendly
ASPECT: free-field
FIT: BACKGROUND-FIELD
CROP: none; responsive composition
MOTION: AMBIENT
FALLBACK: static AC Ambient poster
GEN-AI: LIMITED for texture concept only
RIGHTS: PROCEDURAL / AC ORIGINAL
PAGE-ASSET ROLE: home.hero.environment
REUSE: AC Ambient may repeat across general routes
NOTES: must remain copy-safe.

## HOME-METHOD-MEDIA

PAGE: HOME
SECTION: Method + Human Authority
ROLE: OWNER DETAIL or DIAGRAM
PURPOSE: support authorship/method without duplicating hero portrait
SOURCE TYPE: OWNER PHOTOGRAPHY or DIAGRAM
REQUIRED: OPTIONAL
SUBJECT: working detail, hands, plan, spatial observation
DESKTOP: editorial plane or detail crop
TABLET: compact framed media
MOBILE: optional; may be omitted to reduce scroll
ASPECT: 3:2 or 1:1
FIT: FRAMED / DIAGRAM-CONTAIN
CROP: preserve action/context
MOTION: STATIC
FALLBACK: method typography/diagram only
GEN-AI: NO for documentary; YES for abstract diagram
RIGHTS: ORIGINAL AC
PAGE-ASSET ROLE: home.method.media
REUSE: may reuse OWNER-DETAIL in About/Insights sparingly
NOTES: not required for launch.

## HOME-INSIGHTS-FEATURED

PAGE: HOME
SECTION: Insights
ROLE: EDITORIAL FEATURE
PURPOSE: represent one featured public output
SOURCE TYPE: MANAGED CONTENT
REQUIRED: YES when Insights shown
SUBJECT: based on selected Guide/Video/Article
DESKTOP: large editorial feature
TABLET: reduced feature
MOBILE: stacked cover/poster
ASPECT: 3:2 or 16:9
FIT: EDITORIAL-COVER
CROP: title-safe; subject-safe
MOTION: STATIC or EDITORIAL VIDEO poster
FALLBACK: category cover template
GEN-AI: LIMITED under editorial policy
RIGHTS: content asset rights required
PAGE-ASSET ROLE: home.insights.featured
REUSE: same media may appear on source content page and Homepage feature
NOTES: one featured asset only.

## HOME-SOCIAL-SHARE

PAGE: HOME
SECTION: Global share
ROLE: SOCIAL SHARE
PURPOSE: Home Open Graph/social preview
SOURCE TYPE: SOCIAL GRAPHIC
REQUIRED: YES
SUBJECT: AC identity + whole-property perspective
DESKTOP/TABLET/MOBILE: not in page UI; share asset only
ASPECT: 1.91:1
FIT: SOCIAL-CARD
CROP: safe title area
MOTION: NONE
FALLBACK: global AC social card
GEN-AI: LIMITED for abstract field
RIGHTS: ORIGINAL AC
PAGE-ASSET ROLE: home.social.og
REUSE: Home share only; square derivative allowed
NOTES: no contact info by default.

---

# 10. DEAL Media

## DEAL-HERO-ENVIRONMENT

ROLE: SERVICE ENVIRONMENT / DEAL NETWORK
PURPOSE: direction, market movement, decision context
SOURCE: PROCEDURAL FIRST
REQUIRED: YES
DESKTOP: network field with restrained brass signal
TABLET: simplified network
MOBILE: static/lightweight lines
ASPECT/FIT: free-field / BACKGROUND-FIELD
MOTION: AMBIENT + restrained interaction
FALLBACK: static Deal Network poster
GEN-AI: LIMITED
RIGHTS: AC ORIGINAL
PAGE-ASSET ROLE: deal.hero.environment
REUSE: across DEAL family.

## DEAL-HERO-OWNER

ROLE: OWNER CONTEXT
PURPOSE: practitioner authority for Real Estate
SOURCE: OWNER PHOTOGRAPHY
REQUIRED: OPTIONAL P1
SUBJECT: Anh Cao in real property/site context
DESKTOP: environmental portrait or editorial plane
TABLET/MOBILE: 4:5 framed crop
ASPECT: 3:2 master + 4:5 derivative
FIT: PORTRAIT-FRAMED
MOTION: NONE
FALLBACK: no portrait; Deal Network remains
GEN-AI: NO
RIGHTS: ORIGINAL AC / location permission
PAGE-ASSET ROLE: deal.hero.owner
REUSE: DEAL and selected content only.

## DEAL-PROPERTY-CONTEXT

ROLE: PROPERTY CONTEXT
PURPOSE: support buyers/sellers/evaluation with real context
SOURCE: ORIGINAL AC / LICENSED / MANAGED CONTENT
REQUIRED: OPTIONAL, content-dependent
SUBJECT: exterior, site, street, neighborhood, access
DESKTOP: wide editorial
TABLET: framed 3:2
MOBILE: intentional crop preserving site relationship
ASPECT: 3:2
FIT: PROPERTY-WIDE
MOTION: STATIC
FALLBACK: Deal editorial graphic
GEN-AI: NO if presented as real property
RIGHTS: property/listing permission review
PAGE-ASSET ROLE: deal.property.context
REUSE: only within same factual property/content context.

## DEAL-PROPERTY-DETAIL

ROLE: PROPERTY DETAIL
PURPOSE: entrance, material, condition cue, context
SOURCE: ORIGINAL AC / LICENSED
REQUIRED: OPTIONAL
ASPECT: 3:2 or 1:1
FIT: PROPERTY-DETAIL
MOTION: STATIC
FALLBACK: no detail media
GEN-AI: NO if documentary
RIGHTS: permission required
PAGE-ASSET ROLE: deal.property.detail
REUSE: limited by subject relevance.

## DEAL-LOCATION-CONTEXT

ROLE: LOCATION CONTEXT
PURPOSE: Georgia/local context without fake listing claims
SOURCE: ORIGINAL AC / LICENSED / PUBLIC-DOMAIN where valid
REQUIRED: OPTIONAL P1
ASPECT: 3:2
FIT: PROPERTY-WIDE
MOTION: STATIC
FALLBACK: editorial location diagram
GEN-AI: NO if claiming specific place
RIGHTS: location/image license review
PAGE-ASSET ROLE: deal.location.context
REUSE: location family may repeat across related content.

## DEAL-MARKET-EDITORIAL

ROLE: EDITORIAL GRAPHIC / DIAGRAM
PURPOSE: explain comparison, decision, market context
SOURCE: ORIGINAL AC / OPEN DATA VISUAL
REQUIRED: OPTIONAL
ASPECT: 3:2 or 16:9
FIT: DIAGRAM-CONTAIN
MOTION: STATIC or restrained interactive
FALLBACK: text-first explanation
GEN-AI: YES for non-data illustration; NO fake data
RIGHTS: data/source provenance required when factual
PAGE-ASSET ROLE: deal.market.editorial
REUSE: template reusable; factual instance unique.

## DEAL-SOCIAL-SHARE

ROLE: SOCIAL SHARE
PURPOSE: DEAL Open Graph
SOURCE: AC ORIGINAL SOCIAL GRAPHIC
REQUIRED: YES
ASPECT: 1.91:1
FIT: SOCIAL-CARD
FALLBACK: global AC share template
GEN-AI: LIMITED abstract only
PAGE-ASSET ROLE: deal.social.og
REUSE: DEAL family template.

---

# 11. SPACE Media

## SPACE-HERO-ENVIRONMENT

ROLE: SERVICE ENVIRONMENT / SPATIAL FIELD
PURPOSE: orientation, circulation, relationship
SOURCE: PROCEDURAL FIRST
REQUIRED: YES
DESKTOP: relational field/arcs
TABLET: reduced geometry
MOBILE: simplified/static field
ASPECT/FIT: free-field / BACKGROUND-FIELD
MOTION: AMBIENT
FALLBACK: static Spatial Field poster
GEN-AI: LIMITED
RIGHTS: AC ORIGINAL
PAGE-ASSET ROLE: space.hero.environment
REUSE: SPACE family.

## SPACE-HERO-OWNER

ROLE: OWNER CONTEXT
PURPOSE: practitioner authority for Spatial Consultation
SOURCE: OWNER PHOTOGRAPHY
REQUIRED: OPTIONAL P1
SUBJECT: Anh Cao observing real space/site/plan
ASPECT: 3:2 + 4:5 derivative
FIT: PORTRAIT-FRAMED
MOTION: NONE
FALLBACK: no portrait; Spatial Field remains
GEN-AI: NO
RIGHTS: ORIGINAL AC / location permission
PAGE-ASSET ROLE: space.hero.owner
REUSE: SPACE and selected content only.

## SPACE-RESIDENTIAL

ROLE: PROPERTY CONTEXT / DETAIL
PURPOSE: room relationships, entrances, light, circulation
SOURCE: ORIGINAL AC / LICENSED
REQUIRED: OPTIONAL, content-managed
ASPECT: 3:2
FIT: PROPERTY-WIDE or PROPERTY-DETAIL
MOTION: STATIC
FALLBACK: spatial diagram
GEN-AI: NO if presented as real residence
RIGHTS: property permission
PAGE-ASSET ROLE: space.residential.media
REUSE: only when contextually accurate.

## SPACE-PROPERTY-SELECTION

ROLE: LOCATION/PROPERTY CONTEXT
PURPOSE: orientation/site relationship during selection
SOURCE: ORIGINAL AC / LICENSED / OPEN DATA diagram
REQUIRED: OPTIONAL
ASPECT: 3:2
FIT: PROPERTY-WIDE / DIAGRAM-CONTAIN
FALLBACK: orientation diagram
GEN-AI: LIMITED editorial only
RIGHTS: source-specific
PAGE-ASSET ROLE: space.selection.media.

## SPACE-BUSINESS

ROLE: PROPERTY CONTEXT
PURPOSE: business-space use, circulation, access
SOURCE: ORIGINAL AC / LICENSED
REQUIRED: OPTIONAL
ASPECT: 3:2
FIT: PROPERTY-WIDE
FALLBACK: spatial diagram
GEN-AI: NO if documentary
RIGHTS: property/business permission
PAGE-ASSET ROLE: space.business.media.

## SPACE-AUDIT

ROLE: OWNER DETAIL / DIAGRAM
PURPOSE: explain spatial audit without fake professional scene
SOURCE: ORIGINAL AC detail or DIAGRAM
REQUIRED: OPTIONAL
SUBJECT: plan, entry, circulation trace, notebook, site notes
ASPECT: 3:2 or 1:1
FIT: FRAMED / DIAGRAM-CONTAIN
FALLBACK: method typography
GEN-AI: YES for abstract diagram; NO for fake audit photo
RIGHTS: ORIGINAL AC
PAGE-ASSET ROLE: space.audit.media.

## SPACE-METHOD-DIAGRAM

ROLE: DIAGRAM
PURPOSE: orientation / circulation / context relationship
SOURCE: ORIGINAL AC DIAGRAM
REQUIRED: OPTIONAL FOR MINIMUM LAUNCH / REQUIRED FOR PREMIUM V1
PRIORITY: P1
ASPECT: 3:2 or 16:9
FIT: DIAGRAM-CONTAIN
MOTION: STATIC or restrained interactive
FALLBACK: accessible text explanation
GEN-AI: YES as clearly editorial concept
RIGHTS: AC ORIGINAL
PAGE-ASSET ROLE: space.method.diagram
REUSE: may support relevant educational content.

## SPACE-TRADITIONAL-EDITORIAL

ROLE: EDITORIAL GRAPHIC
PURPOSE: sophisticated visual support for traditional interpretation
SOURCE: ORIGINAL AC / LICENSED historical/public-domain reference where valid
REQUIRED: OPTIONAL
ASPECT: 3:2
FIT: EDITORIAL-COVER / DIAGRAM-CONTAIN
MOTION: NONE
FALLBACK: typography/diagram
GEN-AI: LIMITED; no mystical cliché
RIGHTS: verify reference rights
PAGE-ASSET ROLE: space.traditional.editorial.

## SPACE-SOCIAL-SHARE

ROLE: SOCIAL SHARE
PURPOSE: SPACE Open Graph
SOURCE: AC ORIGINAL
REQUIRED: YES
ASPECT: 1.91:1
FIT: SOCIAL-CARD
FALLBACK: global AC share
GEN-AI: LIMITED abstract
PAGE-ASSET ROLE: space.social.og.

---

# 12. Services Media

Services is an orientation page, không phải gallery.

## SERVICES-ENVIRONMENT

ROLE: PROCEDURAL BACKGROUND
PURPOSE: AC Ambient connecting DEAL and SPACE
SOURCE: PROCEDURAL
REQUIRED: YES
ASPECT: free-field
FIT: BACKGROUND-FIELD
MOTION: AMBIENT, low intensity
FALLBACK: static AC Ambient
GEN-AI: LIMITED
PAGE-ASSET ROLE: services.environment
REUSE: general AC pages.

## SERVICES-DEAL-SIGNATURE

ROLE: EDITORIAL GRAPHIC / SERVICE SIGNATURE
PURPOSE: directional DEAL identifier
SOURCE: PROCEDURAL/AC graphic
REQUIRED: YES
ASPECT: free-field/3:2
FIT: FREE-FIELD
MOTION: restrained interaction
FALLBACK: static directional mark
GEN-AI: NO need
PAGE-ASSET ROLE: services.deal.signature
REUSE: DEAL family.

## SERVICES-SPACE-SIGNATURE

ROLE: EDITORIAL GRAPHIC / SERVICE SIGNATURE
PURPOSE: relational SPACE identifier
SOURCE: PROCEDURAL/AC graphic
REQUIRED: YES
ASPECT: free-field/3:2
FIT: FREE-FIELD
MOTION: restrained interaction
FALLBACK: static orientation mark
GEN-AI: NO need
PAGE-ASSET ROLE: services.space.signature
REUSE: SPACE family.

No additional photography required for launch.

---

# 13. About Media

## ABOUT-OWNER-PRIMARY

ROLE: OWNER PRIMARY
PURPOSE: primary authorship/human portrait distinct from Homepage
SOURCE: OWNER PHOTOGRAPHY
REQUIRED: YES
DESKTOP: 3:2 environmental or 4:5 portrait
TABLET/MOBILE: 4:5 framed
FIT: PORTRAIT-FRAMED
MOTION: NONE
FALLBACK: approved OWNER-05
GEN-AI: NO
RIGHTS: ORIGINAL AC
PAGE-ASSET ROLE: about.owner.primary
REUSE: About primary + press derivative only.

## ABOUT-OWNER-WORKING

ROLE: OWNER CONTEXT
PURPOSE: authentic practitioner context
SOURCE: OWNER-CREATED PHOTO/VIDEO
REQUIRED: P1
SUBJECT: real site observation, plan review, room/landscape context
ASPECT: 3:2
FIT: EDITORIAL-COVER
MOTION: STATIC or EDITORIAL VIDEO
FALLBACK: Owner Detail
GEN-AI: NO
RIGHTS: location/property permission
PAGE-ASSET ROLE: about.owner.working
REUSE: About + selected editorial feature.

## ABOUT-OWNER-DETAIL

ROLE: OWNER DETAIL
PURPOSE: human/process detail without repeating face portrait
SOURCE: OWNER PHOTOGRAPHY
REQUIRED: OPTIONAL
ASPECT: 1:1 or 3:2
FIT: PROPERTY-DETAIL/FRAMED
FALLBACK: omit
GEN-AI: NO
PAGE-ASSET ROLE: about.owner.detail.

## ABOUT-SOCIAL-SHARE

ROLE: SOCIAL SHARE
PURPOSE: About Open Graph
SOURCE: AC ORIGINAL using OWNER-02/06
REQUIRED: YES
ASPECT: 1.91:1
FIT: SOCIAL-CARD
FALLBACK: global AC share
GEN-AI: NO for portrait
PAGE-ASSET ROLE: about.social.og.

---

# 14. Insights / Guides / Articles / Videos Media

## 14.1 Editorial categories

- PROPERTY
- MARKET
- SPATIAL
- METHOD
- EDUCATION
- LOCATION
- SYSTEM / AC

Mỗi category dùng semantic graphic vocabulary, không dùng một AI image style riêng.

## 14.2 Scalable cover system

### ARTICLE-COVER
Photo, diagram, editorial graphic hoặc typographic cover.

### GUIDE-COVER
Stronger title-led cover; may include document-like indexing.

### VIDEO-POSTER
Real frame/Owner portrait/property frame + title-safe treatment.

### EDITORIAL-THUMBNAIL
Derivative generated from master cover; not manually reinvented each time.

### DOCUMENT-PREVIEW
First page or designed cover preview, framed.

### TOOL-PREVIEW
Future factual screen/data preview only when tool active.

## EDITORIAL-FEATURE

SOURCE: managed content
REQUIRED: one when featured
ASPECT: 3:2 or 16:9
DESKTOP: large
MOBILE: stack
FIT: EDITORIAL-COVER
MOTION: static/video poster
FALLBACK: category cover template
GEN-AI: LIMITED
RIGHTS: content-specific.

## ARTICLE-COVER

SOURCE: photography/diagram/editorial graphic
REQUIRED: YES at content-system level
ASPECT: 3:2 master
MOBILE: intentional crop or framed
FIT: EDITORIAL-COVER
FALLBACK: category template
GEN-AI: LIMITED
REUSE: article page + listing + social derivative.

## GUIDE-COVER

SOURCE: editorial graphic/document cover
REQUIRED: YES
ASPECT: 3:2 + 1.91:1 derivative
FIT: EDITORIAL-COVER
FALLBACK: guide template
GEN-AI: YES for conceptual illustration
REUSE: Guide page/list/social.

## VIDEO-POSTER

SOURCE: real video frame / Owner photography / property footage
REQUIRED: YES
ASPECT: 16:9
FIT: VIDEO-FRAME
FALLBACK: category poster template
GEN-AI: NO if implying actual video frame
RIGHTS: footage rights
REUSE: video page/list/social derivative.

## DOCUMENT-PREVIEW

SOURCE: managed PDF/document
REQUIRED: when document exists
ASPECT: framed 3:2 or portrait source
FIT: DOCUMENT PREVIEW / CONTAIN
FALLBACK: document icon + title
GEN-AI: NO need.

## TOOL-PREVIEW

SOURCE: actual tool screen/data visual
REQUIRED: FUTURE P3
ASPECT: 16:9 or 3:2
FIT: TOOL-PREVIEW
FALLBACK: tool title + unavailable/no preview
GEN-AI: NO fake data
RIGHTS: AC ORIGINAL / source provenance.

AI-slop avoidance:

- templates first
- photography only when meaningful
- procedural/editorial variation by category
- no random image for every article

---

# 15. Contact / Booking / Search Media

## CONTACT-ENVIRONMENT

ROLE: AC AMBIENT
REQUIRED: OPTIONAL P1
PURPOSE: calm convergence without distracting form
SOURCE: PROCEDURAL
MOTION: very low ambient
MOBILE: static/low density
FALLBACK: warm/deep green static field
PAGE-ASSET ROLE: contact.environment
REUSE: Contact + Booking.

## BOOKING-ENVIRONMENT

Use CONTACT-ENVIRONMENT or AC AMBIENT. No bespoke photography required.

## SEARCH-AMBIENT

No unique hero image.

Use:
- neutral Studio-like/public field
- compact AC Ambient background if needed

## SEARCH-RESULT-THUMBNAIL

Use content’s own thumbnail.

Fallback order:
1. content-specific cover
2. category template
3. global neutral AC thumbnail

No giant empty-state image.

---

# 16. Social Share System

Master ratio: 1.91:1.

Optional derivative: 1:1.

Template anatomy:

- AC mark
- title-safe area
- service/content identifier
- media area optional
- restrained environment
- no contact info by default

Templates:

## OG-HOME
AC identity + whole-property perspective + AC Ambient.

## OG-DEAL
DEAL identifier + directional graphic or approved DEAL media.

## OG-SPACE
SPACE identifier + spatial field/orientation graphic.

## OG-ABOUT
Owner portrait + AC identity.

## OG-ARTICLE
Article title + category + cover derivative.

## OG-GUIDE
Guide title + guide index/category.

## OG-VIDEO
Video title + poster/frame + play indicator.

## OG-TOOL
Future only when tool active; real tool visual/data context.

Safe-text rule:

Critical title text remains inside central safe zone, away from crop-prone edges.

---

# 17. Responsive Media Rules

## Owner portrait

Desktop:
use wider source and full editorial integration.

Tablet:
shorter crop, preserve gesture.

Mobile:
separate 4:5 crop; portrait appears where page architecture requires; no face-overlay.

## Property photography

Desktop:
show context.

Mobile:
use focal crop that preserves entrance/site/relationship; do not zoom into generic texture.

## Procedural environment

Desktop:
full depth.

Tablet:
reduce node/geometry density.

Mobile:
static or very low-complexity variant.

## Background video

Desktop only when purpose justifies.

Mobile:
poster/static fallback by default.

## Editorial cover

Use framed presentation if aggressive crop would destroy meaning.

## Diagram

Contain, allow horizontal scroll/zoom only if necessary, provide text explanation.

## Data visualization

No decorative fake data. Mobile may simplify or stack labels but must preserve meaning.

## Video poster

16:9 retained; title outside poster if overlay would hurt readability.

## Social graphic

Dedicated 1.91:1; do not derive by blind crop from portrait.

---

# 18. Video Policy

## Background Video

Requirements:

- muted
- loopable
- no dependency on audio
- subtle
- copy-safe
- poster required
- mobile fallback required
- reduced-motion fallback required

Preferred use:
rare; only when procedural cannot achieve the same quality or meaning.

## Editorial Video

- never autoplay with sound
- visible controls
- poster required
- captions where applicable
- accessible title/context
- transcript when meaningful spoken content exists

## Property Video

- real footage only
- permission/rights clear
- stabilized and context-led
- no implication of listing/client relationship beyond truth

## Owner Video

- authentic Owner presentation/interview/field explanation
- captions required
- no staged client interaction

## Social Video

- derivative/campaign media
- rights and claims consistent with public site

---

# 19. Property Media Governance

## Ownership

Record who created/owns each photo/video.

## Permission

Private property and recognizable people require documented permission appropriate to intended use.

## MLS / Listing Media

Use only within rights granted. Do not assume listing access equals perpetual marketing permission.

## Street Imagery

Review source license and terms.

## Drone

Review operator, location, airspace and property permission requirements.

## Owner-Created Photography

Preferred when quality and permissions are adequate.

## Screenshots

Use only with source/rights context; avoid exposing private data.

## Maps

Use licensed/open-data sources with attribution/provenance where required.

## Third-Party Embeds

Keep as embed when rights permit; do not download and republish by default.

## Client / Property Work

Do not publish as case study without permission and factual review.

---

# 20. Accessibility

## Alt text required

- meaningful property/context photography
- Owner portraits when identity/function matters
- editorial covers when image conveys unique meaning
- diagrams
- tool previews

## Decorative treatment

Procedural ambience and purely decorative background fields should be hidden from assistive technology.

## Caption required

- property/location image where context/source matters
- historical/reference image
- data visual

## Transcript/captions

- captions for spoken video
- transcript for substantive editorial video/audio

## Diagram explanation

Provide textual summary of relationship or conclusion.

## Alt quality

Avoid generic:
- image
- house image
- portrait

Prefer contextual description tied to page purpose.

---

# 21. Performance Priorities

## ABOVE THE FOLD

- HOME-HERO-OWNER
- HOME-HERO-ENVIRONMENT static/procedural bootstrap
- page hero environment/poster

Priority:
high, but page comprehension must not depend on full media load.

## NEAR VIEWPORT

- Method media
- service context media
- featured Insights cover

Priority:
preload only when justified; otherwise near-viewport loading.

## BELOW FOLD

- content thumbnails
- secondary property detail
- About supporting media

Priority:
lazy.

## INTERACTION-ONLY

- full-resolution gallery media
- advanced diagram
- video player media

Priority:
on demand.

Requirements:

- responsive sizes
- poster images
- mobile substitution
- reduced-motion substitution
- avoid multi-megabyte hero dependency

---

# 22. Fallback System

## Owner image failure

Use approved alternate Owner portrait or intentional typographic/human-authority layout. Never use random stock person.

## Procedural scene unavailable

Use static poster from same environment family.

## Background video failure

Use poster; keep copy hierarchy unchanged.

## Video poster missing

Use category poster template + title + type.

## Article image missing

Use category cover template.

## Tool preview unavailable

Use text-first Tool Preview with “Preview unavailable” only when tool is actually public.

## Property media unavailable

Use diagram/editorial graphic or omit media. Do not substitute fake property.

## Social share missing

Use global AC social share template.

No broken empty rectangles.

---

# 23. Approval / Lifecycle

Lifecycle concept:

INBOX / CREATED
→ REVIEWED
→ APPROVED
→ ASSIGNED
→ PUBLISHED
→ ARCHIVED

Use only states current platform can support. If some states do not exist, treat them as operating policy rather than new backend state.

Owner approval recommended before public use for:

- Owner portrait/video
- property/client/location media with sensitive context
- social share master templates
- generated editorial visuals that could imply factual context
- tool/data previews
- licensed media

Assignment does not equal approval unless current governance explicitly defines it that way.

---

# 24. Media Reuse Policy

1. HOME-HERO-OWNER cannot also be About Hero or DEAL Hero.
2. ABOUT-OWNER-PRIMARY may appear in press/social derivatives, not as Homepage hero.
3. OWNER CONTEXT images should stay within their service family.
4. Procedural environments may intentionally repeat within a service family.
5. AC AMBIENT may repeat on utility/general pages.
6. Editorial category templates may repeat structurally, but title/media treatment must vary by content.
7. Generic editorial fallback should not appear more than once in the same viewport/list.
8. Real property media stays tied to its factual property/content context.
9. Social derivatives may reuse source media but must use dedicated crop/layout.
10. Avoid showing the same major image in adjacent sections or two consecutive routes.

---

# 25. Master Media Inventory

| ID | Page/System | Section | Role | Type | Required | Source | Aspect | Desktop | Mobile | Motion | Gen AI | Fallback | Reuse | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| HOME-HERO-OWNER | Home | Hero | Owner Hero | Photo | Yes | Original AC | 4:5 + wide source | Integrated portrait | 4:5 crop | None | No | Approved alternate | Home only | P0 |
| HOME-HERO-ENVIRONMENT | Home | Hero | AC Ambient | Procedural | Yes | AC procedural | Free | Full field | Simplified/static | Ambient | Limited | Static poster | General family | P0 |
| HOME-METHOD-MEDIA | Home | Method | Owner Detail/Diagram | Photo/Diagram | Optional | Original AC | 3:2/1:1 | Framed | Optional/omit | Static | Limited | Typography | Sparse | P2 |
| HOME-INSIGHTS-FEATURED | Home | Insights | Editorial Feature | Managed content | Yes if shown | Content source | 3:2/16:9 | Large feature | Stack | Static/poster | Limited | Category cover | Source content | P1 |
| HOME-SOCIAL-SHARE | Home | OG | Social Share | Graphic | Yes | AC original | 1.91:1 | N/A | N/A | None | Limited | Global OG | Home | P0 |
| DEAL-HERO-ENVIRONMENT | DEAL | Hero | Deal Network | Procedural | Yes | AC procedural | Free | Full field | Simplified | Ambient | Limited | Static poster | DEAL family | P0 |
| DEAL-HERO-OWNER | DEAL | Hero | Owner Context | Photo | Optional | Original AC | 3:2/4:5 | Environmental | Framed | None | No | Omit | DEAL only | P1 |
| DEAL-PROPERTY-CONTEXT | DEAL | Content | Property Context | Photo | Optional | Original/licensed | 3:2 | Wide | Intentional crop | None | No | Editorial graphic | Factual context only | P1 |
| DEAL-PROPERTY-DETAIL | DEAL | Content | Property Detail | Photo | Optional | Original/licensed | 3:2/1:1 | Detail | Detail | None | No | Omit | Limited | P2 |
| DEAL-LOCATION-CONTEXT | DEAL | Context | Location | Photo | Optional | Original/licensed | 3:2 | Wide | Crop | None | No | Location diagram | Location family | P1 |
| DEAL-MARKET-EDITORIAL | DEAL | Intelligence | Diagram/Graphic | Diagram | Optional | AC/open data | 3:2/16:9 | Contain | Contain | Static/interactive | Limited | Text | Template reuse | P2 |
| DEAL-SOCIAL-SHARE | DEAL | OG | Social Share | Graphic | Yes | AC original | 1.91:1 | N/A | N/A | None | Limited | Global OG | DEAL family | P0 |
| SPACE-HERO-ENVIRONMENT | SPACE | Hero | Spatial Field | Procedural | Yes | AC procedural | Free | Full field | Simplified | Ambient | Limited | Static poster | SPACE family | P0 |
| SPACE-HERO-OWNER | SPACE | Hero | Owner Context | Photo | Optional | Original AC | 3:2/4:5 | Environmental | Framed | None | No | Omit | SPACE only | P1 |
| SPACE-RESIDENTIAL | SPACE | Residential | Property Context | Photo | Optional | Original/licensed | 3:2 | Wide/detail | Crop | None | No | Diagram | Context-only | P1 |
| SPACE-SELECTION | SPACE | Selection | Site/Orientation | Photo/Diagram | Optional | Original/open data | 3:2 | Wide/contain | Contain | None | Limited | Diagram | Topic family | P2 |
| SPACE-BUSINESS | SPACE | Business | Property Context | Photo | Optional | Original/licensed | 3:2 | Wide | Crop | None | No | Diagram | Context-only | P2 |
| SPACE-AUDIT | SPACE | Audit | Owner Detail/Diagram | Photo/Diagram | Optional | Original AC | 3:2/1:1 | Framed | Framed | None | Limited | Typography | Limited | P2 |
| SPACE-METHOD-DIAGRAM | SPACE | Method | Diagram | Diagram | Optional for Minimum Launch / Required for Premium V1 | AC original | 3:2/16:9 | Contain | Contain | Static/interactive | Yes | Text | Education reuse | P1 |
| SPACE-TRADITIONAL-EDITORIAL | SPACE | Traditional | Editorial Graphic | Graphic | Optional | AC/licensed | 3:2 | Framed | Framed | None | Limited | Typography | Limited | P2 |
| SPACE-SOCIAL-SHARE | SPACE | OG | Social Share | Graphic | Yes | AC original | 1.91:1 | N/A | N/A | None | Limited | Global OG | SPACE family | P0 |
| SERVICES-ENVIRONMENT | Services | Hero | AC Ambient | Procedural | Yes | AC procedural | Free | Field | Simplified | Ambient | Limited | Static | General | P0 |
| SERVICES-DEAL-SIGNATURE | Services | Orientation | Deal Signature | Procedural graphic | Yes | AC original | Free/3:2 | Interactive | Static/light | Interactive | No | Static mark | DEAL family | P0 |
| SERVICES-SPACE-SIGNATURE | Services | Orientation | Space Signature | Procedural graphic | Yes | AC original | Free/3:2 | Interactive | Static/light | Interactive | No | Static mark | SPACE family | P0 |
| ABOUT-OWNER-PRIMARY | About | Hero | Owner Primary | Photo | Yes | Original AC | 4:5/3:2 | Primary portrait | 4:5 | None | No | Owner editorial | About/press | P0 |
| ABOUT-OWNER-WORKING | About | Method | Owner Context | Photo/Video | Optional | Original AC | 3:2 | Editorial | Framed | Static/video | No | Detail | Sparse | P1 |
| ABOUT-OWNER-DETAIL | About | Supporting | Owner Detail | Photo | Optional | Original AC | 1:1/3:2 | Detail | Optional | None | No | Omit | Sparse | P2 |
| ABOUT-SOCIAL-SHARE | About | OG | Social Share | Graphic | Yes | AC original | 1.91:1 | N/A | N/A | None | No portrait gen | Global OG | About | P0 |
| EDITORIAL-FEATURE | Insights | Featured | Editorial Feature | Mixed | Yes when used | Managed | 3:2/16:9 | Large | Stack | Static/poster | Limited | Category cover | Source content | P1 |
| ARTICLE-COVER | Articles | Cover | Editorial Cover | Mixed | Yes system-level | Managed/AC | 3:2 | Cover | Framed/crop | None | Limited | Category template | Article/list/social | P1 |
| GUIDE-COVER | Guides | Cover | Guide Cover | Graphic | Yes | AC original | 3:2 | Cover | Framed | None | Yes | Guide template | Guide/list/social | P1 |
| VIDEO-POSTER | Videos | Poster | Video Poster | Frame/Photo | Yes | Real footage | 16:9 | Player/poster | 16:9 | None | No fake frame | Category poster | Video/list/social | P1 |
| DOCUMENT-PREVIEW | Content | Document | Document Preview | PDF preview | Conditional | Managed | Framed | Contain | Contain | None | No | Document icon | Content only | P2 |
| TOOL-PREVIEW | Future Tools | Preview | Tool Preview | Screen/Data | Future | Real tool | 16:9/3:2 | Framed | Framed | Optional | No fake data | Text-only | Tool only | P3 |
| CONTACT-ENVIRONMENT | Contact/Booking | Background | AC Ambient | Procedural | Optional | AC procedural | Free | Low-intensity | Static/light | Ambient | Limited | Static | Contact/Booking | P1 |
| SEARCH-RESULT-THUMBNAIL | Search | Results | Thumbnail | Managed | Yes system-level | Content source | 1:1/3:2 | Compact | Compact | None | Limited | Category/global | Content source | P1 |
| SOCIAL-SQUARE | Global | Social | Square fallback | Graphic | Optional | AC original | 1:1 | N/A | N/A | None | Limited | Global square | Social only | P2 |

Inventory count: 36 roles.

---

# 26. Minimum Launch Media Set

Mục tiêu: site chuyên nghiệp mà không trì hoãn launch vì thiếu 50 assets.

## Must photograph

1. OWNER-01 Homepage Hero.
2. OWNER-02 About Primary.
3. OWNER-05 Editorial/Content portrait.

Có thể chụp cùng production day nhưng wardrobe/background/crop phải khác nhau.

## Must create

1. AC AMBIENT static + procedural fallback.
2. DEAL NETWORK static + procedural.
3. SPATIAL FIELD static + procedural.
4. EDITORIAL ARCHIVE static/template.
5. OG templates: Home, DEAL, SPACE, About, Article, Guide, Video.
6. Article/Guide/Video fallback cover system.
7. Search/global thumbnail fallback.

## Can procedural-generate

- Home environment
- Services environment
- DEAL environment/signature
- SPACE environment/signature
- Insights archive environment

## Can postpone

- DEAL Owner Context photo
- SPACE Owner Context photo
- About working portrait
- property context library
- property/detail video
- advanced diagrams
- Tool Preview
- social square derivatives beyond priority channels

Minimum launch does not require fake property photography.

---

# 27. Premium V1 Media Set

Add after launch minimum:

1. OWNER-03 DEAL Context.
2. OWNER-04 SPACE Context.
3. OWNER-DETAIL library.
4. About working/environmental portrait.
5. Curated Georgia/location photography library.
6. Real property context/detail library with permissions.
7. SPACE Method diagram set.
8. DEAL editorial market/decision graphic set.
9. Owner editorial video/interview.
10. Property/context B-roll.
11. Expanded Guide/Article cover category library.
12. Vertical social video derivatives.
13. High-quality press/advertising portrait pack.

Premium V1 không thay đổi taxonomy; chỉ làm giàu asset pool.

---

# 28. Production Queue

## 1. Owner Hero + About Portrait Production

WHY NOW:
Homepage/About thiếu human differentiation nếu chỉ có một ảnh.

DEPENDENCIES:
wardrobe, location/studio, crop map.

REUSE VALUE:
Home, About, author, press derivatives.

## 2. Master Background Environments

WHY NOW:
chúng là visual backbone cho Home/DEAL/SPACE/Insights.

DEPENDENCIES:
visual engine capabilities and static fallback rendering.

REUSE VALUE:
very high across service families.

## 3. Social Share Templates

WHY NOW:
required for every launch route and content share.

DEPENDENCIES:
brand mark, typography, service identifiers.

REUSE VALUE:
high.

## 4. Editorial Cover System

WHY NOW:
allows scale without bespoke photography.

DEPENDENCIES:
content categories, title-safe rules.

REUSE VALUE:
very high.

## 5. Video Poster System

WHY NOW:
video pages need accessible/load-safe posters.

DEPENDENCIES:
video content model.

REUSE VALUE:
high.

## 6. DEAL / SPACE Owner Context Shoots

WHY NOW:
raises service authority after core launch assets exist.

DEPENDENCIES:
real locations/permission.

REUSE VALUE:
medium-high.

## 7. Property / Location Media Library

WHY NOW:
supports factual service/editorial content.

DEPENDENCIES:
rights and capture opportunities.

REUSE VALUE:
medium, context-limited.

## 8. Diagrams / Editorial Graphics

WHY NOW:
adds intelligence without fake photography.

DEPENDENCIES:
approved method/content.

REUSE VALUE:
high for education.

## 9. Owner Video / Property B-roll

WHY NOW:
premium layer, not launch blocker.

DEPENDENCIES:
script/context/captions.

REUSE VALUE:
medium-high.

---

# 29. Studio / Page Assets Handoff

## 29.1 Media Library role

Stores:
- source file
- derivative previews
- type
- source/rights metadata
- review/approval status if supported
- intended use

## 29.2 Page Assets role

Assigns approved media to:
- page
- section
- slot/role
- presentation behavior
- responsive override where needed

## 29.3 Important slot contracts

| Page-Asset Role | Media Library Type | Presentation | Responsive Override | Owner Approval |
|---|---|---|---|---|
| home.hero.owner | Owner photo | PORTRAIT-CONTAIN | Yes, mobile crop | Yes |
| home.hero.environment | Procedural/static | BACKGROUND-FIELD | Yes, density/static | Yes for master visual |
| home.method.media | Photo/diagram | FRAMED/CONTAIN | Optional hide/crop | Yes if Owner photo |
| home.insights.featured | Managed content | EDITORIAL-COVER | Yes | Content approval |
| deal.hero.environment | Procedural/static | BACKGROUND-FIELD | Yes | Yes for master |
| deal.hero.owner | Owner photo | PORTRAIT-FRAMED | Yes | Yes |
| deal.property.context | Property photo | PROPERTY-WIDE | Yes | Rights + Owner |
| deal.market.editorial | Diagram/data visual | DIAGRAM-CONTAIN | Yes | Yes if factual |
| space.hero.environment | Procedural/static | BACKGROUND-FIELD | Yes | Yes for master |
| space.hero.owner | Owner photo | PORTRAIT-FRAMED | Yes | Yes |
| space.method.diagram | Diagram | DIAGRAM-CONTAIN | Yes | Yes |
| about.owner.primary | Owner photo | PORTRAIT-FRAMED | Yes | Yes |
| about.owner.working | Owner photo/video | EDITORIAL-COVER/VIDEO | Yes | Yes |
| article.cover | Mixed content | EDITORIAL-COVER | Yes | Content approval |
| guide.cover | Graphic | EDITORIAL-COVER | Yes | Content approval |
| video.poster | Video frame/photo | VIDEO-FRAME | Limited | Content approval |
| contact.environment | Procedural/static | BACKGROUND-FIELD | Yes | Master approval |
| *.social.og | Social graphic | SOCIAL-CARD | No page-device override | Yes for template |

## 29.4 Presentation controls Studio should expose conceptually

- Fit mode
- Crop/focal point when allowed
- Mobile crop/alternative when needed
- Static fallback
- Motion policy
- Decorative/meaningful accessibility treatment
- Caption/source where relevant

Do not design database schema in this plan.

---


## 29.5 Asset Naming Convention

Recommended pattern:

```text
ac-[family]-[page-or-context]-[role]-[orientation]-v[number]
```

Examples:

```text
ac-owner-home-hero-vertical-v01
ac-owner-about-primary-horizontal-v01
ac-env-deal-network-static-wide-v01
ac-space-method-diagram-wide-v01
ac-og-deal-wide-v01
```

Rules:

- lowercase
- hyphen-separated
- no spaces
- no temporary names such as `final-final-2`
- version number required for approved public masters
- language suffix only when the visual itself contains localized text
- source masters and exported derivatives should remain distinguishable
- filenames should describe media family, context, role, orientation and version rather than camera-generated numbering
- archived versions should not overwrite the currently approved public master

Suggested orientation vocabulary:

- `wide`
- `horizontal`
- `vertical`
- `square`
- `free-field`

Suggested media-family vocabulary:

- `owner`
- `property`
- `location`
- `env`
- `editorial`
- `diagram`
- `video`
- `document`
- `tool`
- `og`

This convention is an operating and handoff rule, not a database schema. Studio and Media Library may preserve internal IDs separately.


# 30. Open Decisions

1. Which existing Owner portrait can temporarily serve as HOME-HERO-OWNER before new production?
2. Does current procedural engine support all four master environments without creating separate video assets?
3. Which Georgia/location photography can AC legally use now?
4. Does current Media Library support rights/source metadata and approval state sufficiently?
5. Does Page Assets support device-specific crop/presentation overrides?
6. Which content categories are already canonical for Articles/Guides/Videos?
7. Which factual diagrams/data visuals are currently available with source provenance?
8. Is About working media feasible in an authentic real environment?
9. Which social channels require a 1:1 derivative at launch?
10. What public tool, if any, will be first to need TOOL-PREVIEW?
11. Are captions/transcripts already part of current video workflow?
12. Which listing/MLS/property-media permissions need a separate compliance checklist?

---

# 31. DO NOT LIST

Do not recommend or produce:

- random stock photo filler
- fake testimonials
- fake customers
- fake office scenes
- fake transaction photography
- generic smiling real-estate agents
- luxury mansions used only to imply status
- watermark removal
- copyright scraping
- one background video per page
- full-screen autoplay editorial video
- constant motion everywhere
- AI documentary-style imagery pretending to be real AC work
- fake property/listing photography
- mystical Feng Shui clichés
- gold dragons or fantasy temples as default SPACE language
- data graphics without real data
- generative portrait replacing Anh Cao
- repeated use of one Owner portrait across Home/About/DEAL/SPACE
- media that exposes CONDITION publicly
- media that contradicts active service boundaries
- broken empty media boxes
- media assignment that bypasses Page Assets
- content thumbnails without fallback governance

---

# FINAL NORTH STAR

AC should look visually rich because its media system consistently communicates:

PROPERTY
CONTEXT
DIRECTION
ORIENTATION
HUMAN AUTHORITY
INTELLIGENCE

The public site should remain original, credible, performant, scalable, rights-safe and Studio-controllable.

The system should make it easier to create future pages and content without depending on random stock images, one overused portrait or decorative motion.
