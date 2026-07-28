import Link from "next/link";
import { FeatureBadge, StudioPlatformPage } from "@/components/studio-platform";
import { featureFlags, platformConfig } from "@/data/platform.config";
import { siteConfig } from "@/data/site.config";

export default function Page() {
  return <StudioPlatformPage active="settings" capability="settings.read" eyebrow="Configuration without secrets" title="Settings" description="Review business identity, public contact data, feature gates, and provider states without rendering secret values.">
    <section className="settings-grid settings-governance-grid">
      <article><p className="eyebrow">Business identity</p><h2>{siteConfig.businessName}</h2><div className="provider-row"><strong>Public brand</strong><span>{siteConfig.shortName}</span></div><div className="provider-row"><strong>Company</strong><span>{siteConfig.businessName}</span></div><div className="provider-row"><strong>Region</strong><span>{siteConfig.locationLabel}</span></div></article>
      <article><p className="eyebrow">Real estate contact</p><h2>{siteConfig.principalName}</h2><div className="provider-row"><strong>Affiliation</strong><span>{siteConfig.realEstateAffiliation}</span></div><div className="provider-row"><strong>Phone</strong><span>{siteConfig.phoneDisplay ?? "Not configured"}</span></div></article>
      <article><p className="eyebrow">Spatial contact</p><h2>AC Spatial Specialist</h2><div className="provider-row"><strong>Company</strong><span>{siteConfig.businessName}</span></div><div className="provider-row"><strong>Email</strong><span>{siteConfig.email ?? "Not configured"}</span></div><div className="provider-row"><strong>Region</strong><span>{siteConfig.locationLabel}</span></div><Link className="settings-route-link" href="/studio/social">Manage social channels →</Link></article>
      <article><p className="eyebrow">Feature gates</p><h2>Business capabilities</h2>{Object.entries(featureFlags).map(([key, enabled]) => <FeatureBadge key={key} enabled={enabled}>{key}</FeatureBadge>)}</article>
      <article><p className="eyebrow">Provider boundary</p><h2>Adapter states</h2>{Object.entries(platformConfig.providers).map(([key, state]) => <div className="provider-row" key={key}><strong>{key}</strong><span>{state}</span></div>)}</article>
    </section>
    <section className="settings-readiness-link"><div><p className="eyebrow">Launch gate</p><h2>Production remains deliberately fail-closed.</h2><p>Provider names are not treated as proof that authentication, persistence, or fulfillment is ready.</p></div><Link href="/studio/readiness">Open Production Readiness →</Link></section>
  </StudioPlatformPage>;
}
