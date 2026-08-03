import type {CSSProperties} from "react";
import {MediaImage} from "@/components/media-image";
import {MotionVideo} from "@/components/motion-video";
import {ProceduralScene} from "@/components/procedural-scene";
import {resolveMediaPresentation,type MediaRenderContext} from "@/lib/media/presentation";
import {isMediaAssignmentCompatible} from "@/lib/media/slot-contracts";
import type {MediaAsset,MediaPresentation,MediaSlotKey} from "@/lib/media/types";

export function MotionMediaRenderer({asset,context,slot,presentation,fill=false,sizes="100vw",className,priority=false,alt="",controls=false,posterUrl}:{asset:MediaAsset;context:MediaRenderContext;slot?:MediaSlotKey;presentation?:MediaPresentation;fill?:boolean;sizes?:string;className?:string;priority?:boolean;alt?:string;controls?:boolean;posterUrl?:string|null}){
 if(slot&&!isMediaAssignmentCompatible(asset,slot))return null;
 const contract=resolveMediaPresentation(asset,context,slot,presentation),style={"--motion-media-opacity":String(contract.treatment.opacity),"--motion-media-brightness":String(contract.treatment.brightness),"--motion-media-contrast":String(contract.treatment.contrast),"--motion-media-saturation":String(contract.treatment.saturation),"--motion-media-blur":`${contract.treatment.blur}px`,"--motion-media-tint":contract.treatment.tint,"--motion-media-blend":contract.treatment.blendMode} as CSSProperties;
 if(asset.sourceType==="procedural-scene"&&asset.sceneId)return <span className={`motion-media motion-media-procedural${className?` ${className}`:""}`} style={style}><ProceduralScene sceneId={asset.sceneId} decorative={asset.decorative} label={alt||asset.title.en||asset.title.vi}/></span>;
 if(asset.sourceType==="uploaded-video")return <span className={`motion-media motion-media-video${className?` ${className}`:""}`} style={{...style,aspectRatio:fill?undefined:contract.aspectRatio}}><MotionVideo src={asset.url} mimeType={asset.mimeType} posterUrl={posterUrl} contract={contract} controls={controls}/></span>;
 if(asset.sourceType==="document"&&asset.mimeType==="application/pdf")return <a className={`motion-media motion-media-document${className?` ${className}`:""}`} href={asset.url} target="_blank" rel="noreferrer" style={style}>{asset.title.en||asset.title.vi||asset.originalFilename}</a>;
 if(asset.sourceType==="uploaded-image")return <span className={`motion-media motion-media-image${className?` ${className}`:""}`} style={style}><MediaImage asset={asset} context={context} slot={slot} presentation={presentation} fill={fill} sizes={sizes} priority={priority} alt={alt}/></span>;
 return null;
}
