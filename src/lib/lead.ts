import { z } from "zod";

export const leadTypes = ["buyer", "seller", "investor", "inspection", "inspection-report-review", "spatial-residential", "spatial-property-selection", "spatial-business", "spatial-audit", "general"] as const;
export const leadSources = ["direct", "google", "youtube", "tiktok", "instagram", "facebook", "referral", "other"] as const;
export type LeadType = (typeof leadTypes)[number];
export type LeadSource = (typeof leadSources)[number];

const optionalText = (max = 200) => z.string().trim().max(max).optional().default("");
const serviceDataSchema = z.record(z.string().max(60), z.string().trim().max(500)).default({});
const attributionSchema = z.object({
  source: z.enum(leadSources).default("direct"),
  landingPage: optionalText(500), currentPage: optionalText(500), referrer: optionalText(1000),
  utmSource: optionalText(), utmMedium: optionalText(), utmCampaign: optionalText(), utmContent: optionalText(), utmTerm: optionalText(),
});

const requiredServiceFields: Partial<Record<LeadType, string[]>> = {
  buyer: ["targetArea", "budgetRange", "timeline", "firstTimeBuyer", "financingStatus"],
  seller: ["propertyAddress", "propertyType", "timeline", "mainGoal"],
  investor: ["targetArea", "propertyType", "investmentStrategy", "budgetRange", "timeline"],
  inspection: ["propertyAddress", "propertyType", "preferredDate", "clientRole"],
  "inspection-report-review": ["reportAvailable", "mainQuestions", "consultationFormat"],
  "spatial-residential": ["propertyLocation", "propertyType", "primaryObjective", "propertyStatus", "consultationFormat"],
  "spatial-property-selection": ["propertyLocation", "propertyType", "primaryObjective", "propertyStatus", "consultationFormat"],
  "spatial-business": ["propertyLocation", "propertyType", "primaryObjective", "propertyStatus", "consultationFormat"],
  "spatial-audit": ["propertyLocation", "propertyType", "primaryObjective", "propertyStatus", "consultationFormat"],
  general: ["topic"],
};

export const leadSchema = z.object({
  type: z.enum(leadTypes), locale: z.enum(["en", "vi"]),
  contact: z.object({ fullName: z.string().trim().min(2).max(100), email: z.email().max(254), phone: optionalText(40), preferredLanguage: z.enum(["en", "vi"]) }),
  serviceData: serviceDataSchema, message: z.string().trim().max(2000).default(""), attribution: attributionSchema,
  pagePath: z.string().trim().max(500), consent: z.literal(true), website: z.string().max(0).optional().default(""),
  completionTimeMs: z.coerce.number().int().nonnegative(), reportUploadPlanned: z.boolean().optional().default(false),
}).superRefine((lead, ctx) => {
  for (const field of requiredServiceFields[lead.type] ?? []) if (!lead.serviceData[field]?.trim()) ctx.addIssue({ code:"custom", path:["serviceData", field], message:"Required" });
  if (lead.type === "inspection" && !lead.contact.phone) ctx.addIssue({ code:"custom", path:["contact", "phone"], message:"Required" });
  if (lead.type === "inspection-report-review" && !lead.serviceData.mainQuestions && !lead.message) ctx.addIssue({ code:"custom", path:["message"], message:"Required" });
});

export type LeadInput = z.infer<typeof leadSchema>;
export type NormalizedLead = LeadInput & { id:string; createdAt:string };

export function leadTypeFromService(value: string | null | undefined): LeadType | null {
  const aliases: Record<string, LeadType> = { "real-estate":"buyer", spatial:"spatial-residential", "spatial-consultation":"spatial-residential", "property-selection":"spatial-property-selection", "report-review":"inspection-report-review" };
  const normalized = value ? (aliases[value] ?? value) : null;
  return normalized && leadTypes.includes(normalized as LeadType) ? normalized as LeadType : null;
}
