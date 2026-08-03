import {spawnSync} from "node:child_process";
import {access,mkdir,stat} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

export const optimizationProfiles=Object.freeze({
  background:{outputRole:"background-delivery",audio:"remove",defaultMetadata:"privacy-safe",posterRequired:true},
  editorial:{outputRole:"editorial-delivery",audio:"preserve",defaultMetadata:"preserve",posterRequired:false},
  "muted-editorial":{outputRole:"muted-editorial-delivery",audio:"remove",defaultMetadata:"preserve",posterRequired:false},
});

const metadataPolicies=new Set(["preserve","privacy-safe"]);
const usage="Usage: npm run media:optimize -- --profile <background|editorial|muted-editorial> [--metadata <preserve|privacy-safe>] [--dry-run] <input-video> <output.mp4>";

export function parseOptimizationArgs(argv){
  const positional=[];
  let profileName=null,metadataPolicy=null,dryRun=false;
  for(let index=0;index<argv.length;index+=1){
    const value=argv[index];
    if(value==="--dry-run"){dryRun=true;continue}
    if(value==="--profile"){profileName=argv[++index]??null;continue}
    if(value.startsWith("--profile=")){profileName=value.slice("--profile=".length);continue}
    if(value==="--metadata"){metadataPolicy=argv[++index]??null;continue}
    if(value.startsWith("--metadata=")){metadataPolicy=value.slice("--metadata=".length);continue}
    if(value.startsWith("--"))throw new Error(`Unknown option: ${value}. ${usage}`);
    positional.push(value);
  }
  const profile=optimizationProfiles[profileName];
  if(!profile)throw new Error(`Unknown or missing optimization profile: ${profileName??"none"}. ${usage}`);
  if(metadataPolicy&&!metadataPolicies.has(metadataPolicy))throw new Error(`Unknown metadata policy: ${metadataPolicy}. Choose preserve or privacy-safe.`);
  const [input,output,...extra]=positional;
  if(!input||!output||extra.length)throw new Error(usage);
  const inputPath=path.resolve(input),outputPath=path.resolve(output);
  if(inputPath.toLowerCase()===outputPath.toLowerCase())throw new Error("Source and delivery output must use different paths. The optimizer never overwrites the source master.");
  if(path.extname(outputPath).toLowerCase()!==".mp4")throw new Error("Delivery output must use the .mp4 extension.");
  return {profileName,profile,input:inputPath,output:outputPath,metadataPolicy:metadataPolicy??profile.defaultMetadata,dryRun};
}

export function buildFfmpegArgs(plan){
  const args=["-y","-i",plan.input,"-map","0:v:0"];
  if(plan.profile.audio==="preserve")args.push("-map","0:a?", "-c:a","aac","-b:a","160k");
  else args.push("-an");
  if(plan.metadataPolicy==="privacy-safe")args.push("-map_metadata","-1");
  else args.push("-map_metadata","0");
  args.push("-movflags","+faststart","-vf","scale=min(1920\\,iw):min(1920\\,ih):force_original_aspect_ratio=decrease:force_divisible_by=2","-c:v","libx264","-preset","slow","-crf","23","-pix_fmt","yuv420p",plan.output);
  return args;
}

export function assertFfmpegAvailable(run=spawnSync){
  for(const command of ["ffmpeg","ffprobe"]){
    const result=run(command,["-version"],{stdio:"ignore"});
    if(result.error||result.status!==0)throw new Error("FFmpeg and ffprobe are required for optional video optimization. Install both, confirm they are on PATH, then rerun this command. The website does not depend on them at runtime.");
  }
}

export async function runOptimizer(argv,{run=spawnSync,log=console.log}={}){
  const plan=parseOptimizationArgs(argv);
  await access(plan.input);
  const sourceBefore=await stat(plan.input),args=buildFfmpegArgs(plan);
  if(plan.dryRun){
    log(JSON.stringify({profile:plan.profileName,outputRole:plan.profile.outputRole,audio:plan.profile.audio,metadata:plan.metadataPolicy,posterRequired:plan.profile.posterRequired,source:plan.input,output:plan.output,ffmpegArgs:args}));
    return {plan,args,sourceSize:sourceBefore.size,dryRun:true};
  }
  assertFfmpegAvailable(run);
  await mkdir(path.dirname(plan.output),{recursive:true});
  const result=run("ffmpeg",args,{stdio:"inherit",shell:false});
  if(result.error||result.status!==0)throw new Error("FFmpeg optimization failed; the source master was not changed.");
  const [sourceAfter,outputStats]=await Promise.all([stat(plan.input),stat(plan.output)]);
  if(sourceAfter.size!==sourceBefore.size||sourceAfter.mtimeMs!==sourceBefore.mtimeMs)throw new Error("Source master changed during optimization. Do not use this derivative until the source is reviewed.");
  log(`Created ${plan.profile.outputRole}: ${sourceBefore.size} source bytes -> ${outputStats.size} delivery bytes. Audio=${plan.profile.audio}; metadata=${plan.metadataPolicy}; source master unchanged.${plan.profile.posterRequired?" A separate approved poster is still required.":""}`);
  return {plan,args,sourceSize:sourceBefore.size,outputSize:outputStats.size,dryRun:false};
}

const invokedPath=process.argv[1]?path.resolve(process.argv[1]):null;
if(invokedPath===path.resolve(fileURLToPath(import.meta.url))){
  runOptimizer(process.argv.slice(2)).catch(error=>{console.error(error instanceof Error?error.message:String(error));process.exitCode=1});
}
