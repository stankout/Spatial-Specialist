import { SocialManagerClient } from "@/components/social-manager-client";
import { StudioPlatformPage } from "@/components/studio-platform";
import { readSocialStore } from "@/lib/social/repository";

export default async function Page() {
  return <StudioPlatformPage active="social" capability="social.read" eyebrow="Owned channel governance" title="Social" description="Curate public social destinations through a deliberate Draft and Publish workflow.">
    <SocialManagerClient initialStore={await readSocialStore()}/>
  </StudioPlatformPage>;
}
