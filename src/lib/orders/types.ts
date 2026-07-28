import { z } from "zod";

export const orderStatusSchema = z.enum(["pending", "paid", "failed", "refunded", "fulfilled", "cancelled"]);
export const fulfillmentStatusSchema = z.enum(["unfulfilled", "processing", "fulfilled", "not-required"]);
export const orderItemSchema = z.object({ catalogItemId: z.string(), variantId: z.string().nullable().default(null), title: z.string().max(250), type: z.enum(["physical", "digital"]), unitPriceMinor: z.number().int().nonnegative(), quantity: z.number().int().positive().max(99), lineTotalMinor: z.number().int().nonnegative() });
export const orderSchema = z.object({
  id: z.string(), idempotencyKey: z.string().min(8).max(200), locale: z.enum(["en", "vi"]), customerId: z.string().nullable().default(null), contact: z.object({ name: z.string().max(120), email: z.string().email().max(254) }), items: orderItemSchema.array().min(1), subtotalMinor: z.number().int().nonnegative(), discountMinor: z.number().int().nonnegative().default(0), shippingMinor: z.number().int().nonnegative().default(0), taxMinor: z.number().int().nonnegative().nullable().default(null), totalMinor: z.number().int().nonnegative(), currency: z.literal("USD"), paymentStatus: orderStatusSchema, fulfillmentStatus: fulfillmentStatusSchema, providerReference: z.string().nullable().default(null), attribution: z.record(z.string(), z.string()).default({}), createdAt: z.string(), updatedAt: z.string(),
});
export type Order = z.infer<typeof orderSchema>;

