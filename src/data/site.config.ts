export const siteConfig = {
  name: "Anh Cao | Spatial Specialist LLC",
  shortName: "Anh Cao",
  businessName: "Spatial Specialist LLC",
  principalName: "Anh Bao Cao",
  realEstateAffiliation: "KD & Associates",
  locationLabel: "Georgia, US.",
  tagline: "One property. Three perspectives.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://example.com",
  email: "acspatialspecialist@gmail.com" as string | null,
  phone: "+16786029000" as string | null,
  phoneDisplay: "678-602-9000",
  defaultLocale: "en" as const,
  locales: ["en", "vi"] as const,
  serviceAreas: ["Metro Atlanta", "South Atlanta", "Morrow", "Fayetteville", "Peachtree City", "Tyrone", "Newnan"],
};
export type Locale = (typeof siteConfig.locales)[number];
