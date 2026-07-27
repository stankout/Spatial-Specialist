import type { Metadata } from "next";
import {Suspense} from "react";
import { notFound } from "next/navigation";
import { Header, Footer, StickyMobileCTA } from "@/components/site-shell";
import {StoryBackdropShell,type StoryBackdropItem} from "@/components/story-backdrop-shell";
import { siteConfig } from "@/data/site.config";
import { isLocale } from "@/lib/i18n";
import {listAssignments,listDraftAssignments} from "@/lib/media/assignments";
import {LocalMediaStorageProvider} from "@/lib/media/storage";
import {listMediaSections} from "@/lib/media/composition";
import {ManagedMediaSections} from "@/components/managed-media-sections";
import {readVisualStore} from "@/lib/visuals/storage";
import {resolveVisualSettings} from "@/lib/visuals/config";
import "../globals.css";
import "../art-direction.css";

export const metadata: Metadata = { metadataBase:new URL(siteConfig.url), title:{default:"Anh Cao | Property Intelligence",template:"%s | Anh Cao"}, description:"Real estate, home inspection education, and spatial consultation for Georgia communities—English and Vietnamese.", openGraph:{type:"website",siteName:"Anh Cao | Spatial Specialist LLC",title:"Buy Better. Inspect Smarter. Align Your Space.",description:"One property. Three perspectives."}, twitter:{card:"summary_large_image"} };
export function generateStaticParams(){return [{locale:"en"},{locale:"vi"}]}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();const [assignments,drafts,assets,sections,visuals]=await Promise.all([listAssignments(),listDraftAssignments(),new LocalMediaStorageProvider().list(),listMediaSections(),readVisualStore()]);const map=(assignment:(typeof assignments)[number],draft=false)=>{const asset=assets.find(item=>item.id===assignment.assetId);return asset?[{slot:assignment.slot,url:asset.url,provider:asset.provider,mimeType:asset.mimeType,width:asset.width,height:asset.height,presentation:assignment.presentation,draft} satisfies StoryBackdropItem]:[]};const backdrops=[...assignments.filter(item=>item.slot.includes("storyBackdrop")).flatMap(item=>map(item)),...drafts.filter(item=>item.slot.includes("storyBackdrop")).flatMap(item=>map(item,true))],footerVisuals=resolveVisualSettings(visuals.published,"footer",locale);return <html lang={locale} data-scroll-behavior="smooth"><body><div className="locale-shell"><a className="skip-link" href="#main">Skip to content</a><Header locale={locale}/><main id="main"><Suspense fallback={children}><StoryBackdropShell backdrops={backdrops} visuals={{draft:visuals.draft,published:visuals.published}}>{children}</StoryBackdropShell></Suspense><ManagedMediaSections sections={sections} assets={assets}/></main><Footer locale={locale} visuals={footerVisuals}/><StickyMobileCTA locale={locale}/></div></body></html>}
