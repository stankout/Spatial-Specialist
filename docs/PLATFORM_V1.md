# AC Spatial Specialist Business Platform V1

This document describes the modular business-platform foundation built on top of the existing public website, Content Studio, Media Library, Page Assets, and Visual Director.

## Operating model

The platform uses three explicit readiness states:

- **Built and functional locally:** typed domains, local development repositories, Studio workstations, publishing rules, search, feature gating, and mock-provider workflows.
- **Architecture ready, production provider required:** payments, database persistence, email, scheduling, Print-on-Demand, private downloads, analytics, and customer entitlements.
- **Disabled until owner activation:** public commerce, paid questions, affiliate catalog, portfolio, customer accounts, and all provider-backed production operations.

Local data lives under `.dev-data/`, which is Git-ignored. Production code never silently treats the writable local filesystem as a database.

## Feature flags

Public modules are controlled from `src/data/platform.config.ts` with explicit `NEXT_PUBLIC_*` flags. Safe defaults keep commerce, payments, accounts, affiliate items, POD, paid questions, and portfolio disabled. Search, articles, and consultation inquiry architecture may remain enabled because they do not require payment credentials.

Navigation, routes, sitemap entries, and public search respect these flags. Empty catalog and portfolio routes do not appear in navigation.

## Page Manager

Studio → Pages lists canonical system pages and their managed semantic sections. Supported actions include:

- edit page metadata and visibility;
- show or hide a section;
- move sections;
- duplicate a section safely;
- open its Media/Page Assets context;
- open its Visual Director context;
- preview, Save Draft, and Publish.

Sections use an allowlisted registry; arbitrary HTML, JavaScript, and pixel-positioning are not accepted.

## Content collections and search

The existing Content Studio remains canonical for articles, guides, videos, property education, and portfolio drafts. Only `published` records for an explicitly published locale can enter public indexes or search.

Search indexes public page metadata, public Content Studio records, and active public catalog records. It never indexes drafts, hidden CONDITION pages, leads, customers, orders, private assets, checkout internals, or downloads.

## Catalog

The catalog uses one typed record with explicit discriminators:

- `physical`
- `digital`
- `service`
- `affiliate`

Prices are stored as integer minor units (cents). Affiliate links require HTTPS and render with sponsored/nofollow/noopener attributes and a configurable disclosure. Affiliate and service records cannot enter the first-party cart.

No demo product is published automatically.

## Commerce, checkout, and orders

The cart accepts active physical and digital items only and persists a versioned anonymous cart in localStorage. Checkout rebuilds every line from the server-side catalog; it never trusts price or title values submitted by the browser.

The mock payment adapter requires all of the following:

```env
NEXT_PUBLIC_COMMERCE_ENABLED=true
NEXT_PUBLIC_PAYMENTS_ENABLED=true
PAYMENT_PROVIDER=mock
```

It runs only in development and is labeled `DEVELOPMENT / MOCK`. No card number or CVV field exists. Production payment integration must use a hosted/tokenized payment provider and webhook signature verification.

Orders retain an immutable item snapshot, integer totals, payment state, fulfillment state, provider reference, and idempotency key.

Tax calculation is intentionally an interface only. Do not present a legal tax calculation until a provider and business rules are configured.

## Digital delivery, courses, and entitlements

Course, Module, and Lesson schemas support text, video, audio, embed, and download lessons. Digital and course access is represented by server-verifiable entitlements.

The authorization helper validates customer, product, entitlement, and exact asset binding. Never place paid source files under a predictable public URL. A production download route requires authentication plus a production storage provider.

## Booking and paid knowledge

Booking records store service, contact, requested time, duration, timezone, notes, acquisition metadata, and explicit status. A request is never presented as confirmed availability.

Paid Question and Video Answer share a private Service Request lifecycle:

`awaiting-payment → submitted → reviewing → completed`

Responses may be text, audio, or video. Public paid-question submission remains disabled until the owner configures real catalog pricing and payment/account delivery.

## Providers

Provider interfaces exist for:

- Payments
- Print-on-Demand
- Scheduling
- Email notifications
- Analytics
- Storage
- Authentication readiness

Mock adapters do not call external vendors and cannot run as production payment or fulfillment systems.

## Media and Visual Director

Media roles now distinguish content image/video, background video, product media, download assets, document/reference files, and logos. Studio previews preserve proportions; portrait cropping remains role/slot-specific. Video backdrop workflow remains:

`Media → metadata → owner approval → Page Assets → Visual Director → Draft → Publish`

Privacy, rights, metadata, and public approval remain separate checks. The approval workstation explains missing requirements.

## SEO and analytics

Sitemap output includes only enabled, published public routes and records. Studio, drafts, hidden CONDITION, cart/checkout internals, account routes, and private delivery are excluded.

Analytics uses provider-neutral event names such as `page_view`, `lead_submit`, `booking_request`, `product_view`, `add_to_cart`, `checkout_start`, `checkout_complete`, `affiliate_click`, and `video_play`. No external provider is required locally.

## Privacy and legal review

Current Privacy and Terms pages remain pre-launch architecture, not attorney-reviewed promises. Production Readiness requires explicit review markers for privacy, terms, and—when commerce is enabled—refund policy.

Do not activate production commerce until business identity, tax, refund, fulfillment, privacy, and provider responsibilities have been reviewed by appropriate professionals.

## Production requirements

Studio → Settings reports actual status for:

- Studio authentication
- Database/provider storage
- Payment provider
- Email provider
- Production media storage
- Privacy review
- Terms review
- Refund policy
- Business contact

Production activation requires real authentication, durable database/storage, payment provider, webhook verification, email delivery, protected downloads, rate limiting appropriate for the hosting environment, and owner/legal policy decisions.
