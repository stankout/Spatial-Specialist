# AC Spatial Specialist — Production Readiness

Status: VERIFIED PLATFORM SUMMARY

Production remains deliberately fail-closed.

The repository contains interfaces, local repositories, mock adapters, feature flags, and readiness checks. These do not prove that a production provider is configured. Current blockers include production authentication/session handling, durable database and media storage, reliable email and scheduling, analytics, backups/restore, durable audit persistence, and applicable privacy/terms/refund review.

Payment, POD, local media, mock lead, and similar development adapters cannot be treated as production fulfillment. Disabled public feature flags remain off until their complete provider, business, legal, and Owner approval gates are met.

The live readiness checklist is rendered in Studio from `src/components/production-readiness.tsx`. Operational launch steps remain in [Launch Checklist](../LAUNCH_CHECKLIST.md) and [Deployment](../DEPLOYMENT.md).
