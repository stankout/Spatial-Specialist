import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site.config";

export const metadata: Metadata = { metadataBase:new URL(siteConfig.url), title:{default:"Anh Cao | Property Intelligence",template:"%s | Anh Cao"}, description:"Real estate, home inspection education, and spatial consultation for Georgia communities—English and Vietnamese.", openGraph:{type:"website",siteName:"Anh Cao | Spatial Specialist LLC",title:"Buy Better. Inspect Smarter. Align Your Space.",description:"One property. Three perspectives."}, twitter:{card:"summary_large_image"} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html> }
