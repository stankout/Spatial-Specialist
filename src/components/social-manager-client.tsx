"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { SocialLinks } from "@/components/social-links";
import { socialPlatformSchema, type SocialChannel, type SocialPlatform, type SocialStore } from "@/lib/social/types";

const platforms = socialPlatformSchema.options;
const blankChannel = (): SocialChannel => {
  const now = new Date().toISOString();
  const id = `channel-${crypto.randomUUID().slice(0, 8)}`;
  return { id, platform: "other", label: "New channel", handle: "", url: "https://", enabled: false, order: 999, iconKey: "other", openInNewTab: true, placements: { footer: true, contact: true, header: false, homepage: false }, createdAt: now, updatedAt: now };
};

export function SocialManagerClient({ initialStore }: { initialStore: SocialStore }) {
  const [store, setStore] = useState(initialStore);
  const [draft, setDraft] = useState(initialStore.draft);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const sorted = useMemo(() => [...draft].sort((left, right) => left.order - right.order), [draft]);
  const update = (id: string, changes: Partial<SocialChannel>) => setDraft((channels) => channels.map((channel) => channel.id === id ? { ...channel, ...changes } : channel));
  const move = (id: string, direction: -1 | 1) => setDraft((channels) => {
    const ordered = [...channels].sort((left, right) => left.order - right.order);
    const index = ordered.findIndex((channel) => channel.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= ordered.length) return channels;
    [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
    return ordered.map((channel, channelIndex) => ({ ...channel, order: (channelIndex + 1) * 10 }));
  });
  async function submit(action: "save-draft" | "publish") {
    setPending(true);
    setStatus("");
    const response = await fetch("/api/studio/social", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(action === "save-draft" ? { action, channels: draft } : { action }) });
    const result = await response.json();
    setPending(false);
    if (!result.ok) return setStatus(result.error ?? "Unable to update social channels.");
    setStore(result.store);
    setDraft(result.store.draft);
    setStatus(action === "publish" ? "Published social channels are now available to the public renderer." : "Draft saved locally. Public links are unchanged until Publish.");
  }
  return <div className="social-studio">
    <section className="social-studio-toolbar">
      <div><p className="eyebrow">Draft / Published workflow</p><h2>Social Channels</h2><p>Manage trusted HTTPS links once, then reuse the published version across public placements.</p></div>
      <div><button className="studio-secondary" onClick={() => setDraft((channels) => [...channels, blankChannel()])}><Plus aria-hidden="true"/>Add channel</button><button disabled={pending} onClick={() => void submit("save-draft")}>Save Draft</button><button disabled={pending} onClick={() => void submit("publish")}>Publish</button></div>
    </section>
    <output className="studio-status" aria-live="polite">{status}</output>
    <section className="social-channel-editor" aria-label="Social channel draft editor">
      {sorted.map((channel, index) => <article key={channel.id}>
        <header><div><span>{String(index + 1).padStart(2, "0")}</span><strong>{channel.label}</strong><small>{channel.enabled ? "Enabled" : "Hidden"}</small></div><div><button aria-label={`Move ${channel.label} up`} disabled={index === 0} onClick={() => move(channel.id, -1)}><ArrowUp/></button><button aria-label={`Move ${channel.label} down`} disabled={index === sorted.length - 1} onClick={() => move(channel.id, 1)}><ArrowDown/></button><button className="studio-danger" aria-label={`Delete ${channel.label}`} onClick={() => setDraft((channels) => channels.filter((item) => item.id !== channel.id))}><Trash2/></button></div></header>
        <div className="social-channel-fields">
          <label>Platform<select value={channel.platform} onChange={(event) => { const platform = event.target.value as SocialPlatform; update(channel.id, { platform, iconKey: platform }); }}>{platforms.map((platform) => <option key={platform}>{platform}</option>)}</select></label>
          <label>Icon<select value={channel.iconKey} onChange={(event) => update(channel.id, { iconKey: event.target.value as SocialPlatform })}>{platforms.map((platform) => <option key={platform}>{platform}</option>)}</select></label>
          <label>Label<input value={channel.label} maxLength={80} onChange={(event) => update(channel.id, { label: event.target.value })}/></label>
          <label>Handle<input value={channel.handle} maxLength={100} onChange={(event) => update(channel.id, { handle: event.target.value })}/></label>
          <label className="social-url-field">HTTPS URL<input type="url" value={channel.url} onChange={(event) => update(channel.id, { url: event.target.value })}/></label>
        </div>
        <fieldset><legend>Publication and placement</legend><label><input type="checkbox" checked={channel.enabled} onChange={(event) => update(channel.id, { enabled: event.target.checked })}/>Enabled</label><label><input type="checkbox" checked={channel.openInNewTab} onChange={(event) => update(channel.id, { openInNewTab: event.target.checked })}/>New tab</label>{(["footer", "contact", "header", "homepage"] as const).map((placement) => <label key={placement}><input type="checkbox" checked={channel.placements[placement]} onChange={(event) => update(channel.id, { placements: { ...channel.placements, [placement]: event.target.checked } })}/>{placement}</label>)}</fieldset>
      </article>)}
    </section>
    <section className="social-preview-grid">
      <article><p className="eyebrow">Draft preview</p><h3>Footer placement</h3><SocialLinks channels={draft.filter((channel) => channel.placements.footer)} locale="en" variant="preview"/></article>
      <article><p className="eyebrow">Published</p><h3>Contact placement</h3><SocialLinks channels={store.published.filter((channel) => channel.placements.contact)} locale="en" variant="preview"/><small>Published {store.publishedAt ? new Date(store.publishedAt).toLocaleString("en-US") : "not yet"}</small></article>
    </section>
  </div>;
}
