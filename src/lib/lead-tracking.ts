import type { LeadSource } from "@/lib/lead";

export type LeadAttribution = { source:LeadSource; landingPage:string; currentPage:string; referrer:string; utmSource:string; utmMedium:string; utmCampaign:string; utmContent:string; utmTerm:string };
const knownSources = new Set<LeadSource>(["direct","google","youtube","tiktok","instagram","facebook","referral","other"]);
export function parseLeadAttribution(params: URLSearchParams, pagePath: string, referrer = ""): LeadAttribution {
  const utmSource = (params.get("utm_source") || "").slice(0, 200).toLowerCase();
  let source: LeadSource = knownSources.has(utmSource as LeadSource) ? utmSource as LeadSource : "direct";
  if (source === "direct" && referrer) { try { const host = new URL(referrer).hostname.toLowerCase(); source = host.includes("google")?"google":host.includes("youtube")?"youtube":host.includes("tiktok")?"tiktok":host.includes("instagram")?"instagram":host.includes("facebook")?"facebook":"referral"; } catch { source="other"; } }
  return { source, landingPage:pagePath, currentPage:pagePath, referrer:referrer.slice(0,1000), utmSource, utmMedium:(params.get("utm_medium")||"").slice(0,200), utmCampaign:(params.get("utm_campaign")||"").slice(0,200), utmContent:(params.get("utm_content")||"").slice(0,200), utmTerm:(params.get("utm_term")||"").slice(0,200) };
}
