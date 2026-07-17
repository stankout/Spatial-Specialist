import {StudioClient} from "@/components/studio-client";
import {listEmbedAssignments,listEmbeds} from "@/lib/embeds/storage";
import {listAssignments} from "@/lib/media/assignments";
import {getStudioAccess} from "@/lib/media/security";
import {LocalMediaStorageProvider} from "@/lib/media/storage";

export const metadata={title:"Content Studio | Anh Cao"};
export default async function StudioPage(){
  const access=getStudioAccess();
  const [assets,assignments,embeds,embedAssignments]=access.enabled?await Promise.all([new LocalMediaStorageProvider().list(),listAssignments(),listEmbeds(),listEmbedAssignments()]):[[],[],[],[]];
  const studioAssets=assets.map(asset=>({...asset,usedBy:assignments.filter(item=>item.assetId===asset.id).map(item=>item.slot)}));
  return <main className="studio-page"><header className="studio-header"><div><span>AC / STUDIO</span><strong>Content Studio</strong></div><p>Media · Page Assets · Embeds · Content Blocks</p></header>{access.enabled?<StudioClient initialAssets={studioAssets} initialAssignments={assignments} initialEmbeds={embeds} initialEmbedAssignments={embedAssignments}/>:<section className="studio-disabled"><p className="eyebrow">Studio unavailable</p><h1>Production editing is disabled.</h1><p>{access.reason}</p></section>}</main>
}
