import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

export const auditEventSchema = z.object({
  id: z.string(),
  action: z.enum(["content.published", "page.updated", "catalog.updated", "media.approved", "feature.reviewed", "order.updated", "booking.updated"]),
  entityType: z.string().max(80),
  entityId: z.string().max(200),
  summary: z.string().max(300),
  createdAt: z.string(),
});
export type AuditEvent = z.infer<typeof auditEventSchema>;

const auditPath = (root: string) => path.join(root, ".dev-data", "audit.jsonl");

export async function recordAuditEvent(event: Omit<AuditEvent, "id" | "createdAt">, root = process.cwd()) {
  if (process.env.NODE_ENV === "production") return null;
  const record = auditEventSchema.parse({ ...event, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
  await mkdir(path.dirname(auditPath(root)), { recursive: true });
  await appendFile(auditPath(root), `${JSON.stringify(record)}\n`, "utf8");
  return record;
}

export async function listAuditEvents(root = process.cwd()) {
  if (process.env.NODE_ENV === "production") return [];
  try {
    return (await readFile(auditPath(root), "utf8")).split(/\r?\n/).filter(Boolean).map((line) => auditEventSchema.parse(JSON.parse(line))).reverse();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}
