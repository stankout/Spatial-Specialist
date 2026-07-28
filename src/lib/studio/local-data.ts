import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
const leadSummarySchema = z.object({ id: z.string(), type: z.string(), locale: z.enum(["en", "vi"]), source: z.string().default("direct"), createdAt: z.string(), contact: z.object({ fullName: z.string().default(""), email: z.string().default("") }).passthrough() }).passthrough();
export async function listLocalLeadSummaries(root = process.cwd()) { if (process.env.NODE_ENV === "production") return []; try { return (await readFile(path.join(root, ".dev-data", "leads.jsonl"), "utf8")).split(/\r?\n/).filter(Boolean).map((line) => leadSummarySchema.parse(JSON.parse(line))).reverse(); } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; } }

