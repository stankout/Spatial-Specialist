import {mkdir,readFile,rename,writeFile} from "node:fs/promises";
import path from "node:path";
import {embedAssignmentSchema,embedBlockSchema,type EmbedAssignment,type EmbedBlock,type EmbedInput,type EmbedSlotKey} from "@/lib/embeds/types";
import {parseEmbedInput,updateEmbed} from "@/lib/embeds/parser";

const libraryPath=(root:string)=>path.join(root,".dev-data","embed-library.json");const assignmentPath=(root:string)=>path.join(root,".dev-data","embed-assignments.json");
async function readJson<T>(file:string,parse:(value:unknown)=>T,empty:T){try{return parse(JSON.parse(await readFile(file,"utf8")))}catch(error){if((error as NodeJS.ErrnoException).code==="ENOENT")return empty;throw error}}
async function atomicWrite(file:string,value:unknown){await mkdir(path.dirname(file),{recursive:true});const temp=`${file}.tmp`;await writeFile(temp,JSON.stringify(value,null,2),"utf8");await rename(temp,file)}
export async function listEmbeds(root=process.cwd()){if(process.env.NODE_ENV==="production")return [];return readJson(libraryPath(root),value=>embedBlockSchema.array().parse(value),[] as EmbedBlock[])}
export async function createEmbed(input:EmbedInput,root=process.cwd()){const item=parseEmbedInput(input);await atomicWrite(libraryPath(root),[...(await listEmbeds(root)),item]);return item}
export async function editEmbed(id:string,input:EmbedInput,root=process.cwd()){const items=await listEmbeds(root);const current=items.find(item=>item.id===id);if(!current)throw new Error("Embed block not found.");const item=updateEmbed(current,input);await atomicWrite(libraryPath(root),items.map(value=>value.id===id?item:value));return item}
export async function deleteEmbed(id:string,root=process.cwd()){await atomicWrite(libraryPath(root),(await listEmbeds(root)).filter(item=>item.id!==id));await atomicWrite(assignmentPath(root),(await listEmbedAssignments(root)).filter(item=>item.embedId!==id))}
export async function listEmbedAssignments(root=process.cwd()){if(process.env.NODE_ENV==="production")return [];return readJson(assignmentPath(root),value=>embedAssignmentSchema.array().parse(value),[] as EmbedAssignment[])}
export async function assignEmbed(slot:EmbedSlotKey,embedId:string,root=process.cwd()){if(!(await listEmbeds(root)).some(item=>item.id===embedId))throw new Error("Embed block not found.");const items=await listEmbedAssignments(root);const assignment=embedAssignmentSchema.parse({slot,embedId,updatedAt:new Date().toISOString()});await atomicWrite(assignmentPath(root),[...items.filter(item=>item.slot!==slot),assignment]);return assignment}
export async function removeEmbedAssignment(slot:EmbedSlotKey,root=process.cwd()){await atomicWrite(assignmentPath(root),(await listEmbedAssignments(root)).filter(item=>item.slot!==slot))}
export async function getAssignedEmbed(slot:EmbedSlotKey,root=process.cwd()){const assignment=(await listEmbedAssignments(root)).find(item=>item.slot===slot);if(!assignment)return null;const embed=(await listEmbeds(root)).find(item=>item.id===assignment.embedId);return embed?{embed,assignment}:null}
