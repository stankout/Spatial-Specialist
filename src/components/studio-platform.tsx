import type { ReactNode } from "react";
import { StudioNav, type StudioSection } from "@/components/studio-nav";
import { getStudioAccess } from "@/lib/media/security";
import type { Capability } from "@/lib/governance/permissions";

export function StudioPlatformPage({ active, eyebrow, title, description, capability = "studio.access", children }: { active: StudioSection; eyebrow: string; title: string; description: string; capability?: Capability; children: ReactNode }) {
  const access = getStudioAccess(undefined, capability);
  return <main className="studio-page"><StudioNav active={active}/>{access.enabled ? <><div className="studio-session-banner"><span>Development session</span><strong>{access.actor?.role}</strong><small>Local authority only · production remains fail-closed</small></div><header className="studio-dashboard-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></header>{children}</> : <section className="studio-disabled"><h1>Studio unavailable.</h1><p>{access.reason}</p></section>}</main>;
}

export function StudioRecordTable({ headings, rows, empty }: { headings: string[]; rows: Array<Array<ReactNode>>; empty: string }) {
  return <section className="studio-record-table"><div className="studio-record-head">{headings.map((heading) => <strong key={heading}>{heading}</strong>)}</div>{rows.map((row, index) => <article key={index}>{row.map((cell, cellIndex) => <div key={cellIndex}>{cell}</div>)}</article>)}{rows.length === 0 && <div className="studio-empty"><p>{empty}</p></div>}</section>;
}

export function FeatureBadge({ enabled, children }: { enabled: boolean; children: ReactNode }) { return <span className="feature-badge" data-enabled={enabled}>{children} · {enabled ? "Enabled" : "Disabled"}</span>; }
