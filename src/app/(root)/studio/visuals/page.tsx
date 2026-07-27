import {StudioNav} from "@/components/studio-nav";
import {VisualDirectorClient} from "@/components/visual-director-client";
import {getStudioAccess} from "@/lib/media/security";
import {readVisualStore} from "@/lib/visuals/storage";
import {visualPageKeySchema} from "@/lib/visuals/config";

export const metadata={title:"Visual Director | AC Studio"};

export default async function VisualDirectorPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
  const access=getStudioAccess();
  if(!access.enabled)return <main className="studio-page"><StudioNav active="visuals"/><section className="studio-disabled"><h1>Production editing is disabled.</h1><p>{access.reason}</p></section></main>;
  const [store,query]=await Promise.all([readVisualStore(),searchParams]),initialPage=visualPageKeySchema.safeParse(query.page),initialScope=query.locale==="vi"?"vi":query.locale==="en"?"en":"shared";
  return <main className="studio-page"><StudioNav active="visuals"/><VisualDirectorClient initialDraft={store.draft} initialPublished={store.published} initialPage={initialPage.success?initialPage.data:"homepage"} initialScope={initialScope} draftUpdatedAt={store.draftUpdatedAt} publishedAt={store.publishedAt}/></main>
}
