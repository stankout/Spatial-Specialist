# AC Spatial Specialist — Data Governance

Status: DRAFT
Document Class: Data Governance Specification
Intended Canonical Location: docs/60-data/DATA_GOVERNANCE.md

---

## 1. Purpose

This document defines how AC handles data used for market-intelligence products and public market information.

---

## 2. Core Principle

Always distinguish:

RAW DATA

DERIVED INDICATOR

INTERPRETATION

RECOMMENDATION

These are not the same thing.

---

## 3. Raw Data

Raw Data is a sourced observation before AC-specific interpretation or scoring.

Examples:

- mortgage rate
- Treasury yield
- CPI index
- active inventory
- days to pending
- price-cut share

Raw data should retain sufficient source metadata to understand what the value actually represents.

---

## 4. Derived Indicator

A Derived Indicator is calculated from one or more observations using a documented method.

Examples:

- year-over-year change
- moving trend
- financing pressure score
- inventory pressure score

Every derived indicator must have a documented calculation.

---

## 5. Interpretation

Interpretation explains what data may imply.

Interpretation must not silently become raw fact.

Example:

Data:
Mortgage rates increased.

Interpretation:
Higher financing costs may reduce purchasing power.

Do not represent the interpretation as guaranteed buyer behavior.

---

## 6. Required Provenance

Where appropriate, a market value should retain:

SOURCE

SOURCE SERIES / METRIC

OBSERVATION DATE

RETRIEVAL DATE

FREQUENCY

GEOGRAPHY

UNIT

SEASONAL ADJUSTMENT

REVISION STATUS where relevant

---

## 7. Source Priority

Preferred order:

1. authoritative government / primary public source
2. primary industry source
3. established research/data provider
4. secondary source
5. manual/unverified source

Use the most appropriate source, not automatically the highest-ranked category.

---

## 8. Freshness

Every indicator should define:

NATIVE FREQUENCY

EXPECTED REFRESH

STALE AFTER

Do not display old data as though it were current.

---

## 9. Revisions

Some economic/housing data may be revised.

Where revisions matter, AC should either:

- update the historical observation
- preserve vintage data
- document revision behavior

depending on the product's needs.

---

## 10. Geography

Never silently compare incompatible geographic scopes.

Examples:

United States

State

Metro

County

City

ZIP

Metric availability and methodology may differ by geography.

---

## 11. Missing Data

Missing values must remain missing.

Do not convert missing data into:

0

unless zero is genuinely the observed value.

---

## 12. Data Failure

If a source is unavailable:

do not fabricate a value.

Use:

- cached valid observation
- stale warning
- unavailable state
- fallback source if formally approved

---

## 13. AI Interpretation

AI may explain structured data.

AI must not invent observations.

The application should provide the model with sourced data and relevant definitions.

The model should distinguish:

fact
interpretation
uncertainty.

---

## 14. Public Transparency

Market products should make it possible for a reasonable user to understand:

- what is being measured
- where the data comes from
- when it was measured
- what AC calculated
- what AC interpreted

---

## 15. No False Precision

A score such as:

63.8472

does not become more meaningful because it has four decimal places.

Display precision should reflect actual informational precision.
