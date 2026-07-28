import { notFound } from "next/navigation";
import { CartClient } from "@/components/cart-client";
import { featureFlags } from "@/data/platform.config";
import { isLocale } from "@/lib/i18n";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale) || !featureFlags.commerceEnabled) notFound(); return <div className="commerce-page"><header><p className="eyebrow">AC / Cart</p><h1>{locale === "vi" ? "Giỏ hàng" : "Your cart"}</h1></header><CartClient locale={locale}/></div>; }

