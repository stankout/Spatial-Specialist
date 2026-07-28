export const featureFlags = {
  commerceEnabled: process.env.NEXT_PUBLIC_COMMERCE_ENABLED === "true",
  paymentsEnabled: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true",
  digitalProductsEnabled: process.env.NEXT_PUBLIC_DIGITAL_PRODUCTS_ENABLED === "true",
  physicalProductsEnabled: process.env.NEXT_PUBLIC_PHYSICAL_PRODUCTS_ENABLED === "true",
  affiliateProductsEnabled: process.env.NEXT_PUBLIC_AFFILIATE_PRODUCTS_ENABLED === "true",
  printOnDemandEnabled: process.env.NEXT_PUBLIC_PRINT_ON_DEMAND_ENABLED === "true",
  paidQuestionsEnabled: process.env.NEXT_PUBLIC_PAID_QUESTIONS_ENABLED === "true",
  consultationBookingEnabled: process.env.NEXT_PUBLIC_CONSULTATION_BOOKING_ENABLED !== "false",
  customerAccountsEnabled: process.env.NEXT_PUBLIC_CUSTOMER_ACCOUNTS_ENABLED === "true",
  siteSearchEnabled: process.env.NEXT_PUBLIC_SITE_SEARCH_ENABLED !== "false",
  portfolioEnabled: process.env.NEXT_PUBLIC_PORTFOLIO_ENABLED === "true",
  blogEnabled: process.env.NEXT_PUBLIC_BLOG_ENABLED !== "false",
} as const;

export type FeatureFlag = keyof typeof featureFlags;
export type ProviderState = "disabled" | "mock" | "configured";

export const platformConfig = {
  currency: "USD" as const,
  affiliateDisclosure: {
    en: "Some links may be affiliate links. AC may earn a commission at no additional cost to you.",
    vi: "Một số liên kết có thể là liên kết tiếp thị. AC có thể nhận hoa hồng mà không làm tăng chi phí của bạn.",
  },
  providers: {
    database: process.env.DATABASE_URL ? "configured" : "disabled",
    storage: process.env.MEDIA_STORAGE_PROVIDER === "local" ? "mock" : process.env.MEDIA_STORAGE_PROVIDER ? "configured" : "disabled",
    payments: process.env.PAYMENT_PROVIDER === "mock" ? "mock" : process.env.PAYMENT_PROVIDER ? "configured" : "disabled",
    scheduling: process.env.SCHEDULING_PROVIDER === "manual" ? "mock" : process.env.SCHEDULING_PROVIDER ? "configured" : "disabled",
    email: process.env.RESEND_API_KEY ? "configured" : "disabled",
    analytics: process.env.NEXT_PUBLIC_GA_ID ? "configured" : "mock",
    // A provider name alone does not make authentication production-ready.
    authentication: "disabled",
    printOnDemand: process.env.POD_PROVIDER === "mock" ? "mock" : process.env.POD_PROVIDER ? "configured" : "disabled",
    digitalDelivery: process.env.DIGITAL_DELIVERY_PROVIDER ? "configured" : "disabled",
    socialPublishing: process.env.SOCIAL_PUBLISHING_PROVIDER ? "configured" : "disabled",
    backups: process.env.BACKUP_PROVIDER ? "configured" : "disabled",
    audit: process.env.AUDIT_PROVIDER && process.env.AUDIT_PROVIDER !== "local" ? "configured" : "mock",
  } satisfies Record<string, ProviderState>,
} as const;

export function isFeatureEnabled(feature: FeatureFlag) {
  return featureFlags[feature];
}
