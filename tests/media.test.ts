import {mkdtemp,mkdir,readFile,rm,writeFile} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {afterEach,describe,expect,it} from "vitest";
import {assignMedia,getAssignedMedia,removeAssignment,saveDraftAssignment} from "@/lib/media/assignments";
import {getStudioAccess} from "@/lib/media/security";
import {LocalMediaStorageProvider} from "@/lib/media/storage";
import {validateImage} from "@/lib/media/validation";

const roots:string[]=[];
async function root(){const value=await mkdtemp(path.join(os.tmpdir(),"spatial-media-"));roots.push(value);return value}
afterEach(async()=>{await Promise.all(roots.splice(0).map(value=>rm(value,{recursive:true,force:true})))});
const png=Buffer.from([137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,2,0,0,0,3,8,6,0,0,0]);
const presentation={mode:"cover" as const,overlayStrength:.35,overlayColor:"#111111",topGradient:0,bottomGradient:0,panelOpacity:0,textShadow:false,focalX:.5,focalY:.5,startPosition:0,endPosition:1,textContrastMode:"automatic" as const,enabled:true,reducedMotionFallback:"static-image" as const};
async function approve(provider:LocalMediaStorageProvider,id:string){await provider.updateMetadata(id,{approvedForPublicUse:true,privacyReviewed:true,rightsStatus:"owner-created",reviewStatus:"ready"} as never)}

describe("media library",()=>{
 it("requires privacy, rights, and public approval",async()=>{const directory=await root(),provider=new LocalMediaStorageProvider(directory),asset=await provider.upload({buffer:png,filename:"portrait.png",mimeType:"image/png"});await expect(assignMedia("spatial.compassPortrait",asset.id,presentation,directory)).rejects.toThrow(/privacy, rights, and public-use/);await approve(provider,asset.id);await assignMedia("spatial.compassPortrait",asset.id,presentation,directory);expect((await getAssignedMedia("spatial.compassPortrait",directory))?.asset.id).toBe(asset.id)});
 it("keeps SPACE drafts isolated from the Homepage portrait",async()=>{const directory=await root(),provider=new LocalMediaStorageProvider(directory),home=await provider.upload({buffer:png,filename:"home.png",mimeType:"image/png"}),space=await provider.upload({buffer:png,filename:"space.png",mimeType:"image/png"});await approve(provider,home.id);await assignMedia("homepage.heroPortrait",home.id,presentation,directory);await saveDraftAssignment("spatial.compassPortrait",space.id,presentation,directory);expect((await getAssignedMedia("homepage.heroPortrait",directory))?.asset.id).toBe(home.id);expect(await getAssignedMedia("spatial.compassPortrait",directory)).toBeNull()});
 it("protects occupied assignments",async()=>{const directory=await root(),provider=new LocalMediaStorageProvider(directory),first=await provider.upload({buffer:png,filename:"first.png",mimeType:"image/png"}),second=await provider.upload({buffer:png,filename:"second.png",mimeType:"image/png"});await approve(provider,first.id);await approve(provider,second.id);await assignMedia("homepage.heroPortrait",first.id,presentation,directory);await expect(assignMedia("homepage.heroPortrait",second.id,presentation,directory)).rejects.toThrow(/Explicit replacement/)});
 it("recognizes versioned static assets",async()=>{const directory=await root();await mkdir(path.join(directory,"public","media","brand"),{recursive:true});await writeFile(path.join(directory,"public","media","brand","portrait.png"),png);const assets=await new LocalMediaStorageProvider(directory).list();expect(assets[0].id).toBe("static:brand/portrait.png")});
 it("rejects executable or mismatched files",()=>{expect(()=>validateImage(Buffer.from("console.log('no')"),"image.png","image/png")).toThrow(/Only valid/);expect(()=>validateImage(png,"image.jpg","image/png")).toThrow(/extension/)});
 it("persists metadata outside public uploads",async()=>{const directory=await root();await new LocalMediaStorageProvider(directory).upload({buffer:png,filename:"asset.png",mimeType:"image/png"});expect(JSON.parse(await readFile(path.join(directory,".dev-data","media-library.json"),"utf8"))).toHaveLength(1)});
 it("keeps production Studio writes disabled without authentication",()=>{expect(getStudioAccess("production")).toMatchObject({enabled:false,writable:false})});
 it("removes an assignment cleanly",async()=>{const directory=await root(),provider=new LocalMediaStorageProvider(directory),asset=await provider.upload({buffer:png,filename:"portrait.png",mimeType:"image/png"});await approve(provider,asset.id);await assignMedia("spatial.compassPortrait",asset.id,presentation,directory);await removeAssignment("spatial.compassPortrait",directory);expect(await getAssignedMedia("spatial.compassPortrait",directory)).toBeNull()});
});
