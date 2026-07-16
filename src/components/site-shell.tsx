"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { siteConfig, type Locale } from "@/data/site.config";
import { getDictionary } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const dictionary = getDictionary(locale);
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "vi" : "en";
  const switchedPath = pathname.replace(/^\/(en|vi)/, `/${otherLocale}`);
  const links = [
    [dictionary.nav.about, "/about"],
    [dictionary.nav.services, "/services"],
    [dictionary.nav.videos, "/videos"],
    [dictionary.nav.guides, "/guides"],
    [dictionary.nav.contact, "/contact"],
  ] as const;

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
          {links.map(([label, href]) => (
            <Link className={isActive(href) ? "nav-active" : undefined} aria-current={isActive(href) ? "page" : undefined} key={href} href={`/${locale}${href}`}>
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
          {links.map(([label, href], index) => (
            <Link onClick={() => setOpen(false)} key={href} href={`/${locale}${href}`}>
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

export function Footer({ locale }: { locale: Locale }) {
  return <footer><div className="footer-grid"><div><p className="eyebrow">Spatial Specialist LLC</p><h2>One property.<br />Three perspectives.</h2></div><div><h3>{locale === "en" ? "Explore" : "Khám phá"}</h3><Link href={`/${locale}/real-estate`}>Real Estate</Link><Link href={`/${locale}/home-inspection`}>Home Inspection</Link><Link href={`/${locale}/spatial-consultation`}>Spatial Consultation</Link></div><div><h3>{locale === "en" ? "Company" : "Doanh nghiệp"}</h3><Link href={`/${locale}/about-spatial-specialist`}>Spatial Specialist LLC</Link><Link href={`/${locale}/privacy`}>Privacy</Link><Link href={`/${locale}/terms`}>Terms</Link><Link href={`/${locale}/accessibility`}>Accessibility</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Spatial Specialist LLC</span><span>English · Tiếng Việt · Georgia</span></div></footer>;
}

export function StickyMobileCTA({ locale }: { locale: Locale }) {
  const book = <Link href={`/${locale}/book`}><CalendarDays /><span>{locale === "en" ? "Book" : "Đặt lịch"}</span></Link>;
  return <div className="sticky-cta">{siteConfig.phone && <a href={`tel:${siteConfig.phone}`}><Phone /><span>Call</span></a>}{siteConfig.email && <a href={`mailto:${siteConfig.email}`}><Mail /><span>Message</span></a>}{book}</div>;
}
