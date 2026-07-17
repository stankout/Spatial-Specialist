import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer, StickyMobileCTA } from "@/components/site-shell";
import { siteConfig } from "@/data/site.config";
import { isLocale } from "@/lib/i18n";
import "../globals.css";

export const metadata: Metadata = { metadataBase:new URL(siteConfig.url), title:{default:"Anh Cao | Property Intelligence",template:"%s | Anh Cao"}, description:"Real estate, home inspection education, and spatial consultation for Georgia communities—English and Vietnamese.", openGraph:{type:"website",siteName:"Anh Cao | Spatial Specialist LLC",title:"Buy Better. Inspect Smarter. Align Your Space.",description:"One property. Three perspectives."}, twitter:{card:"summary_large_image"} };
export function generateStaticParams(){return [{locale:"en"},{locale:"vi"}]}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <html lang={locale} data-scroll-behavior="smooth"><body><div className="locale-shell"><a className="skip-link" href="#main">Skip to content</a><Header locale={locale}/><main id="main">{children}</main><Footer locale={locale}/><StickyMobileCTA locale={locale}/></div></body></html>}
