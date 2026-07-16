# InterNACHI Integration

The Home Inspection architecture reserves UI roles for inspector credentials, certification badges, profile links, standards, sample reports, education, FAQs, and a trust bar. None renders as an InterNACHI claim while eligibility is disabled.

## Owner steps

- CPI badge: obtain an approved asset and usage instructions, then enable `cpiActive`.
- Member profile: add the verified directory URL and enable `internachiMemberActive`.
- Specialty certification: add only current, verified names to `certifications`.
- Bilingual credential: enable `bilingualLogoEligible` only when the specific mark is authorized.
- Sample report: publish a redacted, owner-approved PDF and link it from the sample report content.

Do not download trademark assets automatically. If membership or certification expires, disable its flag immediately and remove the corresponding asset.
