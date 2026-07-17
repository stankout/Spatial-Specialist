import {NextResponse} from "next/server";
import {z} from "zod";
import {listAssignments,removeAssignment} from "@/lib/media/assignments";
import {LocalMediaStorageProvider} from "@/lib/media/storage";
import {focalPointSchema,localizedTextSchema} from "@/lib/media/types";
import {getStudioAccess} from "@/lib/media/security";
import {contentReferences} from "@/lib/content-studio/repository";
export const runtime="nodejs";
const provider=new LocalMediaStorageProvider();
const metadataUpdate=z.object({id:z.string(),title:localizedTextSchema.optional(),alt:localizedTextSchema.optional(),caption:localizedTextSchema.optional(),focalPoint:focalPointSchema.optional()});
function denied(){return NextResponse.json({ok:false,error:getStudioAccess().reason},{status:403})}
export async function GET(){if(!getStudioAccess().enabled)return denied();const [assets,assignments]=await Promise.all([provider.list(),listAssignments()]);return NextResponse.json({ok:true,assets:assets.map(asset=>({...asset,usedBy:assignments.filter(item=>item.assetId===asset.id).map(item=>item.slot)}))})}
export async function POST(request:Request){if(!getStudioAccess().writable)return denied();try{const form=await request.formData();const file=form.get("file");if(!(file instanceof File))return NextResponse.json({ok:false,error:"Choose an image to upload."},{status:400});const asset=await provider.upload({buffer:Buffer.from(await file.arrayBuffer()),filename:file.name,mimeType:file.type});return NextResponse.json({ok:true,asset},{status:201})}catch(error){return NextResponse.json({ok:false,error:error instanceof Error?error.message:"Upload failed."},{status:400})}}
export async function PATCH(request:Request){if(!getStudioAccess().writable)return denied();try{const {id,...updates}=metadataUpdate.parse(await request.json());return NextResponse.json({ok:true,asset:await provider.updateMetadata(id,updates)})}catch(error){return NextResponse.json({ok:false,error:error instanceof Error?error.message:"Update failed."},{status:400})}}
export async function DELETE(request:Request){if(!getStudioAccess().writable)return denied();try{const id=new URL(request.url).searchParams.get("id");if(!id)throw new Error("Asset ID is required.");const references=await contentReferences("media",id);if(references.length)throw new Error(`Asset is used by ${references.length} content entr${references.length===1?"y":"ies"}. Remove those references before deleting.`);for(const assignment of (await listAssignments()).filter(item=>item.assetId===id))await removeAssignment(assignment.slot);await provider.delete(id);return NextResponse.json({ok:true})}catch(error){return NextResponse.json({ok:false,error:error instanceof Error?error.message:"Delete failed."},{status:400})}}
