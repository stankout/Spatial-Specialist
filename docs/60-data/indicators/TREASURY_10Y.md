# AC Data Indicator — 10-Year Treasury Yield

Status: DRAFT
Indicator ID: IND-TREASURY-10Y
Document Class: Data Indicator Specification
Intended Canonical Location: docs/60-data/indicators/TREASURY_10Y.md

---

## 1. Definition

The nominal 10-year U.S. Treasury par yield derived from the U.S. Treasury Daily Par Yield Curve.

This metric is commonly referred to as the 10-Year Constant Maturity Treasury rate.

---

## 2. Why It Matters

The 10-year Treasury yield is an important long-term interest-rate benchmark.

Housing users may monitor it because mortgage rates often respond to broader long-term rate conditions.

The relationship is not one-to-one.

---

## 3. Primary Source

Source ID:

SOURCE-TREASURY

Provider:

U.S. Department of the Treasury

Dataset:

Daily Treasury Par Yield Curve Rates

Maturity:

10 Year

---

## 4. Unit

Percent yield.

---

## 5. Geography

United States financial market benchmark.

---

## 6. Native Frequency

DAILY on applicable Treasury publication/trading days.

---

## 7. Raw Value

10-year nominal par yield.

Do not confuse with:

- 10-year real Treasury yield
- 10-year TIPS yield
- Treasury security coupon
- a specific bond's transaction yield

---

## 8. Derived Values

Potential:

1-day change

5-trading-day change

30-day change

moving average

spread vs selected maturity

spread vs mortgage benchmark

---

## 9. Direction

For financing/macro conditions:

Higher yield
→ generally tighter/higher long-term rate environment.

Lower yield
→ generally easier/lower long-term rate environment.

Housing effect remains context-dependent.

---

## 10. Market Pulse Relationship

Candidate Dimensions:

FINANCING PRESSURE

MACRO PRESSURE

Exact usage:

TBD.

Avoid counting the same underlying rate environment twice without adjustment.

---

## 11. Display

10Y Treasury

Yield

Daily change

30-day context

Observation date

Source

---

## 12. Limitations

The Treasury rate is an interpolated par-yield-curve value.

It is not necessarily the yield of one specific outstanding security with exactly ten years remaining.

---

## 13. Missing / Stale Behavior

Weekends and holidays should not be interpreted as missing source data merely because no new trading-day observation exists.

---

## 14. DO NOT

Do not call nominal 10Y Treasury:

"real yield."

Do not treat it as:

- mortgage rate
- Fed Funds Rate
- prediction of mortgage-rate movement
