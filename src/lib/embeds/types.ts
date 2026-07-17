import {z} from "zod";
import {localizedTextSchema} from "@/lib/media/types";

export const embedProviderSchema=z.enum(["youtube","spotify","soundcloud","customIframe"]);
export const embedContentTypeSchema=z.enum(["video","playlist","audio","album","podcast","other"]);
export const aspectRatioSchema=z.enum(["16:9","4:3","1:1","compact"]);
export const embedThemeSchema=z.enum(["light","dark","auto"]);
export const iframePermissionSchema=z.enum(["fullscreen","autoplay","encrypted-media","picture-in-picture"]);
export const embedBlockSchema=z.object({
  id:z.string(),provider:embedProviderSchema,sourceUrl:z.string().url(),embedUrl:z.string().url(),contentType:embedContentTypeSchema,
  title:localizedTextSchema,caption:localizedTextSchema,aspectRatio:aspectRatioSchema,theme:embedThemeSchema,autoplay:z.boolean(),
  renderMode:z.enum(["iframe","externalLink"]).default("iframe"),allowedPermissions:iframePermissionSchema.array().default([]),createdAt:z.string(),updatedAt:z.string(),
});
export type EmbedBlock=z.infer<typeof embedBlockSchema>;
export type EmbedProvider=z.infer<typeof embedProviderSchema>;
export type EmbedContentType=z.infer<typeof embedContentTypeSchema>;
export type EmbedInput={url:string;title?:{en:string;vi:string};caption?:{en:string;vi:string};aspectRatio?:z.infer<typeof aspectRatioSchema>;theme?:z.infer<typeof embedThemeSchema>;autoplay?:boolean;allowedPermissions?:z.infer<typeof iframePermissionSchema>[]};

export const embedSlots={
  "homepage.featuredEmbed":{label:"Homepage Featured Embed",category:"Homepage"},
  "realEstate.featuredVideo":{label:"Real Estate Featured Video",category:"Real Estate"},
  "realEstate.marketExplainer":{label:"Real Estate Market Explainer",category:"Real Estate"},
  "homeInspection.featuredVideo":{label:"Inspection Featured Video",category:"Home Inspection"},
  "homeInspection.educationMedia":{label:"Inspection Education Media",category:"Home Inspection"},
  "spatial.featuredMedia":{label:"Spatial Featured Media",category:"Spatial Consultation"},
  "spatial.educationMedia":{label:"Spatial Education Media",category:"Spatial Consultation"},
  "article.bodyBlocks":{label:"Article Body Blocks",category:"Editorial"},
  "guide.bodyBlocks":{label:"Guide Body Blocks",category:"Editorial"},
} as const;
export type EmbedSlotKey=keyof typeof embedSlots;
export const embedSlotKeys=Object.keys(embedSlots) as EmbedSlotKey[];
export const embedAssignmentSchema=z.object({slot:z.enum(embedSlotKeys as [EmbedSlotKey,...EmbedSlotKey[]]),embedId:z.string(),updatedAt:z.string()});
export type EmbedAssignment=z.infer<typeof embedAssignmentSchema>;

export type TextBlock={type:"text";id:string;body:{en:string;vi:string}};
export type ImageBlock={type:"image";id:string;assetId:string};
export type EmbedContentBlock={type:"embed";id:string;embedId:string};
export type QuoteBlock={type:"quote";id:string;quote:{en:string;vi:string};attribution?:string};
export type CalloutBlock={type:"callout";id:string;body:{en:string;vi:string}};
export type GalleryBlock={type:"gallery";id:string;assetIds:string[]};
export type ContentBlock=TextBlock|ImageBlock|EmbedContentBlock|QuoteBlock|CalloutBlock|GalleryBlock;
