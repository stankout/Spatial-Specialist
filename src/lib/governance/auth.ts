import type {Actor,Capability,Role} from "@/lib/governance/permissions";
import {can} from "@/lib/governance/permissions";

export type Session={actor:Actor;issuedAt:string;provider:string};
export type AuthProviderStatus={provider:string;configured:boolean;productionReady:boolean;reason:string};
export interface AuthProvider{readonly id:string;status():AuthProviderStatus;getSession():Promise<Session|null>}

export const developmentOwner:Actor={id:"development-owner",displayName:"Anh Cao · Development Owner",role:"OWNER",source:"development"};

export function getDevelopmentSession(role:Role="OWNER",environment=process.env.NODE_ENV):Session|null{
 if(environment==="production")return null;
 return {actor:{...developmentOwner,role,id:`development-${role.toLowerCase()}`},issuedAt:new Date().toISOString(),provider:"development-only"};
}

export function getAuthProviderStatus(environment=process.env.NODE_ENV):AuthProviderStatus{
 if(environment!=="production")return {provider:"development-only",configured:true,productionReady:false,reason:"Development owner session only. Role previews never grant server authority."};
 const declared=process.env.AUTH_PROVIDER?.trim();
 return {provider:declared||"none",configured:false,productionReady:false,reason:declared?`Provider ${declared} is declared, but no production session adapter is installed.`:"Production authentication provider is not configured."};
}

export type AuthorizationResult={allowed:boolean;actor:Actor|null;capability:Capability;status:401|403|200;reason:string};
export function authorizeStudioCapability(capability:Capability,{environment=process.env.NODE_ENV,actor}:{environment?:string;actor?:Actor|null}={}):AuthorizationResult{
 const resolved=actor===undefined?(environment==="development"?developmentOwner:null):actor;
 if(environment==="production"&&!getAuthProviderStatus(environment).productionReady)return {allowed:false,actor:null,capability,status:401,reason:getAuthProviderStatus(environment).reason};
 if(!resolved)return {allowed:false,actor:null,capability,status:401,reason:"No authenticated Studio session."};
 if(!can(resolved,capability))return {allowed:false,actor:resolved,capability,status:403,reason:`${resolved.role} does not have ${capability}.`};
 return {allowed:true,actor:resolved,capability,status:200,reason:"Authorized"};
}
