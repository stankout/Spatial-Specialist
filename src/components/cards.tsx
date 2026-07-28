import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublicServices, type Locale, type ServiceKey } from "@/data/site.config";

const serviceCopy: Record<ServiceKey, { en: string; vi: string }> = {
  deal: {
    en: "Strategy for buyers, sellers, and investors—built around education and local context.",
    vi: "Chiến lược cho người mua, người bán và nhà đầu tư—dựa trên giáo dục và bối cảnh địa phương.",
  },
  condition: {
    en: "Calm, technical property education to help you understand what the house is telling you.",
    vi: "Giáo dục kỹ thuật, bình tĩnh để hiểu ngôi nhà đang cho bạn biết điều gì.",
  },
  space: {
    en: "Practical space analysis with an optional traditional interpretive layer.",
    vi: "Phân tích không gian thực tế với lớp diễn giải truyền thống khi phù hợp.",
  },
};

export function ServicePillarCards({ locale }: { locale: Locale }) {
  const services = getPublicServices();
  return (
    <div className="service-grid" data-service-count={services.length}>
      {services.map((service) => (
        <Link className={`service-card ${service.slug}`} href={`/${locale}/${service.slug}`} key={service.key}>
          <div className="service-top">
            <span>{locale === "vi" ? "GÓC NHÌN" : "PERSPECTIVE"}</span>
            <span className="service-lens">{service.lens}</span>
          </div>
          <div className="service-rule" aria-hidden="true" />
          <div className="service-body">
            <h3>{locale === "vi" ? service.titleVi : service.title}</h3>
            <p>{serviceCopy[service.key][locale]}</p>
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
