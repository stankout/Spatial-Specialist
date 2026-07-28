import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { serviceRequestSchema, type ServiceRequest } from "@/lib/service-requests/types";
export class LocalServiceRequestRepository {
  constructor(private root = process.cwd()) {}
  private get file() { return path.join(this.root, ".dev-data", "service-requests.json"); }
  async list() { if (process.env.NODE_ENV === "production") return []; try { return serviceRequestSchema.array().parse(JSON.parse(await readFile(this.file, "utf8"))); } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; } }
  async save(input: ServiceRequest) { if (process.env.NODE_ENV === "production") throw new Error("Local service requests are disabled in production."); const records = await this.list(); const request = serviceRequestSchema.parse(input); await mkdir(path.dirname(this.file), { recursive: true }); const temp = `${this.file}.tmp`; await writeFile(temp, JSON.stringify([...records.filter((item) => item.id !== request.id), request], null, 2), "utf8"); await rename(temp, this.file); return request; }
}

