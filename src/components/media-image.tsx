import Image from "next/image";
import type {CSSProperties} from "react";
import {resolveMediaPresentation,type MediaRenderContext} from "@/lib/media/presentation";
import type {MediaAsset,MediaPresentation,MediaSlotKey} from "@/lib/media/types";

export function MediaImage({asset,context,slot,presentation,fill=false,sizes="100vw",className,priority=false,alt=""}:{asset:MediaAsset;context:MediaRenderContext;slot?:MediaSlotKey;presentation?:MediaPresentation;fill?:boolean;sizes?:string;className?:string;priority?:boolean;alt?:string}){
 const policy=resolveMediaPresentation(asset,context,slot,presentation),style={objectFit:policy.fit,objectPosition:policy.position} satisfies CSSProperties;
 if(fill)return <Image src={asset.url} alt={alt} fill sizes={sizes} className={className} style={style} priority={priority} loading={priority?"eager":undefined} unoptimized={asset.provider==="local"}/>;
 return <Image src={asset.url} alt={alt} width={asset.width||1} height={asset.height||1} sizes={sizes} className={className} style={{...style,width:"100%",height:"auto"}} priority={priority} loading={priority?"eager":undefined} unoptimized={asset.provider==="local"}/>;
}
