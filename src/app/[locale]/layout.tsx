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
import {publicCatalog} from "@/lib/catalog/repository";
import {publicContent} from "@/lib/content-studio/repository";
import "../globals.css";
import "../art-direction.css";
import "../foreground-system.css";

export const metadata: Metadata = { metadataBase:new URL(siteConfig.url), title:{default:"Anh Cao | Property Intelligence",template:"%s | Anh Cao"}, description:"Real estate strategy and spatial consultation for Georgia communities—English and Vietnamese.", openGraph:{type:"website",siteName:"Anh Cao | Spatial Specialist LLC",title:"Property strategy. Spatial intelligence.",description:"Property intelligence from more than one perspective."}, twitter:{card:"summary_large_image"} };
export function generateStaticParams(){return [{locale:"en"},{locale:"vi"}]}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();const [assignments,drafts,assets,sections,visuals,catalog,portfolio]=await Promise.all([listAssignments(),listDraftAssignments(),new LocalMediaStorageProvider().list(),listMediaSections(),readVisualStore(),publicCatalog(locale),publicContent({locale,type:"portfolio"})]);const map=(assignment:(typeof assignments)[number],draft=false)=>{const asset=assets.find(item=>item.id===assignment.assetId);return asset?[{slot:assignment.slot,url:asset.url,provider:asset.provider,mimeType:asset.mimeType,width:asset.width,height:asset.height,presentation:assignment.presentation,draft} satisfies StoryBackdropItem]:[]};const backdrops=[...assignments.filter(item=>item.slot.includes("storyBackdrop")).flatMap(item=>map(item)),...drafts.filter(item=>item.slot.includes("storyBackdrop")).flatMap(item=>map(item,true))],footerVisuals=resolveVisualSettings(visuals.published,"footer",locale),availability={catalog:catalog.length>0,portfolio:portfolio.length>0};return <html lang={locale} data-scroll-behavior="smooth"><body><div className="locale-shell"><a className="skip-link" href="#main">Skip to content</a><Header locale={locale} availability={availability}/><main id="main"><Suspense fallback={children}><StoryBackdropShell backdrops={backdrops} visuals={{draft:visuals.draft,published:visuals.published}}>{children}</StoryBackdropShell></Suspense><ManagedMediaSections sections={sections} assets={assets}/></main><Footer locale={locale} visuals={footerVisuals} availability={availability}/><StickyMobileCTA locale={locale}/></div></body></html>}
