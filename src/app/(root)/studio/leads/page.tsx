import { StudioPlatformPage, StudioRecordTable } from "@/components/studio-platform";
import { listLocalLeadSummaries } from "@/lib/studio/local-data";
export default async function Page() { const leads = await listLocalLeadSummaries(); return <StudioPlatformPage active="leads" eyebrow="Lead operations" title="Leads" description="Review only the operational fields needed for routing. Full private payloads are not printed into the interface."><StudioRecordTable headings={["Type", "Contact", "Source", "Received"]} empty="No mock leads stored in .dev-data/leads.jsonl." rows={leads.map((lead) => [lead.type, `${lead.contact.fullName} · ${lead.contact.email}`, `${lead.source} · ${lead.locale.toUpperCase()}`, new Date(lead.createdAt).toLocaleString("en-US")])}/></StudioPlatformPage>; }

