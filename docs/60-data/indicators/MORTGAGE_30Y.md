# AC Data Indicator — 30-Year Mortgage Rate

Status: DRAFT
Indicator ID: IND-MORTGAGE-30Y
Document Class: Data Indicator Specification
Intended Canonical Location: docs/60-data/indicators/MORTGAGE_30Y.md

---

## 1. Definition

The U.S. weekly average 30-year fixed mortgage rate reported through Freddie Mac's Primary Mortgage Market Survey (PMMS).

This is a market benchmark.

It is not a personalized mortgage quote.

---

## 2. Why It Matters

Mortgage rates directly affect:

- borrowing cost
- monthly payment
- purchasing power
- affordability
- financing pressure

They may influence housing demand but do not determine buyer behavior by themselves.

---

## 3. Primary Source

Source ID:

SOURCE-FREDDIE-MAC

Provider:

Freddie Mac

Dataset:

Primary Mortgage Market Survey (PMMS)

Metric:

30-Year Fixed-Rate Mortgage

---

## 4. Unit

Percent annual mortgage rate.

Example display:

6.55%

Do not store the percent symbol in the numeric value.

---

## 5. Geography

United States

National benchmark.

Do not present PMMS as a Georgia-specific or borrower-specific mortgage quote.

---

## 6. Native Frequency

WEEKLY

---

## 7. Refresh Policy

Expected refresh:

Weekly after source publication.

Stale warning:

If a newer scheduled observation should reasonably exist but has not been retrieved.

Do not invent an update simply because other dashboard indicators updated today.

---

## 8. Raw Value

Latest published PMMS 30-year fixed mortgage average.

Store:

value
observation date
source
retrieval date

---

## 9. Derived Values

Potential:

WoW change in percentage points

YoY change in percentage points

4-week average

12-month percentile

historical percentile

Any derived value requires documented formula.

---

## 10. Direction

For FINANCING PRESSURE:

Higher mortgage rate
→ generally higher financing pressure.

Lower mortgage rate
→ generally lower financing pressure.

This does not directly mean:

higher rate = buyer market

because inventory, demand, prices and seller behavior also matter.

---

## 11. Market Pulse Relationship

Candidate Dimension:

FINANCING PRESSURE

Normalization:

TBD in Market Pulse methodology.

Weight:

TBD.

---

## 12. Display

Suggested:

30Y Mortgage

Current rate

Weekly change

Historical context

Observation date

Source

---

## 13. Plain-Language Explanation

Example pattern:

"The national 30-year mortgage benchmark increased/decreased from the previous weekly observation."

Do not describe it as the mortgage rate every borrower will receive.

---

## 14. Limitations

Borrower rates vary based on factors including:

- lender
- credit profile
- loan program
- points
- fees
- property
- timing
- other underwriting factors

PMMS represents broad market context.

---

## 15. Missing / Stale Behavior

If unavailable:

show:

DATA UNAVAILABLE

or:

STALE

Do not substitute a lender advertisement or another mortgage product automatically.

---

## 16. DO NOT

Do not call this:

"The interest rate."

Do not present it as:

- personalized quote
- guaranteed rate
- lender offer
- Georgia-specific average unless supported separately
