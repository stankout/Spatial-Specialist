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
