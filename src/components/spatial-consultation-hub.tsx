import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { complianceConfig } from "@/data/compliance.config";
import type { Locale } from "@/data/site.config";
import { spatialConfig } from "@/data/spatial.config";

const pathwayContent = {
  residential: {
    en: { label: "Residential", title: "Residential Spatial Consultation", copy: "Review room relationships, circulation, orientation, placement, and how an existing home supports daily life." },
    vi: { label: "Nhà ở", title: "Tư vấn Không gian Nhà ở", copy: "Xem xét quan hệ giữa các phòng, lối di chuyển, phương hướng, cách bố trí và khả năng hỗ trợ sinh hoạt hằng ngày." },
  },
  propertySelection: {
    en: { label: "Before purchase", title: "Property Selection Consultation", copy: "Compare site context, orientation, floor plan, spatial flow, and functional suitability before choosing a property." },
    vi: { label: "Trước khi mua", title: "Đánh giá Lựa chọn Bất động sản", copy: "So sánh bối cảnh khu đất, hướng nhà, mặt bằng, luồng di chuyển và mức độ phù hợp trước khi lựa chọn." },
  },
  business: {
    en: { label: "Work & customer space", title: "Business Space Consultation", copy: "Study entrances, customer movement, work zones, visibility, and functional relationships for a small business." },
    vi: { label: "Không gian kinh doanh", title: "Tư vấn Không gian Doanh nghiệp", copy: "Phân tích lối vào, luồng khách hàng, vùng làm việc, khả năng nhận diện và quan hệ chức năng trong cơ sở kinh doanh." },
  },
  spaceAudit: {
    en: { label: "Structured review", title: "Space Audit", copy: "A focused review of an existing property, organized around observable spatial conditions and practical priorities." },
    vi: { label: "Đánh giá có cấu trúc", title: "Đánh giá Không gian", copy: "Rà soát tập trung một tài sản hiện có, dựa trên điều kiện không gian quan sát được và các ưu tiên thực tế." },
  },
} as const;

const method = {
  en: [["Context", "Property, people, use, and objectives."], ["Orientation", "Direction, access, surroundings, and site relationships."], ["Layout", "Circulation, zones, light, placement, and constraints."], ["Interpretation", "Spatial reasoning with optional traditional frameworks."], ["Recommendations", "Practical priorities and possible adjustments."]],
  vi: [["Bối cảnh", "Tài sản, người sử dụng, mục đích và mục tiêu."], ["Định hướng", "Phương hướng, lối tiếp cận, môi trường và quan hệ khu đất."], ["Bố cục", "Di chuyển, phân vùng, ánh sáng, vị trí và giới hạn."], ["Diễn giải", "Lý giải không gian và lớp truyền thống khi được yêu cầu."], ["Đề xuất", "Ưu tiên thực tế và những điều chỉnh có thể cân nhắc."]],
} as const;

const analysisLayers = {
  en: [["Site", "Lot · road · surroundings"], ["Structure", "Footprint · entrances · circulation"], ["Rooms", "Relationships · privacy · movement"], ["Orientation", "Cardinal direction · environment"], ["Interpretation", "Optional traditional layer"]],
  vi: [["Khu đất", "Lô đất · đường · môi trường xung quanh"], ["Công trình", "Dấu chân công trình · lối vào · lưu thông"], ["Phòng", "Quan hệ · riêng tư · di chuyển"], ["Phương hướng", "Hướng chính · bối cảnh môi trường"], ["Diễn giải", "Lớp truyền thống tùy chọn"]],
} as const;

export function SpatialConsultationHub({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const activePathways = Object.entries(spatialConfig.pathways).filter(([, item]) => item.active) as Array<[keyof typeof pathwayContent, { active: boolean; href: string }]>;
  const approvedMedia = spatialConfig.media.filter((item) => item.approved);
  const approvedStudies = spatialConfig.caseStudies.filter((item) => item.approved && !item.demo);

  return <div className="space-hub">
    <section className="space-hero">
      <div className="space-hero-copy">
        <div className="space-index"><span>03 / 03</span><strong>SPACE</strong></div>
        <p className="eyebrow">Anh Cao · Spatial Specialist</p>
        <h1>{vi ? <>Đọc không gian<br /><em>trước khi thay đổi.</em></> : <>Read the space<br /><em>before changing it.</em></>}</h1>
        <div className="space-hero-bottom"><p>{vi ? "Hiểu cách một tài sản được định hướng, tổ chức, trải nghiệm và sử dụng—với diễn giải Phong Thủy truyền thống khi khách hàng yêu cầu." : "Understand how a property is oriented, organized, experienced, and used—with traditional Feng Shui interpretation when requested."}</p><div><Link className="space-primary-link" href={`/${locale}/book?service=spatial`}>{vi ? "Đặt lịch tư vấn không gian" : "Book a spatial consultation"}<ArrowRight /></Link><a className="space-secondary-link" href="#method">{vi ? "Khám phá phương pháp" : "Explore the method"}</a></div></div>
      </div>
      <div className="space-hero-diagram" role="img" aria-label={vi ? "Sơ đồ trừu tượng về phương hướng và quan hệ không gian" : "Abstract diagram of orientation and spatial relationships"}>
        <span className="space-coordinate">N / 00°</span><div className="space-plan" aria-hidden="true"><i /><i /><i /><i /><b>SPACE</b></div><div className="space-cardinals"><span>W</span><strong>N</strong><span>E</span><span>S</span></div>
      </div>
      <div className="space-continuum" aria-label="Deal, Condition, Space"><span>Deal</span><span>Condition</span><strong>Space</strong></div>
    </section>

    <section className="space-pathways">
      <div className="space-heading space-heading-row"><div><p className="eyebrow">{vi ? "Lộ trình tư vấn" : "Consultation pathways"}</p><h2>{vi ? "Bắt đầu từ cách không gian cần vận hành." : "Begin with how the space needs to work."}</h2></div><p>{vi ? "Mỗi lộ trình là một dịch vụ độc lập. Phạm vi được xác nhận theo tài sản, mục tiêu và thông tin có thể cung cấp." : "Each pathway stands independently. Scope is confirmed around the property, objective, and information available."}</p></div>
      <div className="space-pathway-grid">{activePathways.map(([key, item], index) => { const content = pathwayContent[key][locale]; return <Link href={`/${locale}/spatial-consultation/${item.href}`} key={key}><span>0{index + 1}</span><small>{content.label}</small><h3>{content.title}</h3><p>{content.copy}</p><b>{vi ? "Xem lộ trình" : "Explore pathway"}<ArrowUpRight /></b></Link>; })}</div>
    </section>

    <section className="space-method" id="method">
      <div className="space-heading"><p className="eyebrow">{vi ? "Phương pháp" : "Method"}</p><h2>{vi ? "Từ bối cảnh đến đề xuất có thể hành động." : "From context to actionable priorities."}</h2></div>
      <div className="space-method-grid">{method[locale].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className="space-analysis">
      <div className="space-analysis-intro"><p className="eyebrow">{vi ? "Mô hình phân tích tài sản" : "Property analysis model"}</p><h2>{vi ? "Đọc tài sản theo từng lớp liên quan." : "Read the property in connected layers."}</h2><p>{vi ? "Mỗi lớp bổ sung bối cảnh cho lớp tiếp theo. Dữ kiện quan sát và diễn giải truyền thống luôn được trình bày riêng biệt." : "Each layer adds context to the next. Observable conditions and traditional interpretation remain clearly separated."}</p></div>
      <nav className="space-orientation-nav" aria-label={vi ? "Điều hướng lớp phân tích" : "Analysis layer navigation"}>{analysisLayers[locale].map(([title], index) => <a href={`#space-layer-${index + 1}`} key={title}><span>{["N", "E", "S", "W", "C"][index]}</span>{title}</a>)}</nav>
      <div className="space-layer-model">{analysisLayers[locale].map(([title, copy], index) => <div id={`space-layer-${index + 1}`} key={title}><span>0{index + 1}</span><strong>{title}</strong><small>{copy}</small></div>)}</div>
    </section>

    <div className="space-practical-chapter">
      <section className="space-output"><p className="eyebrow">{vi ? "Kết quả tư vấn" : "Consultation output"}</p><h2>{vi ? "Quan sát rõ ràng. Ưu tiên thực tế." : "Clear observations. Practical priorities."}</h2><p>{vi ? "Phạm vi có thể bao gồm ghi chú có chú thích, rà soát phương hướng, phân tích bố cục, ưu tiên đề xuất, cân nhắc theo từng phòng, trao đổi tiếp theo và diễn giải truyền thống tùy chọn." : "Depending on scope, clients may receive annotated observations, orientation review, layout analysis, priority recommendations, room-by-room considerations, follow-up discussion, and optional traditional interpretation."}</p><small>{vi ? "Không bao gồm bản vẽ kiến trúc, kỹ thuật hoặc khảo sát địa chính trừ khi được cung cấp bởi chuyên gia có thẩm quyền riêng." : "Architectural, engineering, or surveying plans are not implied and require the appropriate separately engaged professional."}</small></section>
      <section className="space-selection"><p className="eyebrow">{vi ? "Lựa chọn bất động sản" : "Property selection"}</p><h2>{vi ? "So sánh nhiều hơn giá và vật liệu hoàn thiện." : "Compare more than price and finishes."}</h2><div className="space-comparison-list">{(vi ? ["Bối cảnh vị trí", "Hướng khu đất và ngôi nhà", "Bố cục và lưu thông", "Mức độ phù hợp chức năng", "Quan hệ với môi trường", "Diễn giải truyền thống tùy chọn"] : ["Location context", "Site and house orientation", "Layout and circulation", "Functional suitability", "Environmental relationship", "Optional traditional interpretation"]).map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div><Link className="space-primary-link" href={`/${locale}/book?service=spatial-property-selection`}>{vi ? "Đánh giá lựa chọn tài sản" : "Evaluate property options"}<ArrowRight /></Link></section>
    </div>

    <section className="space-fengshui">
      <div><p className="eyebrow">{vi ? "Lớp diễn giải tùy chọn" : "Optional interpretive layer"}</p><h2>{vi ? "Phân tích không gian trước. Diễn giải truyền thống khi được yêu cầu." : "Spatial analysis first. Traditional interpretation when requested."}</h2></div><div><p>{vi ? "Phong Thủy có thể được sử dụng như một khung diễn giải truyền thống, ở mức độ khách hàng lựa chọn. Những quan sát thực tế về bố cục, lưu thông, ánh sáng, riêng tư và công năng vẫn được phân biệt rõ ràng." : "Feng Shui may be included as a traditional interpretive framework at the depth a client chooses. Practical observations about layout, circulation, light, privacy, and function remain clearly distinguished."}</p><Link className="space-secondary-link" href={`/${locale}/spatial-consultation/methodology`}>{vi ? "Tìm hiểu phương pháp" : "Read the methodology"}<ArrowRight /></Link></div>
    </section>

    {approvedMedia.length > 0 && <section className="space-media"><div className="space-heading"><p className="eyebrow">{vi ? "Phân tích & giáo dục" : "Analysis & education"}</p><h2>{vi ? "Nhìn không gian qua ví dụ được duyệt." : "See spatial thinking in context."}</h2></div><div>{approvedMedia.map((item) => <a href={item.href} key={item.href}><Play /><span>{item.type}</span><strong>{item.title}</strong></a>)}</div></section>}
    {approvedStudies.length > 0 && <section className="space-case-studies"><div className="space-heading"><p className="eyebrow">Case studies</p><h2>{vi ? "Phân tích tài sản đã được phê duyệt." : "Approved property analyses."}</h2></div>{approvedStudies.map((study) => <Link href={`/${locale}/spatial-consultation/case-studies/${study.slug}`} key={study.slug}><span>{study.projectType}</span><strong>{study.propertyType}</strong><ArrowUpRight /></Link>)}</section>}

    <section className="space-conversion"><div><p className="eyebrow">{vi ? "Bước tiếp theo" : "Next orientation"}</p><h2>{vi ? "Không gian nào cần được hiểu rõ hơn?" : "Which space needs a clearer reading?"}</h2><p>{vi ? "Chọn loại tư vấn trong một booking pathway duy nhất." : "Choose the consultation type through one focused booking pathway."}</p><Link className="space-primary-link" href={`/${locale}/book?service=spatial`}>{vi ? "Đặt lịch tư vấn không gian" : "Book a spatial consultation"}<ArrowRight /></Link></div><nav aria-label={vi ? "Dịch vụ liên quan" : "Related independent services"}><p>{vi ? "Các góc nhìn độc lập" : "Independent perspectives"}</p><Link href={`/${locale}/real-estate`}>01 · DEAL <span>{vi ? "Hỗ trợ mua bán bất động sản" : "Real estate guidance"}</span><ArrowUpRight /></Link><Link href={`/${locale}/home-inspection`}>02 · CONDITION <span>{vi ? "Hiểu tình trạng vật lý" : "Understand physical condition"}</span><ArrowUpRight /></Link></nav></section>
    <div className="space-compliance"><p>{complianceConfig.notices.spatial}</p></div>
  </div>;
}
