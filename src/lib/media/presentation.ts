import type {CSSProperties} from "react";
import type {MediaAsset,MediaSlotKey} from "@/lib/media/types";

export type MediaRenderContext="studio"|"source-preview"|"slot-preview"|"public"|"story-backdrop-primary"|"story-backdrop-ambient";
export type MediaQuality="below-web-ready"|"web-ready"|"large-display-ready"|"4k-ready";
const portraitRoles=new Set<MediaAsset["mediaRole"]>(["owner-portrait","page-portrait"]);
const alwaysContainRoles=new Set<MediaAsset["mediaRole"]>(["compass-portrait","compass-diagram","diagram","document-reference","logo","download-asset","general-media","content-image","inline-image","spatial-analysis-image","inspection-image","video-thumbnail","product-media"]);

export function getMediaQuality(asset:Pick<MediaAsset,"width"|"height">):MediaQuality{const long=Math.max(asset.width,asset.height),short=Math.min(asset.width,asset.height);if(long>=3840&&short>=2160)return "4k-ready";if(long>=2560&&short>=1440)return "large-display-ready";if(long>=1200&&short>=800)return "web-ready";return "below-web-ready"}
export function getMediaOrientation(asset:Pick<MediaAsset,"width"|"height">){const ratio=asset.height?asset.width/asset.height:1;return ratio<.8?"portrait":ratio>1.25?"landscape":"square"}
export function getMediaAspectRatio(asset:Pick<MediaAsset,"width"|"height">){return asset.width>0&&asset.height>0?`${asset.width} / ${asset.height}`:"1 / 1"}
export function isPortraitSlot(slot?:MediaSlotKey){return Boolean(slot&&slot.toLowerCase().includes("portrait"))}
export function isLargeBackdropSlot(slot?:MediaSlotKey){return Boolean(slot&&/(background|backdrop)/i.test(slot))}
export function getMediaRenderPolicy(asset:MediaAsset,context:MediaRenderContext,slot?:MediaSlotKey){
 const portrait=portraitRoles.has(asset.mediaRole),compassPortrait=asset.mediaRole==="compass-portrait"||slot==="spatial.compassPortrait",referenceLike=alwaysContainRoles.has(asset.mediaRole)||/affidavit|document|reference|logo/i.test(`${asset.originalFilename} ${asset.mediaRole}`)||(asset.mimeType==="image/png"&&!portrait),cropAllowed=portrait&&isPortraitSlot(slot);
 let fit:CSSProperties["objectFit"]="contain";
 if(context==="story-backdrop-ambient")fit="cover";
 else if(context==="public"&&isLargeBackdropSlot(slot))fit="cover";
 else if((context==="public"||context==="slot-preview")&&cropAllowed&&!referenceLike)fit="cover";
 if(context==="studio"||context==="source-preview"||context==="story-backdrop-primary"||referenceLike)fit="contain";
 return {fit,cropAllowed:context==="story-backdrop-ambient"||cropAllowed,aspectRatio:getMediaAspectRatio(asset),orientation:getMediaOrientation(asset),quality:getMediaQuality(asset),position:compassPortrait?"50% 100%":`${asset.focalPoint.x*100}% ${asset.focalPoint.y*100}%`}
}
export function getSlotIntent(slot:MediaSlotKey){if(slot.includes("storyBackdrop"))return {group:"Story Backdrop",guidance:"Best for vertical 9:16 artwork. Rendered as one continuous page backdrop; full composition is preserved as much as possible."};if(slot.toLowerCase().includes("portrait"))return {group:"Portraits",guidance:slot.includes("compass")?"Compass portrait is shown proportionally without crop.":"Portrait media; controlled crop is allowed only in this portrait slot."};if(slot.toLowerCase().includes("background"))return {group:"Backgrounds",guidance:"Shown uncropped in Studio. Public crop behavior follows this specific background slot."};if(slot.toLowerCase().includes("video"))return {group:"Video",guidance:"Video or poster media for this page context."};if(/compass|diagram|report/i.test(slot))return {group:"Compass / Diagram / Reference",guidance:"Reference media is preserved proportionally and is not cropped."};return {group:"Supporting Visuals",guidance:"Supporting editorial media; original composition is preserved by default."}}
