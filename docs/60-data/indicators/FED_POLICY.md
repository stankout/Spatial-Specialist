# AC Data Indicator — Federal Funds Target Range

Status: DRAFT
Indicator ID: IND-FED-POLICY
Document Class: Data Indicator Specification
Intended Canonical Location: docs/60-data/indicators/FED_POLICY.md

---

## 1. Definition

The target range for the federal funds rate established by the Federal Open Market Committee.

This indicator is a RANGE.

Do not reduce it to a single number without identifying the calculation.

---

## 2. Raw Values

Store:

TARGET LOWER BOUND

TARGET UPPER BOUND

EFFECTIVE DATE

SOURCE DECISION DATE

Optional derived value:

TARGET MIDPOINT

Midpoint must be identified as calculated.

---

## 3. Primary Source

Source ID:

SOURCE-FEDERAL-RESERVE

Provider:

Board of Governors / FOMC

Metric:

Federal Funds Target Range

---

## 4. Unit

Percent.

---

## 5. Geography

United States monetary policy.

---

## 6. Frequency

EVENT-DRIVEN

The value changes when the FOMC changes the target range.

The FOMC meets on a scheduled basis, but a meeting does not guarantee a rate change.

---

## 7. Derived Values

Potential:

range midpoint

change from previous decision

time since last policy change

policy direction

Do not calculate a daily "change" when the range remains unchanged.

---

## 8. Direction

Higher policy target:

generally tighter short-term monetary-policy environment.

Lower policy target:

generally easier short-term monetary-policy environment.

Housing implications remain indirect and context-dependent.

---

## 9. Market Pulse Relationship

Candidate Dimension:

MACRO PRESSURE

Potential secondary relevance:

FINANCING PRESSURE

Avoid double-counting macro rate conditions alongside Treasury and mortgage metrics.

---

## 10. Display

Fed Target Range

Lower – Upper

Last decision

Previous range

---

## 11. FOMC Event State

Future product may also display:

NEXT SCHEDULED FOMC MEETING

LAST POLICY DECISION

This is event information and must remain separate from the rate observation itself.

---

## 12. AI Rule

AI must not announce:

Fed hike
Fed cut
Fed hold

until supported by the official decision source.

Market expectations are not policy decisions.

---

## 13. DO NOT

Do not confuse:

target range

with:

effective federal funds rate.

Do not label market expectations as official policy.
