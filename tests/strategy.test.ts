import {readFile} from "node:fs/promises";
import path from "node:path";
import {describe,expect,it} from "vitest";
import {brandThesis,contentPillarDefinitions,getSignatureOffers,marketSnapshotSchema,proofClaimGates,signatureOffers} from "@/data/strategy";
import {contentEntrySchema} from "@/lib/content-studio/types";

describe("property strategy",()=>{
 it("keeps the central thesis and all six unique pillars",()=>{expect(brandThesis.internal).toBe("Turn property uncertainty into clarity.");expect(contentPillarDefinitions).toHaveLength(6);expect(new Set(contentPillarDefinitions.map(item=>item.key)).size).toBe(6)});
 it("maps every pillar to an approved CTA",()=>{expect(contentPillarDefinitions.every(item=>["plan-next-move","request-inspection","book-spatial"].includes(item.cta))).toBe(true)});
 it("keeps signature offers inactive without explicit flags",()=>{expect(signatureOffers.every(offer=>offer.active===false)).toBe(true)});
 it("activates only the explicitly enabled signature offer",()=>{const offers=getSignatureOffers({BUYER_PROPERTY_RISK_REVIEW_ACTIVE:"true"});expect(offers.find(offer=>offer.slug==="buyer-property-risk-review")?.active).toBe(true);expect(offers.filter(offer=>offer.active)).toHaveLength(1)});
 it("keeps unsupported proof claims gated",()=>{expect(Object.values(proofClaimGates).every(value=>value===false)).toBe(true)});
 it("requires dated, sourced market context",()=>{expect(()=>marketSnapshotSchema.parse({metric:"Median price",value:"unknown"})).toThrow();expect(marketSnapshotSchema.parse({asOfDate:"2026-07-01",sourceName:"Owner-verified source",metric:"Example metric",value:"Example value",context:"Test fixture only",verifiedAt:"2026-07-17T12:00:00.000Z"}).asOfDate).toBe("2026-07-01")});
 it("includes an explicit contextual CTA in strategy seeds",async()=>{const script=await readFile(path.join(process.cwd(),"scripts","seed-strategy.mjs"),"utf8");expect(script).toContain("suggestedCta:seed.cta")});
 it("defines a safe draft shape used by the seed command",async()=>{const script=await readFile(path.join(process.cwd(),"scripts","seed-strategy.mjs"),"utf8");expect(script).toContain('status:"draft"');expect(script).toContain("publishedLocales:[]");expect(script).toContain("strategySeed:true");const now=new Date().toISOString();expect(contentEntrySchema.safeParse({id:"test",type:"article",status:"draft",slug:"safe-draft",serviceCategory:"deal",localeContent:{en:{title:"Safe draft",excerpt:"",blocks:[],transcript:"",seo:{title:"",description:"",canonicalOverride:"",index:false}}},publishedLocales:[],featuredImageId:null,featuredEmbedId:null,tags:[],featured:false,taxonomy:[],createdAt:now,updatedAt:now,publishedAt:null}).success).toBe(true)});
});
