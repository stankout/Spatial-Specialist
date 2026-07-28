import { ProductionReadiness } from "@/components/production-readiness";
import { StudioPlatformPage } from "@/components/studio-platform";

export default function Page() {
  return <StudioPlatformPage active="readiness" capability="settings.read" eyebrow="Launch governance" title="Production Readiness" description="A deliberately conservative view of adapters, policies, persistence, and owner approvals still required before production administration.">
    <ProductionReadiness/>
  </StudioPlatformPage>;
}
