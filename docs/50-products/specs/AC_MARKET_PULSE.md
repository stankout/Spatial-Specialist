# AC Spatial Specialist — AC Market Pulse

Status: DRAFT
Product ID: PRODUCT-MARKET-PULSE
Product Status: PROPOSED
Document Class: Product Specification
Intended Canonical Location: docs/50-products/specs/AC_MARKET_PULSE.md

---

## 1. Purpose

AC Market Pulse is intended to summarize several dimensions of the U.S. housing-market decision environment into a visual climate instrument.

It should help answer:

"What kind of market environment are buyers and sellers operating in right now, and why?"

---

## 2. Philosophy

AC Market Pulse must not behave like a mystery sentiment score.

The model should expose:

RAW DATA
↓
NORMALIZATION
↓
DERIVED DIMENSIONS
↓
MARKET CLIMATE
↓
EXPLANATION

Users should be able to understand why the result exists.

---

## 3. Primary Audience

- buyers
- sellers
- property owners
- investors
- real-estate learners
- AC clients
- users consuming AC market content

---

## 4. Proposed Core Dimensions

### FINANCING PRESSURE

Possible inputs:

- mortgage rate
- Treasury yields
- policy-rate context

Question:

How restrictive is financing relative to useful historical context?

---

### SUPPLY CONDITIONS

Possible inputs:

- active inventory
- new listings
- months of supply where supported

Question:

How much choice is available to buyers?

---

### DEMAND / COMPETITION

Possible inputs:

- pending activity
- sale/list behavior
- days on market/pending
- above-list share where supported

Question:

How competitive is buyer demand?

---

### SELLER PRESSURE

Possible inputs:

- price-cut share
- price-cut magnitude
- delisting/cancellation context where supported

Question:

How much are sellers adjusting to market conditions?

---

### PRICE MOMENTUM

Possible inputs:

- price/value trend
- sale-price trend

Question:

What direction is price behavior moving?

---

### MACRO PRESSURE

Possible inputs:

- CPI/inflation context
- monetary-policy context
- Treasury/yield environment

Question:

What broad financial environment surrounds housing?

---

## 5. Market Climate

Potential final climate scale:

0
Strong Seller Environment

25
Seller Lean

50
Balanced / Mixed

75
Buyer Lean

100
Strong Buyer Environment

THIS SCALE IS PROPOSED.

It must not become canonical until:

- normalization
- direction
- weights
- history
- edge cases
- backtesting

are specified and reviewed.

---

## 6. No Arbitrary Score

Do not implement:

score = average(all numbers)

Indicators use incompatible units and meanings.

Every input must define:

- normalization
- direction
- historical reference
- weight
- missing-value behavior

---

## 7. Explanation Layer

The product should explain the climate through factors.

Example structure:

BUYER LEVERAGE INCREASED

because:

- inventory increased
- homes took longer to move
- price reductions increased

but:

FINANCING REMAINS RESTRICTIVE

because:

- mortgage rates remain elevated

This is more useful than displaying only:

Market Score: 67

---

## 8. Raw Indicators

Initial candidate indicators:

MORTGAGE_30Y

TREASURY_10Y

FED_POLICY_RATE / TARGET RANGE CONTEXT

CPI_YOY

ACTIVE_INVENTORY

NEW_LISTINGS

DAYS_TO_PENDING / DOM equivalent after methodology choice

PRICE_CUT_SHARE

SALE_TO_LIST_RATIO

Potential additional indicators require separate review.

---

## 9. Source Integrity

Every displayed observation should retain:

source
observation date
retrieval/update status
unit
geography

Derived values should identify that AC calculated them.

---

## 10. Geography

Version 1 should favor a clearly defined geography.

Potential initial scope:

U.S. national

Then extend toward:

Georgia
Metro Atlanta
selected local markets

only where compatible source data exists.

Do not mix national macro indicators and local housing indicators without clearly identifying scope.

---

## 11. Time Horizon

The product may provide:

CURRENT CLIMATE

TREND

HISTORICAL CONTEXT

These are different outputs.

Avoid describing a short-term data movement as a long-term trend without methodology.

---

## 12. Visualization

The visual system should feel like:

MARKET INSTRUMENT

not:

stock ticker wall.

Potential interface:

AC MARKET CLIMATE

overall climate indicator

six dimension gauges

raw indicators

trend

"Why?"

source/freshness information

---

## 13. Visual Direction

Use AC architectural cyber editorial language.

Possible:

- radial climate instrument
- segmented field
- directional balance scale
- technical data rail
- restrained motion

Avoid copying CoinMarketCap Fear & Greed visual design.

---

## 14. AI Explanation

AI may generate plain-language explanation from structured data.

AI receives:

- indicator values
- indicator definitions
- changes
- geography
- observation dates
- derived dimensions

AI must not create missing economic facts.

---

## 15. Data Failure

If important inputs are missing:

- degrade gracefully
- show unavailable dimension
- adjust score only according to documented missing-value rules
- expose incomplete-data state

Never silently replace missing observation with zero.

---

## 16. Freshness

Different indicators update at different frequencies.

The UI should understand that:

Treasury data may be daily.

Mortgage benchmarks may be weekly.

CPI may be monthly.

Housing metrics may be weekly or monthly depending on provider/metric.

Do not assign one fake universal "last updated" timestamp to the entire product.

---

## 17. Disclaimer / Boundary

Market Pulse provides market information and interpretation.

It is not:

- a guarantee
- appraisal
- lending quote
- investment guarantee
- financial advice
- prediction of a specific property's future value

---

## 18. Studio Controls

Future controls may include:

- enabled indicators
- display order
- source status
- explanation review
- geography availability
- release notes
- product activation

Weights and formulas should not become casual UI sliders in production unless governance explicitly supports such editing.

---

## 19. Version 1 Success

A user should be able to answer:

What is happening?

Which factors are driving it?

Is the market leaning toward buyers or sellers?

What data supports that conclusion?

How current is the data?

---

## 20. Activation Requirements

Before ACTIVE:

- indicator specs approved
- source definitions approved
- normalization defined
- scoring defined
- historical behavior tested
- stale/missing behavior tested
- mobile design approved
- source attribution implemented
- methodology published
- QA completed
- owner approval
