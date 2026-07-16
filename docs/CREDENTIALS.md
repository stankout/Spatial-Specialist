# Credentials and regulated claims

All credential controls live in `src/data/credentials.config.ts` and default to disabled.

To publish a credential:

1. Verify it with the issuing authority and owner.
2. Add the exact approved value or URL.
3. Enable the corresponding boolean only after verification.
4. Confirm the credential renders in both locales and remains contextually accurate.

`REALTOR®`, CPI®, InterNACHI assets, insurance claims, brokerage, license numbers, transaction metrics, and testimonials must never be inferred. A disabled flag must produce no public placeholder or claim.
