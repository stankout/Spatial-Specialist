import Link from "next/link";
import { platformConfig } from "@/data/platform.config";
import type { CatalogItem } from "@/lib/catalog/types";
import { formatMoney, money } from "@/lib/platform/money";
export function CatalogGrid({ items, locale }: { items: CatalogItem[]; locale: "en" | "vi" }) { const hasAffiliate = items.some((item) => item.type === "affiliate"); return <><section className="catalog-grid">{items.map((item) => { const content = item.localeContent[locale]!; return <article key={item.id}><small>{item.type} · {item.category || "AC"}</small><h2>{content.title}</h2><p>{content.shortDescription}</p><div>{item.priceMinor !== null && <strong>{formatMoney(money(item.priceMinor), locale)}</strong>}<Link href={`/${locale}/products/${item.slug}`}>{locale === "vi" ? "Xem chi tiết" : "View details"} →</Link></div></article>; })}</section>{hasAffiliate && <p className="affiliate-disclosure">{platformConfig.affiliateDisclosure[locale]}</p>}</>; }

