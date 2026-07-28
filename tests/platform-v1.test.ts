import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { bookingSchema } from "@/lib/booking/types";
import { addCatalogItem, cartSubtotalMinor, emptyCart } from "@/lib/cart/types";
import { catalogItemSchema, type CatalogItem } from "@/lib/catalog/types";
import { courseSchema } from "@/lib/catalog/courses";
import { createCheckout } from "@/lib/checkout/service";
import { authorizeDigitalDownload } from "@/lib/delivery/authorize";
import { hasEntitlement, type Entitlement } from "@/lib/entitlements/types";
import { getMediaWorkflowState } from "@/lib/media/approval";
import { mediaAssetSchema } from "@/lib/media/types";
import { validateMediaUpload } from "@/lib/media/validation";
import type { Order } from "@/lib/orders/types";
import type { OrderRepository } from "@/lib/orders/repository";
import { canonicalPages, LocalPageRepository } from "@/lib/page-manager/repository";
import { addMoney, money } from "@/lib/platform/money";
import { isPublishedForLocale } from "@/lib/platform/publishing";
import { validatePublicSlug } from "@/lib/platform/slug";
import { searchPublicSite } from "@/lib/search/index";
import { serviceRequestSchema } from "@/lib/service-requests/types";

const roots:string[]=[];
afterEach(async()=>{await Promise.all(roots.splice(0).map(root=>rm(root,{recursive:true,force:true})))})
async function tempRoot(){const root=await mkdtemp(path.join(tmpdir(),"ac-platform-"));roots.push(root);return root}

function catalogItem(type:CatalogItem["type"]="physical"):CatalogItem{const now=new Date().toISOString();return catalogItemSchema.parse({id:`item-${type}`,slug:`item-${type}`,status:"active",type,availability:"available",localeContent:{en:{title:`${type} item`,shortDescription:"",description:"",seoTitle:"",seoDescription:""}},publishedLocales:["en"],priceMinor:type==="affiliate"?null:1999,currency:"USD",mediaIds:[],category:"",tags:[],featured:false,...(type==="physical"?{physical:{sku:"SKU",inventoryPolicy:"track",shippingClass:"standard",variants:[],podProviderRef:null}}:{}),...(type==="digital"?{digital:{assetId:"private-asset",deliveryPolicy:"entitlement",previewEmbedId:null,formatLabel:"PDF"}}:{}),...(type==="service"?{service:{pillar:"space",pricingModel:"fixed",bookingServiceKey:"space-review",durationMinutes:30}}:{}),...(type==="affiliate"?{affiliate:{merchant:"Merchant",url:"https://merchant.example/item",disclosure:"Affiliate link"}}:{}),createdAt:now,updatedAt:now,publishedAt:now})}

describe("platform publishing and Page Manager",()=>{
 it("keeps CONDITION internal while canonical DEAL and SPACE remain public",()=>{expect(canonicalPages.find(page=>page.id==="condition")?.visibility).toBe("internal");expect(canonicalPages.filter(page=>["deal","space"].includes(page.id)).every(page=>page.visibility==="public")).toBe(true)});
 it("persists a local page draft without changing the canonical default",async()=>{const root=await tempRoot(),repository=new LocalPageRepository(root),deal=structuredClone((await repository.get("deal"))!);deal.status="draft";deal.publishedLocales=[];const saved=await repository.save(deal);expect(saved.status).toBe("draft");expect((await repository.get("deal"))?.status).toBe("draft");expect(canonicalPages.find(page=>page.id==="deal")?.status).toBe("published")});
 it("requires published locale visibility",()=>{expect(isPublishedForLocale({status:"published",publishedLocales:["en"]},"en")).toBe(true);expect(isPublishedForLocale({status:"draft",publishedLocales:["en"]},"en")).toBe(false);expect(isPublishedForLocale({status:"published",publishedLocales:["en"]},"vi")).toBe(false)});
});

describe("catalog, cart, and money",()=>{
 it("validates explicit catalog discriminators and HTTPS affiliate links",()=>{expect(catalogItemSchema.parse(catalogItem("physical")).type).toBe("physical");expect(()=>catalogItemSchema.parse({...catalogItem("affiliate"),affiliate:{merchant:"Bad",url:"http://example.com",disclosure:""}})).toThrow(/HTTPS/)});
 it("keeps affiliate and service records out of the first-party cart",()=>{expect(()=>addCatalogItem(emptyCart(),catalogItem("affiliate"))).toThrow(/Affiliate/);expect(()=>addCatalogItem(emptyCart(),catalogItem("service"))).toThrow(/booking/)});
 it("adds physical and digital items using integer minor units",()=>{let cart=addCatalogItem(emptyCart(),catalogItem("physical"));cart=addCatalogItem(cart,catalogItem("digital"));expect(cartSubtotalMinor(cart)).toBe(3998);expect(addMoney([money(1999),money(500)]).amountMinor).toBe(2499)});
 it("rejects floating-point money",()=>{expect(()=>money(19.99)).toThrow(/integer/)});
});

describe("checkout, orders, and idempotency",()=>{
 it("creates one order for repeated idempotency keys",async()=>{const orders:Order[]=[];const repository:OrderRepository={async list(){return orders},async get(id){return orders.find(order=>order.id===id)??null},async findByIdempotencyKey(key){return orders.find(order=>order.idempotencyKey===key)??null},async save(order){orders.splice(0,orders.length,...orders.filter(item=>item.id!==order.id),order);return order}};let providerCalls=0;const provider={name:"test",mode:"test" as const,async createCheckout(order:Order){providerCalls++;return {ok:true as const,provider:"test",reference:`test_${order.id}`,status:"pending" as const}},async verifyCheckout(reference:string){return {ok:true as const,provider:"test",reference,status:"paid" as const}},async refund(reference:string){return {ok:true as const,provider:"test",reference,status:"paid" as const}},async verifyWebhook(){return true}};const cart=addCatalogItem(emptyCart(),catalogItem("digital"));const input={idempotencyKey:"checkout-key-123",locale:"en" as const,contact:{name:"Test Owner",email:"owner@example.com"},cart,attribution:{utm_source:"qa"},website:""};const first=await createCheckout(input,{repository,provider}),second=await createCheckout(input,{repository,provider});expect(first.duplicate).toBe(false);expect(second.duplicate).toBe(true);expect(first.order.id).toBe(second.order.id);expect(providerCalls).toBe(1);expect(first.order.totalMinor).toBe(1999)});
});

describe("booking, paid requests, courses, and entitlements",()=>{
 it("represents requested availability without claiming confirmation",()=>{const now=new Date().toISOString();const booking=bookingSchema.parse({id:"booking-1",serviceKey:"space-review",locale:"en",contact:{name:"Owner",email:"owner@example.com",phone:""},requestedAt:now,durationMinutes:30,timezone:"America/New_York",status:"requested",notes:"",orderId:null,attribution:{},createdAt:now,updatedAt:now});expect(booking.status).toBe("requested")});
 it("keeps paid answers private in a controlled lifecycle",()=>{const now=new Date().toISOString();const request=serviceRequestSchema.parse({id:"request-1",type:"video-answer",status:"reviewing",locale:"vi",customerId:"customer-1",contact:{name:"Owner",email:"owner@example.com"},question:"Approved test question",response:{type:"video",text:"",assetId:"private-video"},catalogItemId:"service-1",orderId:"order-1",entitlementId:null,createdAt:now,updatedAt:now});expect(request.response?.assetId).toBe("private-video")});
 it("models lightweight courses without granting access implicitly",()=>{const course=courseSchema.parse({id:"course-1",catalogItemId:"item-digital",status:"draft",access:"paid",modules:[{id:"module-1",title:"Module",lessons:[{id:"lesson-1",title:"Lesson",type:"video",content:"",assetId:"private-video",embedId:null,preview:false}]}],updatedAt:new Date().toISOString()});expect(course.status).toBe("draft");expect(course.modules[0].lessons[0].preview).toBe(false)});
 it("authorizes an exact digital asset only with an active entitlement",()=>{const entitlement:Entitlement={id:"ent-1",customerId:"customer-1",resourceType:"digital-product",resourceId:"item-digital",orderId:"order-1",status:"active",grantedAt:new Date().toISOString(),expiresAt:null};expect(hasEntitlement([entitlement],"customer-1","digital-product","item-digital")).toBe(true);expect(authorizeDigitalDownload({customerId:"customer-1",productId:"item-digital",requestedAssetId:"private-asset",bindings:[{productId:"item-digital",assetId:"private-asset"}],entitlements:[entitlement]}).authorized).toBe(true);expect(authorizeDigitalDownload({customerId:"customer-1",productId:"item-digital",requestedAssetId:"other",bindings:[{productId:"item-digital",assetId:"private-asset"}],entitlements:[entitlement]}).authorized).toBe(false)});
});

describe("search, slug, and media safety",()=>{
 it("rejects system route collisions",()=>{expect(validatePublicSlug("studio").valid).toBe(false);expect(validatePublicSlug("valid-guide").valid).toBe(true);expect(validatePublicSlug("Bad Slug").valid).toBe(false)});
 it("never returns hidden CONDITION from public search",async()=>{const root=await tempRoot();const results=await searchPublicSite("en","home inspection",undefined,root);expect(results.some(result=>result.route.includes("home-inspection"))).toBe(false)});
 it("explains media workflow requirements",()=>{const now=new Date().toISOString();const asset=mediaAssetSchema.parse({id:"media-1",filename:"reference.png",originalFilename:"reference.png",sourceFilename:"reference.png",url:"/reference.png",provider:"static",mimeType:"image/png",width:1000,height:1400,duration:null,fileSize:100,title:{en:"",vi:""},description:{en:"",vi:""},alt:{en:"",vi:""},caption:{en:"",vi:""},focalPoint:{x:.5,y:.5},cropMode:"contain",mediaRole:"document-reference",serviceLens:"general",tags:[],reviewStatus:"review",possiblePrivateInformation:false,privacyReviewed:false,rightsStatus:"unreviewed",approvedForPublicUse:false,imported:true,createdAt:now,updatedAt:now});const workflow=getMediaWorkflowState(asset);expect(workflow.state).toBe("Metadata incomplete");expect(workflow.missing).toContain("Privacy reviewed")});
 it("validates MP4 signatures without requiring ffmpeg metadata",()=>{const buffer=Buffer.alloc(24);buffer.write("ftyp",4,"ascii");const video=validateMediaUpload(buffer,"owner-video.mp4","video/mp4");expect(video.kind).toBe("video");expect(video.duration).toBeNull()});
});
