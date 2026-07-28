export interface PrintOnDemandProvider {
  name: string;
  createProductSync(catalogItemId: string): Promise<{ ok: boolean; providerId?: string }>;
  getProduct(providerId: string): Promise<unknown>;
  getVariants(providerId: string): Promise<unknown[]>;
  submitOrder(orderId: string): Promise<{ ok: boolean; providerOrderId?: string }>;
  getOrderStatus(providerOrderId: string): Promise<string>;
}
export const mockPrintOnDemandProvider: PrintOnDemandProvider = {
  name: "mock",
  async createProductSync(catalogItemId) { return process.env.NODE_ENV === "development" ? { ok: true, providerId: `mock_${catalogItemId}` } : { ok: false }; },
  async getProduct(providerId) { return { id: providerId, mode: "DEVELOPMENT / MOCK" }; },
  async getVariants() { return []; },
  async submitOrder(orderId) { return process.env.NODE_ENV === "development" ? { ok: true, providerOrderId: `mock_${orderId}` } : { ok: false }; },
  async getOrderStatus() { return "development-only"; },
};

