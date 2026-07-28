import Link from "next/link";
import {MediaImage} from "@/components/media-image";
import { connection } from "next/server";
import { ArrowDown, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PlaceholderPortrait, ServicePillarCards } from "@/components/cards";
import { activeCredentials } from "@/data/credentials.config";
import { isLocale } from "@/lib/i18n";
import { getAssignedMedia } from "@/lib/media/assignments";
import { localizedValue } from "@/lib/media/types";
import { HomepageFeaturedContent, HomepageLatestGuides } from "@/components/public-content";
import {BrandClaritySection} from "@/components/strategy-sections";
import {VisualPage} from "@/components/visual-page";

export default async function Home({ params,searchParams }: { params: Promise<{ locale: string }>;searchParams:Promise<Record<string,string|string[]|undefined>> }) {
  const [{ locale },query] = await Promise.all([params,searchParams]);
  if (!isLocale(locale)) notFound();
  const vi = locale === "vi";
  const credentials = activeCredentials();
  if (process.env.NODE_ENV === "development") await connection();
  const [portrait, heroBackground] = await Promise.all([getAssignedMedia("homepage.heroPortrait"), getAssignedMedia("homepage.heroBackground")]);

  return <VisualPage page="homepage" locale={locale} preview={query.visualPreview==="1"}>
    <section data-visual-section="hero" data-tone="glass" className={`hero story-surface-glass story-text-dark ${heroBackground?`has-hero-background hero-background-${heroBackground.assignment.presentation.mode}`:""}`}>
      {heroBackground&&<div className="hero-background-media" aria-hidden="true"><MediaImage asset={heroBackground.asset} context="public" slot="homepage.heroBackground" fill priority sizes="100vw"/><span style={{opacity:heroBackground.assignment.presentation.overlayStrength}}/></div>}
      <div className="hero-copy">
        <div className="hero-identity">
          <p className="eyebrow">Anh Cao · Spatial Specialist LLC</p>
          <span>{vi ? "Góc nhìn tài sản đa chiều" : "A multi-dimensional property perspective"}</span>
        </div>
        <h1>{vi ? <>Nhìn toàn diện tài sản<br /><em>trước khi quyết định.</em></> : <>See the whole property<br /><em>before making the move.</em></>}</h1>
        <div className="hero-support">
          <p className="hero-lede">{vi ? "Anh Cao kết nối chiến lược bất động sản với phân tích không gian, đồng thời giúp khách hàng đặt câu hỏi sáng suốt hơn về bối cảnh và tình trạng tài sản." : "Anh Cao connects real estate strategy with spatial analysis, while helping clients ask better questions about property context and physical condition."}</p>
          <div className="hero-actions">
            <Link className="button button-accent" href={`/${locale}/services`}>{vi ? "Khám phá dịch vụ" : "Explore services"}<ArrowRight /></Link>
            <Link className="quiet-link" href={`/${locale}/about`}>{vi ? "Về Anh Cao" : "The Anh Cao perspective"}</Link>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        {portrait?<div className="portrait-placeholder portrait-assigned"><MediaImage asset={portrait.asset} context="public" slot="homepage.heroPortrait" alt={localizedValue(portrait.asset.alt,locale)} fill priority sizes="(max-width: 1100px) 100vw, 32vw"/></div>:<PlaceholderPortrait label={vi ? "Thay bằng ảnh chân dung chính thức" : "Replace with approved portrait"} />}
        <div className="visual-note"><span>{vi ? "DỊCH VỤ ĐANG MỞ" : "ACTIVE SERVICES"}</span><p>{vi ? "Giao dịch · Không gian" : "Deal · Space"}</p></div>
      </div>
      <a href="#services" className="scroll-cue" aria-label="Scroll to services"><ArrowDown /></a>
    </section>

    <section id="services" data-visual-section="services" data-tone="glass" className="section service-section story-surface-glass story-text-dark">
      <div className="section-heading service-heading">
        <div><p className="eyebrow">{vi ? "Khám phá các góc nhìn" : "Explore the perspectives"}</p><h2>{vi ? "Hiểu toàn diện hơn trước khi quyết định." : "See the whole property before making the move."}</h2></div>
        <p>{vi ? "Mỗi dịch vụ hoạt động độc lập. Anh/Chị có thể chọn đúng góc nhìn cần thiết mà không bị yêu cầu mua kèm dịch vụ khác." : "Each service stands on its own. Choose the perspective you need—without being required to purchase another service."}</p>
      </div>
      <ServicePillarCards locale={locale} />
    </section>

    <div data-visual-section="featured" data-tone="clear" className="story-chapter story-surface-transparent story-text-light"><HomepageFeaturedContent locale={locale} /></div>
    <div data-visual-section="clarity" data-tone="glass" className="story-chapter story-surface-glass story-text-dark"><BrandClaritySection locale={locale}/></div>
    <div data-visual-section="perspective" data-tone="glass" className="home-editorial-chapter story-surface-glass story-text-dark">
      <section className="perspective-section"><div className="perspective-intro"><p className="eyebrow">The Anh Cao Perspective</p><h2>{vi ? "Tài sản không chỉ là một địa chỉ." : "A property is more than an address."}</h2></div><div className="perspective-list">{[["DEAL", "Deal", vi ? "Chiến lược giao dịch trong đúng bối cảnh." : "Transaction strategy in the right context."], ["SPACE", "Space", vi ? "Cách môi trường vận hành cho người sống bên trong." : "How the environment functions for the people inside it."]].map(([lens, title, copy]) => <article key={title}><span>{lens}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <div data-visual-section="guides"><HomepageLatestGuides locale={locale} /></div>
    </div>
    {credentials.length > 0 && <section data-tone="dark" className="credential-bar story-surface-dark story-text-light">{credentials.map((credential) => <span key={credential}>{credential}</span>)}</section>}
    <section data-tone="dark" className="final-cta story-surface-dark story-text-light"><p className="eyebrow">{vi ? "Bắt đầu từ mục tiêu của Anh/Chị" : "Start with your goal"}</p><h2>{vi ? "Anh/Chị đang nhìn tài sản từ góc nào?" : "Which perspective do you need today?"}</h2><div className="cta-links"><Link href={`/${locale}/book?service=buyer`}>{vi ? "Tôi muốn mua nhà" : "I want to buy"}</Link><Link href={`/${locale}/book?service=seller`}>{vi ? "Tôi muốn bán nhà" : "I want to sell"}</Link><Link href={`/${locale}/book?service=spatial`}>{vi ? "Tôi muốn tư vấn không gian" : "I want a spatial consultation"}</Link></div></section>
  </VisualPage>;
}
