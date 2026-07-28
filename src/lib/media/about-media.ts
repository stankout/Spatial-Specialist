import {getAssignedMedia} from "@/lib/media/assignments";

export async function getAboutMedia(root=process.cwd()){
 const dedicated=await getAssignedMedia("about.heroPortrait",root);
 if(dedicated)return {...dedicated,sourceSlot:"about.heroPortrait" as const};
 const legacy=await getAssignedMedia("homepage.heroPortrait",root);
 return legacy?{...legacy,sourceSlot:"homepage.heroPortrait" as const}:null;
}
