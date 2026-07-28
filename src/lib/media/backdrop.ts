import type {MediaAsset,MediaPresentation} from "@/lib/media/types";

export const backgroundVideoPolicy={muted:true,autoPlay:true,loop:true,playsInline:true} as const;

export function isBackdropVideo(asset:Pick<MediaAsset,"mimeType">){return asset.mimeType.startsWith("video/")}

export function presentationModeForBackdrop(asset:Pick<MediaAsset,"mimeType">):MediaPresentation["mode"]{
  return isBackdropVideo(asset)?"scroll-pan-video":"scroll-pan-image";
}

export function shouldPauseBackdropVideo(reducedMotion:boolean){return reducedMotion}

export function safePlaybackSpeed(value:number){return ([.5,.75,1,1.25] as const).includes(value as .5|.75|1|1.25)?value:1}
