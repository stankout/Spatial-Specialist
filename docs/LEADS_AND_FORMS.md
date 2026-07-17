# Leads and Forms

## Architecture

The booking and contact experience normalizes every inquiry into one typed lead object. The browser collects only form data and privacy-conscious attribution; `/api/leads` validates the payload again before selecting a delivery adapter.

Lead types: `buyer`, `seller`, `investor`, `inspection`, `inspection-report-review`, `spatial-residential`, `spatial-property-selection`, `spatial-business`, `spatial-audit`, and `general`.

The normalized record contains a generated ID, locale, contact data, service-specific data, message, source/UTM attribution, landing/current page, consent, and server creation time. Report upload is represented only as a future data-model flag; no upload endpoint exists.

## Validation and privacy

Zod validates required service fields, email, loose phone length, allowed select values, text limits, consent, and the honeypot. The inspection pathway requires a phone number. Forms must never request SSNs, bank details, sensitive financial documents, or unrelated personal information.

Spam controls include a hidden honeypot, a 2.5-second minimum completion time, server validation, duplicate-submit disabling, and a replaceable in-memory rate-limit adapter. Turnstile, hCaptcha, or reCAPTCHA can be added later without changing lead business logic.

## Providers

`LEAD_PROVIDER=mock` validates and returns success without external delivery. Development logs contain only lead type and generated ID. Set `LEAD_PROVIDER=webhook` and `LEAD_WEBHOOK_URL` to enable the generic webhook adapter. Email and CRM adapters should implement the same `LeadProvider` interface and initialize provider SDKs lazily.

External scheduling remains optional. When `NEXT_PUBLIC_BOOKING_URL` is configured, `getBookingProvider()` exposes it for a future “Schedule a time” action; otherwise the internal inquiry form remains the primary workflow.

## How to inspect mock leads during development

1. Set `LEAD_PROVIDER=mock` in the local environment.
2. Run `npm run dev`.
3. Submit a booking or contact form.
4. Open `.dev-data/leads.jsonl` from the project root.
5. Read one JSON object per line; each line represents one validated test lead.

The `.dev-data/` directory is created automatically and is excluded from Git. Mock submissions are not sent to a real email address, CRM, or webhook. They exist only to test the lead flow before a production provider is configured, and file storage is disabled whenever `NODE_ENV` is `production`.

## Attribution and analytics

The browser stores the first landing attribution in session storage and updates the current page. Supported sources are direct, Google, YouTube, TikTok, Instagram, Facebook, referral, and other. UTM source, medium, campaign, content, and term are attached to the lead. No fingerprinting or cross-session identifier is created.

Analytics events are emitted through a provider-neutral browser event: `book_page_view`, `service_selected`, `lead_form_started`, `lead_form_submitted`, `lead_form_error`, `contact_click`, `phone_click`, `booking_external_click`. With no consumer configured, this is a no-op delivery architecture.

## Environment variables

- `LEAD_PROVIDER`: `mock` or `webhook`.
- `LEAD_WEBHOOK_URL`: private webhook endpoint.
- `RESEND_API_KEY`: reserved for a future email adapter.
- `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`: reserved spam-protection configuration.
- `NEXT_PUBLIC_BOOKING_URL`: optional public scheduling URL.

Never expose provider secrets through `NEXT_PUBLIC_*` variables.

## Production checklist

1. Choose and implement an approved email, CRM, or webhook provider.
2. Replace the in-memory limiter with a distributed store for multi-instance deployments.
3. Configure bot protection if traffic requires it.
4. Verify retention, deletion, consent, and vendor language in the Privacy Policy.
5. Test delivery failure, provider retry, duplicate handling, EN/VI content, UTM preservation, and mobile keyboard behavior.
6. Enable external scheduling only after its URL and owner workflow are verified.
