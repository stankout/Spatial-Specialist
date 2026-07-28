import Link from "next/link";
import { StudioNav } from "@/components/studio-nav";
import { serviceRegistry } from "@/data/site.config";
import { LocalBookingRepository } from "@/lib/booking/repository";
import { LocalCatalogRepository } from "@/lib/catalog/repository";
import { LocalContentRepository } from "@/lib/content-studio/repository";
import { listEmbeds } from "@/lib/embeds/storage";
import { roleDefinitions } from "@/lib/governance/permissions";
import { getStudioAccess } from "@/lib/media/security";
import { LocalMediaStorageProvider } from "@/lib/media/storage";
import { LocalOrderRepository } from "@/lib/orders/repository";
import { listAuditEvents } from "@/lib/platform/audit";
import { readSocialStore } from "@/lib/social/repository";
import { listLocalLeadSummaries } from "@/lib/studio/local-data";

export const metadata = { title: "Content Studio | Anh Cao" };

export default async function StudioPage() {
  const access = getStudioAccess();
  if (!access.enabled) return <main className="studio-page"><StudioNav active="dashboard"/><section className="studio-disabled"><h1>Production editing is disabled.</h1><p>{access.reason}</p></section></main>;
  const [content, assets, embeds, catalog, orders, bookings, leads, social, auditEvents] = await Promise.all([
    new LocalContentRepository().list(),
    new LocalMediaStorageProvider().list(),
    listEmbeds(),
    new LocalCatalogRepository().list(),
    new LocalOrderRepository().list(),
    new LocalBookingRepository().list(),
    listLocalLeadSummaries(),
    readSocialStore(),
    listAuditEvents(),
  ]);
  const stats = [
    { label: "Draft content", value: content.filter((item) => item.status === "draft").length, href: "/studio/content?status=draft" },
    { label: "Media review", value: assets.filter((item) => item.reviewStatus === "review").length, href: "/studio/media" },
    { label: "Catalog drafts", value: catalog.filter((item) => item.status === "draft").length, href: "/studio/catalog" },
    { label: "Social channels", value: social.published.filter((item) => item.enabled).length, href: "/studio/social" },
    { label: "Leads", value: leads.length, href: "/studio/leads" },
    { label: "Bookings", value: bookings.filter((item) => item.status === "requested").length, href: "/studio/bookings" },
    { label: "Orders", value: orders.length, href: "/studio/commerce" },
    { label: "Saved embeds", value: embeds.length, href: "/studio/embeds" },
  ];
  return <main className="studio-page"><StudioNav active="dashboard"/><div className="studio-session-banner"><span>Development session</span><strong>{access.actor?.role}</strong><small>Local authority only · production remains fail-closed</small></div><header className="studio-dashboard-heading"><p className="eyebrow">Owner workstation</p><h1>AC Business Platform</h1><p>Publishing, media, customer operations, social destinations, and governance readiness in one operational view.</p></header><section className="studio-dashboard-counts">{stats.map((stat) => <Link href={stat.href} key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong></Link>)}</section>
    <section className="governance-dashboard"><header><div><p className="eyebrow">Governance overview</p><h2>Control plane</h2></div><Link href="/studio/readiness">Review production gates →</Link></header><div><article><small>Central roles</small><strong>{Object.keys(roleDefinitions).length}</strong><p>Owner, developer, manager, and content editor policies.</p><Link href="/studio/users">Open Users & Roles</Link></article><article><small>Service registry</small><strong>{Object.values(serviceRegistry).filter((service) => service.publicEnabled).length}/{Object.keys(serviceRegistry).length}</strong><p>Public services require status, owner approval, navigation, and credentials.</p></article><article><small>Audit events</small><strong>{auditEvents.length}</strong><p>Local development actions available for owner review.</p></article><article><small>Social workflow</small><strong>{social.draftUpdatedAt && social.draftUpdatedAt !== social.publishedAt ? "Draft" : "Published"}</strong><p>Public renderers consume only the published channel collection.</p></article></div></section>
    <section className="studio-recent"><div><h2>Recent content</h2><Link href="/studio/content">Manage all</Link></div>{content.slice(0, 6).map((item) => <Link href={`/studio/content?edit=${item.id}`} key={item.id}><span>{item.type} · {item.serviceCategory}</span><strong>{item.localeContent.en?.title || item.localeContent.vi?.title}</strong><small>{item.status} · {new Date(item.updatedAt).toLocaleDateString("en-US")}</small></Link>)}{content.length === 0 && <p>No content entries yet.</p>}</section>
  </main>;
}
