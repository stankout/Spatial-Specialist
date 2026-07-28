import {isPublicService,serviceRegistry} from "@/data/site.config";

export const credentials = {
  realEstate: { licenseActive: false, licenseNumber: null as string | null, brokerageName: null as string | null, brokerageUrl: null as string | null, realtorTrademarkEligible: false },
  homeInspection: {
    businessActive: false,
    internachiMemberActive: false,
    cpiActive: false,
    bilingualLogoEligible: false,
    insured: false,
    memberDirectoryUrl: null as string | null,
    standardsOfPracticeUrl: null as string | null,
    codeOfEthicsUrl: null as string | null,
    sampleReportUrl: null as string | null,
    certificationBadgeUrls: [] as Array<{ name: string; imageUrl: string; verificationUrl?: string }>,
    certifications: [] as string[],
  },
};

export function activeCredentials() {
  const items: string[] = [];
  if (isPublicService(serviceRegistry.deal) && credentials.realEstate.licenseActive && credentials.realEstate.licenseNumber) items.push(`Georgia real estate license ${credentials.realEstate.licenseNumber}`);
  if (isPublicService(serviceRegistry.deal) && credentials.realEstate.licenseActive && credentials.realEstate.brokerageName) items.push(credentials.realEstate.brokerageName);
  if (isPublicService(serviceRegistry.condition) && credentials.homeInspection.internachiMemberActive) items.push("InterNACHI member");
  if (isPublicService(serviceRegistry.condition) && credentials.homeInspection.cpiActive) items.push("CPI®");
  if (isPublicService(serviceRegistry.condition) && credentials.homeInspection.insured) items.push("Insured");
  return items;
}
