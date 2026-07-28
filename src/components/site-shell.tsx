"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, CalendarDays, Mail, MapPin, Menu, Phone, UserRound, X } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { getPublicServices, siteConfig, type Locale } from "@/data/site.config";
import { getDictionary } from "@/lib/i18n";
import {visualCssVariables,type VisualSettings} from "@/lib/visuals/config";
import {getPublicNavigation} from "@/lib/navigation";
import { SocialLinks } from "@/components/social-links";
import type { SocialChannel } from "@/lib/social/types";

type PublicAvailability={catalog:boolean;portfolio:boolean};
export function Header({ locale,availability={catalog:false,portfolio:false} }: { locale: Locale;availability?:PublicAvailability }) {
  const [open, setOpen] = useState(false);
  const dictionary = getDictionary(locale);
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "vi" : "en";
  const switchedPath = pathname.replace(/^\/(en|vi)/, `/${otherLocale}`);
  const links = getPublicNavigation(locale,availability);

  const isActive = (href: string) => pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href={`/${locale}`} aria-label="Anh Cao home">
          <span>AC</span>
          <div>
            <strong>Anh Cao</strong>
            <small>Spatial Specialist LLC</small>
          </div>
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {links.map(({label,href,key}) => (
            <Link className={isActive(href) ? "nav-active" : undefined} aria-current={isActive(href) ? "page" : undefined} key={key} href={`/${locale}${href}`}>
              {label}
            </Link>
          ))}
          <Link className="header-book" href={`/${locale}/book`}>
            <span>{dictionary.nav.book}</span>
            <ArrowMark />
          </Link>
          <Link className="language" href={switchedPath} hrefLang={otherLocale}>{otherLocale.toUpperCase()}</Link>
        </nav>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={dictionary.common.menu}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile">
          <span className="mobile-menu-label">Anh Cao / Property Intelligence</span>
          {links.map(({label,href,key}, index) => (
            <Link onClick={() => setOpen(false)} key={key} href={`/${locale}${href}`}>
              <span>0{index + 1}</span>{label}
            </Link>
          ))}
          <Link className="mobile-book" href={`/${locale}/book`}>{dictionary.nav.book}</Link>
          <Link href={switchedPath}>{otherLocale.toUpperCase()}</Link>
        </nav>
      )}
    </header>
  );
}

function ArrowMark() {
  return <span aria-hidden="true">↗</span>;
}

export function Footer({ locale,visuals,availability={catalog:false,portfolio:false},socialChannels=[] }: { locale: Locale;visuals?:VisualSettings;availability?:PublicAvailability;socialChannels?:SocialChannel[] }) {
  const vi=locale==="vi";
  const publicServiceLenses=getPublicServices().map(service=>service.lens).join(" · ");
  const secondaryLinks=[
    ...getPublicNavigation(locale,availability).filter(item=>item.key!=="services"&&item.key!=="search").map(item=>[item.label,item.href] as const),
    [vi?"Quyền riêng tư":"Privacy","/privacy"],
    [vi?"Điều khoản":"Terms","/terms"],
    [vi?"Trợ năng":"Accessibility","/accessibility"],
  ] as const;
  return <footer className="cyber-footer" data-tone="dark" data-footer-surface={visuals?.footer.surface} data-footer-alignment={visuals?.footer.alignment} data-footer-type={visuals?.footer.typeStyle} data-visual-accent={visuals?.footer.accent} style={visuals?visualCssVariables(visuals,"dark") as CSSProperties:undefined}>
    <div className="footer-signal-rail"><span>AC / SPATIAL SPECIALIST</span><span>{vi?"HỆ THỐNG LIÊN HỆ":"CONTACT SYSTEM"} · PUBLIC / ACTIVE</span></div>
    <div className="footer-terminal-heading"><p className="eyebrow">{vi?"Kênh liên hệ trực tiếp":"Direct contact channels"}</p><h2>{vi?"Kết nối đúng góc nhìn.":"Connect with the right perspective."}</h2></div>
    <div className="footer-contact-grid">
      <section aria-labelledby="footer-real-estate">
        <div className="footer-contact-index"><span>01</span><Building2 aria-hidden="true" /></div>
        <div><p className="footer-contact-label" id="footer-real-estate">{vi?"Bất động sản":"Real estate"}</p><h3>{siteConfig.principalName}</h3><p>{siteConfig.realEstateAffiliation}</p>{siteConfig.phone&&<a href={`tel:${siteConfig.phone}`}><Phone aria-hidden="true" />{siteConfig.phoneDisplay}</a>}</div>
      </section>
      <section aria-labelledby="footer-spatial">
        <div className="footer-contact-index"><span>02</span><UserRound aria-hidden="true" /></div>
        <div><p className="footer-contact-label" id="footer-spatial">AC Spatial Specialist</p><h3>{siteConfig.businessName}</h3>{siteConfig.email&&<a href={`mailto:${siteConfig.email}`}><Mail aria-hidden="true" />{siteConfig.email}</a>}<p className="footer-location"><MapPin aria-hidden="true" />{siteConfig.locationLabel}</p></div>
      </section>
    </div>
    <section className="footer-social-system" aria-labelledby="footer-social-title"><div><p className="eyebrow">{vi?"Kênh chính thức":"Official channels"}</p><h3 id="footer-social-title">{vi?"Theo dõi AC Spatial Specialist":"Follow AC Spatial Specialist"}</h3></div><SocialLinks channels={socialChannels} locale={locale} variant="footer"/></section>
    <nav className="footer-nav" aria-label={vi?"Liên kết cuối trang":"Footer navigation"}>{secondaryLinks.map(([label,href])=><Link key={href} href={`/${locale}${href}`}>{label}</Link>)}</nav>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.businessName}</span><span>{publicServiceLenses} / {siteConfig.locationLabel}</span></div>
  </footer>;
}

export function StickyMobileCTA({ locale }: { locale: Locale }) {
  const book = <Link href={`/${locale}/book`}><CalendarDays /><span>{locale === "en" ? "Book" : "Đặt lịch"}</span></Link>;
  return <div className="sticky-cta">{siteConfig.phone && <a href={`tel:${siteConfig.phone}`}><Phone /><span>{locale === "en" ? "Call" : "Gọi"}</span></a>}<Link href={`/${locale}/contact`}><Mail /><span>{locale === "en" ? "Contact" : "Liên hệ"}</span></Link>{book}</div>;
}
