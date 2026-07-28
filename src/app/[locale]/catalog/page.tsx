import { notFound } from "next/navigation";
import { CatalogGrid } from "@/components/public-catalog";
import { featureFlags } from "@/data/platform.config";
import { publicCatalog } from "@/lib/catalog/repository";
import { isLocale } from "@/lib/i18n";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale) || !featureFlags.commerceEnabled) notFound(); const items = await publicCatalog(locale); if (!items.length) notFound(); return <div className="catalog-page"><header><p className="eyebrow">AC / Catalog</p><h1>{locale === "vi" ? "Sản phẩm và dịch vụ được xuất bản có chủ đích." : "Products and services, published with intent."}</h1></header><CatalogGrid items={items} locale={locale}/></div>; }

