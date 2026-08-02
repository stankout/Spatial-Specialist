# AC Spatial Specialist — Market Pulse Explanation System

Status: DRAFT
Product ID: PRODUCT-MARKET-PULSE
Document Class: Product Explanation Specification
Intended Canonical Location: docs/50-products/specs/market-pulse/EXPLANATION.md

---

## 1. Purpose

A Market Pulse score without explanation is insufficient.

The Explanation System should tell the user:

WHAT IS HAPPENING

WHY THE SCORE EXISTS

WHAT CHANGED

WHAT MAY MATTER

WHAT THE DATA DOES NOT PROVE.

---

# 2. Explanation Layers

## Layer 1 — Headline

Example:

BUYER LEVERAGE IS INCREASING

HIGH FINANCING PRESSURE REMAINS

---

## Layer 2 — Drivers

Identify strongest contributors.

Example:

Primary buyer-leaning factors:

Inventory above recent historical range.

Homes taking longer to go under contract.

Price reductions elevated.

---

## Layer 3 — Counterforces

Explain signals pointing in the opposite direction.

Example:

Sale-to-list remains relatively strong.

Inventory improvement is not uniform across all markets.

---

## Layer 4 — Financing

Explain borrowing environment separately.

Example:

Mortgage financing remains expensive relative to the selected historical reference window.

---

## Layer 5 — Macro Context

Example:

Inflation and monetary-policy conditions remain restrictive/mixed/easing relative to recent history.

Avoid predicting policy decisions.

---

# 3. Explanation Inputs

The explanation engine receives structured values such as:

indicator ID

raw value

normalized value

direction

change

observation date

geography

dimension contribution

source

freshness

limitations

---

# 4. Driver Ranking

Drivers should be ranked by contribution to the dimension.

Concept:

CONTRIBUTION =
indicator weight
×
distance from neutral.

A signal near 50 should generally not be described as the major reason for an extreme score.

---

# 5. Neutral Reference

Normalized:

50

represents a middle historical condition under the selected methodology.

Driver strength may consider:

abs(normalized - 50).

This measures contribution intensity, not economic importance outside the model.

---

# 6. Explanation Vocabulary

Prefer:

suggests

indicates

is consistent with

may increase

may reduce

relative to recent history

Avoid:

guarantees

proves

will cause

must rise

must fall

unless logically and factually justified.

---

# 7. Raw Data Visibility

Explanation should allow users to inspect:

raw value

change

source

observation date.

Never hide data behind prose.

---

# 8. AI Explanation

AI may produce natural-language summaries.

AI should NOT calculate canonical scores independently.

Pipeline:

DATA ENGINE
→ CALCULATION ENGINE
→ STRUCTURED EXPLANATION FACTS
→ AI LANGUAGE LAYER

The calculation engine remains authoritative.

AI receives the result.

AI does not invent the result.

---

# 9. AI Input Contract

Example conceptual payload:

Market Leverage:
74

Label:
Buyer Lean

Drivers:
Inventory 82
DOM 77
Price Cuts 75

Counterforces:
Sale-to-List 41

Financing Pressure:
84

Macro Pressure:
65

Geography:
United States

As Of:
YYYY-MM-DD

Then AI may explain these facts.

---

# 10. AI Output Guardrails

AI must not invent:

- missing observations
- future Fed decisions
- future mortgage rates
- price forecasts
- local conditions not provided
- property-specific conclusions

---

# 11. Rule-Based Fallback

Market Pulse must remain understandable without AI.

If AI is unavailable:

generate deterministic rule-based explanation.

Example:

"Market leverage is buyer-leaning. Inventory, days on market and price reductions are above their historical midpoints. Financing pressure remains high because mortgage rates are elevated relative to the selected reference period."

---

# 12. Explanation Tone

Use AC Voice:

clear
direct
calm
specific
bounded.

Avoid alarmism.

Avoid:

MARKET CRASH

HOUSING COLLAPSE

BUY NOW

SELL NOW

unless a quoted/source-supported context explicitly requires that wording.

---

# 13. Local Market Explanation

Future local versions must distinguish:

LOCAL HOUSING DATA

from:

NATIONAL MACRO CONTEXT.

Example:

Atlanta housing conditions may lean buyer.

National mortgage financing pressure may remain high.

Do not describe both as though they share the same geography.

---

# 14. Source Drawer

Future UI should provide a compact source/methodology area showing:

indicator

value

source

observation date

freshness

methodology link.

Transparency should be part of the product, not buried in a legal footer.

---

# 15. User Question

The final explanation should help answer:

"So what?"

without telling the user what personal financial or property decision they must make.

Potential phrasing:

"This environment may provide buyers with more negotiating room, but borrowing costs remain a significant constraint."

---

# 16. Disclaimer

Interpretation is informational.

Market Pulse is not:

a guarantee

financial advice

appraisal

mortgage quote

property valuation

forecast of an individual property's future value.
