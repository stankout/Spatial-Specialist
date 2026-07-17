import { notFound } from "next/navigation";
import { Header, Footer, StickyMobileCTA } from "@/components/site-shell";
import { isLocale } from "@/lib/i18n";
export function generateStaticParams(){return [{locale:"en"},{locale:"vi"}]}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <div className="locale-shell" lang={locale}><a className="skip-link" href="#main">Skip to content</a><Header locale={locale}/><main id="main">{children}</main><Footer locale={locale}/><StickyMobileCTA locale={locale}/></div>}
