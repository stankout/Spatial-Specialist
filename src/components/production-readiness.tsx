import { featureFlags, platformConfig } from "@/data/platform.config";
import { siteConfig } from "@/data/site.config";

export function ProductionReadiness() {
  const checks = [
    ["Studio authentication", platformConfig.providers.authentication === "configured", "Required before production editing"],
    ["Database/provider storage", Boolean(process.env.DATABASE_URL) && platformConfig.providers.storage === "configured", "Local filesystem is development-only"],
    ["Payment provider", !featureFlags.paymentsEnabled || platformConfig.providers.payments === "configured", featureFlags.paymentsEnabled ? "Required for paid checkout" : "Not required while payments are disabled"],
    ["Email provider", platformConfig.providers.email === "configured", "Required for reliable notifications"],
    ["Production media storage", platformConfig.providers.storage === "configured", "Local uploads are not production persistence"],
    ["Privacy review", process.env.PRIVACY_REVIEWED === "true", "Owner/legal review required"],
    ["Terms review", process.env.TERMS_REVIEWED === "true", "Owner/legal review required"],
    ["Refund policy", !featureFlags.commerceEnabled || process.env.REFUND_POLICY_REVIEWED === "true", "Required before commerce launch"],
    ["Business contact", Boolean(siteConfig.email && siteConfig.phone), "Canonical public contact is configured"],
  ] as const;
  const ready = checks.every(([, passed]) => passed);
  return <section className="readiness-panel" data-ready={ready}><header><div><p className="eyebrow">Production Readiness</p><h2>{ready ? "Configuration checks passed" : "Production activation is intentionally blocked"}</h2></div><strong>{checks.filter(([, passed]) => passed).length}/{checks.length}</strong></header><div>{checks.map(([label, passed, note]) => <article key={label}><span aria-hidden="true">{passed ? "✓" : "○"}</span><div><strong>{label}</strong><p>{note}</p></div><b>{passed ? "Ready" : "Required"}</b></article>)}</div></section>;
}

