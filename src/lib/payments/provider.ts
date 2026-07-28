import type { Order } from "@/lib/orders/types";

export type CheckoutResult = { ok: true; provider: string; reference: string; status: "pending" | "paid" } | { ok: false; provider: string; error: string };
export interface PaymentProvider {
  name: string;
  mode: "development" | "test" | "production";
  createCheckout(order: Order): Promise<CheckoutResult>;
  verifyCheckout(reference: string): Promise<CheckoutResult>;
  refund(reference: string, amountMinor: number): Promise<CheckoutResult>;
  verifyWebhook(payload: string, signature: string): Promise<boolean>;
}

export const disabledPaymentProvider: PaymentProvider = {
  name: "disabled", mode: "development",
  async createCheckout() { return { ok: false, provider: "disabled", error: "Payment provider is not configured." }; },
  async verifyCheckout() { return { ok: false, provider: "disabled", error: "Payment provider is not configured." }; },
  async refund() { return { ok: false, provider: "disabled", error: "Payment provider is not configured." }; },
  async verifyWebhook() { return false; },
};

export const mockPaymentProvider: PaymentProvider = {
  name: "mock", mode: "development",
  async createCheckout(order) { if (process.env.NODE_ENV !== "development") return { ok: false, provider: "mock", error: "Mock checkout is development-only." }; return { ok: true, provider: "mock", reference: `mock_${order.id}`, status: "pending" }; },
  async verifyCheckout(reference) { return process.env.NODE_ENV === "development" && reference.startsWith("mock_") ? { ok: true, provider: "mock", reference, status: "paid" } : { ok: false, provider: "mock", error: "Invalid mock checkout." }; },
  async refund(reference) { return process.env.NODE_ENV === "development" && reference.startsWith("mock_") ? { ok: true, provider: "mock", reference, status: "paid" } : { ok: false, provider: "mock", error: "Invalid mock checkout." }; },
  async verifyWebhook() { return false; },
};

export function getPaymentProvider(): PaymentProvider { return process.env.NODE_ENV === "development" && process.env.PAYMENT_PROVIDER === "mock" ? mockPaymentProvider : disabledPaymentProvider; }

