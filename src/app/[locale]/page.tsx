import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ArticleCard, PlaceholderPortrait, ServicePillarCards } from "@/components/cards";
import { activeCredentials } from "@/data/credentials.config";
import { contentForLocale } from "@/lib/content";
import { isLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const vi = locale === "vi";
  const credentials = activeCredentials();

  return <>
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-identity">
          <p className="eyebrow">Anh Cao · Spatial Specialist LLC</p>
          <span>{vi ? "Góc nhìn tài sản đa chiều" : "A multi-dimensional property perspective"}</span>
        </div>
        <h1>{vi ? <>Nhìn toàn diện tài sản<br /><em>trước khi quyết định.</em></> : <>See the whole property<br /><em>before making the move.</em></>}</h1>
        <div className="hero-support">
          <p className="hero-lede">{vi ? "Anh Cao kết nối chiến lược bất động sản, nhận thức về tình trạng ngôi nhà và tư vấn không gian—ba góc nhìn độc lập cho một quyết định rõ ràng hơn." : "Anh Cao brings together real estate strategy, property-condition awareness, and spatial consultation—three independent perspectives for a clearer decision."}</p>
          <div className="hero-actions">
            <Link className="button button-accent" href={`/${locale}/services`}>{vi ? "Khám phá ba góc nhìn" : "Explore three perspectives"}<ArrowRight /></Link>
            <Link className="quiet-link" href={`/${locale}/about`}>{vi ? "Về Anh Cao" : "The Anh Cao perspective"}</Link>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <PlaceholderPortrait label={vi ? "Thay bằng ảnh chân dung chính thức" : "Replace with approved portrait"} />
        <div className="visual-note"><span>01—03</span><p>{vi ? "Giao dịch · Tình trạng · Không gian" : "Deal · Condition · Space"}</p></div>
      </div>
      <a href="#services" className="scroll-cue" aria-label="Scroll to services"><ArrowDown /></a>
    </section>

    <section id="services" className="section service-section">
      <div className="section-heading service-heading">
        <div><p className="eyebrow">{vi ? "Một tài sản · Ba góc nhìn" : "One property · Three perspectives"}</p><h2>{vi ? "Hiểu toàn diện hơn trước khi quyết định." : "See the whole property before making the move."}</h2></div>
        <p>{vi ? "Mỗi dịch vụ hoạt động độc lập. Anh/Chị có thể chọn đúng góc nhìn cần thiết mà không bị yêu cầu mua kèm dịch vụ khác." : "Each service stands on its own. Choose the perspective you need—without being required to purchase another service."}</p>
      </div>
      <ServicePillarCards locale={locale} />
    </section>

    <div className="home-editorial-chapter">
      <section className="perspective-section"><div className="perspective-intro"><p className="eyebrow">The Anh Cao Perspective</p><h2>{vi ? "Tài sản không chỉ là một địa chỉ." : "A property is more than an address."}</h2></div><div className="perspective-list">{[["Deal", vi ? "Giá trị giao dịch" : "The financial and transactional side."], ["Condition", vi ? "Những gì tài sản đang thể hiện về mặt vật lý" : "What the property is physically telling you."], ["Space", vi ? "Cách môi trường vận hành cho người sống bên trong" : "How the environment functions for the people inside it."]].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <section className="section guides-section"><div className="section-heading row"><div><p className="eyebrow">{vi ? "Cẩm nang mới" : "Latest guides"}</p><h2>{vi ? "Học trước khi quyết định." : "Clarity before commitment."}</h2></div><Link className="quiet-link" href={`/${locale}/guides`}>{vi ? "Xem tất cả" : "View all guides"}<ArrowRight /></Link></div><div className="article-grid">{contentForLocale(locale).map((item) => <ArticleCard key={item.slug} item={item} locale={locale} />)}</div></section>
    </div>
    {credentials.length > 0 && <section className="credential-bar">{credentials.map((credential) => <span key={credential}>{credential}</span>)}</section>}
    <section className="final-cta"><p className="eyebrow">{vi ? "Bắt đầu từ mục tiêu của Anh/Chị" : "Start with your goal"}</p><h2>{vi ? "Anh/Chị đang nhìn tài sản từ góc nào?" : "Which perspective do you need today?"}</h2><div className="cta-links"><Link href={`/${locale}/real-estate/buyers`}>{vi ? "Tôi muốn mua nhà" : "I want to buy"}</Link><Link href={`/${locale}/real-estate/sellers`}>{vi ? "Tôi muốn bán nhà" : "I want to sell"}</Link><Link href={`/${locale}/home-inspection/request-inspection`}>{vi ? "Tôi cần kiểm tra nhà" : "I need an inspection"}</Link><Link href={`/${locale}/spatial-consultation/book-consultation`}>{vi ? "Tôi muốn tư vấn không gian" : "I want a spatial consultation"}</Link></div></section>
  </>;
}
