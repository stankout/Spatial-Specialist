import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site.config";
const routes=["","/about","/about-spatial-specialist","/services","/videos","/guides","/contact","/book","/real-estate","/home-inspection","/spatial-consultation","/privacy","/terms","/accessibility"];
export default function sitemap():MetadataRoute.Sitemap{return siteConfig.locales.flatMap(locale=>routes.map(route=>({url:`${siteConfig.url}/${locale}${route}`,lastModified:new Date(),changeFrequency:route===""?"weekly":"monthly",priority:route===""?1:0.7,alternates:{languages:{en:`${siteConfig.url}/en${route}`,vi:`${siteConfig.url}/vi${route}`}}})))}
