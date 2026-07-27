import {NextResponse} from "next/server";
import {z} from "zod";
import {assignMedia,listAssignments,listDraftAssignments,removeAssignment,saveDraftAssignment} from "@/lib/media/assignments";
import {getStudioAccess} from "@/lib/media/security";
import {mediaPresentationSchema,mediaSlotKeys} from "@/lib/media/types";
export const runtime="nodejs";
const slotSchema=z.enum(mediaSlotKeys as [typeof mediaSlotKeys[number],...typeof mediaSlotKeys]);const requestSchema=z.discriminatedUnion("action",[z.object({action:z.literal("assign"),slot:slotSchema,assetId:z.string(),presentation:mediaPresentationSchema,replace:z.boolean().default(false)}),z.object({action:z.literal("draft"),slot:slotSchema,assetId:z.string(),presentation:mediaPresentationSchema}),z.object({action:z.literal("remove"),slot:slotSchema})]);
function denied(){return NextResponse.json({ok:false,error:getStudioAccess().reason},{status:403})}
export async function GET(){if(!getStudioAccess().enabled)return denied();const [assignments,drafts]=await Promise.all([listAssignments(),listDraftAssignments()]);return NextResponse.json({ok:true,assignments,drafts})}
export async function POST(request:Request){if(!getStudioAccess().writable)return denied();try{const body=requestSchema.parse(await request.json());if(body.action==="remove"){await removeAssignment(body.slot);return NextResponse.json({ok:true})}if(body.action==="draft")return NextResponse.json({ok:true,draft:await saveDraftAssignment(body.slot,body.assetId,body.presentation)});return NextResponse.json({ok:true,assignment:await assignMedia(body.slot,body.assetId,body.presentation,process.cwd(),body.replace)})}catch(error){return NextResponse.json({ok:false,error:error instanceof Error?error.message:"Assignment failed."},{status:400})}}
