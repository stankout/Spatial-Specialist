import {mkdtemp,readFile,stat,writeFile} from "node:fs/promises";
import {tmpdir} from "node:os";
import path from "node:path";
import {describe,expect,it} from "vitest";
import {assertFfmpegAvailable,buildFfmpegArgs,parseOptimizationArgs,runOptimizer} from "../scripts/media-optimize.mjs";

describe("media optimizer profiles",()=>{
 it("builds an explicit privacy-safe muted background derivative",()=>{
  const plan=parseOptimizationArgs(["--profile","background","source.mov","delivery.mp4"]),args=buildFfmpegArgs(plan);
  expect(plan.profile.outputRole).toBe("background-delivery");
  expect(plan.profile.posterRequired).toBe(true);
  expect(plan.metadataPolicy).toBe("privacy-safe");
  expect(args).toContain("-an");
  expect(args.slice(args.indexOf("-map_metadata"),args.indexOf("-map_metadata")+2)).toEqual(["-map_metadata","-1"]);
 });

 it("preserves editorial audio and metadata by default",()=>{
  const plan=parseOptimizationArgs(["--profile=editorial","source.mov","delivery.mp4"]),args=buildFfmpegArgs(plan);
  expect(plan.profile.outputRole).toBe("editorial-delivery");
  expect(plan.metadataPolicy).toBe("preserve");
  expect(args).not.toContain("-an");
  expect(args).toContain("0:a?");
  expect(args.slice(args.indexOf("-map_metadata"),args.indexOf("-map_metadata")+2)).toEqual(["-map_metadata","0"]);
 });
 it("allows an explicit privacy-safe editorial metadata derivative",()=>{
  const plan=parseOptimizationArgs(["--profile","editorial","--metadata","privacy-safe","source.mov","delivery.mp4"]),args=buildFfmpegArgs(plan);
  expect(plan.metadataPolicy).toBe("privacy-safe");
  expect(args.slice(args.indexOf("-map_metadata"),args.indexOf("-map_metadata")+2)).toEqual(["-map_metadata","-1"]);
  expect(args[args.indexOf("-vf")+1]).toBe("scale=min(1920\\,iw):min(1920\\,ih):force_original_aspect_ratio=decrease:force_divisible_by=2");
 });

 it("removes audio only for an explicitly muted editorial derivative",()=>{
  const plan=parseOptimizationArgs(["--profile","muted-editorial","source.mov","delivery.mp4"]),args=buildFfmpegArgs(plan);
  expect(plan.profile.outputRole).toBe("muted-editorial-delivery");
  expect(plan.metadataPolicy).toBe("preserve");
  expect(args).toContain("-an");
 });

 it("rejects unknown profiles, policies, and destructive source overwrite",()=>{
  expect(()=>parseOptimizationArgs(["--profile","unknown","source.mov","delivery.mp4"])).toThrow(/Unknown or missing optimization profile/);
  expect(()=>parseOptimizationArgs(["--profile","editorial","--metadata","mystery","source.mov","delivery.mp4"])).toThrow(/Unknown metadata policy/);
  expect(()=>parseOptimizationArgs(["--profile","editorial","same.mp4","same.mp4"])).toThrow(/never overwrites the source master/);
 });

 it("reports missing FFmpeg as a controlled optional-tool failure",()=>{
  expect(()=>assertFfmpegAvailable(()=>({status:1,error:new Error("not found")}))).toThrow(/FFmpeg and ffprobe are required/);
 });

 it("dry-runs against a temporary fixture without changing the source or creating a derivative",async()=>{
  const root=await mkdtemp(path.join(tmpdir(),"ac-media-optimizer-")),source=path.join(root,"fixture.mov"),output=path.join(root,"delivery.mp4");
  await writeFile(source,"safe temporary fixture","utf8");
  const before=await stat(source),content=await readFile(source,"utf8"),messages=[];
  const result=await runOptimizer(["--profile","editorial","--dry-run",source,output],{log:message=>messages.push(message)});
  const after=await stat(source);
  expect(result.dryRun).toBe(true);
  expect(await readFile(source,"utf8")).toBe(content);
  expect({size:after.size,mtimeMs:after.mtimeMs}).toEqual({size:before.size,mtimeMs:before.mtimeMs});
  await expect(stat(output)).rejects.toMatchObject({code:"ENOENT"});
  expect(JSON.parse(messages[0])).toMatchObject({profile:"editorial",outputRole:"editorial-delivery",audio:"preserve",metadata:"preserve"});
 });
});
