import {authorizeStudioCapability} from "@/lib/governance/auth";
import type {Actor,Capability} from "@/lib/governance/permissions";

export type StudioAccess={enabled:boolean;writable:boolean;reason:string;actor:Actor|null;capability:Capability};
export function getStudioAccess(environment=process.env.NODE_ENV,capability:Capability="studio.access",actor?:Actor|null):StudioAccess{
  if(environment==="development"&&process.env.STUDIO_ENABLED==="false")return {enabled:false,writable:false,reason:"Studio is disabled by local configuration.",actor:null,capability};
  const result=authorizeStudioCapability(capability,{environment,actor});
  return {enabled:result.allowed,writable:result.allowed,reason:result.reason,actor:result.actor,capability};
}
