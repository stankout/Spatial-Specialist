import { NextResponse } from "next/server";
import { featureFlags } from "@/data/platform.config";
import { addCatalogItem, emptyCart } from "@/lib/cart/types";
import { LocalCatalogRepository } from "@/lib/catalog/repository";
import { checkoutInputSchema, createCheckout } from "@/lib/checkout/service";
import { memoryRateLimit } from "@/lib/rate-limit";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!featureFlags.commerceEnabled || !featureFlags.paymentsEnabled) return NextResponse.json({ ok: false, error: "Checkout is disabled." }, { status: 404 });
  if (process.env.NODE_ENV !== "development" || process.env.PAYMENT_PROVIDER !== "mock") return NextResponse.json({ ok: false, error: "No production payment provider is configured." }, { status: 503 });
  const key = `checkout:${request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"}`;
  if (!await memoryRateLimit.check(key)) return NextResponse.json({ ok: false, error: "Please wait before trying again." }, { status: 429 });
  try {
    const input = checkoutInputSchema.parse(await request.json());
    const catalog = new LocalCatalogRepository();
    let canonicalCart = emptyCart();
    for (const line of input.cart.lines) { const item = await catalog.get(line.itemId); if (!item) throw new Error("A cart item is no longer available."); canonicalCart = addCatalogItem(canonicalCart, item, line.quantity, line.variantId); }
    const result = await createCheckout({ ...input, cart: canonicalCart });
    return NextResponse.json({ ok: true, orderId: result.order.id, duplicate: result.duplicate, mode: "DEVELOPMENT / MOCK" });
  } catch (error) { return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Checkout could not be created." }, { status: 400 }); }
}

