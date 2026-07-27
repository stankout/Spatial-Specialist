import {z} from "zod";
export const compositionPageSchema=z.enum(["homepage","realEstate","homeInspection","spatial","videos","guides","contact","booking"]);
export const sectionTypeSchema=z.enum(["portrait","image-text","text-image","full-width-image","video","diagram","gallery","background","scroll-story","cta-media"]);
export const mediaSectionSchema=z.object({id:z.string(),page:compositionPageSchema,type:sectionTypeSchema,assetIds:z.string().array().default([]),enabled:z.boolean().default(false),title:z.string().default(""),order:z.number().int().nonnegative()});
export type MediaSection=z.infer<typeof mediaSectionSchema>;
