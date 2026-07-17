# Strategic Research Implementation

## Purpose

The website now has an operating strategy beneath its approved visual architecture. The central thesis is **Turn property uncertainty into clarity**. This is not a new public claim, credential, or redesign; it is a decision framework connecting Deal, Condition, and Space to content planning, owner review, proof, and qualified lead pathways.

## Central configuration

`src/data/strategy/index.ts` is the source of truth for the thesis, promises, strategic lenses, seller and buyer processes, six content pillars, proof formats, referral categories, complex-property frameworks, market snapshot validation, event names, and feature-flagged offers. Centralization prevents public pages and Studio tools from silently inventing their own positioning.

## Signature offers

Three routes are implemented but hidden by default:

- Market-Ready Property Audit — `MARKET_READY_AUDIT_ACTIVE`
- Buyer Property Risk Review — `BUYER_PROPERTY_RISK_REVIEW_ACTIVE`
- Property Preparation Concierge — `PROPERTY_PREPARATION_CONCIERGE_ACTIVE`

Every flag defaults to false. An inactive route returns 404 and is not added to global navigation. Enabling a route only activates its prepared scope; credentials, vendor relationships, and outcomes still cannot be inferred.

## Content strategy metadata

Content entries may store a pillar, target audience, funnel stage, proof type, strategic objective, brief, suggested hook, suggested proof, proposed media format, and stable seed key. This metadata is operational only. It does not publish an entry or count as evidence.

The Strategy Studio provides pillar/service/funnel/objective filters and owner-controlled edit/delete actions. Seeded records remain drafts with no published locale.

## Seeding strategic drafts

Run:

```bash
npm run seed:strategy
```

The command creates 30 English planning drafts in `.dev-data/content`. Run it again safely: stable `seedKey` values prevent duplicates. Drafts include briefs and hooks, but not fabricated market data, testimonials, transactions, credentials, findings, or property claims. Add verified evidence and Vietnamese parity before publication.

## Six pillars and conversion pathways

1. Inspection Truth → request inspection
2. Market Reality → plan next move
3. Spatial Intelligence → book spatial consultation
4. Luxury Buyer Psychology → plan next move
5. Feng Shui + Cultural Intelligence → book spatial consultation
6. Seller Transformation → plan next move

The luxury pillar discusses property experience rather than claiming “luxury specialist” status. Feng Shui remains optional interpretation layered after observable facts and practical spatial analysis.

## Proof and market freshness

Proof types are taxonomy, not proof assets. Restricted claims remain disabled in `proofClaimGates`. Public proof modules must not render until owner-approved source material exists.

Market snapshots require an `asOfDate`, source, metric, value, context, and `verifiedAt`. No market number should be presented as current without a dated source and human verification. The schema does not automatically syndicate or publish market data.

## Referral and attribution architecture

Referral categories describe future relationship architecture only; they do not imply an active partnership. Strategy attribution types can associate a qualified event with content, pillar, objective, referral category, and source without embedding personal lead payloads in analytics.

## Public integration

The homepage introduces the clarity thesis below the approved service pillars. Each service hub receives one compact, service-specific framework:

- Deal: seller and buyer decision sequence
- Condition: visible, accessible, documented, prioritized
- Space: orientation, zones, circulation, optional interpretation

No hero, header, footer, route hierarchy, credential flag, or compliance rule is replaced.

## Owner workflow

1. Seed drafts once (or rerun safely).
2. Open `/studio/strategy`.
3. Filter by pillar, service, funnel stage, or objective.
4. Edit a draft in Content Studio or delete it.
5. Add verified sources, approved media, Vietnamese content, and appropriate proof.
6. Review compliance and explicitly publish the desired locale.

