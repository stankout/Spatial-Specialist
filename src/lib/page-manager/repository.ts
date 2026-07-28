import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { managedPageSchema, type ManagedPage, type ManagedSection } from "@/lib/page-manager/types";
import { recordAuditEvent } from "@/lib/platform/audit";

const now = "2026-01-01T00:00:00.000Z";
const section = (id: string, type: ManagedSection["type"], visualSectionId = id): ManagedSection => ({ id, type, visible: true, content: {}, mediaSlot: null, visualSectionId, ctaPath: "" });

export const canonicalPages: ManagedPage[] = [
  { id: "homepage", slug: "home", route: "/", status: "published", visibility: "public", localeContent: { en: { title: "Anh Cao", description: "Property intelligence from more than one perspective.", seoTitle: "", seoDescription: "" }, vi: { title: "Anh Cao", description: "Góc nhìn đa chiều cho quyết định về bất động sản và không gian.", seoTitle: "", seoDescription: "" } }, publishedLocales: ["en", "vi"], sections: [section("hero", "hero"), section("services", "services"), section("featured", "media"), section("guides", "guide-feed"), section("cta", "cta")], system: true, updatedAt: now, publishedAt: now },
  { id: "deal", slug: "real-estate", route: "/real-estate", status: "published", visibility: "public", localeContent: { en: { title: "Real Estate", description: "Education-led strategy for Georgia property decisions.", seoTitle: "", seoDescription: "" }, vi: { title: "Bất động sản", description: "Định hướng giáo dục cho các quyết định bất động sản tại Georgia.", seoTitle: "", seoDescription: "" } }, publishedLocales: ["en", "vi"], sections: [section("hero", "hero"), section("pathways", "services"), section("property-media", "media"), section("market-context", "text"), section("resources", "guide-feed"), section("cta", "cta")], system: true, updatedAt: now, publishedAt: now },
  { id: "space", slug: "spatial-consultation", route: "/spatial-consultation", status: "published", visibility: "public", localeContent: { en: { title: "Spatial Consultation", description: "Observable spatial analysis and practical recommendations.", seoTitle: "", seoDescription: "" }, vi: { title: "Tư vấn không gian", description: "Phân tích không gian dựa trên quan sát và gợi ý thực tế.", seoTitle: "", seoDescription: "" } }, publishedLocales: ["en", "vi"], sections: [section("hero", "hero"), section("pathways", "services"), section("methodology", "text"), section("analysis", "split-content"), section("cta", "cta")], system: true, updatedAt: now, publishedAt: now },
  { id: "condition", slug: "home-inspection", route: "/home-inspection", status: "draft", visibility: "internal", localeContent: { en: { title: "Home Inspection", description: "Internal service architecture.", seoTitle: "", seoDescription: "" }, vi: { title: "Kiểm tra nhà", description: "Kiến trúc dịch vụ nội bộ.", seoTitle: "", seoDescription: "" } }, publishedLocales: [], sections: [section("hero", "hero"), section("systems", "feature-grid"), section("report", "media"), section("faq", "faq")], system: true, updatedAt: now, publishedAt: null },
  ...["about", "services", "videos", "guides", "articles", "contact", "book"].map((slug): ManagedPage => ({ id: slug, slug, route: `/${slug}`, status: "published", visibility: "public", localeContent: { en: { title: slug[0].toUpperCase() + slug.slice(1), description: "", seoTitle: "", seoDescription: "" }, vi: { title: slug[0].toUpperCase() + slug.slice(1), description: "", seoTitle: "", seoDescription: "" } }, publishedLocales: ["en", "vi"], sections: [section("hero", "hero"), section("content", slug === "book" ? "booking" : slug === "contact" ? "contact" : "text")], system: true, updatedAt: now, publishedAt: now })),
];

export interface PageRepository {
  list(): Promise<ManagedPage[]>;
  get(id: string): Promise<ManagedPage | null>;
  save(page: ManagedPage): Promise<ManagedPage>;
}

export class LocalPageRepository implements PageRepository {
  constructor(private root = process.cwd()) {}
  private get file() { return path.join(this.root, ".dev-data", "pages.json"); }
  async list() {
    if (process.env.NODE_ENV === "production") return canonicalPages;
    const overrides = await this.readOverrides();
    const byId = new Map(canonicalPages.map((page) => [page.id, page]));
    for (const page of overrides) byId.set(page.id, page);
    return [...byId.values()];
  }
  async get(id: string) { return (await this.list()).find((page) => page.id === id) ?? null; }
  async save(input: ManagedPage) {
    if (process.env.NODE_ENV === "production") throw new Error("Local Page Manager writes are disabled in production.");
    const current = await this.readOverrides();
    const status = input.status;
    const page = managedPageSchema.parse({ ...input, updatedAt: new Date().toISOString(), publishedAt: status === "published" ? input.publishedAt ?? new Date().toISOString() : status === "draft" ? null : input.publishedAt });
    const next = [...current.filter((item) => item.id !== page.id), page];
    await this.write(next);
    await recordAuditEvent({ action: "page.updated", entityType: "page", entityId: page.id, summary: `${page.slug} saved as ${page.status}` }, this.root);
    return page;
  }
  private async readOverrides() {
    try { return managedPageSchema.array().parse(JSON.parse(await readFile(this.file, "utf8"))); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; }
  }
  private async write(records: ManagedPage[]) {
    await mkdir(path.dirname(this.file), { recursive: true });
    const temp = `${this.file}.tmp`;
    await writeFile(temp, JSON.stringify(records, null, 2), "utf8");
    await rename(temp, this.file);
  }
}

