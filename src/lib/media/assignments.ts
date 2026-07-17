import {mkdir,readFile,rename,writeFile} from "node:fs/promises";
import path from "node:path";
import {assignmentSchema,type MediaAssignment,type MediaSlotKey,type MediaPresentation} from "@/lib/media/types";
import {LocalMediaStorageProvider} from "@/lib/media/storage";

const assignmentPath=(root:string)=>path.join(root,".dev-data","media-assignments.json");
export async function listAssignments(root=process.cwd()):Promise<MediaAssignment[]>{if(process.env.NODE_ENV==="production")return [];try{return assignmentSchema.array().parse(JSON.parse(await readFile(assignmentPath(root),"utf8")))}catch(error){if((error as NodeJS.ErrnoException).code==="ENOENT")return [];throw error}}
export async function assignMedia(slot:MediaSlotKey,assetId:string,presentation:MediaPresentation,root=process.cwd()){const provider=new LocalMediaStorageProvider(root);if(!await provider.getMetadata(assetId))throw new Error("Media asset not found.");const current=await listAssignments(root);const next=[...current.filter(item=>item.slot!==slot),assignmentSchema.parse({slot,assetId,presentation,updatedAt:new Date().toISOString()})];await writeAssignments(next,root);return next.find(item=>item.slot===slot)!}
export async function removeAssignment(slot:MediaSlotKey,root=process.cwd()){const next=(await listAssignments(root)).filter(item=>item.slot!==slot);await writeAssignments(next,root)}
export async function getAssignedMedia(slot:MediaSlotKey,root=process.cwd()){const assignment=(await listAssignments(root)).find(item=>item.slot===slot);if(!assignment)return null;const asset=await new LocalMediaStorageProvider(root).getMetadata(assignment.assetId);return asset?{asset,assignment}:null}
async function writeAssignments(items:MediaAssignment[],root:string){const file=assignmentPath(root);await mkdir(path.dirname(file),{recursive:true});const temp=`${file}.tmp`;await writeFile(temp,JSON.stringify(items,null,2),"utf8");await rename(temp,file)}
