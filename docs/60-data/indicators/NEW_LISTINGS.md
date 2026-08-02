# AC Data Indicator — New Listings

Status: DRAFT
Indicator ID: IND-NEW-LISTINGS
Document Class: Data Indicator Specification
Intended Canonical Location: docs/60-data/indicators/NEW_LISTINGS.md

---

## 1. Definition

The number of homes newly listed for sale during the reporting period.

---

## 2. Primary Source

Source ID:

SOURCE-REDFIN-DATA-CENTER

Provider:

Redfin Data Center

Metric:

New Listings

---

## 3. Unit

Count of homes.

---

## 4. Geography

National initially.

Extend only where compatible source data exists.

---

## 5. Frequency

Canonical Market Pulse V1:

Monthly.

Weekly may be used for faster monitoring in a separate product layer.

Do not silently mix weekly rolling-window values with monthly observations.

---

## 6. Seasonal Adjustment

Use source-provided seasonally adjusted form where specified by the chosen dataset.

Record:

SA / NSA.

---

## 7. Derived Values

Potential:

MoM %

YoY %

rolling trend

new-listing momentum

---

## 8. Direction

Higher new-listing activity may indicate more supply entering the market.

But interpretation depends on:

- demand
- total inventory
- sales
- seasonality

Higher new listings do not automatically equal buyer market.

---

## 9. Market Pulse Relationship

Candidate Dimension:

SUPPLY CONDITIONS

May also contribute to:

SUPPLY MOMENTUM.

Weight:

TBD.

---

## 10. Display

New Listings

Current count

YoY change

trend

geography

---

## 11. DO NOT

Do not confuse:

new listings

with:

inventory.

One is FLOW.

The other is STOCK.
