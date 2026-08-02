# AC Data Indicator — Share of Listings With Price Drops

Status: DRAFT
Indicator ID: IND-PRICE-CUT-SHARE
Document Class: Data Indicator Specification
Intended Canonical Location: docs/60-data/indicators/PRICE_CUT_SHARE.md

---

## 1. Definition

The share of active listings that experienced a qualifying listing-price reduction during the reporting period according to the selected Redfin methodology.

---

## 2. Primary Source

Source ID:

SOURCE-REDFIN-DATA-CENTER

Provider:

Redfin Data Center

Metric:

Price Drops as Share of Active Listings

---

## 3. Unit

Percent / share.

---

## 4. Price Drop Qualification

Use the source's qualifying definition.

Current Redfin methodology identifies qualifying list-price reductions using defined minimum and maximum change thresholds.

Do not recreate a different threshold and still label it Redfin Price Drops.

---

## 5. Geography

National initially.

Future:

supported regional/metro datasets.

---

## 6. Frequency

Canonical V1:

Monthly where available under the approved source dataset.

---

## 7. Derived Values

Potential:

MoM percentage-point change

YoY percentage-point change

historical percentile

trend

---

## 8. Direction

Higher price-cut share:

generally indicates more sellers adjusting asking prices.

All else equal, this may suggest:

higher seller pressure
and greater buyer negotiating leverage.

Lower share may suggest the opposite.

---

## 9. Market Pulse Relationship

Primary Dimension:

SELLER PRESSURE

Direction toward buyer climate:

higher price-cut share
→ more buyer-leaning signal.

Normalization:

TBD.

---

## 10. Display

Listings With Price Drops

Current %

YoY percentage-point change

trend

geography

---

## 11. Important Distinction

Price drop means a change in LIST PRICE.

It does not mean:

sale price was below list price.

Those are separate concepts.

---

## 12. Limitations

Price-cut behavior can vary by:

- season
- market
- initial pricing strategy
- property type
- seller behavior

Do not interpret every price reduction as financial distress.

---

## 13. DO NOT

Do not call:

price cut share

"foreclosure rate"
or
"seller loss rate."
