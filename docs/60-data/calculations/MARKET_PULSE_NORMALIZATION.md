# AC Spatial Specialist — Market Pulse Normalization

Status: DRAFT
Product ID: PRODUCT-MARKET-PULSE
Document Class: Data Methodology Specification
Intended Canonical Location: docs/60-data/calculations/MARKET_PULSE_NORMALIZATION.md

---

## 1. Purpose

Market Pulse combines indicators with incompatible units.

Examples:

Mortgage:
percent

Inventory:
count

DOM:
days

Price Cuts:
percent

Sale-to-List:
ratio

Raw values cannot be averaged directly.

Every contributing indicator must first be normalized.

---

## 2. Normalized Scale

Each contributing signal should resolve to:

0–100

after orientation.

For MARKET LEVERAGE:

0
strong seller-leaning signal

50
historically neutral/middle condition

100
strong buyer-leaning signal

For PRESSURE dimensions:

0
low pressure

50
middle historical condition

100
high pressure

---

## 3. Preferred V1 Method

Use HISTORICAL PERCENTILE normalization where adequate history exists.

Concept:

Current observation
↓
compare against historical reference distribution
↓
percentile
↓
orient toward dimension meaning

Advantages:

- unit-independent
- understandable
- less sensitive to extreme values than simple min/max
- does not assume economic relationships are normally distributed

---

## 4. Reference Window

Preferred initial reference window:

120 monthly observations
approximately 10 years

when available.

Minimum preferred history:

60 monthly observations.

If fewer than 60 but at least 36 observations exist:

the indicator may operate with:

LIMITED HISTORY

status.

Below 36:

do not use the indicator in canonical scoring without methodology approval.

---

## 5. Rolling vs Fixed History

V1 preferred approach:

ROLLING REFERENCE WINDOW.

Reason:

Economic regimes change.

A permanently fixed threshold such as:

Mortgage > 7% = High

may become misleading across different historical periods.

---

## 6. Percentile Formula Concept

For observation X:

Percentile(X)
=
relative position of X within the selected historical reference distribution.

Implementation must document exact percentile behavior including:

- ties
- missing values
- window boundaries
- minimum sample size

---

## 7. Direction / Orientation

Some raw indicators naturally move opposite the desired score direction.

Example:

Median DOM

higher DOM
→ generally more buyer leverage.

Therefore:

buyer signal
=
percentile(DOM)

Example:

Sale-to-List

higher ratio
→ generally more seller leverage.

Therefore:

buyer signal
=
100 - percentile(SaleToList)

Direction must be specified per indicator.

---

## 8. Candidate Market Leverage Orientation

### Inventory

Higher
→ Buyer Lean

Orientation:
DIRECT

### New Listings

Higher supply flow may support Buyer Lean.

Orientation:
DIRECT

but likely lower weight than Inventory.

### Median DOM

Higher
→ Buyer Lean

Orientation:
DIRECT

### Price Cut Share

Higher
→ Buyer Lean

Orientation:
DIRECT

### Sale-to-List

Higher
→ Seller Lean

Orientation:
INVERTED

---

## 9. Financing Pressure Orientation

### Mortgage 30Y

Higher
→ Higher Financing Pressure

DIRECT

### Treasury 10Y

Higher
→ Higher broad rate pressure

DIRECT

Treasury should be contextual/secondary because mortgage rate already captures consumer financing conditions.

---

## 10. Macro Pressure Orientation

### CPI YoY

Higher inflation positioning
→ Higher Macro Pressure

DIRECT

### Fed Policy

Higher policy-rate environment
→ Higher Macro Pressure

DIRECT

### Treasury 10Y

Higher long-term yield environment
→ Higher Macro Pressure

DIRECT

---

## 11. Level vs Change

Market Pulse should distinguish:

LEVEL

from:

MOMENTUM.

Example:

Mortgage Rate:
6.5%

may be historically high.

But:

weekly/monthly trend
may be falling.

These describe different facts.

V1 scoring should primarily use LEVEL positioning.

Momentum should initially be displayed as context rather than mixed heavily into the core score.

---

## 12. Seasonality

Use seasonally adjusted source data where appropriate and available.

For metrics without reliable seasonal adjustment:

historical comparison should consider seasonality.

Possible future method:

compare observation primarily with same-month historical values.

Do not invent AC seasonal adjustment casually.

---

## 13. Outliers

Percentile normalization naturally caps the displayed signal between:

0 and 100.

Raw extreme observations must still remain visible.

The normalized score must never replace the raw source value.

---

## 14. Missing Values

No interpolation by default.

Interpolation may only occur when explicitly justified by an indicator methodology.

Missing remains missing.

---

## 15. Stale Values

A stale observation may remain visible with:

STALE

status.

Whether it contributes to scoring depends on approved freshness rules.

Do not silently score very old data as current.

---

## 16. Normalization Metadata

Each normalized signal should retain:

indicator ID

raw value

observation date

reference-window start

reference-window end

sample size

percentile

orientation

normalized value

methodology version

---

## 17. Alternative Methods

Future methodology may evaluate:

robust z-score

MAD-based normalization

economic regime normalization

same-month seasonality percentile

machine-learning approaches

These are not V1 defaults.

Any replacement requires validation and methodology versioning.
