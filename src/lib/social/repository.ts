import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { seededSocialChannels } from "@/data/social.config";
import type { Actor } from "@/lib/governance/permissions";
import { recordAuditEvent } from "@/lib/platform/audit";
import { socialChannelListSchema, socialStoreSchema, type SocialChannel, type SocialPlacement, type SocialStore } from "@/lib/social/types";

const localStorePath = (root: string) => path.join(root, ".dev-data", "social-channels.json");
export interface SocialChannelRepository {
  read(): Promise<SocialStore>;
  saveDraft(channels: SocialChannel[], actor: Actor | null): Promise<SocialStore>;
  publish(actor: Actor | null): Promise<SocialStore>;
  published(placement?: SocialPlacement): Promise<SocialChannel[]>;
}

export class LocalSocialChannelRepository implements SocialChannelRepository {
  constructor(private readonly root = process.cwd()) {}
  read() { return readSocialStore(this.root); }
  saveDraft(channels: SocialChannel[], actor: Actor | null) { return saveSocialDraft(channels, actor, this.root); }
  publish(actor: Actor | null) { return publishSocialDraft(actor, this.root); }
  published(placement?: SocialPlacement) { return getPublishedSocialChannels(placement, this.root); }
}

const initialStore = (): SocialStore => ({
  draft: structuredClone(seededSocialChannels),
  published: structuredClone(seededSocialChannels),
  draftUpdatedAt: null,
  publishedAt: "2026-07-28T00:00:00.000Z",
});

async function readLocalStore(root = process.cwd()): Promise<SocialStore> {
  if (process.env.NODE_ENV === "production") return initialStore();
  try {
    return socialStoreSchema.parse(JSON.parse(await readFile(localStorePath(root), "utf8")));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return initialStore();
    throw error;
  }
}

async function writeLocalStore(store: SocialStore, root = process.cwd()) {
  if (process.env.NODE_ENV === "production") throw new Error("Local social-channel persistence is disabled in production.");
  const validated = socialStoreSchema.parse(store);
  await mkdir(path.dirname(localStorePath(root)), { recursive: true });
  await writeFile(localStorePath(root), `${JSON.stringify(validated, null, 2)}\n`, "utf8");
  return validated;
}

export async function readSocialStore(root = process.cwd()) {
  return readLocalStore(root);
}

export async function saveSocialDraft(channels: SocialChannel[], actor: Actor | null, root = process.cwd()) {
  const current = await readLocalStore(root);
  const now = new Date().toISOString();
  const draft = socialChannelListSchema.parse(channels).map((channel) => ({ ...channel, updatedAt: now }));
  const next = await writeLocalStore({ ...current, draft, draftUpdatedAt: now }, root);
  await recordAuditEvent({ actorId: actor?.id, actorRole: actor?.role, action: "SOCIAL_UPDATED", resourceType: "social-channels", resourceId: "draft", summary: `Saved ${draft.length} social channel drafts.` }, root);
  return next;
}

export async function publishSocialDraft(actor: Actor | null, root = process.cwd()) {
  const current = await readLocalStore(root);
  const now = new Date().toISOString();
  const published = socialChannelListSchema.parse(current.draft).map((channel) => ({ ...channel, updatedAt: now }));
  const next = await writeLocalStore({ ...current, published, publishedAt: now }, root);
  await recordAuditEvent({ actorId: actor?.id, actorRole: actor?.role, action: "SOCIAL_PUBLISHED", resourceType: "social-channels", resourceId: "published", summary: `Published ${published.filter((channel) => channel.enabled).length} enabled social channels.` }, root);
  return next;
}

export async function getPublishedSocialChannels(placement?: SocialPlacement, root = process.cwd()) {
  const store = await readLocalStore(root);
  return store.published
    .filter((channel) => channel.enabled && (!placement || channel.placements[placement]))
    .sort((left, right) => left.order - right.order);
}

export const socialPersistence = {
  development: ".dev-data/social-channels.json",
  production: "Static seeded configuration until a production repository adapter is installed.",
} as const;
