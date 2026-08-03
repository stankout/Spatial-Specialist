"use client";

import Image from "next/image";
import {useEffect,useRef,useState} from "react";
import type {ResolvedMediaPresentation} from "@/lib/media/presentation";

export type MotionVideoMode="video"|"poster"|"hidden";
export function resolveMotionVideoMode(video:ResolvedMediaPresentation["video"],{reducedMotion=false,constrainedMobile=false,sourceFailed=false,hasPoster=false}:{reducedMotion?:boolean;constrainedMobile?:boolean;sourceFailed?:boolean;hasPoster?:boolean}={}):MotionVideoMode{
 const motionBlocked=video.autoplay&&(reducedMotion||constrainedMobile&&video.hideDecorativeOnMobile);
 if(sourceFailed||motionBlocked)return hasPoster?"poster":"hidden";
 return "video";
}

export function MotionVideo({src,mimeType,posterUrl,contract,className,controls=false}:{src:string;mimeType:string;posterUrl?:string|null;contract:ResolvedMediaPresentation;className?:string;controls?:boolean}){
 const ref=useRef<HTMLVideoElement>(null),[runtimeFallback,setRuntimeFallback]=useState(false),[sourceFailed,setSourceFailed]=useState(false);
 useEffect(()=>{const video=ref.current;if(!video)return;const reduced=window.matchMedia("(prefers-reduced-motion: reduce)"),mobile=window.matchMedia("(max-width: 700px) and (max-resolution: 2dppx)");const sync=()=>{const shouldFallback=(reduced.matches||mobile.matches&&contract.video.hideDecorativeOnMobile)&&contract.video.autoplay;setRuntimeFallback(shouldFallback);if(shouldFallback)video.pause();else if(contract.video.autoplay&&!document.hidden)void video.play().catch(()=>undefined)};const observer=new IntersectionObserver(entries=>{if(!entries[0]?.isIntersecting)video.pause();else sync()},{rootMargin:"160px"});observer.observe(video);document.addEventListener("visibilitychange",sync);reduced.addEventListener("change",sync);mobile.addEventListener("change",sync);sync();return()=>{observer.disconnect();document.removeEventListener("visibilitychange",sync);reduced.removeEventListener("change",sync);mobile.removeEventListener("change",sync)}},[contract.video.autoplay,contract.video.hideDecorativeOnMobile]);
 const mode=resolveMotionVideoMode(contract.video,{reducedMotion:runtimeFallback,sourceFailed,hasPoster:Boolean(posterUrl)});
 if(mode==="poster")return <span className={`motion-video-fallback${className?` ${className}`:""}`}><Image src={posterUrl!} alt="" fill sizes="100vw"/></span>;
 if(mode==="hidden")return null;
 return <video ref={ref} className={className} autoPlay={contract.video.autoplay} loop={contract.video.loop} muted={contract.video.muted} playsInline={contract.video.playsInline} preload={contract.video.preload} poster={posterUrl||undefined} controls={controls} style={{objectFit:contract.fit,objectPosition:contract.position,opacity:contract.treatment.opacity,filter:`brightness(${contract.treatment.brightness}) contrast(${contract.treatment.contrast}) saturate(${contract.treatment.saturation}) blur(${contract.treatment.blur}px)`,mixBlendMode:contract.treatment.blendMode}} onError={()=>setSourceFailed(true)} onLoadedMetadata={event=>{event.currentTarget.playbackRate=contract.video.playbackRate}}><source src={src} type={mimeType}/></video>
}
