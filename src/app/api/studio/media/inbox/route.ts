import {readFile} from "node:fs/promises";
import {NextResponse} from "next/server";
import {z} from "zod";
import {importInboxItem,listInbox,updateInboxDecision} from "@/lib/media/inbox";
import {getStudioAccess} from "@/lib/media/security";
import {mediaRoleSchema,serviceLensSchema} from "@/lib/media/types";
export const runtime="nodejs";
const actionSchema=z.discriminatedUnion("action",[z.object({action:z.literal("import"),id:z.string(),role:mediaRoleSchema,serviceLens:serviceLensSchema}),z.object({action:z.literal("decision"),id:z.string(),status:z.enum(["unreviewed","ready","private","rejected"]),role:mediaRoleSchema.nullable().default(null),serviceLens:serviceLensSchema.nullable().default(null)})]);
function denied(){return NextResponse.json({ok:false,error:getStudioAccess().reason},{status:403})}
export async function GET(request:Request){if(!getStudioAccess().enabled)return denied();try{const id=new URL(request.url).searchParams.get("file"),items=await listInbox();if(!id)return NextResponse.json({ok:true,items});const item=items.find(entry=>entry.id===id);if(!item||item.mediaType!=="image")return NextResponse.json({ok:false,error:"Preview unavailable."},{status:404});return new NextResponse(await readFile(item.sourcePath),{headers:{"content-type":item.mimeType,"cache-control":"no-store"}})}catch(error){return NextResponse.json({ok:false,error:error instanceof Error?error.message:"Inbox unavailable."},{status:400})}}
export async function POST(request:Request){if(!getStudioAccess().writable)return denied();try{const body=actionSchema.parse(await request.json());if(body.action==="import")return NextResponse.json({ok:true,...await importInboxItem(body.id,body.role,body.serviceLens)});return NextResponse.json({ok:true,item:await updateInboxDecision(body.id,{status:body.status,ownerRole:body.role,ownerServiceLens:body.serviceLens})})}catch(error){return NextResponse.json({ok:false,error:error instanceof Error?error.message:"Inbox action failed."},{status:400})}}
