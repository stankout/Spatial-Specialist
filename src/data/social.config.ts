import type { SocialChannel } from "@/lib/social/types";

const seededAt = "2026-07-28T00:00:00.000Z";
const placements = { footer: true, contact: true, header: false, homepage: false } as const;

export const seededSocialChannels: SocialChannel[] = [
  { id: "facebook", platform: "facebook", label: "Facebook", handle: "Acspatialspecialist", url: "https://www.facebook.com/Acspatialspecialist/", enabled: true, order: 10, iconKey: "facebook", openInNewTab: true, placements, createdAt: seededAt, updatedAt: seededAt },
  { id: "youtube", platform: "youtube", label: "YouTube", handle: "@acspatialspecialist", url: "https://www.youtube.com/@acspatialspecialist", enabled: true, order: 20, iconKey: "youtube", openInNewTab: true, placements, createdAt: seededAt, updatedAt: seededAt },
  { id: "tiktok", platform: "tiktok", label: "TikTok", handle: "@aggressivefinancer", url: "https://www.tiktok.com/@aggressivefinancer", enabled: true, order: 30, iconKey: "tiktok", openInNewTab: true, placements, createdAt: seededAt, updatedAt: seededAt },
  { id: "instagram", platform: "instagram", label: "Instagram", handle: "@ac_spatial_specialist", url: "https://www.instagram.com/ac_spatial_specialist/", enabled: true, order: 40, iconKey: "instagram", openInNewTab: true, placements, createdAt: seededAt, updatedAt: seededAt },
];

// Compatibility export for code that still expects the original configuration shape.
export const socialConfig = Object.fromEntries(seededSocialChannels.map((channel) => [channel.platform, channel.url])) as Record<string, string>;
