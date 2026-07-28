export const siteConfig = {
  name: "Anh Cao | Spatial Specialist LLC",
  shortName: "Anh Cao",
  businessName: "Spatial Specialist LLC",
  principalName: "Anh Bao Cao",
  realEstateAffiliation: "KD & Associates",
  locationLabel: "Georgia, US.",
  tagline: "Property intelligence from more than one perspective.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://example.com",
  email: "acspatialspecialist@gmail.com" as string | null,
  phone: "+16786029000" as string | null,
  phoneDisplay: "678-602-9000",
  defaultLocale: "en" as const,
  locales: ["en", "vi"] as const,
  serviceAreas: ["Metro Atlanta", "South Atlanta", "Morrow", "Fayetteville", "Peachtree City", "Tyrone", "Newnan"],
};
export type Locale = (typeof siteConfig.locales)[number];

export type ServiceStatus = "active" | "hidden" | "coming-soon" | "disabled";
export type ServiceKey = "deal" | "condition" | "space";

export type ServiceConfig = {
  key: ServiceKey;
  number: string;
  lens: "DEAL" | "CONDITION" | "SPACE";
  slug: "real-estate" | "home-inspection" | "spatial-consultation";
  status: ServiceStatus;
  title: string;
  titleVi: string;
  leadTypes: readonly string[];
};

export type ServiceRegistry = Record<ServiceKey, ServiceConfig>;

/**
 * Canonical service availability for public rendering and Studio preparation.
 * Studio reads every entry; public surfaces include only `active` services.
 */
export const serviceRegistry: ServiceRegistry = {
  deal: {
    key: "deal",
    number: "01",
    lens: "DEAL",
    slug: "real-estate",
    status: "active",
    title: "Real Estate",
    titleVi: "Bất động sản",
    leadTypes: ["buyer", "seller", "investor"],
  },
  condition: {
    key: "condition",
    number: "02",
    lens: "CONDITION",
    slug: "home-inspection",
    status: "hidden",
    title: "Home Inspection",
    titleVi: "Kiểm tra nhà",
    leadTypes: ["inspection", "inspection-report-review"],
  },
  space: {
    key: "space",
    number: "03",
    lens: "SPACE",
    slug: "spatial-consultation",
    status: "active",
    title: "Spatial Consultation",
    titleVi: "Tư vấn không gian",
    leadTypes: ["spatial-residential", "spatial-property-selection", "spatial-business", "spatial-audit"],
  },
};

export function isPublicService(service: ServiceConfig) {
  return service.status === "active";
}

export function getPublicServices(registry: ServiceRegistry = serviceRegistry) {
  return Object.values(registry).filter(isPublicService);
}

export function getServiceBySlug(slug: string, registry: ServiceRegistry = serviceRegistry) {
  return Object.values(registry).find((service) => service.slug === slug);
}

export function isPublicServiceCategory(category: string, registry: ServiceRegistry = serviceRegistry) {
  if (category === "general") return true;
  const service = registry[category as ServiceKey];
  return Boolean(service && isPublicService(service));
}

export function isPublicLeadType(leadType: string, registry: ServiceRegistry = serviceRegistry) {
  if (leadType === "general") return true;
  const normalized = leadType === "spatial" ? "space" : leadType;
  const service = Object.values(registry).find((item) => item.leadTypes.includes(leadType) || item.slug === normalized || item.key === normalized);
  return Boolean(service && isPublicService(service));
}

export function isPublicServicePath(path: string, registry: ServiceRegistry = serviceRegistry) {
  const [pathname, search = ""] = path.split("?", 2);
  const requestedLeadType = new URLSearchParams(search.split("#", 1)[0]).get("service");
  if (requestedLeadType && !isPublicLeadType(requestedLeadType, registry)) return false;
  const segments = pathname.split("/").filter(Boolean);
  const root = segments[0] === "en" || segments[0] === "vi" ? segments[1] : segments[0];
  const service = root ? getServiceBySlug(root, registry) : undefined;
  return !service || isPublicService(service);
}
