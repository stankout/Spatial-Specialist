import {notFound} from "next/navigation";import {PublicContentDetail} from "@/components/public-content";import {contentMetadata} from "@/lib/content-studio/seo";import {isLocale} from "@/lib/i18n";
const types=["article","property-analysis","inspection-education","spatial-analysis"] as const;
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}){const {locale,slug}=await params;return contentMetadata(locale==="vi"?"vi":"en",slug,[...types])}
export default async function Page({params}:{params:Promise<{locale:string;slug:string}>}){const {locale,slug}=await params;if(!isLocale(locale))notFound();return <PublicContentDetail locale={locale} slug={slug} allowedTypes={[...types]}/>}
