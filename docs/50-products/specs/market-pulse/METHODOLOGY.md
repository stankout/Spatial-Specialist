# AC Spatial Specialist — Market Pulse Methodology

Status: DRAFT
Product ID: PRODUCT-MARKET-PULSE
Document Class: Product Methodology Specification
Intended Canonical Location: docs/50-products/specs/market-pulse/METHODOLOGY.md

---

## 1. Purpose

This document defines the analytical architecture of AC Market Pulse.

The product should summarize housing-market conditions without collapsing fundamentally different economic concepts into one misleading sentiment number.

---

## 2. Core Model

AC Market Pulse uses multiple analytical layers.

RAW OBSERVATIONS
↓
NORMALIZED SIGNALS
↓
DIMENSION SCORES
↓
MARKET LEVERAGE
+
FINANCING PRESSURE
+
MACRO PRESSURE
↓
MARKET CLIMATE
↓
EXPLANATION

---

## 3. Primary Outputs

### MARKET LEVERAGE

Range:

0–100

Interpretation:

0
Strong Seller Leverage

25
Seller Lean

50
Balanced / Mixed

75
Buyer Lean

100
Strong Buyer Leverage

This score should primarily reflect housing-market structure and negotiation conditions.

---

### FINANCING PRESSURE

Range:

0–100

Interpretation:

0
Very Low Financing Pressure

25
Low

50
Normal / Mixed

75
High

100
Very High Financing Pressure

This score describes financing conditions.

It does not indicate buyer or seller leverage directly.

---

### MACRO PRESSURE

Range:

0–100

Interpretation:

0
Low Macro Pressure

50
Mixed

100
High Macro Pressure

This layer provides broad monetary/inflation context.

It should not dominate the housing-market leverage score.

---

## 4. Market Leverage Inputs

Primary candidates:

IND-ACTIVE-INVENTORY

IND-NEW-LISTINGS

IND-MEDIAN-DOM

IND-PRICE-CUT-SHARE

IND-SALE-TO-LIST

These indicators describe:

supply
market speed
seller adjustment
buyer competition
pricing power.

---

## 5. Financing Pressure Inputs

Primary:

IND-MORTGAGE-30Y

Secondary/contextual:

IND-TREASURY-10Y

Treasury should not be weighted as if it were another mortgage rate.

Mortgage rate represents the consumer-facing financing benchmark.

Treasury provides broader rate context.

---

## 6. Macro Pressure Inputs

Primary candidates:

IND-CPI-YOY

IND-FED-POLICY

IND-TREASURY-10Y

Macro Pressure describes the environment around housing.

It is not a prediction of future Federal Reserve policy or mortgage-rate direction.

---

## 7. Why One Score Is Not Enough

A housing environment may simultaneously show:

high buyer negotiating leverage

AND

high financing pressure.

Example conceptual state:

Inventory:
High

DOM:
Rising

Price Cuts:
High

Sale-to-List:
Weak

Mortgage Rates:
High

Result:

MARKET LEVERAGE:
Buyer Lean

FINANCING PRESSURE:
High

This is more truthful than forcing both effects into one number.

---

## 8. Climate Labels

The interface may combine dimensions into descriptive climate labels.

Examples:

SELLER CONTROL

SELLER LEAN

BALANCED

BUYER LEAN

BUYER CONTROL

with financing modifiers such as:

FAVORABLE FINANCING

NORMAL FINANCING

HIGH FINANCING PRESSURE

Example:

BUYER LEAN
HIGH FINANCING PRESSURE

---

## 9. Common Analysis Cadence

Market Pulse V1 should use a MONTHLY analytical cadence.

Faster data may update more frequently in the data layer.

However, the canonical climate score should be calculated using a consistent monthly snapshot model.

This avoids comparing incompatible:

daily
weekly
monthly

changes directly.

---

## 10. Snapshot Model

Each Market Pulse release should have:

PULSE AS-OF DATE

DATA CUTOFF

CALCULATION VERSION

SOURCE VERSION / OBSERVATION METADATA

Only observations available as of the data cutoff may be used.

Future observations must never leak into historical scores.

---

## 11. Historical Recalculation

Two historical modes may eventually exist.

### CURRENT-METHODOLOGY HISTORY

Historical scores recalculated using the latest available revised dataset.

Useful for analysis.

### VINTAGE HISTORY

Historical scores preserving information known at the original time.

Useful for backtesting and historical authenticity.

V1 may begin with current-methodology history.

The UI must not imply vintage accuracy unless vintage storage actually exists.

---

## 12. Geography

V1 target:

U.S. national market climate.

Future versions may support:

Georgia

Metro Atlanta

selected local markets.

Each geography should use compatible housing indicators.

National macro indicators may provide context for local markets but must remain labeled as national.

---

## 13. Missing Data

A missing indicator does not equal zero.

Dimension calculation may continue only if minimum coverage requirements are satisfied.

Otherwise:

DIMENSION STATUS:
INCOMPLETE

The overall climate explanation must expose the missing-data state.

---

## 14. Confidence

Market Pulse may eventually expose a Data Confidence state.

Potential inputs:

data completeness
freshness
history length
source health

Example:

HIGH
NORMAL
LIMITED

Confidence measures data quality/coverage.

It does not represent confidence that the market will move in a predicted direction.

---

## 15. Interpretation Rule

Market Pulse describes:

CURRENT CONDITIONS

and

RECENT DIRECTION.

It does not claim to predict future property prices.

---

## 16. Versioning

Every scoring methodology must have a version.

Example:

MP-1.0

Changing:

weights
normalization
indicator definitions
dimension construction

requires a methodology version review.

Historical comparisons should identify methodology compatibility.

---

## 17. Product Principle

The product must make it possible to answer:

What is the score?

What caused it?

What data was used?

When was the data observed?

How was the score calculated?

What is uncertain or missing?
