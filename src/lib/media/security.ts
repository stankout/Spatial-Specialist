export type StudioAccess={enabled:boolean;writable:boolean;reason:string};
export function getStudioAccess(environment=process.env.NODE_ENV):StudioAccess{
  if(environment==="development"&&process.env.STUDIO_ENABLED!=="false")return {enabled:true,writable:true,reason:"Local development mode"};
  if(environment==="production")return {enabled:false,writable:false,reason:"Production Studio requires a configured authentication and production storage provider."};
  return {enabled:false,writable:false,reason:"Studio writes are available only in local development."};
}
