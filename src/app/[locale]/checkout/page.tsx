import { notFound } from "next/navigation";
import { CheckoutClient } from "@/components/checkout-client";
import { featureFlags } from "@/data/platform.config";
import { isLocale } from "@/lib/i18n";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale) || !featureFlags.commerceEnabled || !featureFlags.paymentsEnabled || process.env.NODE_ENV !== "development" || process.env.PAYMENT_PROVIDER !== "mock") notFound(); return <div className="commerce-page"><header><p className="eyebrow">AC / Checkout</p><h1>{locale === "vi" ? "Checkout thử nghiệm" : "Development checkout"}</h1><p>{locale === "vi" ? "Không nhập thông tin thẻ. Không có khoản thanh toán thật nào được xử lý." : "Do not enter card details. No real payment is processed."}</p></header><CheckoutClient locale={locale}/></div>; }
