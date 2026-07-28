import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { entitlementSchema, type Entitlement } from "@/lib/entitlements/types";
export class LocalEntitlementRepository {
  constructor(private root = process.cwd()) {}
  private get file() { return path.join(this.root, ".dev-data", "entitlements.json"); }
  async list() { if (process.env.NODE_ENV === "production") return []; try { return entitlementSchema.array().parse(JSON.parse(await readFile(this.file, "utf8"))); } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; } }
  async save(input: Entitlement) { if (process.env.NODE_ENV === "production") throw new Error("Local entitlements are disabled in production."); const records = await this.list(); const entitlement = entitlementSchema.parse(input); await mkdir(path.dirname(this.file), { recursive: true }); const temp = `${this.file}.tmp`; await writeFile(temp, JSON.stringify([...records.filter((item) => item.id !== entitlement.id), entitlement], null, 2), "utf8"); await rename(temp, this.file); return entitlement; }
}

