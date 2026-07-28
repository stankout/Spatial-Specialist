import { z } from "zod";
export const entitlementSchema = z.object({ id: z.string(), customerId: z.string(), resourceType: z.enum(["digital-product", "course", "download", "paid-answer"]), resourceId: z.string(), orderId: z.string().nullable().default(null), status: z.enum(["active", "revoked", "expired"]), grantedAt: z.string(), expiresAt: z.string().nullable().default(null) });
export type Entitlement = z.infer<typeof entitlementSchema>;
export function hasEntitlement(records: Entitlement[], customerId: string, resourceType: Entitlement["resourceType"], resourceId: string, at = new Date()) { return records.some((record) => record.customerId === customerId && record.resourceType === resourceType && record.resourceId === resourceId && record.status === "active" && (!record.expiresAt || new Date(record.expiresAt) > at)); }

