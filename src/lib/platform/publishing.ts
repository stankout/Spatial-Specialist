import { z } from "zod";

export const publicationStatusSchema = z.enum(["draft", "published", "archived"]);
export const localeSchema = z.enum(["en", "vi"]);
export const localizedContentSchema = z.object({
  en: z.string().trim().max(20_000).default(""),
  vi: z.string().trim().max(20_000).default(""),
});

export type PublicationStatus = z.infer<typeof publicationStatusSchema>;
export type PlatformLocale = z.infer<typeof localeSchema>;

export function isPublishedForLocale(
  record: { status: PublicationStatus; publishedLocales: PlatformLocale[] },
  locale: PlatformLocale,
) {
  return record.status === "published" && record.publishedLocales.includes(locale);
}

