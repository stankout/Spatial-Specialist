# AC Spatial Specialist — Data Source Registry

Status: DRAFT
Document Class: Data Source Registry
Intended Canonical Location: docs/60-data/SOURCE_REGISTRY.md

---

## 1. Purpose

This registry identifies approved or candidate data providers for AC data products.

A source appearing here does not mean every available metric from that source is approved for every product.

Indicator specifications determine actual usage.

---

# SOURCE-FRED

Provider:

Federal Reserve Bank of St. Louis — FRED

Status:

APPROVED CANDIDATE

Use:

Economic time series and historical observations.

Potential indicators:

- Federal Funds related series
- Treasury-related series
- inflation/economic series
- housing/macro series

Important:

Prefer original source/provider definitions when interpretation depends on methodology.

Record FRED Series ID when used.

---

# SOURCE-BLS

Provider:

U.S. Bureau of Labor Statistics

Status:

APPROVED CANDIDATE

Use:

Official BLS economic statistics.

Potential indicators:

- CPI
- employment
- unemployment
- related labor/inflation data

Record exact BLS Series ID.

---

# SOURCE-TREASURY

Provider:

U.S. Department of the Treasury

Status:

APPROVED CANDIDATE

Use:

Official Treasury yield-curve information.

Potential indicators:

- 2Y Treasury
- 10Y Treasury
- 30Y Treasury
- yield-curve relationships

Use the exact defined Treasury rate type.

Do not refer vaguely to "Treasury rate."

---

# SOURCE-FEDERAL-RESERVE

Provider:

Board of Governors of the Federal Reserve System / FOMC

Status:

APPROVED CANDIDATE

Use:

- FOMC calendar
- policy statements
- official monetary-policy information
- policy-rate context

Do not have AI infer a policy decision before official publication.

---

# SOURCE-FREDDIE-MAC

Provider:

Freddie Mac Primary Mortgage Market Survey

Status:

APPROVED CANDIDATE

Use:

National mortgage-rate benchmark context.

Potential:

- 30-year fixed mortgage average
- 15-year fixed mortgage average

Important:

PMMS is a benchmark/average, not a personalized loan quote.

---

# SOURCE-ZILLOW-RESEARCH

Provider:

Zillow Research

Status:

APPROVED CANDIDATE

Potential use:

- for-sale inventory
- new listings
- pending listings
- sale/list behavior
- days to pending
- price cuts
- home-value/rent indices

Metric definition and update schedule must be recorded individually.

---

# SOURCE-REDFIN-DATA-CENTER

Provider:

Redfin Data Center

Status:

APPROVED CANDIDATE

Potential use:

- inventory
- market balance
- price drops
- cancellations
- financing trends
- local/metro housing data

Do not mix Redfin and Zillow definitions merely because metric names appear similar.

---

# Source Selection Rule

For each indicator select:

PRIMARY SOURCE

OPTIONAL FALLBACK

Do not dynamically switch between providers with different methodologies without telling the product layer.

---

# Source Record Requirements

Production integration should eventually document:

Source ID

Provider

Metric / Series ID

API / download mechanism

Frequency

Geography

Terms / use constraints

Authentication

Rate limits

Revision behavior

Fallback

Last verification date
