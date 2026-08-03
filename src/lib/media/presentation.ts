import type {CSSProperties} from "react";
import type {MediaAsset,MediaPresentation,MediaSlotKey} from "@/lib/media/types";
import {getMediaSlotContract} from "@/lib/media/slot-contracts";

export type MediaRenderContext="studio"|"source-preview"|"slot-preview"|"public"|"story-backdrop-primary"|"story-backdrop-ambient";
export type MediaQuality="below-web-ready"|"web-ready"|"large-display-ready"|"4k-ready"|"resolution-independent";
const portraitRoles=new Set<MediaAsset["mediaRole"]>(["owner-portrait","service-portrait","page-portrait"]);
const alwaysContainRoles=new Set<MediaAsset["mediaRole"]>(["compass-portrait","compass-diagram","diagram","document","document-reference","logo","download-asset","general-media","content-image","inline-image","spatial-analysis-image","inspection-image","video-thumbnail","product-media"]);
const backgroundRoles=new Set<MediaAsset["mediaRole"]>(["background","section-background","section-backdrop","story-backdrop","scroll-background-9-16","background-video","ambient-video","decorative-motion","hud-overlay"]);

export type ResolvedMediaPresentation={sourceType:MediaAsset["sourceType"];fit:"contain"|"cover";cropAllowed:boolean;preserveIntrinsicRatio:boolean;preserveTransparency:boolean;aspectRatio:string;orientation:ReturnType<typeof getMediaOrientation>;quality:MediaQuality;position:string;backgroundBehavior:"section"|"hero"|"whole-main-page"|"decorative-layer"|"ambient-layer"|"content";treatment:{opacity:number;brightness:number;contrast:number;saturation:number;blur:number;tint:string;blendMode:NonNullable<MediaPresentation["blendMode"]>;overlayStrength:number;overlayColor:string};video:{autoplay:boolean;loop:boolean;muted:boolean;playsInline:boolean;playbackRate:number;preload:"none"|"metadata"|"auto";posterAssetId:string|null;reducedMotionFallback:"none"|"static-image";hideDecorativeOnMobile:boolean}};

export function getMediaQuality(asset:Pick<MediaAsset,"width"|"height">&Partial<Pick<MediaAsset,"sourceType">>):MediaQuality{if(asset.sourceType==="procedural-scene")return "resolution-independent";const long=Math.max(asset.width,asset.height),short=Math.min(asset.width,asset.height);if(long>=3840&&short>=2160)return "4k-ready";if(long>=2560&&short>=1440)return "large-display-ready";if(long>=1200&&short>=800)return "web-ready";return "below-web-ready"}
export function getMediaOrientation(asset:Pick<MediaAsset,"width"|"height">):"portrait"|"landscape"|"square"{const ratio=asset.height?asset.width/asset.height:1;return ratio<.8?"portrait":ratio>1.25?"landscape":"square"}
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

export function resolveMediaPresentation(asset:MediaAsset,context:MediaRenderContext,slot?:MediaSlotKey,presentation?:MediaPresentation):ResolvedMediaPresentation{
 const legacy=getMediaRenderPolicy(asset,context,slot),slotContract=slot?getMediaSlotContract(slot):null,referenceLike=alwaysContainRoles.has(asset.mediaRole)||asset.sourceType==="document",portrait=portraitRoles.has(asset.mediaRole),background=backgroundRoles.has(asset.mediaRole)||Boolean(slotContract&&slotContract.backgroundBehavior!=="content");
 const explicitFit=presentation?.fit,requestedFit=explicitFit==="source"?"contain":explicitFit;
 const cropAllowed=Boolean(!referenceLike&&(presentation?.cropAllowed??slotContract?.cropAllowed??legacy.cropAllowed));
 let fit:ResolvedMediaPresentation["fit"]=requestedFit??legacy.fit??"contain";
 if(!cropAllowed&&fit==="cover")fit="contain";
 if((context==="studio"||context==="source-preview")&&!portrait)fit="contain";
 const alignment=presentation?.semanticAlignment,position=alignment==="top"?"50% 0%":alignment==="bottom"||alignment==="portrait-bottom"?"50% 100%":alignment==="left"?"0% 50%":alignment==="right"?"100% 50%":presentation?`${presentation.focalX*100}% ${presentation.focalY*100}%`:legacy.position;
 const decorative=asset.decorative||background;
 return {sourceType:asset.sourceType,fit,cropAllowed,preserveIntrinsicRatio:fit==="contain",preserveTransparency:asset.mimeType==="image/png"||asset.mimeType==="image/svg+xml",aspectRatio:legacy.aspectRatio,orientation:legacy.orientation,quality:legacy.quality,position,backgroundBehavior:presentation?.backgroundBehavior??slotContract?.backgroundBehavior??(background?"decorative-layer":"content"),treatment:{opacity:presentation?.opacity??1,brightness:presentation?.brightness??1,contrast:presentation?.contrast??1,saturation:presentation?.saturation??1,blur:presentation?.blur??0,tint:presentation?.tint??"transparent",blendMode:presentation?.blendMode??"normal",overlayStrength:presentation?.overlayStrength??.35,overlayColor:presentation?.overlayColor??"#111111"},video:{autoplay:decorative?(presentation?.autoplay??true):false,loop:decorative?(presentation?.loop??true):false,muted:decorative?true:(presentation?.muted??false),playsInline:presentation?.playsInline??true,playbackRate:presentation?.playbackRate??1,preload:presentation?.preload??(decorative?"metadata":"none"),posterAssetId:asset.posterAssetId??null,reducedMotionFallback:presentation?.reducedMotionFallback??"static-image",hideDecorativeOnMobile:presentation?.hideDecorativeOnMobile??decorative}};
}

export function isSafeBackgroundVideoContract(contract:ResolvedMediaPresentation){return contract.sourceType==="uploaded-video"&&contract.video.autoplay&&contract.video.muted&&contract.video.loop&&contract.video.playsInline}
export function getSlotIntent(slot:MediaSlotKey){if(slot.includes("storyBackdrop"))return {group:"Story Backdrop",guidance:"Best for vertical 9:16 artwork. Rendered as one continuous page backdrop; full composition is preserved as much as possible."};if(slot.toLowerCase().includes("portrait"))return {group:"Portraits",guidance:slot.includes("compass")?"Compass portrait is shown proportionally without crop.":"Portrait media; controlled crop is allowed only in this portrait slot."};if(slot.toLowerCase().includes("background"))return {group:"Backgrounds",guidance:"Shown uncropped in Studio. Public crop behavior follows this specific background slot."};if(slot.toLowerCase().includes("video"))return {group:"Video",guidance:"Video or poster media for this page context."};if(/compass|diagram|report/i.test(slot))return {group:"Compass / Diagram / Reference",guidance:"Reference media is preserved proportionally and is not cropped."};return {group:"Supporting Visuals",guidance:"Supporting editorial media; original composition is preserved by default."}}
