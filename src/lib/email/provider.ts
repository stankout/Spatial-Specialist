export type EmailEvent = "lead-received" | "booking-request" | "order-confirmation" | "digital-delivery" | "paid-question-received";
export interface EmailProvider { name: string; notify(event: EmailEvent, metadata: { referenceId: string; locale: "en" | "vi" }): Promise<{ ok: boolean }>; }
export const localEmailProvider: EmailProvider = { name: "local", async notify(event, metadata) { if (process.env.NODE_ENV === "development") console.info(`[Mock Notification] ${event} ${metadata.referenceId}`); return { ok: process.env.NODE_ENV === "development" }; } };

