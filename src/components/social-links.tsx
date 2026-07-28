import { AtSign, Music2, Pin, Share2 } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { SocialChannel, SocialPlatform } from "@/lib/social/types";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
const brandIcon = (path: string): IconComponent => function BrandIcon(props) { return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d={path}/></svg>; };
const FacebookIcon = brandIcon("M14 8.5V6.8c0-.8.5-1 1-1h2V2.2C16.4 2.1 15.3 2 13.8 2 10.7 2 8.6 3.9 8.6 7.4v1.1H5.2v4.1h3.4V22h4.2v-9.4h3.5l.6-4.1H14Z");
const YouTubeIcon = brandIcon("M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z");
const InstagramIcon = brandIcon("M12 2c2.7 0 3 0 4.1.1 1 0 1.6.2 2.1.4.5.2.9.5 1.3.9.4.4.7.8.9 1.3.2.5.4 1.1.4 2.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.6-.4 2.1-.2.5-.5.9-.9 1.3-.4.4-.8.7-1.3.9-.5.2-1.1.4-2.1.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.6-.2-2.1-.4-.5-.2-.9-.5-1.3-.9a3.7 3.7 0 0 1-.9-1.3c-.2-.5-.4-1.1-.4-2.1C2 15 2 14.7 2 12s0-3 .1-4.1c0-1 .2-1.6.4-2.1.2-.5.5-.9.9-1.3.4-.4.8-.7 1.3-.9.5-.2 1.1-.4 2.1-.4C7.9 2 8.2 2 12 2Zm0 4.9A5.1 5.1 0 1 0 12 17a5.1 5.1 0 0 0 0-10.2Zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm6.5-8.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z");
const TikTokIcon = brandIcon("M15.7 2c.3 2.4 1.7 3.8 4.3 4v3.4a8 8 0 0 1-4.3-1.3v6.5a6.4 6.4 0 1 1-5.5-6.3v3.5a3 3 0 1 0 2 2.8V2h3.5Z");
const LinkedInIcon = brandIcon("M5.3 7.3H2V22h3.3V7.3ZM3.7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM22 13.6c0-4.4-2.3-6.5-5.5-6.5-2.6 0-3.7 1.4-4.3 2.4V7.3H8.9V22h3.3v-7.3c0-1.9.4-3.8 2.8-3.8 2.3 0 2.4 2.2 2.4 3.9V22H22v-8.4Z");
const socialIcons: Record<SocialPlatform, IconComponent> = {
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  threads: AtSign,
  spotify: Music2,
  soundcloud: Music2,
  pinterest: Pin,
  x: AtSign,
  other: Share2,
};

export function SocialLinks({ channels, locale, variant = "footer" }: { channels: SocialChannel[]; locale: "en" | "vi"; variant?: "footer" | "contact" | "preview" }) {
  const visible = channels.filter((channel) => channel.enabled).sort((left, right) => left.order - right.order);
  if (!visible.length) return null;
  return <nav className={`social-links social-links-${variant}`} aria-label={locale === "vi" ? "Kênh mạng xã hội" : "Social channels"}>
    {visible.map((channel) => {
      const Icon = socialIcons[channel.iconKey];
      return <a key={channel.id} href={channel.url} target={channel.openInNewTab ? "_blank" : undefined} rel={channel.openInNewTab ? "noopener noreferrer" : undefined} aria-label={`${channel.label}${channel.handle ? ` ${channel.handle}` : ""}`}>
        <Icon aria-hidden="true" />
        <span><strong>{channel.label}</strong>{channel.handle && <small>{channel.handle}</small>}</span>
      </a>;
    })}
  </nav>;
}
