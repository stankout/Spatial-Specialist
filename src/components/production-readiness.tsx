import { featureFlags, platformConfig } from "@/data/platform.config";
import { seededSocialChannels } from "@/data/social.config";
import { siteConfig } from "@/data/site.config";
import { getAuthProviderStatus } from "@/lib/governance/auth";

export function ProductionReadiness() {
  const auth = getAuthProviderStatus("production");
  const checks = [
    ["Studio authentication", auth.productionReady, auth.reason],
    ["Database/provider storage", platformConfig.providers.database === "configured", "A durable production repository is required; local JSON is development-only."],
    ["Production media storage", platformConfig.providers.storage === "configured", "Local uploads are not durable production persistence."],
    ["Payment provider", !featureFlags.paymentsEnabled || platformConfig.providers.payments === "configured", featureFlags.paymentsEnabled ? "Required for paid checkout." : "Not required while payments are disabled."],
    ["Email provider", platformConfig.providers.email === "configured", "Required for reliable transactional notifications."],
    ["Scheduling provider", platformConfig.providers.scheduling === "configured", "Manual scheduling is a development fallback, not a production integration."],
    ["Analytics provider", platformConfig.providers.analytics === "configured", "Mock event registration is not production analytics."],
    ["Digital delivery", !featureFlags.digitalProductsEnabled || platformConfig.providers.digitalDelivery === "configured", "Required before paid digital fulfillment is enabled."],
    ["Print-on-demand", !featureFlags.printOnDemandEnabled || platformConfig.providers.printOnDemand === "configured", "Required only when print-on-demand is enabled."],
    ["Published social links", seededSocialChannels.some((channel) => channel.enabled), "Owner-controlled HTTPS destinations are configured separately from social publishing APIs."],
    ["Social publishing APIs", platformConfig.providers.socialPublishing === "configured", "Optional future integration; public profile links work without it."],
    ["Backup provider", platformConfig.providers.backups === "configured", "Durable application data needs a tested backup and restore policy."],
    ["Audit persistence", platformConfig.providers.audit === "configured", "The current JSONL audit stream is development-only."],
    ["Privacy review", process.env.PRIVACY_REVIEWED === "true", "Owner/legal review required."],
    ["Terms review", process.env.TERMS_REVIEWED === "true", "Owner/legal review required."],
    ["Refund policy", !featureFlags.commerceEnabled || process.env.REFUND_POLICY_REVIEWED === "true", "Required before commerce launch."],
    ["Business contact", Boolean(siteConfig.email && siteConfig.phone), "Canonical public contact is configured."],
  ] as const;
  const ready = checks.every(([, passed]) => passed);
  return <section className="readiness-panel" data-ready={ready}><header><div><p className="eyebrow">Production Readiness</p><h2>{ready ? "Configuration checks passed" : "Production activation is intentionally blocked"}</h2></div><strong>{checks.filter(([, passed]) => passed).length}/{checks.length}</strong></header><div>{checks.map(([label, passed, note]) => <article key={label}><span aria-hidden="true">{passed ? "✓" : "○"}</span><div><strong>{label}</strong><p>{note}</p></div><b>{passed ? "Ready" : "Required"}</b></article>)}</div></section>;
}
