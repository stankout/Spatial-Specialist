import {mkdir,readFile,writeFile} from "node:fs/promises";
import path from "node:path";

const registry=JSON.parse(await readFile(new URL("../src/data/procedural-scenes.json",import.meta.url),"utf8"));
const resolutions={"social-vertical":{width:1080,height:1920},"full-hd":{width:1920,height:1080},"quad-hd":{width:2560,height:1440},"4k-vertical":{width:2160,height:3840},"4k":{width:3840,height:2160}};
const [command="list",...args]=process.argv.slice(2);

if(command==="list"){
 console.log("AC procedural scenes");
 for(const scene of registry)console.log(`${scene.id}\t${scene.label}\t${scene.role}`);
 console.log(`\nExport sizes: ${Object.entries(resolutions).map(([name,size])=>`${name}=${size.width}x${size.height}`).join(", ")}`);
 process.exit(0);
}

if(command!=="render")fail("Use `npm run media:scene:list` or `npm run media:scene:render -- <scene-id> <size> [duration] [fps]`.");
const [sceneId,sizeName="full-hd",durationArg="12",fpsArg="30"]=args;
const scene=registry.find(item=>item.id===sceneId),size=resolutions[sizeName],duration=Number(durationArg),fps=Number(fpsArg);
if(!scene)fail(`Unknown scene "${sceneId}". Run npm run media:scene:list.`);
if(!size)fail(`Unknown size "${sizeName}". Choose: ${Object.keys(resolutions).join(", ")}.`);
if(!Number.isFinite(duration)||duration<1||duration>60)fail("Duration must be 1–60 seconds.");
if(![24,30,60].includes(fps))fail("FPS must be 24, 30, or 60.");
const outputDirectory=path.join(process.cwd(),".dev-data","scene-renders");
await mkdir(outputDirectory,{recursive:true});
const manifest={version:1,sceneId,size:sizeName,...size,duration,fps,frames:Math.round(duration*fps),transparent:false,source:"AC-native procedural scene",createdAt:new Date().toISOString(),status:"render-plan",note:"This deterministic plan is ready for a browser-frame capture adapter and optional FFmpeg encoding. It does not create or upscale a raster asset."};
const output=path.join(outputDirectory,`${sceneId}-${sizeName}.json`);
await writeFile(output,JSON.stringify(manifest,null,2),"utf8");
console.log(`Scene render plan saved: ${output}`);
console.log("No binary was rendered. Install FFmpeg and add a frame-capture adapter before production export.");

function fail(message){console.error(message);process.exit(1)}
