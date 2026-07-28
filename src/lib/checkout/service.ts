import { z } from "zod";
import { cartSchema, cartSubtotalMinor } from "@/lib/cart/types";
import { orderSchema, type Order } from "@/lib/orders/types";
import { LocalOrderRepository, type OrderRepository } from "@/lib/orders/repository";
import { getPaymentProvider, type PaymentProvider } from "@/lib/payments/provider";

export const checkoutInputSchema = z.object({ idempotencyKey: z.string().min(8).max(200), locale: z.enum(["en", "vi"]), contact: z.object({ name: z.string().trim().min(2).max(120), email: z.string().email().max(254) }), cart: cartSchema, attribution: z.record(z.string(), z.string()).default({}), website: z.string().max(0).optional().default("") });
export type CheckoutInput = z.infer<typeof checkoutInputSchema>;

export async function createCheckout(input: CheckoutInput, options: { repository?: OrderRepository; provider?: PaymentProvider } = {}) {
  const data = checkoutInputSchema.parse(input);
  const repository = options.repository ?? new LocalOrderRepository();
  const existing = await repository.findByIdempotencyKey(data.idempotencyKey);
  if (existing) return { order: existing, duplicate: true };
  const now = new Date().toISOString();
  const subtotalMinor = cartSubtotalMinor(data.cart);
  const order: Order = orderSchema.parse({ id: crypto.randomUUID(), idempotencyKey: data.idempotencyKey, locale: data.locale, customerId: null, contact: data.contact, items: data.cart.lines.map((line) => ({ catalogItemId: line.itemId, variantId: line.variantId, title: line.title, type: line.type, unitPriceMinor: line.unitPriceMinor, quantity: line.quantity, lineTotalMinor: line.unitPriceMinor * line.quantity })), subtotalMinor, discountMinor: 0, shippingMinor: 0, taxMinor: null, totalMinor: subtotalMinor, currency: "USD", paymentStatus: "pending", fulfillmentStatus: data.cart.lines.some((line) => line.type === "physical") ? "unfulfilled" : "not-required", providerReference: null, attribution: data.attribution, createdAt: now, updatedAt: now });
  const provider = options.provider ?? getPaymentProvider();
  const result = await provider.createCheckout(order);
  const saved = await repository.save({ ...order, providerReference: result.ok ? result.reference : null, paymentStatus: result.ok ? result.status : "failed", updatedAt: new Date().toISOString() });
  return { order: saved, duplicate: false, payment: result };
}

export const discountSchema = z.object({ code: z.string().trim().min(2).max(40).transform((value) => value.toUpperCase()), type: z.enum(["fixed", "percentage"]), amount: z.number().int().positive(), active: z.boolean(), startsAt: z.string().nullable().default(null), endsAt: z.string().nullable().default(null) });
export const shippingAddressSchema = z.object({ name: z.string().max(120), line1: z.string().max(200), line2: z.string().max(200).default(""), city: z.string().max(120), region: z.string().max(120), postalCode: z.string().max(30), country: z.literal("US") });
export interface TaxProvider { calculate(input: { subtotalMinor: number; shippingMinor: number; destination: z.infer<typeof shippingAddressSchema> }): Promise<{ taxMinor: number; source: string }>; }

