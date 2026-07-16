import type { Locale } from "@/data/site.config";

export const dictionaries = {
  en: { nav: { home: "Home", about: "About", services: "Services", videos: "Videos", guides: "Guides", contact: "Contact", book: "Book" }, common: { explore: "Explore service", learn: "Learn more", demo: "Educational demo content", menu: "Menu" } },
  vi: { nav: { home: "Trang chủ", about: "Giới thiệu", services: "Dịch vụ", videos: "Video", guides: "Cẩm nang", contact: "Liên hệ", book: "Đặt lịch" }, common: { explore: "Khám phá dịch vụ", learn: "Tìm hiểu thêm", demo: "Nội dung giáo dục minh họa", menu: "Menu" } },
} as const;

export function isLocale(value: string): value is Locale { return value === "en" || value === "vi"; }
export function getDictionary(locale: Locale) { return dictionaries[locale]; }
export function localizedPath(locale: Locale, path = "") { return `/${locale}${path === "/" ? "" : path}`; }
