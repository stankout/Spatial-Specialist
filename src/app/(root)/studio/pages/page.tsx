import { PageManagerClient } from "@/components/page-manager-client";
import { StudioPlatformPage } from "@/components/studio-platform";
import { LocalPageRepository } from "@/lib/page-manager/repository";
export default async function Page() { const pages = await new LocalPageRepository().list(); return <StudioPlatformPage active="pages" eyebrow="Structured publishing" title="Pages" description="Manage metadata, visibility, section order, media context, and Visual Director scope without arbitrary HTML or scripts."><PageManagerClient initialPages={pages}/></StudioPlatformPage>; }

