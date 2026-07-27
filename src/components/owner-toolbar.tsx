"use client";
import Link from "next/link";
import {useEffect,useState} from "react";

export function OwnerToolbar({editHref,visualPage,locale}:{editHref:string;visualPage:string;locale:"en"|"vi"}){
 const [mounted,setMounted]=useState(false),[collapsed,setCollapsed]=useState(false);
 useEffect(()=>{const timer=window.setTimeout(()=>{const compactViewport=window.matchMedia("(max-width: 900px)").matches;setCollapsed(compactViewport||localStorage.getItem("ac-owner-toolbar-collapsed")==="true");setMounted(true)},0);return()=>window.clearTimeout(timer)},[]);
 function toggle(){setCollapsed(value=>{const next=!value;localStorage.setItem("ac-owner-toolbar-collapsed",String(next));return next})}
 const identity=<Link className="owner-toolbar-identity" href={`/${locale}`} aria-label="Anh Cao public homepage">{collapsed?"AC":"AC Owner"}</Link>;
 if(!mounted)return <nav className="owner-toolbar collapsed" aria-label="Development owner tools"><Link className="owner-toolbar-identity" href={`/${locale}`} aria-label="Anh Cao public homepage">AC</Link><button type="button" aria-label="Open owner toolbar">+</button></nav>;
 return <nav className={`owner-toolbar ${collapsed?"collapsed":"expanded"}`} aria-label="Development owner tools">{identity}<button className="owner-toolbar-toggle" type="button" onClick={toggle} aria-expanded={!collapsed} aria-label={collapsed?"Open owner toolbar":"Close owner toolbar"}>{collapsed?"+":"−"}</button>{!collapsed&&<><Link href="/studio">Studio</Link><Link href={`/studio/content?locale=${locale}`}>Content</Link><Link href="/studio/media">Media</Link><Link href={`/studio/visuals?page=${visualPage}&locale=${locale}`}>Visual</Link><Link href={editHref}>Edit this page</Link></>}</nav>;
}
