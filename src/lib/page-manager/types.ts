import { z } from "zod";
import { localeSchema, publicationStatusSchema } from "@/lib/platform/publishing";
import { safeSlugPattern } from "@/lib/platform/slug";

export const sectionTypeSchema = z.enum([
  "hero", "text", "split-content", "media", "video", "gallery", "services", "feature-grid", "comparison", "stats", "testimonial", "faq", "cta", "contact", "catalog", "product-grid", "affiliate-grid", "booking", "pricing", "embed", "article-feed", "guide-feed", "video-feed", "portfolio-grid",
]);

const localizedSectionSchema = z.object({
  heading: z.string().max(300).default(""),
  body: z.string().max(10_000).default(""),
  ctaLabel: z.string().max(120).default(""),
});

export const managedSectionSchema = z.object({
  id: z.string(),
  type: sectionTypeSchema,
  visible: z.boolean().default(true),
  content: z.object({ en: localizedSectionSchema.optional(), vi: localizedSectionSchema.optional() }).default({}),
  mediaSlot: z.string().max(160).nullable().default(null),
  visualSectionId: z.string().max(160).nullable().default(null),
  ctaPath: z.string().max(500).default(""),
});

const pageLocaleSchema = z.object({
  title: z.string().trim().min(1).max(250),
  description: z.string().max(500).default(""),
  seoTitle: z.string().max(250).default(""),
  seoDescription: z.string().max(500).default(""),
});

export const managedPageSchema = z.object({
  id: z.string(),
  slug: z.string().regex(safeSlugPattern),
  route: z.string().startsWith("/").max(500),
  status: publicationStatusSchema,
  visibility: z.enum(["public", "hidden", "internal"]),
  localeContent: z.object({ en: pageLocaleSchema.optional(), vi: pageLocaleSchema.optional() }),
  publishedLocales: localeSchema.array().default([]),
  sections: managedSectionSchema.array().max(50).default([]),
  system: z.boolean().default(false),
  updatedAt: z.string(),
  publishedAt: z.string().nullable().default(null),
});

export type ManagedPage = z.infer<typeof managedPageSchema>;
export type ManagedSection = z.infer<typeof managedSectionSchema>;
export const sectionTypes = sectionTypeSchema.options;

