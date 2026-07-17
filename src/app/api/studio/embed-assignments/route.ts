import {NextResponse} from "next/server";
import {z} from "zod";
import {assignEmbed,listEmbedAssignments,removeEmbedAssignment} from "@/lib/embeds/storage";
import {embedSlotKeys} from "@/lib/embeds/types";
import {getStudioAccess} from "@/lib/media/security";
export const runtime="nodejs";
const schema=z.discriminatedUnion("action",[z.object({action:z.literal("assign"),slot:z.enum(embedSlotKeys as [typeof embedSlotKeys[number],...typeof embedSlotKeys]),embedId:z.string()}),z.object({action:z.literal("remove"),slot:z.enum(embedSlotKeys as [typeof embedSlotKeys[number],...typeof embedSlotKeys])})]);
function denied(){return NextResponse.json({ok:false,error:getStudioAccess().reason},{status:403})}
export async function GET(){if(!getStudioAccess().enabled)return denied();return NextResponse.json({ok:true,assignments:await listEmbedAssignments()})}
export async function POST(request:Request){if(!getStudioAccess().writable)return denied();try{const body=schema.parse(await request.json());if(body.action==="remove"){await removeEmbedAssignment(body.slot);return NextResponse.json({ok:true})}return NextResponse.json({ok:true,assignment:await assignEmbed(body.slot,body.embedId)})}catch(error){return NextResponse.json({ok:false,error:error instanceof Error?error.message:"Assignment failed."},{status:400})}}
