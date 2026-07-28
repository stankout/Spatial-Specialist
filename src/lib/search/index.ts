import { featureFlags } from "@/data/platform.config";
import { publicCatalog } from "@/lib/catalog/repository";
import { publicContent } from "@/lib/content-studio/repository";
import type { ContentEntry } from "@/lib/content-studio/types";
import { canonicalPages } from "@/lib/page-manager/repository";
import type { PlatformLocale } from "@/lib/platform/publishing";

export type SearchResultType = "page" | "guide" | "article" | "video" | "portfolio" | "product" | "service";
export type SearchResult = { id: string; type: SearchResultType; title: string; excerpt: string; route: string; tags: string[] };
const contentType = (entry: ContentEntry): SearchResultType => entry.type === "guide" ? "guide" : entry.type === "video" ? "video" : entry.type === "portfolio" ? "portfolio" : "article";
const contentRoute = (entry: ContentEntry, locale: PlatformLocale) => `/${locale}/${contentType(entry) === "guide" ? "guides" : contentType(entry) === "video" ? "videos" : contentType(entry) === "portfolio" ? "portfolio" : "articles"}/${entry.slug}`;

export async function buildPublicSearchIndex(locale: PlatformLocale, root = process.cwd()): Promise<SearchResult[]> {
  if (!featureFlags.siteSearchEnabled) return [];
  const [content, catalog] = await Promise.all([publicContent({ locale }, root), publicCatalog(locale, root)]);
  const pages = canonicalPages.filter((page) => page.visibility === "public" && page.status === "published" && page.publishedLocales.includes(locale) && page.id !== "condition").map((page): SearchResult => ({ id: `page:${page.id}`, type: page.id === "deal" || page.id === "space" ? "service" : "page", title: page.localeContent[locale]?.title ?? page.slug, excerpt: page.localeContent[locale]?.description ?? "", route: `/${locale}${page.route === "/" ? "" : page.route}`, tags: [] }));
  const contentResults = content.map((entry): SearchResult => ({ id: `content:${entry.id}`, type: contentType(entry), title: entry.localeContent[locale]?.title ?? entry.slug, excerpt: entry.localeContent[locale]?.excerpt ?? "", route: contentRoute(entry, locale), tags: entry.tags }));
  const catalogResults = catalog.map((item): SearchResult => ({ id: `catalog:${item.id}`, type: "product", title: item.localeContent[locale]?.title ?? item.slug, excerpt: item.localeContent[locale]?.shortDescription ?? "", route: `/${locale}/products/${item.slug}`, tags: item.tags }));
  return [...pages, ...contentResults, ...catalogResults];
}

export async function searchPublicSite(locale: PlatformLocale, query: string, type?: SearchResultType, root = process.cwd()) {
  const normalized = query.trim().toLocaleLowerCase(locale);
  if (!normalized) return [];
  return (await buildPublicSearchIndex(locale, root)).filter((item) => (!type || item.type === type) && `${item.title} ${item.excerpt} ${item.tags.join(" ")}`.toLocaleLowerCase(locale).includes(normalized));
}

