import Link from "next/link";
import { ArrowUpRight, Building2, House, ScanLine } from "lucide-react";
import type { Locale } from "@/data/site.config";
import type { ContentItem } from "@/lib/content";

const serviceData = {
  "real-estate": { number:"01", icon:Building2, title:"Real Estate", en:"Strategy for buyers, sellers, and investors—built around education and local context.", vi:"Chiến lược cho người mua, người bán và nhà đầu tư—dựa trên giáo dục và bối cảnh địa phương." },
  "home-inspection": { number:"02", icon:ScanLine, title:"Home Inspection", en:"Calm, technical property education to help you understand what the house is telling you.", vi:"Giáo dục kỹ thuật, bình tĩnh để hiểu ngôi nhà đang cho bạn biết điều gì." },
  "spatial-consultation": { number:"03", icon:House, title:"Spatial & Feng Shui", en:"Practical space analysis with an optional traditional interpretive layer.", vi:"Phân tích không gian thực tế với lớp diễn giải truyền thống khi phù hợp." },
} as const;
export function ServicePillarCards({locale}:{locale:Locale}) { return <div className="service-grid">{Object.entries(serviceData).map(([slug,s])=>{const Icon=s.icon; return <Link className={`service-card ${slug}`} href={`/${locale}/${slug}`} key={slug}><div className="service-top"><span>{s.number}</span><Icon/></div><div><h3>{s.title}</h3><p>{s[locale]}</p><span className="text-link">{locale==="en"?"Explore service":"Khám phá dịch vụ"}<ArrowUpRight/></span></div></Link>})}</div> }
export function ArticleCard({item,locale}:{item:ContentItem;locale:Locale}) { return <Link className="article-card" href={`/${locale}/guides/${item.slug}`}><span>{item.categories[0]} · {item.demo?"DEMO":""}</span><h3>{item.title}</h3><p>{item.description}</p><span className="text-link">{locale==="en"?"Read guide":"Đọc cẩm nang"}<ArrowUpRight/></span></Link> }
export function PlaceholderPortrait({label="Portrait coming soon"}:{label?:string}) { return <div className="portrait-placeholder" role="img" aria-label={label}><div className="portrait-mark">AC</div><span>{label}</span></div> }
export function FAQAccordion({items}:{items:Array<{q:string;a:string}>}) { return <div className="faq-list">{items.map((item)=><details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div> }
