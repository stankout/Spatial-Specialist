import {z} from "zod";
import {mediaSlotKeys} from "@/lib/media/types";

export const contentTypeSchema=z.enum(["video","article","guide","property-analysis","inspection-education","spatial-analysis"]);
export const contentStatusSchema=z.enum(["draft","published","archived"]);
export const serviceCategorySchema=z.enum(["deal","condition","space","general"]);
export const localeSchema=z.enum(["en","vi"]);
export const displayModeSchema=z.enum(["standard","wide","portrait","full-width"]);
export const ctaPresetSchema=z.enum(["plan-next-move","request-inspection","book-spatial","contact","custom"]);
export const contentPillarSchema=z.enum(["inspection-truth","market-reality","spatial-intelligence","luxury-buyer-psychology","feng-shui-cultural-intelligence","seller-transformation"]);
export const funnelStageSchema=z.enum(["awareness","education","evaluation","conversion"]);
export const strategicObjectiveSchema=z.enum(["buildTrust","demonstrateExpertise","generateSellerLead","generateBuyerLead","generateInspectionLead","generateSpatialLead","buildLuxuryAuthority","buildReferralAuthority"]);
export const proofTypeSchema=z.enum(["before-after","inspection-discovery","property-analysis","room-flow-analysis","listing-preparation","market-report","floor-plan-breakdown","video-analysis","client-review","professional-referral","case-study","none"]);
const localizedText=z.object({en:z.string().max(500).default(""),vi:z.string().max(500).default("")});
const baseBlock=z.object({id:z.string()});
export const blockSchema=z.discriminatedUnion("type",[
 baseBlock.extend({type:z.literal("heading"),level:z.union([z.literal(2),z.literal(3)]),text:z.string().max(500)}),
 baseBlock.extend({type:z.literal("text"),text:z.string().max(20000),style:z.enum(["paragraph","bullets","numbered"]).default("paragraph")}),
 baseBlock.extend({type:z.literal("image"),assetId:z.string(),display:z.enum(["standard","wide","portrait","full-width"]),caption:localizedText}),
 baseBlock.extend({type:z.literal("embed"),embedId:z.string()}),
 baseBlock.extend({type:z.literal("gallery"),assetIds:z.string().array().max(20),presentation:z.enum(["editorial-grid","carousel"]),caption:localizedText}),
 baseBlock.extend({type:z.literal("quote"),text:z.string().max(3000),attribution:z.string().max(300).default("")}),
 baseBlock.extend({type:z.literal("callout"),title:z.string().max(300).default(""),text:z.string().max(5000)}),
 baseBlock.extend({type:z.literal("cta"),preset:ctaPresetSchema,label:z.string().max(200).default(""),internalPath:z.string().max(500).default("")}),
 baseBlock.extend({type:z.literal("divider")}),
]);
export type EditorialBlock=z.infer<typeof blockSchema>;
const localeEditorialSchema=z.object({title:z.string().trim().min(1).max(250),excerpt:z.string().max(1000).default(""),blocks:blockSchema.array().default([]),transcript:z.string().max(100000).default(""),seo:z.object({title:z.string().max(250).default(""),description:z.string().max(500).default(""),canonicalOverride:z.string().max(1000).default(""),index:z.boolean().default(true)}).default({title:"",description:"",canonicalOverride:"",index:true})});
const strategyMetadataSchema=z.object({contentPillar:contentPillarSchema.optional(),targetAudience:z.string().max(200).default(""),funnelStage:funnelStageSchema.optional(),proofType:proofTypeSchema.default("none"),strategicObjective:strategicObjectiveSchema.optional(),strategicBrief:z.string().max(2000).default(""),suggestedHook:z.string().max(1000).default(""),suggestedCta:ctaPresetSchema.optional(),suggestedProof:z.string().max(1000).default(""),potentialMediaFormat:z.string().max(200).default(""),strategySeed:z.boolean().default(false),seedKey:z.string().max(200).optional()});
export const contentEntrySchema=z.object({id:z.string(),type:contentTypeSchema,status:contentStatusSchema,slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),serviceCategory:serviceCategorySchema,localeContent:z.object({en:localeEditorialSchema.optional(),vi:localeEditorialSchema.optional()}).refine(v=>v.en||v.vi,"At least one locale is required."),publishedLocales:localeSchema.array().default([]),featuredImageId:z.string().nullable().default(null),featuredEmbedId:z.string().nullable().default(null),tags:z.string().max(80).array().max(30).default([]),featured:z.boolean().default(false),taxonomy:z.string().max(100).array().max(20).default([]),strategyMetadata:strategyMetadataSchema.optional(),propertyMetadata:z.object({propertyType:z.string().max(100).default(""),generalLocation:z.string().max(200).default(""),lenses:z.array(z.enum(["deal","condition","space"])).default([])}).optional(),createdAt:z.string(),updatedAt:z.string(),publishedAt:z.string().nullable().default(null)});
export type ContentEntry=z.infer<typeof contentEntrySchema>;
export type ContentType=z.infer<typeof contentTypeSchema>;export type ContentStatus=z.infer<typeof contentStatusSchema>;export type ServiceCategory=z.infer<typeof serviceCategorySchema>;export type ContentLocale=z.infer<typeof localeSchema>;
export const contentTypes=contentTypeSchema.options;export const serviceCategories=serviceCategorySchema.options;
export const contentPillars=contentPillarSchema.options;export const funnelStages=funnelStageSchema.options;export const strategicObjectives=strategicObjectiveSchema.options;
export const ctaRoutes={"plan-next-move":locale=>`/${locale}/book?service=real-estate`,"request-inspection":locale=>`/${locale}/book?service=inspection`,"book-spatial":locale=>`/${locale}/book?service=spatial-residential`,contact:locale=>`/${locale}/contact`} satisfies Record<Exclude<z.infer<typeof ctaPresetSchema>,"custom">,(locale:"en"|"vi")=>string>;
export const unusedMediaSlotKeys=mediaSlotKeys;
