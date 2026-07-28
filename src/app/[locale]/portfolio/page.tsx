import { notFound } from "next/navigation";
import { PublicContentIndex } from "@/components/public-content";
import { featureFlags } from "@/data/platform.config";
import { publicContent } from "@/lib/content-studio/repository";
import { isLocale } from "@/lib/i18n";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale) || !featureFlags.portfolioEnabled) notFound(); const entries = await publicContent({ locale, type: "portfolio" }); if (!entries.length) notFound(); return <PublicContentIndex locale={locale} type="portfolio"/>; }

