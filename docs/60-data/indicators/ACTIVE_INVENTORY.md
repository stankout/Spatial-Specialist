# AC Data Indicator — Active Housing Inventory

Status: DRAFT
Indicator ID: IND-ACTIVE-INVENTORY
Document Class: Data Indicator Specification
Intended Canonical Location: docs/60-data/indicators/ACTIVE_INVENTORY.md

---

## 1. Definition

The number of homes available for sale at the end of the reporting period.

For Market Pulse V1, this indicator uses Redfin's Inventory definition rather than Active Listings.

---

## 2. Critical Distinction

INVENTORY:

Homes available for sale on the final day of the period.

ACTIVE LISTINGS:

Homes that were active at any point during the period.

These metrics must not be treated as interchangeable.

---

## 3. Primary Source

Source ID:

SOURCE-REDFIN-DATA-CENTER

Provider:

Redfin Data Center

Metric:

Inventory

---

## 4. Unit

Count of homes.

---

## 5. Geography

Potential:

National

Metro

Other supported source geographies

V1 Market Pulse:

National first.

---

## 6. Frequency

Use the selected Redfin monthly series for canonical V1 scoring unless later methodology explicitly approves another cadence.

---

## 7. Seasonal Adjustment

Use seasonally adjusted form where the selected Redfin dataset provides it and the Market Pulse methodology specifies it.

Store adjustment status explicitly.

---

## 8. Derived Values

Potential:

MoM %

YoY %

12-month percentile

inventory trend

Do not compare raw national inventory counts with local metro counts.

---

## 9. Direction

Higher inventory, all else equal:

generally increases buyer choice
and may increase buyer leverage.

Lower inventory, all else equal:

generally increases seller scarcity advantage.

However:

inventory must be interpreted with demand.

---

## 10. Market Pulse Relationship

Primary Dimension:

SUPPLY CONDITIONS

Likely direction:

higher normalized inventory
→ more buyer-leaning supply condition.

Formula:

TBD.

---

## 11. Display

Inventory

Current count

YoY change

trend

geography

observation date

---

## 12. Limitations

Inventory level is sensitive to:

- geography
- seasonality
- listing behavior
- market size
- property composition

Raw count alone should not determine the climate score.

---

## 13. DO NOT

Do not interchange:

Inventory

Active Listings

New Listings

Months of Supply.
