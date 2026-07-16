import { z } from "zod";
export const leadTypes = ["buyer", "seller", "investor", "inspection", "inspection-report-review", "spatial-consultation", "general"] as const;
export const leadSchema = z.object({ type: z.enum(leadTypes), name: z.string().trim().min(2).max(100), email: z.email(), phone: z.string().trim().max(30).optional(), preferredLanguage: z.enum(["en", "vi"]), message: z.string().trim().min(10).max(2000), consent: z.literal(true), website: z.string().max(0).optional(), source: z.enum(["organic", "youtube", "tiktok", "instagram", "facebook", "google", "direct", "referral"]).default("direct") });
export type LeadInput = z.infer<typeof leadSchema>;
export async function submitLead(input: LeadInput) { const lead = leadSchema.parse(input); return { ok: true as const, id: `mock-${Date.now()}`, provider: process.env.LEAD_PROVIDER || "mock", type: lead.type }; }
