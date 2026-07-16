export const complianceConfig = {
  reviews: [] as Array<{ name: string; initials: string; service: string; review: string; source: string; sourceUrl?: string; date: string; verified: boolean }>,
  notices: {
    realEstate: "Real estate information is educational and is not legal, tax, lending, or brokerage advice. Verify decisions with the appropriate licensed professional.",
    inspection: "Educational information does not replace a property-specific inspection or specialist evaluation.",
    spatial: "Feng Shui and spatial consultation are interpretive frameworks, not guarantees of health, wealth, relationships, or investment performance.",
  },
};
