import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SocialLinks } from "@/components/social-links";
import { seededSocialChannels } from "@/data/social.config";
import { authorizeStudioCapability, developmentOwner, getDevelopmentSession } from "@/lib/governance/auth";
import { can, roleDefinitions, type Actor } from "@/lib/governance/permissions";
import { getPublishedSocialChannels, publishSocialDraft, readSocialStore, saveSocialDraft } from "@/lib/social/repository";
import { socialChannelSchema } from "@/lib/social/types";

const roots: string[] = [];
async function root() { const value = await mkdtemp(path.join(os.tmpdir(), "ac-social-")); roots.push(value); return value; }
afterEach(async () => { await Promise.all(roots.splice(0).map((value) => rm(value, { recursive: true, force: true }))); });

describe("centralized Studio governance", () => {
  it("grants OWNER all declared capabilities", () => {
    expect(roleDefinitions.OWNER.capabilities.length).toBeGreaterThan(20);
    expect(can(developmentOwner, "users.manage")).toBe(true);
    expect(can(developmentOwner, "secrets.manage")).toBe(true);
  });

  it("gives MANAGER operational publishing without owner controls", () => {
    const manager: Actor = { ...developmentOwner, id: "manager", role: "MANAGER" };
    expect(can(manager, "content.publish")).toBe(true);
    expect(can(manager, "social.publish")).toBe(true);
    expect(can(manager, "users.manage")).toBe(false);
    expect(can(manager, "secrets.manage")).toBe(false);
    expect(can(manager, "deployment.manage")).toBe(false);
  });

  it("restricts CONTENT_EDITOR publishing and destructive controls", () => {
    const editor: Actor = { ...developmentOwner, id: "editor", role: "CONTENT_EDITOR" };
    expect(can(editor, "content.edit")).toBe(true);
    expect(can(editor, "media.upload")).toBe(true);
    expect(can(editor, "content.publish")).toBe(false);
    expect(can(editor, "media.delete")).toBe(false);
    expect(can(editor, "social.edit")).toBe(false);
  });

  it("fails closed in production even when an actor is supplied without a real provider", () => {
    expect(authorizeStudioCapability("studio.access", { environment: "production", actor: developmentOwner }).allowed).toBe(false);
    expect(authorizeStudioCapability("social.publish", { environment: "production", actor: developmentOwner }).status).toBe(401);
  });

  it("keeps development role simulation isolated from server authority", () => {
    const preview = getDevelopmentSession("CONTENT_EDITOR", "development");
    expect(preview?.actor.role).toBe("CONTENT_EDITOR");
    expect(authorizeStudioCapability("users.manage", { environment: "development" }).actor?.role).toBe("OWNER");
    expect(authorizeStudioCapability("users.manage", { environment: "development", actor: preview?.actor }).allowed).toBe(false);
  });
});

describe("managed social channel workflow", () => {
  it("validates HTTPS and rejects unsafe protocols", () => {
    expect(socialChannelSchema.safeParse(seededSocialChannels[0]).success).toBe(true);
    expect(socialChannelSchema.safeParse({ ...seededSocialChannels[0], url: "http://example.com" }).success).toBe(false);
    expect(socialChannelSchema.safeParse({ ...seededSocialChannels[0], url: "javascript:alert(1)" }).success).toBe(false);
    expect(socialChannelSchema.safeParse({ ...seededSocialChannels[0], url: "data:text/html,unsafe" }).success).toBe(false);
  });

  it("sorts published channels and excludes disabled or unplaced channels", async () => {
    const directory = await root();
    const draft = seededSocialChannels.map((channel) => channel.id === "facebook" ? { ...channel, order: 90, enabled: false } : channel.id === "instagram" ? { ...channel, order: 1, placements: { ...channel.placements, contact: false } } : channel);
    await saveSocialDraft(draft, developmentOwner, directory);
    await publishSocialDraft(developmentOwner, directory);
    expect((await getPublishedSocialChannels("footer", directory)).map((channel) => channel.id)).toEqual(["instagram", "youtube", "tiktok"]);
    expect((await getPublishedSocialChannels("contact", directory)).map((channel) => channel.id)).toEqual(["youtube", "tiktok"]);
  });

  it("keeps draft changes out of footer/contact reads until publish", async () => {
    const directory = await root();
    const changed = seededSocialChannels.map((channel) => channel.id === "tiktok" ? { ...channel, handle: "@acspatialspecialist", url: "https://www.tiktok.com/@acspatialspecialist" } : channel);
    await saveSocialDraft(changed, developmentOwner, directory);
    expect((await getPublishedSocialChannels("footer", directory)).find((channel) => channel.id === "tiktok")?.handle).toBe("@aggressivefinancer");
    expect((await getPublishedSocialChannels("contact", directory)).find((channel) => channel.id === "tiktok")?.handle).toBe("@aggressivefinancer");
    await publishSocialDraft(developmentOwner, directory);
    expect((await getPublishedSocialChannels("footer", directory)).find((channel) => channel.id === "tiktok")?.handle).toBe("@acspatialspecialist");
    expect((await readSocialStore(directory)).publishedAt).not.toBeNull();
    expect(await readFile(path.join(directory, ".dev-data", "social-channels.json"), "utf8")).toContain("@acspatialspecialist");
  });

  it("renders accessible social links in English and Vietnamese", () => {
    const en = renderToStaticMarkup(<SocialLinks channels={seededSocialChannels} locale="en"/>);
    const vi = renderToStaticMarkup(<SocialLinks channels={seededSocialChannels} locale="vi"/>);
    expect(en).toContain('aria-label="Social channels"');
    expect(vi).toContain('aria-label="Kênh mạng xã hội"');
    expect(en).toContain("Facebook");
    expect(en).toContain("noopener noreferrer");
    expect(en).not.toContain("javascript:");
  });
});
