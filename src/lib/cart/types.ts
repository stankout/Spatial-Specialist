import { z } from "zod";
import type { CatalogItem } from "@/lib/catalog/types";

export const cartLineSchema = z.object({ itemId: z.string(), variantId: z.string().nullable().default(null), type: z.enum(["physical", "digital"]), title: z.string().max(250), unitPriceMinor: z.number().int().nonnegative(), quantity: z.number().int().positive().max(99) });
export const cartSchema = z.object({ version: z.literal(1), currency: z.literal("USD"), lines: cartLineSchema.array().max(100) });
export type Cart = z.infer<typeof cartSchema>;
export type CartLine = z.infer<typeof cartLineSchema>;
export const emptyCart = (): Cart => ({ version: 1, currency: "USD", lines: [] });

export function addCatalogItem(cart: Cart, item: CatalogItem, quantity = 1, variantId: string | null = null): Cart {
  if (item.type === "affiliate") throw new Error("Affiliate recommendations open at the merchant and cannot enter the AC cart.");
  if (item.type === "service") throw new Error("Services use the booking or inquiry workflow.");
  if (item.status !== "active" || item.availability !== "available") throw new Error("This item is not available.");
  const variant = variantId ? item.physical?.variants.find((entry) => entry.id === variantId && entry.available) : null;
  const unitPriceMinor = variant?.priceMinor ?? item.priceMinor;
  if (unitPriceMinor === null) throw new Error("A valid price is required.");
  const key = `${item.id}:${variantId ?? ""}`;
  const current = cart.lines.find((line) => `${line.itemId}:${line.variantId ?? ""}` === key);
  const line: CartLine = { itemId: item.id, variantId, type: item.type, title: item.localeContent.en?.title ?? item.localeContent.vi?.title ?? item.slug, unitPriceMinor, quantity: Math.min(99, (current?.quantity ?? 0) + quantity) };
  return cartSchema.parse({ ...cart, lines: [...cart.lines.filter((entry) => `${entry.itemId}:${entry.variantId ?? ""}` !== key), line] });
}

export function cartSubtotalMinor(cart: Cart) { return cart.lines.reduce((total, line) => total + line.unitPriceMinor * line.quantity, 0); }

