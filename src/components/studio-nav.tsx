import Link from "next/link";
export function StudioNav({active}:{active:"dashboard"|"strategy"|"content"|"media"|"assets"|"embeds"|"visuals"|"settings"}){
 const links=[["Dashboard","/studio","dashboard"],["Strategy","/studio/strategy","strategy"],["Content","/studio/content","content"],["Media","/studio/media","media"],["Page Assets","/studio/page-assets","assets"],["Embeds","/studio/embeds","embeds"],["Visuals","/studio/visuals","visuals"],["Settings","/studio/settings","settings"]] as const;
 return <nav className="studio-global-nav" aria-label="Content Studio"><Link className="studio-brand-link" href="/en" aria-label="Anh Cao public homepage">AC / STUDIO</Link>{links.map(([label,href,key])=><Link aria-current={active===key?"page":undefined} href={href} key={key}>{label}</Link>)}<Link href="/en" target="_blank">View site</Link></nav>;
}
