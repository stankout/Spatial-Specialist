export const businessConfig = {
  legalName: "Spatial Specialist LLC",
  businessName: "Spatial Specialist LLC",
  ownerName: "Anh Cao",
  email: null as string | null,
  phone: null as string | null,
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,
  serviceAreas: ["Metro Atlanta", "South Atlanta"],
  preferredContactMethods: ["form"] as const,
  logo: null as string | null,
  positioning: "Property insight across transaction, condition, and space.",
};
