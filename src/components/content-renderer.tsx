import Link from "next/link";
import {EmbedRenderer} from "@/components/embed-renderer";
import {MotionMediaRenderer} from "@/components/motion-media-renderer";
import {ctaRoutes,type ContentEntry,type EditorialBlock} from "@/lib/content-studio/types";
import type {MediaAsset} from "@/lib/media/types";
import type {EmbedBlock} from "@/lib/embeds/types";
import {isPublicServicePath} from "@/data/site.config";

type Locale="en"|"vi";

export function ContentRenderer({entry,locale,assets,embeds}:{entry:ContentEntry;locale:Locale;assets:MediaAsset[];embeds:EmbedBlock[]}){
 const content=entry.localeContent[locale];
 if(!content)return null;
 return <div className="published-content-body">
  {content.blocks.map(block=><Block key={block.id} block={block} locale={locale} assets={assets} embeds={embeds}/>)}
  {content.transcript&&<section className="content-transcript"><h2>{locale==="vi"?"Bản ghi nội dung":"Transcript"}</h2>{content.transcript.split(/\n\n+/).map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>}
 </div>
}

function Block({block,locale,assets,embeds}:{block:EditorialBlock;locale:Locale;assets:MediaAsset[];embeds:EmbedBlock[]}){
 if(block.type==="heading")return block.level===2?<h2>{block.text}</h2>:<h3>{block.text}</h3>;
 if(block.type==="text"){
  const lines=block.text.split("\n").filter(Boolean);
  if(block.style==="bullets")return <ul>{lines.map(line=><li key={line}><SafeInline text={line.replace(/^[-*]\s*/,"")}/></li>)}</ul>;
  if(block.style==="numbered")return <ol>{lines.map(line=><li key={line}><SafeInline text={line.replace(/^\d+[.)]\s*/,"")}/></li>)}</ol>;
  return <>{block.text.split(/\n\n+/).map(paragraph=><p key={paragraph}><SafeInline text={paragraph}/></p>)}</>;
 }
 if(block.type==="image"){
  const asset=assets.find(item=>item.id===block.assetId);
  if(!asset)return null;
  const alt=asset.alt[locale]||asset.alt.en||asset.alt.vi;
  return <figure className={`content-image content-image-${block.display}`}><MotionMediaRenderer asset={asset} context="public" sizes={block.display==="standard"?"(max-width: 760px) 100vw, 760px":"100vw"} alt={alt}/><figcaption>{block.caption[locale]||block.caption.en||block.caption.vi}</figcaption></figure>;
 }
 if(block.type==="embed"){
  const embed=embeds.find(item=>item.id===block.embedId);
  return embed?<EmbedRenderer embed={embed} locale={locale}/>:null;
 }
 if(block.type==="gallery"){
  const selected=assets.filter(asset=>block.assetIds.includes(asset.id));
  return <figure><div className={`content-gallery content-gallery-${block.presentation}`}>{selected.map(asset=><MotionMediaRenderer key={asset.id} asset={asset} context="public" sizes="(max-width: 700px) 100vw, 50vw" alt={asset.alt[locale]||asset.alt.en||asset.alt.vi}/>)}</div><figcaption>{block.caption[locale]||block.caption.en||block.caption.vi}</figcaption></figure>;
 }
 if(block.type==="quote")return <blockquote><p>{block.text}</p>{block.attribution&&<cite>{block.attribution}</cite>}</blockquote>;
 if(block.type==="callout")return <aside className="content-callout">{block.title&&<strong>{block.title}</strong>}<p>{block.text}</p></aside>;
 if(block.type==="cta"){
  const href=block.preset==="custom"?block.internalPath:ctaRoutes[block.preset](locale);
  return href.startsWith(`/${locale}/`)&&isPublicServicePath(href)?<Link className="button button-dark" href={href}>{block.label||presetLabel(block.preset,locale)}</Link>:null;
 }
 if(block.type==="divider")return <hr/>;
 return null;
}

function presetLabel(preset:string,locale:Locale){const labels={en:{"plan-next-move":"Plan your next move","request-inspection":"Request an inspection","book-spatial":"Book a spatial consultation",contact:"Contact Anh Cao"},vi:{"plan-next-move":"Lập kế hoạch bước tiếp theo","request-inspection":"Yêu cầu kiểm tra nhà","book-spatial":"Đặt tư vấn không gian",contact:"Liên hệ Anh Cao"}};return labels[locale][preset as keyof typeof labels.en]||"Continue"}

function SafeInline({text}:{text:string}){
 const tokens=text.split(/(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g).filter(Boolean);
 return <>{tokens.map((token,index)=>token.startsWith("**")?<strong key={index}>{token.slice(2,-2)}</strong>:token.startsWith("_")?<em key={index}>{token.slice(1,-1)}</em>:token.startsWith("[")?(()=>{const match=token.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);return match?<a key={index} href={match[2]} rel="noopener noreferrer">{match[1]}</a>:token})():token)}</>;
}
