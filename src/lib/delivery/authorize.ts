import type { Entitlement } from "@/lib/entitlements/types";
import { hasEntitlement } from "@/lib/entitlements/types";
export type DigitalAssetBinding = { productId: string; assetId: string };
export function authorizeDigitalDownload(input: { customerId: string; productId: string; requestedAssetId: string; bindings: DigitalAssetBinding[]; entitlements: Entitlement[] }) { const binding = input.bindings.find((item) => item.productId === input.productId); if (!binding || binding.assetId !== input.requestedAssetId) return { authorized: false, reason: "Asset is not associated with this product." } as const; if (!hasEntitlement(input.entitlements, input.customerId, "digital-product", input.productId)) return { authorized: false, reason: "Active entitlement required." } as const; return { authorized: true, assetId: binding.assetId } as const; }

