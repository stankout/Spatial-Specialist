import { z } from "zod";

export const localizedTextSchema=z.object({en:z.string().trim().max(500).default(""),vi:z.string().trim().max(500).default("")});
export const focalPointSchema=z.object({x:z.number().min(0).max(1),y:z.number().min(0).max(1)});
export const mediaAssetSchema=z.object({id:z.string(),filename:z.string(),originalFilename:z.string(),url:z.string(),provider:z.enum(["local","static","cloudinary","s3","supabase","vercel-blob"]),mimeType:z.enum(["image/jpeg","image/png","image/webp","image/avif"]),width:z.number().int().nonnegative(),height:z.number().int().nonnegative(),fileSize:z.number().int().nonnegative(),title:localizedTextSchema,alt:localizedTextSchema,caption:localizedTextSchema,focalPoint:focalPointSchema,createdAt:z.string(),updatedAt:z.string()});
export type MediaAsset=z.infer<typeof mediaAssetSchema>;
export type LocalizedText=z.infer<typeof localizedTextSchema>;
export type FocalPoint=z.infer<typeof focalPointSchema>;

export const mediaPresentationSchema=z.object({mode:z.enum(["cover","editorial-panel","background-overlay","texture"]).default("cover"),overlayStrength:z.number().min(0).max(.9).default(.35)});
export type MediaPresentation=z.infer<typeof mediaPresentationSchema>;

export const mediaSlots={
  "homepage.heroPortrait":{label:"Homepage Portrait",category:"Homepage",meaningful:true},"homepage.heroBackground":{label:"Homepage Background",category:"Homepage",meaningful:false},"homepage.featuredMedia":{label:"Homepage Featured Media",category:"Homepage",meaningful:true},
  "realEstate.heroImage":{label:"Real Estate Hero",category:"Real Estate",meaningful:true},"realEstate.featuredPropertyMedia":{label:"Featured Property Media",category:"Real Estate",meaningful:true},"realEstate.sectionBackground":{label:"Real Estate Section Background",category:"Real Estate",meaningful:false},
  "homeInspection.heroImage":{label:"Home Inspection Hero",category:"Home Inspection",meaningful:true},"homeInspection.sampleReportPreview":{label:"Sample Report Preview",category:"Home Inspection",meaningful:true},"homeInspection.featuredMedia":{label:"Inspection Featured Media",category:"Home Inspection",meaningful:true},
  "spatial.heroImage":{label:"Spatial Hero",category:"Spatial Consultation",meaningful:true},"spatial.floorPlanVisual":{label:"Floor Plan Visual",category:"Spatial Consultation",meaningful:true},"spatial.featuredMedia":{label:"Spatial Featured Media",category:"Spatial Consultation",meaningful:true},
  "global.logo":{label:"Global Logo",category:"Global",meaningful:true},"global.ogImage":{label:"Global Social Image",category:"Global",meaningful:true},"global.footerImage":{label:"Global Footer Image",category:"Global",meaningful:false},
} as const;
export type MediaSlotKey=keyof typeof mediaSlots;
export const mediaSlotKeys=Object.keys(mediaSlots) as MediaSlotKey[];
export const assignmentSchema=z.object({slot:z.enum(mediaSlotKeys as [MediaSlotKey,...MediaSlotKey[]]),assetId:z.string(),presentation:mediaPresentationSchema,updatedAt:z.string()});
export type MediaAssignment=z.infer<typeof assignmentSchema>;

export function localizedValue(value:LocalizedText,locale:"en"|"vi"){return value[locale]||value.en||value.vi}
