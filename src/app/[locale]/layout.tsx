import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Footer, Header, StickyMobileCTA } from "@/components/site-shell";
import { ManagedMediaSections } from "@/components/managed-media-sections";
import { StoryBackdropShell, type StoryBackdropItem } from "@/components/story-backdrop-shell";
import { siteConfig } from "@/data/site.config";
import { publicCatalog } from "@/lib/catalog/repository";
import { publicContent } from "@/lib/content-studio/repository";
import { isLocale } from "@/lib/i18n";
import { listAssignments, listDraftAssignments } from "@/lib/media/assignments";
import { listMediaSections } from "@/lib/media/composition";
import { LocalMediaStorageProvider } from "@/lib/media/storage";
import { getPublishedSocialChannels } from "@/lib/social/repository";
import { resolveVisualSettings } from "@/lib/visuals/config";
import { readVisualStore } from "@/lib/visuals/storage";
import "../globals.css";
import "../art-direction.css";
import "../foreground-system.css";
import "../living-visual-engine.css";
import "../motion-media-system.css";
import "../public-art-direction.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Anh Cao | Property Intelligence", template: "%s | Anh Cao" },
  description: "Real estate strategy and spatial consultation for Georgia communities—English and Vietnamese.",
  openGraph: { type: "website", siteName: "Anh Cao | Spatial Specialist LLC", title: "Property strategy. Spatial intelligence.", description: "Property intelligence from more than one perspective." },
  twitter: { card: "summary_large_image" },
};

export function generateStaticParams() { return [{ locale: "en" }, { locale: "vi" }]; }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [assignments, drafts, assets, sections, visuals, catalog, portfolio, socialChannels] = await Promise.all([
    listAssignments(),
    listDraftAssignments(),
    new LocalMediaStorageProvider().list(),
    listMediaSections(),
    readVisualStore(),
    publicCatalog(locale),
    publicContent({ locale, type: "portfolio" }),
    getPublishedSocialChannels("footer"),
  ]);
  const map = (assignment: (typeof assignments)[number], draft = false) => {
    const asset = assets.find((item) => item.id === assignment.assetId);
    return asset ? [{ slot: assignment.slot, url: asset.url, provider: asset.provider, mimeType: asset.mimeType, sourceType:asset.sourceType, sceneId:asset.sceneId, decorative:asset.decorative, width: asset.width, height: asset.height, presentation: assignment.presentation, draft } satisfies StoryBackdropItem] : [];
  };
  const backdrops = [
    ...assignments.filter((item) => item.slot.includes("storyBackdrop")).flatMap((item) => map(item)),
    ...drafts.filter((item) => item.slot.includes("storyBackdrop")).flatMap((item) => map(item, true)),
  ];
  const footerVisuals = resolveVisualSettings(visuals.published, "footer", locale);
  const availability = { catalog: catalog.length > 0, portfolio: portfolio.length > 0 };
  return <html lang={locale} data-scroll-behavior="smooth"><body><div className="locale-shell"><a className="skip-link" href="#main">Skip to content</a><Header locale={locale} availability={availability}/><main id="main"><Suspense fallback={children}><StoryBackdropShell backdrops={backdrops} visuals={{ draft: visuals.draft, published: visuals.published }}>{children}</StoryBackdropShell></Suspense><ManagedMediaSections sections={sections} assets={assets}/></main><Footer locale={locale} visuals={footerVisuals} availability={availability} socialChannels={socialChannels}/><StickyMobileCTA locale={locale}/></div></body></html>;
}
