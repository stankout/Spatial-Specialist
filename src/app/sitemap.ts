import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site.config";
import {publicContent} from "@/lib/content-studio/repository";
import {contentPath} from "@/components/public-content";
const routes=["","/about","/about-spatial-specialist","/services","/videos","/guides","/contact","/book","/real-estate","/home-inspection","/spatial-consultation","/privacy","/terms","/accessibility"];
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const base=siteConfig.locales.flatMap(locale=>routes.map(route=>({url:`${siteConfig.url}/${locale}${route}`,lastModified:new Date(),changeFrequency:(route===""?"weekly":"monthly") as "weekly"|"monthly",priority:route===""?1:0.7,alternates:{languages:{en:`${siteConfig.url}/en${route}`,vi:`${siteConfig.url}/vi${route}`}}})));const published=await publicContent();return [...base,...published.flatMap(entry=>entry.publishedLocales.map(locale=>({url:`${siteConfig.url}${contentPath(entry,locale)}`,lastModified:new Date(entry.updatedAt),changeFrequency:"monthly" as const,priority:.65})))]}
