import { z } from "zod";
export const customerSchema = z.object({ id: z.string(), email: z.string().email().max(254), name: z.string().max(120), phone: z.string().max(40).default(""), preferredLocale: z.enum(["en", "vi"]), sourceLeadId: z.string().nullable().default(null), createdAt: z.string(), updatedAt: z.string() });
export type Customer = z.infer<typeof customerSchema>;

