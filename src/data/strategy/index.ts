import {z} from "zod";

export const brandThesis={internal:"Turn property uncertainty into clarity.",public:"More clarity before commitment.",positioning:"Anh Cao helps clients understand, prepare, evaluate, and position property with greater clarity before important decisions are made."} as const;
export const brandPromises=[
 {key:"see-earlier",title:"See problems earlier",description:"Identify visible risk, deferred maintenance, spatial friction, and transaction obstacles before they become surprises."},
 {key:"spend-intelligently",title:"Spend preparation money more intelligently",description:"Separate what may deserve attention from potential over-improvement."},
 {key:"stronger-experience",title:"Create a stronger property experience",description:"Clarify arrival, circulation, presentation, visual order, and functional use."},
 {key:"package-complexity",title:"Package complex property more clearly",description:"Organize unusual, higher-end, international, multigenerational, or coordination-heavy property decisions."},
] as const;
export const strategicLenses={deal:{question:"What is the decision?",value:"Transaction, positioning, buyer, seller, and market context."},condition:{question:"What is the property telling us?",value:"Visible, accessible, documented condition, limitations, priorities, and follow-up questions."},space:{question:"How does the property function and feel?",value:"Orientation, layout, circulation, arrival, privacy, light, functional zones, and optional traditional interpretation."}} as const;

const offerSchema=z.object({key:z.string(),slug:z.string(),active:z.boolean(),audience:z.string(),positioning:z.string(),components:z.string().array(),bookingService:z.string()});
export function getSignatureOffers(environment:Record<string,string|undefined>=process.env){return offerSchema.array().parse([
 {key:"marketReadyAudit",slug:"market-ready-audit",active:environment.MARKET_READY_AUDIT_ACTIVE==="true",audience:"Homeowners preparing to sell",positioning:"A structured property-preparation review intended to clarify risks, presentation priorities, and preparation opportunities before market.",components:["Property condition review","Repair priority matrix","Spatial flow review","Decluttering and organization plan","Staging priority plan","Listing positioning strategy"],bookingService:"seller"},
 {key:"buyerPropertyRiskReview",slug:"buyer-property-risk-review",active:environment.BUYER_PROPERTY_RISK_REVIEW_ACTIVE==="true",audience:"Buyers organizing a property decision",positioning:"A decision-support framework across transaction context, visible condition questions, and functional fit. It does not replace licensed specialists.",components:["Deal context","Visible condition questions","Maintenance awareness","Layout and circulation","Privacy and orientation","Decision priorities"],bookingService:"buyer"},
 {key:"propertyPreparationConcierge",slug:"property-preparation-concierge",active:environment.PROPERTY_PREPARATION_CONCIERGE_ACTIVE==="true",audience:"Owners managing complex preparation",positioning:"A future coordination service centered on assessment, prioritization, communication, and appropriate quality control—not a claim that vendors are employees.",components:["Repair and cleaning coordination","Organization and staging coordination","Photography and floor-plan coordination","Vendor access and showing preparation","Move-out and transition coordination"],bookingService:"seller"},
])}
export const signatureOffers=getSignatureOffers();

export const sellerProcess=["Diagnose","Prioritize","Prepare","Position","Launch","Adjust"] as const;
export const buyerProcess=["Context","Risk","Fit","Decision"] as const;
export const contentPillarDefinitions=[
 {key:"inspection-truth",title:"Inspection Truth",service:"condition",cta:"request-inspection"},
 {key:"market-reality",title:"Market Reality",service:"deal",cta:"plan-next-move"},
 {key:"spatial-intelligence",title:"Spatial Intelligence",service:"space",cta:"book-spatial"},
 {key:"luxury-buyer-psychology",title:"Luxury Buyer Psychology",service:"deal",cta:"plan-next-move"},
 {key:"feng-shui-cultural-intelligence",title:"Feng Shui + Cultural Intelligence",service:"space",cta:"book-spatial"},
 {key:"seller-transformation",title:"Seller Transformation",service:"deal",cta:"plan-next-move"},
] as const;
export const luxuryLaunchMethod=["Diagnosis","Preparation","Editorial production","Distribution","Market intelligence"] as const;
export const luxuryStrategies=["property analysis","buyer psychology","presentation","privacy","architecture","orientation","floor-plan analysis","dated market intelligence"] as const;
export const marketThemes=["pricing versus positioning","transaction volume","buyer leverage","seller constraints","dated local context"] as const;
export const proofTypes=["Before / After","Inspection Discovery","Property Analysis","Room-Flow Analysis","Listing Preparation","Market Report","Floor-Plan Breakdown","Video Analysis","Client Review","Professional Referral","Case Study"] as const;
export const referralCategories=["Attorneys","CPAs","Financial advisors","Lenders","Insurance professionals","Inspectors","Contractors","Cleaners","Organizers","Photographers","Drone operators","Stagers","Architects","Designers","Landscape professionals"] as const;
export const referralPartnerSchema=z.object({id:z.string(),category:z.enum(referralCategories),displayName:z.string(),publicPermission:z.boolean().default(false),verifiedAt:z.string().datetime().nullable().default(null),notes:z.string().default("")});
export const audienceProblems={seller:["unclear preparation priorities","deferred-maintenance questions","presentation and circulation friction","coordination complexity"],buyer:["decision context","visible condition risk","functional fit","future maintenance awareness"],investor:["market context","scope clarity","operational fit","exit-positioning questions"]} as const;
export const sellerStrategies=["as-is clarity","prepare selectively","editorial launch","complex-property packaging"] as const;
export const buyerStrategies=["context first","risk questions","functional fit","decision synthesis"] as const;
export const luxuryBuyerTaxonomy=["privacy","arrival","proportion","material quality","light","site relationship","service circulation"] as const;
export const internationalStrategies=["bilingual explanation","process orientation","documentation clarity","professional referral handoffs"] as const;
export const complexSellerSituations=["estate or inherited property","remote owner","multigenerational transition","coordination-heavy preparation"] as const;
export const distressedPropertyStrategies=["document observable condition","separate urgent from elective","define specialist follow-up","avoid unsupported repair-cost claims"] as const;
export const transformationTaxonomy=["condition clarity","spatial order","presentation readiness","decision confidence"] as const;
export const proofClaimGates={luxurySpecialist:false,topProducer:false,awardWinning:false,transactionVolume:false,expertInspector:false,certifiedFengShuiMaster:false} as const;

export const marketSnapshotSchema=z.object({asOfDate:z.string().date(),sourceName:z.string().min(1),sourceUrl:z.string().url().optional(),metric:z.string().min(1),value:z.string().min(1),context:z.string().min(1),verifiedAt:z.string().datetime()});
export type MarketSnapshot=z.infer<typeof marketSnapshotSchema>;
export type StrategyAttribution={contentId?:string;contentPillar?:string;strategicObjective?:string;referralCategory?:string;source?:string};
export type StrategyEventName="qualified_lead"|"seller_consultation"|"buyer_consultation"|"inspection_request"|"spatial_consultation"|"luxury_inquiry"|"consultation_booking"|"content_save"|"content_share"|"returning_viewer";
