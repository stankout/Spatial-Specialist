# Managed Social Channels

The Social manager at `/studio/social` controls public social destinations without editing source code. The model includes platform, label, handle, HTTPS URL, icon, enabled state, order, new-tab behavior, placements, and timestamps.

## Update a channel

1. Open **Studio → Social**.
2. Edit the label, handle, or HTTPS URL.
3. Choose Footer, Contact, Header, or Homepage placements.
4. Enable or hide the destination and reorder it with the arrow controls.
5. Select **Save Draft** and inspect the footer/contact previews.
6. Select **Publish** only when the draft is approved.

The current TikTok destination remains `@aggressivefinancer`. When the owner later changes the real account, update both handle and URL in Studio, save the draft, preview, then publish.

Only valid HTTPS destinations may be saved. `javascript:`, `data:`, plain HTTP, arbitrary HTML, and remote icon markup are rejected. Icons come from a local registry.

## Public rendering

The footer and Contact page read the same Published collection. They never read the Working Draft, so an accidental edit does not immediately change the website. Disabled channels and channels without the relevant placement are hidden.

Development persistence is `.dev-data/social-channels.json`, which is gitignored. Production currently uses the reviewed static seed until a durable social settings repository is installed. Social profile links do not need a social API; automated posting or scheduling will require a separate provider.

