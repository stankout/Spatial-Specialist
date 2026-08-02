# AC Data Indicator — Median Days on Market

Status: DRAFT
Indicator ID: IND-MEDIAN-DOM
Document Class: Data Indicator Specification
Intended Canonical Location: docs/60-data/indicators/MEDIAN_DOM.md

---

## 1. Definition

The median number of days a home was listed before going under contract, for homes that went under contract during the reporting period.

---

## 2. Primary Source

Source ID:

SOURCE-REDFIN-DATA-CENTER

Provider:

Redfin Data Center

Metric:

Median Days on Market

---

## 3. Unit

Days.

---

## 4. Geography

National initially.

Future:

supported metro/local geographies.

---

## 5. Frequency

Use the methodology/cadence approved for Market Pulse V1.

Preferred initial climate layer:

monthly.

---

## 6. Seasonal Adjustment

Redfin may publish this metric without seasonal adjustment.

Store adjustment status explicitly.

Normalization methodology must account for seasonal behavior where necessary.

---

## 7. Derived Values

Potential:

YoY difference in days

MoM change

historical percentile

trend

---

## 8. Direction

Higher DOM:

homes generally take longer to secure a contract.

All else equal, this may indicate:

less intense buyer competition
and potentially more buyer leverage.

Lower DOM:

may indicate stronger competition / seller leverage.

---

## 9. Market Pulse Relationship

Primary Dimension:

DEMAND / COMPETITION

Potential secondary:

SELLER PRESSURE.

---

## 10. Display

Median DOM

Current days

YoY difference

geography

observation period

---

## 11. Limitations

DOM reflects homes that went under contract.

It is not:

- age of all inventory
- days to close
- days since listing for every active property

Provider definitions differ.

---

## 12. Alternate Metric

Zillow Days to Pending may be used in other AC products when specifically required.

Do not combine the two series into one continuous history without methodology review.

---

## 13. DO NOT

Do not label every provider's marketing-time metric simply:

"DOM"

without identifying the source definition.
