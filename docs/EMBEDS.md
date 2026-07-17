# Safe Embed Engine

Studio accepts provider URLs and stores typed `EmbedBlock` records. It does not accept raw iframe HTML or scripts. Local development data is saved in `.dev-data/embed-library.json`; assignments are saved in `.dev-data/embed-assignments.json`. Both files are gitignored.

## Add an embed

1. Run the site locally with `STUDIO_ENABLED=true`.
2. Open `/studio` and select **Embeds**.
3. Paste a supported HTTPS URL, add optional English/Vietnamese title and caption, then select **Detect & preview**.
4. Review the provider, content type, preview, and privacy notice.
5. Select **Save embed**, then assign the saved block under **Content slots**.

No assigned block means nothing is rendered on a public page. Page components can resolve an assignment with `getAssignedEmbed(slot)` and render it through `EmbedRenderer` when editorial integration is approved.

## Supported providers

- **YouTube:** `youtube.com/watch`, `youtu.be`, and playlist URLs. Studio extracts validated identifiers and creates official `youtube.com/embed` URLs. Autoplay is disabled.
- **YouTube Music:** `music.youtube.com` video and playlist identifiers use the compatible YouTube renderer. URLs without a safely mappable identifier become an external-link card.
- **Spotify:** official track, album, playlist, show, and episode URLs. Basic embedding does not require Spotify API credentials.
- **SoundCloud:** track and `/sets/` playlist URLs use the official `w.soundcloud.com/player` architecture. Autoplay is disabled.

## Custom Iframe allowlist

Custom iframes are disabled unless the exact HTTPS hostname is listed in the server environment:

```env
EMBED_ALLOWED_HOSTS=example.com,media.example.org
```

The comparison uses exact hostnames; adding `example.com` does not automatically trust every subdomain. Only the configured fullscreen, autoplay, encrypted-media, and picture-in-picture permissions are accepted. Studio rejects HTTP, `javascript:`, data URLs, credentials in URLs, unknown hosts, raw HTML, inline event handlers, and scripts. The renderer never uses `dangerouslySetInnerHTML`.

## Performance and privacy

Players use responsive containers, `loading="lazy"`, restrictive referrer policy, and iframe sandboxing. External players can still contact YouTube, Spotify, SoundCloud, or an allowlisted provider when loaded. No unrelated tracker is added. The typed renderer leaves room for a future consent-gated click-to-load mode; owners should document provider use in the public privacy policy before activating embeds.

## Content block architecture

`ContentBlock` is a typed union of text, image, embed, quote, callout, and gallery references. This is infrastructure for future editorial pages, not a WYSIWYG editor. Embed slots currently cover homepage, Deal, Condition, Space, articles, and guides.
