import type {MediaAsset} from "@/lib/media/types";

export function getPublicMediaEligibility(asset:MediaAsset){
 const checks=[
  {key:"imported",label:"Imported",passed:asset.imported},
  {key:"privacy",label:"Privacy reviewed",passed:asset.privacyReviewed&&!asset.possiblePrivateInformation},
  {key:"rights",label:"Rights confirmed",passed:asset.rightsStatus==="owner-created"||asset.rightsStatus==="owner-portrait"||asset.rightsStatus==="licensed-third-party"},
  {key:"public",label:"Approved for public use",passed:asset.approvedForPublicUse},
 ] as const;
 return {checks,eligible:checks.every(check=>check.passed)};
}

export function getMediaWorkflowState(asset:MediaAsset){
 const eligibility=getPublicMediaEligibility(asset);
 const metadataComplete=Boolean((asset.decorative||asset.sourceType==="procedural-scene"||asset.mimeType.startsWith("video/")||asset.alt.en||asset.alt.vi)&&(asset.title.en||asset.title.vi));
 if(!asset.imported)return {state:"Imported",missing:["Complete import"]};
 const missing=[...(!metadataComplete?["Title and accessible metadata"]:[]),...eligibility.checks.filter(check=>!check.passed).map(check=>check.label)];
 if(asset.approvedForPublicUse&&eligibility.eligible)return {state:"Published use",missing:[]};
 if(eligibility.checks.slice(0,3).every(check=>check.passed)&&metadataComplete)return {state:"Ready",missing:["Approve for public use"]};
 if(!metadataComplete)return {state:"Metadata incomplete",missing};
 return {state:"Owner review required",missing};
}
