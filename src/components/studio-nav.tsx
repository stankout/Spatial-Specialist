import Link from "next/link";

export type StudioSection = "dashboard" | "strategy" | "content" | "pages" | "media" | "assets" | "embeds" | "visuals" | "social" | "catalog" | "commerce" | "bookings" | "leads" | "customers" | "analytics" | "settings" | "users" | "readiness";

const groups = [
  { label: "Workspace", links: [["Dashboard", "/studio", "dashboard"], ["Strategy", "/studio/strategy", "strategy"], ["Content", "/studio/content", "content"], ["Media", "/studio/media", "media"], ["Page Assets", "/studio/page-assets", "assets"], ["Embeds", "/studio/embeds", "embeds"], ["Visuals", "/studio/visuals", "visuals"]] },
  { label: "Operations", links: [["Pages", "/studio/pages", "pages"], ["Social", "/studio/social", "social"], ["Catalog", "/studio/catalog", "catalog"], ["Commerce", "/studio/commerce", "commerce"], ["Bookings", "/studio/bookings", "bookings"], ["Leads", "/studio/leads", "leads"], ["Customers", "/studio/customers", "customers"], ["Analytics", "/studio/analytics", "analytics"]] },
  { label: "Administration", links: [["Settings", "/studio/settings", "settings"], ["Users & Roles", "/studio/users", "users"], ["Production Readiness", "/studio/readiness", "readiness"]] },
] as const;

export function StudioNav({ active }: { active: StudioSection }) {
  return <nav className="studio-global-nav" aria-label="AC Studio">
    <Link className="studio-brand-link" href="/studio" aria-label="AC Studio dashboard">AC / STUDIO</Link>
    <div className="studio-nav-groups">
      {groups.map((group) => <section key={group.label} aria-label={group.label}><span>{group.label}</span><div>{group.links.map(([label, href, key]) => <Link aria-current={active === key ? "page" : undefined} href={href} key={key}>{label}</Link>)}</div></section>)}
    </div>
    <Link className="studio-view-site" href="/en" target="_blank" rel="noopener noreferrer">View site</Link>
  </nav>;
}
