import {Children,isValidElement,type ReactElement,type ReactNode} from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {describe,expect,it} from "vitest";
import {MediaImage} from "@/components/media-image";
import {MotionMediaRenderer} from "@/components/motion-media-renderer";
import {MotionVideo,resolveMotionVideoMode} from "@/components/motion-video";
import {ProceduralScene} from "@/components/procedural-scene";
import {resolveMediaPresentation} from "@/lib/media/presentation";
import {mediaAssetSchema,type MediaAsset,type MediaPresentation} from "@/lib/media/types";

const now="2026-07-30T00:00:00.000Z";
const presentation:MediaPresentation={mode:"cover",overlayStrength:.35,overlayColor:"#111111",topGradient:0,bottomGradient:0,panelOpacity:0,textShadow:false,focalX:.5,focalY:.5,startPosition:0,endPosition:1,textContrastMode:"automatic",enabled:true,reducedMotionFallback:"static-image"};
function asset(overrides:Partial<MediaAsset>={}):MediaAsset{return mediaAssetSchema.parse({id:"asset",filename:"asset.jpg",originalFilename:"asset.jpg",url:"/asset.jpg",provider:"local",mimeType:"image/jpeg",width:1600,height:1200,fileSize:100,title:{en:"Asset",vi:""},alt:{en:"Asset",vi:""},caption:{en:"",vi:""},focalPoint:{x:.5,y:.5},privacyReviewed:true,rightsStatus:"owner-created",approvedForPublicUse:true,createdAt:now,updatedAt:now,...overrides})}
function onlyChild(element:ReactElement<{children?:ReactNode}>){const child=Children.only(element.props.children);if(!isValidElement(child))throw new Error("Expected one media child.");return child}

describe("Motion media rendering",()=>{
 it("preserves explicit video playback and poster attributes",()=>{
  const videoAsset=asset({sourceType:"uploaded-video",mimeType:"video/mp4",url:"/background.mp4",mediaRole:"background-video",decorative:true,videoReadiness:"web-ready"});
  const contract=resolveMediaPresentation(videoAsset,"public","homepage.heroVideo",presentation);
  const html=renderToStaticMarkup(<MotionVideo src={videoAsset.url} mimeType={videoAsset.mimeType} posterUrl="/poster.jpg" contract={contract}/>);
    expect(html).toContain('autoPlay=""');
  expect(html).toContain("loop");
  expect(html).toContain("muted");
  expect(html).toContain('poster="/poster.jpg"');
  expect(html).toContain('preload="metadata"');
 });

 it("uses a poster or hides safely for reduced motion and unavailable sources",()=>{
  const video=resolveMediaPresentation(asset({sourceType:"uploaded-video",mimeType:"video/mp4",url:"/background.mp4",mediaRole:"background-video",decorative:true}),"public","homepage.heroVideo",presentation).video;
  expect(resolveMotionVideoMode(video,{reducedMotion:true,hasPoster:true})).toBe("poster");
  expect(resolveMotionVideoMode(video,{reducedMotion:true,hasPoster:false})).toBe("hidden");
  expect(resolveMotionVideoMode(video,{sourceFailed:true,hasPoster:true})).toBe("poster");
  expect(resolveMotionVideoMode(video,{sourceFailed:true,hasPoster:false})).toBe("hidden");
  expect(resolveMotionVideoMode({...video,autoplay:false},{reducedMotion:true,hasPoster:true})).toBe("video");
 });

 it("dispatches supported media classes to their governed renderer",()=>{
  const image=MotionMediaRenderer({asset:asset(),context:"public"}) as ReactElement<{children?:ReactNode}>;
  expect(onlyChild(image).type).toBe(MediaImage);

  const video=MotionMediaRenderer({asset:asset({sourceType:"uploaded-video",mimeType:"video/mp4",url:"/video.mp4"}),context:"public"}) as ReactElement<{children?:ReactNode}>;
  expect(onlyChild(video).type).toBe(MotionVideo);

  const document=MotionMediaRenderer({asset:asset({sourceType:"document",mimeType:"application/pdf",url:"/report.pdf",mediaRole:"document"}),context:"public"});
  expect(isValidElement(document)&&document.type).toBe("a");

  const procedural=MotionMediaRenderer({asset:asset({id:"procedural:spatial-field",sourceType:"procedural-scene",provider:"procedural",mimeType:"application/x-ac-scene+json",url:"ac-scene://spatial-field",sceneId:"spatial-field",mediaRole:"section-backdrop",decorative:true}),context:"public"}) as ReactElement<{children?:ReactNode}>;
  expect(onlyChild(procedural).type).toBe(ProceduralScene);
 });

 it("fails closed for incompatible or unsupported renderer inputs",()=>{
  const procedural=asset({id:"procedural:spatial-field",sourceType:"procedural-scene",provider:"procedural",mimeType:"application/x-ac-scene+json",url:"ac-scene://spatial-field",sceneId:"spatial-field",mediaRole:"section-backdrop",decorative:true});
  expect(MotionMediaRenderer({asset:procedural,context:"public",slot:"spatial.compassPortrait"})).toBeNull();
  expect(MotionMediaRenderer({asset:asset({sourceType:"embed",url:"https://example.com/embed"}),context:"public"})).toBeNull();
  expect(MotionMediaRenderer({asset:asset({sourceType:"document",mimeType:"image/jpeg",mediaRole:"document"}),context:"public"})).toBeNull();
 });
});
