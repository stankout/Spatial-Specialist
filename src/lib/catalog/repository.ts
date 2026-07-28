import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { catalogItemSchema, isPublicCatalogItem, type CatalogItem } from "@/lib/catalog/types";
import { featureFlags } from "@/data/platform.config";
import { recordAuditEvent } from "@/lib/platform/audit";

export interface CatalogRepository { list(): Promise<CatalogItem[]>; get(id: string): Promise<CatalogItem | null>; findBySlug(slug: string): Promise<CatalogItem | null>; save(item: CatalogItem): Promise<CatalogItem>; }

export class LocalCatalogRepository implements CatalogRepository {
  constructor(private root = process.cwd()) {}
  private get file() { return path.join(this.root, ".dev-data", "catalog.json"); }
  async list() { if (process.env.NODE_ENV === "production") return []; try { return catalogItemSchema.array().parse(JSON.parse(await readFile(this.file, "utf8"))); } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; } }
  async get(id: string) { return (await this.list()).find((item) => item.id === id) ?? null; }
  async findBySlug(slug: string) { return (await this.list()).find((item) => item.slug === slug) ?? null; }
  async save(input: CatalogItem) {
    if (process.env.NODE_ENV === "production") throw new Error("Local catalog writes are disabled in production.");
    const records = await this.list();
    if (records.some((item) => item.slug === input.slug && item.id !== input.id)) throw new Error("Catalog slug is already in use.");
    const now = new Date().toISOString();
    const status = input.status;
    const item = catalogItemSchema.parse({ ...input, createdAt: input.createdAt || now, updatedAt: now, publishedAt: status === "active" ? input.publishedAt ?? now : status === "draft" ? null : input.publishedAt });
    await mkdir(path.dirname(this.file), { recursive: true });
    const temp = `${this.file}.tmp`;
    await writeFile(temp, JSON.stringify([...records.filter((record) => record.id !== item.id), item], null, 2), "utf8");
    await rename(temp, this.file);
    await recordAuditEvent({ action: "catalog.updated", entityType: "catalog-item", entityId: item.id, summary: `${item.slug} saved as ${item.status}` }, this.root);
    return item;
  }
}

export async function publicCatalog(locale: "en" | "vi", root = process.cwd()) {
  if (!featureFlags.commerceEnabled) return [];
  return (await new LocalCatalogRepository(root).list()).filter((item) => isPublicCatalogItem(item, locale) && (item.type !== "physical" || featureFlags.physicalProductsEnabled) && (item.type !== "digital" || featureFlags.digitalProductsEnabled) && (item.type !== "affiliate" || featureFlags.affiliateProductsEnabled));
}

