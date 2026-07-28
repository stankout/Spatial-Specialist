import { z } from "zod";

export const socialPlatformSchema = z.enum([
  "facebook",
  "youtube",
  "tiktok",
  "instagram",
  "linkedin",
  "threads",
  "spotify",
  "soundcloud",
  "pinterest",
  "x",
  "other",
]);
export type SocialPlatform = z.infer<typeof socialPlatformSchema>;

export const socialPlacementSchema = z.enum(["footer", "contact", "header", "homepage"]);
export type SocialPlacement = z.infer<typeof socialPlacementSchema>;

export const socialPlacementsSchema = z.object({
  footer: z.boolean(),
  contact: z.boolean(),
  header: z.boolean(),
  homepage: z.boolean(),
});

const safeSocialUrlSchema = z.string().url().refine((value) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}, "Social URLs must use HTTPS.");

export const socialChannelSchema = z.object({
  id: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  platform: socialPlatformSchema,
  label: z.string().trim().min(1).max(80),
  handle: z.string().trim().max(100),
  url: safeSocialUrlSchema,
  enabled: z.boolean(),
  order: z.number().int().min(0).max(999),
  iconKey: socialPlatformSchema,
  openInNewTab: z.boolean(),
  placements: socialPlacementsSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type SocialChannel = z.infer<typeof socialChannelSchema>;

export const socialChannelListSchema = z.array(socialChannelSchema).superRefine((channels, context) => {
  const ids = new Set<string>();
  channels.forEach((channel, index) => {
    if (ids.has(channel.id)) context.addIssue({ code: "custom", message: `Duplicate channel id: ${channel.id}`, path: [index, "id"] });
    ids.add(channel.id);
  });
});

export const socialStoreSchema = z.object({
  draft: socialChannelListSchema,
  published: socialChannelListSchema,
  draftUpdatedAt: z.string().datetime().nullable(),
  publishedAt: z.string().datetime().nullable(),
});
export type SocialStore = z.infer<typeof socialStoreSchema>;

