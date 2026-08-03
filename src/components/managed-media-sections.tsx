"use client";
import {usePathname} from "next/navigation";
import type {MediaSection} from "@/lib/media/composition-types";
import type {MediaAsset} from "@/lib/media/types";
import {getPublicMediaEligibility} from "@/lib/media/approval";
import {OwnerToolbar} from "@/components/owner-toolbar";
import {MotionMediaRenderer} from "@/components/motion-media-renderer";

export function ManagedMediaSections({sections,assets}:{sections:MediaSection[];assets:MediaAsset[]}){
 const pathname=usePathname(),locale=pathname.startsWith("/vi")?"vi":"en";
 const page=pathname.match(/\/real-estate/)?"realEstate":pathname.match(/\/home-inspection/)?"homeInspection":pathname.match(/\/spatial-consultation/)?"spatial":pathname.match(/\/videos/)?"videos":pathname.match(/\/guides/)?"guides":pathname.match(/\/contact/)?"contact":pathname.match(/\/book/)?"booking":pathname.match(/^\/(?:en|vi)\/?$/)?"homepage":null;
 const studioPage:Record<string,string>={homepage:"homepage",realEstate:"real-estate",homeInspection:"home-inspection",spatial:"spatial-consultation"};
 const type=page==="videos"?"video":page==="guides"?"guide":null,editHref=type?`/studio/content?type=${type}&locale=${locale}`:`/studio/page-assets?page=${studioPage[page||""]||"homepage"}&locale=${locale}`;
 const toolsEnabled=process.env.NODE_ENV!=="production"||process.env.NEXT_PUBLIC_STUDIO_SHORTCUT==="true",visible=page?sections.filter(item=>item.page===page&&item.enabled).sort((a,b)=>a.order-b.order):[];
 const visualPage=page==="realEstate"?"deal":page==="homeInspection"?"condition":page==="spatial"?"space":page;
 return <>{visible.map(section=>{const media=section.assetIds.map(id=>assets.find(item=>item.id===id)).filter((item):item is MediaAsset=>Boolean(item&&getPublicMediaEligibility(item).eligible));if(!media.length)return null;return <section className={`managed-media-section media-section-${section.type}`} key={section.id}>{section.title&&<h2>{section.title}</h2>}<div>{media.map(asset=><MotionMediaRenderer key={asset.id} asset={asset} context="public" alt={asset.alt[locale]||asset.alt.en||asset.alt.vi} controls={asset.sourceType==="uploaded-video"&&!asset.decorative}/>)}</div></section>})}{toolsEnabled&&page&&<OwnerToolbar editHref={editHref} visualPage={visualPage||"homepage"} locale={locale}/>}</>;
}
