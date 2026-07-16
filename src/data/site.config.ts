export const siteConfig = {
  name: "Anh Cao | Spatial Specialist LLC",
  shortName: "Anh Cao",
  businessName: "Spatial Specialist LLC",
  tagline: "One property. Three perspectives.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://example.com",
  email: null as string | null,
  phone: null as string | null,
  defaultLocale: "en" as const,
  locales: ["en", "vi"] as const,
  serviceAreas: ["Metro Atlanta", "South Atlanta", "Morrow", "Fayetteville", "Peachtree City", "Tyrone", "Newnan"],
};
export type Locale = (typeof siteConfig.locales)[number];
