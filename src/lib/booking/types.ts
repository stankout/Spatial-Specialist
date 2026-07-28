import { z } from "zod";
export const bookingStatusSchema = z.enum(["requested", "confirmed", "completed", "cancelled"]);
export const bookingSchema = z.object({ id: z.string(), serviceKey: z.string().max(120), locale: z.enum(["en", "vi"]), contact: z.object({ name: z.string().trim().min(2).max(120), email: z.string().email().max(254), phone: z.string().max(40).default("") }), requestedAt: z.string(), durationMinutes: z.number().int().positive().max(480).nullable().default(null), timezone: z.string().max(80), status: bookingStatusSchema, notes: z.string().max(2_000).default(""), orderId: z.string().nullable().default(null), attribution: z.record(z.string(), z.string()).default({}), createdAt: z.string(), updatedAt: z.string() });
export type Booking = z.infer<typeof bookingSchema>;
export interface SchedulingProvider { name: string; createRequest(booking: Booking): Promise<{ ok: boolean; reference?: string }>; }
export const manualSchedulingProvider: SchedulingProvider = { name: "manual", async createRequest(booking) { return process.env.NODE_ENV === "development" ? { ok: true, reference: `manual_${booking.id}` } : { ok: false }; } };

