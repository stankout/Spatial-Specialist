import {z} from "zod";
import sceneData from "@/data/procedural-scenes.json";

export const proceduralSceneIdSchema=z.enum(["ac-ambient-intelligence","market-network","spatial-field","global-intelligence","security-grid","cyber-archive","astral-tech","signal-terminal"]);
export const proceduralSceneSchema=z.object({
  id:proceduralSceneIdSchema,label:z.string(),description:z.string(),
  palette:z.enum(["ambient-green","market-brass","spatial-mint","global-cyan","security-green","archive-ivory","astral-violet","terminal-mint"]),
  role:z.enum(["ambient-video","section-backdrop","decorative-motion","hud-overlay"]),serviceLens:z.enum(["homepage","deal","condition","space","general"]),
  composition:z.enum(["field","network","orientation","global","security","archive","constellation","terminal"]),
  seed:z.number().int().nonnegative(),intensity:z.number().min(0).max(100),motionSpeed:z.number().min(.1).max(2),gridDensity:z.number().min(24).max(120),nodeDensity:z.number().int().min(0).max(16),scan:z.enum(["none","horizontal","vertical"]),glow:z.number().min(0).max(60),depth:z.number().min(0).max(40),noise:z.number().min(0).max(12),reducedMotionMode:z.enum(["static","hidden"]),
}).strict();
export type ProceduralScene=z.infer<typeof proceduralSceneSchema>;
export type ProceduralSceneId=z.infer<typeof proceduralSceneIdSchema>;
export const proceduralScenes=proceduralSceneSchema.array().parse(sceneData);
export const proceduralSceneMap=new Map(proceduralScenes.map(scene=>[scene.id,scene]));
export function getProceduralScene(id:string){return proceduralSceneMap.get(id as ProceduralSceneId)??null}

export function deterministicScenePoints(seed:number,count:number){
  let state=seed>>>0;
  const next=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296};
  return Array.from({length:count},(_,index)=>({id:`p-${seed}-${index}`,x:Number((6+next()*88).toFixed(3)),y:Number((8+next()*84).toFixed(3)),r:Number((.16+next()*.34).toFixed(3)),phase:Number((next()*-12).toFixed(3))}));
}
