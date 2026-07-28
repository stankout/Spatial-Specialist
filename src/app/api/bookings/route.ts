import { NextResponse } from "next/server";
import { z } from "zod";
import { featureFlags } from "@/data/platform.config";
import { LocalBookingRepository } from "@/lib/booking/repository";
import { bookingSchema, manualSchedulingProvider } from "@/lib/booking/types";
import { memoryRateLimit } from "@/lib/rate-limit";
const inputSchema = bookingSchema.omit({ id: true, status: true, orderId: true, createdAt: true, updatedAt: true }).extend({ website: z.string().max(0).optional().default(""), completionTimeMs: z.number().int().min(2500) });
export async function POST(request: Request) { if (!featureFlags.consultationBookingEnabled) return NextResponse.json({ ok: false, error: "Booking requests are disabled." }, { status: 404 }); const key = `booking:${request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"}`; if (!await memoryRateLimit.check(key)) return NextResponse.json({ ok: false, error: "Please wait before trying again." }, { status: 429 }); try { const input = inputSchema.parse(await request.json()); const now = new Date().toISOString(); const booking = bookingSchema.parse({ ...input, id: crypto.randomUUID(), status: "requested", orderId: null, createdAt: now, updatedAt: now }); const provider = await manualSchedulingProvider.createRequest(booking); if (!provider.ok) return NextResponse.json({ ok: false, error: "Scheduling provider is unavailable." }, { status: 503 }); await new LocalBookingRepository().save(booking); return NextResponse.json({ ok: true, bookingId: booking.id, status: booking.status }); } catch (error) { return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Booking request failed." }, { status: 400 }); } }

