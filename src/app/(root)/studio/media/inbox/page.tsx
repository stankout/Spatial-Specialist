import {MediaInboxClient} from "@/components/media-inbox-client";
import {OwnerMediaApproval} from "@/components/owner-media-approval";
import {StudioNav} from "@/components/studio-nav";
import {getStudioAccess} from "@/lib/media/security";
import {listInbox} from "@/lib/media/inbox";
import {LocalMediaStorageProvider} from "@/lib/media/storage";
export default async function Page(){const access=getStudioAccess();const [items,assets]=access.enabled?await Promise.all([listInbox(),new LocalMediaStorageProvider().list()]):[[],[]];return <main className="studio-page"><StudioNav active="media"/><header className="studio-header"><div><span>MEDIA</span><strong>Source Inbox</strong></div></header>{access.enabled?<><OwnerMediaApproval initialAssets={assets}/><MediaInboxClient initialItems={items}/></>:<section className="studio-disabled"><h1>Studio unavailable.</h1><p>{access.reason}</p></section>}</main>}
