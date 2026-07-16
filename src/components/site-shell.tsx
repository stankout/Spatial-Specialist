"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { siteConfig, type Locale } from "@/data/site.config";
import { getDictionary } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false); const d = getDictionary(locale); const path = usePathname();
  const other = locale === "en" ? "vi" : "en"; const switched = path.replace(/^\/(en|vi)/, `/${other}`);
  const links = [[d.nav.about,"/about"],[d.nav.services,"/services"],[d.nav.videos,"/videos"],[d.nav.guides,"/guides"],[d.nav.contact,"/contact"]] as const;
  return <header className="site-header"><div className="header-inner"><Link className="brand" href={`/${locale}`}><span>AC</span><div><strong>Anh Cao</strong><small>Spatial Specialist LLC</small></div></Link><nav className="desktop-nav" aria-label="Primary">{links.map(([label,href])=><Link key={href} href={`/${locale}${href}`}>{label}</Link>)}<Link className="button button-dark" href={`/${locale}/book`}>{d.nav.book}</Link><Link className="language" href={switched} hrefLang={other}>{other.toUpperCase()}</Link></nav><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={d.common.menu}>{open?<X/>:<Menu/>}</button></div>{open&&<nav className="mobile-menu" aria-label="Mobile">{links.map(([label,href])=><Link onClick={()=>setOpen(false)} key={href} href={`/${locale}${href}`}>{label}</Link>)}<Link href={`/${locale}/book`}>{d.nav.book}</Link><Link href={switched}>{other.toUpperCase()}</Link></nav>}</header>;
}

export function Footer({ locale }: { locale: Locale }) { return <footer><div className="footer-grid"><div><p className="eyebrow">Spatial Specialist LLC</p><h2>One property.<br/>Three perspectives.</h2></div><div><h3>{locale==="en"?"Explore":"Khám phá"}</h3><Link href={`/${locale}/real-estate`}>Real Estate</Link><Link href={`/${locale}/home-inspection`}>Home Inspection</Link><Link href={`/${locale}/spatial-consultation`}>Spatial Consultation</Link></div><div><h3>{locale==="en"?"Company":"Doanh nghiệp"}</h3><Link href={`/${locale}/about-spatial-specialist`}>Spatial Specialist LLC</Link><Link href={`/${locale}/privacy`}>Privacy</Link><Link href={`/${locale}/terms`}>Terms</Link><Link href={`/${locale}/accessibility`}>Accessibility</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Spatial Specialist LLC</span><span>English · Tiếng Việt · Georgia</span></div></footer> }

export function StickyMobileCTA({ locale }: { locale: Locale }) { const book=<Link href={`/${locale}/book`}><CalendarDays/><span>{locale==="en"?"Book":"Đặt lịch"}</span></Link>; return <div className="sticky-cta">{siteConfig.phone&&<a href={`tel:${siteConfig.phone}`}><Phone/><span>Call</span></a>}{siteConfig.email&&<a href={`mailto:${siteConfig.email}`}><Mail/><span>Message</span></a>}{book}</div> }
