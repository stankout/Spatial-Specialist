import {renderToStaticMarkup} from "react-dom/server";
import {describe,expect,it} from "vitest";
import {ServicePillarCards} from "@/components/cards";
import {LeadCapture} from "@/components/lead-form";
import {leadTypes} from "@/lib/lead";
import {
  getPublicServices,
  isPublicLeadType,
  isPublicServicePath,
  serviceRegistry,
  siteConfig,
  type ServiceRegistry,
} from "@/data/site.config";

describe("centralized public service gating",()=>{
  it("keeps DEAL and SPACE active while CONDITION is hidden by default",()=>{
    expect(serviceRegistry.deal.status).toBe("active");
    expect(serviceRegistry.condition.status).toBe("hidden");
    expect(serviceRegistry.space.status).toBe("active");
    expect(getPublicServices().map(service=>service.key)).toEqual(["deal","space"]);
  });

  it("renders only public service pillars in both locales",()=>{
    const en=renderToStaticMarkup(<ServicePillarCards locale="en"/>);
    const vi=renderToStaticMarkup(<ServicePillarCards locale="vi"/>);
    expect(en).toContain("Real Estate");
    expect(en).toContain("Spatial Consultation");
    expect(en).not.toContain("Home Inspection");
    expect(vi).toContain("Bất động sản");
    expect(vi).toContain("Tư vấn không gian");
    expect(vi).not.toContain("Kiểm tra nhà");
  });

  it("excludes CONDITION from public booking choices without deleting lead support",()=>{
    const booking=renderToStaticMarkup(<LeadCapture locale="en"/>);
    expect(booking).toContain("DEAL · Real Estate");
    expect(booking).toContain("SPACE · Spatial Consultation");
    expect(booking).toContain("GENERAL · Not sure yet");
    expect(booking).not.toContain("CONDITION · Home Inspection");
    expect(isPublicLeadType("inspection")).toBe(false);
    expect(isPublicLeadType("inspection-report-review")).toBe(false);
    expect(leadTypes).toContain("inspection");
    expect(leadTypes).toContain("inspection-report-review");
  });

  it("marks hidden service routes unavailable while active routes remain public",()=>{
    for(const locale of siteConfig.locales){
      expect(isPublicServicePath(`/${locale}/home-inspection`)).toBe(false);
      expect(isPublicServicePath(`/${locale}/home-inspection/defect-library`)).toBe(false);
      expect(isPublicServicePath(`/${locale}/book?service=inspection`)).toBe(false);
      expect(isPublicServicePath(`/${locale}/real-estate`)).toBe(true);
      expect(isPublicServicePath(`/${locale}/spatial-consultation`)).toBe(true);
    }
  });

  it("keeps CONDITION in Studio configuration and makes activation reversible",()=>{
    expect(Object.keys(serviceRegistry)).toEqual(["deal","condition","space"]);
    const activated:ServiceRegistry={
      ...serviceRegistry,
      condition:{...serviceRegistry.condition,status:"active"},
    };
    expect(getPublicServices(activated).map(service=>service.key)).toEqual(["deal","condition","space"]);
    expect(isPublicServicePath("/en/home-inspection",activated)).toBe(true);
    expect(isPublicLeadType("inspection",activated)).toBe(true);
  });
});
