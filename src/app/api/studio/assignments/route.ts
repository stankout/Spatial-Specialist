import {NextResponse} from "next/server";
import {z} from "zod";
import {assignMedia,listAssignments,removeAssignment} from "@/lib/media/assignments";
import {getStudioAccess} from "@/lib/media/security";
import {mediaPresentationSchema,mediaSlotKeys} from "@/lib/media/types";
export const runtime="nodejs";
const requestSchema=z.discriminatedUnion("action",[z.object({action:z.literal("assign"),slot:z.enum(mediaSlotKeys as [typeof mediaSlotKeys[number],...typeof mediaSlotKeys]),assetId:z.string(),presentation:mediaPresentationSchema}),z.object({action:z.literal("remove"),slot:z.enum(mediaSlotKeys as [typeof mediaSlotKeys[number],...typeof mediaSlotKeys])})]);
function denied(){return NextResponse.json({ok:false,error:getStudioAccess().reason},{status:403})}
export async function GET(){if(!getStudioAccess().enabled)return denied();return NextResponse.json({ok:true,assignments:await listAssignments()})}
export async function POST(request:Request){if(!getStudioAccess().writable)return denied();try{const body=requestSchema.parse(await request.json());if(body.action==="remove"){await removeAssignment(body.slot);return NextResponse.json({ok:true})}return NextResponse.json({ok:true,assignment:await assignMedia(body.slot,body.assetId,body.presentation)})}catch(error){return NextResponse.json({ok:false,error:error instanceof Error?error.message:"Assignment failed."},{status:400})}}
