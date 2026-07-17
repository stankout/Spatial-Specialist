import {StudioClient} from "@/components/studio-client";
import {StudioNav} from "@/components/studio-nav";
import {listEmbedAssignments,listEmbeds} from "@/lib/embeds/storage";
import {listAssignments} from "@/lib/media/assignments";
import {getStudioAccess} from "@/lib/media/security";
import {LocalMediaStorageProvider} from "@/lib/media/storage";

const sectionHeadings={media:{label:"MEDIA",title:"Media Library"},assets:{label:"PAGE ASSETS",title:"Asset Assignments"},embeds:{label:"EMBEDS",title:"Embed Library"}} as const;

export async function StudioWorkspace({section}:{section:"media"|"assets"|"embeds"}){
 const access=getStudioAccess();
 const [assets,assignments,embeds,embedAssignments]=access.enabled?await Promise.all([new LocalMediaStorageProvider().list(),listAssignments(),listEmbeds(),listEmbedAssignments()]):[[],[],[],[]];
 const studioAssets=assets.map(asset=>({...asset,usedBy:assignments.filter(item=>item.assetId===asset.id).map(item=>item.slot)}));
 const heading=sectionHeadings[section];
 return <main className="studio-page"><StudioNav active={section}/><header className="studio-header"><div><span>{heading.label}</span><strong>{heading.title}</strong></div></header>{access.enabled?<StudioClient initialView={section==="media"?"library":section} initialAssets={studioAssets} initialAssignments={assignments} initialEmbeds={embeds} initialEmbedAssignments={embedAssignments}/>:<section className="studio-disabled"><h1>Studio unavailable.</h1><p>{access.reason}</p></section>}</main>
}
