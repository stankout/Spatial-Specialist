import { notFound } from "next/navigation";
import { PublicContentDetail } from "@/components/public-content";
import { featureFlags } from "@/data/platform.config";
import { contentMetadata } from "@/lib/content-studio/seo";
import { isLocale } from "@/lib/i18n";
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { locale, slug } = await params; return contentMetadata(locale === "vi" ? "vi" : "en", slug, ["portfolio"]); }
export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { locale, slug } = await params; if (!isLocale(locale) || !featureFlags.portfolioEnabled) notFound(); return <PublicContentDetail locale={locale} slug={slug} allowedTypes={["portfolio"]}/>; }
