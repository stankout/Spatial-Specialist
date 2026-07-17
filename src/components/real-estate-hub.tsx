import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { complianceConfig } from "@/data/compliance.config";
import { activeCredentials } from "@/data/credentials.config";
import { locations } from "@/data/locations.config";
import type { Locale } from "@/data/site.config";
import { contentForLocale } from "@/lib/content";

const pathways = [
  {
    number: "01",
    key: "buyers",
    en: { label: "Buy", title: "Plan the purchase before touring at random.", copy: "Clarify timing, target areas, financing readiness, and the property trade-offs that matter to daily life.", cta: "Plan your home purchase" },
    vi: { label: "Mua", title: "Lập kế hoạch trước khi xem nhà ngẫu nhiên.", copy: "Làm rõ thời điểm, khu vực mục tiêu, tình trạng tài chính và những đánh đổi ảnh hưởng đến đời sống hằng ngày.", cta: "Lập kế hoạch mua nhà" },
  },
  {
    number: "02",
    key: "sellers",
    en: { label: "Sell", title: "Position the property with context and intention.", copy: "Organize the property story, preparation priorities, timing, and marketing questions before entering the market.", cta: "Discuss selling your property" },
    vi: { label: "Bán", title: "Định vị tài sản với bối cảnh và chủ đích rõ ràng.", copy: "Tổ chức câu chuyện tài sản, ưu tiên chuẩn bị, thời điểm và câu hỏi marketing trước khi đưa ra thị trường.", cta: "Trao đổi kế hoạch bán nhà" },
  },
  {
    number: "03",
    key: "investors",
    en: { label: "Invest", title: "Evaluate the deal beyond a promising address.", copy: "Compare use case, property condition awareness, location context, assumptions, and the questions requiring specialist verification.", cta: "Explore the investor pathway" },
    vi: { label: "Đầu tư", title: "Đánh giá thương vụ vượt khỏi một địa chỉ hấp dẫn.", copy: "So sánh mục đích sử dụng, tình trạng tài sản, bối cảnh vị trí, giả định và những điểm cần chuyên gia xác minh.", cta: "Khám phá lộ trình đầu tư" },
  },
] as const;

export function RealEstateHub({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const guides = contentForLocale(locale).filter((item) => item.serviceLine === "real-estate");
  const isDevelopment = process.env.NODE_ENV === "development";
  const approvedGuides = guides.filter((item) => !item.demo);
  const featuredMedia = approvedGuides.find((item) => item.featuredImage || item.videoUrl);
  const visibleGuides = isDevelopment ? guides : approvedGuides;
  const credentials = activeCredentials();

  return <div className="deal-hub">
    <section className="deal-hero">
      <div className="deal-hero-copy">
        <div className="deal-index"><span>01 / 03</span><strong>DEAL</strong></div>
        <p className="eyebrow">Anh Cao · Real Estate · Georgia</p>
        <h1>{vi ? <>Quyết định bất động sản<br /><em>với nhiều bối cảnh hơn.</em></> : <>Real estate decisions<br /><em>with more context.</em></>}</h1>
        <div className="deal-hero-bottom">
          <p>{vi ? "Chiến lược dựa trên giáo dục cho người mua, người bán và nhà đầu tư—được xây dựng để hiểu thương vụ trước khi hành động." : "Education-led strategy for buyers, sellers, and investors—built to understand the deal before making the move."}</p>
          <Link className="deal-primary-link" href={`/${locale}/real-estate#pathways`}>{vi ? "Lập kế hoạch cho bước tiếp theo" : "Plan your next move"}<ArrowRight /></Link>
        </div>
      </div>
      <div className="deal-hero-media" role="img" aria-label={vi ? "Đồ họa kiến trúc đại diện cho góc nhìn bất động sản" : "Architectural composition representing a property perspective"}>
        <span className="media-label">Georgia / Property perspective</span>
        <div className="deal-abstract-mark" aria-hidden="true"><span>01</span><strong>DEAL</strong></div>
      </div>
      <div className="deal-continuum" aria-label="Deal, Condition, Space"><strong>Deal</strong><span>Condition</span><span>Space</span></div>
    </section>

    {credentials.length > 0 && <div className="deal-credentials">{credentials.map((credential) => <span key={credential}>{credential}</span>)}</div>}

    <section className="deal-intro">
      <div><p className="eyebrow">{vi ? "Chọn lộ trình" : "Choose your pathway"}</p><h2>{vi ? "Ba mục tiêu. Một tiêu chuẩn rõ ràng hơn." : "Three goals. One clearer standard."}</h2></div>
      <p>{vi ? "Real Estate là góc nhìn DEAL trong hệ thống Anh Cao. Dịch vụ này độc lập với Home Inspection và Spatial Consultation; khách hàng chọn đúng hỗ trợ cần thiết cho quyết định của mình." : "Real Estate is the DEAL lens in the Anh Cao system. It stands independently from Home Inspection and Spatial Consultation, so clients can choose only the support their decision needs."}</p>
    </section>

    <section className="deal-pathways" id="pathways" aria-label={vi ? "Lộ trình bất động sản" : "Real estate pathways"}>
      {pathways.map((pathway) => {
        const content = pathway[locale];
        return <Link href={`/${locale}/real-estate/${pathway.key}`} className="deal-pathway" key={pathway.key}>
          <div className="pathway-meta"><span>{pathway.number}</span><strong>{content.label}</strong></div>
          <h3>{content.title}</h3>
          <p>{content.copy}</p>
          <span className="pathway-cta">{content.cta}<ArrowUpRight /></span>
        </Link>;
      })}
    </section>

    <section className="deal-media-section">
      <div className="deal-section-heading"><p className="eyebrow">Property media</p><h2>{vi ? "Xem tài sản. Sau đó hiểu sâu hơn." : "See the property. Then go deeper."}</h2><p>{vi ? "Property tours, góc nhìn thị trường và video giáo dục giúp đặt mỗi quyết định vào đúng bối cảnh." : "Property tours, market perspective, and educational video place each decision in its wider context."}</p></div>
      {featuredMedia ? <div className="deal-featured-media deal-featured-media-ready">
        <Link className="featured-video-placeholder" href={featuredMedia.videoUrl || `/${locale}/guides/${featuredMedia.slug}`} target={featuredMedia.videoUrl ? "_blank" : undefined}>
          {featuredMedia.featuredImage && <Image src={featuredMedia.featuredImage} alt="" fill sizes="(max-width: 1000px) 100vw, 75vw" />}
          <span className="featured-play" aria-hidden="true"><Play /></span>
          <div><span>Featured / Media</span><strong>{featuredMedia.title}</strong></div>
        </Link>
        <div className="media-queue">{approvedGuides.slice(0, 3).map((guide, index) => <Link href={`/${locale}/guides/${guide.slug}`} key={guide.slug}><span>0{index + 1}</span><strong>{guide.title}</strong></Link>)}</div>
      </div> : <div className="deal-media-empty" role="img" aria-label={vi ? "Đồ họa biên tập cho nội dung bất động sản" : "Editorial graphic for real estate media"}>
        <span>DEAL / MEDIA</span><strong>{vi ? "Góc nhìn địa phương, trình bày rõ ràng." : "Local perspective, clearly framed."}</strong>
        {isDevelopment && <small>Editorial media preview</small>}
      </div>}
    </section>

    <div className="deal-local-chapter"><section className="deal-market-section">
      <div className="market-title"><p className="eyebrow">Georgia market education</p><h2>{vi ? "Bối cảnh địa phương trước những con số gây chú ý." : "Local context before headline numbers."}</h2></div>
      <div className="market-editorial">
        <p>{vi ? "Hiểu thị trường bắt đầu từ loại hình nhà ở, nhịp sống địa phương và những yếu tố ảnh hưởng đến giá trị sử dụng lâu dài—không chỉ từ một con số nổi bật." : "Understanding a market begins with housing patterns, local life, and the factors that shape long-term usefulness—not a headline number alone."}</p>
        <ol>
          <li><span>01</span>{vi ? "Loại hình nhà ở nào phổ biến trong khu vực?" : "What housing patterns define the area?"}</li>
          <li><span>02</span>{vi ? "Điều gì ảnh hưởng đến sinh hoạt và khả năng bán lại?" : "What affects daily use and future marketability?"}</li>
          <li><span>03</span>{vi ? "Thông tin nào cần được chuyên gia phù hợp xác minh?" : "Which assumptions need specialist verification?"}</li>
        </ol>
        <Link className="quiet-link" href={`/${locale}/real-estate/georgia-market`}>{vi ? "Khám phá giáo dục thị trường" : "Explore market education"}<ArrowRight /></Link>
      </div>
    </section>

    <section className="deal-area-section">
      <div className="deal-section-heading"><p className="eyebrow">{vi ? "Khu vực phục vụ" : "Service areas"}</p><h2>{vi ? "Bắt đầu từ Metro Atlanta. Mở rộng có chủ đích." : "Start with Metro Atlanta. Expand with intention."}</h2></div>
      <div className="deal-area-list">{locations.map((location, index) => <Link href={`/${locale}/real-estate/areas/${location.slug}`} key={location.slug}><span>0{index + 1}</span><strong>{location[locale]}</strong><ArrowUpRight /></Link>)}</div>
    </section></div>

    {visibleGuides.length > 0 && <section className="deal-resources-section">
      <div className="deal-section-heading"><p className="eyebrow">{vi ? "Cẩm nang & tài nguyên" : "Guides & resources"}</p><h2>{vi ? "Học trước khi cam kết." : "Learn before committing."}</h2></div>
      <div className="deal-resource-list">
        {visibleGuides.map((guide, index) => <Link href={`/${locale}/guides/${guide.slug}`} key={guide.slug}><span>0{index + 1}</span><div><small>{guide.categories[0]}{isDevelopment && guide.demo ? " · Preview" : ""}</small><h3>{guide.title}</h3><p>{guide.description}</p></div><ArrowUpRight /></Link>)}
      </div>
    </section>}

    <section className="deal-conversion">
      <div><p className="eyebrow">{vi ? "Bắt đầu với mục tiêu" : "Start with the decision"}</p><h2>{vi ? "Đang mua, bán hay đánh giá một cơ hội?" : "Buying, selling, or evaluating an opportunity?"}</h2></div>
      <div><p>{vi ? "Chọn một lộ trình. Cuộc trao đổi bắt đầu từ bối cảnh của Anh/Chị, không phải một sales script." : "Choose one pathway. The conversation begins with your context, not a sales script."}</p><div className="deal-conversion-links"><Link href={`/${locale}/real-estate/buyers`}>{vi ? "Tôi đang mua" : "I’m buying"}<ArrowRight /></Link><Link href={`/${locale}/real-estate/sellers`}>{vi ? "Tôi đang bán" : "I’m selling"}<ArrowRight /></Link><Link href={`/${locale}/real-estate/investors`}>{vi ? "Tôi đang đầu tư" : "I’m investing"}<ArrowRight /></Link></div></div>
    </section>

    <div className="deal-compliance"><p>{complianceConfig.notices.realEstate}</p></div>
  </div>;
}
