import { CatalogStudioClient } from "@/components/catalog-studio-client";
import { StudioPlatformPage } from "@/components/studio-platform";
import { LocalCatalogRepository } from "@/lib/catalog/repository";
export default async function Page() { const items = await new LocalCatalogRepository().list(); return <StudioPlatformPage active="catalog" eyebrow="Business inventory" title="Catalog" description="One typed catalog for physical products, digital products, services, and disclosed affiliate recommendations."><CatalogStudioClient initialItems={items}/></StudioPlatformPage>; }

