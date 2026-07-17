import {mkdtemp,mkdir,readFile,rm,writeFile} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {afterEach,describe,expect,it} from "vitest";
import {assignMedia,getAssignedMedia,removeAssignment} from "@/lib/media/assignments";
import {getStudioAccess} from "@/lib/media/security";
import {LocalMediaStorageProvider} from "@/lib/media/storage";
import {validateImage} from "@/lib/media/validation";

const roots:string[]=[];async function root(){const value=await mkdtemp(path.join(os.tmpdir(),"spatial-media-"));roots.push(value);return value}afterEach(async()=>{await Promise.all(roots.splice(0).map(value=>rm(value,{recursive:true,force:true})))});
const png=Buffer.from([137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,2,0,0,0,3,8,6,0,0,0]);
describe("media library",()=>{
  it("uploads, lists, assigns, and removes a local portrait",async()=>{const directory=await root();const provider=new LocalMediaStorageProvider(directory);const asset=await provider.upload({buffer:png,filename:"portrait.png",mimeType:"image/png"});expect((await provider.list()).map(item=>item.id)).toContain(asset.id);expect(asset.width).toBe(2);expect(asset.height).toBe(3);await assignMedia("homepage.heroPortrait",asset.id,{mode:"cover",overlayStrength:.35},directory);expect((await getAssignedMedia("homepage.heroPortrait",directory))?.asset.url).toBe(asset.url);await removeAssignment("homepage.heroPortrait",directory);expect(await getAssignedMedia("homepage.heroPortrait",directory)).toBeNull()});
  it("recognizes versioned static assets",async()=>{const directory=await root();await mkdir(path.join(directory,"public","media","brand"),{recursive:true});await writeFile(path.join(directory,"public","media","brand","portrait.png"),png);const assets=await new LocalMediaStorageProvider(directory).list();expect(assets[0].id).toBe("static:brand/portrait.png");expect(assets[0].provider).toBe("static")});
  it("rejects executable or mismatched files",()=>{expect(()=>validateImage(Buffer.from("console.log('no')"),"image.png","image/png")).toThrow(/Only valid/);expect(()=>validateImage(png,"image.jpg","image/png")).toThrow(/extension/)});
  it("persists metadata outside the public upload directory",async()=>{const directory=await root();const provider=new LocalMediaStorageProvider(directory);await provider.upload({buffer:png,filename:"asset.png",mimeType:"image/png"});const metadata=JSON.parse(await readFile(path.join(directory,".dev-data","media-library.json"),"utf8"));expect(metadata).toHaveLength(1)});
  it("keeps production Studio writes disabled without real authentication",()=>{expect(getStudioAccess("production")).toMatchObject({enabled:false,writable:false})});
});
