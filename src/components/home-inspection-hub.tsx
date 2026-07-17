import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileSearch, Play } from "lucide-react";
import { complianceConfig } from "@/data/compliance.config";
import { credentials } from "@/data/credentials.config";
import type { Locale } from "@/data/site.config";
import { contentForLocale } from "@/lib/content";
import { PublishedContentStrip } from "@/components/public-content";
import {ServiceClaritySection} from "@/components/strategy-sections";

const systems = ["roof", "electrical", "plumbing", "hvac", "foundation", "moisture", "attic", "crawlspace", "exterior", "drainage", "safety", "newConstruction"] as const;

const systemLabels = {
  en: { roof: "Roof", electrical: "Electrical", plumbing: "Plumbing", hvac: "HVAC", foundation: "Foundation", moisture: "Moisture", attic: "Attic", crawlspace: "Crawlspace", exterior: "Exterior", drainage: "Drainage", safety: "Safety", newConstruction: "New construction" },
  vi: { roof: "Mái nhà", electrical: "Điện", plumbing: "Cấp thoát nước", hvac: "HVAC", foundation: "Nền móng", moisture: "Độ ẩm", attic: "Gác mái", crawlspace: "Khoang gầm", exterior: "Ngoại thất", drainage: "Thoát nước", safety: "An toàn", newConstruction: "Nhà mới xây" },
};

const process = {
  en: [
    ["Scope", "Confirm the property, inspection scope, access, and questions that matter before the visit."],
    ["Observe", "Review visible and accessible systems through a consistent, non-invasive process."],
    ["Document", "Organize observations with location, context, imagery, and recommended follow-up."],
    ["Understand", "Read the report by priority, limitation, maintenance context, and specialist referral."],
  ],
  vi: [
    ["Xác định phạm vi", "Xác nhận tài sản, phạm vi kiểm tra, quyền tiếp cận và những câu hỏi quan trọng trước buổi kiểm tra."],
    ["Quan sát", "Xem xét các hệ thống nhìn thấy và tiếp cận được bằng quy trình nhất quán, không xâm lấn."],
    ["Ghi nhận", "Sắp xếp quan sát theo vị trí, bối cảnh, hình ảnh và bước theo dõi phù hợp."],
    ["Hiểu báo cáo", "Đọc báo cáo theo mức ưu tiên, giới hạn, bảo trì và nhu cầu tham khảo chuyên gia."],
  ],
};

const faq = {
  en: [
    ["What does an inspection cover?", "Coverage depends on the agreed scope and what is visible and accessible at the property. The inspection request should clarify exclusions and limitations before the visit."],
    ["Does an inspection guarantee future performance?", "No. An inspection documents observable conditions at a point in time; it cannot predict every failure or reveal concealed conditions."],
    ["How should I read the report?", "Begin with safety and major-system observations, then separate specialist follow-up, repair planning, and routine maintenance."],
    ["Can I request a report review?", "Yes. The report-review pathway is designed to help organize questions and next steps without replacing the original inspector or a qualified specialist."],
  ],
  vi: [
    ["Kiểm tra nhà bao gồm những gì?", "Phạm vi phụ thuộc vào thỏa thuận và những khu vực có thể nhìn thấy, tiếp cận tại tài sản. Yêu cầu kiểm tra cần làm rõ giới hạn trước buổi kiểm tra."],
    ["Kiểm tra có bảo đảm hoạt động trong tương lai không?", "Không. Kiểm tra ghi nhận điều kiện quan sát được tại một thời điểm; không thể dự đoán mọi hư hỏng hoặc phát hiện điều kiện bị che khuất."],
    ["Nên đọc báo cáo như thế nào?", "Bắt đầu từ an toàn và hệ thống chính, sau đó phân biệt việc cần chuyên gia theo dõi, kế hoạch sửa chữa và bảo trì định kỳ."],
    ["Tôi có thể yêu cầu xem lại báo cáo không?", "Có. Lộ trình review báo cáo giúp sắp xếp câu hỏi và bước tiếp theo, nhưng không thay thế inspector ban đầu hoặc chuyên gia phù hợp."],
  ],
};

export function HomeInspectionHub({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const inspection = credentials.homeInspection;
  const guides = contentForLocale(locale).filter((item) => item.serviceLine === "home-inspection" && !item.demo);
  const credentialItems = [
    inspection.internachiMemberActive && inspection.memberDirectoryUrl ? { label: "InterNACHI member profile", href: inspection.memberDirectoryUrl } : null,
    inspection.cpiActive ? { label: "CPI®", href: inspection.memberDirectoryUrl } : null,
    inspection.bilingualLogoEligible ? { label: vi ? "Chứng nhận song ngữ" : "Bilingual credential", href: inspection.memberDirectoryUrl } : null,
    inspection.insured ? { label: vi ? "Tình trạng insured đã xác minh" : "Verified insured status", href: undefined } : null,
    ...inspection.certifications.map((label) => ({ label, href: inspection.memberDirectoryUrl })),
  ].filter(Boolean) as Array<{ label: string; href?: string | null }>;

  return <div className="condition-hub">
    <section className="condition-hero">
      <div className="condition-hero-copy">
        <div className="condition-index"><span>02 / 03</span><strong>CONDITION</strong></div>
        <p className="eyebrow">Anh Cao · Home Inspection · Georgia</p>
        <h1>{vi ? <>Hiểu tình trạng.<br /><em>Quan sát có hệ thống.</em></> : <>Understand condition.<br /><em>Observe systematically.</em></>}</h1>
        <p className="condition-lede">{vi ? "Một góc nhìn bình tĩnh, kỹ thuật về các hệ thống nhìn thấy được—để phân biệt dữ kiện, giới hạn và bước theo dõi phù hợp." : "A calm, technical view of visible property systems—separating observations, limitations, and appropriate follow-up."}</p>
        <div className="condition-hero-actions"><Link className="condition-primary-link" href={`/${locale}/book?service=inspection`}>{vi ? "Yêu cầu kiểm tra" : "Request an inspection"}<ArrowRight /></Link><Link className="condition-secondary-link" href={`/${locale}/book?service=inspection-report-review`}>{vi ? "Hiểu một báo cáo" : "Understand a report"}</Link></div>
      </div>
      <div className="condition-hero-diagram" role="img" aria-label={vi ? "Sơ đồ quan sát kỹ thuật của một tài sản" : "Technical observation diagram of a property"}>
        <span className="condition-coordinate">OBS / 02—12</span><div className="condition-house-line" aria-hidden="true"><i /><i /><i /><b>CONDITION</b></div><div className="condition-scale"><span>VISIBLE</span><span>ACCESSIBLE</span><span>DOCUMENTED</span></div>
      </div>
      <div className="condition-continuum" aria-label="Deal, Condition, Space"><span>Deal</span><strong>Condition</strong><span>Space</span></div>
    </section>

    <section className="condition-process">
      <div className="condition-heading"><p className="eyebrow">{vi ? "Quy trình kiểm tra" : "Inspection process"}</p><h2>{vi ? "Quan sát trước. Diễn giải trong giới hạn." : "Observe first. Interpret within limits."}</h2></div>
      <div className="condition-process-grid">{process[locale].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className="condition-systems">
      <div className="condition-heading condition-heading-row"><div><p className="eyebrow">{vi ? "Kiến trúc kiểm tra" : "What we inspect"}</p><h2>{vi ? "Một tài sản, nhiều hệ thống liên quan." : "One property, connected systems."}</h2></div><p>{vi ? "Các nhóm dưới đây tổ chức nội dung quan sát và giáo dục. Chúng không đại diện cho phát hiện tại một tài sản cụ thể." : "These categories organize observation and education. They do not represent findings at a specific property."}</p></div>
      <div className="condition-observation-legend" aria-label={vi ? "Quy trình ghi nhận" : "Observation workflow"}><span>{vi ? "Quan sát" : "Visible"}</span><span>{vi ? "Tiếp cận" : "Accessible"}</span><span>{vi ? "Ghi nhận" : "Documented"}</span></div>
      <div className="condition-system-grid">{systems.map((system, index) => <details data-system={system} key={system}>
        <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{systemLabels[locale][system]}</strong><b aria-hidden="true">+</b></summary>
        <div><p>{vi ? `Phạm vi quan sát cho ${systemLabels[locale][system].toLowerCase()} được xác định theo khu vực có thể tiếp cận tại thời điểm kiểm tra.` : `Observation of ${systemLabels[locale][system].toLowerCase()} is scoped to areas accessible at the time of inspection.`}</p><Link href={`/${locale}/home-inspection/defect-library#${system}`}>{vi ? "Mở chỉ mục kỹ thuật" : "Open technical index"}<ArrowUpRight /></Link></div>
      </details>)}</div>
    </section>

    <section className="condition-services">
      <div className="condition-heading"><p className="eyebrow">{vi ? "Lộ trình dịch vụ" : "Service pathways"}</p><h2>{vi ? "Đúng mức hỗ trợ cho đúng câu hỏi." : "The right depth for the question."}</h2></div>
      <div className="condition-service-list">
        <Link href={`/${locale}/home-inspection/request-inspection`}><span>01</span><div><small>{vi ? "Trước quyết định" : "Before the decision"}</small><h3>{vi ? "Yêu cầu kiểm tra tài sản" : "Property inspection request"}</h3><p>{vi ? "Xác định tài sản, thời điểm, phạm vi và quyền tiếp cận trước khi xác nhận dịch vụ." : "Clarify the property, timing, scope, and access before confirming service."}</p></div><ArrowRight /></Link>
        <Link href={`/${locale}/home-inspection/sample-report`}><span>02</span><div><small>{vi ? "Sau khi có báo cáo" : "After the report"}</small><h3>{vi ? "Review và định hướng báo cáo" : "Report review and orientation"}</h3><p>{vi ? "Sắp xếp quan sát, câu hỏi và bước theo dõi mà không thay thế inspector hoặc specialist." : "Organize observations, questions, and follow-up without replacing the inspector or specialist."}</p></div><ArrowRight /></Link>
      </div>
    </section>

    <div className="condition-evidence-chapter"><section className="condition-report">
      <div className="condition-report-visual" aria-hidden="true"><div><span>SECTION 04</span><i /><i /><i /><i /></div><FileSearch /></div>
      <div><p className="eyebrow">{vi ? "Báo cáo mẫu" : "Sample report"}</p><h2>{vi ? "Một báo cáo tốt tạo ra thứ tự, không tạo hoảng sợ." : "A useful report creates order, not alarm."}</h2><p>{vi ? "Cấu trúc báo cáo tách mô tả quan sát, vị trí, giới hạn, mức ưu tiên và đề xuất theo dõi." : "Report structure separates the observation, location, limitation, priority, and recommended follow-up."}</p>{inspection.sampleReportUrl ? <a className="condition-primary-link" href={inspection.sampleReportUrl} target="_blank" rel="noreferrer">{vi ? "Mở báo cáo mẫu" : "View sample report"}<ArrowUpRight /></a> : <Link className="condition-primary-link" href={`/${locale}/home-inspection/sample-report`}>{vi ? "Tìm hiểu cấu trúc báo cáo" : "Explore report structure"}<ArrowRight /></Link>}</div>
    </section>

    <section className="condition-library">
      <div><p className="eyebrow">Defect library / Education</p><h2>{vi ? "Nhận diện mẫu hình. Không chẩn đoán từ xa." : "Recognize patterns. Do not diagnose remotely."}</h2></div>
      <div><p>{vi ? "Thư viện được tổ chức theo hệ thống và loại quan sát. Nội dung giáo dục giúp đặt câu hỏi tốt hơn; kết luận cho tài sản cụ thể cần kiểm tra tại chỗ và chuyên gia phù hợp." : "The library is organized by system and observation type. Education helps form better questions; property-specific conclusions require on-site evaluation and the appropriate specialist."}</p><Link className="condition-secondary-link" href={`/${locale}/home-inspection/defect-library`}>{vi ? "Mở Defect Library" : "Enter the Defect Library"}<ArrowRight /></Link></div>
    </section></div>

    <section className="condition-media">
      <div className="condition-heading"><p className="eyebrow">{vi ? "Giáo dục & video" : "Inspection education & video"}</p><h2>{vi ? "Nhìn kỹ hơn. Hiểu rõ hơn." : "Look closer. Understand more."}</h2></div>
      {guides.length > 0 ? <div className="condition-media-list">{guides.map((guide) => <Link href={`/${locale}/guides/${guide.slug}`} key={guide.slug}><Play /><span>{guide.categories[0]}</span><strong>{guide.title}</strong></Link>)}</div> : <div className="condition-media-abstract" role="img" aria-label={vi ? "Đồ họa kỹ thuật cho nội dung giáo dục kiểm tra nhà" : "Technical graphic for inspection education"}><span>FIELD NOTES / CONDITION</span><div aria-hidden="true"><i /><i /><i /><i /></div><strong>{vi ? "Quan sát có cấu trúc. Giải thích bình tĩnh." : "Structured observation. Calm explanation."}</strong></div>}
    </section>

    <div className="condition-closing-chapter"><section className="condition-standards">
      <div><p className="eyebrow">{vi ? "Tiêu chuẩn & đạo đức" : "Standards & ethics"}</p><h2>{vi ? "Phạm vi rõ ràng tạo nên niềm tin." : "Clear boundaries create trust."}</h2></div>
      <div className="condition-standard-list"><details><summary><span>01</span><h3>{vi ? "Phạm vi quan sát" : "Observation scope"}</h3><b aria-hidden="true">+</b></summary><div><p>{vi ? "Kiểm tra là quan sát trực quan, không xâm lấn trong phạm vi đã thống nhất và khu vực có thể tiếp cận." : "Inspection is a visual, non-invasive observation within the agreed scope and accessible areas."}</p>{inspection.standardsOfPracticeUrl && <a href={inspection.standardsOfPracticeUrl} target="_blank" rel="noreferrer">{vi ? "Đọc Standards of Practice" : "Read Standards of Practice"}<ArrowUpRight /></a>}</div></details><details><summary><span>02</span><h3>{vi ? "Độc lập & giới hạn" : "Independence & limits"}</h3><b aria-hidden="true">+</b></summary><div><p>{vi ? "Báo cáo cần phân biệt điều quan sát được, điều không thể tiếp cận và khi nào cần specialist." : "Reporting should distinguish what was observed, what was inaccessible, and when a specialist is appropriate."}</p>{inspection.codeOfEthicsUrl && <a href={inspection.codeOfEthicsUrl} target="_blank" rel="noreferrer">{vi ? "Đọc Code of Ethics" : "Read Code of Ethics"}<ArrowUpRight /></a>}</div></details></div>
    </section>

    {(credentialItems.length > 0 || inspection.certificationBadgeUrls.length > 0) && <section className="condition-credentials"><div><p className="eyebrow">{vi ? "Thông tin đã xác minh" : "Verified credentials"}</p><h2>{vi ? "Tư cách chuyên môn, được hiển thị có điều kiện." : "Professional standing, shown with evidence."}</h2></div><div className="condition-credential-list">{credentialItems.map((item) => item.href ? <a href={item.href} target="_blank" rel="noreferrer" key={item.label}>{item.label}<ArrowUpRight /></a> : <span key={item.label}>{item.label}</span>)}{inspection.certificationBadgeUrls.map((badge) => badge.verificationUrl ? <a href={badge.verificationUrl} target="_blank" rel="noreferrer" key={badge.name}>{badge.name}<ArrowUpRight /></a> : <span key={badge.name}>{badge.name}</span>)}</div></section>}

    <section className="condition-faq"><div><p className="eyebrow">FAQ / CONDITION</p><h2>{vi ? "Câu hỏi rõ ràng trước khi đặt lịch." : "Clear questions before scheduling."}</h2></div><div>{faq[locale].map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section></div>

    <section className="condition-conversion"><div><p className="eyebrow">{vi ? "Bước tiếp theo" : "Next observation"}</p><h2>{vi ? "Cần kiểm tra tài sản hay hiểu một báo cáo?" : "Inspecting a property—or making sense of a report?"}</h2></div><div><p>{vi ? "Chọn lộ trình phù hợp với giai đoạn hiện tại. Mỗi dịch vụ độc lập với Real Estate và Spatial Consultation." : "Choose the pathway that fits this stage. Each service remains independent from Real Estate and Spatial Consultation."}</p><Link href={`/${locale}/book?service=inspection`}>{vi ? "Yêu cầu kiểm tra" : "Request an inspection"}<ArrowRight /></Link><Link href={`/${locale}/book?service=inspection-report-review`}>{vi ? "Review báo cáo" : "Review a report"}<ArrowRight /></Link></div></section>
    <ServiceClaritySection locale={locale} service="condition" />
    <PublishedContentStrip locale={locale} service="condition" />
    <div className="condition-compliance"><p>{complianceConfig.notices.inspection}</p></div>
  </div>;
}
