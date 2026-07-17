import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/data/site.config";

const serviceData = {
  "real-estate": {
    number: "01",
    lens: "Deal",
    title: "Real Estate",
    en: "Strategy for buyers, sellers, and investors—built around education and local context.",
    vi: "Chiến lược cho người mua, người bán và nhà đầu tư—dựa trên giáo dục và bối cảnh địa phương.",
  },
  "home-inspection": {
    number: "02",
    lens: "Condition",
    title: "Home Inspection",
    en: "Calm, technical property education to help you understand what the house is telling you.",
    vi: "Giáo dục kỹ thuật, bình tĩnh để hiểu ngôi nhà đang cho bạn biết điều gì.",
  },
  "spatial-consultation": {
    number: "03",
    lens: "Space",
    title: "Spatial & Feng Shui",
    en: "Practical space analysis with an optional traditional interpretive layer.",
    vi: "Phân tích không gian thực tế với lớp diễn giải truyền thống khi phù hợp.",
  },
} as const;

export function ServicePillarCards({ locale }: { locale: Locale }) {
  return (
    <div className="service-grid">
      {Object.entries(serviceData).map(([slug, service]) => (
        <Link className={`service-card ${slug}`} href={`/${locale}/${slug}`} key={slug}>
          <div className="service-top">
            <span>{service.number}</span>
            <span className="service-lens">{service.lens}</span>
          </div>
          <div className="service-rule" aria-hidden="true" />
          <div className="service-body">
            <h3>{service.title}</h3>
            <p>{service[locale]}</p>
            <span className="text-link">
              {locale === "en" ? "Explore this perspective" : "Khám phá góc nhìn này"}
              <ArrowUpRight />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function PlaceholderPortrait({ label = "Portrait coming soon" }: { label?: string }) {
  return (
    <div className="portrait-placeholder" role="img" aria-label={label}>
      <div className="portrait-frame-copy">
        <span className="portrait-kicker">Portrait / 04:05</span>
        <strong>Anh Cao</strong>
        <span>{label}</span>
      </div>
      <div className="portrait-corner portrait-corner-top" aria-hidden="true" />
      <div className="portrait-corner portrait-corner-bottom" aria-hidden="true" />
    </div>
  );
}

export function FAQAccordion({ items }: { items: Array<{ q: string; a: string }> }) {
  return <div className="faq-list">{items.map((item) => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div>;
}
