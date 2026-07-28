import { featureFlags } from "@/data/platform.config";
import type { Locale } from "@/data/site.config";

export type PublicNavItem = { key: string; label: string; href: string };
export function getPublicNavigation(locale: Locale, availability: { catalog?: boolean; portfolio?: boolean } = {}): PublicNavItem[] {
  const vi = locale === "vi";
  return [
    { key: "about", label: vi ? "Giới thiệu" : "About", href: "/about" },
    { key: "services", label: vi ? "Dịch vụ" : "Services", href: "/services" },
    { key: "videos", label: "Videos", href: "/videos" },
    { key: "guides", label: vi ? "Cẩm nang" : "Guides", href: "/guides" },
    ...(featureFlags.blogEnabled ? [{ key: "articles", label: vi ? "Bài viết" : "Articles", href: "/articles" }] : []),
    ...(featureFlags.portfolioEnabled && availability.portfolio ? [{ key: "portfolio", label: "Portfolio", href: "/portfolio" }] : []),
    ...(featureFlags.commerceEnabled && availability.catalog ? [{ key: "catalog", label: vi ? "Cửa hàng" : "Store", href: "/catalog" }] : []),
    ...(featureFlags.siteSearchEnabled ? [{ key: "search", label: vi ? "Tìm kiếm" : "Search", href: "/search" }] : []),
    { key: "contact", label: vi ? "Liên hệ" : "Contact", href: "/contact" },
  ];
}

