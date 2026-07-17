export const spatialConfig = {
  pathways: {
    residential: { active: true, href: "residential-consultation" },
    propertySelection: { active: true, href: "property-selection" },
    business: { active: true, href: "business-consultation" },
    spaceAudit: { active: true, href: "space-audit" },
  },
  media: [] as Array<{ title: string; href: string; type: "video" | "article"; approved: boolean }>,
  caseStudies: [] as Array<{
    slug: string;
    projectType: string;
    propertyType: string;
    clientObjective: string;
    existingCondition: string;
    spatialObservations: string[];
    recommendations: string[];
    diagrams: string[];
    approvedImages: string[];
    outcomeNotes?: string;
    approved: boolean;
    demo: boolean;
  }>,
};
