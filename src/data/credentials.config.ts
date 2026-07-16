export const credentials = {
  realEstate: { licenseActive: false, licenseNumber: null as string | null, brokerageName: null as string | null, brokerageUrl: null as string | null, realtorTrademarkEligible: false },
  homeInspection: { businessActive: false, internachiMemberActive: false, cpiActive: false, bilingualLogoEligible: false, insured: false, memberDirectoryUrl: null as string | null, certifications: [] as string[] },
};

export function activeCredentials() {
  const items: string[] = [];
  if (credentials.realEstate.licenseActive && credentials.realEstate.licenseNumber) items.push(`Georgia real estate license ${credentials.realEstate.licenseNumber}`);
  if (credentials.realEstate.licenseActive && credentials.realEstate.brokerageName) items.push(credentials.realEstate.brokerageName);
  if (credentials.homeInspection.internachiMemberActive) items.push("InterNACHI member");
  if (credentials.homeInspection.cpiActive) items.push("CPI®");
  if (credentials.homeInspection.insured) items.push("Insured");
  return items;
}
