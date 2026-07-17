import {notFound} from "next/navigation";import {SignatureOfferPage} from "@/components/signature-offer-page";import {isLocale} from "@/lib/i18n";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <SignatureOfferPage locale={locale} slug="buyer-property-risk-review"/>}
