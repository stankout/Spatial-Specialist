import {z} from "zod";

export const roleSchema=z.enum(["OWNER","DEVELOPER","MANAGER","CONTENT_EDITOR"]);
export type Role=z.infer<typeof roleSchema>;

export const capabilityGroups={
 Studio:["studio.access"],
 Content:["content.read","content.edit","content.publish"],
 Media:["media.read","media.upload","media.edit","media.delete","media.approve"],
 Pages:["pages.read","pages.edit","pages.publish"],
 Visuals:["visuals.read","visuals.edit","visuals.publish"],
 Strategy:["strategy.read","strategy.edit","strategy.publish"],
 Social:["social.read","social.edit","social.publish"],
 Catalog:["catalog.read","catalog.edit","catalog.publish"],
 Operations:["bookings.read","bookings.manage","leads.read","leads.manage","customers.read","customers.manage","analytics.read"],
 Settings:["settings.read","settings.edit"],
 Users:["users.read","users.manage"],
 Developer:["developer.read","developer.manage","deployment.manage","secrets.manage"],
 Payments:["payments.read","payments.manage"],
} as const;

export const capabilities=Object.values(capabilityGroups).flat();
export type Capability=(typeof capabilities)[number];
const capabilitySet=new Set<string>(capabilities);
export const capabilitySchema=z.string().refine((value):value is Capability=>capabilitySet.has(value),"Unknown capability");

const editorCapabilities:Capability[]=["studio.access","content.read","content.edit","media.read","media.upload","media.edit","pages.read","social.read","catalog.read"];
const managerCapabilities:Capability[]=["studio.access","content.read","content.edit","content.publish","media.read","media.upload","media.edit","media.delete","media.approve","pages.read","pages.edit","pages.publish","visuals.read","visuals.edit","visuals.publish","strategy.read","strategy.edit","social.read","social.edit","social.publish","catalog.read","catalog.edit","catalog.publish","bookings.read","bookings.manage","leads.read","leads.manage","customers.read","customers.manage","analytics.read","settings.read","payments.read"];
const developerCapabilities:Capability[]=[...managerCapabilities,"strategy.publish","settings.edit","users.read","developer.read","developer.manage","deployment.manage"];

export type RoleDefinition={role:Role;label:string;description:string;capabilities:readonly Capability[];developmentOnly?:boolean};
export const roleDefinitions:Record<Role,RoleDefinition>={
 OWNER:{role:"OWNER",label:"Owner",description:"Full business ownership, governance, provider, user, and high-risk control.",capabilities},
 DEVELOPER:{role:"DEVELOPER",label:"Developer",description:"Technical architecture, integrations, deployment, and broad Studio operations without owner-only secrets or user ownership.",capabilities:developerCapabilities},
 MANAGER:{role:"MANAGER",label:"Manager",description:"Publishing, media, pages, visuals, social channels, catalog, and daily business operations.",capabilities:managerCapabilities},
 CONTENT_EDITOR:{role:"CONTENT_EDITOR",label:"Content Editor",description:"Create and edit content and media drafts without owner, publication, deletion, or provider authority.",capabilities:editorCapabilities},
};

export type Actor={id:string;displayName:string;role:Role;source:"development"|"production"};
export function can(actor:Actor|null|undefined,capability:Capability){return Boolean(actor&&roleDefinitions[actor.role].capabilities.includes(capability))}
export function capabilitiesFor(role:Role){return roleDefinitions[role].capabilities}
