import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { NormalizedLead } from "@/lib/lead";

export type LeadDelivery = { ok:true; provider:string; reference:string } | { ok:false; provider:string; error:string };
export interface LeadProvider { name:string; submit(lead:NormalizedLead):Promise<LeadDelivery> }

const recentMockSubmissions = new Map<string,number>();
function mockFingerprint(lead:NormalizedLead){return JSON.stringify([lead.type,lead.locale,lead.contact.email.toLowerCase(),lead.serviceData,lead.attribution.utmCampaign])}
async function saveMockLead(lead:NormalizedLead){
  const now=Date.now();const fingerprint=mockFingerprint(lead);const previous=recentMockSubmissions.get(fingerprint);
  if(previous&&now-previous<10_000)return;
  recentMockSubmissions.set(fingerprint,now);
  for(const [key,time] of recentMockSubmissions)if(now-time>60_000)recentMockSubmissions.delete(key);
  const directory=path.join(process.cwd(),".dev-data");await mkdir(directory,{recursive:true});
  const record={id:lead.id,type:lead.type,locale:lead.locale,contact:lead.contact,serviceData:lead.serviceData,source:lead.attribution.source,utm:{source:lead.attribution.utmSource,medium:lead.attribution.utmMedium,campaign:lead.attribution.utmCampaign,content:lead.attribution.utmContent,term:lead.attribution.utmTerm},landingPage:lead.attribution.landingPage,currentPage:lead.attribution.currentPage,createdAt:lead.createdAt};
  await appendFile(path.join(directory,"leads.jsonl"),`${JSON.stringify(record)}\n`,"utf8");
  console.info(`[Mock Lead Saved] ${lead.type} ${lead.id}`);
}

const mockProvider:LeadProvider={name:"mock",async submit(lead){if(process.env.NODE_ENV==="development")await saveMockLead(lead);return {ok:true,provider:"mock",reference:lead.id}}};
const webhookProvider:LeadProvider={name:"webhook",async submit(lead){const url=process.env.LEAD_WEBHOOK_URL;if(!url)return {ok:false,provider:"webhook",error:"Provider is not configured"};try{const response=await fetch(url,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(lead),cache:"no-store"});return response.ok?{ok:true,provider:"webhook",reference:response.headers.get("x-request-id")||lead.id}:{ok:false,provider:"webhook",error:`Delivery failed (${response.status})`}}catch{return {ok:false,provider:"webhook",error:"Delivery unavailable"}}}};
export function getLeadProvider():LeadProvider{return process.env.LEAD_PROVIDER==="webhook"?webhookProvider:mockProvider}
