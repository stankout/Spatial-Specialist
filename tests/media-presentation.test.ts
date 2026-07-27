import {describe,expect,it} from "vitest";
import {getMediaQuality,getMediaRenderPolicy} from "@/lib/media/presentation";
import {mediaAssetSchema} from "@/lib/media/types";

function asset(mediaRole:"owner-portrait"|"compass-portrait"|"background"|"general-media",width=1600,height=2400,mimeType:"image/jpeg"|"image/png"="image/jpeg"){return mediaAssetSchema.parse({id:"a",filename:"a.jpg",originalFilename:"a.jpg",url:"/a.jpg",provider:"local",mimeType,width,height,fileSize:10,title:{en:"",vi:""},alt:{en:"",vi:""},caption:{en:"",vi:""},focalPoint:{x:.5,y:.5},mediaRole,createdAt:"2026-01-01",updatedAt:"2026-01-01"})}
describe("media presentation policy",()=>{
 it("never crops source previews",()=>{for(const role of ["general-media","background","owner-portrait","compass-portrait"] as const)expect(getMediaRenderPolicy(asset(role),"source-preview").fit).toBe("contain");expect(getMediaRenderPolicy(asset("general-media",1600,1200,"image/png"),"studio").fit).toBe("contain")});
 it("allows portrait crop only in an explicit portrait slot",()=>{const portrait=asset("owner-portrait");expect(getMediaRenderPolicy(portrait,"slot-preview","homepage.heroPortrait").fit).toBe("cover");expect(getMediaRenderPolicy(portrait,"slot-preview","homepage.featuredMedia").fit).toBe("contain")});
 it("separates canonical and ambient Story Backdrop fit",()=>{const background=asset("background");expect(getMediaRenderPolicy(background,"story-backdrop-primary","homepage.storyBackdropDesktop").fit).toBe("contain");expect(getMediaRenderPolicy(background,"story-backdrop-ambient","homepage.storyBackdropDesktop").fit).toBe("cover")});
 it("keeps the SPACE compass portrait complete and bottom centered",()=>{const policy=getMediaRenderPolicy(asset("compass-portrait"),"public","spatial.compassPortrait");expect(policy.fit).toBe("contain");expect(policy.position).toBe("50% 100%")});
 it("labels source quality without implying upscaling",()=>{expect(getMediaQuality({width:4000,height:6000})).toBe("4k-ready");expect(getMediaQuality({width:2560,height:1440})).toBe("large-display-ready");expect(getMediaQuality({width:1200,height:800})).toBe("web-ready");expect(getMediaQuality({width:640,height:480})).toBe("below-web-ready")});
});
