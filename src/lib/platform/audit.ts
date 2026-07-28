import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {roleSchema} from "@/lib/governance/permissions";

export const auditEventSchema = z.object({
  eventId:z.string(),
  actorId:z.string().max(200).nullable(),
  actorRole:roleSchema.nullable(),
  action:z.string().min(1).max(100).regex(/^[A-Za-z][A-Za-z0-9._-]*$/),
  resourceType:z.string().min(1).max(80),
  resourceId:z.string().min(1).max(200),
  timestamp:z.string(),
  summary:z.string().max(300),
  metadata:z.record(z.string(),z.union([z.string(),z.number(),z.boolean(),z.null()])).default({}),
});
export type AuditEvent = z.infer<typeof auditEventSchema>;
export type AuditEventInput={action:string;resourceType?:string;resourceId?:string;entityType?:string;entityId?:string;summary:string;actorId?:string|null;actorRole?:AuditEvent["actorRole"];metadata?:AuditEvent["metadata"]};

const auditPath = (root: string) => path.join(root, ".dev-data", "audit.jsonl");

export interface AuditProvider {
  readonly id: string;
  record(event: AuditEventInput): Promise<AuditEvent | null>;
  list(): Promise<AuditEvent[]>;
}

export class LocalDevelopmentAuditProvider implements AuditProvider {
  readonly id = "local-development-jsonl";
  constructor(private readonly root = process.cwd()) {}
  record(event: AuditEventInput) { return recordAuditEvent(event, this.root); }
  list() { return listAuditEvents(this.root); }
}

export async function recordAuditEvent(event:AuditEventInput, root = process.cwd()) {
  if (process.env.NODE_ENV === "production") return null;
  const record = auditEventSchema.parse({eventId:crypto.randomUUID(),actorId:event.actorId??null,actorRole:event.actorRole??null,action:event.action,resourceType:event.resourceType??event.entityType,resourceId:event.resourceId??event.entityId,timestamp:new Date().toISOString(),summary:event.summary,metadata:event.metadata??{}});
  await mkdir(path.dirname(auditPath(root)), { recursive: true });
  await appendFile(auditPath(root), `${JSON.stringify(record)}\n`, "utf8");
  return record;
}

export async function listAuditEvents(root = process.cwd()) {
  if (process.env.NODE_ENV === "production") return [];
  try {
    return (await readFile(auditPath(root), "utf8")).split(/\r?\n/).filter(Boolean).map((line) => normalizeAuditEvent(JSON.parse(line))).reverse();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

function normalizeAuditEvent(value:unknown):AuditEvent{
 const current=auditEventSchema.safeParse(value);if(current.success)return current.data;
 const legacy=z.object({id:z.string(),action:z.string(),entityType:z.string(),entityId:z.string(),summary:z.string(),createdAt:z.string()}).parse(value);
 return auditEventSchema.parse({eventId:legacy.id,actorId:null,actorRole:null,action:legacy.action,resourceType:legacy.entityType,resourceId:legacy.entityId,timestamp:legacy.createdAt,summary:legacy.summary,metadata:{legacy:true}});
}
