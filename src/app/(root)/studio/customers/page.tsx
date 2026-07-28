import { FeatureBadge, StudioPlatformPage, StudioRecordTable } from "@/components/studio-platform";
import { featureFlags } from "@/data/platform.config";
import { LocalCustomerRepository } from "@/lib/customer/repository";
export default async function Page() { const customers = await new LocalCustomerRepository().list(); return <StudioPlatformPage active="customers" eyebrow="Privacy-conscious records" title="Customers" description="A customer may be linked from a lead or order, but visitors are never converted automatically."><FeatureBadge enabled={featureFlags.customerAccountsEnabled}>Customer accounts</FeatureBadge><StudioRecordTable headings={["Name", "Email", "Locale", "Source"]} empty="No customer records. Account routes remain disabled until production authentication exists." rows={customers.map((customer) => [customer.name, customer.email, customer.preferredLocale.toUpperCase(), customer.sourceLeadId ?? "Direct"] )}/></StudioPlatformPage>; }

