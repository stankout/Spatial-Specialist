# AC Data Indicator — Sale-to-List Price Ratio

Status: DRAFT
Indicator ID: IND-SALE-TO-LIST
Document Class: Data Indicator Specification
Intended Canonical Location: docs/60-data/indicators/SALE_TO_LIST.md

---

## 1. Definition

The average ratio between final sale price and final list price for homes sold during the reporting period.

---

## 2. Primary Source

Source ID:

SOURCE-REDFIN-DATA-CENTER

Provider:

Redfin Data Center

Metric:

Average Sale-to-List Ratio

---

## 3. Unit

Ratio.

Possible display:

99.2%

Store canonical numeric representation consistently.

Example:

0.992

or:

99.2

Choose one internal contract and document it before implementation.

---

## 4. Interpretation

Below 100%:

average sales are below final list price.

Around 100%:

average sales are near final list price.

Above 100%:

average sales exceed final list price.

---

## 5. Geography

National initially.

Future:

supported local/metro geographies.

---

## 6. Frequency

Canonical V1:

Monthly.

---

## 7. Seasonal Adjustment

Use the source's published adjustment state.

Do not apply AC seasonal adjustment without separate methodology.

---

## 8. Derived Values

Potential:

YoY percentage-point difference

MoM percentage-point difference

distance from 100%

historical percentile

---

## 9. Direction

Higher ratio:

generally suggests stronger buyer competition / seller pricing power.

Lower ratio:

generally suggests more buyer negotiation room / seller pressure.

Context remains important.

---

## 10. Market Pulse Relationship

Primary Dimension:

DEMAND / COMPETITION

Potential secondary:

SELLER PRESSURE.

Climate direction:

higher ratio
→ more seller-leaning.

lower ratio
→ more buyer-leaning.

---

## 11. Display

Sale-to-List

99.2%

Change

geography

observation period

---

## 12. Final vs Original List Price

Canonical V1 uses:

FINAL LIST PRICE.

Do not silently substitute:

ORIGINAL LIST PRICE.

If AC later uses Sale-to-Original-List, create a separate indicator ID.

---

## 13. Limitations

This indicator describes closed sales.

It does not directly measure:

- unsold inventory
- failed transactions
- listing price quality
- individual negotiation performance

---

## 14. DO NOT

Do not claim:

99% ratio means every home sold 1% below list.

It is an aggregate market metric.
