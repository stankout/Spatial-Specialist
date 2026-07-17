import {NextResponse} from "next/server";
import {z} from "zod";
import {createEmbed,deleteEmbed,editEmbed,listEmbeds} from "@/lib/embeds/storage";
import {aspectRatioSchema,embedThemeSchema,iframePermissionSchema} from "@/lib/embeds/types";
import {localizedTextSchema} from "@/lib/media/types";
import {parseEmbedInput} from "@/lib/embeds/parser";
import {getStudioAccess} from "@/lib/media/security";
export const runtime="nodejs";
const inputSchema=z.object({url:z.string(),title:localizedTextSchema.optional(),caption:localizedTextSchema.optional(),aspectRatio:aspectRatioSchema.optional(),theme:embedThemeSchema.optional(),autoplay:z.boolean().optional(),allowedPermissions:iframePermissionSchema.array().optional()});
function denied(){return NextResponse.json({ok:false,error:getStudioAccess().reason},{status:403})}function failure(error:unknown){return NextResponse.json({ok:false,error:error instanceof Error?error.message:"Embed operation failed."},{status:400})}
export async function GET(){if(!getStudioAccess().enabled)return denied();return NextResponse.json({ok:true,embeds:await listEmbeds()})}
export async function POST(request:Request){if(!getStudioAccess().writable)return denied();try{const body=inputSchema.parse(await request.json());return NextResponse.json({ok:true,embed:parseEmbedInput(body)})}catch(error){return failure(error)}}
export async function PUT(request:Request){if(!getStudioAccess().writable)return denied();try{const body=z.object({id:z.string().optional(),input:inputSchema}).parse(await request.json());return NextResponse.json({ok:true,embed:body.id?await editEmbed(body.id,body.input):await createEmbed(body.input)})}catch(error){return failure(error)}}
export async function DELETE(request:Request){if(!getStudioAccess().writable)return denied();try{const id=new URL(request.url).searchParams.get("id");if(!id)throw new Error("Embed ID is required.");await deleteEmbed(id);return NextResponse.json({ok:true})}catch(error){return failure(error)}}
