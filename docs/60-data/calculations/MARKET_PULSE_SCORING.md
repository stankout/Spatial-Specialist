# AC Spatial Specialist — Market Pulse Scoring

Status: DRAFT
Product ID: PRODUCT-MARKET-PULSE
Methodology Validation: NOT VALIDATED
Document Class: Product Calculation Specification
Intended Canonical Location: docs/60-data/calculations/MARKET_PULSE_SCORING.md

---

## 1. Purpose

This document defines the proposed structure for combining normalized indicators into AC Market Pulse dimensions.

Final weights remain DRAFT until validated against historical behavior.

---

# 2. Market Leverage

Proposed V1 components:

SUPPLY
COMPETITION
SELLER PRESSURE

---

## 3. Supply Dimension

Candidate inputs:

Inventory
New Listings

Proposed initial weights inside SUPPLY:

Inventory:
75%

New Listings:
25%

Reason:

Inventory measures available stock.

New Listings measures incoming flow.

Inventory should carry greater structural weight.

Formula concept:

SUPPLY =
0.75 × InventoryBuyerSignal
+
0.25 × NewListingsBuyerSignal

---

## 4. Competition Dimension

Candidate inputs:

Median DOM
Sale-to-List

Proposed initial weights:

Median DOM:
55%

Sale-to-List:
45%

Formula:

COMPETITION =
0.55 × DOMBuyerSignal
+
0.45 × SaleToListBuyerSignal

Higher score:
lower buyer competition / greater buyer leverage.

---

## 5. Seller Pressure Dimension

Primary input:

Price Cut Share

Initial V1:

SELLER_PRESSURE =
PriceCutBuyerSignal

Future inputs may include:

price-cut magnitude
delisting
cancellation
seller concessions

only after separate indicator specifications exist.

---

# 6. Overall Market Leverage

Proposed initial dimension weights:

SUPPLY:
40%

COMPETITION:
35%

SELLER PRESSURE:
25%

Formula:

MARKET_LEVERAGE =
0.40 × SUPPLY
+
0.35 × COMPETITION
+
0.25 × SELLER_PRESSURE

This weighting is PROPOSED, not approved truth.

It must be tested historically.

---

# 7. Market Leverage Labels

Proposed:

0–19
STRONG SELLER LEVERAGE

20–39
SELLER LEAN

40–60
BALANCED / MIXED

61–80
BUYER LEAN

81–100
STRONG BUYER LEVERAGE

Thresholds require review after historical distribution testing.

Do not assume the score will be uniformly distributed.

---

# 8. Financing Pressure

Proposed inputs:

Mortgage 30Y
Treasury 10Y

Initial proposed weights:

Mortgage:
80%

Treasury:
20%

Formula:

FINANCING_PRESSURE =
0.80 × MortgagePressure
+
0.20 × TreasuryPressure

Reason:

Mortgage rate directly reflects the consumer-facing housing financing environment.

Treasury is broader context.

---

# 9. Macro Pressure

Candidate inputs:

CPI YoY
Fed Policy
Treasury 10Y

Proposed initial weights:

CPI:
35%

Fed Policy:
40%

Treasury:
25%

Formula:

MACRO_PRESSURE =
0.35 × CPIPressure
+
0.40 × FedPolicyPressure
+
0.25 × TreasuryPressure

These weights require review and backtesting.

---

# 10. No Double Counting Into Market Leverage

Financing Pressure and Macro Pressure should NOT be folded directly into Market Leverage V1.

Reason:

High mortgage rates can:

reduce demand

while simultaneously:

making purchasing harder.

Combining those effects into the leverage score can conceal an important tradeoff.

---

# 11. Combined Climate State

Instead of one universal scalar, use:

MARKET LEVERAGE
+
FINANCING PRESSURE
+
MACRO PRESSURE.

Example:

Market Leverage:
74
BUYER LEAN

Financing Pressure:
82
HIGH

Macro Pressure:
65
ELEVATED

Headline:

BUYER LEVERAGE
WITH HIGH FINANCING PRESSURE

---

# 12. Missing Component Rules

A dimension may calculate when sufficient weighted coverage exists.

Proposed minimum:

70% of configured dimension weight available.

When calculation occurs with missing components:

show:

PARTIAL DATA

and calculate using remaining weights re-normalized to 100%.

Example:

Configured:

40 / 35 / 25

If one 25% component is missing:

remaining 75% may be proportionally reweighted only if methodology permits.

The missing component must remain visible.

---

# 13. Overall Leverage Coverage

Market Leverage should require:

at least two of the three major dimensions

AND

at least 70% total configured weight.

Otherwise:

MARKET LEVERAGE:
UNAVAILABLE / INCOMPLETE

---

# 14. Freshness

A dimension should inherit the oldest materially contributing observation status.

Example:

Inventory:
current

DOM:
current

Price Cuts:
stale

Seller Pressure:
STALE

Market Pulse should expose component freshness rather than claiming every signal shares one date.

---

# 15. Precision

Internal calculation may use higher precision.

Public display:

whole-number scores

or at most one decimal where genuinely useful.

Do not present pseudo-precision.

---

# 16. Historical Validation

Before production activation, evaluate:

score distribution

extreme periods

known seller markets

known buyer markets

rate shocks

pandemic-era distortions

low-inventory periods

high-inventory periods

methodology stability.

---

# 17. Weight Governance

Weights must live in versioned methodology/configuration.

Do not make public-production weights casual sliders.

Changes require:

analysis
review
methodology version update
owner approval

when materially affecting product interpretation.

---

# 18. V1 Rule

Until validation is complete:

all formulas and weights remain:

PROPOSED.

UI prototypes may use them for development.

They must not be described publicly as validated market science.
