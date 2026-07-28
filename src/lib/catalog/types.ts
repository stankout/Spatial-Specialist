import { z } from "zod";
import { localeSchema } from "@/lib/platform/publishing";
import { safeSlugPattern } from "@/lib/platform/slug";

export const catalogItemTypeSchema = z.enum(["physical", "digital", "service", "affiliate"]);
export const catalogStatusSchema = z.enum(["draft", "active", "unavailable", "archived"]);
export const catalogAvailabilitySchema = z.enum(["available", "quote-required", "coming-soon", "unavailable"]);
export const servicePricingModelSchema = z.enum(["free-inquiry", "fixed", "starting-at", "quote-required", "duration"]);
const catalogLocaleSchema = z.object({
  title: z.string().trim().min(1).max(250),
  shortDescription: z.string().max(500).default(""),
  description: z.string().max(20_000).default(""),
  seoTitle: z.string().max(250).default(""),
  seoDescription: z.string().max(500).default(""),
});
export const variantSchema = z.object({ id: z.string(), label: z.string().max(120), sku: z.string().max(120).default(""), priceMinor: z.number().int().nonnegative().nullable().default(null), available: z.boolean().default(true) });

export const catalogItemSchema = z.object({
  id: z.string(),
  slug: z.string().regex(safeSlugPattern),
  status: catalogStatusSchema,
  type: catalogItemTypeSchema,
  availability: catalogAvailabilitySchema,
  localeContent: z.object({ en: catalogLocaleSchema.optional(), vi: catalogLocaleSchema.optional() }).refine((value) => value.en || value.vi, "At least one locale is required."),
  publishedLocales: localeSchema.array().default([]),
  priceMinor: z.number().int().nonnegative().nullable().default(null),
  currency: z.literal("USD").default("USD"),
  mediaIds: z.string().array().max(20).default([]),
  category: z.string().max(120).default(""),
  tags: z.string().max(80).array().max(30).default([]),
  featured: z.boolean().default(false),
  physical: z.object({ sku: z.string().max(120), inventoryPolicy: z.enum(["track", "continue", "provider"]), shippingClass: z.string().max(120).default(""), variants: variantSchema.array().max(100).default([]), podProviderRef: z.string().max(200).nullable().default(null) }).optional(),
  digital: z.object({ assetId: z.string().nullable().default(null), deliveryPolicy: z.enum(["entitlement", "external", "manual"]).default("entitlement"), previewEmbedId: z.string().nullable().default(null), formatLabel: z.string().max(120).default("") }).optional(),
  service: z.object({ pillar: z.enum(["deal", "space", "general"]), pricingModel: servicePricingModelSchema, bookingServiceKey: z.string().max(120), durationMinutes: z.number().int().positive().max(480).nullable().default(null) }).optional(),
  affiliate: z.object({ merchant: z.string().trim().min(1).max(160), url: z.string().url().refine((value) => value.startsWith("https://"), "Affiliate URLs must use HTTPS."), disclosure: z.string().max(500).default("") }).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().nullable().default(null),
}).superRefine((item, context) => {
  if (item.type === "physical" && !item.physical) context.addIssue({ code: "custom", path: ["physical"], message: "Physical product details are required." });
  if (item.type === "digital" && !item.digital) context.addIssue({ code: "custom", path: ["digital"], message: "Digital product details are required." });
  if (item.type === "service" && !item.service) context.addIssue({ code: "custom", path: ["service"], message: "Service details are required." });
  if (item.type === "affiliate" && !item.affiliate) context.addIssue({ code: "custom", path: ["affiliate"], message: "Affiliate details are required." });
  if (item.type !== "affiliate" && item.availability === "available" && item.priceMinor === null && item.service?.pricingModel !== "free-inquiry" && item.service?.pricingModel !== "quote-required") context.addIssue({ code: "custom", path: ["priceMinor"], message: "An available purchasable item requires a price." });
});

export type CatalogItem = z.infer<typeof catalogItemSchema>;
export type CatalogItemType = z.infer<typeof catalogItemTypeSchema>;
export const catalogItemTypes = catalogItemTypeSchema.options;

export function isPublicCatalogItem(item: CatalogItem, locale: "en" | "vi") {
  return item.status === "active" && item.availability !== "unavailable" && item.publishedLocales.includes(locale) && Boolean(item.localeContent[locale]);
}

