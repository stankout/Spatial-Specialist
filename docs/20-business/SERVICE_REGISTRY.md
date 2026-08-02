# AC Spatial Specialist — Service Registry

Status: DRAFT
Document Class: Canonical Business Service Registry
Intended Canonical Location: docs/20-business/SERVICE_REGISTRY.md

---

## 1. Purpose

This registry defines the service perspectives recognized by AC Spatial Specialist and their current activation status.

It is the primary index for determining:

- which services exist
- which services are active
- which services may appear publicly
- which services may accept inquiries or bookings
- which services remain future/inactive

Detailed service behavior belongs in the individual service specifications.

---

## 2. Service Status Vocabulary

### ACTIVE

The service has been approved for its intended current use.

An ACTIVE service may appear publicly subject to its own specification and applicable business/compliance requirements.

### INACTIVE

The service is defined internally but is deliberately unavailable publicly.

### FUTURE

The concept may be developed later but is not currently an active service architecture.

### RETIRED

The service was previously defined or active and has intentionally been removed from current operation.

---

## 3. Current Service Registry

| Service ID | Public Name | Category | Status | Public Listing | Inquiry / Booking |
|---|---|---|---|---|---|
| DEAL | Real Estate | Property Transaction | ACTIVE | YES | YES |
| SPACE | Spatial Consultation | Spatial Analysis / Consultation | ACTIVE | YES | YES |
| CONDITION | Property Condition / Home Inspection | Property Condition | INACTIVE | NO | NO |

---

## 4. DEAL

Service ID:

DEAL

Current Status:

ACTIVE

Primary Domain:

Real Estate

Primary Function:

Help users navigate property-related decisions and real-estate transactions within the applicable professional relationship and verified authority of the person or entity delivering the service.

Canonical Specification:

docs/20-business/services/DEAL.md

---

## 5. SPACE

Service ID:

SPACE

Current Status:

ACTIVE

Primary Domain:

Spatial Consultation

Primary Function:

Help clients observe and interpret relationships involving orientation, circulation, layout, location, organization, environment, and other spatial factors.

Feng Shui may be incorporated as an interpretive framework where requested.

Canonical Specification:

docs/20-business/services/SPACE.md

---

## 6. CONDITION

Service ID:

CONDITION

Current Status:

INACTIVE

Primary Domain:

Property Condition / Future Home Inspection

Current Rule:

CONDITION may remain represented in internal architecture for future development but must not be presented as an available public service.

Until formally activated, it must not appear as an available option through:

- primary public navigation
- Services listings
- booking
- service inquiry selection
- public calls to action
- sitemap/service discovery intended to present available services

Canonical Specification:

docs/20-business/services/CONDITION.md

---

## 7. Service Activation Principle

Technical capability does not activate a service.

A service becomes ACTIVE only through an explicit business decision.

Activation may require review of:

- business readiness
- professional qualifications
- applicable legal/compliance requirements
- insurance
- operating procedures
- pricing
- service delivery capability
- website presentation
- booking workflow
- owner approval

The presence of code, routes, forms, or internal Studio configuration must not be interpreted as service activation.

---

## 8. Service Deactivation Principle

An active service may be moved to INACTIVE when necessary.

Deactivation should include review of:

- public navigation
- service pages
- booking
- CTAs
- search/discovery
- content claims
- automated workflows
- active campaigns
- Studio configuration

Historical content may remain where appropriate but must not imply current availability.

---

## 9. Separation of Services

DEAL, SPACE, and CONDITION represent different perspectives.

They may support the same customer or property, but they must not be presented in a way that creates misleading dependence between services.

A customer should understand:

- which service they are receiving
- who is providing it
- what the service covers
- what it does not cover
- any relevant professional/business relationship

---

## 10. Future Services

Future services or products must not be added directly to this registry as ACTIVE merely because they are proposed.

Normal path:

IDEA
→ PROPOSAL
→ OWNER REVIEW
→ SERVICE SPECIFICATION
→ READINESS REVIEW
→ ACTIVATION DECISION
→ ACTIVE

Products and software tools that are not professional/customer services belong in the Product domain rather than this registry.
