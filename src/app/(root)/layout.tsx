import type { Metadata } from "next";
import { siteConfig } from "@/data/site.config";
import "../globals.css";
import "../art-direction.css";
import "../foreground-system.css";

export const metadata: Metadata = { metadataBase:new URL(siteConfig.url), title:{default:"Anh Cao | Property Intelligence",template:"%s | Anh Cao"}, description:"Real estate strategy and spatial consultation for Georgia communities—English and Vietnamese.", openGraph:{type:"website",siteName:"Anh Cao | Spatial Specialist LLC",title:"Property strategy. Spatial intelligence.",description:"Property intelligence from more than one perspective."}, twitter:{card:"summary_large_image"} };

export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html> }
