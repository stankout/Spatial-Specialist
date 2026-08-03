import type {MediaAsset,MediaRole,MediaSlotKey,MediaSourceType} from "@/lib/media/types";

export type MediaSlotContract={acceptedSourceTypes:readonly MediaSourceType[];recommendedRoles:readonly MediaRole[];cropAllowed:boolean;backgroundBehavior:"section"|"hero"|"whole-main-page"|"decorative-layer"|"ambient-layer"|"content";recommendedRatio:string};

const imageSources=["uploaded-image"] as const satisfies readonly MediaSourceType[];
const visualSources=["uploaded-image","uploaded-video","procedural-scene"] as const satisfies readonly MediaSourceType[];

export function getMediaSlotContract(slot:MediaSlotKey):MediaSlotContract{
  const name=slot.toLowerCase();
  if(name.includes("compassportrait"))return {acceptedSourceTypes:imageSources,recommendedRoles:["compass-portrait"],cropAllowed:false,backgroundBehavior:"content",recommendedRatio:"2:3 portrait · contain"};
  if(name.includes("diagram")||name.includes("report"))return {acceptedSourceTypes:["uploaded-image","document"],recommendedRoles:["diagram","compass-diagram","document","document-reference"],cropAllowed:false,backgroundBehavior:"content",recommendedRatio:"Source ratio · contain"};
  if(name.includes("portrait"))return {acceptedSourceTypes:imageSources,recommendedRoles:["owner-portrait","service-portrait","page-portrait"],cropAllowed:true,backgroundBehavior:"content",recommendedRatio:"2:3 portrait"};
  if(name.includes("storybackdrop"))return {acceptedSourceTypes:visualSources,recommendedRoles:["story-backdrop","scroll-background-9-16","ambient-video"],cropAllowed:false,backgroundBehavior:"whole-main-page",recommendedRatio:name.includes("mobile")?"9:16":"9:16 preferred · 16:9 supported"};
  if(name.includes("herovideo")||name.includes("featuredvideo"))return {acceptedSourceTypes:["uploaded-video","uploaded-image"],recommendedRoles:["hero-video","featured-video","poster","video-thumbnail"],cropAllowed:true,backgroundBehavior:"hero",recommendedRatio:"16:9"};
  if(name.includes("ambientscene"))return {acceptedSourceTypes:["procedural-scene","uploaded-video","uploaded-image"],recommendedRoles:["ambient-video","decorative-motion"],cropAllowed:true,backgroundBehavior:"ambient-layer",recommendedRatio:"16:9 or source"};
  if(name.includes("motion")||name.includes("backdrop")||name.includes("background"))return {acceptedSourceTypes:visualSources,recommendedRoles:["section-backdrop","section-background","decorative-motion","hud-overlay","background-video","background"],cropAllowed:true,backgroundBehavior:name.includes("hero")?"hero":"section",recommendedRatio:"16:9 · responsive fallback"};
  if(name.includes("video"))return {acceptedSourceTypes:["uploaded-video","uploaded-image"],recommendedRoles:["content-video","featured-video","video-thumbnail","poster"],cropAllowed:false,backgroundBehavior:"content",recommendedRatio:"16:9 or source"};
  return {acceptedSourceTypes:["uploaded-image","uploaded-video","document"],recommendedRoles:["editorial-media","article-media","content-image","property-image","spatial-analysis-image","product-media"],cropAllowed:false,backgroundBehavior:"content",recommendedRatio:"Source ratio"};
}

export function isMediaAssignmentCompatible(asset:MediaAsset,slot:MediaSlotKey){return getMediaSlotContract(slot).acceptedSourceTypes.includes(asset.sourceType)}
export function assertMediaAssignmentCompatible(asset:MediaAsset,slot:MediaSlotKey){if(!isMediaAssignmentCompatible(asset,slot))throw new Error(`${asset.sourceType} media is not compatible with ${slot}.`)}
